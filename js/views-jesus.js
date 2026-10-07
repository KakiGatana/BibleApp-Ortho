/* Prière de Jésus : chapelet (tchotki) avec compteur, vibration, objectif du jour et historique */
(function () {
  const O = window.ORTHO, K = O.core, C = O.cal, U = K.U;
  const { S, esc, ic, route } = K;
  const DEF = { days: {}, rope: 33, goal: 100, cur: 0, vib: true };
  S.jesus = Object.assign({}, DEF, S.jesus || {});
  S.jesus.days = S.jesus.days || {};
  const J = () => S.jesus;
  const today = () => C.isoKey(C.today());
  const countOf = (iso) => J().days[iso] || 0;
  const ROPES = [[33, '33 nœuds'], [50, '50 nœuds'], [100, '100 nœuds']];
  const GOALS = [33, 100, 300, 500, 1000];

  // jours de suite avec au moins une prière de Jésus
  function streak() {
    let d = C.today(), n = 0;
    if (!countOf(C.isoKey(d))) d = C.addDays(d, -1);
    while (countOf(C.isoKey(d)) > 0) { n++; d = C.addDays(d, -1); }
    return n;
  }
  const total = () => Object.values(J().days).reduce((a, b) => a + b, 0);

  function week() {
    const out = [];
    for (let i = 6; i >= 0; i--) { const d = C.addDays(C.today(), -i); out.push([C.WD ? C.WD[d.getUTCDay()] : '', countOf(C.isoKey(d)), i === 0]); }
    return out;
  }

  const frLine = (O.PRAYERS.find((p) => p.id === 'jesus') || {}).fr || 'Seigneur Jésus-Christ, Fils de Dieu,\naie pitié de moi, pécheur.';
  const csLine = (O.PRAYERS.find((p) => p.id === 'jesus') || {}).cs || 'Господи Іисусе Христе, Сыне Божій,\nпомилуй мя грѣшнаго.';

  function view() {
    const j = J(), n = countOf(today()), pct = Math.min(100, Math.round((n / j.goal) * 100)), st = streak();
    const wk = week(), max = Math.max(10, ...wk.map((x) => x[1]));
    const html = `<section class="page jesus">
      ${U.pageHead('Іисусова молитва', 'Prière de Jésus', 'Une prière, un nœud : touche le bouton à chaque prière dite.')}

      <div class="beads-wrap">
        <button class="bead-btn" id="beadBtn" data-act="jesus-tap" aria-label="Une prière de plus">
          <span class="bead-n" id="beadN">${j.cur}</span>
          <span class="bead-of">sur ${j.rope}</span>
        </button>
        <div class="bead-ring" id="beadRing" aria-hidden="true">${beadRing(j.cur, j.rope)}</div>
      </div>

      <div class="row center jbar">
        <button class="btn small ghost" data-act="jesus-undo">− 1</button>
        <button class="btn small ghost" data-act="jesus-reset">Recommencer le tour</button>
        <button class="btn small ghost ${j.vib ? 'on' : ''}" data-act="jesus-vib" aria-pressed="${j.vib}">Vibration ${j.vib ? 'activée' : 'coupée'}</button>
      </div>

      <article class="card jprayer">
        <p class="fr">${esc(frLine).replace(/\n/g, '<br>')}</p>
        <p class="cs" data-act="speak" data-text="${esc(csLine.replace(/\n/g, ' '))}">${esc(csLine).replace(/\n/g, '<br>')}</p>
      </article>

      <article class="card">
        <div class="card-k">Aujourd’hui</div>
        <div class="jstats">
          <div><b id="jToday">${n}</b><span>prière${n > 1 ? 's' : ''} aujourd’hui</span></div>
          <div><b>${st}</b><span>jour${st > 1 ? 's' : ''} de suite</span></div>
          <div><b>${total()}</b><span>au total</span></div>
        </div>
        <div class="progress"><i id="jBar" style="width:${pct}%"></i></div>
        <p class="muted small"><span id="jGoalTxt">${n} / ${j.goal}</span> · objectif du jour</p>
        <div class="week">${wk.map(([l, v, now]) => `<span class="${v ? 'on' : ''}" title="${v}">${esc(String(l).slice(0, 1))}</span>`).join('')}</div>
      </article>

      <article class="card set">
        <div class="card-k">Réglages du chapelet</div>
        <div class="set-row"><div><b>Taille du chapelet</b><span class="muted small">Le tour est terminé après ce nombre de prières.</span></div>${U.seg(ROPES.map(([v, l]) => [String(v), l]), String(j.rope), 'jesus-rope')}</div>
        <div class="set-row"><div><b>Objectif du jour</b><span class="muted small">Pour suivre ta progression.</span></div><select class="sel" data-jesus-goal aria-label="Objectif du jour">${GOALS.map((g) => `<option value="${g}" ${g === j.goal ? 'selected' : ''}>${g} prières</option>`).join('')}</select></div>
        <p class="muted xs">L’écran reste allumé pendant que tu pries sur cette page.</p>
      </article>

      <article class="card">
        <div class="card-k">À propos de cette prière</div>
        <p>${esc((O.PRAYERS.find((p) => p.id === 'jesus') || {}).note || '')}</p>
        <div class="row"><a class="btn small ghost" href="#/theo/priere-jesus">La Prière de Jésus et l’hésychasme</a><a class="btn small ghost" href="#/prayer/jesus">Lecture mot à mot</a></div>
        <p class="center">${O.askBtn ? O.askBtn('Prière de Jésus', 'La Prière de Jésus : Seigneur Jésus-Christ, Fils de Dieu, aie pitié de moi, pécheur. Elle se dit avec le chapelet (tchotki), au rythme de la respiration.') : ''}</p>
      </article>
    </section>`;
    const after = () => { keepAwake(); };
    return { html, title: 'Prière de Jésus', nav: 'jesus', after };
  }
  route('/jesus', view);

  // anneau de perles : 12 repères qui s'allument au fil du tour
  function beadRing(cur, rope) {
    const N = 33, lit = Math.floor((cur / rope) * N);
    let out = '';
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2 - Math.PI / 2, r = 46;
      out += `<i class="${i < lit ? 'lit' : ''}" style="left:${50 + r * Math.cos(a)}%;top:${50 + r * Math.sin(a)}%"></i>`;
    }
    return out;
  }

  // garder l'écran allumé pendant la prière (quand le navigateur le permet)
  let lock = null;
  async function keepAwake() {
    try { if ('wakeLock' in navigator && !lock) { lock = await navigator.wakeLock.request('screen'); lock.addEventListener('release', () => { lock = null; }); } } catch (e) { lock = null; }
  }
  window.addEventListener('hashchange', () => { if (lock && !/^#\/jesus/.test(location.hash)) { lock.release().catch(() => {}); lock = null; } });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && /^#\/jesus/.test(location.hash)) keepAwake(); });

  const vibrate = (ms) => { if (J().vib && navigator.vibrate) navigator.vibrate(ms); };

  function refresh() {
    const j = J(), n = countOf(today()), pct = Math.min(100, Math.round((n / j.goal) * 100));
    const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    set('beadN', j.cur); set('jToday', n); set('jGoalTxt', n + ' / ' + j.goal);
    const bar = document.getElementById('jBar'); if (bar) bar.style.width = pct + '%';
    const ring = document.getElementById('beadRing'); if (ring) ring.innerHTML = beadRing(j.cur, j.rope);
  }

  K.act['jesus-tap'] = () => {
    const j = J(), t = today(); keepAwake();
    j.days[t] = countOf(t) + 1; j.cur++;
    const btn = document.getElementById('beadBtn'); if (btn) { btn.classList.remove('pulse'); void btn.offsetWidth; btn.classList.add('pulse'); }
    if (j.cur >= j.rope) {
      vibrate([60, 60, 120]); j.cur = 0;
      K.toast('Un tour de chapelet accompli. Слава Тебѣ, Боже !');
    } else vibrate(14);
    if (j.days[t] === j.goal) { K.toast('Objectif du jour atteint : ' + j.goal + ' prières. Слава Богу !'); vibrate([80, 60, 80, 60, 160]); }
    K.save(); refresh();
  };
  K.act['jesus-undo'] = () => {
    const j = J(), t = today();
    if (!countOf(t)) return K.toast('Rien à retirer aujourd’hui');
    j.days[t] = countOf(t) - 1; j.cur = j.cur > 0 ? j.cur - 1 : j.rope - 1;
    K.save(); refresh();
  };
  K.act['jesus-reset'] = () => { J().cur = 0; K.save(); refresh(); };
  K.act['jesus-vib'] = () => { J().vib = !J().vib; K.save(); K.render(); };
  K.act['jesus-rope'] = (el) => { J().rope = +el.dataset.v; J().cur = Math.min(J().cur, J().rope - 1); K.save(); K.render(); };
  document.addEventListener('change', (e) => { if (e.target.matches && e.target.matches('[data-jesus-goal]')) { J().goal = +e.target.value; K.save(); K.render(); } });

  O.jesus = { countOf, streak };
})();
