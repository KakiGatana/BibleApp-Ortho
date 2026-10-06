// Génère une paire de clés VAPID. Usage : node gen-vapid.mjs
// - la clé publique va dans js/push-config.js (vapidKey)
// - la clé privée (JWK) va dans le secret Cloudflare VAPID_PRIVATE_JWK. Ne la publie jamais.
import { webcrypto as crypto } from 'node:crypto';

const b64u = (b) => Buffer.from(b).toString('base64url');
const { publicKey, privateKey } = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
const raw = new Uint8Array(await crypto.subtle.exportKey('raw', publicKey));
const jwk = await crypto.subtle.exportKey('jwk', privateKey);

console.log('CLÉ PUBLIQUE (js/push-config.js → vapidKey) :\n' + b64u(raw) + '\n');
console.log('CLÉ PRIVÉE (secret VAPID_PRIVATE_JWK, à coller quand wrangler la demande) :\n' + JSON.stringify(jwk));
