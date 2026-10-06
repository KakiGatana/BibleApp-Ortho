/* Apprendre le slavon d’Église : alphabet, leçons, vocabulaire. */
(function () {
  const O = (window.ORTHO = window.ORTHO || {});
  const T = '҃'; // titlo

  /* [majuscule, minuscule, nom slavon, transcription du nom, son (approx. française), valeur numérique, remarque] */
  O.ALPHABET = [
    ['А', 'а', 'аз', 'az', 'a', 1, 'Comme « a » dans papa. « Аз » veut aussi dire « je ».'],
    ['Б', 'б', 'буки', 'bouki', 'b', null, 'Comme « b ». Le nom signifie « lettres ».'],
    ['В', 'в', 'вѣди', 'védi', 'v', 2, '« Вѣди » : « je sais ».'],
    ['Г', 'г', 'глаголь', 'glagol', 'g', 3, 'Toujours un « g » dur (gare). « Глаголь » : « parole ».'],
    ['Д', 'д', 'добро', 'dobro', 'd', 4, '« Добро » : « bien ».'],
    ['Е', 'е', 'есть', 'yest', 'é / yé', 5, 'Se lit « yé » en début de mot ou après une voyelle ; « é » après une consonne. « Есть » : « il y a, est ».'],
    ['Ж', 'ж', 'живѣте', 'jivété', 'j', null, 'Comme « j » dans jour. « Живѣте » : « vivez ».'],
    ['Ѕ', 'ѕ', 'зѣло', 'zélo', 'dz', 6, 'Rare. Surtout pour le chiffre 6. « Зѣло » : « très ».'],
    ['З', 'з', 'земля', 'zemlia', 'z', 7, '« Земля » : « terre ».'],
    ['И', 'и', 'иже', 'iji', 'i', 8, 'Comme « i ». « Иже » : « qui ».'],
    ['І', 'і', 'и десятеричное', 'i dessiatérichnoïé', 'i', 10, 'Même son que И. Utilisé devant voyelle (Маріа, Іисусъ) ; vaut 10.'],
    ['К', 'к', 'како', 'kako', 'k', 20, '« Како » : « comment ».'],
    ['Л', 'л', 'людіе', 'lioudié', 'l', 30, '« Людіе » : « les gens ».'],
    ['М', 'м', 'мыслѣте', 'mysslété', 'm', 40, '« Мыслѣте » : « pensez ».'],
    ['Н', 'н', 'нашъ', 'nach', 'n', 50, '« Нашъ » : « notre ».'],
    ['О', 'о', 'онъ', 'on', 'o', 70, 'Toujours « o » plein, même sans accent (pas de réduction en « a » comme dans le russe parlé).'],
    ['П', 'п', 'покой', 'pokoï', 'p', 80, '« Покой » : « repos ».'],
    ['Р', 'р', 'рцы', 'rtsy', 'r', 100, 'R roulé. « Рцы » : « dis ! ».'],
    ['С', 'с', 'слово', 'slovo', 's', 200, 'Toujours « s » (jamais « z »). « Слово » : « parole ».'],
    ['Т', 'т', 'твердо', 'tvyordo', 't', 300, '« Твердо » : « fermement ».'],
    ['У', 'у', 'укъ', 'ouk', 'ou', 400, 'Comme « ou » dans loup. Se trouve aussi sous la forme Ꙋ ꙋ.'],
    ['Ф', 'ф', 'фертъ', 'fert', 'f', 500, 'Comme « f ». Dans les mots d’origine grecque.'],
    ['Х', 'х', 'хѣръ', 'kher', 'kh', 600, 'Comme « j » espagnol ou « ch » allemand.'],
    ['Ѡ', 'ѡ', 'омега', 'omega', 'o', 800, 'Même son que О. Utilisé dans des mots grecs et à l’initiale de certaines prépositions.'],
    ['Ц', 'ц', 'цы', 'tsy', 'ts', 900, 'Comme « ts » dans tsé-tsé.'],
    ['Ч', 'ч', 'червь', 'tcherv', 'tch', 90, 'Comme « tch » dans tchèque.'],
    ['Ш', 'ш', 'ша', 'cha', 'ch', null, 'Comme « ch » dans chat.'],
    ['Щ', 'щ', 'ща', 'chtcha', 'chtch', null, 'Un « ch » suivi d’un « tch » : « chtch ».'],
    ['Ъ', 'ъ', 'еръ', 'yer', '—', null, 'Signe dur : à la fin d’un mot, il ne se prononce pas ; il rappelle une ancienne voyelle brève.'],
    ['Ы', 'ы', 'еры', 'yery', 'y', null, 'Voyelle russe entre « i » et « ou ». Comme dans « мы » (nous).'],
    ['Ь', 'ь', 'ерь', 'yer’', '—', null, 'Signe mou : adoucit la consonne précédente ; il ne se prononce pas.'],
    ['Ѣ', 'ѣ', 'ять', 'yat', 'é', null, 'Se prononce comme Е. Trace d’une ancienne voyelle ; il faut la mémoriser mot par mot.'],
    ['Ю', 'ю', 'ю', 'you', 'you', null, 'Comme « you » dans youpi.'],
    ['Я', 'я', 'я', 'ya', 'ya', null, 'Comme « ya » dans yaourt. Dans les livres liturgiques, on le voit aussi sous la forme Ѧ ѧ.'],
    ['Ѧ', 'ѧ', 'юсъ малый', 'yous maly', 'ya', null, 'Ancienne nasale, aujourd’hui prononcée « ya ».'],
    ['Ѯ', 'ѯ', 'кси', 'ksi', 'ks', 60, 'Lettre d’origine grecque : « ks ».'],
    ['Ѱ', 'ѱ', 'пси', 'psi', 'ps', 700, 'Lettre d’origine grecque : « ps ».'],
    ['Ѳ', 'ѳ', 'фита', 'fita', 'f', 9, 'Même son que Ф ; vient du grec thêta (θ) dans Ѳома (Thomas), Ѳеодоръ.'],
    ['Ѵ', 'ѵ', 'ижица', 'ijitsa', 'i', null, 'Même son que И ; dans Мѵро (myrrhe), Сѵмеонъ (Syméon).']
  ];

  /* Leçons. Blocs : h (sous-titre), p (paragraphe html), tip (encadré), table {head, rows}, ex [[cs, translit, fr], …] */
  O.LESSONS = [
    {
      id: 'histoire', title: 'D’où vient le slavon ?', sub: 'Cyrille, Méthode et la langue de la liturgie', time: '5 min',
      blocks: [
        { p: 'Le <b>slavon d’Église</b> (church slavonic) est la langue liturgique de nombreuses Églises orthodoxes slaves : russe, serbe, bulgare, ukrainienne, biélorusse, macédonienne, tchèque… Ce n’est pas du russe : c’est une langue ancienne, standardisée au IXe siècle, qui sert uniquement au culte.' },
        { h: 'Cyrille et Méthode' },
        { p: 'Vers 863, les frères <b>Constantin (devenu Cyrille)</b> et <b>Méthode</b>, originaires de Thessalonique, partent évangéliser la Grande-Moravie. Pour traduire les Écritures et la liturgie, Cyrille invente un alphabet — le <b>glagolitique</b> — adapté aux sons slaves. Leurs disciples, accueillis en Bulgarie, mettront ensuite au point l’alphabet <b>cyrillique</b>, dérivé du grec, que nous apprenons ici.' },
        { tip: 'Le slavon est donc à la fois une langue <i>sacrée</i> (comme le latin pour l’Église catholique d’autrefois) et une langue <i>vivante</i> : il a évolué avec chaque peuple, avec des « recensions » russe, serbe, bulgare…' },
        { h: 'Pourquoi l’apprendre ?' },
        { p: 'Parce qu’on entend la liturgie dans la langue que les saints russes ont priée pendant plus de mille ans ; parce que chaque mot est une icône sonore ; et parce que les textes sont très proches du grec de la Septante et du Nouveau Testament. Certains mots comme <b>Господи, помилуй</b> sont connus de tous les fidèles, quelle que soit leur langue maternelle.' }
      ]
    },
    {
      id: 'lecture', title: 'Lire le slavon', sub: 'Prononciation liturgique et règles de lecture', time: '8 min',
      blocks: [
        { p: 'La lecture liturgique russe suit la <b>prononciation du russe sans réduction vocalique</b> : on dit « o » partout où l’on lit о, « e » partout où l’on lit е. Ce n’est pas le russe parlé (où « молоко » se dit « malakó »).' },
        { table: { head: ['Lettre', 'Son', 'Exemple', 'Prononciation'], rows: [
          ['е', 'é (yé en début)', 'Господь есть', 'Gospod yest'],
          ['ѣ', 'é', 'нѣсть', 'nést'],
          ['и / і / ѵ', 'i', 'Іисусъ', 'Iissous'],
          ['о / ѡ', 'o', 'Богъ', 'Bog'],
          ['ъ / ь', 'muet', 'Господь', 'Gospod’'],
          ['щ', 'chtch', 'щедроты', 'chtchedroty'],
          ['г', 'g (parfois v dans « -аго »)', 'Святаго', 'Sviatago']
        ] } },
        { tip: 'Astuce : l’accent tonique n’est pas toujours marqué dans les textes imprimés. Dans les livres liturgiques, il l’est : <b>Госпо́дь</b>, <b>Іису́съ</b>, <b>Богоро́дица</b>.' },
        { h: 'Le signe titlo' },
        { p: 'Les <b>titlo</b> (petit trait au-dessus d’un mot) abrègent les mots sacrés : <b>Бг' + T + 'ъ</b> = Богъ, <b>Гд' + T + 'ь</b> = Господь, <b>Іс' + T + 'ъ</b> = Іисусъ, <b>Хс' + T + 'ъ</b> = Христосъ, <b>Дх' + T + 'ъ</b> = Духъ, <b>Бц' + T + 'а</b> = Богородица. On les appelle les <i>nomina sacra</i> et on les retrouve dès les premiers manuscrits grecs.' },
        { h: 'Ъ et ь' },
        { p: 'Les « jers » étaient autrefois des voyelles très brèves. Aujourd’hui, <b>ъ</b> en fin de mot est muet (il marque seulement que la consonne est dure) et <b>ь</b> marque l’adoucissement.' }
      ]
    },
    {
      id: 'noms', title: 'Les noms et les cas', sub: 'Sept cas, trois genres', time: '10 min',
      blocks: [
        { p: 'Le slavon décline les noms en <b>sept cas</b> : nominatif (sujet), génitif (« de »), datif (« à »), accusatif (complément direct), instrumental (« avec, par »), locatif (« dans, à propos de »), et <b>vocatif</b> (pour appeler). Le vocatif est partout dans la prière : <b>Господи !</b> <b>Боже !</b> <b>Дѣво !</b>' },
        { table: { head: ['Cas', 'Богъ (m.)', 'слово (n.)', 'дѣва (f.)'], rows: [
          ['Nominatif', 'Богъ', 'слово', 'дѣва'],
          ['Génitif', 'Бога', 'слова', 'дѣвы'],
          ['Datif', 'Богу', 'слову', 'дѣвѣ'],
          ['Accusatif', 'Бога', 'слово', 'дѣву'],
          ['Instrumental', 'Богомъ', 'словомъ', 'дѣвою'],
          ['Locatif', 'Бозѣ', 'словѣ', 'дѣвѣ'],
          ['Vocatif', 'Боже', 'слово', 'дѣво']
        ] } },
        { h: 'À repérer dans les prières' },
        { ex: [
          ['Господи, помилуй', 'Gospodi, pomilouï', 'Seigneur (vocatif), aie pitié'],
          ['Слава Отцу и Сыну', 'Slava Otstsou i Synou', 'Gloire au Père (datif) et au Fils (datif)'],
          ['Царствіе Твое', 'Tsarstvié Tvoyé', 'ton Royaume (nominatif)'],
          ['въ вѣки вѣкомъ', 'v véki vékom', 'dans les siècles des siècles (accusatif pl. + datif)']
        ] },
        { tip: 'La finale <b>-е / -и</b> en fin d’invocation est souvent un vocatif : <b>Отче</b> (Père !), <b>Боже</b> (Dieu !), <b>Іисусе</b> (Jésus !), <b>Господи</b> (Seigneur !), <b>Владыко</b> (Maître !).' }
      ]
    },
    {
      id: 'verbes', title: 'Les verbes : présent, aoriste, impératif', sub: 'Pourquoi « Христосъ воскресе » ?', time: '10 min',
      blocks: [
        { p: 'Le slavon a plusieurs temps du passé. Le plus important pour la liturgie est l’<b>aoriste</b> : un fait accompli, ponctuel, surtout employé pour les actions de l’histoire du salut.' },
        { ex: [
          ['Христосъ воскресе', 'Khristos voskrèssé', 'le Christ est ressuscité (aoriste)'],
          ['Слово плоть бысть', 'Slovo plot’ bysst’', 'le Verbe s’est fait chair'],
          ['рече Богъ', 'retché Bog', 'Dieu dit']
        ] },
        { h: 'Être : быти' },
        { table: { head: ['Pers.', 'Présent', 'Aoriste'], rows: [
          ['je', 'есмь', 'бѣхъ'],
          ['tu', 'еси', 'бѣ'],
          ['il', 'есть', 'бѣ'],
          ['nous', 'есмы', 'бѣхомъ'],
          ['vous', 'есте', 'бѣсте'],
          ['ils', 'суть', 'бѣша']
        ] } },
        { h: 'L’impératif et le jussif' },
        { p: 'L’impératif sert à la prière : <b>помилуй</b> (aie pitié), <b>спаси</b> (sauve), <b>даждь</b> (donne), <b>прости</b> (pardonne), <b>избави</b> (délivre). Le jussif — <b>да</b> + 3e personne — exprime un souhait : <b>да святится имя Твое</b> (que ton nom soit sanctifié), <b>да будетъ воля Твоя</b> (que ta volonté soit faite).' },
        { h: 'Les participes' },
        { p: 'Le slavon aime les participes : <b>поправъ</b> (ayant foulé aux pieds), <b>даровавъ</b> (ayant donné), <b>грядый</b> (celui qui vient, « Благословенъ грядый во имя Господне »), <b>сый</b> (étant, celui qui est).' },
        { tip: 'Pour comprendre le Tropaire pascal : <b>смертію смерть поправъ</b> = « par la mort — la mort — ayant foulé aux pieds » : la mort est vaincue <i>par</i> la mort.' }
      ]
    },
    {
      id: 'pronoms', title: 'Pronoms, adjectifs et mots-outils', sub: 'Les petits mots qui comptent', time: '7 min',
      blocks: [
        { table: { head: ['Slavon', 'Sens', 'Slavon', 'Sens'], rows: [
          ['азъ', 'je', 'мы', 'nous'],
          ['ты', 'tu', 'вы', 'vous'],
          ['онъ / она / оно', 'il / elle / cela', 'они', 'ils'],
          ['сей / сия / сіе', 'celui-ci', 'той / та / то', 'celui-là'],
          ['иже / яже / еже', 'qui, celui qui', 'кто / что', 'qui ? / quoi ?']
        ] } },
        { h: 'Petits mots à connaître' },
        { ex: [
          ['и', 'i', 'et'], ['но', 'no', 'mais'], ['яко', 'yako', 'car, comme, que'], ['да', 'da', 'que (jussif), afin que'],
          ['нѣсть', 'nést', 'n’est pas, il n’y a pas'], ['ей', 'éï', 'oui'], ['паки', 'paki', 'de nouveau'], ['зѣло', 'zélo', 'très'], ['днесь', 'dnéss', 'aujourd’hui']
        ] },
        { tip: '<b>Иже</b> (« qui ») introduit une proposition : « <b>Отче нашъ, Иже еси на небесѣхъ</b> » = « Notre Père, qui es aux cieux ». Il se retrouve aussi dans « <b>Иже херувимы</b> » (Hymne des Chérubins).' }
      ]
    },
    {
      id: 'nombres', title: 'Les nombres', sub: 'Lettres-chiffres avec titlo', time: '5 min',
      blocks: [
        { p: 'Le slavon note les nombres avec des <b>lettres surmontées d’un titlo</b>, comme les Grecs : a = 1, в = 2, г = 3… Ainsi, « le troisième jour » (<b>въ третій день</b>) est souvent noté <b>г' + T + '</b> dans les manuscrits.' },
        { table: { head: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], rows: [['а' + T, 'в' + T, 'г' + T, 'д' + T, 'є' + T, 'ѕ' + T, 'з' + T, 'и' + T, 'ѳ' + T, 'і' + T]] } },
        { table: { head: ['20', '30', '40', '50', '60', '70', '80', '90', '100', '200'], rows: [['к' + T, 'л' + T, 'м' + T, 'н' + T, 'ѯ' + T, 'о' + T, 'п' + T, 'ч' + T, 'р' + T, 'с' + T]] } },
        { tip: 'Pour 11 à 19, on écrit l’unité <i>avant</i> la dizaine : 11 = <b>а' + T + 'і</b>, 12 = <b>в' + T + 'і</b>…' },
        { p: 'On voit encore ces chiffres en tête des psaumes dans le Psautier (« Псалом г' + T + ' » = Psaume 3) et dans les années liturgiques (calcul « depuis la création du monde » : 7535 en 2026).' }
      ]
    },
    {
      id: 'faux-amis', title: 'Faux amis russes et mots-clés', sub: 'Ce que signifie vraiment…', time: '6 min',
      blocks: [
        { table: { head: ['Slavon', 'Russe moderne', 'Sens liturgique'], rows: [
          ['животъ', 'ventre', 'vie'],
          ['днесь', '—', 'aujourd’hui'],
          ['вѣкъ', 'siècle', 'éternité, siècle'],
          ['миръ / міръ', 'paix / monde', 'paix (миръ) ; monde (міръ)'],
          ['сердце', 'cœur', 'cœur (siège de toute la personne)'],
          ['чадо', 'enfant (poétique)', 'enfant, fils spirituel'],
          ['нынѣ', 'maintenant', 'maintenant'],
          ['паки', '—', 'de nouveau, encore']
        ] } },
        { tip: 'Avant 1918, le russe distinguait <b>миръ</b> (paix) de <b>міръ</b> (monde). Le slavon garde cette nuance : « Миръ всѣмъ » (La paix soit avec tous) ; « Христосъ воскресе, міръ просвѣщаетъ… ».' },
        { h: 'Dix mots pour entrer dans la liturgie' },
        { ex: [
          ['Господи, помилуй', 'Gospodi, pomilouï', 'Seigneur, aie pitié (Kyrie eleison)'],
          ['Подай, Господи', 'Podaï, Gospodi', 'Accorde-le, Seigneur'],
          ['Тебѣ, Господи', 'Tébé, Gospodi', 'À toi, Seigneur'],
          ['Миръ всѣмъ', 'Mir vsém', 'Paix à tous'],
          ['И духови твоему', 'I doukhovi tvoyémou', 'Et avec ton esprit'],
          ['Слава Тебѣ, Господи', 'Slava Tébé, Gospodi', 'Gloire à toi, Seigneur'],
          ['Премудрость, прости', 'Prémoudrost, prosti', 'La sagesse ! Debout !'],
          ['Христосъ посредѣ насъ', 'Khristos posredé nass', 'Le Christ est au milieu de nous'],
          ['Аллилуіа', 'Alliloujia', 'Louez Dieu'],
          ['Благословенъ Богъ нашъ', 'Blagoslovén Bog nach', 'Béni soit notre Dieu']
        ] }
      ]
    },
    {
      id: 'liturgie', title: 'Suivre la Liturgie en slavon', sub: 'Dialogues, ecténies et réponses du chœur', time: '8 min',
      blocks: [
        { p: 'À la Divine Liturgie, la majeure partie du texte est un <b>dialogue</b> : le diacre ou le prêtre chante des demandes, et le chœur répond par des formules brèves. Les connaître permet de participer pleinement.' },
        { ex: [
          ['Миромъ Господу помолимся', 'Mirom Gospodou pomolimssia', 'Prions le Seigneur en paix'],
          ['Господи, помилуй', 'Gospodi, pomilouï', 'Seigneur, aie pitié'],
          ['Подай, Господи', 'Podaï, Gospodi', 'Accorde, Seigneur'],
          ['Тебѣ, Господи', 'Tébé, Gospodi', 'À toi, Seigneur'],
          ['Премудрость', 'Prémoudrost', 'Sagesse !'],
          ['Святая святымъ', 'Sviataïa sviatym', 'Les choses saintes aux saints'],
          ['Единъ Святъ, единъ Господь Іисусъ Христосъ', 'Edin Sviat, edin Gospod Iissous Khristos', 'Un seul est saint, un seul Seigneur, Jésus-Christ'],
          ['Благословенъ грядый во имя Господне', 'Blagoslovén griadyï vo imia Gospodné', 'Béni celui qui vient au nom du Seigneur']
        ] },
        { tip: 'Pour s’entraîner : écoute un enregistrement de la Liturgie de saint Jean Chrysostome et suis le texte dans l’onglet « Prières ». Les réponses du chœur reviennent des dizaines de fois : c’est un excellent exercice de mémorisation.' }
      ]
    }
  ];

  /* Vocabulaire : [slavon, prononciation, sens, nature, thème] */
  O.VOCAB = [
    ['Богъ', 'Bog', 'Dieu', 'nom m.', 'Dieu'],
    ['Господь', 'Gospod', 'Seigneur', 'nom m.', 'Dieu'],
    ['Отецъ', 'Otéts', 'père', 'nom m.', 'Dieu'],
    ['Сынъ', 'Syn', 'fils', 'nom m.', 'Dieu'],
    ['Духъ', 'Doukh', 'esprit, souffle', 'nom m.', 'Dieu'],
    ['Святый', 'Sviatyï', 'saint', 'adj.', 'Dieu'],
    ['Троица', 'Troïtsa', 'Trinité', 'nom f.', 'Dieu'],
    ['Іисусъ', 'Iissous', 'Jésus', 'nom m.', 'Dieu'],
    ['Христосъ', 'Khristos', 'Christ (l’Oint)', 'nom m.', 'Dieu'],
    ['Спасъ', 'Spas', 'Sauveur', 'nom m.', 'Dieu'],
    ['Владыка', 'Vladyka', 'Maître, Souverain', 'nom m.', 'Dieu'],
    ['Царь', 'Tsar', 'roi', 'nom m.', 'Dieu'],
    ['Царство', 'Tsarstvo', 'royaume', 'nom n.', 'Dieu'],
    ['Слава', 'Slava', 'gloire', 'nom f.', 'Dieu'],
    ['благодать', 'blagodat', 'grâce', 'nom f.', 'Dieu'],
    ['милость', 'milost', 'miséricorde', 'nom f.', 'Dieu'],
    ['любовь', 'lioubov', 'amour', 'nom f.', 'Dieu'],
    ['истина', 'istina', 'vérité', 'nom f.', 'Dieu'],
    ['правда', 'pravda', 'justice', 'nom f.', 'Dieu'],
    ['свѣтъ', 'svét', 'lumière', 'nom m.', 'Dieu'],
    ['слово', 'slovo', 'parole, Verbe', 'nom n.', 'Dieu'],
    ['животъ', 'jivot', 'vie', 'nom m.', 'Dieu'],
    ['смерть', 'smert', 'mort', 'nom f.', 'Dieu'],
    ['воскресеніе', 'voskressénié', 'résurrection', 'nom n.', 'Dieu'],
    ['крестъ', 'krest', 'croix', 'nom m.', 'Dieu'],
    ['Богородица', 'Bogoroditsa', 'Mère de Dieu', 'nom f.', 'Dieu'],
    ['дѣва', 'déva', 'vierge', 'nom f.', 'Dieu'],
    ['мати', 'mati', 'mère', 'nom f.', 'Dieu'],
    ['ангелъ', 'anguel', 'ange', 'nom m.', 'Dieu'],
    ['Церковь', 'Tserkov', 'Église', 'nom f.', 'Église'],
    ['храмъ', 'khram', 'temple, église (bâtiment)', 'nom m.', 'Église'],
    ['олтарь', 'oltar', 'autel', 'nom m.', 'Église'],
    ['жертва', 'jertva', 'sacrifice, offrande', 'nom f.', 'Église'],
    ['хлѣбъ', 'khlèb', 'pain', 'nom m.', 'Église'],
    ['вино', 'vino', 'vin', 'nom n.', 'Église'],
    ['вода', 'voda', 'eau', 'nom f.', 'Église'],
    ['апостолъ', 'apostol', 'apôtre', 'nom m.', 'Église'],
    ['пророкъ', 'prorok', 'prophète', 'nom m.', 'Église'],
    ['священникъ', 'sviachtchennik', 'prêtre', 'nom m.', 'Église'],
    ['святитель', 'sviatitel', 'évêque, hiérarque', 'nom m.', 'Église'],
    ['мученикъ', 'mouchénik', 'martyr', 'nom m.', 'Église'],
    ['покаяніе', 'pokaïanié', 'repentir', 'nom n.', 'Église'],
    ['молитва', 'molitva', 'prière', 'nom f.', 'Église'],
    ['псаломъ', 'psalom', 'psaume', 'nom m.', 'Église'],
    ['Евангеліе', 'Evanguélié', 'Évangile', 'nom n.', 'Église'],
    ['Писаніе', 'Pissanié', 'Écriture', 'nom n.', 'Église'],
    ['грѣхъ', 'grékh', 'péché', 'nom m.', 'Homme'],
    ['душа', 'doucha', 'âme', 'nom f.', 'Homme'],
    ['сердце', 'serdtsé', 'cœur', 'nom n.', 'Homme'],
    ['плоть', 'plot', 'chair', 'nom f.', 'Homme'],
    ['тѣло', 'télo', 'corps', 'nom n.', 'Homme'],
    ['человѣкъ', 'tchelovék', 'être humain', 'nom m.', 'Homme'],
    ['имя', 'imia', 'nom', 'nom n.', 'Homme'],
    ['воля', 'volia', 'volonté', 'nom f.', 'Homme'],
    ['вѣра', 'véra', 'foi', 'nom f.', 'Homme'],
    ['надежда', 'nadéjda', 'espérance', 'nom f.', 'Homme'],
    ['радость', 'radost', 'joie', 'nom f.', 'Homme'],
    ['мудрость', 'moudrost', 'sagesse', 'nom f.', 'Homme'],
    ['миръ', 'mir', 'paix', 'nom m.', 'Homme'],
    ['міръ', 'mir', 'monde', 'nom m.', 'Homme'],
    ['небо', 'nébo', 'ciel', 'nom n.', 'Nature'],
    ['земля', 'zemlia', 'terre', 'nom f.', 'Nature'],
    ['солнце', 'solntsé', 'soleil', 'nom n.', 'Nature'],
    ['звѣзда', 'zvézda', 'étoile', 'nom f.', 'Nature'],
    ['день', 'den', 'jour', 'nom m.', 'Temps'],
    ['нощь', 'notch', 'nuit', 'nom f.', 'Temps'],
    ['утро', 'outro', 'matin', 'nom n.', 'Temps'],
    ['вечеръ', 'vétchér', 'soir', 'nom m.', 'Temps'],
    ['вѣкъ', 'vék', 'siècle, éternité', 'nom m.', 'Temps'],
    ['днесь', 'dnéss', 'aujourd’hui', 'adv.', 'Temps'],
    ['нынѣ', 'nyné', 'maintenant', 'adv.', 'Temps'],
    ['присно', 'prissno', 'toujours', 'adv.', 'Temps'],
    ['паки', 'paki', 'de nouveau', 'adv.', 'Temps'],
    ['зѣло', 'zélo', 'très', 'adv.', 'Temps'],
    ['быти', 'byti', 'être', 'verbe', 'Verbes'],
    ['имѣти', 'iméti', 'avoir', 'verbe', 'Verbes'],
    ['глаголати', 'glagolati', 'parler, dire', 'verbe', 'Verbes'],
    ['видѣти', 'vidéti', 'voir', 'verbe', 'Verbes'],
    ['слышати', 'slychati', 'entendre', 'verbe', 'Verbes'],
    ['знати', 'znati', 'savoir', 'verbe', 'Verbes'],
    ['любити', 'lioubiti', 'aimer', 'verbe', 'Verbes'],
    ['молитися', 'molitissia', 'prier', 'verbe', 'Verbes'],
    ['благословити', 'blagosloviti', 'bénir', 'verbe', 'Verbes'],
    ['славити', 'slaviti', 'glorifier', 'verbe', 'Verbes'],
    ['хвалити', 'khvaliti', 'louer', 'verbe', 'Verbes'],
    ['пѣти', 'péti', 'chanter', 'verbe', 'Verbes'],
    ['помиловати', 'pomilovati', 'avoir pitié', 'verbe', 'Verbes'],
    ['спасти', 'spasti', 'sauver', 'verbe', 'Verbes'],
    ['дати', 'dati', 'donner', 'verbe', 'Verbes'],
    ['простити', 'prostiti', 'pardonner', 'verbe', 'Verbes'],
    ['избавити', 'izbaviti', 'délivrer', 'verbe', 'Verbes'],
    ['очистити', 'otchistiti', 'purifier', 'verbe', 'Verbes'],
    ['воскреснути', 'voskresnouti', 'ressusciter', 'verbe', 'Verbes'],
    ['родитися', 'roditissia', 'naître', 'verbe', 'Verbes'],
    ['жити', 'jiti', 'vivre', 'verbe', 'Verbes'],
    ['грядати', 'griadati', 'venir', 'verbe', 'Verbes'],
    ['вѣровати', 'vérovati', 'croire', 'verbe', 'Verbes'],
    ['уповати', 'oupovati', 'espérer', 'verbe', 'Verbes'],
    ['поклонитися', 'poklonitissia', 'se prosterner, adorer', 'verbe', 'Verbes'],
    ['радоватися', 'radovatissia', 'se réjouir', 'verbe', 'Verbes'],
    ['плакати', 'plakati', 'pleurer', 'verbe', 'Verbes'],
    ['благъ', 'blag', 'bon', 'adj.', 'Qualités'],
    ['блаженъ', 'blajén', 'bienheureux', 'adj.', 'Qualités'],
    ['чистый', 'tchisty', 'pur', 'adj.', 'Qualités'],
    ['праведный', 'pravedny', 'juste', 'adj.', 'Qualités'],
    ['грѣшный', 'gréchny', 'pécheur', 'adj.', 'Qualités'],
    ['живый', 'jivyï', 'vivant', 'adj.', 'Qualités'],
    ['вѣчный', 'vétchny', 'éternel', 'adj.', 'Qualités'],
    ['безсмертный', 'bezsmertny', 'immortel', 'adj.', 'Qualités'],
    ['крѣпкій', 'krépkiï', 'fort', 'adj.', 'Qualités'],
    ['милостивъ', 'milostiv', 'miséricordieux', 'adj.', 'Qualités'],
    ['новый', 'novy', 'nouveau', 'adj.', 'Qualités'],
    ['великій', 'velikiï', 'grand', 'adj.', 'Qualités'],
    ['малый', 'maly', 'petit', 'adj.', 'Qualités'],
    ['пресвятый', 'présviatyï', 'très saint', 'adj.', 'Qualités'],
    ['Аминь', 'Aminn', 'amen', 'interj.', 'Mots-outils'],
    ['Аллилуіа', 'Alliloujia', 'alléluia (louez Dieu)', 'interj.', 'Mots-outils'],
    ['Осанна', 'Ossanna', 'hosanna (sauve, de grâce)', 'interj.', 'Mots-outils'],
    ['яко', 'yako', 'car, comme, que', 'conj.', 'Mots-outils'],
    ['иже', 'iji', 'qui (relatif)', 'pron.', 'Mots-outils'],
    ['да', 'da', 'que, afin que', 'part.', 'Mots-outils'],
    ['и', 'i', 'et', 'conj.', 'Mots-outils'],
    ['но', 'no', 'mais', 'conj.', 'Mots-outils'],
    ['нѣсть', 'nést', 'n’est pas, il n’y a pas', 'verbe', 'Mots-outils'],
    ['ей', 'éï', 'oui', 'part.', 'Mots-outils'],
    ['како', 'kako', 'comment', 'adv.', 'Mots-outils'],
    ['къ', 'k', 'vers, à', 'prép.', 'Mots-outils'],
    ['отъ', 'ot', 'de', 'prép.', 'Mots-outils'],
    ['во / въ', 'vo / v', 'dans', 'prép.', 'Mots-outils'],
    ['съ', 's', 'avec', 'prép.', 'Mots-outils'],
    ['предъ', 'pred', 'devant', 'prép.', 'Mots-outils']
  ];
})();
