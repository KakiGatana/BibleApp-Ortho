/* Balayage horizontal naturel : le contenu suit le doigt, puis glisse hors de l'écran pendant que le suivant arrive de l'autre côté.
   Zones : data-swipe (jour d'accueil, calendrier, lecture) et pages à onglets (.subtabs). Les liens portent data-sw="prev" / "next".
   Le titre de la page, les onglets et les boutons restent en place : seul le contenu glisse. */
(function () {
  const BLOCK = 'input, textarea, select, .chips-row, .seg, [data-noswipe], .sheet';
  const FIXED = '.page-head, .subtabs, .back, .cal-controls, .rnav';
  let sx = 0, sy = 0, st = 0, zone = null, mode = '', targets = [], prevEl = null, nextEl = null, busy = false;

  const pageOf = (el) => el.closest('.page');
  const tabbed = (el) => { const p = pageOf(el); return p && p.querySelector('.subtabs') ? p : null; };
  const zoneFor = (t) => t.closest('[data-swipe]') || tabbed(t);
  const slidables = (page) => [...page.children].filter((c) => !c.matches(FIXED));

  function link(z, key) {
    const p = pageOf(z) || z;
    const el = z.querySelector('[data-sw="' + key + '"]') || p.querySelector('[data-sw="' + key + '"]');
    if (el) return el;
    const on = p.querySelector('.subtabs a.on');
    if (on) { const s = key === 'prev' ? on.previousElementSibling : on.nextElementSibling; return s && s.tagName === 'A' ? s : null; }
    return null;
  }
  const set = (x, ms, op) => targets.forEach((t) => {
    t.style.transition = ms ? 'transform ' + ms + 'ms cubic-bezier(.2,.8,.2,1), opacity ' + ms + 'ms' : 'none';
    t.style.transform = x ? 'translate3d(' + x + 'px,0,0)' : '';
    t.style.opacity = op == null ? '' : String(op);
  });
  const clear = () => targets.forEach((t) => { t.style.transition = ''; t.style.transform = ''; t.style.opacity = ''; });

  document.addEventListener('touchstart', (e) => {
    if (busy) return;
    zone = null; mode = '';
    if (e.touches.length !== 1 || e.target.closest(BLOCK)) return;
    const z = zoneFor(e.target); if (!z) return;
    const p = pageOf(z); if (!p) return;
    zone = z; targets = slidables(p); prevEl = link(z, 'prev'); nextEl = link(z, 'next');
    sx = e.touches[0].clientX; sy = e.touches[0].clientY; st = Date.now();
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!zone) return;
    const dx = e.touches[0].clientX - sx, dy = e.touches[0].clientY - sy;
    if (!mode) {
      if (Math.abs(dy) > 14 && Math.abs(dy) > Math.abs(dx)) { zone = null; return; } // c'est un défilement vertical
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.3) mode = 'drag'; else return;
    }
    const ok = dx > 0 ? prevEl : nextEl;
    set(ok ? dx : dx * 0.22, 0, ok ? Math.max(0.35, 1 - Math.abs(dx) / 420) : null); // sans page de ce côté : on résiste
  }, { passive: true });

  function finish(e) {
    if (!zone) return;
    const z = zone; zone = null;
    if (mode !== 'drag') { clear(); return; }
    const t = e.changedTouches && e.changedTouches[0], dx = t ? t.clientX - sx : 0, dt = Math.max(1, Date.now() - st);
    const v = Math.abs(dx) / dt, dir = dx > 0 ? 'prev' : 'next', el = dir === 'prev' ? prevEl : nextEl;
    const go = el && (Math.abs(dx) > 90 || (v > 0.45 && Math.abs(dx) > 30));
    if (!go) { set(0, 260, null); setTimeout(clear, 280); return; }
    busy = true;
    const W = Math.min(window.innerWidth, 520), side = dx > 0 ? 1 : -1;
    set(side * W, 170, 0);
    setTimeout(() => {
      window.__swipeIn = side; // le contenu suivant arrive du côté opposé
      clear();
      el.click();
      setTimeout(() => { busy = false; }, 120);
    }, 170);
  }
  document.addEventListener('touchend', finish, { passive: true });
  document.addEventListener('touchcancel', () => { if (zone) { zone = null; set(0, 200, null); setTimeout(clear, 220); } }, { passive: true });

  /* arrivée du nouveau contenu : il glisse depuis le côté opposé */
  window.addEventListener('hashchange', () => {
    const side = window.__swipeIn; window.__swipeIn = 0;
    if (!side) return;
    requestAnimationFrame(() => {
      const p = document.querySelector('#view .page') || document.querySelector('.page'); if (!p) return;
      slidables(p).forEach((t) => {
        t.style.transition = 'none'; t.style.transform = 'translate3d(' + (-side * 56) + 'px,0,0)'; t.style.opacity = '0';
        void t.offsetWidth;
        t.style.transition = 'transform .26s cubic-bezier(.2,.8,.2,1), opacity .26s ease';
        t.style.transform = ''; t.style.opacity = '';
        setTimeout(() => { t.style.transition = ''; }, 300);
      });
    });
  });
})();
