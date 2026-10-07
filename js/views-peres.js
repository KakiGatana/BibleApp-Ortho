/* Parole d'un Père du jour (accueil) et liste complète. */
(function () {
  const O = window.ORTHO, K = O.core, U = K.U;
  const { esc, route } = K;
  const C = O.cal;
  const pick = (date) => O.PERES[(C.dayOfYear(date) - 1) % O.PERES.length];
  const quote = (p) => `<blockquote class="pere"><p>« ${esc(p.t)} »</p><footer>— <b>${esc(p.a)}</b><span class="muted small"> · ${esc(p.s)}</span></footer></blockquote>`;
  const ask = (p) => (O.askBtn ? O.askBtn(p.a, 'Parole : « ' + p.t + ' » (' + p.a + ', ' + p.s + ')') : '');

  O.peresCard = (date) => {
    const p = pick(date);
    return `<article class="card pere-card"><div class="card-k">Parole d’un Père</div>${quote(p)}
      <div class="row"><a class="btn small ghost" href="#/peres">Toutes les paroles</a>${ask(p)}</div></article>`;
  };

  route('/peres', () => {
    const html = `<section class="page">
      ${U.back('#/today', 'Accueil')}
      ${U.pageHead('Отцы', 'Paroles des Pères', 'Quelques phrases des Pères de l’Église et des Pères du désert, à méditer.')}
      ${O.PERES.map((p) => `<article class="card">${quote(p)}<div class="row">${ask(p)}</div></article>`).join('')}
      <p class="muted xs center">Les formulations sont des traductions libres rendues de mémoire ; les références sont celles des éditions usuelles. Pour citer une phrase, vérifie-la dans une édition imprimée.</p>
    </section>`;
    return { html, title: 'Paroles des Pères', nav: 'theology' };
  });
})();
