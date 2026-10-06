/* Passages bibliques complets, en parallèle français / slavon.
   fr et cs : tableaux de lignes (versets) alignés quand cs existe ; csExtract : extraits slavons seulement. */
(function () {
  const O = (window.ORTHO = window.ORTHO || {});
  O.READINGS = [
    {
      id: 'ps22', ref: 'Ps 22 (23)', title: 'Le Seigneur est mon berger', group: 'Psaumes', tags: ['confiance', 'berger', 'défunts'],
      intro: 'Psaume du Bon Pasteur, lu aux offices des défunts et dans l’épreuve. Les Pères y voient une annonce des sacrements : l’eau du baptême, l’huile de l’onction, la coupe de l’Eucharistie.',
      fr: [
        'Le Seigneur est mon berger : je ne manquerai de rien.',
        'Il me fait reposer en un lieu verdoyant ; il m’a conduit près d’une eau de repos.',
        'Il a ramené mon âme ; il m’a conduit sur les sentiers de la justice, à cause de son nom.',
        'Même si je marche au milieu de l’ombre de la mort, je ne craindrai aucun mal, car tu es avec moi ;',
        'ta verge et ton bâton, ce sont eux qui me consolent.',
        'Tu as préparé devant moi une table, en face de ceux qui me persécutent ;',
        'tu as oint ma tête d’huile, et ta coupe m’enivre, comme elle est puissante !',
        'Ta miséricorde me poursuivra tous les jours de ma vie, et j’habiterai dans la maison du Seigneur pour la longueur des jours.'
      ],
      cs: [
        'Господь пасетъ мя, и ничтоже мя лишитъ:',
        'на мѣстѣ злачнѣ, ту всели мя, на водѣ покойнѣ воспита мя.',
        'Душу мою обрати, наставилъ мя есть на стезяхъ правды, имене ради Своего.',
        'Аще бо и пойду посредѣ сѣни смертныя, не убоюся зла, яко Ты со мною еси:',
        'жезлъ Твой и палица Твоя, та мя утѣшиста.',
        'Уготовалъ еси предо мною трапезу сопротивъ стужающымъ мнѣ:',
        'умастилъ еси елеомъ главу мою, и чаша Твоя упоявающи мя, яко державна.',
        'И милость Твоя поженетъ мя вся дни живота моего, и еже вселитися ми въ домѣ Господни, въ долготу дний.'
      ]
    },
    {
      id: 'ps50', ref: 'Ps 50 (51)', title: 'Aie pitié de moi, ô Dieu', group: 'Psaumes', tags: ['repentir', 'carême'],
      intro: 'Le psaume de la pénitence de David, lu à chaque office du matin (Orthros) et pendant tout le Carême. « Un cœur brisé et humilié, ô Dieu, tu ne le dédaignes pas. »',
      fr: [
        'Aie pitié de moi, ô Dieu, selon ta grande miséricorde, et selon l’abondance de tes compassions, efface mon iniquité.',
        'Lave-moi encore et encore de mon iniquité, et purifie-moi de mon péché.',
        'Car je connais mon iniquité, et mon péché est toujours devant moi.',
        'Contre toi seul j’ai péché, et j’ai fait le mal devant toi, afin que tu sois reconnu juste dans tes paroles et que tu triomphes quand on te juge.',
        'Voici que j’ai été conçu dans l’iniquité, et ma mère m’a enfanté dans le péché.',
        'Car voici que tu as aimé la vérité ; tu m’as révélé les secrets cachés de ta sagesse.',
        'Tu m’aspergeras d’hysope, et je serai purifié ; tu me laveras, et je serai plus blanc que la neige.',
        'Tu me feras entendre la joie et l’allégresse ; les os humiliés exulteront.',
        'Détourne ta face de mes péchés, et efface toutes mes iniquités.',
        'Crée en moi un cœur pur, ô Dieu, et renouvelle en mes entrailles un esprit droit.',
        'Ne me rejette pas loin de ta face, et ne retire pas de moi ton Esprit Saint.',
        'Rends-moi la joie de ton salut, et affermis-moi par un esprit souverain.',
        'J’enseignerai tes voies aux pécheurs, et les impies reviendront à toi.',
        'Délivre-moi du sang, ô Dieu, Dieu de mon salut ; ma langue exultera de ta justice.',
        'Seigneur, tu ouvriras mes lèvres, et ma bouche annoncera ta louange.',
        'Car si tu avais voulu un sacrifice, je l’aurais offert ; mais tu ne prends pas plaisir aux holocaustes.',
        'Le sacrifice pour Dieu, c’est un esprit brisé ; un cœur brisé et humilié, Dieu ne le dédaigne pas.',
        'Fais du bien à Sion, Seigneur, dans ta bienveillance, et que soient relevés les murs de Jérusalem.',
        'Alors tu agréeras le sacrifice de justice, l’oblation et les holocaustes ; alors on offrira des veaux sur ton autel.'
      ],
      cs: [
        'Помилуй мя, Боже, по велицѣй милости Твоей, и по множеству щедротъ Твоихъ очисти беззаконіе мое.',
        'Наипаче омый мя отъ беззаконія моего, и отъ грѣха моего очисти мя.',
        'Яко беззаконіе мое азъ знаю, и грѣхъ мой предо мною есть выну.',
        'Тебѣ единому согрѣшихъ, и лукавое предъ Тобою сотворихъ, яко да оправдишися во словесѣхъ Твоихъ, и побѣдиши внегда судити Ти.',
        'Се бо въ беззакониихъ зачатъ есмь, и во грѣсѣхъ роди мя мати моя.',
        'Се бо истину возлюбилъ еси, безвѣстная и тайная премудрости Твоея явилъ ми еси.',
        'Окропиши мя иссопомъ, и очищуся: омыеши мя, и паче снѣга убѣлюся.',
        'Слуху моему даси радость и веселіе: возрадуются кости смиренныя.',
        'Отврати лице Твое отъ грѣхъ моихъ, и вся беззаконія моя очисти.',
        'Сердце чисто созижди во мнѣ, Боже, и духъ правъ обнови во утробѣ моей.',
        'Не отвержи мене отъ лица Твоего, и Духа Твоего Святаго не отъими отъ мене.',
        'Воздаждь ми радость спасенія Твоего, и Духомъ Владычнимъ утверди мя.',
        'Научу беззаконныя путемъ Твоимъ, и нечестивіи къ Тебѣ обратятся.',
        'Избави мя отъ кровей, Боже, Боже спасенія моего: возрадуется языкъ мой правдѣ Твоей.',
        'Господи, устнѣ мои отверзеши, и уста моя возвѣстятъ хвалу Твою.',
        'Яко аще бы восхотѣлъ еси жертвы, далъ бы убо: всесожженія не благоволиши.',
        'Жертва Богу духъ сокрушенъ: сердце сокрушенно и смиренно Богъ не уничижитъ.',
        'Ублажи, Господи, благоволеніемъ Твоимъ Сіона, и да созиждутся стѣны Иерусалимскія.',
        'Тогда благоволиши жертву правды, возношеніе и всесожегаемая: тогда возложатъ на олтарь Твой тельцы.'
      ]
    },
    {
      id: 'ps90', ref: 'Ps 90 (91)', title: 'Celui qui habite sous l’abri du Très-Haut', group: 'Psaumes', tags: ['protection', 'complies', 'anges'],
      intro: 'Psaume de protection, chanté aux Complies. Le Christ le cite lors de la tentation au désert (Mt 4:6). On le lit aussi dans la prière contre la peur et les épreuves.',
      fr: [
        'Celui qui habite sous l’abri du Très-Haut repose à l’ombre du Dieu du ciel.',
        'Il dira au Seigneur : Tu es mon protecteur et mon refuge, mon Dieu, et j’espère en lui.',
        'Car lui-même te délivrera du filet des chasseurs et de la parole qui sème le trouble.',
        'Il te couvrira de ses épaules, et sous ses ailes tu auras confiance ; sa vérité t’entourera comme une arme.',
        'Tu ne craindras ni la terreur de la nuit, ni la flèche qui vole pendant le jour,',
        'ni la chose qui rôde dans les ténèbres, ni l’attaque et le démon de midi.',
        'Mille tomberont à ton côté, et dix mille à ta droite ; mais cela ne s’approchera pas de toi.',
        'Seulement tu regarderas de tes yeux, et tu verras la rétribution des pécheurs.',
        'Car toi, Seigneur, tu es mon espérance ; tu as fait du Très-Haut ton refuge.',
        'Le mal ne viendra pas jusqu’à toi, et le fléau n’approchera pas de ta tente.',
        'Car il a donné ordre à ses anges, à ton sujet, de te garder dans toutes tes voies.',
        'Ils te porteront sur leurs mains, de peur que ton pied ne heurte contre une pierre.',
        'Tu marcheras sur l’aspic et le basilic, tu fouleras aux pieds le lion et le dragon.',
        'Parce qu’il a espéré en moi, je le délivrerai ; je le protégerai, parce qu’il a connu mon nom.',
        'Il m’invoquera, et je l’exaucerai ; je suis avec lui dans la tribulation, je le délivrerai et je le glorifierai.',
        'Je le rassasierai de longs jours, et je lui montrerai mon salut.'
      ],
      cs: [
        'Живый въ помощи Вышняго, въ кровѣ Бога небеснаго водворится.',
        'Речетъ Господеви: Заступникъ мой еси и Прибѣжище мое, Богъ мой, и уповаю на Него.',
        'Яко Той избавитъ тя отъ сѣти ловчи, и отъ словесе мятежна:',
        'плещма Своима осѣнитъ тя, и подъ крилѣ Его надѣешися: оружіемъ обыдетъ тя истина Его.',
        'Не убоишися отъ страха нощнаго, отъ стрѣлы летящія во дни,',
        'отъ вещи во тмѣ преходящія, отъ сряща и бѣса полуденнаго.',
        'Падетъ отъ страны твоея тысяща, и тма одесную тебе: къ тебѣ же не приближится.',
        'Обаче очима твоима смотриши, и воздаяніе грѣшниковъ узриши.',
        'Яко Ты, Господи, упованіе мое: Вышняго положилъ еси прибѣжище твое.',
        'Не приидетъ къ тебѣ зло, и рана не приближится тѣлеси твоему:',
        'яко Ангеломъ Своимъ заповѣстъ о тебѣ, сохранити тя во всѣхъ путехъ твоихъ.',
        'На руку возмутъ тя, да не когда преткнеши о камень ногу твою:',
        'на аспида и василиска наступиши, и попереши льва и змія.',
        'Яко на Мя упова, и избавлю и: покрыю и, яко позна имя Мое.',
        'Призоветъ ко Мнѣ, и услышу его: съ нимъ есмь въ скорби, изму его, и прославлю его:',
        'долготою дній исполню его, и явлю ему спасеніе Мое.'
      ]
    },
    {
      id: 'ps1', ref: 'Ps 1', title: 'Heureux l’homme', group: 'Psaumes', tags: ['sagesse', 'parole'],
      intro: 'Premier psaume du Psautier, il sert de porte d’entrée à tout le livre : la voie du juste, enracinée dans la Parole, s’oppose à celle de l’impie.',
      fr: [
        'Heureux l’homme qui n’a pas marché selon le conseil des impies, qui ne s’est pas tenu sur la voie des pécheurs, et ne s’est pas assis sur la chaire des pestiférés ;',
        'mais sa volonté est dans la loi du Seigneur, et il méditera sa loi jour et nuit.',
        'Il sera comme un arbre planté près du cours des eaux, qui donnera son fruit en son temps, et dont la feuille ne tombera pas ; et tout ce qu’il fera réussira.',
        'Il n’en est pas ainsi des impies, il n’en est pas ainsi : mais ils sont comme la poussière que le vent emporte de la face de la terre.',
        'C’est pourquoi les impies ne ressusciteront pas au jugement, ni les pécheurs dans l’assemblée des justes.',
        'Car le Seigneur connaît la voie des justes, mais la voie des impies périra.'
      ],
      cs: [
        'Блаженъ мужъ, иже не иде на совѣтъ нечестивыхъ, и на пути грѣшныхъ не ста, и на сѣдалищи губителей не сѣде:',
        'но въ законѣ Господни воля его, и въ законѣ Его поучится день и нощь.',
        'И будетъ яко древо насажденное при исходищихъ водъ, еже плодъ свой дастъ во время свое, и листъ его не отпадетъ: и вся, елика аще творитъ, успѣетъ.',
        'Не тацы нечестивіи, не тацы: но яко прахъ, егоже возметаетъ вѣтръ отъ лица земли.',
        'Сего ради не воскреснутъ нечестивіи на судъ, ниже грѣшницы въ совѣтѣ праведныхъ.',
        'Яко вѣсть Господь путь праведныхъ, и путь нечестивыхъ погибнетъ.'
      ]
    },
    {
      id: 'ps116', ref: 'Ps 116 (117)', title: 'Louez le Seigneur, toutes les nations', group: 'Psaumes', tags: ['louange', 'court'],
      intro: 'Le plus court psaume, chanté à l’Orthros du dimanche et à Pâques. Idéal pour s’initier à la lecture du slavon.',
      fr: ['Louez le Seigneur, toutes les nations, célébrez-le, tous les peuples.', 'Car sa miséricorde s’est affermie sur nous, et la vérité du Seigneur demeure pour toujours.'],
      cs: ['Хвалите Господа вси языцы, похвалите Его вси людіе.', 'Яко утвердися милость Его на насъ, и истина Господня пребываетъ во вѣкъ.']
    },
    {
      id: 'gn1', ref: 'Gn 1:1-5', title: 'Au commencement', group: 'Ancien Testament', tags: ['création', 'lumière'],
      intro: 'Début de la Genèse, lu aux Vêpres du Grand Carême. La création naît d’une parole ; la première œuvre est la lumière.',
      fr: [
        'Au commencement, Dieu créa le ciel et la terre.',
        'Or la terre était invisible et informe, les ténèbres couvraient l’abîme, et l’Esprit de Dieu était porté au-dessus des eaux.',
        'Dieu dit : Que la lumière soit ! Et la lumière fut.',
        'Dieu vit que la lumière était bonne ; et Dieu sépara la lumière d’avec les ténèbres.',
        'Dieu appela la lumière jour, et les ténèbres nuit. Il y eut un soir, il y eut un matin : ce fut un seul jour.'
      ],
      cs: [
        'Въ началѣ сотвори Богъ небо и землю.',
        'Земля же бѣ невидима и неустроена, и тма верху бездны, и Духъ Божій ношашеся верху воды.',
        'И рече Богъ: да будетъ свѣтъ. И бысть свѣтъ.',
        'И видѣ Богъ свѣтъ, яко добро: и разлучи Богъ между свѣтомъ и между тмою.',
        'И нарече Богъ свѣтъ день, и тму нарече нощь. И бысть вечеръ, и бысть утро, день единъ.'
      ]
    },
    {
      id: 'beatitudes', ref: 'Mt 5:3-12', title: 'Les Béatitudes', group: 'Évangiles', tags: ['sermon sur la montagne', 'liturgie'],
      intro: 'Chantées à chaque Liturgie (3e antienne). Les Pères y voient le portrait du Christ et le chemin des saints : chaque béatitude est une marche de l’échelle.',
      fr: [
        'Heureux les pauvres en esprit, car le royaume des cieux est à eux !',
        'Heureux ceux qui pleurent, car ils seront consolés !',
        'Heureux les doux, car ils hériteront la terre !',
        'Heureux ceux qui ont faim et soif de la justice, car ils seront rassasiés !',
        'Heureux les miséricordieux, car ils obtiendront miséricorde !',
        'Heureux ceux qui ont le cœur pur, car ils verront Dieu !',
        'Heureux ceux qui procurent la paix, car ils seront appelés fils de Dieu !',
        'Heureux ceux qui sont persécutés pour la justice, car le royaume des cieux est à eux !',
        'Heureux serez-vous, lorsqu’on vous outragera, qu’on vous persécutera et qu’on dira de vous toute sorte de mal à cause de moi, en mentant.',
        'Réjouissez-vous et soyez dans l’allégresse, car votre récompense sera grande dans les cieux ; c’est ainsi qu’on a persécuté les prophètes qui ont été avant vous.'
      ],
      cs: [
        'Блаженни нищіи духомъ, яко тѣхъ есть царство небесное.',
        'Блаженни плачущіи, яко тіи утѣшатся.',
        'Блаженни кроткіи, яко тіи наслѣдятъ землю.',
        'Блаженни алчущіи и жаждущіи правды, яко тіи насытятся.',
        'Блаженни милостивіи, яко тіи помиловани будутъ.',
        'Блаженни чистіи сердцемъ, яко тіи Бога узрятъ.',
        'Блаженни миротворцы, яко тіи сынове Божіи нарекутся.',
        'Блаженни изгнани правды ради, яко тѣхъ есть царство небесное.',
        'Блаженни есте, егда поносятъ вамъ, и ижденутъ, и рекутъ всякъ золъ глаголъ на вы лжуще, Мене ради.',
        'Радуйтеся и веселитеся, яко мзда ваша многа на небесѣхъ: такоже бо изгнаша пророки, иже бѣша прежде васъ.'
      ]
    },
    {
      id: 'jn-prologue', ref: 'Jn 1:1-18', title: 'Prologue de l’évangile de Jean', group: 'Évangiles', tags: ['pâques', 'verbe', 'trinité'],
      intro: 'Lu à la Liturgie de Pâques, dans toutes les langues. Le Verbe éternel entre dans l’histoire : toute la théologie orthodoxe de l’Incarnation est contenue ici.',
      fr: [
        'Au commencement était le Verbe, et le Verbe était auprès de Dieu, et le Verbe était Dieu.',
        'Il était au commencement auprès de Dieu.',
        'Toutes choses ont été faites par lui, et rien de ce qui a été fait n’a été fait sans lui.',
        'En lui était la vie, et la vie était la lumière des hommes.',
        'La lumière luit dans les ténèbres, et les ténèbres ne l’ont pas saisie.',
        'Il y eut un homme envoyé de Dieu, son nom était Jean.',
        'Il vint comme témoin, pour rendre témoignage à la lumière, afin que tous croient par lui.',
        'Il n’était pas la lumière, mais il devait rendre témoignage à la lumière.',
        'Cette lumière était la véritable lumière, qui, en venant dans le monde, éclaire tout homme.',
        'Il était dans le monde, et le monde a été fait par lui, et le monde ne l’a pas connu.',
        'Il est venu chez les siens, et les siens ne l’ont pas reçu.',
        'Mais à tous ceux qui l’ont reçu, à ceux qui croient en son nom, il a donné le pouvoir de devenir enfants de Dieu,',
        'qui sont nés non du sang, ni de la volonté de la chair, ni de la volonté de l’homme, mais de Dieu.',
        'Et le Verbe s’est fait chair, il a habité parmi nous, et nous avons contemplé sa gloire, gloire qu’il tient de son Père comme Fils unique, plein de grâce et de vérité.',
        'Jean lui rend témoignage et s’écrie : C’est celui dont j’ai dit : Celui qui vient après moi m’a devancé, car il était avant moi.',
        'Et de sa plénitude nous avons tous reçu, et grâce pour grâce.',
        'Car la loi a été donnée par Moïse ; la grâce et la vérité sont venues par Jésus-Christ.',
        'Personne n’a jamais vu Dieu ; le Fils unique, qui est dans le sein du Père, est celui qui l’a fait connaître.'
      ],
      csExtract: [
        ['Jn 1:1-3', 'Въ началѣ бѣ Слово, и Слово бѣ къ Богу, и Богъ бѣ Слово. Сей бѣ искони къ Богу. Вся тѣмъ быша, и без Него ничтоже бысть, еже бысть.'],
        ['Jn 1:4-5', 'Въ Томъ животъ бѣ, и животъ бѣ свѣтъ человѣкомъ: и свѣтъ во тмѣ свѣтитъ, и тма Его не объятъ.'],
        ['Jn 1:14', 'И Слово плоть бысть, и вселися въ ны, и видѣхомъ славу Его, славу яко Единороднаго отъ Отца, исполнь благодати и истины.']
      ]
    },
    {
      id: 'annonciation', ref: 'Lc 1:26-38', title: 'L’Annonciation', group: 'Évangiles', tags: ['mère de dieu', 'incarnation'],
      intro: 'Évangile de la fête du 25 mars. Gabriel salue Marie : « Réjouis-toi, pleine de grâce ». Le salut du monde attend la réponse libre d’une jeune fille.',
      fr: [
        'Au sixième mois, l’ange Gabriel fut envoyé par Dieu dans une ville de Galilée, appelée Nazareth,',
        'auprès d’une vierge fiancée à un homme de la maison de David, nommé Joseph. Le nom de la vierge était Marie.',
        'L’ange entra chez elle, et dit : Réjouis-toi, pleine de grâce, le Seigneur est avec toi ; tu es bénie entre les femmes.',
        'Troublée par cette parole, Marie se demandait ce que pouvait signifier une telle salutation.',
        'L’ange lui dit : Ne crains point, Marie, car tu as trouvé grâce devant Dieu.',
        'Voici, tu concevras dans ton sein, et tu enfanteras un fils, et tu lui donneras le nom de Jésus.',
        'Il sera grand, et sera appelé Fils du Très-Haut ; le Seigneur Dieu lui donnera le trône de David, son père.',
        'Il régnera sur la maison de Jacob éternellement, et son règne n’aura point de fin.',
        'Marie dit à l’ange : Comment cela se fera-t-il, puisque je ne connais point d’homme ?',
        'L’ange lui répondit : Le Saint-Esprit viendra sur toi, et la puissance du Très-Haut te couvrira de son ombre ; c’est pourquoi le saint enfant qui naîtra de toi sera appelé Fils de Dieu.',
        'Voici, Élisabeth, ta parente, a conçu, elle aussi, un fils en sa vieillesse, et celle qu’on appelait stérile est dans son sixième mois.',
        'Car rien n’est impossible à Dieu.',
        'Marie dit : Voici la servante du Seigneur ; qu’il me soit fait selon ta parole. Et l’ange la quitta.'
      ],
      csExtract: [
        ['Lc 1:28', 'Радуйся, благодатная: Господь съ Тобою: благословена Ты въ женахъ.'],
        ['Lc 1:38', 'Се раба Господня: буди ми по глаголу Твоему.']
      ]
    },
    {
      id: 'magnificat', ref: 'Lc 1:46-55', title: 'Le Magnificat', group: 'Cantiques', tags: ['mère de dieu', 'orthros'],
      intro: 'Chanté chaque matin à l’Orthros, avec le refrain : « Plus vénérable que les chérubins… ». C’est la louange de Marie après l’annonce d’Élisabeth.',
      fr: [
        'Mon âme exalte le Seigneur, et mon esprit tressaille de joie en Dieu, mon Sauveur,',
        'parce qu’il a jeté les yeux sur l’abaissement de sa servante : voici que désormais toutes les générations me diront bienheureuse.',
        'Car le Puissant a fait pour moi de grandes choses, et son nom est saint,',
        'et sa miséricorde s’étend d’âge en âge sur ceux qui le craignent.',
        'Il a déployé la force de son bras, il a dispersé les hommes au cœur orgueilleux ;',
        'il a renversé les puissants de leurs trônes, et il a élevé les humbles ;',
        'il a rassasié de biens les affamés, et renvoyé les riches les mains vides.',
        'Il a secouru Israël, son serviteur, se souvenant de sa miséricorde, comme il l’avait dit à nos pères, à Abraham et à sa postérité pour toujours.'
      ],
      cs: [
        'Величитъ душа моя Господа, и возрадовася духъ мой о Бозѣ Спасѣ моемъ,',
        'яко призрѣ на смиреніе рабы Своея: се бо отнынѣ ублажатъ мя вси роди.',
        'Яко сотвори мнѣ величіе Сильный, и свято имя Его,',
        'и милость Его въ роды родовъ боящымся Его.',
        'Сотвори державу мышцею Своею, расточи гордыя помышленіемъ сердца ихъ:',
        'низложи сильныя съ престолъ, и вознесе смиренныя:',
        'алчущыя исполни благъ, и богатящыяся отпусти тщы.',
        'Воспріятъ Израиля отрока Своего, помянути милость, якоже глагола ко отцемъ нашымъ, Аврааму и сѣмени его даже до вѣка.'
      ]
    },
    {
      id: 'nunc', ref: 'Lc 2:29-32', title: 'Le cantique de Syméon', group: 'Cantiques', tags: ['vêpres', 'soir'],
      intro: 'Chanté chaque soir aux Vêpres. Syméon, vieillard juste, prend l’Enfant dans ses bras au Temple : sa prière est devenue celle du soir de l’Église.',
      fr: [
        'Maintenant, Maître, tu laisses ton serviteur s’en aller en paix, selon ta parole,',
        'car mes yeux ont vu ton salut,',
        'que tu as préparé devant tous les peuples,',
        'lumière pour la révélation aux nations, et gloire d’Israël ton peuple.'
      ],
      cs: [
        'Нынѣ отпущаеши раба Твоего, Владыко, по глаголу Твоему съ миромъ:',
        'яко видѣстѣ очи мои спасеніе Твое,',
        'еже еси уготовалъ предъ лицемъ всѣхъ людій,',
        'свѣтъ во откровеніе языкомъ, и славу людей Твоихъ Израиля.'
      ]
    },
    {
      id: 'kenose', ref: 'Ph 2:5-11', title: 'L’hymne de la kénose', group: 'Épîtres', tags: ['humilité', 'christologie'],
      intro: 'Ancien hymne chrétien cité par Paul : le Christ, de condition divine, s’est dépouillé. Lu aux fêtes de la Mère de Dieu et au Grand Mercredi.',
      fr: [
        'Ayez en vous les sentiments qui étaient en Jésus-Christ :',
        'lui qui était en forme de Dieu, il n’a pas regardé comme une proie à arracher d’être égal à Dieu,',
        'mais il s’est anéanti lui-même, prenant la forme de serviteur, en devenant semblable aux hommes ;',
        'reconnu comme homme par son aspect, il s’est humilié lui-même, se rendant obéissant jusqu’à la mort, même jusqu’à la mort de la croix.',
        'C’est pourquoi Dieu l’a souverainement élevé, et lui a donné le nom qui est au-dessus de tout nom,',
        'afin qu’au nom de Jésus tout genou fléchisse dans les cieux, sur la terre et sous la terre,',
        'et que toute langue confesse que Jésus-Christ est Seigneur, à la gloire de Dieu le Père.'
      ],
      cs: [
        'Сіе да мудрствуется въ васъ, еже и во Христѣ Іисусѣ:',
        'иже во образѣ Божіи сый, не восхищеніемъ непщева быти равенъ Богу:',
        'но себе умали, зракъ раба пріемъ, въ подобіи человѣчестѣмъ бывъ,',
        'и образомъ обрѣтеся яко человѣкъ: смири себе, послушливъ бывъ даже до смерти, смерти же крестныя.',
        'Тѣмже и Богъ Того превознесе, и дарова Ему имя, еже есть паче всякаго имене:',
        'да о имени Іисусовѣ всяко колѣно поклонится небесныхъ и земныхъ и преисподнихъ,',
        'и всякъ языкъ исповѣсть, яко Господь Іисусъ Христосъ, во славу Бога Отца.'
      ]
    },
    {
      id: 'mission', ref: 'Mt 28:16-20', title: 'L’envoi en mission', group: 'Évangiles', tags: ['résurrection', 'trinité', 'baptême'],
      intro: 'Dernière parole du Christ dans l’évangile de Matthieu : l’envoi, le baptême trinitaire et la promesse d’une présence perpétuelle.',
      fr: [
        'Les onze disciples allèrent en Galilée, sur la montagne que Jésus leur avait désignée.',
        'Quand ils le virent, ils se prosternèrent devant lui ; mais quelques-uns eurent des doutes.',
        'Jésus, s’étant approché, leur parla ainsi : Tout pouvoir m’a été donné dans le ciel et sur la terre.',
        'Allez donc, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit,',
        'et leur enseignant à observer tout ce que je vous ai prescrit. Et voici, je suis avec vous tous les jours, jusqu’à la fin du monde. Amen.'
      ],
      cs: [
        'Одиннадесять же ученикъ идоша въ Галилею, въ гору, идеже повелѣ имъ Іисусъ.',
        'И видѣвше Его поклонишася Ему: ини же усумнѣшася.',
        'И приступль Іисусъ глагола имъ, глаголя: дадеся Мнѣ всяка власть на небеси и на земли.',
        'Шедше убо научите вся языки, крестяще ихъ во имя Отца и Сына и Святаго Духа,',
        'учаще ихъ блюсти вся, елика заповѣдахъ вамъ: и се, Азъ съ вами есмь во вся дни до скончанія вѣка. Аминь.'
      ]
    },
    {
      id: 'resurrection-mt', ref: 'Mt 28:1-10', title: 'Le tombeau vide', group: 'Évangiles', tags: ['pâques', 'myrophores'],
      intro: 'La première annonce de la Résurrection est faite aux femmes myrophores. Un ange roule la pierre ; le Christ lui-même vient à leur rencontre.',
      fr: [
        'Après le sabbat, à l’aube du premier jour de la semaine, Marie de Magdala et l’autre Marie allèrent voir le sépulcre.',
        'Et voici, il y eut un grand tremblement de terre ; car un ange du Seigneur descendit du ciel, vint rouler la pierre, et s’assit dessus.',
        'Son aspect était comme l’éclair, et son vêtement blanc comme la neige.',
        'Les gardes tremblèrent de peur, et devinrent comme morts.',
        'Mais l’ange prit la parole, et dit aux femmes : Pour vous, ne craignez pas ; car je sais que vous cherchez Jésus, qui a été crucifié.',
        'Il n’est point ici ; il est ressuscité, comme il l’avait dit. Venez, voyez le lieu où il était couché,',
        'et allez promptement dire à ses disciples qu’il est ressuscité des morts. Voici, il vous précède en Galilée : c’est là que vous le verrez.',
        'Elles s’éloignèrent promptement du sépulcre, avec crainte et avec une grande joie, et elles coururent porter la nouvelle aux disciples.',
        'Et voici, Jésus vint à leur rencontre, et dit : Je vous salue. Elles s’approchèrent pour saisir ses pieds, et elles se prosternèrent devant lui.',
        'Alors Jésus leur dit : Ne craignez pas ; allez dire à mes frères de se rendre en Galilée : c’est là qu’ils me verront.'
      ],
      csExtract: [['Mt 28:6', 'Нѣсть здѣ: воста бо, якоже рече: пріидите, видите мѣсто, идеже лежа Господь.']]
    },
    {
      id: 'agape', ref: '1 Co 13', title: 'L’hymne à la charité', group: 'Épîtres', tags: ['amour', 'vertu'],
      intro: 'Lu au Grand Carême et aux fêtes de saints. Paul y décrit la charité (agapè) comme l’unique chose qui demeure.',
      fr: [
        'Quand je parlerais les langues des hommes et des anges, si je n’ai pas la charité, je suis un airain qui résonne, ou une cymbale qui retentit.',
        'Et quand j’aurais le don de prophétie, la science de tous les mystères et toute la connaissance, et quand j’aurais toute la foi jusqu’à transporter des montagnes, si je n’ai pas la charité, je ne suis rien.',
        'Et quand je distribuerais tous mes biens pour nourrir les pauvres, quand je livrerais mon corps pour être brûlé, si je n’ai pas la charité, cela ne me sert de rien.',
        'La charité est patiente, elle est pleine de bonté ; la charité n’est pas envieuse ; la charité ne se vante pas, elle ne s’enfle pas d’orgueil,',
        'elle ne fait rien de malhonnête, elle ne cherche pas son intérêt, elle ne s’irrite pas, elle ne soupçonne pas le mal,',
        'elle ne se réjouit pas de l’injustice, mais elle se réjouit de la vérité ;',
        'elle excuse tout, elle croit tout, elle espère tout, elle supporte tout.',
        'La charité ne périt jamais. Les prophéties prendront fin, les langues cesseront, la connaissance disparaîtra.',
        'Car nous connaissons en partie, et nous prophétisons en partie ;',
        'mais quand ce qui est parfait sera venu, ce qui est partiel disparaîtra.',
        'Maintenant nous voyons au moyen d’un miroir, d’une manière obscure ; mais alors nous verrons face à face. Aujourd’hui je connais en partie, mais alors je connaîtrai comme j’ai été connu.',
        'Maintenant donc ces trois choses demeurent : la foi, l’espérance, la charité ; mais la plus grande de ces choses, c’est la charité.'
      ],
      csExtract: [['1 Co 13:13', 'Нынѣ же пребываетъ вѣра, надежда, любы, три сія: большая же сихъ любы.']]
    },
    {
      id: 'romains8', ref: 'Rm 8:31-39', title: 'Rien ne peut nous séparer de l’amour de Dieu', group: 'Épîtres', tags: ['espérance', 'amour'],
      intro: 'Sommet de l’épître aux Romains. Paul y proclame que la victoire du Christ rend inébranlable l’amour de Dieu pour l’homme.',
      fr: [
        'Que dirons-nous donc à l’égard de ces choses ? Si Dieu est pour nous, qui sera contre nous ?',
        'Lui qui n’a point épargné son propre Fils, mais qui l’a livré pour nous tous, comment ne nous donnera-t-il pas aussi toutes choses avec lui ?',
        'Qui accusera les élus de Dieu ? C’est Dieu qui justifie !',
        'Qui les condamnera ? Christ est mort ; bien plus, il est ressuscité, il est à la droite de Dieu, et il intercède pour nous.',
        'Qui nous séparera de l’amour du Christ ? Sera-ce la tribulation, ou l’angoisse, ou la persécution, ou la faim, ou la nudité, ou le péril, ou l’épée ?',
        'Mais dans toutes ces choses nous sommes plus que vainqueurs par celui qui nous a aimés.',
        'Car j’ai l’assurance que ni la mort ni la vie, ni les anges ni les dominations, ni le présent ni l’avenir, ni les puissances, ni la hauteur, ni la profondeur, ni aucune autre créature, ne pourra nous séparer de l’amour de Dieu manifesté en Jésus-Christ notre Seigneur.'
      ]
    }
    ,
    {
      id: 'ps129', ref: 'Ps 129 (130)', title: 'Du fond de l’abîme', group: 'Psaumes', tags: ['repentir', 'pardon', 'défunts', 'carême', 'de profundis'],
      intro: 'Le cri du pécheur qui espère dans le pardon. Un des psaumes les plus priés dans le repentir et pour les défunts : on attend Dieu comme la sentinelle attend l’aurore.',
      fr: [
        'Des profondeurs j’ai crié vers toi, Seigneur ; Seigneur, écoute ma voix.',
        'Que tes oreilles soient attentives à la voix de ma supplication.',
        'Si tu retiens les iniquités, Seigneur, Seigneur, qui subsistera ?',
        'Mais près de toi est le pardon :',
        'à cause de ton nom, je t’ai attendu, Seigneur ; mon âme a attendu ta parole,',
        'mon âme a espéré dans le Seigneur,',
        'depuis la garde du matin jusqu’à la nuit ; depuis la garde du matin, qu’Israël espère dans le Seigneur.',
        'Car près du Seigneur est la miséricorde, et auprès de lui une abondante rédemption,',
        'et lui-même rachètera Israël de toutes ses iniquités.'
      ],
      cs: [
        'Из глубины воззвахъ къ Тебѣ, Господи, Господи, услыши глас мой.',
        'Да будутъ уши Твои внемлющи гласу моленія моего.',
        'Аще беззаконія назриши, Господи, Господи, кто постоитъ?',
        'Яко у Тебе очищеніе есть:',
        'имене ради Твоего потерпѣхъ Тя, Господи, потерпѣ душа моя въ слово Твое:',
        'уповаше душа моя на Господа,',
        'отъ стражи утреннія до нощи, отъ стражи утреннія да уповаетъ Израиль на Господа:',
        'яко отъ Господа милость, и многое у Него избавленіе,',
        'и Той избавитъ Израиля отъ всѣхъ беззаконій его.'
      ]
    },
    {
      id: 'ps102', ref: 'Ps 102 (103)', title: 'Bénis le Seigneur, ô mon âme', group: 'Psaumes', tags: ['louange', 'miséricorde', 'liturgie', 'antienne'],
      intro: 'Le psaume de la reconnaissance, chanté comme première antienne de la Divine Liturgie dans l’usage byzantin. Il énumère les bienfaits de Dieu : pardon, guérison, rédemption, compassion de père.',
      fr: [
        'Bénis le Seigneur, ô mon âme, et que tout ce qui est en moi bénisse son saint nom.',
        'Bénis le Seigneur, ô mon âme, et n’oublie aucun de ses bienfaits.',
        'Il pardonne toutes tes iniquités, il guérit toutes tes maladies,',
        'il délivre ta vie de la corruption, il te couronne de miséricorde et de tendresse,',
        'il comble de biens ton désir : ta jeunesse se renouvelle comme celle de l’aigle.',
        'Le Seigneur fait œuvre de miséricorde, il rend justice à tous ceux qu’on opprime.',
        'Il a fait connaître ses voies à Moïse, ses volontés aux fils d’Israël.',
        'Le Seigneur est compatissant et miséricordieux, lent à la colère et riche en bonté.',
        'Il ne se mettra pas en colère jusqu’à la fin, il ne gardera pas rancune pour toujours.',
        'Il ne nous a pas traités selon nos iniquités, il ne nous a pas rendu selon nos péchés.',
        'Car autant le ciel est élevé au-dessus de la terre, autant le Seigneur a affermi sa miséricorde sur ceux qui le craignent.',
        'Autant l’orient est loin de l’occident, autant il a éloigné de nous nos iniquités.',
        'Comme un père a compassion de ses fils, le Seigneur a compassion de ceux qui le craignent,',
        'car il connaît la glaise dont nous sommes faits : il s’est souvenu que nous sommes poussière.',
        'L’homme, ses jours sont comme l’herbe, il fleurit comme la fleur des champs :',
        'un souffle passe sur lui, et il n’est plus, et son lieu ne le reconnaît plus.',
        'Mais la miséricorde du Seigneur est de toujours à toujours sur ceux qui le craignent, et sa justice sur les fils de leurs fils,',
        'sur ceux qui gardent son alliance et se souviennent de ses commandements pour les accomplir.',
        'Le Seigneur a établi son trône dans le ciel, et son règne domine sur tout.',
        'Bénissez le Seigneur, vous tous ses anges, puissants en force, qui accomplissez sa parole en écoutant la voix de ses paroles.',
        'Bénissez le Seigneur, toutes ses puissances, ses serviteurs qui faites sa volonté.',
        'Bénissez le Seigneur, toutes ses œuvres, en tout lieu de sa domination : bénis le Seigneur, ô mon âme.'
      ],
      cs: [
        'Благослови, душе моя, Господа, и вся внутренняя моя имя святое Его.',
        'Благослови, душе моя, Господа, и не забывай всѣхъ воздаяній Его:',
        'очищающаго вся беззаконія твоя, исцѣляющаго вся недуги твоя,',
        'избавляющаго отъ истлѣнія животъ твой, вѣнчающаго тя милостію и щедротами,',
        'исполняющаго во благихъ желаніе твое: обновится яко орля юность твоя.',
        'Творяй милостыни Господь и судъ всѣмъ обидимымъ.',
        'Сказа пути Своя Моисеови, сыномъ Израилевымъ хотѣнія Своя.',
        'Щедръ и милостивъ Господь, долготерпѣливъ и многомилостивъ.',
        'Не до конца прогнѣвается, ни во вѣкъ враждуетъ.',
        'Не по беззакониемъ нашымъ сотворилъ есть намъ, ниже по грѣхомъ нашымъ воздалъ есть намъ.',
        'Яко по высотѣ небесней отъ земли, утвердилъ есть Господь милость Свою на боящихся Его:',
        'елико удалени суть востоцы отъ западъ, удали отъ насъ беззаконія наша.',
        'Якоже щедритъ отецъ сыны, ущедри Господь боящихся Его:',
        'яко Той позна создание наше, помяну, яко персть есмы.',
        'Человѣкъ, яко трава дніе его, яко цвѣтъ селный, тако отцвѣтетъ:',
        'яко духъ пройде въ немъ, и не будетъ, и не познаетъ ктому мѣста своего.',
        'Милость же Господня отъ вѣка и до вѣка на боящихся Его, и правда Его на сынѣхъ сыновъ,',
        'хранящихъ завѣтъ Его, и помнящихъ заповѣди Его, творити я.',
        'Господь на небеси уготова престолъ Свой, и Царствіе Его всѣми обладаетъ.',
        'Благословите Господа, вси Ангели Его, сильніи крѣпостію, творящіи слово Его, услышати глас словесъ Его.',
        'Благословите Господа, вся силы Его, слуги Его, творящіи волю Его.',
        'Благословите Господа, вся дѣла Его, на всякомъ мѣстѣ владычества Его: благослови, душе моя, Господа.'
      ]
    },
    {
      id: 'enfant-prodigue', ref: 'Lc 15:11-32', title: 'Le Fils prodigue', group: 'Évangiles', tags: ['parabole', 'pardon', 'repentir', 'père', 'carême', 'retour'],
      intro: 'Évangile du dimanche de l’Enfant prodigue, qui ouvre le Triode et prépare au Grand Carême. Moins l’histoire d’un fils que celle d’un Père qui court à la rencontre : Dieu n’attend pas que nous soyons dignes, il nous accueille.',
      fr: [
        'Il dit encore : Un homme avait deux fils.',
        'Le plus jeune dit à son père : Père, donne-moi la part de bien qui doit me revenir. Et le père leur partagea son bien.',
        'Peu de jours après, le plus jeune fils, ayant tout rassemblé, partit pour un pays lointain, où il dissipa son bien en vivant dans la débauche.',
        'Après qu’il eut tout dépensé, une grande famine survint dans ce pays, et il commença à manquer de tout.',
        'Il alla s’attacher à l’un des habitants du pays, qui l’envoya dans ses champs garder les porcs.',
        'Il aurait bien voulu se rassasier des gousses que mangeaient les porcs, mais personne ne lui en donnait.',
        'Rentré en lui-même, il se dit : Combien d’ouvriers de mon père ont du pain en abondance, et moi, ici, je meurs de faim !',
        'Je me lèverai, j’irai vers mon père et je lui dirai : Père, j’ai péché contre le ciel et devant toi ;',
        'je ne suis plus digne d’être appelé ton fils ; traite-moi comme l’un de tes ouvriers.',
        'Il se leva et alla vers son père. Comme il était encore loin, son père le vit et fut ému de compassion ; il courut, se jeta à son cou et le couvrit de baisers.',
        'Le fils lui dit : Père, j’ai péché contre le ciel et devant toi ; je ne suis plus digne d’être appelé ton fils.',
        'Mais le père dit à ses serviteurs : Apportez vite la plus belle robe et revêtez-l’en ; mettez un anneau à son doigt et des sandales à ses pieds.',
        'Amenez le veau gras, tuez-le ; mangeons et réjouissons-nous,',
        'car mon fils que voici était mort, et il est revenu à la vie ; il était perdu, et il est retrouvé. Et ils commencèrent à se réjouir.',
        'Or le fils aîné était aux champs. À son retour, près de la maison, il entendit la musique et les danses.',
        'Il appela un des serviteurs et lui demanda ce que c’était.',
        'Celui-ci lui dit : Ton frère est revenu, et ton père a tué le veau gras, parce qu’il l’a retrouvé en bonne santé.',
        'Il se mit en colère et ne voulait pas entrer. Son père sortit et le supplia.',
        'Mais il répondit à son père : Voilà tant d’années que je te sers sans jamais avoir transgressé un de tes ordres, et jamais tu ne m’as donné un chevreau pour me réjouir avec mes amis.',
        'Et quand ton fils que voici arrive, après avoir dévoré ton bien avec des prostituées, tu as tué pour lui le veau gras !',
        'Le père lui dit : Mon enfant, tu es toujours avec moi, et tout ce qui est à moi est à toi.',
        'Il fallait bien se réjouir et faire fête, car ton frère que voici était mort, et il est revenu à la vie ; il était perdu, et il est retrouvé.'
      ],
      csExtract: [
        ['Lc 15:18', 'Воставъ пойду ко отцу моему, и реку ему: отче, согрѣшихъ на небо и предъ тобою, и ктому нѣсмь достоинъ нарещися сынъ твой: сотвори мя яко единаго отъ наемникъ твоихъ.'],
        ['Lc 15:20', 'Еще же сущу ему далече, видѣ его отецъ его, и милосердова, и тече, и паде на выю его, и облобза его.'],
        ['Lc 15:24', 'Яко сей сынъ мой мертвъ бѣ, и оживе: и погибъ бѣ, и обрѣтеся.']
      ]
    },
    {
      id: 'is53', ref: 'Is 53:1-12', title: 'Le Serviteur souffrant', group: 'Ancien Testament', tags: ['passion', 'prophétie', 'agneau', 'semaine sainte', 'vendredi saint'],
      intro: 'La prophétie la plus claire de la Passion, lue pendant la Semaine sainte. Les Pères y reconnaissent le Christ conduit comme un agneau à l’abattoir, qui porte nos péchés. Texte selon la Septante, comme dans l’Église.',
      fr: [
        'Seigneur, qui a cru à ce que nous avons entendu ? Et le bras du Seigneur, à qui a-t-il été révélé ?',
        'Nous avons annoncé devant lui : il est comme un enfant, comme une racine dans une terre desséchée ; il n’avait ni forme ni éclat ; nous l’avons vu, et il n’avait ni apparence ni beauté.',
        'Mais son aspect était sans honneur, défait plus que celui de tous les fils des hommes ; homme sous les coups, qui sait supporter la souffrance, car son visage est détourné ; il a été méprisé et nous ne l’avons pas estimé.',
        'Il porte nos péchés et souffre pour nous ; et nous, nous l’avons tenu pour un homme en peine, frappé et maltraité.',
        'Mais lui a été blessé à cause de nos péchés et broyé à cause de nos iniquités ; le châtiment qui nous donne la paix est sur lui, et par ses meurtrissures nous avons été guéris.',
        'Nous nous sommes tous égarés comme des brebis, chacun s’est égaré dans sa voie ; et le Seigneur l’a livré pour nos péchés.',
        'Maltraité, il n’ouvre pas la bouche ; comme une brebis il a été mené à l’abattoir, comme un agneau muet devant celui qui le tond, ainsi il n’ouvre pas la bouche.',
        'Dans son humiliation, son jugement a été enlevé. Sa génération, qui la racontera ? Car sa vie est enlevée de la terre ; à cause des iniquités de mon peuple il a été conduit à la mort.',
        'Je donnerai les méchants pour sa sépulture et les riches pour sa mort, parce qu’il n’a pas commis d’iniquité, et qu’il n’y a pas eu de tromperie dans sa bouche.',
        'Le Seigneur veut le purifier de sa plaie. Si vous offrez votre vie pour le péché, votre âme verra une longue postérité.',
        'Le Seigneur veut retirer son âme de la peine, lui montrer la lumière, le former par l’intelligence, justifier le Juste qui sert bien la multitude, et il portera lui-même leurs péchés.',
        'C’est pourquoi il aura la multitude en héritage et il partagera les dépouilles des forts, parce que son âme a été livrée à la mort et qu’il a été compté parmi les iniques ; lui-même a porté les péchés de beaucoup, et à cause de leurs péchés il a été livré.'
      ],
      csExtract: [
        ['Is 53:5', 'Той язвенъ бысть за грѣхи наша, и мученъ бысть за беззаконія наша: наказаніе мира нашего на Немъ, язвою Его мы изцѣлѣхомъ.'],
        ['Is 53:7', 'Яко овча на заколеніе веденъ бысть, и яко агнецъ прямо стригущаго его безгласенъ, такъ не отверзаетъ устъ своихъ.']
      ]
    }
  ];
})();
