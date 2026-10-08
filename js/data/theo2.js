/* Distinctions théologiques, conciles et hérésies. Rédigé de mémoire à partir de sources patristiques et manuels usuels ;
   à vérifier pour toute citation. */
(function () {
  const O = window.ORTHO;

  /* t ; def ; pts ; refs */
  O.DISTINCTIONS = [
    { t: `Essence et énergies`, def: `En Dieu, on distingue l’essence (ousia), qui reste inconnaissable et imparticipable, et les énergies, qui sont Dieu lui-même agissant et se communiquant. Les énergies sont incréées : y participer, c’est participer à Dieu.`, pts: [
      `Fondée sur les Cappadociens (Basile : « nous connaissons notre Dieu par ses énergies, mais nous ne prétendons pas approcher son essence ») et sur saint Maxime le Confesseur.`,
      `Systématisée par saint Grégoire Palamas (XIVᵉ siècle) contre Barlaam de Calabre, qui disait que la lumière du Thabor était un phénomène créé. Conciles locaux de Constantinople : 1341, 1347, 1351.`,
      `Elle fonde la théosis : l’homme participe à la vie divine sans devenir Dieu par nature.`,
      `Critique latine : elle menacerait la simplicité divine. Réponse orthodoxe : la distinction est réelle mais n’introduit aucune division en Dieu, car toute l’énergie est la présence de tout Dieu.`
    ], refs: `Palamas, Triades pour la défense des saints hésychastes ; Vladimir Lossky, Théologie mystique de l’Église d’Orient.` },

    { t: `Ousia et hypostase`, def: `L’ousia désigne ce qu’est Dieu (sa nature, une et commune) ; l’hypostase désigne qui il est (chaque personne). En Dieu : une ousia, trois hypostases.`, pts: [
      `Nicée (325) affirme que le Fils est « consubstantiel » (homoousios) au Père.`,
      `Les Cappadociens (Basile, Grégoire de Nazianze, Grégoire de Nysse) distinguent clairement ousia et hypostase, et achèvent la doctrine trinitaire. Constantinople I (381) confirme.`,
      `Appliqué au Christ à Chalcédoine : une seule hypostase en deux natures.`
    ], refs: `Basile, Lettre 38 ; Grégoire de Nazianze, Discours théologiques.` },

    { t: `Monarchie du Père et Filioque`, def: `Pour la tradition orientale, le Père est l’unique principe (cause, archè) de la divinité : le Fils est engendré de lui et l’Esprit procède de lui seul. Le Fils participe à l’envoi de l’Esprit dans le temps.`, pts: [
      `Jn 15, 26 : « l’Esprit de vérité qui procède du Père ».`,
      `Distinction entre procession (ekporeusis), propre au Père, et envoi ou manifestation éternelle par le Fils (pempsis, ou « ekphansis »), défendue par Grégoire de Chypre au concile des Blachernes (1285).`,
      `Le Filioque, ajouté au Credo en Occident (Tolède, 589 ; Rome, 1014), est refusé pour des raisons de doctrine (confusion des personnes) et de méthode (ajout sans concile œcuménique).`
    ], refs: `Photius, Mystagogie du Saint-Esprit ; Grégoire de Chypre ; texte du Vatican (1995) sur la procession de l’Esprit.` },

    { t: `Union hypostatique et deux natures`, def: `Le Christ est une seule personne en deux natures, divine et humaine, « sans confusion, sans changement, sans division, sans séparation » (Chalcédoine, 451).`, pts: [
      `Chaque nature garde ses propriétés. On peut attribuer à la personne du Christ ce qui vient de l’une ou l’autre nature (communication des idiomes) : on peut dire « Dieu est mort sur la croix » au sens de la personne.`,
      `Cela fonde le titre de Théotokos (Éphèse, 431) : Marie est mère de la personne du Fils.`,
      `Les Églises non chalcédoniennes (coptes, arméniens, syriaques, éthiopiens) parlent d’une « nature composée » (miaphysisme). Des déclarations communes (années 1990) estiment que la différence est en grande partie verbale, mais l’unité n’est pas rétablie.`
    ], refs: `Cyrille d’Alexandrie, Lettres à Nestorius ; Tome de Léon ; Définition de Chalcédoine.` },

    { t: `Deux volontés, deux énergies du Christ`, def: `Le Christ a une volonté divine et une volonté humaine, qui s’accordent sans se confondre. Constantinople III (680-681) condamne le monothélisme (une seule volonté).`, pts: [
      `Saint Maxime le Confesseur (VIIᵉ siècle) a soutenu cette doctrine jusqu’à la mutilation et l’exil.`,
      `Enjeu : si le Christ n’avait pas de volonté humaine, la volonté humaine ne serait pas guérie. « Ce qui n’est pas assumé n’est pas guéri » (Grégoire de Nazianze).`,
      `L’agonie de Gethsémani (« non pas ma volonté, mais la tienne ») est la preuve que le Christ a une volonté humaine qui s’unit à la volonté divine.`
    ], refs: `Maxime le Confesseur, Disputation avec Pyrrhus.` },

    { t: `Théosis (divinisation)`, def: `But de la vie chrétienne : devenir par grâce ce que Dieu est par nature, participant de la vie divine, sans cesser d’être créature.`, pts: [
      `2 P 1, 4 : « participants de la nature divine ».`,
      `Athanase : « Dieu s’est fait homme afin que l’homme devienne dieu » (Sur l’Incarnation, 54).`,
      `Elle ne signifie pas devenir Dieu par essence (ce qui serait panthéisme) : la distinction essence/énergies la protège.`,
      `Elle passe par les sacrements, la prière, l’ascèse et l’amour du prochain.`
    ], refs: `Athanase ; Maxime le Confesseur ; Palamas.` },

    { t: `Synergie`, def: `Le salut est l’œuvre commune de la grâce de Dieu et de la liberté humaine : Dieu ne force pas, et l’homme ne se sauve pas seul.`, pts: [
      `Source : 1 Co 3, 9 (« collaborateurs de Dieu »).`,
      `Contre le pélagianisme (l’homme se sauve par ses forces) et contre un monergisme où l’homme ne coopère pas.`,
      `L’Orthodoxie ne suit pas la doctrine augustinienne de la prédestination ni de la grâce irrésistible.`
    ], refs: `Jean Cassien ; Maxime le Confesseur.` },

    { t: `Péché ancestral et culpabilité`, def: `Pour la tradition orientale, nous héritons de la mort et de la corruption d’Adam, et d’une inclination au péché, mais pas de sa culpabilité personnelle.`, pts: [
      `Rm 5, 12 : la Vulgate latine traduit « en qui tous ont péché » (lecture d’Augustin) ; les Pères grecs lisent « parce que tous ont péché » et soulignent la mort héritée plutôt que la faute héritée.`,
      `Les enfants sont baptisés pour entrer dans la vie de l’Église et la victoire sur la mort, non pour effacer une culpabilité propre.`,
      `Nuance : certains théologiens orthodoxes, dont Mgr Kallistos Ware, disent que la différence avec Augustin est réelle, mais moins tranchée qu’on ne le dit parfois.`
    ], refs: `Jean Romanidès, Le Péché ancestral ; Kallistos Ware, L’Orthodoxie.` },

    { t: `Apophatisme et cataphatisme`, def: `Deux voies de la théologie : dire ce que Dieu n’est pas (apophatique) et dire ce que Dieu est par analogie (cataphatique). La première a la priorité, car Dieu dépasse tout ce que nous pouvons dire.`, pts: [
      `Denys l’Aréopagite (Ve-VIe siècle), Théologie mystique ; Grégoire de Nysse, Vie de Moïse (Moïse entre dans la nuée).`,
      `La théologie apophatique n’est pas de l’agnosticisme : elle conduit à la communion avec Dieu, qui est au-delà des concepts.`,
      `Lossky : toute théologie doit finir en doxologie, c’est-à-dire en louange.`
    ], refs: `Denys, Noms divins et Théologie mystique ; Lossky.` },

    { t: `Logos et logoi (Maxime le Confesseur)`, def: `Chaque créature a un principe (logos) en Dieu, qui la fait exister et la tourne vers lui. L’ensemble des logoi est unifié dans le Logos, le Christ.`, pts: [
      `Cette vision donne un sens à la création : tout est appelé à la communion.`,
      `L’homme est le médiateur de la création, appelé à l’offrir à Dieu : c’est le sens liturgique et écologique de la théologie orthodoxe.`
    ], refs: `Maxime le Confesseur, Ambigua ; Lars Thunberg.` },

    { t: `Image et ressemblance`, def: `Selon la Genèse, l’homme est créé « à l’image » et « à la ressemblance » de Dieu (Gn 1, 26). Chez beaucoup de Pères, l’image est donnée (raison, liberté), la ressemblance est à acquérir (la sainteté).`, pts: [
      `Irénée de Lyon et Clément d’Alexandrie distinguent ces deux termes ; Maxime le Confesseur les développe.`,
      `Le péché abîme l’image et obscurcit la ressemblance, sans les détruire.`,
      `Le Christ, vraie image de Dieu, restaure en nous l’image.`
    ], refs: `Irénée, Contre les hérésies ; Maxime.` },

    { t: `Hésychasme et prière du cœur`, def: `Tradition de prière silencieuse et intérieure, où l’esprit descend dans le cœur et répète la Prière de Jésus, dans la paix (hésychia).`, pts: [
      `Racines : les Pères du désert, Évagre, Macaire ; saint Jean Climaque ; saint Syméon le Nouveau Théologien ; Grégoire le Sinaïte ; Palamas.`,
      `Les exercices corporels (respiration, posture) sont des aides secondaires, jamais le but. Le but est la rencontre avec Dieu.`,
      `Critique occidentale : danger d’illusion ou de technique. L’Église répond par la direction d’un père spirituel et par l’humilité.`
    ], refs: `La Philocalie ; Récits d’un pèlerin russe.` },

    { t: `Économie et théologie ; acribie et économie`, def: `Deux sens du mot « économie » (oikonomia). En théologie : l’action de Dieu dans l’histoire du salut, distincte de sa vie intime (théologie). En droit de l’Église : l’application souple et pastorale d’une règle (l’acribie est son application stricte).`, pts: [
      `Trinité économique et Trinité immanente : l’une est révélée dans l’histoire, l’autre est la vie éternelle de Dieu. Elles correspondent mais ne se confondent pas.`,
      `En droit canonique, l’économie s’emploie par exemple pour recevoir des convertis ou pour un remariage après un divorce. Elle n’abolit pas la règle, elle la vit avec miséricorde.`
    ], refs: `Georges Florovsky ; Kallistos Ware.` },

    { t: `Conciliarité (sobornost)`, def: `L’Église est une communion : l’autorité réside dans les conciles, où les évêques témoignent de la foi de toute l’Église, que le peuple reçoit ou non.`, pts: [
      `Les conciles œcuméniques ne sont pas « infaillibles » en eux-mêmes : ils le deviennent par leur réception dans l’Église (exemples : Ferrare-Florence, rejeté ; le « brigandage d’Éphèse » en 449, rejeté).`,
      `Le laïc a une vraie place : l’encyclique des patriarches orientaux de 1848 dit que le gardien de la foi est le peuple de l’Église tout entier.`,
      `Contraste avec l’infaillibilité du pape ex cathedra (Vatican I, 1870).`
    ], refs: `Encyclique des patriarches orientaux (1848) ; Alexis Khomiakov.` }
  ];

  /* Les sept conciles œcuméniques, et conciles locaux importants */
  O.COUNCILS = [
    { y: `325`, n: `Nicée I`, who: `Arius et l’arianisme : le Fils serait une créature, la première.`, res: `Le Fils est « consubstantiel » (homoousios) au Père. Premier Credo. Règles sur la date de Pâques.`, note: `Environ 300 évêques. Le mythe selon lequel Nicée aurait fixé le canon biblique ou « inventé » la divinité du Christ est faux : la divinité du Christ était déjà confessée avant Nicée.` },
    { y: `381`, n: `Constantinople I`, who: `Les « pneumatomaques » (qui niaient la divinité du Saint-Esprit) et l’apollinarisme.`, res: `Le Credo est complété sur le Saint-Esprit : « qui procède du Père », « adoré et glorifié avec le Père et le Fils ». Le Christ a une humanité complète.`, note: `Le Credo de Nicée-Constantinople est la base de la foi commune.` },
    { y: `431`, n: `Éphèse`, who: `Nestorius, patriarche de Constantinople, qui refusait à Marie le titre de Théotokos.`, res: `Marie est Théotokos (« mère de Dieu ») : le Fils né de Marie est Dieu. Le Christ est une seule personne.`, note: `Le nestorianisme au sens strict est débattu par les historiens : on discute de ce que Nestorius pensait réellement. L’Église de l’Orient (« assyrienne ») s’est séparée à cette occasion.` },
    { y: `451`, n: `Chalcédoine`, who: `L’eutychianisme (monophysisme) : la nature humaine du Christ serait absorbée par la divine.`, res: `Une personne en deux natures, sans confusion, sans changement, sans division, sans séparation. Canon 28 : égalité d’honneur entre Constantinople et Rome.`, note: `Les coptes, arméniens, syriaques et éthiopiens ne l’ont pas reçu : ce sont les Églises « orientales » non chalcédoniennes.` },
    { y: `553`, n: `Constantinople II`, who: `La querelle des « Trois Chapitres » ; l’origénisme (préexistence des âmes, restauration finale telle que l’enseignait Évagre).`, res: `Réaffirme Chalcédoine selon l’esprit de saint Cyrille. Condamne des thèses d’Origène.`, note: `Les historiens discutent la portée exacte de la condamnation d’Origène et de l’« apocatastase ». C’est pourquoi l’espérance du salut universel reste débattue.` },
    { y: `680-681`, n: `Constantinople III`, who: `Le monothélisme : une seule volonté dans le Christ.`, res: `Le Christ a deux volontés et deux énergies, divine et humaine. Le pape Honorius est condamné après sa mort pour avoir favorisé le monothélisme.`, note: `Saint Maxime le Confesseur (mort en 662) avait défendu cette doctrine.` },
    { y: `787`, n: `Nicée II`, who: `L’iconoclasme, qui interdisait les images.`, res: `La vénération des icônes est légitime, car Dieu s’est fait voir en Jésus-Christ. Distinction entre vénération (proskynèse) et adoration (latreia), réservée à Dieu.`, note: `Le Triomphe de l’Orthodoxie (premier dimanche du Carême, 843) commémore la restauration des icônes.` }
  ];

  O.COUNCILS_LOCAL = [
    { y: `879-880`, n: `Constantinople (Photius)`, t: `Confirme le Credo sans ajout. Considéré par beaucoup d’orthodoxes comme un huitième concile.` },
    { y: `1054`, n: `Excommunications mutuelles`, t: `Le légat Humbert et le patriarche Cérulaire s’excommunient. Levées en 1965.` },
    { y: `1204`, n: `Sac de Constantinople`, t: `Les croisés pillent la capitale orthodoxe ; la rupture devient presque irréparable.` },
    { y: `1274`, n: `Lyon II`, t: `Union imposée par l’empereur Michel VIII. Rejetée par le peuple et l’Église de Byzance.` },
    { y: `1341-1351`, n: `Conciles palamites`, t: `Reconnaissent la distinction essence/énergies et condamnent Barlaam et Akindynos.` },
    { y: `1439`, n: `Ferrare-Florence`, t: `Union avec Rome acceptée par la plupart des Grecs puis rejetée, notamment sous l’influence de saint Marc d’Éphèse.` },
    { y: `1672`, n: `Jérusalem (Dosithée)`, t: `Confession de foi orthodoxe face au calvinisme.` },
    { y: `2016`, n: `Concile de Crète`, t: `Concile panorthodoxe auquel quatre Églises (dont Antioche, Russie, Bulgarie, Géorgie) n’ont pas participé.` }
  ];

  /* nom ; qui / quoi ; thèse ; réponse */
  O.HERESIES = [
    { n: `Arianisme`, d: `Arius (IVᵉ s.)`, th: `Le Fils est une créature, subordonnée au Père : « il fut un temps où il n’était pas ».`, rep: `Nicée I (325) : homoousios. Athanase d’Alexandrie.` },
    { n: `Pneumatomachie`, d: `Macédonius (IVᵉ s.)`, th: `Le Saint-Esprit est une créature.`, rep: `Constantinople I (381). Basile, Grégoire de Nazianze.` },
    { n: `Sabellianisme (modalisme)`, d: `Sabellius (IIIᵉ s.)`, th: `Père, Fils et Esprit ne sont que trois « modes » ou masques d’une seule personne.`, rep: `Distinction des trois hypostases (Cappadociens).` },
    { n: `Apollinarisme`, d: `Apollinaire de Laodicée (IVᵉ s.)`, th: `Le Christ n’aurait pas d’esprit humain : le Logos en prend la place.`, rep: `Constantinople I. « Ce qui n’est pas assumé n’est pas guéri » (Grégoire de Nazianze).` },
    { n: `Nestorianisme`, d: `Nestorius (Ve s.)`, th: `Séparation excessive des deux natures ; refus du titre de Théotokos.`, rep: `Éphèse (431). Cyrille d’Alexandrie.` },
    { n: `Monophysisme (eutychianisme)`, d: `Eutychès (Ve s.)`, th: `Après l’union, une seule nature : la divine absorbe l’humaine.`, rep: `Chalcédoine (451).` },
    { n: `Monothélisme`, d: `Sergius, Pyrrhus (VIIᵉ s.)`, th: `Une seule volonté dans le Christ.`, rep: `Constantinople III (680-681). Maxime le Confesseur.` },
    { n: `Iconoclasme`, d: `Empereurs byzantins (VIIIᵉ-IXᵉ s.)`, th: `Les images sacrées seraient idolâtres.`, rep: `Nicée II (787). Jean Damascène, Théodore Studite.` },
    { n: `Pélagianisme`, d: `Pélage (Vᵉ s.)`, th: `L’homme peut se sauver par ses seules forces : la grâce n’est qu’une aide.`, rep: `Condamné à Carthage (418) et à Éphèse (431). Augustin en Occident ; Jean Cassien, formé en Orient (voie moyenne : synergie).` },
    { n: `Docétisme`, d: `Courants gnostiques (IIᵉ s.)`, th: `Le Christ n’aurait eu qu’une apparence de corps.`, rep: `Ignace d’Antioche, Irénée de Lyon (Contre les hérésies).` },
    { n: `Marcionisme`, d: `Marcion (IIᵉ s.)`, th: `Le Dieu de l’Ancien Testament serait différent et inférieur au Père de Jésus ; il rejetait l’Ancien Testament.`, rep: `Irénée ; fixation progressive du canon des Écritures.` },
    { n: `Montanisme`, d: `Montan (IIᵉ s.)`, th: `Nouvelles prophéties de l’Esprit, avec une rigueur extrême.`, rep: `Rejet par l’Église, qui garde l’autorité des apôtres.` },
    { n: `Origénisme`, d: `Évagre, certains disciples d’Origène (VIᵉ s.)`, th: `Préexistence des âmes, restauration finale de toute la création (tel qu’on l’enseignait alors).`, rep: `Constantinople II (553). Débat historique sur ce que pensait Origène lui-même.` }
  ];
})();
