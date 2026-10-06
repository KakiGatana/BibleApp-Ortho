/* Grandes fêtes : sens théologique, tropaire (fr + slavon), lectures de la Liturgie */
(function () {
  const O = (window.ORTHO = window.ORTHO || {});
  O.FEASTS = [
    {
      id: 'paques', rel: 0, rank: 6, kind: 'pascha', name: 'Sainte Pâque', cs: 'Святая Пасха',
      sub: 'La Fête des fêtes, Pâque du Seigneur',
      icon: 'L’icône de la Résurrection montre la Descente aux enfers : le Christ, rayonnant, brise les portes de l’Hadès et saisit Adam et Ève par la main pour les relever.',
      meaning: [
        'Pâques est le cœur et la source de toute l’année liturgique. Le mot « pascha » signifie « passage » : passage de la mort à la vie, de la terre au ciel. Le Christ, en descendant volontairement dans la mort, la détruit de l’intérieur et ouvre à toute l’humanité la porte de la vie éternelle.',
        'Contrairement à l’Occident, l’Église orthodoxe voit dans la Résurrection moins une « preuve » qu’une victoire cosmique : la création entière est renouvelée. C’est pourquoi toute la nuit pascale est lumière, chant, cloches et baisers de paix : « Jour de la Résurrection, resplendissons de joie ! »',
        'La date de Pâques suit la règle du premier concile de Nicée (325) : le dimanche après la première pleine lune de printemps, et toujours après la Pâque juive. Les Églises orthodoxes calculent d’après le calendrier julien, d’où le décalage fréquent avec la fête occidentale.'
      ],
      troparion: { tone: 5, fr: 'Christ est ressuscité des morts, par la mort il a vaincu la mort, et à ceux qui gisent dans les tombeaux il a donné la vie.', cs: 'Христо́съ воскре́се изъ ме́ртвыхъ, сме́ртію сме́рть попра́въ, и су́щымъ во гро́бѣхъ животъ даро́вавъ.' },
      reading: { epistle: 'Ac 1:1-8', gospel: 'Jn 1:1-17' },
      traditions: 'Veillée de minuit, procession autour de l’église, salutation « Christ est ressuscité ! — En vérité Il est ressuscité ! », bénédiction des paniers pascals, œufs rouges, portes royales ouvertes toute la Semaine lumineuse.',
      verse: ['Mt 28:6', 'Il n’est point ici ; il est ressuscité, comme il l’avait dit.', 'Нѣсть здѣ: воста бо, якоже рече.']
    },
    {
      id: 'nativite-mere-de-dieu', md: '09-08', rank: 5, kind: 'theotokos', name: 'Nativité de la Mère de Dieu', cs: 'Рождество Пресвятыя Богородицы',
      sub: 'Début de l’année liturgique mariale',
      icon: 'Anne, allongée, reçoit la visite de servantes ; Joachim et Anne contemplent leur fille, fruit de la prière après des années de stérilité.',
      meaning: [
        'Joachim et Anne, âgés et sans enfant, obtiennent par leur prière la naissance de Marie. Cette fête célèbre l’aube du salut : celle qui deviendra la Mère de Dieu naît du peuple d’Israël, fruit de la patience, de la prière et de la grâce.',
        'Pour les Pères, Marie est « la porte par laquelle le Christ entre dans le monde », le lieu où Dieu et l’humanité se rencontrent. Sa naissance annonce déjà l’Incarnation, comme l’aurore annonce le soleil.'
      ],
      troparion: { tone: 4, fr: 'Ta nativité, Vierge Mère de Dieu, a annoncé la joie à tout l’univers : de toi s’est levé le Soleil de justice, le Christ notre Dieu ; il a détruit la malédiction et donné la bénédiction, il a aboli la mort et nous a donné la vie éternelle.', cs: 'Рождество́ Твое́, Богоро́дице Дѣ́во, ра́дость возвѣсти́ всей вселе́ннѣй: изъ Тебе́ бо возсі́я Со́лнце пра́вды, Христо́съ Бо́гъ нашъ, и разруши́въ кля́тву, да́де благослове́ніе, и упраздни́въ сме́рть, дарова́ намъ животъ вѣ́чный.' },
      reading: { epistle: 'Ph 2:5-11', gospel: 'Lc 10:38-42 ; 11:27-28' },
      traditions: 'Première grande fête de l’année liturgique (1er septembre : début de l’année ecclésiastique). Vigile, litie, bénédiction du pain.',
      verse: ['Lc 1:48', 'Il a jeté les yeux sur l’abaissement de sa servante ; désormais toutes les générations me diront bienheureuse.', 'Яко призрѣ на смиреніе рабы Своея: се бо отнынѣ ублажатъ Мя вси роди.']
    },
    {
      id: 'exaltation-croix', md: '09-14', rank: 5, kind: 'seigneur', name: 'Exaltation de la Sainte Croix', cs: 'Воздвиженіе Честнаго и Животворящаго Креста',
      sub: 'Jour de jeûne strict',
      icon: 'Le patriarche élève la Croix sur l’ambon devant la foule qui chante « Kyrie eleison » ; à ses côtés, l’empereur Constantin et Hélène.',
      meaning: [
        'Cette fête commémore la découverte de la Croix du Christ par sainte Hélène (vers 326) et son élévation solennelle à Jérusalem. Le bois de l’humiliation devient l’étendard de la victoire : « Ta Croix, Seigneur, nous l’adorons, et ta sainte Résurrection nous la glorifions. »',
        'Le jeûne de ce jour dit la sobriété devant le mystère : la Croix n’est pas un simple symbole, mais l’arbre de vie planté au milieu de la terre, qui rend à Adam l’accès au Paradis.'
      ],
      troparion: { tone: 1, fr: 'Seigneur, sauve ton peuple et bénis ton héritage ; donne la victoire à ton Église sur ses adversaires, et protège par ta Croix ceux qui t’appartiennent.', cs: 'Спаси́, Го́споди, лю́ди Твоя́, и благослови́ достоя́ніе Твое́, побѣ́ды на сопроти́вныя даруя́, и Твое́ сохраня́я Кресто́мъ Твои́мъ жи́тельство.' },
      reading: { epistle: '1 Co 1:18-24', gospel: 'Jn 19:6-11, 13-20, 25-28, 30-35' },
      traditions: 'Vénération de la Croix fleurie de basilic. Jour de jeûne même s’il tombe un samedi ou un dimanche (huile et vin permis).',
      verse: ['1 Co 1:18', 'La parole de la croix est folie pour ceux qui périssent ; mais pour nous qui sommes sauvés, elle est une puissance de Dieu.', 'Слово бо крестное погибающымъ убо юродство есть, спасаемымъ же намъ сила Божія есть.']
    },
    {
      id: 'entree-temple', md: '11-21', rank: 5, kind: 'theotokos', name: 'Entrée de la Mère de Dieu au Temple', cs: 'Введеніе во храмъ Пресвятыя Богородицы',
      sub: 'Marie, temple vivant de Dieu',
      icon: 'La petite Marie, à trois ans, gravit les marches du Temple ; le grand prêtre Zacharie l’accueille et la conduit jusqu’au Saint des Saints.',
      meaning: [
        'D’après la Tradition, Marie fut offerte à Dieu dès l’enfance et grandit dans le Temple. Elle y entre dans le Saint des Saints : celle qui sera le « temple » où Dieu fait sa demeure est introduite dans le lieu de la présence divine.',
        'Cette fête ouvre la préparation de Noël : l’Église commence à chanter les premiers hirmos de la Nativité (« Le Christ naît, glorifiez-le ! »). Le poisson est permis ce jour-là, même pendant le Carême de la Nativité.'
      ],
      troparion: { tone: 4, fr: 'Aujourd’hui est le prélude de la bienveillance de Dieu et l’annonce du salut des hommes : la Vierge paraît ouvertement dans le Temple de Dieu et annonce le Christ à tous. Crions-lui nous aussi à haute voix : Réjouis-toi, accomplissement du dessein du Créateur !', cs: 'Днесь благоволе́нія Бо́жія предобразова́ніе, и человѣ́ковъ спасе́нія проповѣ́даніе: во хра́мѣ Бо́жіи я́сно дѣ́ва явля́ется, и Христа́ всѣ́мъ предвозвѣща́етъ. Той и мы вскли́кнемъ велегла́сно: ра́дуйся смотре́нія Зи́ждителева исполне́ніе.' },
      reading: { epistle: 'He 9:1-7', gospel: 'Lc 10:38-42 ; 11:27-28' },
      traditions: 'Hirmos de Noël chantés pour la première fois ; poisson permis.',
      verse: ['Ps 83:2-3', 'Que tes demeures sont aimables, Seigneur des puissances ! Mon âme languit et se consume en désirant les parvis du Seigneur.', 'Коль возлюбленна селенія Твоя, Господи силъ! Желаетъ и скончавается душа моя во дворы Господни.']
    },
    {
      id: 'nativite', md: '12-25', rank: 5, kind: 'seigneur', name: 'Nativité de notre Seigneur Jésus-Christ', cs: 'Рождество Господа Бога и Спаса нашего Иисуса Христа',
      sub: 'Dieu parmi les hommes',
      icon: 'Dans la grotte, la Mère de Dieu repose près de l’Enfant emmailloté ; les anges chantent, les bergers accourent, les mages suivent l’étoile.',
      meaning: [
        'Le Verbe éternel prend chair de la Vierge Marie et naît à Bethléem : « Dieu s’est fait homme pour que l’homme devienne dieu », disait saint Athanase. Le Créateur entre dans sa création pour la guérir de l’intérieur.',
        'L’icône place l’Enfant dans une grotte sombre, déjà image du tombeau : la naissance contient la Pâque. L’étoile guide les mages, c’est-à-dire les nations ; les bergers, les humbles ; les anges chantent « Gloire à Dieu au plus haut des cieux ».',
        'Les Églises qui suivent l’ancien calendrier julien célèbrent Noël le 7 janvier civil.'
      ],
      troparion: { tone: 4, fr: 'Ta nativité, Christ notre Dieu, a fait lever sur le monde la lumière de la connaissance : par elle, ceux qui servaient les astres ont appris d’un astre à t’adorer, toi le Soleil de justice, et à te connaître, Orient d’en haut. Seigneur, gloire à toi !', cs: 'Рождество́ Твое́, Христе́ Бо́же на́шъ, возсі́я мі́рови свѣ́тъ ра́зума: въ не́мъ бо звѣздамъ служа́щіи, звѣздо́ю учаху́ся Тебѣ́ кла́нятися, Со́лнцу пра́вды, и Тебе́ вѣ́дѣти съ высоты́ востока́: Го́споди, сла́ва Тебѣ́.' },
      reading: { epistle: 'Ga 4:4-7', gospel: 'Mt 2:1-12' },
      traditions: 'Précédée du Carême de la Nativité (40 jours), de la veille de jeûne strict (Royales Heures), de la Vigile. Suivie de 12 jours de fête sans jeûne jusqu’à l’Épiphanie.',
      verse: ['Jn 1:14', 'Et le Verbe s’est fait chair, il a habité parmi nous, et nous avons contemplé sa gloire.', 'И Слово плоть бысть, и вселися въ ны, и видѣхомъ славу Его.']
    },
    {
      id: 'circoncision', md: '01-01', rank: 4, kind: 'seigneur', name: 'Circoncision du Seigneur — saint Basile le Grand', cs: 'Обрѣзаніе Господне. Святитель Василій Великій',
      sub: 'Le Nom de Jésus',
      icon: 'Le prêtre tient l’Enfant Jésus pour la circoncision, au huitième jour, devant Marie et Joseph.',
      meaning: [
        'Huit jours après sa naissance, le Christ est circoncis et reçoit le nom de Jésus (« Dieu sauve »). Lui qui est le Législateur se soumet à la Loi : humilité de Dieu, accomplissement de l’Alliance.',
        'C’est aussi la mémoire de saint Basile le Grand, évêque de Césarée, grand docteur de l’Église, auteur de la Liturgie qui porte son nom et de l’Hexaéméron.'
      ],
      troparion: { tone: 1, fr: 'Ta parole a parcouru toute la terre, qui a reçu ta doctrine : par elle tu as exposé la divine nature des êtres et réglé les mœurs des hommes. Prêtre royal, Basile notre Père, intercède auprès du Christ notre Dieu pour le salut de nos âmes.', cs: 'Во всю́ зе́млю изы́де вѣща́ніе твое́, я́ко пріе́мшую сло́во твое́, имъ́же боголѣ́пно научи́лъ еси́, естество́ су́щихъ объясни́лъ еси́, челове́ческая нра́вы украси́лъ еси́, ца́рское свяще́нство, О́тче преподо́бне, моли́ Христа́ Бо́га спастися́ душа́мъ на́шымъ.' },
      reading: { epistle: 'Col 2:8-12', gospel: 'Lc 2:20-21, 40-52' },
      traditions: 'On offre le pain de saint Basile (vassilopita en Grèce) ; vœux de la nouvelle année civile.',
      verse: ['Ph 2:9-10', 'Dieu l’a souverainement élevé et lui a donné le nom qui est au-dessus de tout nom, afin qu’au nom de Jésus tout genou fléchisse.', 'Богъ Того превознесе, и дарова Ему имя, еже есть паче всякаго имене.']
    },
    {
      id: 'theophanie', md: '01-06', rank: 5, kind: 'seigneur', name: 'Théophanie — Baptême du Seigneur', cs: 'Святое Богоявленіе. Крещеніе Господа Бога и Спаса нашего Иисуса Христа',
      sub: 'La manifestation de la Trinité',
      icon: 'Le Christ, nu dans le Jourdain, est baptisé par Jean ; les eaux s’écartent, la colombe descend, la main du Père bénit du haut du ciel.',
      meaning: [
        'Au Jourdain, la Trinité se manifeste : le Père témoigne, le Fils est baptisé, l’Esprit descend sous la forme d’une colombe. C’est la « Théophanie », la manifestation de Dieu. Le Christ entre dans les eaux non pour être purifié, mais pour purifier l’eau et toute la création.',
        'D’où la grande bénédiction des eaux, le jour de la fête (et la veille) : l’eau bénite est conservée toute l’année pour les bénédictions et la santé de l’âme et du corps.'
      ],
      troparion: { tone: 1, fr: 'Quand tu fus baptisé dans le Jourdain, Seigneur, l’adoration de la Trinité fut manifestée : la voix du Père te rendit témoignage, en t’appelant son Fils bien-aimé, et l’Esprit, sous la forme d’une colombe, confirma la certitude de cette parole. Christ Dieu, qui t’es manifesté et as illuminé le monde, gloire à toi !', cs: 'Во Іорда́нѣ крещаю́щуся Тебѣ́, Го́споди, Тройческое явися́ поклоне́ніе: Роди́телевъ бо гла́съ свидѣ́тельствоваше Тебѣ́, возлю́бленнаго Тя Сы́на именуя́, и Ду́хъ, въ видѣ́ голуби́не, извѣща́ше словесе́ утвержде́ніе. Явлы́йся, Христе́ Бо́же, и мі́ръ просвѣти́вый, сла́ва Тебѣ́.' },
      reading: { epistle: 'Tt 2:11-14 ; 3:4-7', gospel: 'Mt 3:13-17' },
      traditions: 'Veille de jeûne strict (5 janvier), grande bénédiction des eaux, plongeon dans les rivières glacées dans les pays slaves.',
      verse: ['Mt 3:17', 'Et une voix fit entendre des cieux ces paroles : Celui-ci est mon Fils bien-aimé, en qui j’ai mis toute mon affection.', 'Сей есть Сынъ Мой возлюбленный, о Немже благоволихъ.']
    },
    {
      id: 'presentation', md: '02-02', rank: 5, kind: 'seigneur', name: 'Présentation du Seigneur au Temple (Rencontre)', cs: 'Срѣтеніе Господа Бога и Спаса нашего Иисуса Христа',
      sub: 'La rencontre de l’Ancien et du Nouveau',
      icon: 'Marie tend l’Enfant au vieillard Syméon qui l’accueille dans ses bras ; derrière, Joseph porte les deux tourterelles, et la prophétesse Anne tient un rouleau.',
      meaning: [
        'Quarante jours après Noël, Marie et Joseph présentent Jésus au Temple. Syméon, vieillard juste, prend l’Enfant dans ses bras et proclame : « Mes yeux ont vu ton salut ». La « Rencontre » (Sretenie) est la rencontre de l’humanité qui attend et du Dieu qui vient.',
        'Le cantique de Syméon (« Maintenant, Maître, tu laisses ton serviteur s’en aller en paix ») est chanté chaque soir à Vêpres : il est la prière du croyant qui a vu la lumière et peut désormais s’endormir sans crainte.'
      ],
      troparion: { tone: 1, fr: 'Réjouis-toi, pleine de grâce, Vierge Mère de Dieu : de toi s’est levé le Soleil de justice, le Christ notre Dieu, qui illumine ceux qui sont dans les ténèbres. Réjouis-toi, toi aussi, juste vieillard, qui as reçu dans tes bras le Libérateur de nos âmes, qui nous donne aussi la résurrection.', cs: 'Ра́дуйся, благода́тная Богоро́дице Дѣ́во, из Тебе́ бо возсі́я Со́лнце пра́вды, Христо́съ Бо́гъ нашъ, просвѣща́яй су́щыя во тмѣ́. Веселі́ся и ты́, ста́рче пра́веденъ, пріе́мый во объя́тія свобожде́ніе душ нашихъ, дару́ющаго на́мъ и воскресе́ніе.' },
      reading: { epistle: 'He 7:7-17', gospel: 'Lc 2:22-40' },
      traditions: 'Bénédiction des cierges, procession.',
      verse: ['Lc 2:29-30', 'Maintenant, Maître, tu laisses ton serviteur s’en aller en paix, selon ta parole ; car mes yeux ont vu ton salut.', 'Нынѣ отпущаеши раба Твоего, Владыко, по глаголу Твоему съ миромъ: яко видѣстѣ очи мои спасеніе Твое.']
    },
    {
      id: 'annonciation', md: '03-25', rank: 5, kind: 'theotokos', name: 'Annonciation de la Mère de Dieu', cs: 'Благовѣщеніе Пресвятыя Богородицы',
      sub: 'Le « oui » de Marie',
      icon: 'L’archange Gabriel, une main levée, annonce la nouvelle à Marie qui tient la laine pourpre du voile du Temple.',
      meaning: [
        '« Réjouis-toi, pleine de grâce, le Seigneur est avec toi ! » L’ange annonce à Marie qu’elle concevra le Fils du Très-Haut. Le salut du monde attend sa réponse libre : « Qu’il me soit fait selon ta parole ». Dieu ne force pas, il s’offre.',
        'Neuf mois avant Noël, cette fête est « le commencement de notre salut » : le Verbe prend chair par le Saint-Esprit. Le poisson est permis même pendant le Grand Carême.'
      ],
      troparion: { tone: 4, fr: 'Aujourd’hui est le commencement de notre salut et la révélation du mystère éternel : le Fils de Dieu devient Fils de la Vierge, et Gabriel annonce la grâce. Avec lui, crions à la Mère de Dieu : Réjouis-toi, pleine de grâce, le Seigneur est avec toi !', cs: 'Днесь спасе́нія на́шего глави́зна, и е́же отъ вѣ́ка та́инства явле́ніе: Сы́нъ Бо́жій, Сы́нъ Дѣ́вы быва́етъ, и Гаврі́илъ благода́ть благовѣща́етъ. Тѣ́мже и мы́ съ ни́мъ Богоро́дицѣ возопі́имъ: ра́дуйся, благода́тная, Госпо́дь съ Тобо́ю.' },
      reading: { epistle: 'He 2:11-18', gospel: 'Lc 1:24-38' },
      traditions: 'Les oiseaux sont symboliquement libérés (tradition slave). Poisson permis en Carême.',
      verse: ['Lc 1:38', 'Marie dit : Voici la servante du Seigneur ; qu’il me soit fait selon ta parole.', 'Се раба Господня: буди ми по глаголу Твоему.']
    },
    {
      id: 'rameaux', rel: -7, rank: 5, kind: 'seigneur', name: 'Entrée du Seigneur à Jérusalem (Rameaux)', cs: 'Вход Господень во Иерусалимъ',
      sub: 'Hosanna au Fils de David',
      icon: 'Le Christ, assis sur un ânon, entre à Jérusalem ; la foule étend ses vêtements et agite des palmes ou des branches d’olivier.',
      meaning: [
        'Six jours avant Pâques, le Christ entre à Jérusalem acclamé comme roi. Il vient pourtant sur un ânon, humble, « doux », vers sa Passion. La veille, Lazare avait été ressuscité : l’entrée dit déjà la victoire sur la mort.',
        'La fête ouvre la Semaine sainte et rappelle que chacun est invité à accueillir le Roi de gloire dans son cœur, non à l’attendre dans l’apparat.'
      ],
      troparion: { tone: 1, fr: 'Pour nous donner l’assurance de la résurrection universelle avant ta Passion, tu as ressuscité Lazare d’entre les morts, Christ Dieu. C’est pourquoi nous aussi, comme les enfants, portant les signes de la victoire, nous te crions, vainqueur de la mort : Hosanna au plus haut des cieux ! Béni soit celui qui vient au nom du Seigneur !', cs: 'Обще́е воскресе́ніе прежде Твоея́ страсти увѣря́я, изъ ме́ртвыхъ воздви́гль еси́ Ла́заря, Христе́ Бо́же: тѣ́мже и мы́, я́ко отро́цы побѣ́ды зна́менія нося́ще, Тебѣ́ побѣди́телю сме́рти вопіе́мъ: оса́нна въ вы́шнихъ, благослове́нъ гряды́й во и́мя Госпо́дне.' },
      reading: { epistle: 'Ph 4:4-9', gospel: 'Jn 12:1-18' },
      traditions: 'Bénédiction des rameaux (palmes, saule, olivier) et procession.',
      verse: ['Mt 21:9', 'Hosanna au Fils de David ! Béni soit celui qui vient au nom du Seigneur ! Hosanna dans les lieux très hauts !', 'Осанна Сынови Давидову: благословенъ грядый во имя Господне, осанна въ вышнихъ.']
    },
    {
      id: 'gv', rel: -2, rank: 5, kind: 'passion', name: 'Grand et Saint Vendredi', cs: 'Великій пятокъ',
      sub: 'La Passion et l’ensevelissement',
      icon: 'Le Christ en croix, entouré de Marie et de Jean ; le soleil et la lune s’obscurcissent ; au pied, le crâne d’Adam.',
      meaning: [
        'Le Vendredi saint est le jour de la Crucifixion. L’Église ne pleure pas seulement : elle contemple en la Croix l’amour jusqu’au bout. Le soir, on dépose l’épitaphios (linceul brodé) dans un tombeau fleuri et l’on chante les Lamentations : « La vie repose dans le tombeau ».',
        'Jour de jeûne absolu. Pas de liturgie eucharistique : le Christ est l’Agneau immolé.'
      ],
      troparion: { tone: 5, fr: 'Tu nous as rachetés de la malédiction de la Loi par ton précieux sang ; cloué sur la croix et percé de la lance, tu as fait jaillir pour les hommes l’immortalité. Notre Sauveur, gloire à toi !', cs: 'Искупи́лъ ны еси́ отъ кля́твы зако́нныя че́стною Твоею́ кро́вію, на кресте́ пригвозди́вся и копіе́мъ прободе́йся, безсме́ртіе источи́лъ еси́ человѣ́комъ, Спа́се нашъ, сла́ва Тебѣ́.' },
      reading: { epistle: '1 Co 1:18-2:2', gospel: 'Mt 27:1-38 ; Lc 23:39-43 ; Mt 27:39-54 ; Jn 19:31-37 ; Mt 27:55-61' },
      traditions: 'Sortie de l’épitaphios, vénération du linceul, silence et jeûne absolu.',
      verse: ['Jn 19:30', 'Quand Jésus eut pris le vinaigre, il dit : Tout est accompli. Et, baissant la tête, il rendit l’esprit.', 'Свершишася. И приклонь главу предаде духъ.']
    },
    {
      id: 'gs', rel: -1, rank: 5, kind: 'passion', name: 'Grand et Saint Samedi', cs: 'Великая суббота',
      sub: 'Le Sabbat béni, descente aux enfers',
      icon: 'Le Christ, vainqueur de l’Hadès, relève Adam et Ève ; les portes brisées gisent sous ses pieds.',
      meaning: [
        'Le corps du Christ repose au tombeau, mais son âme descend aux enfers pour libérer les justes. « Aujourd’hui un grand silence règne sur la terre », dit une homélie antique : Dieu est endormi dans la chair et réveille ceux qui dorment depuis des siècles.',
        'Le Samedi saint est le « sabbat du sabbat », repos du septième jour de la création où Dieu repose de l’œuvre de rédemption. Il se termine dans l’attente fébrile de la vigile pascale.'
      ],
      troparion: { tone: 2, fr: 'Le noble Joseph, ayant descendu de la croix ton corps très pur, l’enveloppa d’un linceul blanc, avec des aromates, et le déposa dans un tombeau neuf.', cs: 'Благообра́зный Ио́сифъ, съ дре́ва сни́мъ пречи́стое Тѣ́ло Твое́, плащани́цею чи́стою обви́въ, и арома́ты во гро́бѣ но́вѣ закры́въ положи́.' },
      reading: { epistle: '1 Co 5:6-8 ; Ga 3:13-14', gospel: 'Mt 28:1-20' },
      traditions: 'Liturgie de saint Basile le matin, avec rameaux de laurier ; on attend minuit pour la Résurrection.',
      verse: ['Ps 3:6', 'Je me couche, je m’endors, je me réveille : car le Seigneur est mon soutien.', 'Азъ уснухъ и спахъ, воставъ, яко Господь заступитъ мя.']
    },
    {
      id: 'ascension', rel: 39, rank: 5, kind: 'seigneur', name: 'Ascension de notre Seigneur', cs: 'Вознесеніе Господне',
      sub: 'Quarante jours après Pâques',
      icon: 'Le Christ monte au ciel dans une mandorle portée par deux anges ; en bas, la Mère de Dieu entourée des Apôtres.',
      meaning: [
        'Quarante jours après la Résurrection, le Christ monte au ciel. Il n’abandonne pas la terre : il emporte avec lui notre nature humaine jusque « à la droite du Père ». L’humanité est ainsi introduite dans la vie divine.',
        'Les anges disent aux Apôtres : « Il reviendra de la même manière ». L’Ascension fonde l’espérance de la seconde venue et la mission de l’Église.'
      ],
      troparion: { tone: 4, fr: 'Tu es monté dans la gloire, Christ notre Dieu, comblant de joie tes disciples par la promesse du Saint-Esprit ; la bénédiction les a convaincus que tu es le Fils de Dieu, le Rédempteur du monde.', cs: 'Вознесі́йся во сла́вѣ, Христе́ Бо́же на́шъ, ра́дость сотвори́вый ученико́мъ обѣтова́ніемъ Свята́го Ду́ха, извѣще́нымъ имъ бы́вшымъ благослове́ніемъ, я́ко Ты́ еси́ Сы́нъ Бо́жій, избави́тель мі́ра.' },
      reading: { epistle: 'Ac 1:1-12', gospel: 'Lc 24:36-53' },
      traditions: 'Une fête de jeudi. Le salut pascal « Christ est ressuscité » est chanté jusqu’à la veille de l’Ascension.',
      verse: ['Ac 1:11', 'Hommes galiléens, pourquoi vous arrêtez-vous à regarder au ciel ? Ce Jésus reviendra de la même manière que vous l’avez vu allant au ciel.', 'Мужіе Галилейстіи, что стоите зряще на небо? Сей Іисусъ вознесыйся отъ васъ на небо, такожде пріидетъ.']
    },
    {
      id: 'pentecote', rel: 49, rank: 5, kind: 'seigneur', name: 'Pentecôte — Fête de la Sainte Trinité', cs: 'Пятидесятница. День Святыя Троицы',
      sub: 'Naissance de l’Église',
      icon: 'Les douze Apôtres, assis en demi-cercle, reçoivent les langues de feu ; au centre, le « cosmos », vieillard couronné, tient un linge avec douze rouleaux.',
      meaning: [
        'Cinquante jours après Pâques, l’Esprit Saint descend sur les Apôtres en langues de feu. Babel est renversée : les langues divisées sont réunies dans l’unique Église. L’Esprit n’est pas un souvenir : il est l’habitant de l’Église, qui « fait de l’Église l’Église ».',
        'Cette fête est aussi dite « de la Trinité » : le Père envoie le Fils, le Fils envoie l’Esprit. Le soir, on célèbre les Vêpres de la génuflexion, avec trois grandes prières pour le monde, les vivants et les défunts.'
      ],
      troparion: { tone: 8, fr: 'Béni es-tu, Christ notre Dieu, toi qui as rendu sages de simples pêcheurs en leur envoyant l’Esprit Saint, et qui par eux as pris le monde dans tes filets. Ami des hommes, gloire à toi !', cs: 'Благослове́нъ еси́, Христе́ Бо́же на́шъ, и́же премудры ловцы́ яви́лъ еси́, низпосла́въ и́мъ Ду́ха Свята́го, и тѣ́ми уловлѣ́й вселе́нную: Человѣколю́бче, сла́ва Тебѣ́.' },
      reading: { epistle: 'Ac 2:1-11', gospel: 'Jn 7:37-52 ; 8:12' },
      traditions: 'Églises ornées de branches vertes, bouquets d’herbes ; Vêpres de la génuflexion. Le lundi suivant est le « Jour du Saint-Esprit ».',
      verse: ['Ac 2:4', 'Tous furent remplis du Saint-Esprit, et se mirent à parler en d’autres langues, selon que l’Esprit leur donnait de s’exprimer.', 'И исполнишася вси Духа Свята, и начаша глаголати иными язы́ки, якоже Духъ даяше имъ провѣщавати.']
    },
    {
      id: 'nativite-jean', md: '06-24', rank: 4, kind: 'saint', name: 'Nativité de saint Jean le Précurseur', cs: 'Рождество честнаго славнаго Пророка, Предтечи и Крестителя Господня Иоанна',
      sub: 'La voix qui précède le Verbe',
      icon: 'Élisabeth soutient Jean nouveau-né ; Zacharie, muet, écrit sur une tablette : « Son nom est Jean ».',
      meaning: [
        'Jean naît six mois avant Jésus, de parents âgés et jusque-là stériles. Il est « la voix qui crie dans le désert » et « l’ami de l’Époux ». Le Christ dit de lui qu’il est le plus grand parmi les hommes nés de femme.',
        'Sa fête tombe en pleine période de jeûne des Apôtres : le poisson est permis ce jour-là.'
      ],
      troparion: { tone: 4, fr: 'Prophète et Précurseur de la venue du Christ, nous ne savons te louer dignement, nous qui t’aimons ; car la stérilité de celle qui t’enfanta et le mutisme de ton père ont été levés par ta glorieuse et vénérable naissance. Intercède auprès du Christ notre Dieu pour le salut de nos âmes.', cs: '' },
      reading: { epistle: 'Rm 13:11–14:4', gospel: 'Lc 1:1-25, 57-68, 76, 80' },
      traditions: 'Dans les pays slaves : fête des feux de la Saint-Jean (Ivan Kupala), christianisée.',
      verse: ['Jn 3:30', 'Il faut qu’il croisse, et que je diminue.', 'Тому подобаетъ расти, мнѣ же малѣти.']
    },
    {
      id: 'pierre-paul', md: '06-29', rank: 4, kind: 'saint', name: 'Les saints Apôtres Pierre et Paul', cs: 'Святыхъ славныхъ и всехвальныхъ верховныхъ апостолъ Петра и Павла',
      sub: 'Fin du Carême des Apôtres',
      icon: 'Pierre et Paul s’embrassent, unis dans la foi malgré des tempéraments très différents.',
      meaning: [
        'Pierre, le pêcheur de Galilée, a confessé le Christ « Fils du Dieu vivant ». Paul, l’ancien persécuteur, devient l’apôtre des nations. Martyrisés à Rome sous Néron, ils sont célébrés ensemble comme les deux colonnes de l’Église.',
        'Cette fête met fin au Carême des Apôtres, qui avait débuté le lundi après la Toussaint orthodoxe.'
      ],
      troparion: { tone: 4, fr: 'Premiers sur les trônes parmi les Apôtres et maîtres de l’univers, suppliez le Maître de tout de donner la paix au monde et à nos âmes la grande miséricorde.', cs: 'Первопресто́льніи апо́столи, и вселе́нныя учи́телие, Влады́ку всѣ́хъ моли́те, мі́ръ вселе́ннѣй даро́вати, и душа́мъ на́шымъ вели́ю ми́лость.' },
      reading: { epistle: '2 Co 11:21–12:9', gospel: 'Mt 16:13-19' },
      traditions: 'Fin du jeûne ; repas festif.',
      verse: ['Mt 16:16', 'Simon Pierre répondit : Tu es le Christ, le Fils du Dieu vivant.', 'Ты еси Христосъ, Сынъ Бога живаго.']
    },
    {
      id: 'transfiguration', md: '08-06', rank: 5, kind: 'seigneur', name: 'Transfiguration de notre Seigneur', cs: 'Преображеніе Господа Бога и Спаса нашего Иисуса Христа',
      sub: 'La lumière incréée du Thabor',
      icon: 'Le Christ resplendit dans une mandorle de lumière entre Moïse et Élie ; Pierre, Jacques et Jean tombent à terre, éblouis.',
      meaning: [
        'Sur le mont Thabor, le Christ se montre à trois disciples dans la gloire de sa divinité. Les Pères (en particulier saint Grégoire Palamas) enseignent que cette lumière n’est pas un symbole mais la gloire même de Dieu, « incréée », à laquelle l’homme est appelé à participer.',
        'La Transfiguration anticipe la Résurrection et dévoile le destin de l’homme : être transfiguré, divinisé. Le poisson est permis pendant le Carême de la Dormition ; on bénit les premiers fruits (raisins, pommes).'
      ],
      troparion: { tone: 7, fr: 'Tu t’es transfiguré sur la montagne, Christ notre Dieu, montrant à tes disciples ta gloire autant qu’ils pouvaient la porter. Que ta lumière éternelle brille aussi sur nous pécheurs, par les prières de la Mère de Dieu. Donneur de lumière, gloire à toi !', cs: 'Преобрази́лся еси́ на горѣ́, Христе́ Бо́же, показа́вый ученико́мъ Твои́мъ сла́ву Твою́, я́коже можа́ху: да возсі́ястъ и на́мъ грѣ́шнымъ свѣ́тъ Твой присносу́щный, моли́твами Богоро́дицы, Свѣтода́вче, сла́ва Тебѣ́.' },
      reading: { epistle: '2 P 1:10-19', gospel: 'Mt 17:1-9' },
      traditions: 'Bénédiction des fruits nouveaux (raisins, pommes).',
      verse: ['Mt 17:2', 'Il fut transfiguré devant eux ; son visage resplendit comme le soleil, et ses vêtements devinrent blancs comme la lumière.', 'И преобразися предъ ними: и просвѣтися лице Его яко солнце, ризы же Его быша бѣлы яко свѣтъ.']
    },
    {
      id: 'dormition', md: '08-15', rank: 5, kind: 'theotokos', name: 'Dormition de la Mère de Dieu', cs: 'Успеніе Пресвятыя Владычицы нашея Богородицы и Приснодѣвы Маріи',
      sub: 'Le passage de Marie à la vie',
      icon: 'Marie repose sur un lit funèbre entourée des Apôtres ; au centre, le Christ tient dans ses bras une petite figure emmaillotée : l’âme de sa Mère.',
      meaning: [
        'La Mère de Dieu s’endort dans la paix, et le Christ lui-même vient recueillir son âme. La Tradition enseigne que son corps a été transporté au ciel : en elle, la résurrection générale est déjà accomplie.',
        'On parle de « Dormition » (koimesis) plutôt que de mort : Marie « n’abandonne pas le monde », mais devient présence maternelle et intercession. Cette fête clôt le Carême de la Dormition (1er–14 août).'
      ],
      troparion: { tone: 1, fr: 'En enfantant, tu as gardé la virginité ; en t’endormant, tu n’as pas abandonné le monde, Mère de Dieu. Tu es passée à la vie, toi qui es la Mère de la Vie, et par tes prières tu délivres nos âmes de la mort.', cs: 'Во рождествѣ́ дѣ́вство сохрани́ла еси́, во успе́ніи ми́ра не оста́вила еси́, Богоро́дице: преста́вилася еси́ къ животу́, Ма́ти су́щи Живота́, и моли́твами Твои́ми избавля́еши отъ сме́рти ду́ши на́ша.' },
      reading: { epistle: 'Ph 2:5-11', gospel: 'Lc 10:38-42 ; 11:27-28' },
      traditions: 'Procession de l’épitaphios de la Mère de Dieu (Grèce, Chypre), bénédiction des herbes et fleurs.',
      verse: ['Ps 44:10', 'À ta droite se tient la reine, parée d’or d’Ophir.', 'Предста Царица одесную Тебе, во ризахъ позлащенныхъ одѣяна и препестрена.']
    },
    {
      id: 'decollation-jean', md: '08-29', rank: 4, kind: 'saint', name: 'Décollation de saint Jean-Baptiste', cs: 'Усѣкновеніе главы честнаго славнаго Пророка, Предтечи и Крестителя Господня Иоанна',
      sub: 'Jour de jeûne strict',
      icon: 'Jean, décapité par le bourreau, sa tête sur un plat ; un ange recueille son âme.',
      meaning: [
        'Jean reproche à Hérode son union illégitime ; arrêté, il est décapité à la demande d’Hérodiade. Il est le dernier prophète et le premier martyr du Christ, qui descend aux enfers lui annoncer la venue du Messie.',
        'Le jeûne strict et la sobriété (traditionnellement on ne mange pas de plat rond ni de couteau) expriment le deuil devant le sang du Juste.'
      ],
      troparion: { tone: 2, fr: 'La mémoire du juste est célébrée par des louanges ; pour toi, Précurseur, le témoignage du Seigneur suffit. Tu as été en effet reconnu comme le plus vénérable des prophètes, puisque tu as été jugé digne de baptiser dans les flots celui qu’ils annonçaient. Après avoir souffert pour la vérité avec joie, tu as annoncé aussi à ceux qui étaient aux enfers le Dieu manifesté dans la chair, qui enlève le péché du monde et nous accorde la grande miséricorde.', cs: '' },
      reading: { epistle: 'Ac 13:25-32', gospel: 'Mc 6:14-30' },
      traditions: 'Jeûne strict toute l’année.',
      verse: ['Mc 6:20', 'Hérode craignait Jean, le sachant homme juste et saint ; il le protégeait, et l’écoutait avec plaisir.', 'Ирудъ бо боящеся Иоанна, вѣдый его мужа праведна и свята.']
    },
    {
      id: 'protection', md: '10-01', rank: 4, kind: 'theotokos', name: 'Protection de la Mère de Dieu', cs: 'Покровъ Пресвятыя Богородицы',
      sub: 'Fête slave, aussi célébrée en Grèce le 28 octobre',
      icon: 'Marie, debout dans l’air de l’église de Constantinople, étend son voile (omophorion) sur le peuple en prière ; saint André le Fol-en-Christ et son disciple Épiphane la contemplent.',
      meaning: [
        'Au Xe siècle, pendant une vigile à Constantinople, saint André le Fol-en-Christ vit la Mère de Dieu au-dessus de l’assemblée, étendant son voile lumineux sur les fidèles. Le « pokrov » est ce voile, image de la protection maternelle.',
        'La fête exprime la confiance de l’Église en la Mère de Dieu comme refuge et défenseur.'
      ],
      troparion: { tone: 4, fr: 'Aujourd’hui, nous les fidèles, nous célébrons la fête avec éclat, éclairés par ta venue, Mère de Dieu, et regardant ton icône très pure, nous disons avec ferveur : Couvre-nous de ton voile très honorable, et délivre-nous de tout mal en priant ton Fils, le Christ notre Dieu, de sauver nos âmes.', cs: '' },
      reading: { epistle: 'He 9:1-7', gospel: 'Lc 10:38-42 ; 11:27-28' },
      traditions: 'Très populaire en Russie et en Ukraine ; marque le début de l’hiver et du temps des mariages.',
      verse: ['Ps 90:4', 'Il te couvrira de ses plumes, tu trouveras sous ses ailes un refuge.', 'Плещма Своима осѣнитъ тя, и подъ криль Его надѣешися.']
    },
    {
      id: 'archanges', md: '11-08', rank: 4, kind: 'saint', name: 'Synaxe de l’archange Michel et des Puissances célestes', cs: 'Собор Архангела Михаила и прочихъ Безплотныхъ Силъ',
      sub: 'Les armées angéliques',
      icon: 'L’archange Michel, en tenue militaire, tient un glaive ou une lance et un globe ; autour de lui les chœurs angéliques.',
      meaning: [
        'Les anges, esprits immatériels au service de Dieu, forment neuf chœurs : séraphins, chérubins, trônes, dominations, vertus, puissances, principautés, archanges, anges. Michel, « Qui est comme Dieu ? », est le chef des armées célestes.',
        'L’Église enseigne que chaque baptisé a un ange gardien. Honorer les anges, c’est reconnaître que la louange de l’Église se mêle sans cesse à la liturgie céleste.'
      ],
      troparion: { tone: 4, fr: 'Chefs des armées célestes, nous vous supplions sans cesse, nous indignes : par vos prières, protégez-nous à l’ombre de vos ailes immatérielles, nous qui accourons à vous avec persévérance et qui crions : Délivrez-nous des dangers, vous qui commandez aux puissances d’en haut.', cs: 'Небе́сныхъ вои́нствъ нача́льницы, мо́лимъ вы приспѣ́вающе мы недосто́йніи, да моли́твами ва́шими огради́те ны кро́вомъ крилу́ безпло́тныя ва́шея сла́вы, сохраня́юще ны припа́дающия при́лѣжно и вопію́щия: от бѣ́дъ изба́вите ны, я́ко чиноначальницы вы́шнихъ си́лъ.' },
      reading: { epistle: 'He 2:2-10', gospel: 'Lc 10:16-21' },
      traditions: 'Icône de saint Michel terrassant le démon, bénédictions du pain.',
      verse: ['Ps 90:11', 'Car il ordonnera à ses anges de te garder dans toutes tes voies.', 'Яко Ангеломъ Своимъ заповѣстъ о тебѣ, сохранити тя во всѣхъ путехъ твоихъ.']
    }
  ];
})();
