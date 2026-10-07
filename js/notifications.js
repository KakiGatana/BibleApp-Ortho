/* Notifications : verset, saint du jour, prière du matin et du soir, fête du lendemain, cartes, série
   (Web Push, via le petit serveur de worker/) */
(function () {
  const O = window.ORTHO, K = O.core, C = O.cal;
  const { S } = K;
  const CFG = window.BLAGOVEST_PUSH || {};
  const DATA_CACHE = 'blagovest-data', DATA_URL = 'notif-data.json';

  const KINDS = [
    ['verse', 'Verset du jour', 'Le verset et sa méditation, chaque matin.', true, 7],
    ['saint', 'Saint du jour', 'Le saint ou la sainte que l’Église célèbre aujourd’hui.', false, 8],
    ['rulem', 'Rappel de la prière du matin', 'Si tu ne l’as pas encore cochée ce jour-là.', false, 6],
    ['rulee', 'Rappel de la prière du soir', 'Si tu ne l’as pas encore cochée ce jour-là.', false, 21],
    ['feast', 'Fête du lendemain', 'La veille des grandes fêtes : « Demain, la Transfiguration ».', true, 18],
    ['cards', 'Cartes de slavon à réviser', 'Quand des cartes sont à revoir.', false, 19],
    ['streak', 'Série en danger', 'Seulement si tu n’as pas encore ouvert l’appli ce jour-là.', true, 20]
  ];
  // migration de l'ancien format { verse, streak, vh, sh }
  const old = S.push || {};
  S.push = Object.assign({ on: false }, old);
  S.push.k = S.push.k || {};
  KINDS.forEach(([id, , , on, h]) => {
    if (!S.push.k[id]) S.push.k[id] = { on, h };
  });
  if (old.vh !== undefined && !old.k) {
    S.push.k.verse = { on: old.verse !== false, h: old.vh };
    S.push.k.streak = { on: old.streak !== false, h: old.sh !== undefined ? old.sh : 20 };
  }

  const supported = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window && /^https?:/.test(location.protocol);
  const configured = () => !!(CFG.server && CFG.vapidKey);
  const ios = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone = () => (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone;
  const perm = () => (supported() ? Notification.permission : 'unsupported');

  const b64 = (s) => { const p = '='.repeat((4 - (s.length % 4)) % 4), r = atob((s + p).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(r, (c) => c.charCodeAt(0)); };
  const reg = () => navigator.serviceWorker.ready;
  const getSub = async () => (await reg()).pushManager.getSubscription();

  const todayIso = () => C.isoKey(C.today());
  function dueCards() {
    const t = todayIso(); let n = 0;
    Object.keys(S.cards || {}).forEach((i) => { if (S.cards[i] && S.cards[i].d <= t) n++; });
    return n;
  }
  // dernière date où la règle (du matin / du soir) a été entièrement cochée
  function ruleDone(kind) {
    const total = (O.RULES && O.RULES[kind] && O.RULES[kind].ids.length) || 99;
    let last = '';
    Object.keys(S.done || {}).forEach((d) => { const r = ((S.done[d] || {}).rule || {})[kind]; if (r && r.length >= total && d > last) last = d; });
    return last;
  }

  /* Données lues par le service worker pour composer le texte de la notification */
  async function cacheData() {
    try {
      const style = S.settings.style, verses = {}, saints = {}, feasts = {}, fe = [];
      for (let i = 0; i < 45; i++) {
        const d = C.addDays(C.today(), i), iso = C.isoKey(d), info = C.dayInfo(d, style), v = O.verseFor(info);
        verses[iso] = [v.ref, v.fr];
        if (info.saints && info.saints[0]) saints[iso] = info.saints.slice(0, 2).map((x) => x.name).join(' · ');
        const big = (info.items || []).filter((it) => it.kind !== 'dimanche' && it.rank >= 4).sort((a, b) => b.rank - a.rank);
        if (big.length) { feasts[iso] = big[0].name; fe.push(iso); }
      }
      const k = S.push.k;
      const body = { verses, saints, feasts, fe, cards: dueCards(), streak: K.streak(), last: S.visits[S.visits.length - 1] || '', k,
        vh: k.verse.h, sh: k.streak.h, verse: k.verse.on, streakOn: k.streak.on };
      const c = await caches.open(DATA_CACHE);
      await c.put(DATA_URL, new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } }));
      return body;
    } catch (e) { return null; }
  }

  async function post(path, body) {
    const r = await fetch(CFG.server.replace(/\/$/, '') + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!r.ok) throw new Error('serveur ' + r.status);
  }

  /* Envoie au serveur l'abonnement, les préférences et l'état utile aux rappels */
  async function sync() {
    if (!supported() || !configured() || perm() !== 'granted' || !S.push.on) return;
    const sub = await getSub(); if (!sub) return;
    const data = await cacheData();
    try {
      await post('/sync', {
        sub: sub.toJSON(), tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        k: S.push.k, last: S.visits[S.visits.length - 1] || '', n: K.streak(),
        fe: (data && data.fe) || [], cd: dueCards(), rd: { m: ruleDone('morning'), e: ruleDone('evening') }
      });
    } catch (e) { /* hors ligne : on réessaiera à la prochaine ouverture */ }
  }

  async function enable() {
    if (!supported()) return K.toast('Notifications non prises en charge ici');
    if (ios() && !standalone()) return K.toast('Sur iPhone : ajoute d’abord l’appli à l’écran d’accueil');
    if (!configured()) return K.toast('Serveur de notifications non configuré');
    const p = await Notification.requestPermission();
    if (p !== 'granted') { K.toast('Notifications refusées par le navigateur'); return; }
    const r = await reg();
    (await r.pushManager.getSubscription()) || (await r.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64(CFG.vapidKey) }));
    S.push.on = true; K.save();
    await sync();
    K.toast('Notifications activées');
  }

  async function disable() {
    S.push.on = false; K.save();
    try {
      const sub = await getSub();
      if (sub) { try { await post('/unsubscribe', { endpoint: sub.endpoint }); } catch (e) { /* ignoré */ } await sub.unsubscribe(); }
    } catch (e) { /* ignoré */ }
    K.toast('Notifications désactivées');
  }

  const hours = (cur) => Array.from({ length: 24 }, (_, h) => `<option value="${h}" ${h === cur ? 'selected' : ''}>${String(h).padStart(2, '0')}h00</option>`).join('');
  const sw = (act, on, extra) => `<button class="switch ${on ? 'on' : ''}" data-act="${act}" ${extra || ''} role="switch" aria-checked="${!!on}"><i></i></button>`;

  /* Carte à insérer dans les réglages */
  function card() {
    const p = perm(), on = S.push.on && p === 'granted';
    let note = '';
    if (!supported()) note = 'Ton navigateur ne gère pas les notifications.';
    else if (!configured()) note = 'Le serveur de notifications n’est pas encore configuré (voir worker/README.md).';
    else if (ios() && !standalone()) note = 'Sur iPhone / iPad (iOS 16.4 ou plus) : ajoute d’abord Blagovest à l’écran d’accueil, puis rouvre-la depuis l’icône.';
    else if (p === 'denied') note = 'Les notifications sont bloquées dans les réglages du navigateur pour ce site.';
    const ok = supported() && configured() && p !== 'denied';
    return `<article class="card set">
      <div class="card-k">Notifications</div>
      <div class="set-row"><div><b>Activer les notifications</b><span class="muted small">Un petit serveur envoie le signal ; le texte est composé dans l’appli, sur ton appareil.</span></div>${ok ? sw('push-toggle', on) : ''}</div>
      ${note ? `<p class="muted small">${note}</p>` : ''}
      ${on ? KINDS.map(([id, label, desc]) => `<div class="set-row notif-row"><div><b>${label}</b><span class="muted small">${desc}</span></div>${sw('push-kind', S.push.k[id].on, `data-k="${id}"`)}<select class="sel" data-push-sel="${id}" aria-label="Heure : ${label}">${hours(S.push.k[id].h)}</select></div>`).join('') +
      '<p class="muted xs">Le serveur ne connaît que ton abonnement, ton fuseau horaire, tes réglages ci-dessus, ta dernière visite, ta série, le nombre de cartes à revoir et les dates de fêtes à venir : ni notes, ni favoris. Une notification peut arriver avec jusqu’à 15 minutes de retard.</p>' : ''}
    </article>`;
  }

  K.act['push-toggle'] = async () => { if (S.push.on && perm() === 'granted') await disable(); else await enable(); K.render(); };
  K.act['push-kind'] = async (el) => { const k = S.push.k[el.dataset.k]; k.on = !k.on; K.save(); await sync(); K.render(); };
  document.addEventListener('change', async (e) => {
    const id = e.target.dataset && e.target.dataset.pushSel; if (!id) return;
    S.push.k[id].h = +e.target.value; K.save(); await sync();
  });
  // à chaque départ de l'appli, on met à jour l'état connu du serveur (règle cochée, cartes, série)
  document.addEventListener('visibilitychange', () => { if (document.hidden) sync(); });

  O.push = { card, sync, cacheData };
})();
