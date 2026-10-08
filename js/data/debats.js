/* Cahier de débats : notes tirées de la discussion de théologie de l'utilisateur avec une IA, relues et nuancées.
   Chaque entrée : id, who (interlocuteurs : cath, prot, athee, tous), q (la thèse adverse), pts [[type, texte]…],
   table? {head, rows}, lim (« À nuancer » : ce qui, dans l'argument, prête le flanc), refs, avis? (true = opinion, pas doctrine). */
(function () {
  const O = window.ORTHO;
  O.DEBATS_WHO = [['tous', 'Tous'], ['cath', 'Catholiques'], ['prot', 'Protestants'], ['athee', 'Non-croyants']];

  O.DEBATS = [
    { id: 'anselme', who: ['cath', 'prot'], q: `« Le Christ a payé à Dieu le Père la dette de nos péchés : la justice divine exigeait une satisfaction. »`, pts: [
      ['Historique', `Anselme écrit Cur Deus Homo en 1098. Les Pères grecs (Athanase, Grégoire de Nysse, Jean Chrysostome) décrivent le salut surtout comme victoire sur la mort, guérison et divinisation, et non comme un acquittement juridique.`],
      ['Biblique', `Hébreux 2, 14-15 : le Christ prend chair et sang « afin que, par la mort, il détruise celui qui a la puissance de la mort ». Le verbe grec (katargeô) veut dire rendre inopérant, abolir. 1 Co 15, 26 : « le dernier ennemi qui sera détruit, c’est la mort ». Le tropaire pascal le chante : « ayant vaincu la mort par la mort ».`],
      ['Théologique', `Question à poser : si le Père exige une satisfaction avant de pardonner, qui a décidé du plan ? Le Père punit et le Fils sauve ? C’est introduire une division dans la Trinité, où les trois personnes agissent ensemble. Jn 3, 16 : c’est le Père qui donne son Fils par amour.`],
      ['Patristique', `Pour Athanase (De l’Incarnation), le Verbe prend un corps capable de mourir pour que la mort et la corruption cessent par la puissance de la résurrection : un langage de médecine et de victoire.`]
    ], lim: `À nuancer avant de dire « jamais » : Athanase emploie aussi le mot de dette (De l’Incarnation, 9, de mémoire : le Verbe offre son corps à la mort pour s’acquitter de la dette de tous), et les Pères parlent de rançon, de sacrifice et de substitution (Is 53, Ga 3, 13). L’anaphore de saint Basile parle d’une rançon donnée à la mort. Réponse solide : ces images existent, mais elles sont des images et non une théorie unique ; la dette est celle de la mort et de la corruption, non un honneur offensé qu’un Père courroucé devrait apaiser. Ne confonds pas non plus Anselme (satisfaction pour l’honneur de Dieu) avec la substitution pénale de Calvin (le Christ subit la punition) : ce sont deux théories différentes. Attends enfin la réplique : le Fils s’offre librement (Jn 10, 18), donc la Trinité n’est pas divisée.`, refs: `Athanase, De l’Incarnation ; Grégoire de Nazianze, Discours 45 (contre l’idée d’une rançon payée au diable ou au Père) ; Anselme, Cur Deus Homo.` },

    { id: 'sacrifice-eucharistie', who: ['prot', 'cath'], q: `« Si le Christ s’est offert une seule fois, pourquoi l’Eucharistie ? Est-ce un nouveau sacrifice ? »`, pts: [
      ['Biblique', `Le sacrifice du Christ est unique : « il s’est manifesté une seule fois pour abolir le péché par son sacrifice » (He 9, 24-26) ; « par une seule offrande, il a amené à la perfection pour toujours ceux qui sont sanctifiés » (He 10, 14). Les sacrifices de l’Ancien Testament étaient des figures : le sang des taureaux ne peut ôter les péchés (He 10, 4).`],
      ['Théologique', `L’Orthodoxie ne répète pas le sacrifice : l’Eucharistie est la participation à l’offrande unique et éternelle du Christ, qui dépasse le temps.`],
      ['Biblique', `Jn 6, 51 : « le pain que je donnerai, c’est ma chair, donnée pour la vie du monde ». Lc 22, 19 : « Faites ceci en mémoire de moi ». « Mémoire » traduit anamnèsis : pas un simple souvenir mental, mais une présence réelle de l’événement du salut.`]
    ], lim: `Face à un protestant, ne dis pas seulement « présence réelle » : il répondra « mémorial » (Zwingli) et citera Lc 22, 19. Appuie-toi sur Jn 6 (le Christ insiste, des disciples partent et il ne retire rien), 1 Co 10, 16 et 11, 27-29 (on peut être « coupable du corps et du sang »), puis sur Ignace (Smyrniotes 7) et Justin (Apologie, 66). Face à un catholique, précise ce qui change : l’Orthodoxie n’emploie pas la doctrine de la transsubstantiation comme explication.`, refs: `Ignace d’Antioche, Aux Smyrniotes 7 ; Justin, Première Apologie 66 ; Épître aux Hébreux.` },

    { id: 'romains8', who: ['prot'], q: `« Rm 8, 29-30 : ceux que Dieu a connus d’avance, il les a prédestinés, appelés, justifiés, glorifiés. C’est une chaîne incassable : le salut est décidé par Dieu seul. »`, pts: [
      ['Biblique', `Contexte (v. 28) : il s’agit de ceux « qui aiment Dieu ». Paul parle de croyants qui répondent à l’appel, non d’une liste décrétée au hasard.`],
      ['Théologique', `Le but de la prédestination, c’est d’être « conformes à l’image de son Fils » : Paul décrit la destination que Dieu prépare, pas un tri entre élus et damnés.`],
      ['Patristique', `Jean Chrysostome (Homélie 15 sur Romains) : l’appel est « selon le dessein » de Dieu, mais il n’est pas une contrainte. Dieu appelle tous, et tous ne répondent pas.`],
      ['Biblique', `La chaîne n’est pas automatique : on peut être « retranché » (Rm 11, 22) ; Paul craint d’être « disqualifié » (1 Co 9, 27). Les calvinistes lisent « connaître d’avance » comme « aimer et choisir d’avance » (Am 3, 2) ; la réponse orthodoxe est que le sens courant est la prescience, qui ne supprime pas la liberté.`]
    ], lim: `Ne prétends pas que c’est évident : les calvinistes ont des arguments sérieux sur le sens de « connaître » dans la Bible. Ta position tient surtout sur le contexte, sur les mises en garde de Paul lui-même et sur le fait qu’aucun Père grec ne lit ce passage comme une décision individuelle et éternelle.`, refs: `Jean Chrysostome, Homélies sur l’épître aux Romains.` },

    { id: 'romains9', who: ['prot'], q: `« Rm 9 : Jacob aimé et Ésaü haï, le potier et ses vases de colère : Dieu choisit qui il veut sauver et qui il veut perdre. »`, pts: [
      ['Biblique', `Jacob et Ésaü représentent des peuples : Gn 25, 23 (« deux nations sont dans ton sein ») ; Ml 1, 2-3 parle d’Édom. Paul traite de la vocation d’Israël et des païens dans l’histoire du salut, pas du destin éternel de chaque personne.`],
      ['Biblique', `Rm 9, 22-23 : Dieu a « préparé d’avance » les vases de miséricorde (verbe actif) ; les vases de colère sont « formés pour la perdition » (forme passive ou moyenne, sans que Dieu soit nommé). Chrysostome et d’autres y voient des vases qui se sont rendus tels eux-mêmes.`],
      ['Biblique', `Rm 11, 23 : les branches coupées peuvent être regreffées « si elles ne persistent pas dans l’incrédulité » : un réprouvé décrété ne pourrait pas l’être. 2 Tm 2, 20-21 : on peut « se purifier soi-même » pour devenir un vase d’honneur.`]
    ], lim: `Rm 9 est un texte vraiment difficile : le reconnaître te rend plus crédible. Le grec de « formés pour la perdition » est discuté entre passif et moyen, il ne tranche donc pas à lui seul.`, refs: `Jean Chrysostome, Homélies sur l’épître aux Romains (sur Rm 9).` },

    { id: 'cinq-points', who: ['prot'], q: `« Les cinq points du calvinisme sont bibliques (TULIP) : dépravation totale, élection inconditionnelle, expiation limitée, grâce irrésistible, persévérance des saints. »`, pts: [
      ['Biblique', `Voici des versets à opposer à chaque point (tableau). Évite le ping-pong de versets : ramène chaque réponse à la question « qui interprète ? ».`]
    ], table: { head: ['Point calviniste', 'Réponse'], rows: [
      ['Dépravation totale', `L’image de Dieu est abîmée, non détruite : Rm 2, 14-15 (les païens font « naturellement » ce que veut la loi).`],
      ['Élection inconditionnelle', `1 Tm 2, 4 ; 2 P 3, 9 ; Ez 18, 23 (« je ne prends pas plaisir à la mort du méchant »).`],
      ['Expiation limitée', `1 Jn 2, 2 (« pour les péchés du monde entier ») ; 1 Tm 4, 10.`],
      ['Grâce irrésistible', `Ac 7, 51 (« vous résistez toujours à l’Esprit Saint ») ; Mt 23, 37 (« et vous ne l’avez pas voulu »).`],
      ['Persévérance (« une fois sauvé, toujours sauvé »)', `He 6, 4-6 ; 2 P 2, 20-22 ; Ph 2, 12 (« travaillez à votre salut avec crainte et tremblement »).`]
    ] }, lim: `Les calvinistes répondent à chacun de ces versets : par exemple « tous » en 1 Tm 2, 4 voudrait dire « toutes sortes de gens ». Tu ne gagneras pas en alignant des versets ; ce tableau sert à montrer que l’Écriture seule n’impose pas leur lecture.`, refs: `Jean Cassien, Conférence 13 (la collaboration entre la grâce et la volonté).` },

    { id: 'sola-fide', who: ['prot'], q: `« Nous sommes sauvés par la foi seule (sola fide). »`, pts: [
      ['Biblique', `Jc 2, 24 : « l’homme est justifié par les œuvres, et non par la foi seulement ». C’est le seul endroit de la Bible où l’expression « foi seule » apparaît, et c’est pour la nier. Luther a d’ailleurs ajouté le mot « seul » (allein) dans sa traduction de Rm 3, 28.`],
      ['Biblique', `Les « œuvres de la loi » que Paul rejette sont la circoncision et les prescriptions mosaïques, non les œuvres d’amour. Le jugement dernier se fait sur la charité (Mt 25) et sur les œuvres (Rm 2, 6-7).`],
      ['Théologique', `Synergie : la grâce précède toujours, et l’homme l’accueille ou la refuse. Ce n’est pas un auto-salut.`]
    ], lim: `Les protestants répondent que Jacques parle de la foi vivante qui produit des œuvres, ce que Luther et Calvin enseignent aussi (« la foi seule justifie, mais la foi qui justifie n’est jamais seule »). La vraie divergence est sur ce que veut dire « justifier » (déclarer juste ou rendre juste). Attends l’accusation de semi-pélagianisme et réponds : la grâce est première.`, refs: `Jean Chrysostome, Homélies sur Romains ; Jean Cassien.` },

    { id: 'protestants-comparaison', who: ['prot'], q: `Qui croit quoi chez les protestants ? (repères pour savoir à qui on parle)`, pts: [
      ['Historique', `Point commun à tous : sola scriptura, sola fide, pas de succession apostolique, pas d’intercession des saints. Voici où ils diffèrent.`]
    ], table: { head: ['', 'Presbytériens', 'Luthériens', 'Baptistes'], rows: [
      ['Prédestination', `Westminster : élection au salut, et réprobation (voir la nuance plus bas).`, `Élection au salut ; la damnation vient de la faute de l’homme.`, `Variable : les Baptistes réformés (1689) sont calvinistes, d’autres non.`],
      ['Libre arbitre dans la conversion', `Non.`, `Non (Luther, Du serf arbitre).`, `Oui pour beaucoup.`],
      ['Baptême', `Des enfants, signe de l’alliance.`, `Des enfants : il régénère.`, `Des adultes seulement ; symbolique.`],
      ['Eucharistie', `Présence spirituelle (Calvin).`, `Présence réelle.`, `Mémorial (Zwingli).`],
      ['« Une fois sauvé, toujours sauvé »', `Oui (persévérance).`, `Non : on peut perdre la foi.`, `Très souvent oui.`]
    ] }, lim: `Ce tableau est une simplification : à l’intérieur de chaque famille il y a de nombreuses nuances. Demande d’abord à ton interlocuteur ce qu’il croit.`, refs: `Confession de Westminster ; Confession d’Augsbourg ; Confession baptiste de 1689.` },

    { id: 'protestants-strategie', who: ['prot'], q: `Comment débattre avec un protestant : par où commencer ?`, pts: [
      ['Philosophique', `Attaque la racine : sola scriptura, car tout le reste en découle. Qui a fixé le canon ? La Bible ne contient pas sa propre table des matières : c’est l’Église, avec sa Tradition, qui a reconnu les livres au IVᵉ siècle. 2 Th 2, 15 : « gardez les traditions que vous avez reçues, soit de vive voix, soit par lettre ». 1 Tm 3, 15 : l’Église est « colonne et soutien de la vérité ».`],
      ['Historique', `Leurs désaccords : presbytériens, luthériens et baptistes lisent la même Bible « seule » et se contredisent sur le baptême, l’Eucharistie et la prédestination. Évite le chiffre des « 45 000 dénominations », qui est gonflé : leurs désaccords réels suffisent.`],
      ['Historique', `« Montre-moi un Père qui l’enseigne » : la double prédestination (personne avant Augustin dans ses derniers écrits, et même lui ne va pas aussi loin que Calvin) ; l’Eucharistie comme simple symbole (personne : voir Ignace et Justin) ; le baptême réservé aux adultes (Origène dit que celui des enfants vient des apôtres ; Ac 16, 15 et 33).`],
      ['Philosophique', `Conseil de méthode : évite le ping-pong de versets, que personne ne gagne. Ramène toujours le débat à l’autorité : « Qui interprète ? » C’est là que leur position est la plus fragile.`]
    ], lim: `Réponse protestante à prévoir sur le canon : l’Église a reconnu les livres inspirés, elle ne les a pas rendus inspirés (« reconnaissance, non autorité »). Garde aussi en tête que le canon de l’Ancien Testament n’est pas le même chez les orthodoxes et chez les protestants.`, refs: `Irénée, Contre les hérésies III, 3 ; Athanase, 39ᵉ lettre festale.` },

    { id: 'lutheriens', who: ['prot'], q: `Débattre avec les luthériens.`, pts: [
      ['Historique', `Ils sont plus proches de toi sur les sacrements (baptême qui régénère, présence réelle). Il faut viser Du serf arbitre (pas de coopération de l’homme à la grâce) et sola fide.`],
      ['Historique', `Anecdote utile : des théologiens luthériens ont envoyé la Confession d’Augsbourg en grec au patriarche de Constantinople. Les théologiens de Tübingen (Andreae, Crusius) l’ont adressée à Jérémie II à partir de 1573 ; il leur a répondu point par point (réponses de 1576, 1579 et 1581) en la rejetant sur plusieurs points. Plus tôt, Mélanchthon avait déjà envoyé une version grecque, en 1559, au patriarche Joasaph II. L’Orthodoxie a donc déjà répondu officiellement aux luthériens.`]
    ], lim: `Cite Luther à un baptiste sur le baptême et l’Eucharistie : ça marche bien, parce que Luther est d’accord avec toi sur ces deux points.`, refs: `Les réponses de Jérémie II aux théologiens de Tübingen (1576-1581).` },

    { id: 'presbyteriens', who: ['prot'], q: `Débattre avec les presbytériens : la double prédestination.`, pts: [
      ['Philosophique', `La double prédestination fait de Dieu l’auteur de la damnation. Question directe : « Dieu a-t-il créé certains hommes dans le but de les damner, sans qu’ils puissent rien y faire ? » La plupart des fidèles sont mal à l’aise avec la réponse.`],
      ['Historique', `Confession de Westminster, chap. III : « d’autres sont préordonnés à la mort éternelle ».`]
    ], lim: `Ne caricature pas : beaucoup de presbytériens répondent « non », en distinguant deux choses. Dieu aurait choisi les uns et « laissé de côté » les autres, qui sont alors punis « pour leur péché » (Westminster III, 7). Ta question touche quand même un vrai problème, mais prépare-toi à cette réponse (position dite « infralapsaire »).`, refs: `Confession de Westminster, III.` },

    { id: 'evolution-adam', who: ['athee', 'prot'], avis: true, q: `Évolution, Adam et Ève : quel modèle ? (avis, non doctrine orthodoxe)`, pts: [
      ['Théologique', `Modèle jugé le plus solide, sur ces quatre points : (1) l’évolution par les causes secondes : Dieu crée le monde avec ses lois et le fait exister à chaque instant ; (2) l’âme créée directement : à un moment, Dieu donne à des êtres biologiquement prêts l’image de Dieu, une âme raisonnable et libre ; (3) un Adam et une Ève réels : premiers porteurs de cette image, ou couple choisi au sein d’une population plus large (des modèles généalogiques montrent qu’un couple peut être l’ancêtre de tous les humains actuels) ; (4) le Paradis comme mode d’existence (Maxime le Confesseur) : Adam était appelé à une vie en communion qui l’aurait gardé de la mort ; en chutant, il est tombé dans le régime ordinaire du monde biologique, la corruption et la mort (les « tuniques de peau » chez Grégoire de Nysse).`],
      ['Théologique', `Ce modèle respecte la science, l’Écriture (un Adam réel, une chute réelle, Rm 5) et les Pères (Maxime, Grégoire de Nysse).`]
    ], lim: `C’est une opinion, pas une doctrine : l’Église orthodoxe n’a pas de position définie sur l’évolution, et les orthodoxes ne sont pas d’accord entre eux. Point faible reconnu : la souffrance et la mort animales avant l’homme (il y a des réponses partielles, aucune décisive). Les alternatives sont le littéralisme (Séraphim Rose : cohérent mais en désaccord avec la science) et un Adam purement symbolique (qui affaiblit Rm 5, 12). Le modèle du « couple ancestral » est lui-même discuté par les scientifiques.`, refs: `Maxime le Confesseur, Ambigua ; Grégoire de Nysse, Sur la création de l’homme.` }
  ];
})();
