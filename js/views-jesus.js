/* Prière de Jésus : une corde de prière (komboskini) à 33, 50 ou 100 nœuds.
   Chaque appui remplit une bille. Pas de statistiques : seulement la corde, comme dans la main. */
(function () {
  const O = window.ORTHO, K = O.core, U = K.U;
  const { S, esc, route } = K;
  S.jesus = Object.assign({ rope: 33, cur: 0, vib: true, snd: true, breath: false }, S.jesus || {});
  const J = () => S.jesus;
  const ROPES = [[33, '33'], [50, '50'], [100, '100']];

  const prayer = O.PRAYERS.find((p) => p.id === 'jesus') || {};
  const frLine = prayer.fr || 'Seigneur Jésus-Christ, Fils de Dieu,\naie pitié de moi, pécheur.';
  const csLine = prayer.cs || 'Господи Іисусе Христе, Сыне Божій,\nпомилуй мя грѣшнаго.';

  /* corde : un anneau de billes ; une croix à la jonction, en haut */
  function ropeSvg(n, cur) {
    const C = 170, R = 138, gap = 16; // centre, rayon, ouverture (degrés) pour la croix
    const r = n <= 33 ? 8.2 : n <= 50 ? 5.8 : 3.4;
    let beads = '';
    for (let i = 0; i < n; i++) {
      const a = (-90 + gap / 2 + (i * (360 - gap)) / (n - 1)) * (Math.PI / 180);
      const x = (C + R * Math.cos(a)).toFixed(1), y = (C + R * Math.sin(a)).toFixed(1);
      beads += `<g class="bd ${i < cur ? 'lit' : ''} ${i === cur ? 'now' : ''}" data-i="${i}" transform="translate(${x} ${y})"><circle class="bd-off" r="${r}"/><circle class="bd-on" r="${r}" fill="url(#gBead)"/></g>`;
    }
    return `<svg class="rope-svg" viewBox="0 0 340 340" aria-hidden="true">
      <defs><radialGradient id="gBead" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff3c4"/><stop offset=".45" stop-color="#f0cd7a"/><stop offset="1" stop-color="#a8741a"/></radialGradient></defs>
      <circle class="cord" cx="${C}" cy="${C}" r="${R}"/>
      <g class="rope-cross" transform="translate(${C} ${C - R - 4})"><path d="M0-17v34M-9-9h18M-6 5l12-4"/></g>
      ${beads}
    </svg>`;
  }

  function view() {
    const j = J();
    const html = `<section class="page jesus">
      ${U.pageHead('Іисусова молитва', 'Prière de Jésus', 'Ta corde de prière : une bille pour chaque prière.')}
      <div class="rope-wrap" id="ropeWrap">
        <div id="ropeBox">${ropeSvg(j.rope, j.cur)}</div>
        <button class="rope-btn" id="ropeBtn" data-act="jesus-tap" aria-label="Une prière de plus"><span class="rope-n" id="ropeN">${j.cur} / ${j.rope}</span></button>
      </div>
      <div class="row center jbar">
        <button class="btn small ghost" data-act="jesus-undo">Une bille en arrière</button>
        <button class="btn small ghost" data-act="jesus-reset">Recommencer le tour</button>
        <button class="btn small ghost ${j.vib ? 'on' : ''}" data-act="jesus-vib" aria-pressed="${j.vib}">Vibration ${j.vib ? 'activée' : 'coupée'}</button>
      </div>
      <div class="breath ${j.breath ? 'on' : ''}" id="breathBox" aria-live="polite">${j.breath ? '<span class="b-in">Inspire : Seigneur Jésus-Christ, Fils de Dieu</span><span class="b-out">Expire : aie pitié de moi, pécheur</span>' : ''}</div>

      <article class="card jprayer">
        <p class="fr">${esc(frLine).replace(/\n/g, '<br>')}</p>
        <p class="cs" data-act="speak" data-text="${esc(csLine.replace(/\n/g, ' '))}">${esc(csLine).replace(/\n/g, '<br>')}</p>
      </article>

      <article class="card set">
        <div class="card-k">Ma corde</div>
        <div class="set-row"><div><b>Nombre de nœuds</b><span class="muted small">Le tour est terminé quand toutes les billes sont remplies.</span></div>${U.seg(ROPES.map(([v, l]) => [String(v), l]), String(j.rope), 'jesus-rope')}</div>
        <div class="set-row"><div><b>Son de la bille</b><span class="muted small">Un petit claquement de bois à chaque prière.</span></div><button class="switch ${j.snd ? 'on' : ''}" data-act="jesus-snd" role="switch" aria-checked="${j.snd}"></button></div>
        <div class="set-row"><div><b>Guide de respiration</b><span class="muted small">Inspirer sur la première moitié, expirer sur la seconde.</span></div><button class="switch ${j.breath ? 'on' : ''}" data-act="jesus-breath" role="switch" aria-checked="${j.breath}"></button></div>
        <p class="muted xs">L’écran reste allumé pendant que tu pries sur cette page.</p>
      </article>

      <article class="card">
        <div class="card-k">À propos de cette prière</div>
        <p>${esc(prayer.note || '')}</p>
        <div class="row"><a class="btn small ghost" href="#/theo/priere-jesus">La Prière de Jésus et l’hésychasme</a><a class="btn small ghost" href="#/prayer/jesus">Lecture mot à mot</a></div>
        <p class="center">${O.askBtn ? O.askBtn('Prière de Jésus', 'La Prière de Jésus : Seigneur Jésus-Christ, Fils de Dieu, aie pitié de moi, pécheur. Elle se dit avec la corde de prière (komboskini), au rythme de la respiration.') : ''}</p>
      </article>
    </section>`;
    return { html, title: 'Prière de Jésus', nav: 'jesus', after: keepAwake };
  }
  route('/jesus', view);

  /* écran allumé pendant la prière */
  let lock = null;
  async function keepAwake() {
    try { if ('wakeLock' in navigator && !lock) { lock = await navigator.wakeLock.request('screen'); lock.addEventListener('release', () => { lock = null; }); } } catch (e) { lock = null; }
  }
  window.addEventListener('hashchange', () => { if (lock && !/^#\/jesus/.test(location.hash)) { lock.release().catch(() => {}); lock = null; } });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && /^#\/jesus/.test(location.hash)) keepAwake(); });

  /* petit claquement de bois synthétisé (aucun fichier son) */
  let ac = null;
  function click(big) {
    if (!J().snd) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state === 'suspended') ac.resume();
      const t = ac.currentTime, o = ac.createOscillator(), g = ac.createGain(), f = ac.createBiquadFilter();
      o.type = 'triangle'; o.frequency.setValueAtTime(big ? 330 : 520, t); o.frequency.exponentialRampToValueAtTime(big ? 140 : 210, t + 0.07);
      f.type = 'lowpass'; f.frequency.value = 1800;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(big ? 0.5 : 0.32, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      o.connect(f); f.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + 0.13);
    } catch (e) { /* pas de son possible : on continue sans */ }
  }
  const vibrate = (ms) => { if (J().vib && navigator.vibrate) navigator.vibrate(ms); };

  function refresh(popIdx) {
    const j = J();
    document.querySelectorAll('#ropeBox .bd').forEach((g) => {
      const i = +g.dataset.i;
      g.classList.toggle('lit', i < j.cur); g.classList.toggle('now', i === j.cur);
      if (i === popIdx) { g.classList.remove('pop'); void g.getBoundingClientRect(); g.classList.add('pop'); }
    });
    const n = document.getElementById('ropeN'); if (n) n.textContent = j.cur + ' / ' + j.rope;
  }

  let finishing = false;
  K.act['jesus-tap'] = () => {
    const j = J(); keepAwake();
    if (finishing) return;
    j.cur++;
    if (j.cur >= j.rope) {
      // tour accompli : toute la corde s'allume, puis repart du début
      finishing = true; vibrate([60, 60, 140]); click(true);
      document.querySelectorAll('#ropeBox .bd').forEach((g) => g.classList.add('lit'));
      document.getElementById('ropeWrap')?.classList.add('done');
      K.toast('Un tour de corde accompli. Слава Тебѣ, Боже !');
      setTimeout(() => { j.cur = 0; K.save(); finishing = false; document.getElementById('ropeWrap')?.classList.remove('done'); refresh(); }, 1100);
    } else { vibrate(14); click(false); refresh(j.cur - 1); }
    K.save();
  };
  K.act['jesus-undo'] = () => { const j = J(); j.cur = j.cur > 0 ? j.cur - 1 : j.rope - 1; K.save(); refresh(); };
  K.act['jesus-reset'] = () => { J().cur = 0; K.save(); refresh(); };
  K.act['jesus-vib'] = () => { J().vib = !J().vib; K.save(); K.render(); };
  K.act['jesus-snd'] = () => { J().snd = !J().snd; K.save(); K.render(); if (J().snd) click(false); };
  K.act['jesus-breath'] = () => { J().breath = !J().breath; K.save(); K.render(); };
  K.act['jesus-rope'] = (el) => { J().rope = +el.dataset.v; J().cur = 0; K.save(); K.render(); };
})();
