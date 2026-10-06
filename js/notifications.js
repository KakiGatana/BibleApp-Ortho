/* Notifications : verset du jour et série (Web Push, via le petit serveur de worker/) */
(function () {
  const O = window.ORTHO, K = O.core, C = O.cal;
  const { S } = K;
  const CFG = window.BLAGOVEST_PUSH || {};
  const DATA_CACHE = 'blagovest-data', DATA_URL = 'notif-data.json';
  S.push = Object.assign({ verse: true, streak: true, vh: 7, sh: 20 }, S.push || {});

  const supported = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window && /^https?:/.test(location.protocol);
  const configured = () => !!(CFG.server && CFG.vapidKey);
  const ios = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone = () => (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone;
  const perm = () => (supported() ? Notification.permission : 'unsupported');

  const b64 = (s) => { const p = '='.repeat((4 - (s.length % 4)) % 4), r = atob((s + p).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(r, (c) => c.charCodeAt(0)); };
  const reg = () => navigator.serviceWorker.ready;
  const getSub = async () => (await reg()).pushManager.getSubscription();

  /* Données lues par le service worker au moment de la notification */
  async function cacheData() {
    try {
      const style = S.settings.style, verses = {};
      for (let i = 0; i < 45; i++) {
        const d = C.addDays(C.today(), i), v = O.verseFor(C.dayInfo(d, style));
        verses[C.isoKey(d)] = [v.ref, v.fr];
      }
      const body = { verses, streak: K.streak(), last: S.visits[S.visits.length - 1] || '', vh: S.push.vh, sh: S.push.sh, verse: S.push.verse, streakOn: S.push.streak };
      const c = await caches.open(DATA_CACHE);
      await c.put(DATA_URL, new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } }));
    } catch (e) { /* facultatif */ }
  }

  async function post(path, body) {
    const r = await fetch(CFG.server.replace(/\/$/, '') + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!r.ok) throw new Error('serveur ' + r.status);
  }

  /* Envoie au serveur l'abonnement, les préférences et la dernière visite */
  async function sync() {
    if (!supported() || !configured() || perm() !== 'granted' || !S.push.on) return;
    const sub = await getSub(); if (!sub) return;
    await cacheData();
    try {
      await post('/sync', { sub: sub.toJSON(), tz: Intl.DateTimeFormat().resolvedOptions().timeZone, verse: S.push.verse, streak: S.push.streak, vh: S.push.vh, sh: S.push.sh, last: S.visits[S.visits.length - 1] || '', n: K.streak() });
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
  const sw = (act, on) => `<button class="switch ${on ? 'on' : ''}" data-act="${act}" role="switch" aria-checked="${!!on}"><i></i></button>`;

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
      <div class="set-row"><div><b>Activer les notifications</b><span class="muted small">Un petit serveur envoie le signal ; le verset est choisi dans l’appli, sur ton appareil.</span></div>${ok ? sw('push-toggle', on) : ''}</div>
      ${note ? `<p class="muted small">${note}</p>` : ''}
      ${on ? `<div class="set-row"><div><b>Verset du jour</b></div>${sw('push-verse', S.push.verse)}<select class="sel" data-push-sel="vh" aria-label="Heure du verset">${hours(S.push.vh)}</select></div>
      <div class="set-row"><div><b>Rappel de série</b><span class="muted small">Seulement si tu n’as pas encore ouvert l’appli ce jour-là.</span></div>${sw('push-streak', S.push.streak)}<select class="sel" data-push-sel="sh" aria-label="Heure du rappel">${hours(S.push.sh)}</select></div>
      <p class="muted xs">Le serveur ne connaît que ton abonnement, ton fuseau horaire, tes heures et ta dernière visite : ni notes, ni favoris.</p>` : ''}
    </article>`;
  }

  K.act['push-toggle'] = async () => { if (S.push.on && perm() === 'granted') await disable(); else await enable(); K.render(); };
  K.act['push-verse'] = async () => { S.push.verse = !S.push.verse; K.save(); await sync(); K.render(); };
  K.act['push-streak'] = async () => { S.push.streak = !S.push.streak; K.save(); await sync(); K.render(); };
  document.addEventListener('change', async (e) => {
    const k = e.target.dataset && e.target.dataset.pushSel; if (!k) return;
    S.push[k] = +e.target.value; K.save(); await sync();
  });

  O.push = { card, sync };
})();
