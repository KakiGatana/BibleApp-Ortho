/* Son d'ambiance facultatif : un bourdon (ison) généré par l'appli, ou ton propre fichier audio enregistré sur l'appareil.
   Il ne démarre jamais tout seul : le navigateur exige un geste, et c'est aussi plus respectueux. */
(function () {
  const O = window.ORTHO, K = O.core, U = K.U;
  const { S, esc } = K;
  S.ambient = Object.assign({ mode: 'ison', vol: 0.35, note: 'D' }, S.ambient || {});
  const A = () => S.ambient;
  const NOTES = { D: ['Ré', 146.83], G: ['Sol', 98.0], A: ['La', 110.0] };

  let ctx = null, master = null, nodes = [], audio = null, objUrl = '', playing = false, fileName = '';

  /* ---------- fichier de l'utilisateur (IndexedDB) ---------- */
  const db = () => new Promise((res, rej) => { const r = indexedDB.open('blagovest-amb', 1); r.onupgradeneeded = () => r.result.createObjectStore('f'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  const dbGet = async () => { try { const d = await db(); return await new Promise((res) => { const q = d.transaction('f').objectStore('f').get('file'); q.onsuccess = () => res(q.result || null); q.onerror = () => res(null); }); } catch (e) { return null; } };
  const dbPut = async (v) => { const d = await db(); return new Promise((res, rej) => { const t = d.transaction('f', 'readwrite'); t.objectStore('f').put(v, 'file'); t.oncomplete = res; t.onerror = () => rej(t.error); }); };
  const dbDel = async () => { try { const d = await db(); d.transaction('f', 'readwrite').objectStore('f').delete('file'); } catch (e) { /* rien */ } };

  /* ---------- bourdon synthétisé ---------- */
  function impulse(c) {
    const len = c.sampleRate * 3.2, b = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    return b;
  }
  function startIson() {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    stopIson(true);
    const f0 = NOTES[A().note][1], t = ctx.currentTime;
    master = ctx.createGain(); master.gain.setValueAtTime(0.0001, t); master.gain.exponentialRampToValueAtTime(Math.max(0.001, A().vol * 0.5), t + 3);
    const rev = ctx.createConvolver(); rev.buffer = impulse(ctx);
    const dry = ctx.createGain(); dry.gain.value = 0.55; const wet = ctx.createGain(); wet.gain.value = 0.7;
    master.connect(dry); master.connect(rev); rev.connect(wet); dry.connect(ctx.destination); wet.connect(ctx.destination);
    nodes = [master, rev, dry, wet];
    // plusieurs voix légèrement désaccordées, filtrées en « voyelle » ouverte
    [[1, 1, -7], [1, 0.8, 6], [2, 0.35, 3], [1.5, 0.16, -4]].forEach(([mult, g, cents]) => {
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f0 * mult; o.detune.value = cents;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; lp.Q.value = 0.4;
      const b1 = ctx.createBiquadFilter(); b1.type = 'bandpass'; b1.frequency.value = 650; b1.Q.value = 4;
      const b2 = ctx.createBiquadFilter(); b2.type = 'bandpass'; b2.frequency.value = 1050; b2.Q.value = 5;
      const gv = ctx.createGain(); gv.gain.value = g * 0.34;
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.07 + Math.random() * 0.08; const lg = ctx.createGain(); lg.gain.value = g * 0.1; lfo.connect(lg); lg.connect(gv.gain);
      o.connect(lp); lp.connect(b1); lp.connect(b2); b1.connect(gv); b2.connect(gv); gv.connect(master);
      o.start(); lfo.start(); nodes.push(o, lfo, lp, b1, b2, gv, lg);
    });
  }
  function stopIson(now) {
    if (!ctx || !master) return;
    const m = master, ns = nodes; master = null; nodes = [];
    try { m.gain.cancelScheduledValues(ctx.currentTime); m.gain.setValueAtTime(Math.max(0.0001, m.gain.value), ctx.currentTime); m.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (now ? 0.05 : 1.2)); } catch (e) { /* ok */ }
    setTimeout(() => ns.forEach((n) => { try { n.stop && n.stop(); n.disconnect(); } catch (e) { /* ok */ } }), now ? 80 : 1400);
  }

  /* ---------- lecture ---------- */
  async function start() {
    if (A().mode === 'file') {
      const rec = await dbGet();
      if (!rec) { K.toast('Choisis d’abord un fichier audio'); return false; }
      if (audio) { audio.pause(); URL.revokeObjectURL(objUrl); }
      objUrl = URL.createObjectURL(rec.blob); audio = new Audio(objUrl); audio.loop = true; audio.volume = A().vol;
      try { await audio.play(); } catch (e) { K.toast('Lecture impossible avec ce fichier'); return false; }
      fileName = rec.name;
    } else { startIson(); }
    playing = true; pill(); return true;
  }
  function stop() {
    if (audio) { audio.pause(); }
    stopIson(false); playing = false; pill();
  }
  function setVol(v) {
    A().vol = v; K.save();
    if (audio) audio.volume = v;
    if (master && ctx) master.gain.setTargetAtTime(Math.max(0.001, v * 0.5), ctx.currentTime, 0.15);
  }

  /* ---------- pastille flottante (pause rapide) ---------- */
  function pill() {
    let p = document.getElementById('ambPill');
    if (!playing) { if (p) p.remove(); return; }
    if (!p) { p = document.createElement('button'); p.id = 'ambPill'; p.className = 'amb-pill'; p.setAttribute('data-act', 'amb-stop'); p.setAttribute('aria-label', 'Arrêter le son d’ambiance'); document.body.appendChild(p); }
    p.innerHTML = '♪ <span>Ambiance · arrêter</span>';
  }

  /* ---------- feuille de réglage ---------- */
  function sheet() {
    const a = A();
    K.openSheet(`<h2 class="sheet-title">Son d’ambiance</h2>
      <p class="muted small">Un fond sonore discret, que tu peux couper à tout moment. Il ne démarre jamais seul.</p>
      <div class="set-row"><div><b>Source</b></div>${U.seg([['ison', 'Bourdon (ison)'], ['file', 'Mon fichier']], a.mode, 'amb-mode')}</div>
      <div id="ambIson" ${a.mode === 'ison' ? '' : 'hidden'}>
        <div class="set-row"><div><b>Note</b><span class="muted small">Le bourdon est généré par l’appli, sans fichier ni connexion.</span></div>${U.seg(Object.entries(NOTES).map(([k, v]) => [k, v[0]]), a.note, 'amb-note')}</div>
      </div>
      <div id="ambFile" ${a.mode === 'file' ? '' : 'hidden'}>
        <p class="muted small">Choisis un fichier audio de ton téléphone (un chant que tu possèdes, par exemple). Il reste sur ton appareil et se lit en boucle, même sans connexion.</p>
        <p class="amb-name" id="ambName" data-notrans>${esc(fileName || 'Aucun fichier choisi')}</p>
        <div class="row"><label class="btn small ghost amb-pick">Choisir un fichier<input type="file" id="ambPick" accept="audio/*" hidden></label><button class="btn small ghost" data-act="amb-clear">Retirer</button></div>
      </div>
      <div class="set-row"><div><b>Volume</b></div><input type="range" id="ambVol" min="0.05" max="1" step="0.05" value="${a.vol}" aria-label="Volume du son d’ambiance"></div>
      <div class="row center"><button class="btn" data-act="${playing ? 'amb-stop' : 'amb-start'}" id="ambGo">${playing ? 'Arrêter' : 'Lancer'}</button></div>`);
    dbGet().then((rec) => { if (rec) { fileName = rec.name; const n = document.getElementById('ambName'); if (n) n.textContent = rec.name; } });
  }
  const reopen = () => { K.closeSheet && K.closeSheet(); setTimeout(sheet, 260); };

  K.act['ambient'] = sheet;
  K.act['amb-mode'] = (el) => { A().mode = el.dataset.v; K.save(); if (playing) stop(); reopen(); };
  K.act['amb-note'] = (el) => { A().note = el.dataset.v; K.save(); if (playing && A().mode === 'ison') startIson(); reopen(); };
  K.act['amb-start'] = async () => { if (await start()) { const g = document.getElementById('ambGo'); if (g) { g.textContent = 'Arrêter'; g.setAttribute('data-act', 'amb-stop'); } } };
  K.act['amb-stop'] = () => { stop(); const g = document.getElementById('ambGo'); if (g) { g.textContent = 'Lancer'; g.setAttribute('data-act', 'amb-start'); } };
  K.act['amb-clear'] = async () => { stop(); await dbDel(); fileName = ''; const n = document.getElementById('ambName'); if (n) n.textContent = 'Aucun fichier choisi'; K.toast('Fichier retiré'); };
  document.addEventListener('input', (e) => { if (e.target && e.target.id === 'ambVol') setVol(+e.target.value); });
  document.addEventListener('change', async (e) => {
    if (!e.target || e.target.id !== 'ambPick') return;
    const f = e.target.files && e.target.files[0]; if (!f) return;
    if (f.size > 80 * 1024 * 1024) { K.toast('Fichier trop volumineux (80 Mo maximum)'); return; }
    try { await dbPut({ name: f.name, blob: f }); fileName = f.name; const n = document.getElementById('ambName'); if (n) n.textContent = f.name; K.toast('Fichier enregistré'); } catch (err) { K.toast('Enregistrement impossible sur cet appareil'); }
  });

  /* carte dans les réglages */
  O.ambientCard = () => `<article class="card set"><div class="card-k">Son d’ambiance</div>
    <p class="muted small">Un bourdon discret (ison) généré par l’appli, ou ton propre fichier audio. À toi de le lancer et de l’arrêter.</p>
    <div class="row center"><button class="btn small" data-act="ambient">Ouvrir</button></div></article>`;
})();
