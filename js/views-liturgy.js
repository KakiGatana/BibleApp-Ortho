/* La Divine Liturgie (saint Jean Chrysostome) pas à pas : ce qui se passe, ce qui se dit, ce que je fais.
   L'ordre peut varier selon la paroisse, la fête et le typikon. */
(function () {
  const O = window.ORTHO, K = O.core, U = K.U;
  const { S, esc, route } = K;
  S.liturgy = Object.assign({ cur: 0 }, S.liturgy || {});

  /* [partie, titre, ce qui se passe, [[fr, slavon]…] (ce qu'on dit ou chante), ce que je fais] */
  const STEPS = [
    ['Avant l’office', 'La proscomidie', `Avant le début de l’office, le prêtre prépare le pain et le vin dans l’autel, en priant pour les vivants et pour les défunts. Tu n’as rien à faire : tu peux arriver à ce moment pour allumer une bougie et vénérer les icônes.`, [], `Allume une bougie, vénère l’icône de l’entrée, puis place-toi. Il est bon d’arriver avant le début.`],
    ['Liturgie des catéchumènes', 'La bénédiction initiale', `Le prêtre ouvre l’office en proclamant le Royaume de Dieu. Tout le reste se déroule à l’intérieur de ce Royaume.`, [['Béni soit le Royaume du Père, et du Fils, et du Saint-Esprit, maintenant et toujours et dans les siècles des siècles.', ''], ['Amen.', 'Аминь.']], `Debout. Fais le signe de la croix à « Amen ».`],
    ['Liturgie des catéchumènes', 'La grande litanie', `Le diacre (ou le prêtre) invite à prier pour la paix, pour l’Église, pour les autorités et pour les malades. À chaque demande, le chœur répond.`, [['En paix, prions le Seigneur.', ''], ['Seigneur, aie pitié.', 'Господи, помилуй.']], `Debout, tête légèrement inclinée. Tu peux te signer à chaque « Seigneur, aie pitié », comme tu le sens.`],
    ['Liturgie des catéchumènes', 'Les antiennes et les Béatitudes', `Des psaumes et les Béatitudes (Mt 5) sont chantés. Selon les paroisses, il peut y avoir plus ou moins de textes.`, [['Venez, adorons et prosternons-nous devant le Christ.', 'Приидите, поклонимся и припадемъ ко Христу.']], `Tu peux écouter ou chanter avec le chœur. Reste debout, ou assis si tu en as besoin (il n’y a pas de honte à s’asseoir).`],
    ['Liturgie des catéchumènes', 'La petite entrée', `Le prêtre sort de l’autel en portant l’Évangile et le présente à l’assemblée. C’est la venue du Christ qui enseigne.`, [['Sagesse ! Debout !', 'Премудрость, прости!']], `Debout et incline-toi quand l’Évangile passe, puis fais le signe de la croix.`],
    ['Liturgie des catéchumènes', 'Les tropaires et le Trisagion', `On chante le tropaire de la fête ou du saint du jour, puis le Trisagion, hymne à la Trinité.`, [['Dieu saint, Saint Fort, Saint Immortel, aie pitié de nous.', 'Святый Боже, Святый Крѣпкій, Святый Безсмертный, помилуй насъ.']], `Signe de la croix et inclinaison à chaque « Saint » (trois fois), comme le fait l’assemblée.`],
    ['Liturgie des catéchumènes', 'Les lectures : l’Épître et l’Évangile', `Un lecteur proclame l’Épître (un texte des Actes ou des lettres des apôtres), puis le prêtre ou le diacre lit l’Évangile du jour.`, [['Sagesse ! Debout ! Écoutons le saint Évangile.', ''], ['Soyons attentifs.', 'Вонмемъ.'], ['Gloire à toi, Seigneur, gloire à toi.', 'Слава Тебѣ, Господи, слава Тебѣ.']], `Debout pour l’Évangile, en silence. Tu peux faire le signe de la croix au début et à la fin.`],
    ['Liturgie des catéchumènes', 'L’homélie', `Le prêtre explique les lectures et les applique à la vie. Elle peut venir ici ou à la fin de l’office, selon les paroisses.`, [], `Tu peux t’asseoir si l’usage de ta paroisse le permet, ou rester debout.`],
    ['Liturgie des catéchumènes', 'Les litanies et le renvoi des catéchumènes', `On prie encore pour les besoins de tous. Dans l’usage ancien, on priait pour les catéchumènes, qui sortaient avant la suite. Aujourd’hui, on les garde souvent présents : demande à ta paroisse.`, [['Catéchumènes, inclinez la tête devant le Seigneur.', ''], ['Seigneur, aie pitié.', 'Господи, помилуй.']], `Si tu es catéchumène, incline la tête. Tu peux rester, selon les usages de ta paroisse : la suite de l’office n’est pas interdite à ta présence.`],
    ['Liturgie des fidèles', 'Le chant des chérubins et la grande entrée', `Les dons du pain et du vin sont portés en procession dans l’église, à travers l’assemblée, jusqu’à l’autel, pendant que le chœur chante.`, [['Nous qui représentons mystiquement les chérubins…', '']], `Debout, tête inclinée. L’usage est de se signer quand les dons passent : fais comme l’assemblée.`],
    ['Liturgie des fidèles', 'Le baiser de paix et le Symbole de foi', `On s’exhorte à l’amour mutuel, puis tous chantent ou disent le Credo (le Symbole de Nicée-Constantinople).`, [['Aimons-nous les uns les autres, afin que d’un même cœur nous confessions…', ''], ['Je crois en un seul Dieu, le Père tout-puissant…', 'Вѣрую во единаго Бога Отца Вседержителя…']], `Debout. Tu peux dire le Credo avec l’assemblée.`],
    ['Liturgie des fidèles', 'L’anaphore', `C’est le cœur de l’office : l’offrande eucharistique. Le prêtre rend grâce, rappelle la dernière Cène, et invoque l’Esprit Saint sur les dons (l’épiclèse) afin qu’ils deviennent le Corps et le Sang du Christ.`, [['Élevons nos cœurs. — Nous les tournons vers le Seigneur.', ''], ['Il est digne et juste d’adorer le Père, le Fils et le Saint-Esprit.', 'Достойно и праведно есть…'], ['Saint, Saint, Saint, le Seigneur Sabaoth…', '']], `Debout, en prière silencieuse. Les prosternations dépendent de l’usage (on les évite le dimanche).`],
    ['Liturgie des fidèles', 'Le « Il est digne » et la mémoire des saints', `Après l’épiclèse, on chante un hymne à la Mère de Dieu. Le prêtre commémore les saints, les vivants et les défunts.`, [['Il est digne en vérité de te bénir, Mère de Dieu…', 'Достойно есть яко воистину блажити Тя, Богородицу…']], `Debout. Le prêtre prononce les noms des vivants et des défunts remis par les fidèles.`],
    ['Liturgie des fidèles', 'Le Notre Père', `Tous prient ensemble la prière que le Christ a enseignée, en préparation de la communion.`, [['Notre Père, qui es aux cieux…', 'Отче нашъ, иже еси на небесѣхъ…']], `Debout. Dis la prière avec l’assemblée, à voix haute ou intérieurement.`],
    ['Liturgie des fidèles', 'L’élévation : « Les saints dons pour les saints »', `Le prêtre élève le pain consacré et proclame que les dons saints sont pour ceux qui sont saints, c’est-à-dire pour ceux qui vivent dans l’Église et qui se sont préparés.`, [['Les saints dons pour les saints.', ''], ['Un seul est saint, un seul est Seigneur : Jésus-Christ, à la gloire de Dieu le Père.', '']], `Debout. Si tu n’es pas encore baptisé, tu ne communies pas : c’est normal.`],
    ['Liturgie des fidèles', 'La communion', `Le prêtre sort avec le calice. Les fidèles préparés (baptisés orthodoxes, préparés par la prière, le jeûne eucharistique et la confession selon l’usage) s’approchent pour communier au Corps et au Sang du Christ.`, [['Approchez-vous avec crainte de Dieu, avec foi et avec amour.', ''], ['Béni soit celui qui vient au nom du Seigneur.', '']], `Si tu ne communies pas, reste à ta place, tête légèrement inclinée, et prie. Tu pourras recevoir ensuite le pain bénit.`],
    ['Liturgie des fidèles', 'L’action de grâces', `Après la communion, on remercie. Le prêtre dit la prière derrière l’ambon et bénit l’assemblée.`, [['Nous avons vu la vraie lumière, nous avons reçu l’Esprit céleste…', ''], ['Que le nom du Seigneur soit béni, dès maintenant et pour les siècles.', '']], `Debout. Remercie Dieu en silence.`],
    ['Fin de l’office', 'Le congé et l’antidoron', `Le prêtre congédie l’assemblée. On vénère la croix et on reçoit l’antidoron : du pain bénit, mais non consacré, que tout le monde peut recevoir, y compris les catéchumènes et les visiteurs.`, [['Allons en paix.', ''], ['Au nom du Seigneur.', '']], `Va vénérer la croix, reçois l’antidoron avec la main droite posée sur la gauche, et salue le prêtre. Beaucoup de paroisses ont ensuite un temps de rencontre : reste, c’est précieux.`]
  ];

  const noteTxt = `Ce déroulé suit la Divine Liturgie de saint Jean Chrysostome, célébrée la plupart des dimanches. L’ordre exact, les textes chantés et les usages (se signer, s’asseoir) varient selon la paroisse, la langue et la fête. La liturgie de saint Basile (quelques fois par an) a d’autres prières. Observe ce que fait l’assemblée, et n’hésite pas à poser la question au prêtre.`;

  function view() {
    const cur = Math.min(S.liturgy.cur, STEPS.length - 1);
    const html = `<section class="page liturgy">
      ${U.pageHead('Божественная литургія', 'La Divine Liturgie', 'Pas à pas : ce qui se passe, ce qui se dit, ce que je fais. Pour suivre l’office sans être perdu.')}
      <article class="card"><p class="muted small">${esc(noteTxt)}</p></article>
      <div class="lit-bar" id="litBar"><button class="btn small ghost" data-act="lit-prev" aria-label="Étape précédente">‹</button>
        <span id="litPos">Étape ${cur + 1} / ${STEPS.length}</span>
        <button class="btn small" data-act="lit-next" aria-label="Étape suivante">›</button></div>
      <ol class="lit-steps">${STEPS.map(([part, t, what, say, doit], i) => `
        <li class="lit-step ${i === cur ? 'cur' : ''}" data-i="${i}">
          <details ${i === cur ? 'open' : ''}><summary><span class="lit-n">${i + 1}</span><span><i class="lit-part">${esc(part)}</i><b>${esc(t)}</b></span></summary>
            <div class="lit-body">
              <p>${esc(what)}</p>
              ${say.length ? `<div class="lit-say"><b>On dit ou on chante</b>${say.map(([fr, cs]) => `<p>${esc(fr)}${cs ? `<span class="cs">${esc(cs)}</span>` : ''}</p>`).join('')}</div>` : ''}
              <div class="lit-do"><b>Ce que je fais</b><p>${esc(doit)}</p></div>
              <div class="row"><button class="btn small ghost" data-act="lit-here" data-i="${i}">Je suis ici</button>${O.askBtn ? O.askBtn(t, 'Divine Liturgie, étape : ' + t + '. ' + what) : ''}</div>
            </div></details></li>`).join('')}</ol>
    </section>`;
    return { html, title: 'La Divine Liturgie', nav: 'prayers', after: () => { const c = document.querySelector('.lit-step.cur'); if (c && S.liturgy.cur > 0) c.scrollIntoView({ block: 'center' }); } };
  }
  route('/liturgy', view);

  function go(i) {
    i = Math.max(0, Math.min(STEPS.length - 1, i)); S.liturgy.cur = i; K.save();
    document.querySelectorAll('.lit-step').forEach((el) => {
      const on = +el.dataset.i === i; el.classList.toggle('cur', on);
      const d = el.querySelector('details'); if (d) d.open = on;
    });
    const p = document.getElementById('litPos'); if (p) p.textContent = 'Étape ' + (i + 1) + ' / ' + STEPS.length;
    const c = document.querySelector('.lit-step.cur'); if (c) c.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
  K.act['lit-next'] = () => go(S.liturgy.cur + 1);
  K.act['lit-prev'] = () => go(S.liturgy.cur - 1);
  K.act['lit-here'] = (el) => go(+el.dataset.i);
})();
