# Sécurité de Blagovest

## Ce que l'appli stocke, et où
- **Sur ton appareil seulement** : favoris, notes, progression, réglages (navigateur, `localStorage`). Aucun compte, aucun mot de passe.
- **Sauvegarde par code (facultative)** : tes données sont **chiffrées sur ton appareil** (AES-GCM, clé dérivée de ton code par PBKDF2) avant d'être envoyées. Le serveur ne reçoit ni le code ni tes notes en clair, seulement un identifiant dérivé et un texte chiffré. Qui perd son code perd sa sauvegarde : personne ne peut la déchiffrer à sa place.
- **Notifications (facultatives)** : l'adresse d'abonnement du navigateur, le fuseau horaire, les heures choisies et la longueur de la série. Pas de nom, pas d'e-mail.
- **Assistant et traduction** : le texte de la question (et le passage affiché) part vers le serveur de l'appli puis vers l'API d'Anthropic. Rien n'est associé à une identité. La clé de l'API reste côté serveur.

## Protections en place
- **Serveur (Cloudflare Worker)** : clé de l'IA et clé privée des notifications en secrets Cloudflare, jamais dans le dépôt ; appels acceptés seulement depuis le site (en-tête `Origin`, CORS limité) ; limite de débit par IP ; limites quotidienne et mensuelle sur l'assistant et la traduction (le service s'arrête au lieu de dépenser sans plafond) ; taille des requêtes bornée ; adresses de notification limitées aux services connus (Google, Mozilla, Apple, Microsoft) pour empêcher tout détournement du serveur ; en-têtes `nosniff`, `no-store`.
- **Appli (navigateur)** : politique de sécurité du contenu (CSP) qui n'autorise que les scripts du site, aucun script en ligne ; tout texte affiché est échappé ; liens externes en `noopener` ; liens Spotify/YouTube reconstruits et vérifiés ; fichiers importés nettoyés (clés `__proto__`, `constructor` refusées) ; le service worker n'accepte de relayer une question que vers le serveur de Blagovest.
- **Dépôt** : aucun secret versionné ; détection de secrets et blocage à l'envoi activés ; alertes et mises à jour de sécurité des dépendances activées ; dépendances figées.

## Limites connues
- Le code de l'appli est lisible par n'importe quel visiteur (c'est le cas de toute appli web).
- Le contrôle d'origine du serveur écarte les robots simples mais n'est pas une authentification : quelqu'un peut imiter l'en-tête. Les plafonds de dépense sont la vraie protection.
- Sans compte, impossible de distinguer deux personnes derrière la même adresse IP.

## Signaler un problème
Ouvre un signalement privé : onglet « Security » du dépôt GitHub → « Report a vulnerability ». Merci de ne pas publier la faille avant correction.
