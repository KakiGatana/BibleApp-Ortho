/* Découvrir l'Orthodoxie (fiches simples) et glossaire. */
(function () {
  const O = window.ORTHO;

  /* t : titre ; intro ; pts : puces ; ret : « à retenir » ; liens : [[href, libellé]] */
  O.DECOUVRIR = [
    { t: `Qu’est-ce que l’Église orthodoxe ?`, intro: `C’est l’une des plus anciennes Églises chrétiennes. Elle se reconnaît dans l’Église des apôtres, et elle a gardé la même foi, les mêmes sacrements et la même liturgie depuis les premiers siècles.`, pts: [
      `Le mot « orthodoxe » vient du grec : « juste louange » et « juste foi ». Il dit à la fois comment on prie et ce qu’on croit.`,
      `Elle réunit plusieurs centaines de millions de fidèles, dans des Églises locales : grecque, russe, serbe, roumaine, bulgare, géorgienne, d’Antioche, et d’autres.`,
      `Il n’y a pas de chef unique comme le pape : chaque Église est dirigée par un évêque ou un patriarche, et toutes sont unies par la même foi et les mêmes sacrements. Les grandes décisions se prennent en conciles.`,
      `Elle s’est séparée de l’Église de Rome au fil des siècles (rupture souvent datée de 1054), pour des raisons à la fois de doctrine et d’histoire.`
    ], ret: `Une foi reçue des apôtres, une prière commune, des évêques unis dans la même foi, sans pape.`, liens: [['#/councils', 'Les conciles et les hérésies']] },

    { t: `Qui est Jésus-Christ ?`, intro: `Pour l’Orthodoxie, Jésus est Dieu fait homme : le Fils de Dieu, qui s’est incarné, est mort sur la croix et est ressuscité pour que nous ayons la vie éternelle.`, pts: [
      `Un seul Dieu en trois personnes : le Père, le Fils et le Saint-Esprit. On l’appelle la Trinité.`,
      `Le Fils s’est fait homme sans cesser d’être Dieu. Il est « vrai Dieu et vrai homme ».`,
      `La foi se résume dans le Symbole de Nicée-Constantinople (le Credo), que l’on dit à chaque liturgie.`,
      `Pâques (Pascha) est la plus grande fête : « Christ est ressuscité ! — En vérité il est ressuscité ! »`
    ], ret: `Le Christ est Dieu et homme ; la Résurrection est le cœur de la foi.`, liens: [['#/prayer/symbole', 'Le Credo']] },

    { t: `La Bible et la Tradition`, intro: `L’Écriture est le livre de l’Église. On la lit dans l’Église, à la lumière de la Tradition, c’est-à-dire de la façon dont les apôtres et les Pères l’ont comprise.`, pts: [
      `L’Ancien Testament est lu surtout dans sa traduction grecque, la Septante, que les apôtres utilisaient.`,
      `La Tradition n’ajoute rien à l’Écriture : c’est la vie de l’Église, avec la liturgie, les conciles et les Pères.`,
      `On entend beaucoup d’Écriture à l’église : les psaumes, l’Épître et l’Évangile à chaque liturgie.`
    ], ret: `On lit la Bible avec l’Église, pas seul contre elle.`, liens: [['#/bible', 'Les Écritures'], ['#/psalter', 'Le psautier']] },

    { t: `L’église : le lieu de la prière`, intro: `L’église orthodoxe a un plan simple : l’entrée (narthex), la nef où se tient l’assemblée, et le sanctuaire (l’autel) séparé par l’iconostase, un mur d’icônes.`, pts: [
      `L’iconostase n’est pas une cloison : ses icônes, surtout celles du Christ et de la Mère de Dieu, sont comme des fenêtres vers le ciel.`,
      `On entre, on se signe, on allume une bougie et on vénère les icônes. Les bougies sont une prière que l’on laisse brûler.`,
      `On prie debout la plupart du temps. Il y a souvent peu de chaises, et on peut s’asseoir si on en a besoin.`,
      `Les hommes et les femmes se tiennent parfois de chaque côté, selon les paroisses. Les femmes se couvrent souvent la tête dans certaines Églises : l’usage varie.`
    ], ret: `On vient comme on est, on se laisse guider par l’assemblée, et on n’a pas à tout comprendre dès le premier jour.`, liens: [['#/liturgy', 'La Divine Liturgie pas à pas']] },

    { t: `Les icônes`, intro: `Une icône est une image sacrée, peinte selon des règles très anciennes. On ne l’adore pas : on la vénère, et l’honneur rendu à l’image va à celui qu’elle représente.`, pts: [
      `Parce que Dieu s’est fait homme en Jésus, on peut représenter son visage. C’est pour cela que l’Église a défendu les icônes (concile de Nicée II, en 787).`,
      `Le style n’est pas réaliste : les visages sont calmes, le fond doré, pour montrer la lumière du Royaume.`,
      `On embrasse l’icône ou on s’incline devant elle, et on fait le signe de la croix.`
    ], ret: `L’icône est une fenêtre, pas une idole.`, liens: [['#/saints', 'Les saints et leurs icônes']] },

    { t: `La Divine Liturgie`, intro: `C’est l’office principal du dimanche. L’Église y écoute la Parole, puis célèbre l’Eucharistie : le pain et le vin deviennent le Corps et le Sang du Christ.`, pts: [
      `Elle dure souvent entre une heure et demie et deux heures. Elle se chante presque entièrement.`,
      `Seuls les fidèles préparés communient (baptisés, après confession, à jeun). Les autres peuvent rester, prier et recevoir ensuite le pain bénit (antidoron).`,
      `Il n’y a pas de « spectateurs » : toute l’assemblée prie, par le chant et les gestes.`
    ], ret: `La liturgie est le cœur de la vie de l’Église.`, liens: [['#/liturgy', 'La Divine Liturgie pas à pas']] },

    { t: `Les sacrements (les « mystères »)`, intro: `Ce sont des gestes de l’Église par lesquels Dieu agit dans la vie des fidèles.`, pts: [
      `Le baptême (par trois immersions) et la chrismation (onction avec le saint chrême) se donnent ensemble, même aux petits enfants.`,
      `L’Eucharistie, la confession (la réconciliation), le mariage, l’onction des malades et l’ordination.`,
      `Les enfants baptisés communient dès leur plus jeune âge.`
    ], ret: `Les sacrements ne sont pas des « récompenses » : ce sont des moyens de guérison.`, liens: [] },

    { t: `Le jeûne`, intro: `Le jeûne orthodoxe ne se limite pas à la nourriture : c’est une manière de se rappeler que l’on dépend de Dieu et de partager avec les autres.`, pts: [
      `On jeûne le mercredi et le vendredi, et pendant quatre grands jeûnes : le Carême avant Pâques, le jeûne des Apôtres, le jeûne de la Dormition (début ou mi-août, selon le calendrier) et le jeûne de la Nativité.`,
      `Jeûner veut dire s’abstenir de viande, de laitages et d’œufs, parfois de poisson, d’huile et de vin, selon les jours (voir le calendrier de l’appli).`,
      `Le jeûne s’adapte : enfants, personnes malades, femmes enceintes en sont dispensés ou le vivent autrement. Parler avec son prêtre est la meilleure aide.`
    ], ret: `Le jeûne sans prière et sans charité ne vaut rien.`, liens: [['#/calendar', 'Le calendrier'], ['#/today', 'Jeûne du jour']] },

    { t: `La prière`, intro: `Prier, c’est parler à Dieu comme à quelqu’un de vivant. La tradition orthodoxe propose des prières simples et profondes.`, pts: [
      `Le signe de la croix : trois doigts joints (la Trinité), deux repliés (les deux natures du Christ), front, ventre, épaule droite, épaule gauche.`,
      `La Prière de Jésus : « Seigneur Jésus-Christ, Fils de Dieu, aie pitié de moi, pécheur. » On la répète en tenant une corde de prière (komboskini).`,
      `La prière du matin et du soir, et les prières avant les repas.`
    ], ret: `Quelques minutes par jour valent mieux qu’un long effort rare.`, liens: [['#/jesus', 'La Prière de Jésus'], ['#/rule/morning', 'Prière du matin']] },

    { t: `Marie et les saints`, intro: `Les saints sont des hommes et des femmes qui ont vécu l’Évangile jusqu’au bout. On les honore, et on leur demande de prier pour nous, comme on le demande à un ami.`, pts: [
      `La Mère de Dieu (Théotokos) est la première des saints : elle a donné naissance au Christ.`,
      `On ne prie pas les saints à la place de Dieu : on leur demande leur intercession.`,
      `Chaque jour du calendrier a ses saints. On fête aussi « son saint » (le saint dont on porte le nom).`
    ], ret: `L’Église est une famille qui comprend les vivants et ceux qui sont déjà auprès de Dieu.`, liens: [['#/saints', 'Les saints du jour']] },

    { t: `Devenir orthodoxe`, intro: `On entre dans l’Église par le baptême et la chrismation, après un temps de préparation appelé catéchuménat.`, pts: [
      `Le catéchumène apprend la foi, participe aux offices et prie, accompagné par un prêtre et souvent par un parrain ou une marraine.`,
      `La durée dépend de la paroisse et de la personne : quelques mois, parfois plus. Il n’y a pas de règle unique.`,
      `Une personne déjà baptisée dans une autre Église est souvent reçue par chrismation, selon les décisions de l’évêque.`
    ], ret: `Le meilleur premier pas est d’aller à l’église et de parler avec le prêtre.`, liens: [['#/parishes', 'Paroisses près de moi']] }
  ];

  /* Glossaire : [mot, définition] */
  O.GLOSS = [
    ['Ambon', `Petite estrade devant l’iconostase, d’où l’on lit l’Évangile et d’où le prêtre dit la prière finale.`],
    ['Anaphore', `La grande prière eucharistique, au cœur de la liturgie, où le pain et le vin deviennent le Corps et le Sang du Christ.`],
    ['Antidoron', `Pain bénit, mais non consacré, distribué à la fin de la liturgie. Tout le monde peut le recevoir.`],
    ['Apolytikion', `Autre nom du tropaire de la fête ou du saint, chanté en fin d’office ou à la liturgie.`],
    ['Autocéphale', `Se dit d’une Église qui élit son propre chef (patriarche ou métropolite), sans dépendre d’une autre.`],
    ['Autel (sainte table)', `La table au centre du sanctuaire, où se célèbre l’Eucharistie.`],
    ['Béma (sanctuaire)', `Partie de l’église derrière l’iconostase, où se trouve l’autel.`],
    ['Canon', `Grand poème de hymnes, divisé en neuf odes, chanté aux matines.`],
    ['Catéchumène', `Personne qui se prépare au baptême en apprenant la foi.`],
    ['Chrismation', `Sacrement qui suit le baptême : onction du saint chrême qui donne le sceau du Saint-Esprit.`],
    ['Chœur', `Groupe qui chante les offices. Le chant est presque toujours sans instrument.`],
    ['Diacre', `Ministre ordonné qui assiste le prêtre : il dit les litanies et lit l’Évangile.`],
    ['Dormition', `Fête de la mort de la Mère de Dieu (15 août) : on l’appelle ainsi car elle « s’est endormie » avant d’être élevée auprès de son Fils.`],
    ['Épiclèse', `Prière de la liturgie qui demande à l’Esprit Saint de descendre sur les dons du pain et du vin.`],
    ['Épître', `Lecture d’un livre des Actes ou d’une lettre des apôtres, avant l’Évangile.`],
    ['Eucharistie', `La communion au Corps et au Sang du Christ, au cœur de la liturgie. Du grec « action de grâces ».`],
    ['Euchologe', `Livre qui contient les prières et les offices du prêtre (baptême, mariage, etc.).`],
    ['Évêque', `Successeur des apôtres, responsable d’une Église locale (un diocèse).`],
    ['Hésychasme', `Tradition de prière silencieuse, surtout par la Prière de Jésus, pour trouver la paix intérieure (hésychia).`],
    ['Higoumène', `Supérieur d’un monastère ; parfois aussi un titre donné à un prêtre.`],
    ['Horologion (Livre des Heures)', `Livre des offices de la journée : matines, prime, tierce, sexte, none, vêpres, complies.`],
    ['Hypostase', `Mot grec pour « personne » dans la Trinité : un seul Dieu en trois hypostases.`],
    ['Iconostase', `Mur d’icônes qui sépare la nef du sanctuaire. Il porte surtout le Christ, la Mère de Dieu et les saints du jour.`],
    ['Kathisme', `Section du Psautier (il y en a vingt), lue ou chantée aux offices.`],
    ['Katavasia', `Hymne chanté à la fin de chaque ode du canon.`],
    ['Komboskini', `Corde de prière à nœuds (33, 50 ou 100) pour la Prière de Jésus.`],
    ['Kondakion', `Hymne court chanté en l’honneur de la fête ou du saint, avec le tropaire.`],
    ['Liturgie', `Du grec « service du peuple » : l’office principal de l’Église, où l’on célèbre l’Eucharistie.`],
    ['Matines (Orthros)', `Office du matin, très riche en hymnes, qui précède souvent la liturgie.`],
    ['Menées', `Livres de l’année : hymnes et offices de chaque jour, classés par mois.`],
    ['Métanie', `Grande inclinaison du corps jusqu’à terre, ou petite inclinaison jusqu’à la ceinture, accompagnée du signe de la croix.`],
    ['Narthex', `Entrée de l’église, avant la nef. Ancien lieu des catéchumènes.`],
    ['Nef', `Partie centrale de l’église, où se tient l’assemblée.`],
    ['Octoèque', `Livre des huit tons : les hymnes des dimanches, répartis sur un cycle de huit semaines.`],
    ['Panikhide', `Office pour les défunts, avec des prières pour leur repos (du grec « veillée de toute la nuit »).`],
    ['Pâques (Pascha)', `La Résurrection du Christ : la plus grande fête de l’année, qui ordonne tout le calendrier.`],
    ['Patriarche', `Évêque qui dirige une Église autocéphale ou de grande importance (Constantinople, Alexandrie, Antioche, Jérusalem, Moscou…).`],
    ['Philocalie', `Recueil de textes des Pères sur la prière et la vie spirituelle, très lu dans la tradition hésychaste.`],
    ['Prêtre', `Ministre ordonné qui célèbre les offices et les sacrements. Il peut être marié s’il l’est avant l’ordination.`],
    ['Proscomidie', `Préparation du pain et du vin dans l’autel, avant la liturgie.`],
    ['Prosphore', `Petit pain offert par les fidèles pour la liturgie, dont le prêtre extrait les parties consacrées.`],
    ['Prokimenon', `Verset de psaume chanté avant l’Épître.`],
    ['Staretz', `Ancien moine, père spirituel qui guide les fidèles.`],
    ['Stikhère', `Hymne court chanté aux vêpres et aux matines.`],
    ['Symbole (Credo)', `Profession de foi de Nicée-Constantinople, dite à chaque liturgie.`],
    ['Synaxe', `Assemblée liturgique, ou fête qui rassemble plusieurs saints.`],
    ['Théosis', `Divinisation : devenir participant de la vie de Dieu par la grâce, but de la vie chrétienne.`],
    ['Théotokos', `« Mère de Dieu » : titre de la Vierge Marie, défini au concile d’Éphèse (431).`],
    ['Trisagion', `Hymne « Dieu saint, Saint Fort, Saint Immortel, aie pitié de nous. »`],
    ['Tropaire', `Hymne court qui exprime le sens d’une fête ou d’un saint.`],
    ['Typikon', `Livre de règles qui fixe l’ordre des offices et des jeûnes, selon les jours et les fêtes.`],
    ['Vêpres', `Office du soir, qui ouvre le jour liturgique suivant.`],
    ['Vigiles', `Longue veillée de prière, la veille des grandes fêtes et des dimanches.`]
  ];
})();
