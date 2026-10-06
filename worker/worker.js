/* Blagovest push : Cloudflare Worker.
   - POST /sync        enregistre / met à jour un abonnement et ses préférences
   - POST /unsubscribe supprime un abonnement
   - cron (toutes les 15 min) : envoie un push VIDE (pas de chiffrement nécessaire) ;
     c'est le service worker de l'appli qui compose le texte. */

const enc = new TextEncoder();
const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64uJson = (o) => b64u(enc.encode(JSON.stringify(o)));
const unb64u = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

async function keyId(endpoint) {
  const h = await crypto.subtle.digest('SHA-256', enc.encode(endpoint));
  return 's:' + [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/* ---------- VAPID ---------- */
let signKey, pubKey;
async function vapidHeader(env, endpoint) {
  if (!signKey) {
    const jwk = JSON.parse(env.VAPID_PRIVATE_JWK);
    signKey = await crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
    const raw = new Uint8Array(65); raw[0] = 4; raw.set(unb64u(jwk.x), 1); raw.set(unb64u(jwk.y), 33);
    pubKey = b64u(raw);
  }
  const unsigned = b64uJson({ typ: 'JWT', alg: 'ES256' }) + '.' + b64uJson({ aud: new URL(endpoint).origin, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: env.VAPID_SUBJECT || 'mailto:contact@example.com' });
  const sig = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, signKey, enc.encode(unsigned));
  return 'vapid t=' + unsigned + '.' + b64u(sig) + ', k=' + pubKey;
}

async function sendPush(env, endpoint) {
  return fetch(endpoint, { method: 'POST', headers: { Authorization: await vapidHeader(env, endpoint), TTL: '14400', Urgency: 'normal', 'Content-Length': '0' } });
}

/* ---------- temps local ---------- */
function localParts(tz, date) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23', minute: '2-digit' }).formatToParts(date).map((x) => [x.type, x.value]));
  return { day: p.year + '-' + p.month + '-' + p.day, hour: +p.hour + +p.minute / 60 };
}
function prevDay(iso) {
  const d = new Date(iso + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}
const validTz = (tz) => { try { new Intl.DateTimeFormat('en', { timeZone: tz }); return true; } catch (e) { return false; } };
const isHour = (n) => Number.isInteger(n) && n >= 0 && n <= 23;
const isIso = (s) => s === '' || /^\d{4}-\d{2}-\d{2}$/.test(s);

/* ---------- HTTP ---------- */
const cors = (env) => ({ 'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400' });
const reply = (env, status, body) => new Response(body || null, { status, headers: cors(env) });

async function handle(req, env) {
  if (req.method === 'OPTIONS') return reply(env, 204);
  if (req.method !== 'POST') return reply(env, 405);
  const path = new URL(req.url).pathname;
  let b;
  try { b = JSON.parse(await req.text()); } catch (e) { return reply(env, 400); }

  if (path === '/unsubscribe') {
    if (typeof b.endpoint !== 'string') return reply(env, 400);
    await env.SUBS.delete(await keyId(b.endpoint));
    return reply(env, 204);
  }
  if (path === '/sync') {
    const sub = b.sub;
    if (!sub || typeof sub.endpoint !== 'string' || !/^https:\/\//.test(sub.endpoint) || sub.endpoint.length > 1000) return reply(env, 400);
    if (!validTz(b.tz) || !isHour(b.vh) || !isHour(b.sh) || !isIso(b.last || '') || !Number.isInteger(b.n)) return reply(env, 400);
    const key = await keyId(sub.endpoint);
    const old = JSON.parse((await env.SUBS.get(key)) || '{}');
    await env.SUBS.put(key, JSON.stringify({
      endpoint: sub.endpoint, tz: b.tz, verse: !!b.verse, streak: !!b.streak, vh: b.vh, sh: b.sh, last: b.last || '', n: b.n,
      sentV: old.sentV || '', sentS: old.sentS || ''
    }), { expirationTtl: 60 * 60 * 24 * 90 }); // un abonnement qui ne se resynchronise plus pendant 90 jours disparaît
    return reply(env, 204);
  }
  return reply(env, 404);
}

/* ---------- cron ---------- */
async function tick(env) {
  const now = new Date();
  let cursor;
  do {
    const page = await env.SUBS.list({ prefix: 's:', cursor });
    cursor = page.list_complete ? undefined : page.cursor;
    for (const { name } of page.keys) {
      const s = JSON.parse((await env.SUBS.get(name)) || 'null'); if (!s) continue;
      const t = localParts(s.tz, now);
      const due = (h) => t.hour >= h && t.hour < h + 3; // fenêtre de 3 h si un tick est manqué
      let send = false;
      if (s.verse && due(s.vh) && s.sentV !== t.day) { send = true; s.sentV = t.day; }
      // série : seulement si la dernière visite date d'hier (série en cours mais pas encore prolongée aujourd'hui)
      else if (s.streak && due(s.sh) && s.sentS !== t.day && s.last === prevDay(t.day) && s.n >= 1) { send = true; s.sentS = t.day; }
      if (!send) continue;
      try {
        const r = await sendPush(env, s.endpoint);
        if (r.status === 404 || r.status === 410) { await env.SUBS.delete(name); continue; }
      } catch (e) { continue; }
      await env.SUBS.put(name, JSON.stringify(s), { expirationTtl: 60 * 60 * 24 * 90 });
    }
  } while (cursor);
}

export default {
  fetch: (req, env) => handle(req, env).catch(() => reply(env, 500)),
  scheduled: (_e, env, ctx) => ctx.waitUntil(tick(env))
};
