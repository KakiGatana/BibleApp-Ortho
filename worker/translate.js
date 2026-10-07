/* Traduction à la demande : POST /translate { lang, texts: ["…", …] }
   Chaque texte est traduit une seule fois par langue puis gardé dans KV pour tous les visiteurs.
   La clé ANTHROPIC_API_KEY reste ici (secret Cloudflare). */
import Anthropic from '@anthropic-ai/sdk';

const LANGS = {
  en: 'English', ru: 'Russian', sr: 'Serbian (Cyrillic script)', es: 'Spanish', de: 'German', it: 'Italian',
  zh: 'Simplified Chinese (Mandarin)', ja: 'Japanese'
};
const STYLE = {
  en: 'Use the vocabulary of English-speaking Orthodox Churches (Divine Liturgy, Theotokos, Great Lent, Pascha, Matins, Vespers, hierarch, repose, troparion).',
  ru: 'Use the standard vocabulary of the Russian Orthodox Church (Божественная литургия, Богородица, Великий пост, Пасха, утреня, вечерня, тропарь). Address the reader informally (ты) as in the source.',
  sr: 'Use Serbian Orthodox Church vocabulary, written in Serbian Cyrillic (Света литургија, Богородица, Васкрс, Велики пост, јутрење, вечерње, тропар).',
  es: 'Use Spanish Orthodox vocabulary (Divina Liturgia, Madre de Dios / Theotokos, Gran Cuaresma, Pascua, Maitines, Vísperas). Address the reader as tú.',
  de: 'Use German Orthodox vocabulary (Göttliche Liturgie, Gottesgebärerin, Große Fastenzeit, Ostern/Pascha, Orthros, Vesper). Address the reader as du.',
  it: 'Use Italian Orthodox vocabulary (Divina Liturgia, Madre di Dio, Grande Quaresima, Pasqua, Mattutino, Vespri). Address the reader as tu.',
  zh: 'Use the vocabulary of Orthodox Christianity in Chinese (东正教, 圣礼仪 / 神圣礼仪, 圣母, 大斋期, 复活节). Simplified characters.',
  ja: 'Use the vocabulary of the Orthodox Church in Japan (正教会, 聖体礼儀, 生神女, 大斎, 復活祭, 聖人, 聖詠). Polite but warm tone.'
};

async function sha(s) {
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(h)].slice(0, 12).map((b) => b.toString(16).padStart(2, '0')).join('');
}
const json = (cors, status, obj) => new Response(JSON.stringify(obj), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

const system = (lang) => `You translate text of "Blagovest", a French-language Orthodox Christian app (Bible, liturgical calendar, prayers, saints, theology, Church Slavonic), into ${LANGS[lang]}.
Rules:
- Return ONLY a JSON array of strings: the same number of items, in the same order as the input. No comments, no markdown.
- Keep the placeholders "{n}" exactly as they are (they stand for numbers) and keep their position natural for the target language.
- Keep Church Slavonic or other Cyrillic Slavonic words, Bible references (Ps 22, Jn 3:16 style abbreviations may be adapted to the local convention), and proper names that have no standard translation.
- Translate faithfully and warmly; do not add explanations; keep the register of the original (informal "tu" becomes the natural informal address).
- Orthodox terminology: ${STYLE[lang]}
- Psalm numbers follow the Septuagint, as in the source.`;

export async function handleTranslate(req, env, body, cors) {
  if (!env.ANTHROPIC_API_KEY) return json(cors, 503, { error: 'unavailable' });
  const lang = body.lang, texts = body.texts;
  if (!LANGS[lang] || !Array.isArray(texts) || !texts.length || texts.length > 40) return json(cors, 400, { error: 'bad_request' });
  let total = 0;
  for (const t of texts) { if (typeof t !== 'string' || !t.trim() || t.length > 900) return json(cors, 400, { error: 'bad_request' }); total += t.length; }
  if (total > 14000) return json(cors, 400, { error: 'too_long' });

  // 1) ce qui est déjà traduit (cache partagé)
  const keys = await Promise.all(texts.map(async (t) => 't:' + lang + ':' + (await sha(t))));
  const cached = await Promise.all(keys.map((k) => env.SUBS.get(k)));
  const out = cached.map((v) => (v == null ? null : v));
  const miss = out.map((v, i) => (v == null ? i : -1)).filter((i) => i >= 0);
  if (!miss.length) return json(cors, 200, { t: out });

  // 2) limites de dépense : par IP et par jour, puis plafond mensuel global
  const day = new Date().toISOString().slice(0, 10), month = day.slice(0, 7);
  const ip = req.headers.get('CF-Connecting-IP') || 'inconnu';
  const ipKey = 'tq:' + (await sha(ip)) + ':' + day, gKey = 'tg:' + month;
  const perIp = +env.TR_PER_IP || 500, cap = +env.TR_MONTHLY_CAP || 4000;
  const used = +((await env.SUBS.get(ipKey)) || 0), total30 = +((await env.SUBS.get(gKey)) || 0);
  if (used + miss.length > perIp || total30 + miss.length > cap) return json(cors, 200, { t: out, limited: true });
  await env.SUBS.put(ipKey, String(used + miss.length), { expirationTtl: 172800 });
  await env.SUBS.put(gKey, String(total30 + miss.length), { expirationTtl: 3456000 });

  // 3) traduction des manquants
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  const src = miss.map((i) => texts[i]);
  try {
    const resp = await client.messages.create({
      model: env.TRANSLATE_MODEL || 'claude-sonnet-5-5',
      max_tokens: Math.min(16000, 600 + src.reduce((a, t) => a + t.length, 0) * 3),
      system: system(lang),
      output_config: { effort: 'low' },
      messages: [{ role: 'user', content: JSON.stringify(src) }]
    });
    const text = resp.content.filter((b) => b.type === 'text').map((b) => b.text).join('').trim();
    const m = text.match(/\[[\s\S]*\]/);
    const arr = m ? JSON.parse(m[0]) : null;
    if (!Array.isArray(arr) || arr.length !== src.length || arr.some((x) => typeof x !== 'string')) throw new Error('format');
    await Promise.all(miss.map(async (i, j) => { out[i] = arr[j]; await env.SUBS.put(keys[i], arr[j], { expirationTtl: 60 * 60 * 24 * 365 }); }));
    return json(cors, 200, { t: out });
  } catch (e) {
    // on rend les compteurs : rien n'a été traduit
    try { await env.SUBS.put(ipKey, String(used), { expirationTtl: 172800 }); await env.SUBS.put(gKey, String(total30), { expirationTtl: 3456000 }); } catch (e2) { /* ignoré */ }
    return json(cors, 200, { t: out, error: 'translate_failed' });
  }
}
