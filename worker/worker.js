/* Blagovest : Cloudflare Worker.
   - POST /sync         enregistre / met à jour un abonnement push et ses préférences
   - POST /unsubscribe  supprime un abonnement
   - POST /ask          assistant théologique (voir ask.js)
   - POST /backup/put   sauvegarde (favoris, notes, progression) sous un code secret
   - POST /backup/get   récupère la sauvegarde d'un code
   - cron (toutes les 15 min) : envoie les notifications dues, avec un petit message chiffré
     {"k": "verse" | "saint" | …} ; le texte est composé par le service worker de l'appli. */
import { handleAsk } from './ask.js';

const enc = new TextEncoder();
const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64uJson = (o) => b64u(enc.encode(JSON.stringify(o)));
const unb64u = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
const concat = (...a) => { const o = new Uint8Array(a.reduce((n, x) => n + x.length, 0)); let p = 0; for (const x of a) { o.set(x, p); p += x.length; } return o; };

const KINDS = ['verse', 'saint', 'rulem', 'rulee', 'feast', 'cards', 'streak'];

async function sha(s, bytes) {
  const h = await crypto.subtle.digest('SHA-256', enc.encode(s));
  return [...new Uint8Array(h)].slice(0, bytes || 32).map((b) => b.toString(16).padStart(2, '0')).join('');
}
const keyId = async (endpoint) => 's:' + (await sha(endpoint));

/* ---------- chiffrement Web Push (RFC 8291, aes128gcm) ---------- */
async function hkdf(salt, ikm, info, len) {
  const k = await crypto.subtle.importKey('raw', ikm, 'HKDF', false, ['deriveBits']);
  return new Uint8Array(await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt, info }, k, len * 8));
}
export async function encryptPayload(keys, text) {
  const ua = unb64u(keys.p256dh), auth = unb64u(keys.auth);
  const eph = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
  const asPub = new Uint8Array(await crypto.subtle.exportKey('raw', eph.publicKey));
  const uaKey = await crypto.subtle.importKey('raw', ua, { name: 'ECDH', namedCurve: 'P-256' }, false, []);
  const secret = new Uint8Array(await crypto.subtle.deriveBits({ name: 'ECDH', public: uaKey }, eph.privateKey, 256));
  const ikm = await hkdf(auth, secret, concat(enc.encode('WebPush: info\0'), ua, asPub), 32);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const cek = await hkdf(salt, ikm, enc.encode('Content-Encoding: aes128gcm\0'), 16);
  const nonce = await hkdf(salt, ikm, enc.encode('Content-Encoding: nonce\0'), 12);
  const aes = await crypto.subtle.importKey('raw', cek, 'AES-GCM', false, ['encrypt']);
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv: nonce }, aes, concat(enc.encode(text), new Uint8Array([2]))));
  return concat(salt, new Uint8Array([0, 0, 16, 0]), new Uint8Array([asPub.length]), asPub, ct); // rs = 4096
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

async function sendPush(env, sub, kind) {
  const headers = { Authorization: await vapidHeader(env, sub.endpoint), TTL: '14400', Urgency: 'normal' };
  let body;
  if (sub.keys && sub.keys.p256dh && sub.keys.auth) {
    body = await encryptPayload(sub.keys, JSON.stringify({ k: kind }));
    headers['Content-Encoding'] = 'aes128gcm';
  } else headers['Content-Length'] = '0'; // ancien abonnement sans clés : signal vide
  return fetch(sub.endpoint, { method: 'POST', headers, body });
}

/* ---------- temps local ---------- */
function localParts(tz, date) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23', minute: '2-digit' }).formatToParts(date).map((x) => [x.type, x.value]));
  return { day: p.year + '-' + p.month + '-' + p.day, hour: +p.hour + +p.minute / 60 };
}
function shiftDay(iso, n) {
  const d = new Date(iso + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
const validTz = (tz) => { try { new Intl.DateTimeFormat('en', { timeZone: tz }); return true; } catch (e) { return false; } };
const isHour = (n) => Number.isInteger(n) && n >= 0 && n <= 23;
const isIso = (s) => s === '' || (typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s));

/* ---------- HTTP ---------- */
const cors = (env) => ({ 'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400' });
const reply = (env, status, body) => new Response(body || null, { status, headers: cors(env) });
const json = (env, status, obj) => new Response(JSON.stringify(obj), { status, headers: { ...cors(env), 'Content-Type': 'application/json' } });

const TTL_SUB = 60 * 60 * 24 * 90;

async function handleSync(env, b) {
  const sub = b.sub;
  if (!sub || typeof sub.endpoint !== 'string' || !/^https:\/\//.test(sub.endpoint) || sub.endpoint.length > 1000) return reply(env, 400);
  const keys = sub.keys && typeof sub.keys.p256dh === 'string' && typeof sub.keys.auth === 'string' && sub.keys.p256dh.length < 200 && sub.keys.auth.length < 60 ? { p256dh: sub.keys.p256dh, auth: sub.keys.auth } : null;
  if (!validTz(b.tz) || !isIso(b.last || '') || !Number.isInteger(b.n)) return reply(env, 400);
  const k = {};
  for (const name of KINDS) {
    const c = b.k && b.k[name];
    if (!c || typeof c.on !== 'boolean' || !isHour(c.h)) return reply(env, 400);
    k[name] = { on: c.on, h: c.h };
  }
  const fe = Array.isArray(b.fe) ? b.fe.filter(isIso).slice(0, 60) : [];
  const cd = Number.isInteger(b.cd) && b.cd >= 0 && b.cd < 100000 ? b.cd : 0;
  const rd = { m: isIso((b.rd || {}).m || '') ? (b.rd || {}).m || '' : '', e: isIso((b.rd || {}).e || '') ? (b.rd || {}).e || '' : '' };
  const key = await keyId(sub.endpoint);
  const old = JSON.parse((await env.SUBS.get(key)) || '{}');
  await env.SUBS.put(key, JSON.stringify({ endpoint: sub.endpoint, keys, tz: b.tz, k, last: b.last || '', n: b.n, fe, cd, rd, sent: old.sent || {} }), { expirationTtl: TTL_SUB });
  return reply(env, 204);
}

const CODE_RE = /^[A-Za-z0-9-]{16,48}$/;
async function handleBackup(req, env, path, b) {
  if (typeof b.code !== 'string' || !CODE_RE.test(b.code)) return reply(env, 400);
  const day = new Date().toISOString().slice(0, 10), ip = req.headers.get('CF-Connecting-IP') || 'inconnu';
  const qKey = 'bq:' + (await sha(ip, 12)) + ':' + day, used = +((await env.SUBS.get(qKey)) || 0);
  if (used >= 40) return json(env, 429, { error: 'limit', message: 'Trop de demandes aujourd’hui.' });
  const key = 'b:' + (await sha(b.code));
  if (path === '/backup/get') {
    const v = await env.SUBS.get(key);
    if (!v) return json(env, 404, { error: 'not_found', message: 'Aucune sauvegarde pour ce code.' });
    return json(env, 200, JSON.parse(v));
  }
  if (typeof b.data !== 'string' || b.data.length > 400000) return json(env, 413, { error: 'too_big', message: 'Sauvegarde trop volumineuse.' });
  try { JSON.parse(b.data); } catch (e) { return reply(env, 400); }
  await env.SUBS.put(qKey, String(used + 1), { expirationTtl: 172800 });
  await env.SUBS.put(key, JSON.stringify({ data: b.data, t: new Date().toISOString() }), { expirationTtl: 60 * 60 * 24 * 365 });
  return json(env, 200, { ok: true });
}

async function handle(req, env) {
  if (req.method === 'OPTIONS') return reply(env, 204);
  if (req.method !== 'POST') return reply(env, 405);
  const path = new URL(req.url).pathname;
  let b;
  try { b = JSON.parse(await req.text()); } catch (e) { return reply(env, 400); }
  if (!b || typeof b !== 'object') return reply(env, 400);

  if (path === '/ask') return handleAsk(req, env, b, cors(env));
  if (path === '/backup/put' || path === '/backup/get') return handleBackup(req, env, path, b);
  if (path === '/unsubscribe') {
    if (typeof b.endpoint !== 'string') return reply(env, 400);
    await env.SUBS.delete(await keyId(b.endpoint));
    return reply(env, 204);
  }
  if (path === '/sync') return handleSync(env, b);
  return reply(env, 404);
}

/* ---------- cron ---------- */
// Ancien format (avant les types multiples) : on le convertit à la volée.
function prefsOf(s) {
  if (s.k) return s.k;
  return { verse: { on: !!s.verse, h: s.vh }, streak: { on: !!s.streak, h: s.sh } };
}

function wanted(kind, s, t) {
  switch (kind) {
    case 'verse': case 'saint': return true;
    case 'rulem': return (s.rd || {}).m !== t.day;
    case 'rulee': return (s.rd || {}).e !== t.day;
    case 'feast': return (s.fe || []).includes(shiftDay(t.day, 1));
    case 'cards': return (s.cd || 0) > 0;
    case 'streak': return s.last === shiftDay(t.day, -1) && s.n >= 1;
    default: return false;
  }
}

async function tick(env) {
  const now = new Date();
  let cursor;
  do {
    const page = await env.SUBS.list({ prefix: 's:', cursor });
    cursor = page.list_complete ? undefined : page.cursor;
    for (const { name } of page.keys) {
      const s = JSON.parse((await env.SUBS.get(name)) || 'null'); if (!s) continue;
      const t = localParts(s.tz, now), prefs = prefsOf(s);
      s.sent = s.sent || {};
      let changed = false, gone = false;
      for (const kind of KINDS) {
        const c = prefs[kind];
        if (!c || !c.on || !(t.hour >= c.h && t.hour < c.h + 3) || s.sent[kind] === t.day || !wanted(kind, s, t)) continue;
        try {
          const r = await sendPush(env, s, kind);
          if (r.status === 404 || r.status === 410) { gone = true; break; }
          s.sent[kind] = t.day; changed = true;
        } catch (e) { /* on réessaiera au prochain passage */ }
      }
      if (gone) { await env.SUBS.delete(name); continue; }
      if (changed) await env.SUBS.put(name, JSON.stringify(s), { expirationTtl: TTL_SUB });
    }
  } while (cursor);
}

export default {
  fetch: (req, env) => handle(req, env).catch(() => reply(env, 500)),
  scheduled: (_e, env, ctx) => ctx.waitUntil(tick(env))
};
