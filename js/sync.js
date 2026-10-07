/* Sauvegarde et synchronisation entre appareils, par code secret (via le serveur de worker/) */
(function () {
  const O = window.ORTHO, K = O.core;
  const { S, esc } = K;
  const CFG = window.BLAGOVEST_PUSH || {};
  const FIELDS = ['fav', 'notes', 'cards', 'done', 'visits', 'quiz', 'mile', 'jesus'];
  S.sync = S.sync || {};

  const ok = () => !!CFG.server;
  const url = (p) => CFG.server.replace(/\/$/, '') + p;
  const ALPHA = 'abcdefghjkmnpqrstuvwxyz23456789';
  function newCode() {
    const r = crypto.getRandomValues(new Uint8Array(16));
    const s = Array.from(r, (b) => ALPHA[b % ALPHA.length]).join('');
    return s.match(/.{4}/g).join('-');
  }
  const normCode = (c) => String(c || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '').match(/.{1,4}/g);
  const fmtCode = (c) => { const g = normCode(c); return g ? g.join('-') : ''; };

  async function post(path, body) {
    const r = await fetch(url(path), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.message || 'Erreur ' + r.status);
    return j;
  }

  const snapshot = () => { const d = {}; FIELDS.forEach((k) => { d[k] = S[k]; }); d.style = S.settings.style; d.t = Date.now(); return d; };

  async function upload(quiet) {
    if (!S.sync.code) return;
    try {
      await post('/backup/put', { code: S.sync.code, data: JSON.stringify(snapshot()) });
      S.sync.last = new Date().toISOString(); K.save();
      if (!quiet) K.toast('Sauvegarde envoyée');
    } catch (e) { if (!quiet) K.toast(e.message || 'Sauvegarde impossible'); }
  }

  // fusion : on garde ce qui existe des deux côtés (favoris réunis, notes et progression les plus complètes)
  function merge(remote) {
    const uniq = (a, b) => Array.from(new Set([...(a || []), ...(b || [])]));
    S.fav = uniq(S.fav, remote.fav);
    S.visits = uniq(S.visits, remote.visits).sort().slice(-400);
    S.notes = Object.assign({}, remote.notes || {}, S.notes || {});
    S.quiz = Object.assign({}, remote.quiz || {}, S.quiz || {});
    S.mile = Object.assign({}, remote.mile || {}, S.mile || {});
    const done = Object.assign({}, remote.done || {});
    Object.keys(S.done || {}).forEach((d) => { done[d] = Object.assign({}, done[d] || {}, S.done[d]); });
    S.done = done;
    const cards = Object.assign({}, remote.cards || {});
    Object.keys(S.cards || {}).forEach((i) => { const a = S.cards[i], b = cards[i]; cards[i] = !b || (a.n || 0) >= (b.n || 0) ? a : b; });
    S.cards = cards;
    if (remote.jesus && remote.jesus.days) { S.jesus = S.jesus || { days: {} }; const d = Object.assign({}, remote.jesus.days); Object.keys(S.jesus.days || {}).forEach((k) => { d[k] = Math.max(d[k] || 0, S.jesus.days[k]); }); S.jesus.days = d; }
  }

  async function download(code) {
    const r = await post('/backup/get', { code });
    const remote = JSON.parse(r.data);
    merge(remote); K.save();
    return r.t;
  }

  function card() {
    if (!ok()) return '';
    const c = S.sync.code;
    return `<article class="card set">
      <div class="card-k">Mes appareils : sauvegarde</div>
      <p class="muted small">Retrouve tes favoris, notes et ta progression sur un autre téléphone ou ordinateur, ou après une réinstallation. Un code secret relie tes appareils : ne le partage pas, il donne accès à tes notes.</p>
      ${c ? `<p class="center">Mon code : <b class="sync-code" id="syncCode">${esc(fmtCode(c))}</b></p>
        <p class="muted xs center">${S.sync.last ? 'Dernier envoi : ' + new Date(S.sync.last).toLocaleString('fr-FR') : 'Pas encore envoyée'} · l’envoi se refait tout seul chaque jour.</p>
        <div class="row center"><button class="btn small" data-act="sync-up">Sauvegarder maintenant</button><button class="btn small ghost" data-act="sync-down">Récupérer</button><button class="btn small ghost danger" data-act="sync-forget">Oublier ce code</button></div>`
      : `<div class="row center"><button class="btn" data-act="sync-create">Créer mon code et sauvegarder</button></div>
        <p class="muted small center">Tu as déjà un code sur un autre appareil ?</p>
        <div class="row center"><input id="syncJoin" class="sel sync-in" placeholder="xxxx-xxxx-xxxx-xxxx" autocomplete="off" autocapitalize="off" spellcheck="false"><button class="btn small" data-act="sync-join">Récupérer</button></div>`}
    </article>`;
  }

  K.act['sync-create'] = async () => { S.sync.code = newCode(); K.save(); await upload(); K.render(); };
  K.act['sync-up'] = async () => { await upload(); K.render(); };
  K.act['sync-down'] = async () => {
    if (!confirm('Fusionner la sauvegarde du serveur avec cet appareil ? Rien n’est supprimé : les favoris et notes des deux côtés sont réunis.')) return;
    try { const t = await download(S.sync.code); K.toast('Sauvegarde du ' + new Date(t).toLocaleDateString('fr-FR') + ' récupérée'); K.render(); } catch (e) { K.toast(e.message); }
  };
  K.act['sync-join'] = async () => {
    const el = document.getElementById('syncJoin'), code = fmtCode(el && el.value);
    if (code.length < 19) return K.toast('Code incomplet');
    try { await download(code); S.sync.code = code; S.sync.last = new Date().toISOString(); K.save(); K.toast('Appareil relié, données récupérées'); K.render(); } catch (e) { K.toast(e.message); }
  };
  K.act['sync-forget'] = () => { if (confirm('Oublier ce code sur cet appareil ? Ta sauvegarde reste sur le serveur tant que tu connais le code.')) { delete S.sync.code; delete S.sync.last; K.save(); K.render(); } };

  // envoi automatique discret, au plus une fois par jour
  setTimeout(() => {
    if (!S.sync.code || !navigator.onLine) return;
    if (!S.sync.last || Date.now() - new Date(S.sync.last).getTime() > 20 * 3600 * 1000) upload(true);
  }, 4000);

  O.sync = { card, upload };
})();
