/* Service worker : fonctionnement hors ligne (réseau d'abord, cache en secours) + notifications */
const VERSION = 'blagovest-v6';
const DATA_CACHE = 'blagovest-data'; // écrit par js/notifications.js, à ne jamais purger
const CORE = [
  './', 'index.html', 'manifest.webmanifest', 'css/style.css',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png',
  'js/calendar.js', 'js/core.js', 'js/push-config.js', 'js/notifications.js',
  'js/views-day.js', 'js/views-bible.js', 'js/views-slavonic.js', 'js/views-more.js', 'js/views-extra.js', 'js/views-ask.js', 'js/data/verses-cs.js', 'js/boot.js',
  'js/data/feasts.js', 'js/data/saints.js', 'js/data/verses1.js', 'js/data/verses2.js', 'js/data/verses3.js', 'js/data/verses4.js',
  'js/data/prayers.js', 'js/data/readings.js', 'js/data/slavonic.js', 'js/data/theology.js', 'js/data/canon.js'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION && k !== DATA_CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Polices Google : stale-while-revalidate
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(VERSION).then(async (c) => {
      const hit = await c.match(req);
      const net = fetch(req).then((r) => { c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(req).then((r) => { const copy = r.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return r; })
      .catch(() => caches.match(req).then((m) => m || caches.match('index.html')))
  );
});

/* ---------- Notifications ---------- */
const pad = (n) => String(n).padStart(2, '0');
const isoLocal = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());

self.addEventListener('push', (e) => {
  e.waitUntil((async () => {
    let data = {};
    try { const r = await (await caches.open(DATA_CACHE)).match('notif-data.json'); if (r) data = await r.json(); } catch (err) { /* données absentes : texte générique */ }
    const now = new Date(), h = now.getHours() + now.getMinutes() / 60;
    // Le serveur envoie un signal vide : on choisit verset ou série selon l'heure réglée la plus proche.
    const dist = (x) => { const d = Math.abs(h - x); return Math.min(d, 24 - d); };
    const wantStreak = data.streakOn && (!data.verse || dist(data.sh) < dist(data.vh));
    let title, body, tag;
    if (wantStreak) {
      const n = data.streak || 0;
      title = n > 1 ? 'Ta série de ' + n + ' jours t’attend' : 'Ne perds pas ta série';
      body = 'Ouvre Blagovest aujourd’hui pour la poursuivre.';
      tag = 'streak';
    } else {
      const v = data.verses && data.verses[isoLocal(now)];
      title = v ? 'Verset du jour · ' + v[0] : 'Verset du jour';
      body = v ? (v[1].length > 220 ? v[1].slice(0, 217) + '…' : v[1]) : 'Ton verset du jour t’attend dans Blagovest.';
      tag = 'verse';
    }
    await self.registration.showNotification(title, { body, tag, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', data: { url: './#/today' } });
  })());
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const target = new URL((e.notification.data && e.notification.data.url) || './#/today', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
    for (const c of cs) if (c.url.startsWith(self.registration.scope) && 'focus' in c) { c.navigate(target).catch(() => {}); return c.focus(); }
    return self.clients.openWindow(target);
  }));
});
