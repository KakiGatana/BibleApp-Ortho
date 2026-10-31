/* Les 20 objections les plus fréquentes contre la foi, classées par thème, avec leur degré de sérieux et une réponse courte.
   Fiche-mémo : chaque réponse renvoie aux « Objections et réponses » et au « Cahier de débats » pour le détail. */
(function () {
  const O = window.ORTHO;
  /* lvl : 1 très faible, 2 faible, 3 moyenne, 4 sérieuse, 5 très sérieuse */
  O.TOP_OBJ_LEVELS = { 1: 'Très faible', 2: 'Faible', 3: 'Moyenne', 4: 'Sérieuse', 5: 'Très sérieuse' };
  O.TOP_OBJ = [
    { th: 'Dieu', lvl: 3, q: `« Il n’y a aucune preuve de Dieu. »`,
      a: `Il n’y a pas de preuve mathématique, mais un faisceau d’arguments qui convergent : la contingence (tout ce qui existe dépend d’autre chose, il faut un être qui existe par lui-même), le commencement de l’univers, le réglage fin des constantes, la conscience, la morale objective. Chaque argument a ses faiblesses ; ensemble, ils pèsent lourd.`,
      lim: `Ces arguments mènent au mieux à un Dieu créateur, pas au Dieu chrétien en particulier.` },
    { th: 'Dieu', lvl: 2, q: `« La science explique tout, Dieu est inutile. »`,
      a: `La science explique comment le monde fonctionne, pas pourquoi il existe. Dire que seule la science donne accès à la vérité est déjà une thèse philosophique, que la science elle-même ne peut pas vérifier. Beaucoup de fondateurs de la science moderne étaient croyants, et le prêtre Georges Lemaître est à l’origine de la théorie du Big Bang.` },
    { th: 'Dieu', lvl: 4, q: `« Si Dieu existait, il se montrerait. » (le silence de Dieu)`,
      a: `Un Dieu évident en permanence supprimerait la liberté d’aimer : on ne choisit pas d’aimer une évidence qui écrase. C’est la parabole du roi qui se fait pauvre pour être aimé librement d’une humble fille (Kierkegaard, Miettes philosophiques). Dieu se montre assez pour qui le cherche, et se voile assez pour ne contraindre personne (Pascal).`,
      lim: `L’argument de Schellenberg (des non-croyants sincères existent) reste sérieux. Ne dis jamais à quelqu’un qu’il « résiste » : on ne lit pas les cœurs.` },
    { th: 'Dieu', lvl: 3, q: `« La foi, c’est croire sans raison. »`,
      a: `Dans la Bible, la foi n’est pas l’inverse de la raison mais la confiance en quelqu’un : on fait confiance à un médecin ou à un ami pour de bonnes raisons, sans tout pouvoir démontrer. Les Pères ont beaucoup raisonné (Justin, Athanase, les Cappadociens), et l’Écriture demande de « rendre raison de l’espérance » (1 P 3, 15). La foi va au-delà de la raison, elle ne va pas contre elle.`,
      lim: `La foi chrétienne reste un engagement qu’aucun argument n’impose : il faut le reconnaître.` },

    { th: 'Le mal', lvl: 5, q: `« Un Dieu bon et tout-puissant n’aurait pas permis le mal. »`,
      a: `C’est l’objection la plus sérieuse. Sa version logique (« Dieu et le mal sont contradictoires ») est aujourd’hui largement jugée réfutée par les philosophes (Plantinga) : la liberté rend le mal possible. Sa version probabiliste demande une réponse cumulative : le libre arbitre, une création blessée par la chute de l’homme et des anges, des lois naturelles stables, les limites de notre point de vue. Et surtout la réponse chrétienne : Dieu entre lui-même dans la souffrance par la Croix, et promet d’« essuyer toute larme » (Ap 21, 4).`,
      lim: `Il reste une part de mystère, qu’il faut reconnaître. Devant quelqu’un qui souffre, la présence vaut mieux que l’argument.` },
    { th: 'Le mal', lvl: 5, q: `« Et la souffrance animale, avant même l’homme ? »`,
      a: `C’est le point le plus dur. Les pistes : une création « soumise à la vanité » dès l’origine en vue de la chute que Dieu connaissait d’avance (Rm 8, 20 ; Maxime le Confesseur) ; la chute des anges ; le coût d’un monde vivant, stable et libre ; et la promesse que la création entière sera libérée (Rm 8, 21).`,
      lim: `Aucune de ces pistes ne règle tout. Voir le thème « Mal et souffrance » du Cahier de débats.` },
    { th: 'Le mal', lvl: 4, q: `« L’enfer éternel est incompatible avec un Dieu d’amour. »`,
      a: `Pour l’Orthodoxie, l’enfer n’est pas une torture que Dieu inflige : c’est l’amour de Dieu vécu comme un feu par celui qui le refuse (Isaac le Syrien). Dieu ne cesse jamais d’aimer ; c’est l’homme qui ferme la porte. On peut espérer et prier pour le salut de tous, sans en faire un dogme (Silouane de l’Athos, Kallistos Ware).`,
      lim: `Les textes d’un enfer plus concret (Mt 25, 41-46) ne disparaissent pas avec cette lecture, et les orthodoxes ne sont pas tous d’accord sur la manière d’en parler.` },

    { th: 'La Bible', lvl: 2, q: `« La Bible a été modifiée. »`,
      a: `On possède environ 5 800 manuscrits grecs du Nouveau Testament, dont des fragments du IIᵉ siècle : c’est justement ce nombre qui permet de repérer les quelques ajouts (la femme adultère en Jn 8, la finale longue de Marc). Aucune doctrine essentielle n’en dépend, et aucun autre texte de l’Antiquité n’est aussi bien attesté.` },
    { th: 'La Bible', lvl: 3, q: `« Les Évangiles ont été écrits trop tard pour être fiables. »`,
      a: `Trente à soixante ans après les faits, c’est très tôt pour l’Antiquité : les meilleures biographies d’Alexandre le Grand (Arrien, Plutarque) sont écrites plus de quatre siècles après sa mort. Les lettres de Paul datent d’une vingtaine d’années après la Croix, et le credo qu’il cite en 1 Co 15, 3-7 remonte à quelques années seulement.`,
      lim: `Ce sont des témoignages de foi, non des biographies neutres, et les récits diffèrent sur certains détails.` },
    { th: 'La Bible', lvl: 4, q: `« L’Ancien Testament est violent : massacres, esclavage. »`,
      a: `La révélation est progressive : la Loi encadre des réalités brutales « à cause de la dureté des cœurs » (Mt 19, 8), comme le divorce, sans en faire un idéal. Les récits de « destruction totale » emploient le langage hyperbolique des guerres du Proche-Orient ancien. Les Pères lisent ces textes à la lumière du Christ (Origène, Grégoire de Nysse), et le christianisme a produit l’une des toutes premières condamnations radicales de l’esclavage (Grégoire de Nysse, IVᵉ siècle).`,
      lim: `Certains textes (Amalek, 1 S 15) restent réellement difficiles : ne prétends pas le contraire. Les chrétiens ont aussi longtemps toléré l’esclavage.` },
    { th: 'La Bible', lvl: 2, q: `« Les fêtes et les récits chrétiens sont copiés des religions païennes. »`,
      a: `Pâques vient de la Pâque juive. La date de Noël a une autre explication possible que la fête païenne du soleil : le calcul à partir du 25 mars, jour où l’on situait la conception et la Passion. Les dieux « qui meurent et ressuscitent » (Osiris, Adonis) relèvent de mythes saisonniers, sans personnage historique ; les parallèles avec Horus ou Mithra viennent surtout d’auteurs du XIXᵉ siècle. Le christianisme parle d’un événement daté, « sous Ponce Pilate » : le « mythe devenu réalité », disait C. S. Lewis.`,
      lim: `Des usages et des dates ont pu être empruntés au monde ambiant ; le contenu de la foi, non.` },

    { th: 'Jésus', lvl: 1, q: `« Jésus n’a jamais existé. »`,
      a: `La quasi-totalité des historiens, croyants ou non (comme l’agnostique Bart Ehrman), tiennent pour certain que Jésus a existé et qu’il a été crucifié sous Ponce Pilate. Sources non chrétiennes : Tacite (Annales XV, 44), Flavius Josèphe, Pline le Jeune.` },
    { th: 'Jésus', lvl: 5, q: `« La Résurrection n’a pas eu lieu. »`,
      a: `C’est le cœur du débat. Des faits admis par une majorité d’historiens (la crucifixion, les apparitions auxquelles les disciples ont cru sincèrement, la conversion de Paul le persécuteur et de Jacques le sceptique ; le tombeau vide, plus discuté) s’expliquent mal autrement. Les hypothèses de rechange (vol du corps, mort apparente, hallucinations) ont toutes de grosses difficultés.`,
      lim: `C’est un argument de plausibilité historique : il ne force pas la foi, et des historiens sérieux concluent autrement.` },
    { th: 'Jésus', lvl: 3, q: `« Jésus n’a jamais dit qu’il était Dieu : Paul ou les conciles l’ont inventé. »`,
      a: `Même chez Marc, le plus ancien évangile, Jésus pardonne les péchés (« qui peut pardonner, sinon Dieu seul ? », Mc 2, 7) et il est condamné pour blasphème (Mc 14, 61-64). Paul, le plus ancien témoin écrit, l’insère dans le Shema (1 Co 8, 6) et cite un hymne sans doute plus ancien que lui (Ph 2, 6-11). Les conciles ont précisé la foi, ils ne l’ont pas inventée.` },

    { th: 'La doctrine', lvl: 2, q: `« La Trinité est contradictoire : 1 + 1 + 1 = 3. »`,
      a: `Une seule essence (ce qu’est Dieu), trois personnes (qui est Dieu) : « un » et « trois » ne portent pas sur la même chose, il n’y a donc pas de contradiction. Toute image (eau, soleil, trèfle) est imparfaite : c’est un mystère, non une absurdité.` },
    { th: 'La doctrine', lvl: 3, q: `« Si Dieu sait tout d’avance, nous ne sommes pas libres. »`,
      a: `Prévoir n’est pas causer : savoir qu’un choix sera fait ne le fait pas faire. Dieu, hors du temps, voit nos choix libres sans les déterminer (Jean Damascène : « Dieu prévoit tout, mais il ne prédétermine pas tout »).`,
      lim: `La question de savoir pourquoi Dieu crée en sachant reste ouverte : c’est le problème du mal sous une autre forme.` },
    { th: 'La doctrine', lvl: 3, q: `« Le sacrifice du Christ est barbare : un Père qui punit son Fils. »`,
      a: `L’objection vise surtout la substitution pénale, une doctrine protestante. Pour l’Orthodoxie, le Père ne punit pas le Fils : la Trinité agit ensemble, et le Christ entre librement dans la mort pour la vaincre de l’intérieur et guérir notre nature (Athanase, Sur l’Incarnation ; « par la mort il a vaincu la mort »).`,
      lim: `Les Pères emploient aussi les images de rançon et de sacrifice : ne dis pas qu’elles sont absentes de la Tradition.` },

    { th: 'L’Église et les religions', lvl: 4, q: `« Les chrétiens ont fait les croisades, l’Inquisition, la colonisation. »`,
      a: `Ces crimes sont réels, et l’Église doit le reconnaître. Mais ils trahissent l’Évangile au lieu de l’appliquer : « il n’appartient pas à la religion de contraindre à la religion » (Tertullien, À Scapula, 2). Des chrétiens ont aussi développé les hôpitaux et les universités, et mené le combat contre l’esclavage. Les fautes des croyants jugent les croyants ; elles ne disent rien de la vérité de la foi.`,
      lim: `Moralement, l’objection est sérieuse ; logiquement, elle est faible. Ne nie pas non plus les fautes du monde orthodoxe (persécution des vieux-croyants, compromissions avec le pouvoir).` },
    { th: 'L’Église et les religions', lvl: 4, q: `« Avec toutes les religions, pourquoi la tienne ? Et ceux qui n’ont jamais connu le Christ ? »`,
      a: `Le christianisme repose sur un événement historique que l’on peut examiner dans une certaine mesure, la Résurrection, alors que beaucoup de religions reposent sur une révélation faite à une seule personne. Il reconnaît des « semences du Verbe » partout (Justin). Quant à ceux qui n’ont pas connu le Christ, Dieu les jugera selon ce qu’ils ont reçu (Rm 2, 14-16) : l’Église ne sait pas comment, et elle espère.` },
    { th: 'L’Église et les religions', lvl: 4, q: `« Avec des milliers de dénominations, laquelle est la vraie Église ? »`,
      a: `Le chiffre souvent cité est gonflé, mais la division est réelle. Le critère orthodoxe : la continuité avec l’Église des apôtres (succession, sacrements, foi des sept conciles) et la réception de la foi par l’Église entière au fil des siècles. C’est là que se joue le vrai débat avec Rome, les Églises orientales et les protestants.`,
      lim: `Rome et d’autres Églises ont des arguments symétriques : voir le Cahier de débats.` }
  ];
  O.TOP_OBJ_NOTE = `Les objections vraiment sérieuses sont surtout trois : le mal (et la souffrance animale), le silence de Dieu et la violence de l’Ancien Testament. Presque toutes les autres reviennent, sous des formes différentes, dans les vidéos et les discussions : quand une objection passe, cherche d’abord dans quelle case elle tombe.`;
})();
