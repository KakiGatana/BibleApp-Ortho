/* Lecture du texte dans l'appli : un chapitre du Nouveau Testament (traduction Crampon) ou un psaume
   de la Septante (traduction Giguet). Textes dans le domaine public, enregistrés dans bible/*.json. */
(function () {
  const O = window.ORTHO, K = O.core, U = K.U;
  const { esc, route } = K;
  const C = O.cal;
  const memo = {};
  const nt = () => O.NT_CHAPTERS.map(([ab, name, n]) => ({ ab, name, n }));
  const load = (file) => memo[file] || (memo[file] = fetch('bible/' + file, { cache: 'no-cache' }).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }).catch((e) => { delete memo[file]; throw e; }));

  const body = (verses) => verses.map((t, i) => (t ? `<p><sup>${i + 1}</sup>${esc(t)}</p>` : '')).join('');
  const nav = (prev, next) => `<div class="row between rnav">${prev ? `<a class="btn small ghost" href="${prev}">‹ Précédent</a>` : '<span></span>'}${next ? `<a class="btn small ghost" href="${next}">Suivant ›</a>` : '<span></span>'}</div>`;
  const credit = '<p class="muted xs center">Nouveau Testament : traduction Crampon · Psaumes : Septante, traduction Giguet · textes du domaine public. Numérotation de la Septante.</p>';

  function shell(title, sub, kicker, prev, next, extra) {
    const html = `<section class="page read">
      ${U.back ? U.back('#/bible/plan', 'Plan de lecture') : ''}
      ${U.pageHead(kicker, title, sub)}
      <article class="card rtext" data-notrans id="readBox"><p class="muted">Chargement…</p></article>
      ${nav(prev, next)}
      ${extra || ''}
      ${credit}
    </section>`;
    return html;
  }

  function ntView(ab, ch) {
    const book = nt().find((b) => b.ab === ab), c = +ch;
    if (!book || !(c >= 1 && c <= book.n)) return { html: '<section class="page"><p>Chapitre introuvable.</p></section>', title: 'Lecture', nav: 'bible' };
    const all = []; nt().forEach((b) => { for (let i = 1; i <= b.n; i++) all.push([b.ab, i]); });
    const idx = all.findIndex((x) => x[0] === ab && x[1] === c);
    const href = (x) => x ? '#/read/nt/' + x[0] + '/' + x[1] : '';
    const plan = O.planFor && O.planFor(C.today()).nt;
    const isToday = plan && plan[0] === ab && plan[2] === c;
    const extra = isToday ? `<p class="center"><button class="btn small" data-act="done-nt" data-iso="${C.isoKey(C.today())}">J’ai lu ce chapitre</button></p>` : '';
    const html = shell(book.name + ' ' + c, 'Nouveau Testament', 'Sainte Écriture', href(all[idx - 1]), href(all[idx + 1]), extra);
    const after = () => load('nt-' + ab + '.json').then((d) => { document.getElementById('readBox').innerHTML = body(d[c - 1] || []); })
      .catch(() => { document.getElementById('readBox').innerHTML = '<p class="muted">Ce texte n’est pas encore enregistré sur l’appareil : connecte-toi une fois pour le charger.</p>'; });
    return { html, title: book.name + ' ' + c, nav: 'bible', after };
  }

  function psView(n) {
    const p = +n;
    if (!(p >= 1 && p <= 151)) return { html: '<section class="page"><p>Psaume introuvable.</p></section>', title: 'Lecture', nav: 'bible' };
    const href = (x) => (x >= 1 && x <= 151 ? '#/read/ps/' + x : '');
    const html = shell('Psaume ' + p, 'Septante', 'Sainte Écriture', href(p - 1), href(p + 1));
    const after = () => load('ps.json').then((d) => { document.getElementById('readBox').innerHTML = body(d[p - 1] || []); })
      .catch(() => { document.getElementById('readBox').innerHTML = '<p class="muted">Ce texte n’est pas encore enregistré sur l’appareil : connecte-toi une fois pour le charger.</p>'; });
    return { html, title: 'Psaume ' + p, nav: 'bible', after };
  }

  route('/read/nt/:ab/:ch', ntView);
  route('/read/ps/:n', psView);

  /* ---------- hors ligne : enregistrer tous les textes ---------- */
  const FILES = () => nt().map((b) => 'bible/nt-' + b.ab + '.json').concat(['bible/ps.json']);
  O.textsCard = () => `<article class="card set">
      <div class="card-k">Textes bibliques hors ligne</div>
      <p class="muted small">Le Nouveau Testament et les 151 psaumes de la Septante, pour lire sans Internet (environ 1,3 Mo). Les chapitres que tu as déjà ouverts sont gardés automatiquement.</p>
      <div class="row center"><button class="btn small" id="txtDl" data-act="texts-download">Tout enregistrer</button></div>
      <p class="muted xs center" id="txtSt"></p>
    </article>`;
  K.act['texts-download'] = async () => {
    const st = document.getElementById('txtSt'), btn = document.getElementById('txtDl'), files = FILES();
    if (!('caches' in window)) { K.toast('Non pris en charge ici'); return; }
    if (btn) btn.disabled = true;
    let done = 0, bad = 0;
    const cache = await caches.open('blagovest-bible');
    for (const f of files) {
      try { if (!(await cache.match(f))) { const r = await fetch(f); if (r.ok) await cache.put(f, r); else bad++; } } catch (e) { bad++; }
      done++; if (st) st.textContent = done + ' / ' + files.length;
    }
    if (st) st.textContent = bad ? (files.length - bad) + ' enregistrés, ' + bad + ' à refaire en ligne' : 'Terminé : tout est disponible hors ligne';
    if (btn) btn.disabled = false;
  };
})();
