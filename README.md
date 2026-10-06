# Blagovest · Благовѣстъ

Application orthodoxe (PWA, hors ligne) : Écriture en français et slavon d'Église, calendrier liturgique, verset quotidien, prières mot à mot, apprentissage du slavon, théologie.

## Fonctionnalités
- **Calendrier** : Pâques (comput julien), fêtes mobiles et fixes, jeûnes, tons de l'Octoèque, saints de chaque jour — calendrier julien révisé ou julien.
- **Verset du jour** (366, dont 218 avec le slavon), méditation, favoris, notes, série de jours.
- **Écritures** parallèles FR / slavon : psaumes (dont 129 et 102), parabole du fils prodigue, Isaïe 53, canon orthodoxe, plan de lecture du NT.
- **Prières** avec lecture interlinéaire, prononciation et écoute ; **règle du matin et du soir** à cocher chaque jour.
- **Recherche globale** (écritures, prières, fêtes, théologie, vocabulaire slavon, versets), insensible aux accents.
- **Slavon** : alphabet, leçons, vocabulaire, cartes à répétition espacée, quiz.
- **Théologie** : 15 articles, 7 conciles, fêtes avec tropaires FR / slavon.
- **Notifications** (facultatif) : verset du jour et rappel de série, voir [NOTIFICATIONS.md](NOTIFICATIONS.md).

## Lancer en local
Aucun build : servir le dossier avec un serveur statique, par exemple `python -m http.server`, puis ouvrir http://localhost:8000.

## Déploiement
Site statique à publier en HTTPS (GitHub Pages par exemple). Les notifications demandent en plus le petit serveur du dossier `worker/`.

## Avertissement
Règles de jeûne indicatives ; textes slavons et citations patristiques à vérifier dans les livres liturgiques. Voir la page « À propos » de l'application.
