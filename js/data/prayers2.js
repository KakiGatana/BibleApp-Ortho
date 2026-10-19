/* Prières du matin et du soir, dans l’ordre d’un livre de prières orthodoxe francophone.
   Textes en français seulement (le slavon n’est pas encore ajouté : l’appli n’affiche alors que le français). */
(function () {
  const O = (window.ORTHO = window.ORTHO || {});
  const M = 'Prières du matin', V = 'Prières du soir', B = 'Prières de base';
  O.PRAYERS.push(
    {
      id: 'debut-priere', title: 'Pour commencer', titleCs: '', cat: B, when: 'Tout début de la prière du matin et du soir',
      fr: 'Au nom du Père et du Fils et du Saint-Esprit. Amen.\nÔ Dieu, aie pitié de moi, pécheur. (3 fois)\nSeigneur Jésus-Christ, Fils de Dieu, par les prières de ta Mère très pure et de tous les saints, aie pitié de nous. Amen.',
      cs: '',
      note: 'On se tient devant les icônes, avec attention et crainte de Dieu, et on fait le signe de croix. À la fin de chaque prière, on se signe et on s’incline ; aux prières qui s’achèvent par la glorification de la Trinité, on fait une petite métanie. Le matin, après ces premières paroles, on marque une courte pause, jusqu’à ce que les sens fassent silence et que les pensées quittent ce qui est terrestre.'
    },
    {
      id: 'gloire-a-toi', title: 'Gloire à toi, ô notre Dieu', titleCs: '', cat: B, when: 'Prières initiales, avant le « Roi céleste »',
      fr: 'Gloire à toi, ô notre Dieu, gloire à toi.',
      cs: '',
      note: 'Brève doxologie qui ouvre les prières initiales. Pendant la période pascale, elle est omise avec le « Roi céleste », et remplacée par le tropaire de Pâques dit trois fois ; de l’Ascension à la veille de la Pentecôte, on commence directement par le Trisagion. Le « Roi céleste » revient le jour de la Pentecôte.'
    },
    {
      id: 'trinite-toute-sainte', title: 'Prière à la très sainte Trinité', titleCs: '', cat: B, when: 'Après le Trisagion, matin et soir',
      fr: 'Gloire au Père et au Fils et au Saint-Esprit, et maintenant et toujours, et dans les siècles des siècles. Amen.\nTrinité toute-sainte, aie pitié de nous ;\nSeigneur, purifie-nous de nos péchés ;\nMaître, pardonne nos iniquités ;\nSaint, visite-nous et guéris nos infirmités à cause de ton Nom.\nSeigneur, aie pitié. (3 fois)\nGloire au Père et au Fils et au Saint-Esprit, et maintenant et toujours, et dans les siècles des siècles. Amen.',
      cs: '',
      note: 'Dans cette prière, chaque Personne est invoquée par un titre : « Seigneur » pour le Fils, « Maître » pour le Père, « Saint » pour l’Esprit. On peut remplacer « Seigneur, aie pitié » par « Kyrie eleison ». Elle suit le Trisagion et précède le Notre Père.'
    },
    {
      id: 'tropaires-lever', title: 'Tropaires du lever', titleCs: '', cat: M, when: 'Prières du matin, après le Notre Père',
      fr: 'Réveillés du sommeil, nous nous prosternons devant toi, Dieu bon, et nous te chantons, ô Tout-Puissant, l’hymne des anges : Saint, Saint, Saint es-tu, ô Dieu. Par la Mère de Dieu, aie pitié de nous.\nGloire au Père et au Fils et au Saint-Esprit.\nTu m’as relevé de ma couche et du sommeil, Seigneur ; illumine mon esprit et mon cœur, et ouvre mes lèvres pour que je te chante, Trinité sainte : Saint, Saint, Saint es-tu, ô Dieu. Par la Mère de Dieu, aie pitié de nous.\nEt maintenant et toujours, et dans les siècles des siècles. Amen.\nSoudain le Juge viendra, et les actions de chacun seront dévoilées. C’est pourquoi, dans la crainte, nous te crions au milieu de la nuit : Saint, Saint, Saint es-tu, ô Dieu. Par la Mère de Dieu, aie pitié de nous.\nSeigneur, aie pitié. (12 fois)',
      cs: '',
      note: 'Trois tropaires : l’hymne des anges au réveil, la demande d’être illuminé, puis le rappel du Jugement, comme dans la parabole de l’époux qui vient au milieu de la nuit (Mt 25, 6).'
    },
    {
      id: 'priere-reveil', title: 'Action de grâces au réveil', titleCs: '', cat: M, when: 'Prières du matin, après les tropaires',
      fr: 'À mon réveil, je te rends grâce, ô sainte Trinité, car dans ta grande bonté et ton infinie patience, tu ne t’es pas irritée contre moi, pécheur et négligent que je suis, et tu ne m’as pas fait périr à cause de mes péchés ; mais tu as manifesté, selon ta coutume, ton amour pour les hommes, et alors que je gisais dans l’inconscience, tu m’as réveillé pour que je puisse veiller et glorifier ta puissance.\nEt maintenant, illumine les yeux de mon esprit et ouvre mes lèvres pour que je médite tes paroles, que je comprenne tes commandements et que j’accomplisse ta volonté, que je te chante en te confessant de tout cœur, et que je loue ton Nom très saint, Père et Fils et Saint-Esprit, maintenant et toujours, et dans les siècles des siècles. Amen.',
      cs: '',
      note: 'Prière de reconnaissance : on remercie avant de demander. Le réveil est reçu comme un don, non comme un dû.'
    },
    {
      id: 'psaume-50', title: 'Psaume 50 (51)', titleCs: '', cat: M, when: 'Prières du matin ; psaume de la pénitence',
      fr: 'Aie pitié de moi, ô Dieu, selon ta grande miséricorde, et dans ton immense compassion, efface mon péché.\nLave-moi de plus en plus de mon iniquité, et de mon péché purifie-moi.\nCar je connais mon iniquité et mon péché est constamment devant moi.\nContre toi seul j’ai péché et j’ai fait le mal sous tes yeux. Ainsi, tu seras trouvé juste en tes paroles, et tu seras vainqueur quand on te jugera.\nVois : dans l’iniquité j’ai été conçu, et dans les péchés ma mère m’a enfanté.\nMais tu aimes la vérité : tu m’as révélé les mystères et les secrets de ta sagesse.\nTu m’aspergeras avec l’hysope, et je serai purifié ; tu me laveras, et je deviendrai plus blanc que la neige.\nTu me feras entendre des paroles de joie et d’allégresse, et ils exulteront, les os humiliés.\nDétourne ta face de mes péchés, efface toutes mes iniquités.\nCrée en moi un cœur pur, ô Dieu, et renouvelle en ma poitrine un esprit droit.\nNe me rejette pas loin de ta face, et ne retire pas de moi ton Esprit-Saint.\nRends-moi la joie de ton salut, et fortifie-moi par l’Esprit souverain.\nJ’enseignerai tes voies aux pécheurs, et les impies reviendront vers toi.\nDélivre-moi du sang, ô Dieu, Dieu de mon salut, et ma langue exultera pour ta justice.\nSeigneur, ouvre mes lèvres, et ma bouche annoncera ta louange.\nSi tu avais voulu un sacrifice, je te l’aurais offert, mais tu ne prends aucun plaisir aux holocaustes.\nLe sacrifice qui convient à Dieu, c’est un esprit brisé ; un cœur broyé et humilié, Dieu ne le méprise point.\nAccorde tes bienfaits à Sion dans ta bienveillance, Seigneur, et que soient relevés les murs de Jérusalem ;\nalors tu prendras plaisir au sacrifice de justice, à l’oblation et aux holocaustes ; alors on offrira de jeunes taureaux sur ton autel.',
      cs: '',
      note: 'Psaume de David après sa faute (2 S 12). La numérotation est celle de la Septante : Ps 50 pour Ps 51 dans les Bibles hébraïques. Il se dit à chaque Orthros (office du matin) et, dans la prière quotidienne, il ouvre la journée par la repentance.'
    },
    {
      id: 'macaire-matin-1', title: 'Première prière de saint Macaire le Grand', titleCs: '', cat: M, when: 'Prières du matin, après le Symbole de la foi',
      fr: 'Ô Dieu, purifie-moi, pécheur, qui n’ai jamais rien fait de bien devant toi ; délivre-moi du Malin, et donne-moi d’accomplir ta volonté, afin que, sans encourir de condamnation, je puisse ouvrir mes lèvres indignes et louer ton saint Nom, Père et Fils et Saint-Esprit, maintenant et toujours, et dans les siècles des siècles. Amen.',
      cs: '',
      note: 'Saint Macaire l’Égyptien (IVe siècle), père du désert de Scété. Les prières « de saint Macaire » dans les livres de prières lui sont attribuées par la tradition.'
    },
    {
      id: 'macaire-matin-2', title: 'Deuxième prière de saint Macaire', titleCs: '', cat: M, when: 'Prières du matin, fin de la série',
      fr: 'À mon réveil, ô mon Sauveur, je t’offre ce cantique de minuit ; je me prosterne devant toi et je m’écrie : ne me laisse pas m’endormir dans la mort du péché, mais aie pitié de moi, toi qui as été crucifié volontairement ; hâte-toi de m’arracher à la torpeur de la négligence et sauve-moi, moi qui me tiens en ta présence et qui te supplie ; et après les ténèbres de la nuit, fais luire sur moi un jour sans péché, ô Christ-Dieu, et sauve-moi.',
      cs: '',
      note: 'Le « cantique de minuit » est l’hymne des anges, « Saint, Saint, Saint ». La prière demande un jour « sans péché », pas un jour facile.'
    },
    {
      id: 'tropaires-soir', title: 'Tropaires du soir', titleCs: '', cat: V, when: 'Prières du soir, après le Notre Père',
      fr: 'Aie pitié de nous, Seigneur, aie pitié de nous. N’ayant aucune défense à te présenter, nous t’offrons cette supplication, pécheurs que nous sommes, à toi, notre Maître : aie pitié de nous.\nGloire au Père et au Fils et au Saint-Esprit.\nSeigneur, aie pitié de nous ; en toi nous avons mis toute notre confiance. Ne t’irrite pas contre nous jusqu’à l’extrême, ne te souviens pas de nos fautes. Mais jette encore les yeux sur nous dans ta miséricorde et délivre-nous de nos ennemis. Car tu es notre Dieu et nous sommes ton peuple, nous sommes tous l’œuvre de tes mains, et c’est ton Nom que nous invoquons.\nEt maintenant et toujours, et dans les siècles des siècles. Amen.\nOuvre-nous la porte de la miséricorde, ô Mère bénie de Dieu, afin qu’espérant en toi, nous ne nous égarions pas, mais que nous soyons par toi délivrés de toute adversité, car tu es le salut du peuple chrétien.\nSeigneur, aie pitié. (12 fois)',
      cs: '',
      note: 'Le dernier tropaire se tourne vers la Mère de Dieu. Le deuxième s’inspire d’Isaïe 64, 8-9 (« nous sommes tous l’œuvre de tes mains »).'
    },
    {
      id: 'macaire-soir-1', title: 'Prière de saint Macaire (« Dieu éternel »)', titleCs: '', cat: V, when: 'Prières du soir',
      fr: 'Dieu éternel et Roi de toute la création, qui as daigné me conduire jusqu’à cette heure, pardonne-moi les péchés que j’ai commis en ce jour, en action, en paroles ou en pensées, et purifie, Seigneur, mon âme misérable de toute souillure de la chair et de l’esprit.\nAccorde-moi, Seigneur, durant cette nuit, un sommeil paisible, afin que, lorsque je me relèverai de mon humble couche, je puisse célébrer ton Nom d’une manière qui te plaise et terrasser tous les ennemis qui m’assaillent dans mon corps et dans mes pensées.\nDélivre-moi, Seigneur, des pensées vaines et des mauvais désirs qui me souillent.\nCar à toi appartiennent la royauté, la puissance et la gloire, Père et Fils et Saint-Esprit, maintenant et toujours, et dans les siècles des siècles. Amen.',
      cs: '',
      note: 'Première des grandes prières du soir : on remercie d’avoir été conduit jusqu’à la fin du jour, on demande pardon et on prépare le réveil.'
    },
    {
      id: 'antiochus-soir', title: 'Prière de saint Antiochus', titleCs: '', cat: V, when: 'Prières du soir',
      fr: 'Seigneur tout-puissant, Verbe du Père, Jésus-Christ, toi qui possèdes toute perfection, dans ta miséricorde infinie, ne me délaisse jamais, moi, ton serviteur, mais repose toujours en moi.\nÔ Jésus, bon pasteur de tes brebis, ne m’abandonne pas au serpent rebelle, et ne me laisse pas à la merci de Satan, car le germe de la corruption est en moi.\nC’est pourquoi, Seigneur Dieu, à qui revient l’adoration, Roi très saint, Jésus-Christ, Source de la sainteté, protège-moi dans mon sommeil par ta divine lumière, ton Saint-Esprit, par qui tu as sanctifié tes disciples.\nÀ moi aussi, ton indigne serviteur, Seigneur, accorde le salut tandis que je me repose.\nIllumine mon esprit par la lumière de la compréhension de ton saint Évangile.\nIllumine mon âme par l’amour de ta Croix.\nIllumine mon cœur par la pureté de ta parole.\nIllumine mon corps par le souvenir de ta Passion.\nQue toutes mes pensées soient protégées par ton humilité ineffable.\nPuis, en temps opportun, relève-moi pour que je te glorifie. Car tu es glorifié au-dessus de tout, avec ton Père sans commencement et ton très saint Esprit, dans tous les siècles. Amen.',
      cs: '',
      note: 'Attribuée à saint Antiochus, moine de Palestine (VIIe siècle). La série « Illumine mon esprit, mon âme, mon cœur, mon corps » consacre chaque partie de la personne.'
    },
    {
      id: 'esprit-soir', title: 'Prière au Saint-Esprit (examen de la journée)', titleCs: '', cat: V, when: 'Prières du soir',
      fr: 'Seigneur, Roi céleste, Consolateur, Esprit de vérité, manifeste ta miséricorde envers ton serviteur, et aie pitié du pécheur que je suis.\nÀ moi qui suis indigne, pardonne tous les péchés que j’ai commis en ce jour comme un homme – pas même comme un homme, mais pire qu’une bête –, volontairement ou non, consciemment ou par ignorance, à cause de ma jeunesse ou d’une mauvaise éducation, par impudence ou découragement.\nSi j’ai juré par ton Nom ou l’ai blasphémé en pensée ; si j’ai outragé quelqu’un ou l’ai calomnié dans ma colère, si je l’ai chagriné ou me suis emporté pour quelque raison ; si j’ai menti, si j’ai dormi mal à propos, si j’ai méprisé le pauvre venant à moi, si j’ai provoqué ou attristé mon frère, si je l’ai condamné ou me suis vanté ou enorgueilli ;\nsi, me tenant en prière, mon esprit s’est égaré dans les perversités de ce monde ou dans des pensées de débauche ; si j’ai mangé ou bu sans mesure, ou si j’ai ri inconsidérément ; si j’ai entretenu des pensées mauvaises, ou si, ayant regardé la beauté d’autrui, j’en fus blessé dans mon cœur ;\nsi j’ai eu des propos inconvenants, si je me suis moqué des péchés de mon frère, alors que les miens sont innombrables ; si j’ai négligé la prière ou commis quelque autre mal que j’ai oublié – car tout cela je l’ai fait, et bien plus encore –, aie pitié de moi, ô mon Créateur et Maître, moi, ton serviteur paresseux et indigne.\nEfface, remets et pardonne mes fautes, toi qui es bon et ami des hommes, afin qu’en paix je me couche, je dorme et me repose, prodigue, misérable que je suis, et que je puisse adorer, chanter et glorifier ton Nom très vénérable, avec le Père et son Fils unique, maintenant et toujours, et dans les siècles. Amen.',
      cs: '',
      note: 'Une confession quotidienne : elle passe en revue la journée (paroles, pensées, regards, nourriture, rires, prière négligée). Les formules très dures (« pire qu’une bête ») expriment l’humilité de celui qui prie et ne sont pas une description littérale de soi à croire telle quelle.'
    },
    {
      id: 'macaire-soir-2', title: 'Seconde prière de saint Macaire (« Que t’offrirai-je »)', titleCs: '', cat: V, when: 'Prières du soir, avant les dernières prières',
      fr: 'Que t’offrirai-je, ou que te rendrai-je, toi le grand Bienfaiteur, le Roi immortel, le Seigneur longanime et ami des hommes ? Alors que j’ai négligé les œuvres qui te plaisent et n’ai rien fait de bon, tu m’as conduit au terme de cette journée, disposant mon âme à la conversion et au salut.\nAie compassion du pécheur que je suis, dépourvu de toute œuvre bonne ; relève mon âme déchue et souillée de péchés qui dépassent toute mesure. Éloigne de moi toute pensée mauvaise ayant trait à cette existence visible.\nÔ toi qui seul es sans péché, pardonne les fautes que j’ai commises en ce jour envers toi, consciemment ou par ignorance, en parole, en action et en pensée, avec tous mes sens. Toi-même, protège-moi et garde-moi de toute menée de l’adversaire, par ta divine puissance et ton ineffable amour pour les hommes.\nPurifie-moi, ô Dieu, de la multitude de mes péchés. Veuille, Seigneur, me délivrer des filets du Malin, sauve mon âme endolorie et couvre-moi de la lumière de ta face quand tu viendras dans la gloire.\nFais qu’à présent je m’endorme d’un sommeil paisible, exempt de condamnation, à l’abri de toute rêverie coupable. Garde sans trouble les pensées de ton serviteur, écarte toute action satanique, et illumine les yeux de mon cœur, pour qu’en la mort je ne m’endorme pas.\nEnvoie ton ange de paix, guide et gardien de mon âme et de mon corps, pour qu’il me délivre de mes ennemis et que, levé de ma couche, je t’offre des prières d’actions de grâces.\nOui, Seigneur, exauce le pécheur que je suis, ton serviteur privé de volonté et de conscience. Donne-moi, au réveil, d’être instruit par ta parole ; que, chassée par tes anges, la tristesse démoniaque s’éloigne de moi ; qu’ainsi je bénisse ton saint Nom ; que j’exalte et glorifie Marie, la très sainte Mère de Dieu, que tu nous as donnée, à nous pécheurs, comme un secours, et reçois ses supplications en notre faveur.\nJe sais, en effet, que son amour des hommes est semblable au tien et qu’elle ne cesse d’intercéder pour nous. Par ses prières, par le signe de la précieuse Croix et par l’intercession de tous tes saints, garde mon âme indigente, Jésus-Christ, notre Dieu, car tu es saint et glorifié dans les siècles. Amen.',
      cs: '',
      note: 'La plus longue prière du soir. Elle se termine en confiant la nuit à l’ange gardien, à la Croix et à l’intercession de la Mère de Dieu et des saints.'
    },
    {
      id: 'prieres-nuit', title: 'Prière pour une nuit paisible', titleCs: '', cat: V, when: 'Prières du soir, tout dernier moment avant de dormir',
      fr: 'Seigneur notre Dieu, dans ta bonté et ton amour des hommes, pardonne-moi tous les péchés que j’ai commis en ce jour, en paroles, en action ou en pensée, accorde-moi un sommeil paisible et calme ; envoie-moi ton ange gardien pour me garder et me protéger à l’abri de tout mal.\nCar tu es le gardien de nos âmes et de nos corps, et nous te rendons gloire, Père et Fils et Saint-Esprit, maintenant et toujours, et dans les siècles des siècles. Amen.',
      cs: '',
      note: 'Courte prière à dire en se couchant. Dans le livre dont s’inspire l’appli, elle est suivie d’autres prières (par exemple « Ô notre Dieu, en qui nous croyons… ») que cette version ne reprend pas.'
    }
  );
})();
