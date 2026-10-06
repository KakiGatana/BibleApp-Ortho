/* Canon biblique orthodoxe (principaux livres), noms slavons, quiz de culture. */
(function () {
  const O = (window.ORTHO = window.ORTHO || {});

  /* [nom français, nom slavon, abréviation AELF, nombre de chapitres, groupe] */
  O.CANON = [
    ['Genèse', 'Бытіе', 'Gn', 50, 'Pentateuque'], ['Exode', 'Исходъ', 'Ex', 40, 'Pentateuque'], ['Lévitique', 'Левитъ', 'Lv', 27, 'Pentateuque'],
    ['Nombres', 'Числа', 'Nb', 36, 'Pentateuque'], ['Deutéronome', 'Второзаконіе', 'Dt', 34, 'Pentateuque'],
    ['Josué', 'Іисусъ Навинъ', 'Jos', 24, 'Livres historiques'], ['Juges', 'Судіи', 'Jg', 21, 'Livres historiques'], ['Ruth', 'Руѳь', 'Rt', 4, 'Livres historiques'],
    ['1 Règnes (1 Samuel)', 'Царствъ 1', '1S', 31, 'Livres historiques'], ['2 Règnes (2 Samuel)', 'Царствъ 2', '2S', 24, 'Livres historiques'],
    ['3 Règnes (1 Rois)', 'Царствъ 3', '1R', 22, 'Livres historiques'], ['4 Règnes (2 Rois)', 'Царствъ 4', '2R', 25, 'Livres historiques'],
    ['1 Paralipomènes', 'Паралипоменонъ 1', '1Ch', 29, 'Livres historiques'], ['2 Paralipomènes', 'Паралипоменонъ 2', '2Ch', 36, 'Livres historiques'],
    ['Esdras', 'Ездра', 'Esd', 10, 'Livres historiques'], ['Néhémie', 'Неемія', 'Ne', 13, 'Livres historiques'],
    ['Tobie', 'Товитъ', 'Tb', 14, 'Livres historiques'], ['Judith', 'Іудиѳь', 'Jdt', 16, 'Livres historiques'], ['Esther', 'Есѳирь', 'Est', 10, 'Livres historiques'],
    ['1 Maccabées', 'Маккавеевъ 1', '1M', 16, 'Livres historiques'], ['2 Maccabées', 'Маккавеевъ 2', '2M', 15, 'Livres historiques'],
    ['Job', 'Іовъ', 'Jb', 42, 'Livres de sagesse'], ['Psaumes', 'Псалтирь', 'Ps', 151, 'Livres de sagesse'], ['Proverbes', 'Притчи', 'Pr', 31, 'Livres de sagesse'],
    ['Ecclésiaste', 'Екклесіастъ', 'Qo', 12, 'Livres de sagesse'], ['Cantique des Cantiques', 'Пѣснь пѣсней', 'Ct', 8, 'Livres de sagesse'],
    ['Sagesse de Salomon', 'Премудрость Соломонова', 'Sg', 19, 'Livres de sagesse'], ['Siracide', 'Премудрость Сирахова', 'Si', 51, 'Livres de sagesse'],
    ['Osée', 'Осія', 'Os', 14, 'Prophètes'], ['Joël', 'Іоиль', 'Jl', 4, 'Prophètes'], ['Amos', 'Амосъ', 'Am', 9, 'Prophètes'], ['Abdias', 'Авдій', 'Ab', 1, 'Prophètes'],
    ['Jonas', 'Іона', 'Jon', 4, 'Prophètes'], ['Michée', 'Михей', 'Mi', 7, 'Prophètes'], ['Nahum', 'Наумъ', 'Na', 3, 'Prophètes'], ['Habacuc', 'Аввакумъ', 'Ha', 3, 'Prophètes'],
    ['Sophonie', 'Софонія', 'So', 3, 'Prophètes'], ['Aggée', 'Аггей', 'Ag', 2, 'Prophètes'], ['Zacharie', 'Захарія', 'Za', 14, 'Prophètes'], ['Malachie', 'Малахія', 'Ml', 3, 'Prophètes'],
    ['Isaïe', 'Исаія', 'Is', 66, 'Prophètes'], ['Jérémie', 'Іеремія', 'Jr', 52, 'Prophètes'], ['Baruch', 'Варухъ', 'Ba', 6, 'Prophètes'],
    ['Lamentations', 'Плачъ Іереміинъ', 'Lm', 5, 'Prophètes'], ['Ézéchiel', 'Іезекіиль', 'Ez', 48, 'Prophètes'], ['Daniel', 'Даніилъ', 'Dn', 14, 'Prophètes'],
    ['Matthieu', 'Отъ Матѳея', 'Mt', 28, 'Évangiles'], ['Marc', 'Отъ Марка', 'Mc', 16, 'Évangiles'], ['Luc', 'Отъ Луки', 'Lc', 24, 'Évangiles'], ['Jean', 'Отъ Іоанна', 'Jn', 21, 'Évangiles'],
    ['Actes des Apôtres', 'Дѣянія апостольская', 'Ac', 28, 'Actes et Épîtres'],
    ['Romains', 'Къ Римляномъ', 'Rm', 16, 'Actes et Épîtres'], ['1 Corinthiens', 'Къ Коринѳяномъ 1', '1Co', 16, 'Actes et Épîtres'], ['2 Corinthiens', 'Къ Коринѳяномъ 2', '2Co', 13, 'Actes et Épîtres'],
    ['Galates', 'Къ Галатомъ', 'Ga', 6, 'Actes et Épîtres'], ['Éphésiens', 'Къ Ефесеомъ', 'Ep', 6, 'Actes et Épîtres'], ['Philippiens', 'Къ Филиппійцемъ', 'Ph', 4, 'Actes et Épîtres'],
    ['Colossiens', 'Къ Колоссаемъ', 'Col', 4, 'Actes et Épîtres'], ['1 Thessaloniciens', 'Къ Солунянемъ 1', '1Th', 5, 'Actes et Épîtres'], ['2 Thessaloniciens', 'Къ Солунянемъ 2', '2Th', 3, 'Actes et Épîtres'],
    ['1 Timothée', 'Къ Тимоѳею 1', '1Tm', 6, 'Actes et Épîtres'], ['2 Timothée', 'Къ Тимоѳею 2', '2Tm', 4, 'Actes et Épîtres'], ['Tite', 'Къ Титу', 'Tt', 3, 'Actes et Épîtres'],
    ['Philémon', 'Къ Филимону', 'Phm', 1, 'Actes et Épîtres'], ['Hébreux', 'Къ Евреомъ', 'He', 13, 'Actes et Épîtres'], ['Jacques', 'Іакова', 'Jc', 5, 'Actes et Épîtres'],
    ['1 Pierre', 'Петра 1', '1P', 5, 'Actes et Épîtres'], ['2 Pierre', 'Петра 2', '2P', 3, 'Actes et Épîtres'], ['1 Jean', 'Іоанна 1', '1Jn', 5, 'Actes et Épîtres'],
    ['2 Jean', 'Іоанна 2', '2Jn', 1, 'Actes et Épîtres'], ['3 Jean', 'Іоанна 3', '3Jn', 1, 'Actes et Épîtres'], ['Jude', 'Іуды', 'Jude', 1, 'Actes et Épîtres'],
    ['Apocalypse', 'Откровеніе', 'Ap', 22, 'Apocalypse']
  ];

  /* Plan de lecture du Nouveau Testament (260 chapitres) */
  O.NT_CHAPTERS = [['Mt', 'Matthieu', 28], ['Mc', 'Marc', 16], ['Lc', 'Luc', 24], ['Jn', 'Jean', 21], ['Ac', 'Actes', 28], ['Rm', 'Romains', 16], ['1Co', '1 Corinthiens', 16], ['2Co', '2 Corinthiens', 13], ['Ga', 'Galates', 6], ['Ep', 'Éphésiens', 6], ['Ph', 'Philippiens', 4], ['Col', 'Colossiens', 4], ['1Th', '1 Thessaloniciens', 5], ['2Th', '2 Thessaloniciens', 3], ['1Tm', '1 Timothée', 6], ['2Tm', '2 Timothée', 4], ['Tt', 'Tite', 3], ['Phm', 'Philémon', 1], ['He', 'Hébreux', 13], ['Jc', 'Jacques', 5], ['1P', '1 Pierre', 5], ['2P', '2 Pierre', 3], ['1Jn', '1 Jean', 5], ['2Jn', '2 Jean', 1], ['3Jn', '3 Jean', 1], ['Jude', 'Jude', 1], ['Ap', 'Apocalypse', 22]];

  O.QUIZ = [
    { q: 'Combien de « grandes fêtes » (dodécaorton) y a-t-il en plus de Pâques ?', a: ['Sept', 'Douze', 'Quinze', 'Vingt'], c: 1, e: 'Le « dodécaorton » (du grec dodéka = douze) regroupe les douze grandes fêtes du Seigneur et de la Mère de Dieu.' },
    { q: 'Quel concile a proclamé Marie « Théotokos » (Mère de Dieu) ?', a: ['Nicée I', 'Éphèse', 'Chalcédoine', 'Nicée II'], c: 1, e: 'Éphèse (431) a confirmé que Marie est Mère de Dieu, pour protéger l’unité de la personne du Christ.' },
    { q: 'Combien de conciles œcuméniques l’Église orthodoxe reconnaît-elle ?', a: ['Quatre', 'Sept', 'Neuf', 'Vingt et un'], c: 1, e: 'Sept, de Nicée I (325) à Nicée II (787).' },
    { q: 'Que veut dire « théosis » ?', a: ['Théologie', 'Divinisation', 'Adoration', 'Méditation'], c: 1, e: 'La théosis est la participation de l’homme à la vie de Dieu par grâce.' },
    { q: 'Quelle est la traduction grecque de l’Ancien Testament sur laquelle repose la Bible orthodoxe ?', a: ['La Vulgate', 'La Septante', 'Le Targum', 'La Peshitta'], c: 1, e: 'La Septante (LXX) fut traduite à Alexandrie aux IIIe-IIe siècles avant J.-C.' },
    { q: 'Qui a inventé l’alphabet glagolitique, ancêtre du cyrillique ?', a: ['Basile le Grand', 'Cyrille (Constantin) de Thessalonique', 'Vladimir de Kiev', 'Serge de Radonège'], c: 1, e: 'Cyrille et Méthode, vers 863, pour traduire l’Évangile en langue slave.' },
    { q: 'Que veut dire « Господи, помилуй » ?', a: ['Gloire à toi, Seigneur', 'Seigneur, aie pitié', 'Seigneur, donne-nous la paix', 'Seigneur, exauce-nous'], c: 1, e: 'C’est le « Kyrie eleison » grec, répété sans cesse dans la liturgie.' },
    { q: 'Quel est le sens du mot « Pâque » ?', a: ['Joie', 'Passage', 'Lumière', 'Victoire'], c: 1, e: '« Pascha » vient de l’hébreu « pessah », le passage (de la mort à la vie).' },
    { q: 'Quel jour de l’année est un jour de jeûne strict, même hors saison ?', a: ['1er janvier', '14 septembre (Exaltation de la Croix)', '25 décembre', '15 août'], c: 1, e: 'Le 14 septembre, comme le 29 août et le 5 janvier, est un jour de jeûne strict.' },
    { q: 'Quel saint est surnommé « Bouche d’or » (Chrysostome) ?', a: ['Basile le Grand', 'Jean, archevêque de Constantinople', 'Grégoire le Théologien', 'Nicolas de Myre'], c: 1, e: 'Jean Chrysostome (vers 347-407), grand prédicateur.' },
    { q: 'Quel jour célèbre-t-on la Dormition de la Mère de Dieu ?', a: ['15 août', '8 septembre', '25 mars', '2 février'], c: 0, e: 'Le 15 août (nominal), précédé du Carême de la Dormition du 1er au 14 août.' },
    { q: 'Qui a peint la célèbre icône de la Sainte Trinité (vers 1411) ?', a: ['Théophane le Grec', 'Andréi Roublev', 'Denys', 'Simon Ouchakov'], c: 1, e: 'Andréi Roublev, moine du monastère de la Trinité-Saint-Serge.' },
    { q: 'Quelle est l’icône de la Résurrection dans la tradition orientale ?', a: ['Le tombeau vide avec les myrophores', 'La Descente aux enfers', 'L’Ascension', 'La Transfiguration'], c: 1, e: 'L’Orient représente la Résurrection par la Descente du Christ aux enfers (Anastasis).' },
    { q: 'Quelle fête a lieu 40 jours après Pâques ?', a: ['La Pentecôte', 'L’Ascension', 'La Transfiguration', 'La Dormition'], c: 1, e: 'L’Ascension a lieu le jeudi de la 6e semaine après Pâques.' },
    { q: 'Que veut dire « Philocalie » ?', a: ['Amour de la sagesse', 'Amour de la beauté', 'Amour du silence', 'Amour du prochain'], c: 1, e: 'Recueil de textes des Pères sur la prière du cœur.' },
    { q: 'Combien de tons compte l’Octoèque ?', a: ['Quatre', 'Sept', 'Huit', 'Douze'], c: 2, e: '« Octoèque » (du grec okto = huit) : huit tons, chacun associé à une semaine liturgique.' },
    { q: 'Que concerne la controverse sur le « Filioque » ?', a: ['La date de Pâques', 'La procession du Saint-Esprit', 'Le célibat des prêtres', 'Les icônes'], c: 1, e: 'Le Filioque (« et du Fils ») est un ajout latin au Symbole concernant la procession de l’Esprit.' },
    { q: 'Quelle prière commence par « Roi céleste, Consolateur… » ?', a: ['Au Christ', 'À l’Esprit Saint', 'À la Mère de Dieu', 'À saint Nicolas'], c: 1, e: 'C’est la prière à l’Esprit Saint, première prière de tout office et de la journée.' },
    { q: 'Qui a découvert la Vraie Croix à Jérusalem selon la tradition ?', a: ['Sainte Hélène', 'Sainte Catherine', 'Sainte Marie-Madeleine', 'Sainte Olga'], c: 0, e: 'Hélène, mère de l’empereur Constantin, vers 326.' },
    { q: 'Combien de livres compte le Nouveau Testament ?', a: ['24', '27', '33', '39'], c: 1, e: '27 livres : 4 Évangiles, les Actes, 21 épîtres et l’Apocalypse.' },
    { q: 'Quel carême débute le 15 novembre ?', a: ['Carême des Apôtres', 'Carême de la Dormition', 'Carême de la Nativité', 'Grand Carême'], c: 2, e: 'Le Carême de la Nativité va du 15 novembre au 24 décembre (dates nominales).' },
    { q: 'Que signifie le terme « tropaire » ?', a: ['Une icône', 'Un hymne bref qui exprime le sens d’une fête', 'Un vêtement liturgique', 'Un livre de lectures'], c: 1, e: 'Le tropaire est l’hymne principale d’un jour de fête ou d’un saint.' },
    { q: 'Quel Dimanche inaugure le Grand Carême ?', a: ['Des Rameaux', 'De l’Orthodoxie', 'Du Fromage', 'De Thomas'], c: 1, e: 'Le premier dimanche de Carême célèbre le rétablissement des icônes en 843. La veille, le Dimanche du Fromage, on se demande pardon.' },
    { q: 'Combien de jours après Pâques la Pentecôte est-elle célébrée ?', a: ['40', '49', '56', '70'], c: 1, e: 'Cinquante jours en comptant Pâques : la Pentecôte est le 50e jour, 49 jours après Pâques.' },
    { q: 'Dans quelle langue l’Évangile a-t-il d’abord été traduit pour les Slaves ?', a: ['Le russe', 'Le vieux-slave (slavon)', 'Le grec', 'Le latin'], c: 1, e: 'Cyrille et Méthode ont créé la langue littéraire que l’on appelle vieux-slave.' }
  ];
})();
