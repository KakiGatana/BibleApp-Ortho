/* Configuration des notifications (voir worker/README.md) */
window.BLAGOVEST_PUSH = {
  server: 'https://blagovest-push.ilann-jakubas.workers.dev',      // URL du Worker Cloudflare, ex. 'https://blagovest-push.moncompte.workers.dev'
  vapidKey: 'BBj0zofi9VdRym8gqlEIQwq_uztFJ35Nl8Jo5IgwB6rtbOcDA9zQUjLzyUa9YdI5Efih6Zil3GFMIA_zcEFoP-c'     // clé publique VAPID (affichée par worker/gen-vapid.mjs)
};
