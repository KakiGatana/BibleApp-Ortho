/* Vues : Écritures (passages, canon, plan), prières */
(function () {
  const O = window.ORTHO, K = O.core, C = O.cal, U = K.U;
  const { S, esc, ic, route } = K;

  const tabs = (active) => `<nav class="subtabs" aria-label="Écritures">
    ${[['passages', 'Passages', '#/bible'], ['canon', 'Canon orthodoxe', '#/bible/canon'], ['plan', 'Plan de lecture', '#/bible/plan']].map(([id, l, h]) => `<a href="${h}" class="${id === active ? 'on' : ''}">${l}</a>`).join('')}</nav>`;

  /* ---------- passages ---------- */
  function passagesView() {
    const groups = {};
    O.READINGS.forEach((r) => (groups[r.group] = groups[r.group] || []).push(r));
    const order = ['Psaumes', 'Ancien Testament', 'Évangiles', 'Cantiques', 'Épîtres'];
    const html = `<section class="page">
      ${U.pageHead('Sainte Écriture', 'Écritures', 'Des passages essentiels, lus en français et en slavon d’Église, avec le commentaire des Pères. Les numéros de psaumes suivent la Septante.')}
      ${tabs('passages')}
      <div class="search"><span>${ic('search')}</span><input id="pq" type="search" placeholder="Rechercher (psaume, Magnificat, lumière, berger…)" autocomplete="off"></div>
      <div id="plist">${order.filter((g) => groups[g]).map((g) => `<div class="pgroup"><h3 class="group-h">${g}</h3><div class="cards">${groups[g].map(passageCard).join('')}</div></div>`).join('')}</div>
    </section>`;
    const after = (root) => {
      root.querySelector('#pq').addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        root.querySelectorAll('.p-card').forEach((c) => { c.style.display = !q || c.dataset.s.includes(q) ? '' : 'none'; });
        root.querySelectorAll('.pgroup').forEach((g) => { g.style.display = [...g.querySelectorAll('.p-card')].some((c) => c.style.display !== 'none') ? '' : 'none'; });
      });
    };
    return { html, title: 'Écritures', nav: 'bible', after };
  }
  function passageCard(r) {
    const hay = (r.ref + ' ' + r.title + ' ' + r.tags.join(' ') + ' ' + r.intro).toLowerCase();
    return `<a class="card p-card" href="#/passage/${r.id}" data-s="${esc(hay)}">
      <div class="pc-top"><span class="pc-ref">${esc(r.ref)}</span>${r.cs || r.csExtract ? '<span class="badge">FR · СЛ</span>' : '<span class="badge dim">FR</span>'}</div>
      <h3>${esc(r.title)}</h3><p class="muted small clamp">${esc(r.intro)}</p></a>`;
  }
  route('/bible', passagesView);

  function passageView(id) {
    const r = O.READINGS.find((x) => x.id === id);
    if (!r) return { html: '<section class="page"><p>Passage introuvable.</p></section>', nav: 'bible' };
    const idx = O.READINGS.indexOf(r), prev = O.READINGS[idx - 1], next = O.READINGS[idx + 1];
    const startV = (/:(\d+)/.exec(r.ref) || [0, 1])[1];
    const link = O.aelfLink && O.aelfLink(r.ref.replace(/\(.*\)/, ''));
    const allFr = r.fr.join('\n'), allCs = (r.cs || []).join(' ');
    const html = `<section class="page passage">
      ${U.back('#/bible', 'Écritures')}
      ${U.pageHead(esc(r.ref), esc(r.title), esc(r.intro))}
      <div class="reader-bar">
        ${U.seg([['fr', 'Français'], ['both', 'Parallèle'], ['cs', 'Слав.']], S.settings.lang, 'set-lang')}
        ${U.tools({ id: 'passage:' + r.id, text: allFr + (allCs ? '\n\n' + r.cs.join('\n') : ''), cs: allCs, noteKey: 'passage:' + r.id, noteLabel: r.ref })}
      </div>
      <article class="card reader">
        ${r.cs && r.cs.length ? U.pairs(r.fr, r.cs, +startV || 1) : `<div class="pairs">${r.fr.map((l, i) => `<div class="pair solo"><span class="vn">${(+startV || 1) + i}</span><p class="fr">${esc(l)}</p></div>`).join('')}</div>`}
      </article>
      <p class="center">${O.askBtn ? O.askBtn(r.ref + ' — ' + r.title, r.intro + ' ' + allFr) : ''}</p>
      ${r.csExtract ? `<article class="card"><div class="card-k">Extraits en slavon</div>${r.csExtract.map(([ref, t]) => `<div class="extract"><span class="ref">${esc(ref)}</span><p class="cs rubric" data-act="speak" data-text="${esc(t)}">${esc(t)}</p></div>`).join('')}<p class="muted xs">Le passage complet en slavon est à lire dans une Bible slavonne imprimée.</p></article>` : ''}
      ${link ? `<p class="center"><a class="btn ghost small" href="${link}" target="_blank" rel="noopener">Lire le chapitre complet (AELF) ${ic('ext', 'ic xs')}</a></p>` : ''}
      <p class="muted xs center">Traduction française libre, d’après le texte de la Septante et du texte reçu. Appuie sur une ligne slavonne pour l’écouter (voix russe moderne, approximatif).</p>
      <nav class="pager">${prev ? `<a href="#/passage/${prev.id}">${ic('left')}<span>${esc(prev.ref)}</span></a>` : '<span></span>'}${next ? `<a href="#/passage/${next.id}"><span>${esc(next.ref)}</span>${ic('right')}</a>` : '<span></span>'}</nav>
    </section>`;
    return { html, title: r.ref + ' — ' + r.title, nav: 'bible' };
  }
  route('/passage/:id', passageView);

  /* ---------- canon ---------- */
  function canonView() {
    const groups = {};
    O.CANON.forEach((b) => (groups[b[4]] = groups[b[4]] || []).push(b));
    const html = `<section class="page">
      ${U.pageHead('Sainte Écriture', 'Le canon orthodoxe', `${O.CANON.length} livres principaux, d’après la Septante et le Nouveau Testament. Noms slavons à côté des noms français.`)}
      ${tabs('canon')}
      ${Object.keys(groups).map((g) => `<div class="pgroup"><h3 class="group-h">${g}</h3>
        <ul class="books">${groups[g].map(([fr, cs, ab, n]) => `<li><a href="https://www.aelf.org/bible/${ab}/1" target="_blank" rel="noopener"><span class="b-fr">${esc(fr)}</span><span class="b-cs cs">${esc(cs)}</span><span class="b-n">${n} ch.</span>${ic('ext', 'ic xs')}</a></li>`).join('')}</ul></div>`).join('')}
      <aside class="tip">${ic('flame')}<div>Les liens ouvrent le site AELF (traduction liturgique catholique). Pour la Septante complète en français, voir la <i>Bible d’Alexandrie</i>. Les passages de cette appli sont ceux utilisés dans les offices.</div></aside>
    </section>`;
    return { html, title: 'Canon orthodoxe', nav: 'bible' };
  }
  route('/bible/canon', canonView);

  /* ---------- plan de lecture ---------- */
  function planView() {
    const t = C.today(), days = Array.from({ length: 14 }, (_, i) => C.addDays(t, i - 3));
    const NT = [];
    O.NT_CHAPTERS.forEach(([ab, name, n]) => { for (let i = 1; i <= n; i++) NT.push([ab, name, i]); });
    const done = Object.keys(S.done).filter((k) => S.done[k].nt).length;
    const html = `<section class="page">
      ${U.pageHead('Sainte Écriture', 'Plan de lecture', 'Un chapitre du Nouveau Testament par jour (260 chapitres), et un psaume. À la fin, on recommence !')}
      ${tabs('plan')}
      <article class="card"><div class="card-k">Progression</div>
        <div class="progress"><i style="width:${Math.min(100, Math.round((done / 260) * 100))}%"></i></div>
        <p class="muted small">${done} chapitre${done > 1 ? 's' : ''} lu${done > 1 ? 's' : ''} sur 260.</p></article>
      <ul class="plan">${days.map((d) => {
        const i = C.dayOfYear(d) - 1, nt = NT[i % NT.length], iso = C.isoKey(d), ok = (S.done[iso] || {}).nt;
        const link = O.aelfLink(nt[0] + ' ' + nt[2]);
        return `<li class="${iso === C.isoKey(t) ? 'today' : ''} ${ok ? 'ok' : ''}"><button class="check ${ok ? 'on' : ''}" data-act="done-nt" data-iso="${iso}" aria-label="Marquer comme lu">${ic('check')}</button>
          <div><b>${esc(nt[1])} ${nt[2]}</b><span class="muted small"> · Ps ${(i % 150) + 1}</span><div class="muted xs">${esc(C.longDate(d))}</div></div>${link ? `<a class="icon-btn" href="${link}" target="_blank" rel="noopener" aria-label="Lire">${ic('ext')}</a>` : ''}</li>`;
      }).join('')}</ul>
    </section>`;
    return { html, title: 'Plan de lecture', nav: 'bible' };
  }
  route('/bible/plan', planView);
  K.act['done-nt'] = (el) => { const iso = el.dataset.iso; S.done[iso] = S.done[iso] || {}; S.done[iso].nt = !S.done[iso].nt; K.save(); K.render(); };

  /* ---------- prières ---------- */
  function prayersView() {
    const cats = {};
    O.PRAYERS.forEach((p) => (cats[p.cat] = cats[p.cat] || []).push(p));
    const html = `<section class="page">
      ${U.pageHead('Livre de prières', 'Prières', 'Les prières fondamentales de l’Église, en français et en slavon, avec lecture mot à mot pour apprendre le sens de chaque terme.')}
      ${U.sectionTitle('Règle de prière')}${O.ruleTiles ? O.ruleTiles() : ''}
      ${Object.keys(cats).map((c) => `<div class="pgroup"><h3 class="group-h">${c}</h3><div class="cards">${cats[c].map((p) => `<a class="card p-card" href="#/prayer/${p.id}"><div class="pc-top"><span class="pc-ref cs">${esc(p.titleCs)}</span>${p.inter ? '<span class="badge">mot à mot</span>' : ''}</div><h3>${esc(p.title)}</h3><p class="muted small clamp">${esc(p.when)}</p></a>`).join('')}</div></div>`).join('')}
    </section>`;
    return { html, title: 'Prières', nav: 'prayers' };
  }
  route('/prayers', prayersView);

  let prayerMode = 'parallel';
  function prayerView(id, mode) {
    const p = O.PRAYERS.find((x) => x.id === id);
    if (!p) return { html: '<section class="page"><p>Prière introuvable.</p></section>', nav: 'prayers' };
    const m = mode || (p.inter && prayerMode === 'inter' ? 'inter' : 'parallel');
    const idx = O.PRAYERS.indexOf(p), prev = O.PRAYERS[idx - 1], next = O.PRAYERS[idx + 1];
    const frL = p.fr.split('\n'), csL = p.cs.split('\n');
    const body = m === 'inter' && p.inter
      ? `<div class="inter">${p.inter.map(([cs, tr, fr]) => `<button class="tok" data-act="speak" data-text="${esc(cs)}"><span class="cs">${esc(cs)}</span>${S.settings.translit ? `<em class="tr">${esc(tr)}</em>` : ''}<span class="fr">${esc(fr)}</span></button>`).join('')}</div>`
      : U.pairs(frL, csL, 1).replace('<div class="pairs">', '<div class="pairs novn">');
    const html = `<section class="page prayer">
      ${U.back('#/prayers', 'Prières')}
      ${U.pageHead(esc(p.cat), esc(p.title), `<span class="cs big">${esc(p.titleCs)}</span>`)}
      <div class="reader-bar">
        ${p.inter ? U.seg([['parallel', 'Parallèle'], ['inter', 'Mot à mot']], m, 'prayer-mode', `data-id="${p.id}"`) : '<span></span>'}
        ${U.tools({ id: 'prayer:' + p.id, text: p.fr + '\n\n' + p.cs, cs: p.cs.replace(/\n/g, ' '), noteKey: 'prayer:' + p.id, noteLabel: p.title })}
      </div>
      ${m === 'inter' ? `<div class="row between"><button class="chip-btn ${S.settings.translit ? 'on' : ''}" data-act="toggle-translit">Prononciation</button>${U.seg([['fr', 'FR'], ['both', 'FR+СЛ'], ['cs', 'СЛ']], S.settings.lang, 'set-lang')}</div>` : U.seg([['fr', 'Français'], ['both', 'Parallèle'], ['cs', 'Слав.']], S.settings.lang, 'set-lang')}
      <article class="card reader">${body}</article>
      <div class="grid2">
        <article class="card"><div class="card-k">Quand la prier ?</div><p>${esc(p.when)}</p></article>
        <article class="card"><div class="card-k">À savoir</div><p>${esc(p.note)}</p></article>
      </div>
      <p class="center">${O.askBtn ? O.askBtn(p.title, p.fr.split('\n').join(' ')) : ''}</p>
      ${m === 'inter' ? '<p class="muted xs center">Chaque mot est cliquable. La prononciation est une approximation à la française, d’après la lecture liturgique russe.</p>' : ''}
      <nav class="pager">${prev ? `<a href="#/prayer/${prev.id}">${ic('left')}<span>${esc(prev.title)}</span></a>` : '<span></span>'}${next ? `<a href="#/prayer/${next.id}"><span>${esc(next.title)}</span>${ic('right')}</a>` : '<span></span>'}</nav>
    </section>`;
    return { html, title: p.title, nav: 'prayers' };
  }
  route('/prayer/:id', (id) => prayerView(id));
  K.act['prayer-mode'] = (el) => { prayerMode = el.dataset.v; K.render(); };
})();
