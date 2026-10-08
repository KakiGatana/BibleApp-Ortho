/* Objections classiques contre la foi chrétienne et contre l'Orthodoxie, avec des pistes de réponse.
   Chaque entrée : id, cat ('foi' | 'orth'), q (objection), pts [[type, texte]…], lim (ce que l'argument ne prouve pas / difficultés réelles), lire (pour aller plus loin). */
(function () {
  const O = window.ORTHO;
  O.APOLO_KINDS = ['Philosophique', 'Théologique', 'Historique', 'Archéologique', 'Biblique', 'Patristique'];
  O.APOLO = [
    /* ======================= CONTRE LA FOI CHRÉTIENNE ======================= */
    { id: 'preuve', cat: 'foi', q: `« Dieu n’existe pas : il n’y a aucune preuve. »`, pts: [
      ['Philosophique', `Un argument classique part de la contingence : tout ce que nous observons pourrait ne pas être, et demande une raison d’être. Une chaîne de causes qui dépendent toutes d’autre chose n’explique pas pourquoi il y a quelque chose plutôt que rien (Leibniz). L’argument dit « kalam » ajoute que l’univers a commencé d’exister et demande donc une cause.`],
      ['Philosophique', `D’autres pistes : l’intelligibilité mathématique du monde, la conscience et la raison elles-mêmes, la réalité de valeurs morales qui s’imposent à nous. Aucune ne « démontre » à elle seule, mais ensemble elles rendent la foi raisonnable.`],
      ['Théologique', `La tradition orthodoxe est apophatique : Dieu n’est pas « un être parmi les êtres », un objet que l’on pourrait mettre dans un laboratoire (Denys l’Aréopagite, saint Grégoire Palamas). Demander une preuve d’un objet, c’est déjà mal poser la question.`],
      ['Théologique', `La foi n’est pas d’abord une conclusion mais une rencontre : « Viens et vois » (Jn 1, 46). La vie liturgique, la prière et la repentance sont la manière orthodoxe de « vérifier ».`]
    ], lim: `Ces arguments mènent au mieux à un Dieu créateur ; ils ne prouvent pas à eux seuls que Jésus est ressuscité ni que l’Église est la bonne. Ce sont des ouvertures, pas des preuves contraignantes.`, lire: `Pères : Basile le Grand, Hexaéméron ; Vladimir Lossky, Théologie mystique de l’Église d’Orient.` },

    { id: 'mal', cat: 'foi', q: `« Si Dieu est bon et tout-puissant, pourquoi le mal et la souffrance ? »`, pts: [
      ['Philosophique', `Le mal n’est pas une « chose » créée par Dieu, mais une privation, une blessure du bien (saint Basile, saint Maxime). Dieu a créé des êtres libres, et un amour imposé n’est plus de l’amour : la liberté rend le mal possible.`],
      ['Théologique', `L’Orthodoxie ne dit jamais « Dieu veut ta souffrance pour un plan ». La mort est « le dernier ennemi » (1 Co 15, 26), et non une volonté de Dieu. Christ entre dans la souffrance, pleure à la tombe de Lazare et meurt sur la croix.`],
      ['Biblique', `Le livre de Job refuse les explications faciles des amis de Job : Dieu ne justifie pas la souffrance, il se révèle à Job.`],
      ['Historique', `L’argument est aussi un argument pour la foi : pourquoi le mal nous scandalise-t-il tant, si l’univers n’est qu’indifférent ? Dostoïevski le montre : Ivan Karamazov refuse le monde, mais Aliocha répond par le baiser du Christ, non par une théorie.`]
    ], lim: `Aucune réponse n’épuise le mystère. Devant la souffrance d’un enfant, l’Église préfère se taire et prier plutôt que d’expliquer. C’est une vraie difficulté, qu’il ne faut pas minimiser.`, lire: `Dostoïevski, Les Frères Karamazov ; Olivier Clément, Questions sur l’homme.` },

    { id: 'science', cat: 'foi', q: `« La science a remplacé Dieu : foi et science sont incompatibles. »`, pts: [
      ['Philosophique', `La science répond à « comment ? » avec des méthodes qui laissent volontairement de côté les causes finales. Elle ne peut donc pas conclure qu’il n’y a rien d’autre. « Il n’existe que ce que la science mesure » est une affirmation philosophique, que la science elle-même ne peut pas prouver.`],
      ['Historique', `Georges Lemaître, prêtre catholique, proposa l’« atome primitif » (1931), origine de la théorie du Big Bang. Beaucoup de fondateurs de la science moderne étaient croyants. Le conflit « science contre religion » est en grande partie un récit du XIXᵉ siècle.`],
      ['Patristique', `Saint Basile (IVᵉ siècle), dans l’Hexaéméron, refuse de trancher des questions de physique (la forme de la terre, par exemple) : cela ne sert pas à notre salut. Les Pères lisent la Genèse sur plusieurs niveaux et ne sont pas des « créationnistes littéraux ». Le Big Bang ne prouve pas la création, mais s’accorde avec un monde qui a un commencement.`],
      ['Théologique', `L’Orthodoxie n’a pas de doctrine officielle sur l’évolution. Elle affirme que Dieu est Créateur et que l’homme est créé à son image, sans imposer un mécanisme.`]
    ], lim: `Les orthodoxes ne pensent pas tous la même chose sur l’évolution ou l’âge de la Terre. Certains tiennent une lecture plus littérale. L’Église n’a pas tranché.`, lire: `Saint Basile, Homélies sur l’Hexaéméron ; Jean-Claude Larchet, Le Chrétien face aux sciences.` },

    { id: 'jesus-existe', cat: 'foi', q: `« Jésus n’a jamais existé. »`, pts: [
      ['Historique', `Tacite (Annales, 15, 44, vers 116) rapporte que « Christus » a été supplicié sous Tibère par Ponce Pilate. Flavius Josèphe, historien juif, mentionne Jacques, « frère de Jésus appelé Christ » (Antiquités, 20, 200), et le passage plus long (18, 63) a probablement un noyau authentique retouché plus tard. Pline le Jeune (vers 112) décrit des chrétiens qui chantent le Christ « comme à un dieu ».`],
      ['Historique', `Saint Paul, dont les lettres datent des années 50, rencontre « Jacques, le frère du Seigneur » (Ga 1, 19) et Pierre à Jérusalem. Il est donc en contact avec des gens qui ont connu Jésus.`],
      ['Historique', `La grande majorité des historiens, croyants ou non (par exemple Bart Ehrman, agnostique), considère l’existence de Jésus comme certaine. La thèse « mythiste » est très minoritaire dans le monde universitaire.`]
    ], lim: `Prouver que Jésus a existé ne prouve pas qu’il est Dieu. C’est un point de départ historique.`, lire: `Richard Bauckham, Jesus and the Eyewitnesses ; Simon Claude Mimouni, Le Judéo-christianisme ancien.` },

    { id: 'evangiles', cat: 'foi', q: `« Les Évangiles sont tardifs, écrits par des anonymes et peu fiables. »`, pts: [
      ['Historique', `La plupart des chercheurs datent Marc d’environ 65-70, Matthieu et Luc de 70-90, Jean vers 90-100, soit une à deux générations après Jésus, c’est-à-dire pendant la vie de témoins. C’est très proche, pour l’Antiquité.`],
      ['Historique', `Saint Paul cite, en 1 Co 15, 3-7, une formule de foi qu’il a « reçue » et qui remonte, selon la plupart des chercheurs, à quelques années seulement après la mort de Jésus : il est mort, a été enseveli, est ressuscité, est apparu à Pierre, aux Douze, à plus de cinq cents frères.`],
      ['Archéologique', `Le Nouveau Testament compte environ 5 800 manuscrits grecs, bien plus que n’importe quel texte antique. Le fragment P52 (Évangile de Jean, vers 125, John Rylands) et les papyrus P66 et P75 (vers 200) sont très anciens. Le texte a été transmis avec une grande stabilité.`],
      ['Historique', `Des détails de lieux, de noms et de titres sont confirmés par des découvertes : Ponce Pilate (inscription de Césarée, 1961), Caïphe (ossuaire, 1990), le proconsul Gallion à Corinthe (inscription de Delphes, Ac 18, 12), le bassin de Siloé (fouillé en 2004).`]
    ], lim: `Les Évangiles sont des témoignages de foi, pas des biographies neutres. Leurs récits diffèrent sur certains détails, et les chercheurs débattent de leur genre littéraire.`, lire: `Richard Bauckham, Jesus and the Eyewitnesses ; Craig Blomberg, The Historical Reliability of the Gospels.` },

    { id: 'contradictions', cat: 'foi', q: `« La Bible est pleine de contradictions. »`, pts: [
      ['Théologique', `L’Orthodoxie ne lit pas l’Écriture comme un manuel scientifique ou un code, mais comme le livre de l’Église, lu dans la Tradition et à la lumière du Christ. On lit chaque passage selon son genre : histoire, poésie, loi, prophétie, sagesse.`],
      ['Historique', `Des témoignages indépendants qui diffèrent sur des détails sont plutôt un signe d’authenticité qu’un faux concerté. Saint Augustin (De consensu evangelistarum) et saint Jean Chrysostome traitent déjà ces difficultés.`],
      ['Biblique', `Beaucoup de « contradictions » (les généalogies de Matthieu et de Luc, les récits de Pâques, les nombres des Chroniques) s’expliquent par le genre, la perspective ou le style de comptage. Quelques-unes restent ouvertes.`]
    ], lim: `Il reste de vraies difficultés (nombres, parallèles, ordre des événements). L’honnêteté demande de le dire plutôt que d’avoir une réponse toute faite à tout.`, lire: `Pères : saint Jean Chrysostome, Homélies sur Matthieu.` },

    { id: 'resurrection', cat: 'foi', q: `« La résurrection est impossible : hallucination, vol du corps, légende. »`, pts: [
      ['Historique', `Faits largement admis, même par des chercheurs sceptiques : Jésus a été crucifié ; ses disciples ont cru l’avoir vu vivant ; Paul, persécuteur, et Jacques, frère sceptique, se sont convertis ; la prédication a commencé à Jérusalem, à l’endroit même de la tombe.`],
      ['Historique', `Les femmes sont les premiers témoins dans tous les Évangiles. Dans l’Antiquité, leur témoignage valait peu : on n’invente pas ainsi une légende.`],
      ['Historique', `Chaque explication de rechange a des difficultés : l’hallucination ne guérit pas une peur collective ni ne vide un tombeau ; le vol du corps ne rend pas des gens prêts à mourir pour ce qu’ils savent faux ; la légende tardive n’explique pas la formule de 1 Co 15.`],
      ['Philosophique', `« Les miracles sont impossibles » suppose que la nature est un système fermé, ce qui est une position philosophique, et non un résultat scientifique. Si Dieu existe, la résurrection n’est pas contradictoire.`],
      ['Théologique', `Pâques est le centre de la foi orthodoxe : « Christ est ressuscité ! » C’est la vie qui a vaincu la mort, pas seulement une idée.`]
    ], lim: `Ce sont des arguments de plausibilité. Aucun n’oblige à croire, car la résurrection se reçoit par la foi dans l’Église et la rencontre du Ressuscité.`, lire: `N. T. Wright, The Resurrection of the Son of God ; Gary Habermas.` },

    { id: 'mythes-pagans', cat: 'foi', q: `« Le christianisme a copié les mythes païens (Horus, Mithra, Dionysos…). »`, pts: [
      ['Historique', `Les parallèles célèbres (Horus né d’une vierge, avec douze disciples, crucifié et ressuscité) ne se trouvent pas dans les sources égyptiennes. Ce sont des inventions modernes (XIXᵉ siècle) qui circulent sur Internet.`],
      ['Historique', `Le mithraïsme romain est attesté à partir de la fin du Iᵉʳ siècle ; Mithra ne meurt ni ne ressuscite. Les dieux « mourants et ressuscitants » (Adonis, Osiris) renvoient au cycle des saisons, sans personnage historique ni date.`],
      ['Historique', `Les premiers chrétiens sont des Juifs : le cadre de la croix et de la résurrection est la Bible hébraïque, pas les cultes à mystères. Les païens se moquaient de la « folie » de la croix (1 Co 1, 23).`]
    ], lim: `Les chrétiens ont emprunté un vocabulaire et parfois des dates du monde païen (par exemple pour Noël, débattu), mais ils ne lui ont pas emprunté le contenu de la foi.`, lire: `Ronald Nash, The Gospel and the Greeks ; Jonathan Z. Smith (articles sur les dieux mourants).` },

    { id: 'religions', cat: 'foi', q: `« Toutes les religions se valent ; croire à une seule vérité est arrogant. »`, pts: [
      ['Philosophique', `Les religions affirment des choses incompatibles (Dieu personnel ou non, Christ Dieu ou prophète, réincarnation ou résurrection). Elles ne peuvent pas toutes être vraies sur ces points. Dire que toutes se valent est lui-même une prétention sur la vérité.`],
      ['Patristique', `Saint Justin martyr parle de « semences du Verbe » semées chez les philosophes païens : on peut reconnaître du vrai et du beau ailleurs sans nier que le Christ soit la plénitude de la vérité.`],
      ['Théologique', `L’humilité n’est pas de ne pas avoir de convictions, mais de ne pas mépriser ceux qui en ont d’autres. L’Orthodoxie ne prétend pas savoir qui est sauvé : « il n’y a qu’un juge » (Jc 4, 12).`]
    ], lim: `Dire que le christianisme est vrai ne dispense pas de respecter chacun et d’écouter les autres traditions.`, lire: `Saint Justin, Apologies ; Olivier Clément, Dialogues avec le patriarche Athénagoras.` },

    { id: 'violences', cat: 'foi', q: `« Les croisades, l’Inquisition, les guerres de religion : l’histoire du christianisme est violente. »`, pts: [
      ['Historique', `Les croisades et l’Inquisition sont des histoires de l’Occident latin. Les croisés ont même mis à sac Constantinople, capitale orthodoxe, en 1204. L’Orthodoxie n’a ni inquisition ni croisade.`],
      ['Théologique', `Les péchés des chrétiens ne réfutent pas l’Évangile, ils le jugent : le Christ dit « aimez vos ennemis ». Un enseignement se juge à son contenu, pas seulement aux fautes de ceux qui s’en réclament.`],
      ['Historique', `La violence du XXᵉ siècle est en grande partie athée (régimes communistes, qui ont persécuté des millions de chrétiens et fait des « nouveaux martyrs » orthodoxes). Cela ne prouve rien dans un sens ou l’autre : toute idéologie peut être violente.`]
    ], lim: `Il faut aussi le reconnaître : des Églises orthodoxes ont soutenu des pouvoirs injustes ou des guerres, et cela continue. L’Église est sainte, mais composée de pécheurs.`, lire: `Jean-Claude Larchet ; Mgr Hilarion Alfeyev, ouvrages sur les nouveaux martyrs.` },

    { id: 'beguille', cat: 'foi', q: `« La religion est une béquille psychologique (Freud, Marx). »`, pts: [
      ['Philosophique', `C’est un argument génétique : expliquer d’où vient une croyance ne dit pas si elle est vraie. On pourrait dire de l’athéisme qu’il répond au désir d’être libre de tout juge : cela ne dit rien non plus de sa vérité.`],
      ['Théologique', `Le contenu du christianisme n’a rien d’un « désir exaucé » : une croix, la repentance, les jeûnes, l’amour des ennemis, la mort à soi-même. Ce n’est pas ce qu’on inventerait pour se consoler.`],
      ['Philosophique', `C. S. Lewis : un désir que rien dans ce monde ne comble pourrait être un indice qu’il existe autre chose, de même que la faim indique la nourriture.`]
    ], lim: `Il est vrai que certains utilisent la religion comme un refuge. L’Église le sait et parle de « prélest » (illusion spirituelle).`, lire: `C. S. Lewis, Mere Christianity ; Freud, L’Avenir d’une illusion (pour juger sur pièces).` },

    { id: 'ancien-testament', cat: 'foi', q: `« Le Dieu de l’Ancien Testament est cruel (Canaan, massacres). »`, pts: [
      ['Théologique', `Pour les Pères, l’Ancien Testament se lit à la lumière du Christ, qui révèle le vrai visage de Dieu (Jn 14, 9). Des Pères comme Origène et saint Grégoire de Nysse lisent les récits de guerre de façon spirituelle : les « ennemis » sont les passions.`],
      ['Historique', `Le langage de la « destruction totale » (herem) est un langage de guerre du Proche-Orient ancien, souvent hyperbolique : Josué 10 dit que tout est anéanti, alors que les Juges 1 montrent des Cananéens toujours là.`],
      ['Archéologique', `L’archéologie ne montre pas de destruction générale et rapide de Canaan au moment que l’on suppose. Les spécialistes débattent de la nature et de l’ampleur de la « conquête ».`]
    ], lim: `Ces textes restent difficiles. L’Église ne les cache pas, elle les lit avec prudence et sans y chercher une autorisation de violence.`, lire: `Saint Grégoire de Nysse, Vie de Moïse ; Origène, Homélies sur Josué.` },

    { id: 'archeologie', cat: 'foi', q: `« L’archéologie contredit la Bible. »`, pts: [
      ['Archéologique', `Confirmations : la stèle de Tel Dan (IXᵉ s. av. J.-C.) mentionne la « maison de David » ; la stèle de Mérenptah (vers 1208 av. J.-C.) cite « Israël » ; la bulle d’Ézéchias (2015) ; l’inscription du tunnel de Siloé ; la « pierre de Pilate » (Césarée) ; l’ossuaire de Caïphe ; l’inscription d’Éraste à Corinthe (Rm 16, 23 ; identification débattue) ; les cinq portiques de la piscine de Bethesda (Jn 5).`],
      ['Archéologique', `Dura-Europos (Syrie, IIIᵉ siècle) : une maison-église avec baptistère et peintures, et une synagogue aux murs peints de scènes bibliques, ce qui contredit l’idée d’un judaïsme et d’un christianisme sans images.`],
      ['Historique', `Points débattus : l’Exode (aucune trace directe en Égypte), la conquête de Canaan, l’historicité de certains récits des patriarches. Les spécialistes sont partagés.`]
    ], lim: `L’archéologie ne peut ni prouver la foi ni la réfuter : elle éclaire le contexte. Dire qu’elle « prouve » la Bible, ou qu’elle l’a « détruite », est abusif dans les deux cas.`, lire: `Kenneth Kitchen, On the Reliability of the Old Testament ; Israel Finkelstein (point de vue critique, pour comparer).` },

    { id: 'dieu-cache', cat: 'foi', q: `« Si Dieu existait, il se montrerait clairement. »`, pts: [
      ['Philosophique', `Pascal : Dieu est assez visible pour ceux qui cherchent de tout leur cœur, et assez caché pour ceux qui ne veulent pas. Une évidence écrasante supprimerait la liberté de l’amour.`],
      ['Théologique', `Pour l’Orthodoxie, Dieu n’est pas loin : il est « partout présent et remplissant tout ». C’est notre cœur qui est endormi. D’où l’ascèse, la prière, la repentance qui « purifient l’œil » (Mt 5, 8).`],
      ['Historique', `Les chrétiens affirment que Dieu s’est montré : en Jésus-Christ, à une date et en un lieu, et dans les saints dont la vie témoigne de lui.`]
    ], lim: `Le silence de Dieu est une épreuve réelle, que les saints eux-mêmes ont traversée (Job, les psaumes de la déréliction, Mère Teresa).`, lire: `Pascal, Pensées ; saint Silouane de l’Athos.` },

    { id: 'enfer', cat: 'foi', q: `« Un enfer éternel est injuste et incompatible avec un Dieu d’amour. »`, pts: [
      ['Théologique', `Pour beaucoup de Pères orientaux, l’enfer n’est pas une prison conçue par un Dieu vengeur : c’est la rencontre avec l’amour de Dieu pour celui qui le refuse, vécue comme tourment. Saint Isaac le Syrien parle du « fouet de l’amour ».`],
      ['Philosophique', `Une liberté réelle suppose qu’on puisse dire non, y compris pour toujours. Un paradis imposé à celui qui n’en veut pas ne respecterait pas sa liberté.`],
      ['Théologique', `Origène a enseigné la « restauration finale » de tous ; sa forme a été condamnée (553). Saint Grégoire de Nysse l’a espérée sans qu’il soit condamné. Les théologiens orthodoxes actuels, comme Mgr Kallistos Ware, disent qu’on peut espérer le salut de tous sans l’affirmer.`]
    ], lim: `Les orthodoxes ne sont pas d’accord sur la façon d’en parler. Il ne s’agit pas de nier l’enfer, mais de ne pas le réduire à une punition arbitraire.`, lire: `Saint Isaac le Syrien, Homélies ascétiques ; Kallistos Ware, Dare We Hope for the Salvation of All?` },

    { id: 'trinite', cat: 'foi', q: `« La Trinité est absurde : 1 + 1 + 1 = 3. »`, pts: [
      ['Théologique', `La foi ne dit pas « trois dieux » ni « un seul Dieu en trois parties ». Elle dit : une seule essence (ousia) divine, trois personnes (hypostases) qui se donnent entièrement l’une à l’autre. Les Cappadociens (Basile, Grégoire de Nazianze, Grégoire de Nysse) l’ont précisé au IVᵉ siècle.`],
      ['Philosophique', `Ce n’est pas une contradiction (un et trois dans le même sens), mais un « un » et un « trois » sous deux rapports différents. On ne comprend pas Dieu comme on classe les choses ; toute analogie (le soleil, la rose, l’eau) est imparfaite.`],
      ['Biblique', `Les textes de la révélation : le baptême de Jésus (Mt 3, 16-17), la formule baptismale (Mt 28, 19), les salutations de saint Paul (2 Co 13, 13). L’histoire du salut montre un Dieu qui est amour : l’amour suppose une relation, donc des personnes.`]
    ], lim: `La Trinité reste un mystère, non une énigme à résoudre. Les Pères le disent eux-mêmes.`, lire: `Saint Grégoire de Nazianze, Discours théologiques ; Vladimir Lossky.` },

    { id: 'croix', cat: 'foi', q: `« Pourquoi Dieu aurait-il besoin de la mort sanglante du Christ ? »`, pts: [
      ['Théologique', `L’Orthodoxie n’enseigne pas que Dieu le Père « punit » son Fils pour apaiser sa colère (théorie de la substitution pénale, développée en Occident). Dieu n’est pas apaisé par du sang.`],
      ['Patristique', `Saint Athanase (Sur l’Incarnation) : le Fils se fait homme pour guérir notre nature malade de la mort et de la corruption. C’est « Christ vainqueur » : par sa mort il détruit la mort, descend aux enfers et en délivre les captifs (icône de la Résurrection).`],
      ['Biblique', `« Dieu était dans le Christ, réconciliant le monde avec lui-même » (2 Co 5, 19) : c’est Dieu qui vient à nous, et non nous qui aurions à l’apaiser.`]
    ], lim: `Les Pères emploient parfois le langage du sacrifice et de la rançon, mais comme des images, pas comme une théorie juridique.`, lire: `Saint Athanase, Sur l’Incarnation du Verbe ; saint Jean Damascène.` },

    { id: 'miracles', cat: 'foi', q: `« Les miracles n’existent pas (Hume). »`, pts: [
      ['Philosophique', `L’argument de Hume (un témoignage ne vaut pas contre l’expérience uniforme) suppose déjà que les miracles n’ont jamais eu lieu : il tourne en rond. La question est de savoir si, dans un cas précis, le témoignage est solide.`],
      ['Historique', `Des historiens et des médecins ont documenté des guérisons inexpliquées (le travail de Craig Keener, Miracles, rassemble un très grand nombre de témoignages). Cela ne prouve pas chaque cas, mais empêche de dire « il n’y en a jamais eu ».`],
      ['Théologique', `L’Église orthodoxe demande beaucoup de discernement : un miracle apparent n’est pas une preuve de sainteté (Mt 24, 24), et elle se méfie du « merveilleux » recherché pour lui-même. Les startsy conseillent de ne pas courir après les signes.`]
    ], lim: `Il y a eu des fraudes et des exagérations, et l’Église elle-même demande qu’on soit prudent. Les miracles sont un signe, pas un fondement de la foi.`, lire: `Craig Keener, Miracles ; saint Ignace Briantchaninov (sur le discernement).` },

    { id: 'morale', cat: 'foi', q: `« On peut être bon sans Dieu : la morale n’a pas besoin de religion. »`, pts: [
      ['Philosophique', `Oui, des athées peuvent être bons, et les chrétiens le reconnaissent (Rm 2, 14-15 : la loi est écrite dans les cœurs). La question n’est pas « peut-on être bon ? » mais « qu’est-ce qui fonde le bien ? ».`],
      ['Philosophique', `Si le bien n’est qu’un produit de l’évolution ou de la culture, il n’a pas plus de valeur que nos préférences. Si le bien est réel, il demande un fondement : pour le christianisme, la bonté de Dieu elle-même (réponse au dilemme d’Euthyphron).`],
      ['Théologique', `Pour l’Orthodoxie, la morale n’est pas d’abord une liste de règles : c’est la guérison de l’être par la communion avec Dieu (théosis).`]
    ], lim: `Cet argument montre une cohérence, pas une obligation de croire. Beaucoup d’athées vivent mieux que certains chrétiens, et il vaut mieux l’admettre.`, lire: `C. S. Lewis, L’Abolition de l’homme ; Dostoïevski.` },

    /* ======================= CONTRE L'ORTHODOXIE ======================= */
    { id: 'primaute', cat: 'orth', q: `« L’Église est fondée sur Pierre (Mt 16, 18) : le pape est le chef de l’Église. »`, pts: [
      ['Patristique', `Beaucoup de Pères lisent « sur cette pierre » comme la foi de Pierre (sa confession : « Tu es le Christ, le Fils du Dieu vivant »), et non sa personne seule. Saint Cyprien : « l’épiscopat est un, et chaque évêque en possède une part solidaire ». Pour saint Augustin, Pierre « représente » toute l’Église.`],
      ['Historique', `Au premier millénaire, Rome a une primauté d’honneur et de service (présider dans la charité). Mais les conciles décident ensemble : le canon 28 de Chalcédoine (451) donne à Constantinople les mêmes privilèges que Rome. Le pape Honorius a été condamné après sa mort par le concile de Constantinople III (681), ce qui est difficile à concilier avec l’infaillibilité papale.`],
      ['Théologique', `Les dogmes de la primauté de juridiction universelle et de l’infaillibilité (Vatican I, 1870) sont des définitions tardives, que l’Orthodoxie ne reçoit pas. L’Église est une communion d’Églises locales autour de leurs évêques, avec les conciles pour autorité.`]
    ], lim: `Les orthodoxes reconnaissent Rome comme « première » dans l’ordre (protos). Le désaccord est sur le contenu de cette primauté : le document de Ravenne (2007) a reconnu ce principe tout en laissant ouverte son interprétation. Les catholiques répondent que le ministère de Pierre est plus ancien et plus fort que ce que l’Orthodoxie accepte.`, lire: `Saint Cyprien, De l’unité de l’Église ; Jean Meyendorff, L’Église orthodoxe ; document de Ravenne (2007).` },

    { id: 'filioque', cat: 'orth', q: `« Le Filioque, ce n’est qu’une querelle de mots. »`, pts: [
      ['Historique', `Le Credo de 381 dit que l’Esprit « procède du Père ». Le « et du Fils » (Filioque) est apparu en Espagne (Tolède, 589), puis a été diffusé en Occident. Le pape Léon III (809) a refusé de l’ajouter au Credo, selon la tradition en le faisant graver sur des plaques d’argent sans cet ajout. Rome ne l’a chanté qu’en 1014.`],
      ['Théologique', `Pour les Orthodoxes, le Père est l’unique source (monarchie) de la divinité : Fils et Esprit tirent leur origine de lui seul. Faire procéder l’Esprit des deux risque de confondre les personnes ou de les subordonner à l’essence commune. Saint Photius l’a défendu contre l’ajout.`],
      ['Théologique', `L’Orthodoxie ne nie pas que l’Esprit soit envoyé par le Fils dans le temps (Jn 15, 26) : la question est celle de l’origine éternelle de l’Esprit.`],
      ['Historique', `Même pour les catholiques, ajouter au Credo sans concile œcuménique pose un problème de méthode. Un texte du Vatican (1995) a précisé que le Filioque ne doit pas être compris comme faisant du Fils une seconde source.`]
    ], lim: `Certains théologiens catholiques et orthodoxes pensent que les deux positions peuvent se concilier. D’autres orthodoxes disent que la question est vraiment dogmatique. Ce n’est pas une simple question de mots, mais le débat reste ouvert.`, lire: `Saint Photius, Mystagogie du Saint-Esprit ; Vladimir Lossky, À l’image et à la ressemblance de Dieu.` },

    { id: 'schisme', cat: 'orth', q: `« Le Grand Schisme de 1054 est la faute de l’Orient. »`, pts: [
      ['Historique', `En 1054, le légat Humbert dépose une bulle d’excommunication sur l’autel de Sainte-Sophie contre le patriarche Cérulaire, qui l’excommunie à son tour. L’affaire était surtout personnelle, et le pape Léon IX était mort. Les excommunications ont été levées en 1965 (Paul VI et Athénagoras).`],
      ['Historique', `La rupture est un long processus : divergences de langue, de culture et de politique, ajout du Filioque, ambitions papales, et surtout le sac de Constantinople par les croisés en 1204, qui a rendu la rupture presque impossible à réparer.`],
      ['Historique', `Au concile de Florence (1439), les Grecs ont accepté l’union sous la pression de l’empire en danger. Les peuples, et saint Marc d’Éphèse, l’ont refusée.`]
    ], lim: `Il y a des torts des deux côtés. Dire que c’est « la faute de l’Orient » ou « la faute de Rome » est trop simple.`, lire: `Steven Runciman, The Eastern Schism ; Jean Meyendorff, Byzantine Theology.` },

    { id: 'sola-scriptura', cat: 'orth', q: `« Seule l’Écriture compte (sola scriptura) : la Tradition est une invention humaine. »`, pts: [
      ['Biblique', `La Bible elle-même ne dit pas « l’Écriture seule ». Paul écrit : « Tenez les traditions que vous avez apprises, soit par parole, soit par lettre » (2 Th 2, 15 ; 1 Co 11, 2). Jean dit que le monde ne pourrait contenir tout ce que Jésus a fait (Jn 21, 25).`],
      ['Historique', `L’Église a existé avant le Nouveau Testament : le canon des 27 livres s’est fixé progressivement, et saint Athanase en donne la liste en 367 (39ᵉ lettre festale). C’est l’Église qui a reconnu les Écritures.`],
      ['Biblique', `1 Tm 3, 15 : c’est l’Église, et non l’Écriture, qui est « colonne et soutien de la vérité ».`],
      ['Historique', `Le principe « sola scriptura » apparaît au XVIᵉ siècle (Luther). Il a produit des milliers de confessions qui lisent la même Bible de façons opposées : l’Écriture seule ne dit pas laquelle des lectures est la bonne.`],
      ['Théologique', `Pour l’Orthodoxie, Tradition n’est pas un ajout à l’Écriture mais la vie de l’Église, qui est la bonne manière de lire l’Écriture (liturgie, Pères, conciles).`]
    ], lim: `Les Réformateurs voulaient corriger de vrais abus (indulgences, ignorance, superstition). Ces critiques ne sont pas sans fondement, et l’Orthodoxie n’a pas non plus à justifier tout ce qui s’est fait.`, lire: `Saint Vincent de Lérins, Commonitorium ; Georges Florovsky.` },

    { id: 'marie', cat: 'orth', q: `« Le culte de Marie n’est pas biblique ; on y prête une place qui revient au Christ seul. »`, pts: [
      ['Biblique', `Gabriel dit : « Réjouis-toi, pleine de grâce » (Lc 1, 28) ; Élisabeth l’appelle « mère de mon Seigneur » (Lc 1, 43) ; et Marie elle-même prophétise : « toutes les générations me diront bienheureuse » (Lc 1, 48).`],
      ['Historique', `Le titre de Théotokos (« Mère de Dieu ») a été défini à Éphèse (431), non pour exalter Marie mais pour protéger l’identité du Christ : si Marie n’est pas la mère de Dieu, Jésus n’est pas pleinement Dieu. C’est une affirmation sur le Christ.`],
      ['Théologique', `L’Orthodoxie distingue vénération (douleia, avec un honneur particulier pour Marie) et adoration (latreia), qui n’est due qu’à Dieu. Marie est « le plus honorable des chérubins » mais une créature.`],
      ['Biblique', `À Cana, Marie présente un besoin à son Fils (« Ils n’ont plus de vin », Jn 2, 3) et il agit : c’est la forme de l’intercession.`]
    ], lim: `Les Orthodoxes ne reçoivent ni l’Immaculée Conception (1854) ni l’Assomption définie en dogme (1950). Ils fêtent la Dormition, selon la Tradition, sans la définir.`, lire: `Saint Jean Damascène, Homélies sur la Dormition ; Serge Boulgakov (à lire avec prudence).` },

    { id: 'icones', cat: 'orth', q: `« Les icônes sont de l’idolâtrie : la Bible interdit les images (Ex 20, 4). »`, pts: [
      ['Biblique', `Dieu lui-même commande des images dans le culte : deux chérubins sur l’arche (Ex 25, 18), le serpent d’airain (Nb 21, 8), les chérubins du Temple. L’interdit vise les idoles, c’est-à-dire adorer l’œuvre comme un dieu.`],
      ['Théologique', `La raison décisive est l’Incarnation : « le Verbe s’est fait chair » (Jn 1, 14) ; le Christ est « l’image du Dieu invisible » (Col 1, 15). Ce qui était invisible est devenu visible, et peut donc être représenté. Refuser l’icône du Christ, c’est refuser qu’il ait un vrai corps (saint Jean Damascène).`],
      ['Historique', `Le septième concile œcuménique (Nicée II, 787) a défendu les icônes contre l’iconoclasme, en distinguant vénération (proskynèse) et adoration (latreia) : l’honneur rendu à l’image remonte au modèle.`],
      ['Archéologique', `À Dura-Europos, la synagogue (milieu du IIIᵉ s.) est couverte de scènes bibliques peintes, et la maison-église voisine aussi. Les catacombes romaines montrent des images chrétiennes dès le IIᵉ-IIIᵉ siècle.`]
    ], lim: `Il y a eu des abus (superstition) et l’Orient lui-même a connu une crise iconoclaste. Les protestants qui refusent les images le font souvent de bonne foi pour éviter l’idolâtrie.`, lire: `Saint Jean Damascène, Trois traités sur les images ; Léonide Ouspensky, La Théologie de l’icône.` },

    { id: 'saints', cat: 'orth', q: `« Prier les saints met un écran entre Dieu et nous ; il n’y a qu’un seul médiateur (1 Tm 2, 5). »`, pts: [
      ['Biblique', `Nous demandons tous à nos frères de prier pour nous (Jc 5, 16). Les saints ne sont pas morts : Dieu est « le Dieu des vivants » (Mt 22, 32) ; à la Transfiguration Moïse et Élie parlent avec le Christ ; l’Apocalypse montre les âmes qui prient (Ap 5, 8 ; 6, 9-10).`],
      ['Théologique', `Le Christ est le seul médiateur au sens de sauveur. Demander l’intercession d’un saint, c’est demander à un frère déjà proche de Dieu de prier avec nous, et non le remplacer. L’Orthodoxie ne prie pas pour que le saint nous sauve « à sa place ».`],
      ['Archéologique', `Les catacombes romaines et d’anciennes inscriptions du IIIᵉ siècle portent des demandes de prière aux défunts (« prie pour nous »). Le culte des martyrs sur leurs tombes est attesté dès le IIᵉ siècle (Martyre de Polycarpe, vers 155).`]
    ], lim: `Cette pratique n’est pas explicitement commandée dans l’Écriture. Elle se fonde sur la communion des saints, et les Réformateurs y ont vu à raison un risque de dérive.`, lire: `Martyre de saint Polycarpe ; saint Jean Damascène.` },

    { id: 'ethnique', cat: 'orth', q: `« L’Orthodoxie est ethnique et nationaliste, divisée en juridictions rivales. »`, pts: [
      ['Historique', `L’Église orthodoxe est une communion de Églises autocéphales (grecque, russe, serbe, roumaine, géorgienne…), unies par la même foi et les mêmes sacrements, non par un chef. Elle s’est inculturée dans chaque peuple (c’est ce que firent Cyrille et Méthode avec le slavon).`],
      ['Théologique', `Un concile à Constantinople en 1872 a condamné le « phylétisme » : l’idée d’une Église fondée sur l’ethnie est une hérésie, car « il n’y a ni Juif ni Grec » (Ga 3, 28).`],
      ['Historique', `Il y a de vrais problèmes : conflits de juridiction (Ukraine, Estonie, diaspora), liens avec le pouvoir politique, discours nationalistes de certains clercs. Le Concile de Crète (2016) s’est tenu sans quatre Églises, dont celle de Russie.`]
    ], lim: `Cette objection est en grande partie fondée dans les faits : l’Église ne le nie pas. C’est un péché, pas un principe de la foi.`, lire: `Mgr Kallistos Ware, L’Orthodoxie ; Jean-Claude Larchet.` },

    { id: 'salut', cat: 'orth', q: `« Dire “hors de l’Église pas de salut”, c’est exclure tous les autres. »`, pts: [
      ['Théologique', `Une formule souvent reprise chez les théologiens orthodoxes : nous savons où est l’Église, nous ne savons pas où elle n’est pas. L’Orthodoxie affirme être l’Église une, sainte, catholique et apostolique, sans prétendre connaître le sort de chaque personne : le jugement appartient à Dieu.`],
      ['Patristique', `Saint Cyprien a dit « hors de l’Église, pas de salut » dans le contexte des schismes. La question est ancienne et a été discutée par saint Basile, saint Augustin et d’autres.`],
      ['Biblique', `Mt 25 (le jugement dernier selon l’amour pour les petits) et Jn 10, 16 (« j’ai d’autres brebis qui ne sont pas de cet enclos ») empêchent de limiter la grâce de Dieu.`]
    ], lim: `Les orthodoxes ne sont pas tous d’accord : certains sont stricts, d’autres plus ouverts. La position officielle est de ne pas juger.`, lire: `Georges Florovsky, Les Limites de l’Église ; Kallistos Ware.` },

    { id: 'vraie-eglise', cat: 'orth', q: `« Pourquoi l’Orthodoxie serait-elle la vraie Église plutôt que Rome ou les protestants ? »`, pts: [
      ['Historique', `L’Orthodoxie revendique la continuité avec l’Église des apôtres et des sept conciles œcuméniques, sans ajouts doctrinaux ultérieurs : ni Filioque, ni purgatoire (tel que défini à Florence), ni Immaculée Conception, ni infaillibilité papale ; et, pour les protestants, elle a gardé la succession apostolique, les sacrements et la liturgie.`],
      ['Théologique', `La liturgie et la foi de l’Église ancienne se reconnaissent encore dans la Divine Liturgie (saint Jean Chrysostome, saint Basile) : saint Justin décrit déjà vers 155 une liturgie reconnaissable (Apologie, 67).`],
      ['Philosophique', `Au fond, c’est une question d’autorité : qui interprète ? Pour Rome, le pape ; pour les protestants, chacun avec l’Écriture ; pour l’Orthodoxie, l’Église en concile et dans sa Tradition.`]
    ], lim: `Rome et d’autres Églises ont des arguments symétriques pour se dire la vraie Église. Un argument ne suffit pas : l’Orthodoxie invite à « venir et voir », à la prière, aux offices et à parler avec un prêtre. Il ne faut pas décider seulement sur des arguments.`, lire: `Mgr Kallistos Ware, L’Orthodoxie ; saint Justin, Apologie I, 67.` },

    { id: 'liturgie', cat: 'orth', q: `« Les offices sont formalistes, longs et incompréhensibles : de la religion de pharisiens. »`, pts: [
      ['Biblique', `Jésus critique l’hypocrisie, pas la prière commune : il va à la synagogue « selon sa coutume » (Lc 4, 16) et au Temple. Les offices orthodoxes s’appuient sur les psaumes et sur la prière juive des heures. L’Apocalypse décrit une liturgie céleste (Ap 4-5).`],
      ['Théologique', `La liturgie n’est pas un spectacle mais une participation : on ne « va pas voir » l’office, on y prie. Elle forme le corps et l’âme par le chant, les gestes, l’encens, les icônes, le jeûne.`],
      ['Historique', `Beaucoup de pratiques (prière des heures, jeûnes du mercredi et du vendredi, Didachè 8, vers la fin du Iᵉʳ siècle ou le IIᵉ) sont très anciennes.`]
    ], lim: `Le formalisme est un danger réel, que les Pères dénoncent : une prière sans cœur ne vaut rien. Il y a aussi des offices difficiles à suivre, surtout en langue ancienne, et c’est une raison pour s’y préparer et pour traduire.`, lire: `Alexandre Schmemann, Pour la vie du monde.` },

    { id: 'confession', cat: 'orth', q: `« Se confesser à un prêtre n’est pas biblique : Dieu seul pardonne. »`, pts: [
      ['Biblique', `Jésus donne aux apôtres le pouvoir de remettre les péchés (Jn 20, 22-23 ; Mt 18, 18). Jacques dit : « Confessez vos péchés les uns aux autres » (Jc 5, 16). Les Actes montrent des croyants qui avouent leurs fautes (Ac 19, 18).`],
      ['Théologique', `Pour l’Orthodoxie, c’est Dieu qui pardonne : le prêtre est témoin et médecin spirituel, il prie la formule d’absolution devant l’icône du Christ et le pénitent. La confession n’est pas un tribunal mais une guérison.`],
      ['Historique', `La confession publique, puis privée, est attestée dans l’Église ancienne (Didachè 4 et 14, Origène, saint Basile).`]
    ], lim: `Des abus ont existé (confession mécanique, pression sur les consciences). Les Pères insistent sur la liberté et le discernement du confesseur.`, lire: `Saint Jean Chrysostome, Sur le sacerdoce.` },

    { id: 'jeune', cat: 'orth', q: `« Le jeûne est du légalisme : “ce qui entre dans la bouche ne souille pas” (Mt 15, 11). »`, pts: [
      ['Biblique', `Jésus dit « quand vous jeûnerez » (Mt 6, 16), non « si ». Il jeûne quarante jours (Mt 4, 2), et annonce que ses disciples jeûneront quand l’époux sera enlevé (Mt 9, 15). L’Église primitive jeûne (Ac 13, 2 ; 14, 23).`],
      ['Historique', `La Didachè (fin du Iᵉʳ ou IIᵉ siècle) prescrit de jeûner le mercredi et le vendredi, et non avec les « hypocrites » du lundi et du jeudi.`],
      ['Théologique', `Mt 15, 11 parle de la pureté rituelle : ce n’est pas la nourriture qui rend impur. Le jeûne chrétien n’est pas une pureté alimentaire mais un exercice de liberté : il apprend à dominer les désirs et à partager avec les pauvres.`]
    ], lim: `Le jeûne peut devenir du légalisme (compter les règles). Les Pères répètent que « le jeûne sans charité n’est rien ». Il s’adapte à la santé, et le père spirituel peut le moduler.`, lire: `Saint Jean Chrysostome ; Alexandre Schmemann, Le Grand Carême.` },

    { id: 'canon', cat: 'orth', q: `« Pourquoi des livres “apocryphes” (Sagesse, Siracide, Maccabées…) dans l’Ancien Testament orthodoxe ? »`, pts: [
      ['Historique', `L’Église des apôtres lisait l’Ancien Testament surtout dans sa traduction grecque (la Septante). La majorité des citations de l’Ancien Testament dans le Nouveau suivent la Septante, qui contient ces livres. Il n’y a pas de « concile de Jamnia » qui aurait fixé le canon juif au Iᵉʳ siècle : cette thèse est abandonnée.`],
      ['Archéologique', `Les manuscrits de la mer Morte (Qumrân) montrent des textes hébreux proches de la Septante (par exemple 4QJérémie b, 4QSamuel a). La Septante n’est donc pas un texte « inventé » : elle traduit des textes hébreux qui existaient.`],
      ['Historique', `Les conciles d’Hippone (393) et de Carthage (397) reçoivent ces livres, et les Pères les citent (saint Cyprien, saint Augustin).`]
    ], lim: `Le canon orthodoxe n’est pas parfaitement uniforme : des listes locales diffèrent légèrement (par exemple Jérusalem 1672, usages slaves). Les Orthodoxes reconnaissent ces livres comme « lisibles et utiles » ou comme inspirés, selon les cas.`, lire: `Saint Athanase, 39ᵉ lettre festale ; Martin Hengel, The Septuagint as Christian Scripture.` },

    { id: 'pouvoir', cat: 'orth', q: `« L’Église orthodoxe s’est toujours soumise au pouvoir (Constantin, les tsars, le KGB). »`, pts: [
      ['Historique', `Dans l’Empire byzantin, l’idéal est la « symphonie » entre Église et État, qui a parfois tourné au césaropapisme. Mais l’Église a aussi résisté : saint Jean Chrysostome exilé, saint Maxime le Confesseur mutilé, saint Philippe de Moscou assassiné pour avoir défié Ivan le Terrible.`],
      ['Historique', `Au XXᵉ siècle, des millions de chrétiens orthodoxes sont morts en Russie, en Roumanie, en Serbie, en Grèce, en Albanie comme « nouveaux martyrs ». Mais une partie de la hiérarchie a collaboré (déclaration de 1927 du métropolite Serge, infiltration par le KGB).`],
      ['Théologique', `L’Église est sainte comme corps du Christ, mais ses membres sont pécheurs. Le dossier montre à la fois des saints et des compromis, et il ne faut pas masquer l’un ni l’autre.`]
    ], lim: `Il y a eu et il y a encore des liens inquiétants entre des hiérarchies et le pouvoir (par exemple aujourd’hui en Russie). L’Orthodoxie le reconnaît comme une tentation permanente.`, lire: `Mgr Hilarion Alfeyev ; Dimitri Pospielovsky, The Russian Church under the Soviet Regime.` }
    ,
    { id: 'nicee-divinite', cat: 'foi', q: `« La divinité de Jésus a été inventée à Nicée, sous Constantin. »`, pts: [
      ['Biblique', `Les textes du Nouveau Testament affirment déjà sa divinité : le prologue de Jean (Jn 1, 1-18), l’hymne de Philippiens 2, 6-11 (écrit dans les années 50, qui reprend probablement une prière plus ancienne), la confession de Thomas (« Mon Seigneur et mon Dieu », Jn 20, 28).`],
      ['Historique', `Vers 112, Pline le Jeune rapporte que les chrétiens chantent le Christ « comme à un dieu ». Ignace d’Antioche (vers 110) écrit « notre Dieu, Jésus le Christ » (Aux Éphésiens, 18, 2).`],
      ['Historique', `À Nicée (325), la question était posée par Arius, prêtre d’Alexandrie : le Fils est-il créé ? Presque tous les évêques (environ 300) ont rejeté sa position, et très peu ont refusé de signer. Constantin a convoqué le concile mais n’en a pas inventé le sujet. Le concile n’a pas non plus fixé le canon biblique.`]
    ], lim: `Les débats ont continué pendant des décennies après Nicée, et l’empereur a parfois soutenu un camp, parfois l’autre. Les formulations se sont précisées avec le temps, mais la foi qu’elles expriment est plus ancienne.`, lire: `Saint Athanase, Contre les ariens ; Larry Hurtado, Lord Jesus Christ.` },

    { id: 'chalcedoine', cat: 'orth', q: `« Chalcédoine n’était qu’une querelle de mots : pourquoi les Coptes et les Arméniens sont-ils séparés ? »`, pts: [
      ['Historique', `Après Chalcédoine (451), les Églises copte, arménienne, syriaque, éthiopienne et malankare n’ont pas reçu la formule « en deux natures ». On les dit « non chalcédoniennes » ou « orthodoxes orientaux » (Oriental Orthodox), à ne pas confondre avec les orthodoxes byzantins (grecs, russes, serbes…) de la tradition chalcédonienne.`],
      ['Théologique', `Elles ne sont pas « monophysites » au sens d’Eutychès : elles condamnent l’eutychianisme et parlent de « miaphysisme » (une nature « composée », en reprenant la formule de saint Cyrille d’Alexandrie).`],
      ['Historique', `Des dialogues théologiques officiels (Chambésy, 1990, et d’autres) ont conclu que les deux familles confessent la même foi en la divinité et l’humanité parfaites du Christ, avec des mots différents.`],
      ['Théologique', `Mais l’unité n’est pas rétablie : il reste la question de l’autorité des conciles postérieurs (Orthodoxes : sept ; Orientaux : trois), de l’anathème porté contre certains Pères, et des mémoires blessées.`]
    ], lim: `C’est un des sujets les plus délicats : les dialogues ont montré de grandes convergences, mais les Églises ne sont pas d’accord sur la conclusion à en tirer. Évite de réduire cette histoire à « une pure querelle de mots ».`, lire: `Déclarations communes de Chambésy (1990) ; Jean Meyendorff, Le Christ dans la pensée byzantine.` },

    { id: 'palamas', cat: 'orth', q: `« La distinction entre essence et énergies est une invention tardive de Palamas et brise la simplicité de Dieu. »`, pts: [
      ['Patristique', `Elle se trouve en germe bien avant lui : Basile (« nous connaissons Dieu par ses énergies »), Grégoire de Nysse, Denys l’Aréopagite, Maxime le Confesseur et Jean Damascène parlent de l’énergie divine.`],
      ['Historique', `Palamas (XIVᵉ siècle) la systématise pour répondre à Barlaam de Calabre. Elle est reçue par des conciles locaux (1341, 1347, 1351) et par la tradition orthodoxe.`],
      ['Théologique', `Elle protège deux vérités : Dieu reste inconnaissable en son essence, et pourtant nous pouvons vraiment participer à lui (théosis). Sans elle, soit Dieu est inaccessible, soit la divinisation est une illusion.`],
      ['Philosophique', `Critique thomiste : elle ruinerait la simplicité divine. Réponse orthodoxe : la distinction est réelle mais non une division : chaque énergie est Dieu tout entier agissant.`]
    ], lim: `C’est un vrai désaccord entre traditions : des théologiens catholiques contemporains y voient une position acceptable, d’autres une ambiguïté. Palamas n’est pas condamné par Rome, mais il n’est pas reçu non plus comme docteur.`, lire: `Palamas, Triades ; John Meyendorff, Introduction à l’étude de Grégoire Palamas.` },

    { id: 'hesychasme', cat: 'orth', q: `« L’hésychasme est une technique importée (yoga, soufisme), et la lumière du Thabor est une illusion. »`, pts: [
      ['Biblique', `« Prie ton Père dans le secret » (Mt 6, 6) ; « priez sans cesse » (1 Th 5, 17) ; la Transfiguration (Mt 17) montre la gloire divine visible aux disciples.`],
      ['Historique', `La répétition d’une courte invocation est attestée chez les Pères du désert (IVᵉ siècle) et chez Diadoque de Photicé (Vᵉ siècle). Les consignes sur la respiration et la posture apparaissent beaucoup plus tard (XIIIᵉ siècle) et sont toujours secondaires.`],
      ['Théologique', `Palamas défend que la lumière du Thabor est la gloire incréée de Dieu, que les saints peuvent contempler par grâce. Barlaam la jugeait créée, et le concile de 1341 l’a condamné.`]
    ], lim: `Les Pères eux-mêmes mettent en garde : un exercice mal compris peut mener à l’illusion (prélest) ou à l’orgueil. C’est pourquoi l’Église demande un père spirituel et de l’humilité. Des similitudes extérieures avec d’autres traditions ne prouvent pas une origine commune.`, lire: `La Philocalie ; Palamas, Triades ; Récits d’un pèlerin russe.` },

    { id: 'defunts', cat: 'orth', q: `« Prier pour les morts n’est pas biblique ; et l’Orthodoxie n’a pas de purgatoire, c’est incohérent. »`, pts: [
      ['Biblique', `2 Maccabées 12, 43-45 (livre que le canon orthodoxe retient) montre des prières et un sacrifice pour les défunts. Paul prie pour Onésiphore (2 Tm 1, 16-18, texte discuté) et mentionne le baptême pour les morts (1 Co 15, 29, texte obscur).`],
      ['Historique', `La prière pour les défunts est très ancienne : Tertullien (vers 211) parle d’offrandes pour les morts ; le Martyre de Perpétue (vers 203) la montre priant pour son frère Dinocrate ; les inscriptions des catacombes demandent le repos des défunts.`],
      ['Théologique', `L’Orthodoxie prie pour les défunts sans enseigner un purgatoire défini (feu purificateur, satisfaction des peines). Elle croit que l’amour de l’Église peut les aider, sans dire comment ni où. Le jugement appartient à Dieu.`]
    ], lim: `Certains textes populaires (« les douanes aériennes ») sont débattus entre orthodoxes, et ne sont pas une doctrine de l’Église. Il y a des nuances réelles entre cette position et le purgatoire latin, mais aussi des points communs.`, lire: `Saint Marc d’Éphèse, Discours sur le purgatoire ; Mgr Kallistos Ware, L’Orthodoxie.` },

    { id: 'divorce', cat: 'orth', q: `« Jésus interdit le divorce (Mt 19) ; pourquoi l’Orthodoxie permet-elle le remariage ? »`, pts: [
      ['Biblique', `Jésus déclare que ce que Dieu a uni, l’homme ne doit pas le séparer (Mt 19, 6). Mais Matthieu rapporte aussi la clause d’exception « sauf pour fornication » (Mt 19, 9).`],
      ['Théologique', `L’Orthodoxie considère que le mariage est sacré et indissoluble dans son idéal, mais que le péché peut le détruire en fait. Par économie (miséricorde pastorale), l’Église reconnaît la mort d’un mariage, comme elle accepte la mort physique d’un conjoint, et peut accorder un second mariage, avec un rite de pénitence.`],
      ['Historique', `Les canons de saint Basile et la pratique de l’Église ancienne tolèrent des situations de ce genre, avec pénitence. L’Occident a suivi une autre voie (indissolubilité absolue, nullité du mariage).`]
    ], lim: `Les orthodoxes ne se mettent pas d’accord sur les conditions et sur la pratique : certaines juridictions sont plus strictes. Le troisième mariage est encore plus restreint. Cette pratique est un point de débat avec les catholiques.`, lire: `Paul Evdokimov, Le Sacrement de l’amour ; Canons de saint Basile.` },

    { id: 'femmes-pretres', cat: 'orth', q: `« Pourquoi l’Église n’ordonne-t-elle pas de femmes prêtres ? »`, pts: [
      ['Biblique', `Jésus a choisi douze apôtres hommes, mais des femmes l’ont suivi, ont été les premiers témoins de la Résurrection (Marie-Madeleine est appelée « égale aux apôtres ») et ont eu un rôle essentiel. Marie, la plus honorée des saints, n’a pas été ordonnée.`],
      ['Historique', `Il y a eu des diaconesses (Phébé, Rm 16, 1 ; plusieurs dans l’Église byzantine), mais leur service était distinct de celui du diacre : accompagner les femmes au baptême, par exemple. Elles ne présidaient pas l’Eucharistie.`],
      ['Théologique', `Le prêtre préside l’Eucharistie en « icône » du Christ, dans la continuité de l’Église des apôtres. Ce n’est pas une question de valeur : les saintes ont une dignité égale à celle des saints.`]
    ], lim: `La question du rétablissement d’un diaconat féminin est discutée parmi les orthodoxes, sans décision commune. C’est un sujet sur lequel les théologiens sont partagés. Dire qu’il n’y a aucune difficulté serait malhonnête.`, lire: `Kyriaki FitzGerald (éd.), Orthodox Women Speak ; Mgr Kallistos Ware, Man, Woman and the Priesthood of Christ.` },

    { id: 'bapteme-enfants', cat: 'orth', q: `« Le baptême des petits enfants n’est pas biblique : il faut croire pour être baptisé. »`, pts: [
      ['Biblique', `Le Nouveau Testament parle de baptêmes de « maisonnées » entières (Ac 16, 15 et 33 ; 1 Co 1, 16). Paul rapproche le baptême de la circoncision, qui se faisait à huit jours (Col 2, 11-12). Jésus dit : « Laissez venir à moi les petits enfants » (Mt 19, 14).`],
      ['Historique', `Irénée parle de nourrissons « renés pour Dieu » (Contre les hérésies, II, 22, 4). Origène dit que l’Église a reçu des apôtres la tradition de baptiser les petits enfants. Au concile de Carthage (vers 253), Cyprien et les évêques affirment qu’on n’a pas à attendre le huitième jour.`],
      ['Théologique', `Le baptême n’est pas d’abord une décision de l’homme, mais un don de Dieu qui accueille. La foi des parents et de l’Église porte l’enfant, qui reçoit aussi la chrismation et la communion, et grandira ensuite dans cette foi.`]
    ], lim: `Aucun texte du Nouveau Testament ne le commande explicitement, et les Églises baptistes comprennent le baptême autrement, avec sincérité. Les arguments sont des indices solides, pas une démonstration.`, lire: `Origène, Commentaire sur l’épître aux Romains, V ; Alexandre Schmemann, De l’eau et de l’Esprit.` },

    { id: 'priere-exaucee', cat: 'foi', q: `« Dieu ne répond pas aux prières ; prier ne sert à rien. »`, pts: [
      ['Théologique', `Pour l’Orthodoxie, la prière n’est pas une commande qu’on passe à Dieu : c’est une relation. Le Christ lui-même prie « que ta volonté soit faite » (Lc 22, 42).`],
      ['Biblique', `L’Écriture dit que Dieu répond, mais pas toujours comme on l’attend : Jc 4, 3 (« vous demandez mal »), 2 Co 12, 8-9 (Paul demande trois fois, et reçoit « ma grâce te suffit »).`],
      ['Patristique', `Évagre : « la prière est l’entretien de l’esprit avec Dieu ». Les Pères disent que la première réponse de Dieu, c’est le changement du cœur de celui qui prie.`]
    ], lim: `Il existe des prières sans réponse visible, parfois très douloureuses. L’Église ne prétend pas l’expliquer, elle invite à continuer à prier et à ne pas rester seul.`, lire: `Évagre le Pontique, Traité de l’oraison ; Mgr Antoine Bloom, École de la prière.` }
  ];
})();
