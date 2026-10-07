/* Icônes des saints et des fêtes : vignettes, vue agrandie avec crédit, page des crédits, téléchargement hors ligne.
   Les images viennent de Wikimedia Commons (domaine public ou licence libre) ; voir js/data/icons.js. */
(function () {
  const O = window.ORTHO, K = O.core, U = K.U;
  const { S, esc, route } = K;
  const ICONS = () => O.ICONS || {};
  const src = (it) => 'icons/saints/' + it.f;

  /* vignette cliquable pour une clé : 'entry:MM-DD:i' (saint de la liste) ou 'feast:id' (fête) */
  O.iconThumb = (key, name) => {
    const it = ICONS()[key]; if (!it) return '';
    return `<button class="icon-thumb" data-act="icon-view" data-k="${esc(key)}" data-name="${esc(name || '')}" aria-label="Voir l’icône : ${esc(name || '')}"><img src="${esc(src(it))}" alt="" loading="lazy" decoding="async"></button>`;
  };

  /* grande icône cliquable (page d'une fête) */
  O.iconFigure = (key, name) => {
    const it = ICONS()[key]; if (!it) return '';
    return `<button class="icon-big" data-act="icon-view" data-k="${esc(key)}" data-name="${esc(name || '')}" aria-label="Voir l’icône en grand"><img src="${esc(src(it))}" alt="Icône : ${esc(name || '')}" loading="lazy" decoding="async"><span>Voir l’icône en grand</span></button>`;
  };

  K.act['icon-view'] = (el) => {
    const it = ICONS()[el.dataset.k]; if (!it) return;
    const name = el.dataset.name || '';
    K.openSheet(`<div class="icon-sheet">
      <h2 class="sheet-title">${esc(name)}</h2>
      <figure class="icon-fig"><img src="${esc(src(it))}" alt="Icône : ${esc(name)}"></figure>
      <p class="icon-credit"><b>${esc(it.t)}</b><br>${it.a ? esc(it.a) + ' · ' : ''}${esc(it.l)} · <a href="${esc(it.u)}" target="_blank" rel="noopener">Source (Wikimedia Commons)</a></p>
      <p class="muted xs">Image libre de droits ou sous licence libre. L’identification du saint est faite d’après le nom du fichier et les catalogues de Wikimedia ; en cas d’erreur, merci de le signaler.</p>
      <p class="center"><a class="btn small ghost" href="#/credits" data-act="sheet-close">Tous les crédits</a></p>
    </div>`);
  };

  /* ---------- page des crédits ---------- */
  route('/credits', () => {
    const all = Object.entries(ICONS()).map(([k, it]) => ({ k, ...it })).sort((a, b) => a.n.localeCompare(b.n, 'fr'));
    const html = `<section class="page prose-page">
      ${U.back('#/about', 'À propos')}
      ${U.pageHead('Иконы', 'Crédits des icônes', 'Les images viennent de Wikimedia Commons : œuvres du domaine public ou sous licence libre, avec le nom de leur auteur quand il est connu.')}
      <p class="muted">${all.length} images. Chaque ligne renvoie à la page d’origine, avec le détail de la licence.</p>
      <ul class="credits">${all.map((it) => `<li><img src="${esc(src(it))}" alt="" loading="lazy" decoding="async"><div><b>${esc(it.n)}</b><span class="muted small">${esc(it.t)}</span><span class="small">${it.a ? esc(it.a) + ' · ' : ''}${esc(it.l)} · <a href="${esc(it.u)}" target="_blank" rel="noopener">source</a></span></div></li>`).join('')}</ul>
    </section>`;
    return { html, title: 'Crédits des icônes', nav: 'settings' };
  });

  /* ---------- hors ligne : télécharger toutes les icônes ---------- */
  O.iconsCard = () => {
    const n = Object.keys(ICONS()).length;
    if (!n) return '';
    return `<article class="card set">
      <div class="card-k">Icônes hors ligne</div>
      <p class="muted small">Les ${n} icônes des saints et des fêtes s’affichent sans Internet une fois enregistrées sur l’appareil (environ ${Math.round(n * 0.04)} Mo). Celles que tu as déjà consultées sont gardées automatiquement.</p>
      <div class="row center"><button class="btn small" id="icoDl" data-act="icons-download">Tout enregistrer</button></div>
      <p class="muted xs center" id="icoSt"></p>
    </article>`;
  };
  K.act['icons-download'] = async () => {
    const files = Object.values(ICONS()).map(src), st = document.getElementById('icoSt'), btn = document.getElementById('icoDl');
    if (!('caches' in window)) { K.toast('Non pris en charge ici'); return; }
    if (btn) btn.disabled = true;
    let done = 0, bad = 0;
    const cache = await caches.open('blagovest-icons');
    const queue = files.slice();
    const worker = async () => {
      while (queue.length) {
        const f = queue.pop();
        try { if (!(await cache.match(f))) { const r = await fetch(f); if (r.ok) await cache.put(f, r); else bad++; } } catch (e) { bad++; }
        done++;
        if (st) st.textContent = done + ' / ' + files.length;
      }
    };
    await Promise.all([worker(), worker(), worker(), worker()]);
    if (st) st.textContent = bad ? (files.length - bad) + ' enregistrées, ' + bad + ' à refaire en ligne' : 'Terminé : ' + files.length + ' icônes disponibles hors ligne';
    if (btn) btn.disabled = false;
  };
})();
