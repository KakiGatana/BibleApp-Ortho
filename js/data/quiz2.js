/* Quiz de culture orthodoxe : questions supplémentaires et catégories.
   On ajoute à la fin de O.QUIZ (l'ordre sert d'identifiant pour suivre ce que tu as déjà réussi). */
(function () {
  const O = (window.ORTHO = window.ORTHO || {});
  const Q = (cat, q, a, c, e) => ({ cat, q, a, c, e });
  O.QUIZ = O.QUIZ || [];
  O.QUIZ.push(
    /* ----- histoire de l'Église ----- */
    Q('histoire', 'En quelle année s’est tenu le premier concile de Nicée ?', ['325', '381', '431', '451'], 0, 'En 325, sous l’empereur Constantin. Il a condamné l’arianisme et posé les premiers articles du Symbole de foi.'),
    Q('histoire', 'Quel concile a défini que le Christ est une seule personne en deux natures, divine et humaine ?', ['Nicée I', 'Éphèse', 'Chalcédoine', 'Nicée II'], 2, 'Chalcédoine (451) : une seule personne du Fils en deux natures, « sans confusion, sans changement, sans division, sans séparation ».'),
    Q('histoire', 'Quel concile (787) a rétabli la vénération des icônes ?', ['Nicée II', 'Constantinople IV', 'Éphèse', 'Chalcédoine'], 0, 'Nicée II est le septième et dernier concile œcuménique. Le triomphe définitif des icônes est célébré le premier dimanche du Grand Carême (843).'),
    Q('histoire', 'En quelle année Constantinople est-elle tombée aux mains des Ottomans ?', ['1054', '1204', '1453', '1517'], 2, 'Le 29 mai 1453, après un siège de plusieurs semaines, sous Mehmed II.'),
    Q('histoire', 'À quelle date situe-t-on traditionnellement le « Grand Schisme » entre Rome et Constantinople ?', ['787', '1054', '1204', '1453'], 1, 'En 1054, par des excommunications mutuelles. La rupture a en réalité été progressive, et le sac de Constantinople en 1204 l’a beaucoup aggravée.'),
    Q('histoire', 'Quel prince de Kiev a reçu le baptême en 988 et christianisé la Rus’ ?', ['Vladimir', 'Iaroslav le Sage', 'Alexandre Nevski', 'Dimitri Donskoï'], 0, 'Saint Vladimir le Grand, « égal aux Apôtres ». Son baptême est le point de départ de l’Église russe.'),
    Q('histoire', 'Quel empereur a convoqué le premier concile œcuménique ?', ['Constantin Ier', 'Justinien', 'Théodose Ier', 'Héraclius'], 0, 'Constantin Ier a réuni les évêques à Nicée en 325. Sa mère, sainte Hélène, est liée à la découverte de la Vraie Croix.'),
    Q('histoire', 'Quel empereur a fait reconstruire Sainte-Sophie de Constantinople, achevée en 537 ?', ['Constantin', 'Justinien', 'Théodose II', 'Basile II'], 1, 'Justinien Ier. Sainte-Sophie est restée le centre de l’Église byzantine pendant près de mille ans.'),
    Q('histoire', 'Quel Père de l’Église a écrit « Sur l’Incarnation du Verbe » ?', ['Basile le Grand', 'Athanase d’Alexandrie', 'Grégoire de Nysse', 'Maxime le Confesseur'], 1, 'Saint Athanase (vers 296-373), champion de la foi de Nicée. Il y écrit que « Dieu s’est fait homme pour que l’homme devienne dieu ».'),
    Q('histoire', 'Qui sont les « Trois Hiérarques » fêtés le 30 janvier (dates nominales) ?', ['Basile le Grand, Grégoire le Théologien et Jean Chrysostome', 'Athanase, Cyrille et Nicolas', 'Pierre, Paul et Jean', 'Antoine, Pacôme et Benoît'], 0, 'Trois grands évêques et docteurs du IVe siècle, patrons de l’enseignement et de la théologie.'),
    Q('histoire', 'Quel saint du XIVe siècle a défendu l’hésychasme et la distinction entre l’essence et les énergies divines ?', ['Grégoire Palamas', 'Siméon le Nouveau Théologien', 'Maxime le Confesseur', 'Jean Climaque'], 0, 'Grégoire Palamas, archevêque de Thessalonique (vers 1296-1359). Il est fêté le deuxième dimanche du Grand Carême.'),
    Q('histoire', 'Quel texte récite-t-on à chaque Liturgie pour confesser la foi ?', ['Le Symbole de Nicée-Constantinople', 'Le Notre Père', 'Le Trisagion', 'L’Axion estin'], 0, 'Le « Credo » : Nicée (325) pour le début, complété à Constantinople (381) pour l’Esprit Saint et la fin.'),
    /* ----- Bible ----- */
    Q('bible', 'Combien de kathismes divisent le Psautier ?', ['12', '20', '24', '40'], 1, 'Vingt kathismes (du grec « s’asseoir »). On lit tout le Psautier chaque semaine, et deux fois par semaine en Carême.'),
    Q('bible', 'Quel évangéliste est le seul à raconter la parabole du fils prodigue ?', ['Matthieu', 'Marc', 'Luc', 'Jean'], 2, 'Luc (chapitre 15), qui est aussi le seul à raconter celle du bon Samaritain.'),
    Q('bible', 'Quel évangile commence par « Au commencement était le Verbe » ?', ['Matthieu', 'Marc', 'Luc', 'Jean'], 3, 'L’Évangile selon Jean, lu à la Liturgie de Pâques. Saint Jean est appelé « le Théologien ».'),
    Q('bible', 'Qui a écrit les Actes des Apôtres ?', ['Pierre', 'Paul', 'Luc', 'Jean'], 2, 'Luc, médecin et compagnon de saint Paul, déjà auteur du troisième Évangile.'),
    Q('bible', 'Combien de Béatitudes compte le Sermon sur la montagne en Matthieu 5 ?', ['7', '8', '9', '12'], 2, 'Neuf béatitudes (Mt 5,3-12), chantées à la Liturgie avec des tropaires qui s’y mêlent.'),
    Q('bible', 'Dans quel livre se trouve le Magnificat (« Mon âme exalte le Seigneur ») ?', ['Matthieu', 'Luc', 'Psaumes', 'Isaïe'], 1, 'Luc 1,46-55 : le chant de la Vierge Marie lors de la Visitation. Il est chanté à chaque office de l’Orthros.'),
    Q('bible', 'Quel prophète est enlevé au ciel sur un char de feu ?', ['Élie', 'Élisée', 'Moïse', 'Isaïe'], 0, 'Élie, dont le successeur Élisée reçoit le manteau. La fête du prophète Élie est le 20 juillet (nominal).'),
    /* ----- liturgie et fêtes ----- */
    Q('liturgie', 'Quelle est la liturgie la plus souvent célébrée dans l’Église orthodoxe ?', ['Liturgie de saint Jean Chrysostome', 'Liturgie de saint Basile', 'Liturgie des Dons présanctifiés', 'Liturgie de saint Jacques'], 0, 'La Liturgie de saint Jean Chrysostome. Celle de saint Basile est célébrée dix fois par an, celle des Dons présanctifiés en semaine de Carême.'),
    Q('liturgie', 'Que veut dire « liturgie » en grec ?', ['Œuvre commune, service du peuple', 'Prière silencieuse', 'Chant des psaumes', 'Lecture de l’Évangile'], 0, 'De « leitourgia » : service public, œuvre du peuple. C’est l’action commune de toute l’Église.'),
    Q('liturgie', 'Que signifie « Alléluia » ?', ['Louez le Seigneur', 'Seigneur, aie pitié', 'Gloire à Dieu', 'Ainsi soit-il'], 0, 'De l’hébreu « hallelu-Yah » : louez le Seigneur.'),
    Q('liturgie', 'Que veut dire « Amen » ?', ['Ainsi soit-il', 'Gloire à Dieu', 'Béni soit-il', 'Seigneur, aie pitié'], 0, 'De l’hébreu : « c’est vrai, qu’il en soit ainsi ». Le peuple y répond pour faire sienne la prière.'),
    Q('liturgie', 'Quelle parabole est lue le dimanche qui ouvre le Triode, dix semaines avant Pâques ?', ['Le Fils prodigue', 'Le Publicain et le Pharisien', 'Le Bon Samaritain', 'Les Dix Vierges'], 1, 'Le dimanche du Publicain et du Pharisien (Lc 18). Il apprend l’humilité avant le Grand Carême, suivi du dimanche du Fils prodigue.'),
    Q('liturgie', 'Quels sont les deux jours de jeûne hebdomadaires ?', ['Mercredi et vendredi', 'Lundi et jeudi', 'Mardi et samedi', 'Vendredi et samedi'], 0, 'Le mercredi (trahison de Judas) et le vendredi (Crucifixion), sauf pendant certaines semaines sans jeûne.'),
    Q('liturgie', 'Que rappelle le jeûne du vendredi ?', ['La Crucifixion du Christ', 'La Résurrection', 'La Transfiguration', 'Le Baptême du Seigneur'], 0, 'Le vendredi est le jour de la Croix. Le mercredi rappelle la trahison de Judas.'),
    Q('liturgie', 'Quel livre liturgique contient les offices des fêtes et des saints à date fixe, mois par mois ?', ['La Menée', 'L’Octoèque', 'Le Triode', 'Le Pentécostaire'], 0, 'Les Menées (douze volumes, un par mois), qui suivent le calendrier fixe depuis le 1er septembre.'),
    Q('liturgie', 'Quel livre liturgique contient les offices du Grand Carême ?', ['Le Triode de Carême', 'La Menée', 'Le Pentécostaire', 'Le Psautier'], 0, 'Le Triode (de « trois odes » : les canons y sont plus courts). Il couvre la préparation au Carême, le Carême et la Semaine sainte.'),
    Q('liturgie', 'Quelle fête célèbre-t-on le 6 janvier (dates nominales) ?', ['La Théophanie (Baptême du Seigneur)', 'La Nativité', 'La Présentation au Temple', 'La Transfiguration'], 0, 'La Théophanie : le Baptême du Christ au Jourdain, manifestation de la Trinité. On y bénit l’eau.'),
    Q('liturgie', 'Quel jour célèbre-t-on la Transfiguration ?', ['6 août', '15 août', '14 septembre', '25 mars'], 0, 'Le 6 août (nominal), précédé d’une veille et sans jeûne strict : le poisson est permis.'),
    Q('liturgie', 'Combien de mois séparent l’Annonciation (25 mars) de la Nativité (25 décembre) ?', ['Sept', 'Huit', 'Neuf', 'Douze'], 2, 'Neuf mois : la fête de l’Annonciation marque la conception du Christ.'),
    Q('liturgie', 'Que célèbre la Pentecôte ?', ['La descente du Saint-Esprit sur les Apôtres', 'La Résurrection du Christ', 'L’Ascension', 'Le Baptême du Seigneur'], 0, 'La descente de l’Esprit Saint cinquante jours après Pâques. On l’appelle aussi la fête de la Sainte Trinité.'),
    Q('liturgie', 'Que répond-on à « Христосъ воскресе ! » (Christ est ressuscité) ?', ['« En vérité, il est ressuscité ! »', '« Amen »', '« Gloire à Dieu »', '« Béni soit-il »'], 0, '« Воистину воскресе ! » : le salut pascal, échangé jusqu’à l’Ascension.'),
    /* ----- foi et théologie ----- */
    Q('foi', 'Que veut dire « orthodoxie » ?', ['Droite foi et droite louange', 'Ancienne Église', 'Église universelle', 'Tradition des Pères'], 0, 'Du grec « orthos » (droit) et « doxa » (opinion, mais aussi gloire, louange).'),
    Q('foi', 'Que veut dire « Évangile » ?', ['Bonne nouvelle', 'Loi nouvelle', 'Parole de Dieu', 'Récit de vie'], 0, 'Du grec « euangelion » : bonne nouvelle. Le mot slavon « Благовѣстъ » en est le calque.'),
    Q('foi', 'Que veut dire « Christ » ?', ['Oint', 'Sauveur', 'Seigneur', 'Fils'], 0, 'De « Christos », traduction grecque de l’hébreu « Messie » : celui qui a reçu l’onction.'),
    Q('foi', 'Que signifie « Eucharistie » ?', ['Action de grâce', 'Repas fraternel', 'Offrande', 'Communion'], 0, 'Du grec « eucharistia » : action de grâce. C’est le cœur de la Liturgie.'),
    Q('foi', 'Quelle Personne de la Trinité s’est incarnée ?', ['Le Père', 'Le Fils', 'Le Saint-Esprit', 'Les trois'], 1, 'Le Fils, le Verbe de Dieu, né de la Vierge Marie par l’action du Saint-Esprit.'),
    Q('foi', 'Que désigne l’« hésychasme » ?', ['La prière silencieuse du cœur, dans la paix (hésychia)', 'Le chant polyphonique', 'Un pèlerinage', 'Un jeûne strict'], 0, 'De « hésychia » : le calme, le silence intérieur. Sa pratique centrale est la Prière de Jésus.'),
    Q('foi', 'Quel sacrement est donné juste après le baptême, avec le saint chrême ?', ['La chrismation', 'L’ordination', 'Le mariage', 'L’onction des malades'], 0, 'La chrismation : le « sceau du don du Saint-Esprit ». En Orthodoxie, baptême, chrismation et communion sont donnés ensemble, même aux enfants.'),
    Q('foi', 'Que signifie « Théotokos » ?', ['Celle qui a enfanté Dieu', 'Mère des Apôtres', 'Reine du ciel', 'Servante du Seigneur'], 0, 'Mère de Dieu : titre proclamé à Éphèse (431) pour affirmer que celui qu’elle a enfanté est vraiment Dieu.'),
    Q('foi', 'De combien de jours le calendrier julien est-il aujourd’hui en retard sur le calendrier grégorien ?', ['10', '11', '12', '13'], 3, 'Treize jours depuis 1900. Le calendrier « julien révisé » suit le civil pour les fêtes fixes, mais garde la Pâque julienne.'),
    /* ----- saints et Pères ----- */
    Q('saints', 'Quel jour fête-t-on saint Nicolas, selon le calendrier julien révisé ?', ['6 décembre', '25 décembre', '6 janvier', '19 décembre'], 0, 'Le 6 décembre (le 19 décembre dans le calendrier julien). Archevêque de Myre au IVe siècle, il est un des saints les plus aimés.'),
    Q('saints', 'Qui est considéré comme le père du monachisme ?', ['Antoine le Grand', 'Basile le Grand', 'Pacôme', 'Benoît'], 0, 'Saint Antoine (vers 251-356), dans le désert d’Égypte. Pacôme a organisé la vie commune des moines.'),
    Q('saints', 'Qui a écrit « L’Échelle du Ciel » (« Échelle sainte ») ?', ['Jean Climaque', 'Isaac le Syrien', 'Éphrem le Syrien', 'Syméon le Nouveau Théologien'], 0, 'Jean Climaque, higoumène du Sinaï (VIIe siècle) : trente échelons vers Dieu. Il est fêté le quatrième dimanche de Carême.'),
    Q('saints', 'Quel saint russe mort en 1833 disait : « Acquiers l’esprit de paix, et des milliers autour de toi seront sauvés » ?', ['Séraphin de Sarov', 'Serge de Radonège', 'Jean de Cronstadt', 'Nil Sorsky'], 0, 'Saint Séraphin de Sarov, fêté le 15 janvier (2 janvier selon le calendrier julien).'),
    Q('saints', 'Qui est le protomartyr, premier martyr chrétien ?', ['Étienne', 'Jacques', 'Pierre', 'Paul'], 0, 'Saint Étienne, diacre, lapidé à Jérusalem (Ac 7). Il est fêté le 27 décembre (nominal), juste après la Nativité.'),
    Q('saints', 'Quel est le nom du frère de saint Cyrille, avec qui il a évangélisé les Slaves ?', ['Méthode', 'Boniface', 'Clément', 'Boris'], 0, 'Saint Méthode, devenu archevêque de Moravie. Les deux frères sont fêtés le 11 mai (24 mai chez les Slaves).'),
    /* ----- culture, icônes, langues ----- */
    Q('culture', 'Quelle scène biblique inspire l’icône de la Trinité d’Andréi Roublev ?', ['L’hospitalité d’Abraham (les trois visiteurs de Mambré)', 'Le Baptême du Christ', 'La Pentecôte', 'La Transfiguration'], 0, 'Les trois anges reçus par Abraham et Sarah (Gn 18), compris par les Pères comme une image de la Trinité.'),
    Q('culture', 'Que veut dire le mot « icône » ?', ['Image', 'Prière', 'Fenêtre', 'Saint'], 0, 'Du grec « eikôn » : image. L’icône est une « fenêtre » sur le royaume, mais sa définition est l’image.'),
    Q('culture', 'Vers quelle direction regardent traditionnellement les églises orthodoxes ?', ['L’est (l’orient)', 'Le nord', 'Le sud', 'L’ouest'], 0, 'L’orient, d’où vient la lumière du Christ : on prie tourné vers l’est, l’autel étant à l’est.'),
    Q('culture', 'Où se trouve le mont Athos, la « Sainte Montagne » des moines ?', ['En Grèce, au nord de la mer Égée', 'En Russie', 'En Géorgie', 'En Égypte'], 0, 'Dans la presqu’île de Chalcidique, en Grèce. Une vingtaine de monastères y vivent depuis plus de mille ans.'),
    Q('culture', 'Comment fait-on le signe de la croix à l’orthodoxe ?', ['De la droite vers la gauche, avec trois doigts réunis', 'De la gauche vers la droite, main ouverte', 'Du front au cœur seulement', 'Avec deux doigts'], 0, 'Pouce, index et majeur réunis (la Trinité), les deux autres repliés (les deux natures du Christ) : front, poitrine, épaule droite puis gauche.'),
    Q('culture', 'Que veut dire « Благовѣстъ » (Blagovest) ?', ['Bonne nouvelle, et aussi le carillon des cloches', 'Paix du soir', 'Fête du saint', 'Veillée de nuit'], 0, 'Un mot slavon à double sens : l’annonce de la bonne nouvelle et le son des cloches qui appelle à la prière.'),
    Q('culture', 'Que signifie « Слава Богу за вся » ?', ['Gloire à Dieu pour toutes choses', 'Dieu est avec nous', 'Seigneur, aie pitié', 'Christ est ressuscité'], 0, 'Une expression chère aux Orthodoxes, attribuée à saint Jean Chrysostome sur son lit d’exil.')
  );

  // catégories : celles des nouvelles questions sont explicites ; les anciennes sont déduites des mots-clés
  O.QUIZ_CATS = { histoire: 'Histoire de l’Église', bible: 'Bible', liturgie: 'Liturgie et fêtes', foi: 'Foi et théologie', saints: 'Saints et Pères', culture: 'Culture et icônes' };
  O.quizCat = (q) => {
    if (q.cat) return q.cat;
    const t = q.q;
    if (/concile|schisme|Filioque|empereur|alphabet|Cyrille/i.test(t)) return 'histoire';
    if (/Septante|Testament|évangile|psaume|prophète/i.test(t)) return 'bible';
    if (/fête|jeûne|jour|carême|Dimanche|tropaire|Octoèque|Pâque|Pentecôte|Dormition|prière commence|Roi céleste/i.test(t)) return 'liturgie';
    if (/saint|Chrysostome|Hélène|Croix/i.test(t)) return 'saints';
    if (/théosis|Philocalie|Pâque/i.test(t)) return 'foi';
    return 'culture';
  };
})();
