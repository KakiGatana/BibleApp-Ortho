/* Prières de l’Église : français, slavon, lecture interlinéaire (mot à mot).
   Chaque jeton d’interlinéaire = [slavon, prononciation approchée (à la française), sens] */
(function () {
  const O = (window.ORTHO = window.ORTHO || {});
  O.PRAYERS = [
    {
      id: 'pater', title: 'Notre Père', titleCs: 'Отче нашъ', cat: 'Prières de base', when: 'Matin, soir, avant la communion, à chaque office',
      fr: 'Notre Père qui es aux cieux,\nque ton nom soit sanctifié,\nque ton règne vienne,\nque ta volonté soit faite\nsur la terre comme au ciel.\nDonne-nous aujourd’hui notre pain de ce jour ;\npardonne-nous nos dettes,\ncomme nous pardonnons aussi à nos débiteurs ;\net ne nous soumets pas à la tentation,\nmais délivre-nous du Mauvais.\nCar à toi appartiennent le règne, la puissance et la gloire,\nPère, Fils et Saint-Esprit,\nmaintenant et toujours et dans les siècles des siècles. Amen.',
      cs: 'Отче нашъ, Иже еси на небесѣхъ,\nда святится имя Твое,\nда пріидетъ Царствіе Твое,\nда будетъ воля Твоя,\nяко на небеси и на земли.\nХлѣбъ нашъ насущный даждь намъ днесь;\nи остави намъ долги наша,\nякоже и мы оставляемъ должникомъ нашымъ;\nи не введи насъ во искушеніе,\nно избави насъ отъ лукаваго.\nЯко Твое есть Царство и сила и слава,\nОтца и Сына и Святаго Духа,\nнынѣ и присно и во вѣки вѣкомъ. Аминь.',
      note: 'Donnée par le Christ lui-même (Mt 6:9-13 ; Lc 11:2-4). Chantée par toute l’assemblée à chaque Liturgie, juste avant la communion.',
      inter: [
        ['Отче', 'Otché', 'Père (vocatif)'], ['нашъ', 'nach', 'notre'], ['Иже', 'Iji', 'qui'], ['еси', 'yéssi', 'es'], ['на', 'na', 'dans'], ['небесѣхъ', 'nébéssékh', 'les cieux'],
        ['да святится', 'da sviatitsia', 'que soit sanctifié'], ['имя', 'imia', 'nom'], ['Твое', 'Tvoyé', 'ton'],
        ['да пріидетъ', 'da priidiot', 'que vienne'], ['Царствіе', 'Tsarstvié', 'royaume'], ['Твое', 'Tvoyé', 'ton'],
        ['да будетъ', 'da boudiot', 'que soit (fait)'], ['воля', 'volia', 'volonté'], ['Твоя', 'Tvoya', 'ta'],
        ['яко', 'yako', 'comme'], ['на небеси', 'na nébéssi', 'au ciel'], ['и на земли', 'i na zémli', 'et sur la terre'],
        ['Хлѣбъ', 'Khlèb', 'pain'], ['нашъ', 'nach', 'notre'], ['насущный', 'nassouchtchny', 'quotidien, de subsistance'], ['даждь', 'dajd', 'donne !'], ['намъ', 'nam', 'à nous'], ['днесь', 'dniéss', 'aujourd’hui'],
        ['и остави', 'i ostavi', 'et pardonne'], ['намъ', 'nam', 'à nous'], ['долги', 'dolgui', 'dettes'], ['наша', 'nacha', 'nos'],
        ['якоже', 'yakoje', 'comme'], ['и мы', 'i my', 'nous aussi'], ['оставляемъ', 'ostavliaïom', 'nous pardonnons'], ['должникомъ', 'doljnikom', 'aux débiteurs'], ['нашымъ', 'nachym', 'nos'],
        ['и не введи', 'i né vvédi', 'et ne conduis pas'], ['насъ', 'nass', 'nous'], ['во искушеніе', 'vo iskouchénié', 'dans la tentation'],
        ['но', 'no', 'mais'], ['избави', 'izbavi', 'délivre'], ['насъ', 'nass', 'nous'], ['отъ лукаваго', 'ot loukavago', 'du Mauvais']
      ]
    },
    {
      id: 'trisagion', title: 'Trisagion (Trois fois saint)', titleCs: 'Трисвятое', cat: 'Prières de base', when: 'Début des offices, Liturgie, prières quotidiennes',
      fr: 'Dieu saint, Saint Fort, Saint Immortel,\naie pitié de nous.',
      cs: 'Святый Боже, Святый Крѣпкій, Святый Безсмертный,\nпомилуй насъ.',
      note: 'Hymne très ancienne, déjà chantée au concile de Chalcédoine (451) ; on la répète trois fois, en se signant, avec une inclination.',
      inter: [
        ['Святый', 'Sviatyï', 'Saint'], ['Боже', 'Boje', 'Dieu (vocatif)'], ['Святый', 'Sviatyï', 'Saint'], ['Крѣпкій', 'Krépkiï', 'Fort'], ['Святый', 'Sviatyï', 'Saint'], ['Безсмертный', 'Bezsmertny', 'Immortel'],
        ['помилуй', 'pomilouï', 'aie pitié'], ['насъ', 'nass', 'de nous']
      ]
    },
    {
      id: 'jesus', title: 'Prière de Jésus', titleCs: 'Іисусова молитва', cat: 'Prières de base', when: 'À tout moment, surtout avec le chapelet (tchotki)',
      fr: 'Seigneur Jésus-Christ, Fils de Dieu,\naie pitié de moi, pécheur.',
      cs: 'Господи Іисусе Христе, Сыне Божій,\nпомилуй мя грѣшнаго.',
      note: 'Cœur de la prière hésychaste. Elle réunit la confession de foi (Jésus est le Christ, Fils de Dieu) et la demande de miséricorde. Elle se répète au rythme de la respiration.',
      inter: [
        ['Господи', 'Gospodi', 'Seigneur (vocatif)'], ['Іисусе', 'Iissoussé', 'Jésus (vocatif)'], ['Христе', 'Khristé', 'Christ (vocatif)'], ['Сыне', 'Syné', 'Fils (vocatif)'], ['Божій', 'Bojiï', 'de Dieu'],
        ['помилуй', 'pomilouï', 'aie pitié'], ['мя', 'mia', 'de moi'], ['грѣшнаго', 'gréchnago', 'pécheur']
      ]
    },
    {
      id: 'roi-celeste', title: 'Roi céleste', titleCs: 'Царю небесный', cat: 'Prières de base', when: 'Début de toute prière ; invocation de l’Esprit Saint',
      fr: 'Roi céleste, Consolateur, Esprit de vérité,\ntoi qui es partout présent et qui remplis tout,\ntrésor de biens et dispensateur de vie,\nviens et demeure en nous,\npurifie-nous de toute souillure,\net sauve nos âmes, toi qui es bon.',
      cs: 'Царю небесный, Утѣшителю, Душе истины,\nИже вездѣ сый и вся исполняй,\nсокровище благихъ и жизни подателю,\nпріиди и вселися въ ны,\nи очисти ны отъ всякия скверны,\nи спаси, Блаже, души наша.',
      note: 'Première prière de toute journée orthodoxe. À la Pentecôte, on la chante pour la première fois depuis Pâques.',
      inter: [
        ['Царю', 'Tsarïou', 'Roi (vocatif)'], ['небесный', 'nébessny', 'céleste'], ['Утѣшителю', 'Outéchitéliou', 'Consolateur'], ['Душе', 'Douché', 'Esprit (vocatif)'], ['истины', 'istiny', 'de vérité'],
        ['Иже', 'Iji', 'qui'], ['вездѣ', 'vezdé', 'partout'], ['сый', 'sy', 'étant'], ['и', 'i', 'et'], ['вся', 'vsia', 'toutes choses'], ['исполняй', 'ispolniaï', 'remplissant'],
        ['сокровище', 'sokrovichtché', 'trésor'], ['благихъ', 'blagikh', 'des biens'], ['и', 'i', 'et'], ['жизни', 'jizni', 'de la vie'], ['подателю', 'podatéliou', 'dispensateur'],
        ['пріиди', 'priidi', 'viens'], ['и вселися', 'i vsélissia', 'et demeure'], ['въ ны', 'v ny', 'en nous'],
        ['и очисти', 'i otchisti', 'et purifie'], ['ны', 'ny', 'nous'], ['отъ всякия', 'ot vsiakiïa', 'de toute'], ['скверны', 'skvèrny', 'souillure'],
        ['и спаси', 'i spassi', 'et sauve'], ['Блаже', 'Blajé', 'Bon (vocatif)'], ['души', 'douchi', 'âmes'], ['наша', 'nacha', 'nos']
      ]
    },
    {
      id: 'bogoroditse', title: 'Salutation à la Mère de Dieu', titleCs: 'Богородице Дѣво', cat: 'Prières à la Mère de Dieu', when: 'Vêpres, Complies, prières du soir',
      fr: 'Mère de Dieu et Vierge, réjouis-toi, pleine de grâce, Marie, le Seigneur est avec toi ;\ntu es bénie entre les femmes,\net le fruit de ton sein est béni,\ncar tu as enfanté le Sauveur de nos âmes.',
      cs: 'Богородице Дѣво, радуйся, благодатная Маріе, Господь съ Тобою:\nблагословена Ты въ женахъ,\nи благословенъ плодъ чрева Твоего,\nяко Спаса родила еси душъ нашихъ.',
      note: 'Combine la salutation de l’ange Gabriel (Lc 1:28) et celle d’Élisabeth (Lc 1:42), puis une confession de foi : Marie a enfanté le Sauveur.',
      inter: [
        ['Богородице', 'Bogoroditsé', 'Mère de Dieu (vocatif)'], ['Дѣво', 'Dévo', 'Vierge (vocatif)'], ['радуйся', 'radouïssia', 'réjouis-toi'], ['благодатная', 'blagodatnaïa', 'pleine de grâce'], ['Маріе', 'Mariyé', 'Marie (vocatif)'],
        ['Господь', 'Gospod', 'le Seigneur'], ['съ', 's', 'avec'], ['Тобою', 'Toboïou', 'toi'],
        ['благословена', 'blagoslovéna', 'bénie'], ['Ты', 'Ty', 'toi'], ['въ женахъ', 'v jénakh', 'parmi les femmes'],
        ['и благословенъ', 'i blagoslovén', 'et béni'], ['плодъ', 'plod', 'fruit'], ['чрева', 'tchrèva', 'du sein'], ['Твоего', 'Tvoyégo', 'ton'],
        ['яко', 'yako', 'car'], ['Спаса', 'Spassa', 'Sauveur'], ['родила еси', 'rodila yéssi', 'tu as enfanté'], ['душъ', 'douch', 'des âmes'], ['нашихъ', 'nachikh', 'nos']
      ]
    },
    {
      id: 'doxologie', title: 'Doxologie trinitaire', titleCs: 'Слава Отцу и Сыну', cat: 'Prières de base', when: 'Fin des psaumes et des prières',
      fr: 'Gloire au Père, et au Fils, et au Saint-Esprit,\net maintenant et toujours et dans les siècles des siècles. Amen.',
      cs: 'Слава Отцу и Сыну и Святому Духу,\nи нынѣ и присно и во вѣки вѣкомъ. Аминь.',
      note: 'Formule de louange qui conclut presque toutes les prières. « Во вѣки вѣкомъ » est littéralement « dans les siècles des siècles ».',
      inter: [
        ['Слава', 'Slava', 'gloire'], ['Отцу', 'Otstsou', 'au Père'], ['и Сыну', 'i Synou', 'et au Fils'], ['и Святому', 'i Sviatomou', 'et au Saint'], ['Духу', 'Doukhou', 'Esprit'],
        ['и нынѣ', 'i nyné', 'et maintenant'], ['и присно', 'i prissno', 'et toujours'], ['и во вѣки', 'i vo véki', 'et dans les siècles'], ['вѣкомъ', 'vékom', 'des siècles'], ['Аминь', 'Aminn', 'amen']
      ]
    },
    {
      id: 'paques-tropaire', title: 'Tropaire de Pâques', titleCs: 'Христосъ воскресе', cat: 'Chants de fête', when: 'De Pâques à l’Ascension, au début de chaque office',
      fr: 'Christ est ressuscité des morts,\npar la mort il a vaincu la mort,\net à ceux qui gisent dans les tombeaux\nil a donné la vie.',
      cs: 'Христосъ воскресе изъ мертвыхъ,\nсмертію смерть поправъ,\nи сущымъ во гробѣхъ\nживотъ даровавъ.',
      note: 'Le plus beau chant de l’Église, répété des dizaines de fois pendant la nuit pascale. « Воскресе » est un aoriste : un acte accompli une fois pour toutes.',
      inter: [
        ['Христосъ', 'Khristos', 'Christ'], ['воскресе', 'voskrèssé', 'est ressuscité'], ['изъ', 'iz', 'd’entre'], ['мертвыхъ', 'mertvykh', 'les morts'],
        ['смертію', 'smertiïou', 'par la mort'], ['смерть', 'smert', 'la mort'], ['поправъ', 'poprav', 'ayant foulé aux pieds'],
        ['и', 'i', 'et'], ['сущымъ', 'souchtchym', 'à ceux qui sont'], ['во', 'vo', 'dans'], ['гробѣхъ', 'grobékh', 'les tombeaux'],
        ['животъ', 'jivot', 'la vie'], ['даровавъ', 'darovav', 'ayant donné']
      ]
    },
    {
      id: 'symbole', title: 'Symbole de Nicée-Constantinople', titleCs: 'Символъ вѣры', cat: 'Prières de base', when: 'Liturgie, prières du matin',
      fr: 'Je crois en un seul Dieu, le Père tout-puissant, créateur du ciel et de la terre, de toutes les choses visibles et invisibles.\nEt en un seul Seigneur Jésus-Christ, le Fils de Dieu, l’Unique-Engendré, né du Père avant tous les siècles ;\nLumière née de la Lumière, vrai Dieu né du vrai Dieu, engendré, non créé, consubstantiel au Père, par qui tout a été fait.\nPour nous les hommes et pour notre salut, il est descendu des cieux, il s’est incarné du Saint-Esprit et de la Vierge Marie, et s’est fait homme.\nIl a été crucifié pour nous sous Ponce Pilate, il a souffert et a été enseveli.\nIl est ressuscité le troisième jour, selon les Écritures.\nIl est monté aux cieux, il siège à la droite du Père.\nIl reviendra dans la gloire pour juger les vivants et les morts, et son règne n’aura pas de fin.\nEt en l’Esprit Saint, Seigneur et Vivificateur, qui procède du Père, qui avec le Père et le Fils est adoré et glorifié, qui a parlé par les prophètes.\nEn une seule Église, sainte, catholique et apostolique.\nJe confesse un seul baptême pour la rémission des péchés.\nJ’attends la résurrection des morts et la vie du siècle à venir. Amen.',
      cs: 'Вѣрую во единаго Бога Отца, Вседержителя, Творца небу и земли, видимымъ же всѣмъ и невидимымъ.\nИ во единаго Господа Іисуса Христа, Сына Божія, Единороднаго, Иже отъ Отца рожденнаго прежде всѣхъ вѣкъ;\nСвѣта отъ Свѣта, Бога истинна отъ Бога истинна, рожденна, несотворенна, единосущна Отцу, Имже вся быша.\nНасъ ради человѣкъ и нашего ради спасенія сшедшаго съ небесъ, и воплотившагося отъ Духа Свята и Маріи Дѣвы, и вочеловѣчшася.\nРаспятаго же за ны при Понтійстѣмъ Пилатѣ, и страдавша, и погребенна.\nИ воскресшаго въ третій день по Писаніемъ.\nИ восшедшаго на небеса, и сѣдяща одесную Отца.\nИ паки грядущаго со славою судити живымъ и мертвымъ, Егоже Царствію не будетъ конца.\nИ въ Духа Святаго, Господа, Животворящаго, Иже отъ Отца исходящаго, Иже со Отцемъ и Сыномъ спокланяема и сславима, глаголавшаго пророки.\nВо единую Святую, Соборную и Апостольскую Церковь.\nИсповѣдую едино крещеніе во оставленіе грѣховъ.\nЧаю воскресенія мертвыхъ, и жизни будущаго вѣка. Аминь.',
      note: 'Formulé aux conciles de Nicée (325) et de Constantinople (381). L’Église orthodoxe le confesse sans le « filioque » ajouté ultérieurement par l’Occident.'
    },
    {
      id: 'ephrem', title: 'Prière de saint Éphrem le Syrien', titleCs: 'Молитва святаго Ефрема Сирина', cat: 'Carême', when: 'Tous les jours du Grand Carême, avec des prosternations',
      fr: 'Seigneur et Maître de ma vie,\nécarte de moi l’esprit de paresse, de découragement, de domination et de bavardage.\nAccorde plutôt à ton serviteur l’esprit d’intégrité, d’humilité, de patience et d’amour.\nOui, Seigneur Roi, donne-moi de voir mes fautes\net de ne pas juger mon frère,\ncar tu es béni dans les siècles des siècles. Amen.',
      cs: 'Господи и Владыко живота моего,\nдухъ праздности, уныния, любоначалія и празднословія не даждь ми.\nДухъ же цѣломудрія, смиреномудрія, терпѣнія и любве даруй ми, рабу Твоему.\nЕй, Господи Царю, даждь ми зрѣти моя прегрѣшенія,\nи не осуждати брата моего,\nяко благословенъ еси во вѣки вѣковъ. Аминь.',
      note: 'La prière du Carême par excellence : trois vices sont écartés, quatre vertus demandées, et une double demande : voir ses propres fautes, ne pas juger autrui.'
    },
    {
      id: 'phos-hilaron', title: 'Lumière joyeuse (Phos hilaron)', titleCs: 'Свѣте тихій', cat: 'Chants de fête', when: 'Vêpres (le soir)',
      fr: 'Lumière joyeuse de la sainte gloire du Père immortel, céleste, saint et bienheureux, Jésus-Christ,\nétant arrivés au coucher du soleil et voyant la lumière du soir, nous chantons le Père, le Fils et le Saint-Esprit, Dieu.\nIl est digne qu’en tout temps tu sois chanté par des voix saintes, Fils de Dieu, qui donnes la vie ;\nc’est pourquoi le monde te glorifie.',
      cs: 'Свѣте тихій святыя славы безсмертнаго Отца небеснаго, святаго блаженнаго, Іисусе Христе:\nпришедше на запады солнца, видѣвше свѣтъ вечерній, поемъ Отца, Сына и Святаго Духа, Бога.\nДостоинъ еси во вся времена пѣтъ быти гласы преподобными, Сыне Божій, животъ даяй:\nтѣмже міръ Тя славитъ.',
      note: 'L’un des plus anciens hymnes chrétiens, encore chanté à chaque office du soir depuis le IIIe siècle.'
    },
    {
      id: 'dostoino', title: 'Il est digne', titleCs: 'Достойно есть', cat: 'Prières à la Mère de Dieu', when: 'Liturgie (après la consécration), Orthros',
      fr: 'Il est digne vraiment de te proclamer bienheureuse, Mère de Dieu,\ntoujours bienheureuse et toute pure, et Mère de notre Dieu.\nPlus vénérable que les chérubins et incomparablement plus glorieuse que les séraphins,\ntoi qui, sans corruption, as enfanté Dieu le Verbe,\nvraie Mère de Dieu, nous te magnifions.',
      cs: 'Достойно есть яко воистину блажити Тя, Богородицу,\nПрисноблаженную и Пренепорочную и Матерь Бога нашего.\nЧестнѣйшую херувимъ и славнѣйшую без сравненія серафимъ,\nбез истлѣнія Бога Слова рождшую,\nсущую Богородицу Тя величаемъ.',
      note: 'Le « Mégalynaire » de la Mère de Dieu, chanté à la Liturgie après la consécration des Saints Dons.'
    },
    {
      id: 'repas', title: 'Bénédiction du repas', titleCs: 'Очи всѣхъ на Тя, Господи, уповаютъ', cat: 'Prières de base', when: 'Avant chaque repas',
      fr: 'Les yeux de tous espèrent en toi, Seigneur,\net toi, tu leur donnes la nourriture en son temps ;\ntu ouvres ta main généreuse\net tu rassasies tout vivant de ta bienveillance.',
      cs: 'Очи всѣхъ на Тя, Господи, уповаютъ,\nи Ты даеши имъ пищу во благовременіи,\nотверзаеши Ты щедрую руку Твою\nи исполняеши всяко животно благоволенія.',
      note: 'Prière avant le repas, tirée du Psaume 144:15-16, suivie du Notre Père et de la bénédiction des mets.'
    },
    {
      id: 'venez-adorons', title: 'Venez, adorons', titleCs: 'Приидите, поклонимся', cat: 'Prières de base', when: 'Début des offices',
      fr: 'Venez, adorons notre Dieu Roi.\nVenez, adorons et prosternons-nous devant le Christ, notre Dieu Roi.\nVenez, adorons et prosternons-nous devant le Christ lui-même, notre Roi et notre Dieu.',
      cs: 'Приидите, поклонимся Цареви нашему Богу.\nПриидите, поклонимся и припадемъ Христу, Цареви нашему Богу.\nПриидите, поклонимся и припадемъ самому Христу, Цареви и Богу нашему.',
      note: 'L’invitatoire chanté trois fois au début des offices, avec trois inclinations : invitation à la prière commune.'
    }
  ];
})();
