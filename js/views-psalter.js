/* Le psautier en 20 kathismes (Septante, traduction Giguet) avec marque-page. */
(function () {
  const O = window.ORTHO, K = O.core, U = K.U;
  const { S, esc, route } = K;
  S.psalter = Object.assign({ k: 1, done: {} }, S.psalter || {});
  const P = () => S.psalter;
  const KATH = [[1, 8], [9, 16], [17, 23], [24, 31], [32, 36], [37, 45], [46, 54], [55, 63], [64, 69], [70, 76], [77, 84], [85, 90], [91, 100], [101, 104], [105, 108], [109, 117], [118, 118], [119, 133], [134, 142], [143, 150]];
  const label = (a, b) => (a === b ? 'Psaume ' + a : 'Psaumes ' + a + '–' + b);
  let data = null;
  const load = () => data || (data = fetch('bible/ps.json', { cache: 'no-cache' }).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }).catch((e) => { data = null; throw e; }));

  function indexView() {
    const p = P(), n = Object.keys(p.done).filter((k) => p.done[k]).length;
    const html = `<section class="page psalter">
      ${U.back('#/prayers', 'Prières')}
      ${U.pageHead('Псалтирь', 'Psautier', 'Les 150 psaumes divisés en 20 kathismes, comme dans l’Église orthodoxe.')}
      <article class="card"><p>Le psautier se lit en entier chaque semaine, et deux fois par semaine pendant le Grand Carême. L’ordre exact selon les jours dépend du typikon de ton Église : suis celui de ta paroisse. Ici, tu peux lire à ton rythme.</p>
        <div class="row"><a class="btn" href="#/psalter/${p.k}">${n ? 'Reprendre : kathisme ' + p.k : 'Commencer : kathisme 1'}</a></div>
        <p class="muted small">${n} kathisme${n > 1 ? 's' : ''} lu${n > 1 ? 's' : ''} sur 20.</p></article>
      <div class="cards psal-grid">${KATH.map(([a, b], i) => `<a class="card psal-k ${p.done[i + 1] ? 'ok' : ''} ${p.k === i + 1 ? 'cur' : ''}" href="#/psalter/${i + 1}"><b>Kathisme ${i + 1}</b><span class="muted small">${label(a, b)}</span>${p.done[i + 1] ? '<i class="psal-ok">✓</i>' : ''}</a>`).join('')}</div>
      <p class="muted xs center">Texte : Septante, traduction Giguet (domaine public), numérotation de la Septante.</p>
    </section>`;
    return { html, title: 'Psautier', nav: 'prayers' };
  }

  function kView(k) {
    k = +k;
    if (!(k >= 1 && k <= 20)) return { html: '<section class="page"><p>Kathisme introuvable.</p></section>', title: 'Psautier', nav: 'prayers' };
    if (!P().done[k]) { P().k = k; K.save(); } // le marque-page reste sur le prochain kathisme à lire
    const [a, b] = KATH[k - 1], prev = k > 1 ? '#/psalter/' + (k - 1) : '', next = k < 20 ? '#/psalter/' + (k + 1) : '';
    const done = !!P().done[k];
    const html = `<section class="page read" data-swipe>
      ${U.back('#/psalter', 'Psautier')}
      ${U.pageHead('Кафисма', 'Kathisme ' + k, label(a, b))}
      <div id="psBox" data-notrans><article class="card rtext"><p class="muted">Chargement…</p></article></div>
      <div class="row between rnav">${prev ? `<a class="btn small ghost" data-sw="prev" href="${prev}">‹ Kathisme ${k - 1}</a>` : '<span></span>'}${next ? `<a class="btn small ghost" data-sw="next" href="${next}">Kathisme ${k + 1} ›</a>` : '<span></span>'}</div>
      <p class="center"><button class="btn small ${done ? 'done' : ''}" data-act="psalter-done" data-k="${k}">${done ? 'Kathisme lu ✓' : 'J’ai lu ce kathisme'}</button></p>
    </section>`;
    const fail = () => { const box = document.getElementById('psBox'); if (box) box.innerHTML = '<article class="card"><p class="muted">Ce texte n’est pas encore enregistré sur l’appareil : connecte-toi une fois pour le charger (ou utilise « Textes bibliques hors ligne » dans les réglages).</p></article>'; };
    const after = () => load().then((d) => {
      let h = '';
      for (let n = a; n <= b; n++) h += `<article class="card rtext"><div class="card-k">Psaume ${n}</div>${(d[n - 1] || []).map((t, i) => (t ? `<p><sup>${i + 1}</sup>${esc(t)}</p>` : '')).join('')}</article>`;
      h += '<p class="center muted">Gloire au Père, et au Fils, et au Saint-Esprit, maintenant et toujours et dans les siècles des siècles. Amen.</p>';
      const box = document.getElementById('psBox'); if (box) box.innerHTML = h;
    }).catch(fail);
    return { html, title: 'Kathisme ' + k, nav: 'prayers', after };
  }

  K.act['psalter-done'] = (el) => {
    const k = +el.dataset.k, p = P();
    p.done[k] = !p.done[k];
    if (p.done[k]) p.k = k < 20 ? k + 1 : 1;
    if (Object.keys(p.done).filter((x) => p.done[x]).length === 20) { p.done = {}; K.toast('Psautier achevé : Слава Тебѣ, Боже !'); }
    K.save(); K.render();
  };
  route('/psalter', indexView);
  route('/psalter/:k', kView);
})();
