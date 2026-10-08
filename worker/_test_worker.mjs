// Test local du Worker avec un faux KV et un faux service d'IA (rien n'est envoyé sur Internet).
import worker from './worker.js';

let aiCalls = 0;
globalThis.fetch = async (url, init) => {
  const u = String(url);
  if (u.includes('anthropic.com')) {
    aiCalls++;
    let body = {}; try { body = JSON.parse(init.body); } catch (e) { /* ok */ }
    const wantsJson = (body.system || '').includes('You translate');
    const text = wantsJson ? JSON.stringify(JSON.parse(body.messages[0].content).map((t) => 'T:' + t)) : 'Réponse de test';
    return new Response(JSON.stringify({ id: 'msg_1', type: 'message', role: 'assistant', model: 'x', content: [{ type: 'text', text }], stop_reason: 'end_turn', stop_sequence: null, usage: { input_tokens: 1, output_tokens: 1 } }), { status: 200, headers: { 'content-type': 'application/json' } });
  }
  return new Response('', { status: 201 });
};

function makeEnv(failPut) {
  const m = new Map();
  return {
    ANTHROPIC_API_KEY: 'test', ALLOWED_ORIGIN: 'https://x.example', DAILY_PER_IP: '3', MONTHLY_CAP: '5', TR_PER_IP: '50', TR_MONTHLY_CAP: '10', MODEL: 'm', TRANSLATE_MODEL: 'm',
    SUBS: {
      get: async (k) => (m.has(k) ? m.get(k) : null),
      put: async (k, v) => { if (failPut) throw new Error('quota'); m.set(k, v); },
      delete: async (k) => { m.delete(k); },
      list: async ({ prefix }) => ({ keys: [...m.keys()].filter((k) => k.startsWith(prefix)).map((name) => ({ name })), list_complete: true })
    },
    _m: m
  };
}
let ipN = 100;
const call = async (env, path, body, ip = '9.9.9.' + (ipN++), extra = {}) => {
  const req = new Request('https://w.example' + path, { method: 'POST', headers: { 'CF-Connecting-IP': ip, ...extra }, body: typeof body === 'string' ? body : JSON.stringify(body) });
  const r = await worker.fetch(req, env);
  let j = null; try { j = await r.json(); } catch (e) { /* vide */ }
  return { s: r.status, j };
};
const res = [];
const ok = (name, cond, info) => { res.push((cond ? 'OK   ' : 'ECHEC') + ' ' + name + (info ? ' ' + info : '')); };

// 1. /ask normal puis limite par IP (3 par jour)
let env = makeEnv(false);
const q = { messages: [{ role: 'user', content: 'Bonjour' }] };
let r = await call(env, '/ask', q, '1.1.1.1'); ok('ask valide -> 200', r.s === 200 && r.j.answer === 'Réponse de test', JSON.stringify(r));
await call(env, '/ask', q, '1.1.1.1'); await call(env, '/ask', q, '1.1.1.1');
r = await call(env, '/ask', q, '1.1.1.1'); ok('ask 4e question même IP -> 429', r.s === 429, String(r.s));
r = await call(env, '/ask', q, '2.2.2.2'); ok('ask autre IP -> 200 (compteur global 4/5)', r.s === 200, String(r.s));
r = await call(env, '/ask', q, '3.3.3.3'); ok('ask 5e global -> 200', r.s === 200, String(r.s));
r = await call(env, '/ask', q, '4.4.4.4'); ok('ask plafond mensuel atteint -> 429', r.s === 429 && r.j.error === 'monthly_cap', JSON.stringify(r.j));

// 2. /ask : écriture KV impossible -> refus, aucun appel IA
env = makeEnv(true); aiCalls = 0;
r = await call(env, '/ask', q); ok('ask sans KV -> 503 et aucun appel IA', r.s === 503 && aiCalls === 0, `s=${r.s} appels=${aiCalls}`);

// 3. validations
env = makeEnv(false);
for (const [n, b] of [['messages vides', { messages: [] }], ['trop de messages', { messages: Array(9).fill({ role: 'user', content: 'a' }) }], ['rôle faux', { messages: [{ role: 'assistant', content: 'a' }] }], ['message trop long', { messages: [{ role: 'user', content: 'a'.repeat(1201) }] }]]) { r = await call(env, '/ask', b); ok('ask ' + n + ' -> 400', r.s === 400, String(r.s)); }
r = await call(env, '/ask', { ...q, lang: '__proto__' }); ok('ask lang __proto__ ignoré -> 200', r.s === 200, String(r.s));

// 4. /translate
env = makeEnv(false); aiCalls = 0;
r = await call(env, '/translate', { lang: 'el', texts: ['Bonjour', 'Salut'] }); ok('translate ok', r.s === 200 && r.j.t[0] === 'T:Bonjour' && aiCalls === 1, JSON.stringify(r.j));
r = await call(env, '/translate', { lang: 'el', texts: ['Bonjour'] }); ok('translate depuis le cache (pas d\'appel IA)', r.s === 200 && r.j.t[0] === 'T:Bonjour' && aiCalls === 1, 'appels=' + aiCalls);
r = await call(env, '/translate', { lang: '__proto__', texts: ['a'] }); ok('translate lang __proto__ -> 400', r.s === 400, String(r.s));
r = await call(env, '/translate', { lang: 'xx', texts: ['a'] }); ok('translate langue inconnue -> 400', r.s === 400, String(r.s));
r = await call(env, '/translate', { lang: 'el', texts: ['x'.repeat(901)] }); ok('translate texte trop long -> 400', r.s === 400, String(r.s));
env = makeEnv(true); aiCalls = 0;
r = await call(env, '/translate', { lang: 'el', texts: ['Nouveau texte'] }); ok('translate sans KV -> limited, aucun appel IA', r.s === 200 && r.j.limited === true && aiCalls === 0, `appels=${aiCalls}`);

// 5. taille de requête
env = makeEnv(false);
r = await call(env, '/ask', 'x'.repeat(600000)); ok('corps géant -> 413', r.s === 413, String(r.s));
r = await call(env, '/ask', '{pas du json'); ok('JSON invalide -> 400', r.s === 400, String(r.s));
r = await call(env, '/inconnu', {}); ok('route inconnue -> 404', r.s === 404, String(r.s));

// 6. sauvegarde
env = makeEnv(false);
const code = 'ABCD-1234-EFGH-5678-IJKL';
r = await call(env, '/backup/put', { code, data: JSON.stringify({ fav: ['a'] }) }); ok('backup put -> 200', r.s === 200, JSON.stringify(r.j));
r = await call(env, '/backup/get', { code }); ok('backup get -> données', r.s === 200 && JSON.parse(r.j.data).fav[0] === 'a');
r = await call(env, '/backup/get', { code: 'ZZZZ-0000-ZZZZ-0000-ZZZZ' }); ok('backup inconnu -> 404', r.s === 404, String(r.s));
r = await call(env, '/backup/put', { code: 'court', data: '{}' }); ok('backup code trop court -> 400', r.s === 400, String(r.s));
r = await call(env, '/backup/put', { code, data: 'pas json' }); ok('backup données non JSON -> 400', r.s === 400, String(r.s));

// 7. sync + tâche planifiée avec un abonnement abîmé
env = makeEnv(false);
const kk = Object.fromEntries(['verse', 'saint', 'rulem', 'rulee', 'feast', 'cards', 'streak'].map((n) => [n, { on: true, h: 0 }]));
r = await call(env, '/sync', { sub: { endpoint: 'https://push.example/abc', keys: { p256dh: 'x', auth: 'y' } }, tz: 'Europe/Paris', k: kk, last: '', n: 1 }); ok('sync valide -> 204', r.s === 204, String(r.s));
r = await call(env, '/sync', { sub: { endpoint: 'http://non-https' }, tz: 'Europe/Paris', k: kk, n: 1 }); ok('sync http -> 400', r.s === 400, String(r.s));
r = await call(env, '/sync', { sub: { endpoint: 'https://push.example/abc' }, tz: 'Pas/Une/Zone', k: kk, n: 1 }); ok('sync fuseau invalide -> 400', r.s === 400, String(r.s));
env._m.set('s:corrompu', JSON.stringify({ endpoint: 'https://p/x', tz: 'Zone/Invalide', k: kk, sent: {} }));
env._m.set('s:jsoncasse', '{pas json');
let threw = false; try { await worker.scheduled({}, env, { waitUntil: (p) => p.catch(() => { threw = true; }) }); await new Promise((r) => setTimeout(r, 300)); } catch (e) { threw = true; }
ok('cron : abonnements abîmés ne font pas échouer la tâche', !threw);

console.log(res.join('\n'));
console.log(res.filter((x) => x.startsWith('ECHEC')).length + ' échec(s) sur ' + res.length);
