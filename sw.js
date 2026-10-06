/* Service worker : fonctionnement hors ligne (cache d'abord, réseau en secours) */
const VERSION = 'blagovest-v1';
const CORE = [
  './', 'index.html', 'manifest.webmanifest', 'style.css', 'icon.svg',
  'calendar.js', 'core.js', 'views-day.js', 'views-bible.js', 'views-slavonic.js', 'views-more.js', 'boot.js',
  'feasts.js', 'saints.js', 'verses1.js', 'verses2.js', 'verses3.js', 'verses4.js',
  'prayers.js', 'readings.js', 'slavonic.js', 'theology.js', 'canon.js'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
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
