# Activer les notifications, pas à pas

Les notifications (verset du jour, rappel de série) ont besoin d'un petit « facteur » sur Internet : un **Worker Cloudflare**, gratuit. L'appli ne peut pas se réveiller toute seule quand elle est fermée ; c'est le facteur qui sonne chez elle à l'heure choisie. Le texte du verset, lui, est choisi par l'appli sur ton téléphone.

Compte environ 15 minutes, une seule fois.

## Ce qu'il te faut
1. **Node.js** (version LTS) : https://nodejs.org → installer, puis rouvrir le terminal.
2. Un **compte Cloudflare gratuit** : https://dash.cloudflare.com/sign-up
3. Ton site **publié en HTTPS** (GitHub Pages convient). Sans HTTPS, les notifications ne marchent pas.

## Étape 1 : créer les clés
Dans un terminal (PowerShell), à l'intérieur du dossier du projet :

```bash
cd worker
node gen-vapid.mjs
```

Le script affiche deux choses :
- une **clé publique** (une ligne courte) → on la mettra dans l'appli ;
- une **clé privée** (une ligne qui commence par `{"kty"`) → on la mettra chez Cloudflare. **Ne la partage jamais.**

Garde cette fenêtre ouverte ou copie les deux dans un fichier temporaire.

## Étape 2 : mettre le facteur en ligne
Toujours dans le dossier `worker`, ligne par ligne :

```bash
npx wrangler login
```
(le navigateur s'ouvre : autorise l'accès)

```bash
npx wrangler kv namespace create SUBS
```
Il affiche un `id = "…"`. **Copie cet id** et colle-le dans `wrangler.toml`, à la place de `REMPLACE_PAR_L_ID_KV`.

Dans le même fichier `wrangler.toml`, change aussi :
- `VAPID_SUBJECT` → `"mailto:ton-adresse@mail.com"`
- `ALLOWED_ORIGIN` → l'adresse de ton site **sans chemin**, par exemple `"https://ilann.github.io"` (pas `https://ilann.github.io/blagovest/`).

```bash
npx wrangler secret put VAPID_PRIVATE_JWK
```
Colle la **clé privée** (toute la ligne) puis Entrée.

```bash
npx wrangler deploy
```
À la fin, il affiche l'adresse du facteur, du genre `https://blagovest-push.TON-COMPTE.workers.dev`. **Copie-la.**

## Étape 3 : relier l'appli au facteur
Ouvre `js/push-config.js` et remplis les deux lignes :

```js
server: 'https://blagovest-push.TON-COMPTE.workers.dev',
vapidKey: 'LA_CLE_PUBLIQUE'
```

Publie à nouveau le site.

## Étape 4 : activer sur ton téléphone
- **Android (Chrome)** : ouvre le site, menu → « Installer l'application », puis Réglages → Notifications → Activer, accepte la demande.
- **iPhone / iPad** : il faut **iOS 16.4 ou plus**. Dans Safari : Partager → « Sur l'écran d'accueil ». Ouvre l'appli **depuis l'icône** (pas depuis Safari), puis Réglages → Notifications → Activer.
- **Ordinateur** : marche aussi (Chrome, Edge, Firefox), appli ouverte dans le navigateur ou installée.

Choisis ensuite l'heure du verset (par défaut 7h) et celle du rappel de série (par défaut 20h).

## Si ça ne marche pas
- *« Serveur non configuré »* dans les Réglages : l'étape 3 n'a pas été publiée.
- *Rien n'arrive* : attends jusqu'à 15 minutes après l'heure choisie (le facteur passe toutes les 15 minutes). Vérifie que le téléphone n'est pas en économie d'énergie stricte pour le navigateur.
- *Refusé / bloqué* : les notifications sont coupées pour le site dans les réglages du navigateur ; réautorise-les.
- *Erreur à l'étape 2* : relance la commande en lisant le message ; le plus souvent l'`id` KV est mal collé dans `wrangler.toml`.

## Vie privée
Le facteur retient seulement : ton adresse d'abonnement push, ton fuseau horaire, tes deux heures, la date de ta dernière visite et la longueur de ta série. Pas de favoris, pas de notes. Désactiver l'interrupteur supprime l'abonnement.
