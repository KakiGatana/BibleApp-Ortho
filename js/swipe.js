/* Balayage horizontal : jour précédent/suivant (accueil), mois (calendrier), chapitre ou psaume (lecture), onglets des sous-menus.
   Une zone porte data-swipe ; ses liens portent data-sw="prev" / data-sw="next". Les onglets (.subtabs) se balaient d'eux-mêmes. */
(function () {
  const BLOCK = 'input, textarea, select, .chips-row, .seg, [data-noswipe], .sheet';
  let sx = 0, sy = 0, st = 0, zone = null, locked = false;

  const pageOf = (el) => el.closest('.page');
  const tabbed = (el) => { const p = pageOf(el); return p && p.querySelector('.subtabs') ? p : null; };
  const zoneFor = (t) => t.closest('[data-swipe]') || tabbed(t);

  function link(z, dir) {
    const key = dir < 0 ? 'prev' : 'next';
    const p = pageOf(z) || z;
    const el = z.querySelector('[data-sw="' + key + '"]') || p.querySelector('[data-sw="' + key + '"]');
    if (el) return el;
    const on = p.querySelector('.subtabs a.on');
    if (on) { const s = dir < 0 ? on.previousElementSibling : on.nextElementSibling; return s && s.tagName === 'A' ? s : null; }
    return null;
  }

  document.addEventListener('touchstart', (e) => {
    zone = null; locked = false;
    if (e.touches.length !== 1 || e.target.closest(BLOCK)) return;
    const z = zoneFor(e.target); if (!z) return;
    zone = z; sx = e.touches[0].clientX; sy = e.touches[0].clientY; st = Date.now();
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!zone) return;
    const dx = e.touches[0].clientX - sx, dy = e.touches[0].clientY - sy;
    if (!locked && Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.5) locked = true;
    if (locked && link(zone, dx > 0 ? -1 : 1)) {
      zone.style.transition = 'none';
      zone.style.transform = 'translateX(' + Math.max(-36, Math.min(36, dx * 0.3)) + 'px)';
    }
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (!zone) return;
    const z = zone; zone = null;
    const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    z.style.transition = 'transform .2s ease'; z.style.transform = '';
    if (Math.abs(dx) < 60 || Math.abs(dy) > 50 || Math.abs(dx) < Math.abs(dy) * 1.5 || Date.now() - st > 700) return;
    const el = link(z, dx > 0 ? -1 : 1);
    if (el) el.click();
  }, { passive: true });
})();
