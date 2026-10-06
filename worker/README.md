# Serveur de notifications (Cloudflare Worker, gratuit)

> Guide pas à pas, plus détaillé : [../NOTIFICATIONS.md](../NOTIFICATIONS.md)

Il envoie un « signal » vide chaque matin (verset) et chaque soir (rappel de série, seulement si tu n'as pas ouvert l'appli). Le texte est composé par le service worker de l'appli. Le serveur stocke seulement : abonnement push, fuseau, heures, dernière visite, longueur de série.

## Mise en place (une fois, ~10 min)

Prérequis : Node.js et un compte Cloudflare gratuit.

```bash
cd worker
node gen-vapid.mjs                              # affiche la clé publique et la clé privée
npx wrangler login
npx wrangler kv namespace create SUBS           # copie l'id dans wrangler.toml
npx wrangler secret put VAPID_PRIVATE_JWK       # colle la clé privée (la ligne JSON)
npx wrangler deploy                             # affiche l'URL du Worker
```

Puis dans `js/push-config.js` : renseigne `server` (URL du Worker) et `vapidKey` (clé publique). Dans `wrangler.toml`, mets l'adresse du site dans `ALLOWED_ORIGIN` et ton e-mail dans `VAPID_SUBJECT`, puis relance `npx wrangler deploy`.

Publie le site (HTTPS obligatoire), ouvre Réglages → Notifications → Activer.

## Notes
- iPhone / iPad : iOS 16.4+, et l'appli doit être ajoutée à l'écran d'accueil.
- Le cron tourne toutes les 15 minutes : une notification peut arriver avec jusqu'à ~15 min de retard.
- Quota gratuit Cloudflare (KV : 1 000 écritures/jour) : suffisant pour quelques centaines d'abonnés.
- Si le verset et le rappel de série sont réglés à des heures très proches, le service worker choisit celui dont l'heure est la plus proche de l'arrivée.
