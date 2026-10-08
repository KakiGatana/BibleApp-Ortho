/* Découvrir l'Orthodoxie, glossaire, distinctions théologiques, conciles et hérésies. */
(function () {
  const O = window.ORTHO, K = O.core, U = K.U;
  const { S, esc, route } = K;
  S.learn = Object.assign({ done: {} }, S.learn || {});
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const L = () => S.learn;

  /* ---------- Découvrir l'Orthodoxie ---------- */
  function hub() {
    const F = O.DECOUVRIR, n = F.filter((_, i) => L().done[i]).length;
    const html = `<section class="page learn">
      ${U.pageHead('Начало', 'Découvrir l’Orthodoxie', 'Onze fiches courtes, en langage simple, pour comprendre l’essentiel : la foi, l’église, la prière, les sacrements.')}
      <article class="card"><p>Une fiche tient sur un écran. Tu peux les lire dans l’ordre ou au hasard. Les mots difficiles sont expliqués dans le <a href="#/glossary">glossaire</a>.</p>
        <div class="progress"><i style="width:${Math.round((n / F.length) * 100)}%"></i></div>
        <p class="muted small">${n} fiche${n > 1 ? 's' : ''} lue${n > 1 ? 's' : ''} sur ${F.length}.</p></article>
      <ol class="learn-list">${F.map((f, i) => `<li><a class="card learn-item ${L().done[i] ? 'ok' : ''}" href="#/learn/${i + 1}"><span class="lit-n">${i + 1}</span><span><b>${esc(f.t)}</b><span class="muted small">${esc(f.intro.slice(0, 90))}…</span></span></a></li>`).join('')}</ol>
      <p class="center"><a class="btn small ghost" href="#/glossary">Le glossaire</a> <a class="btn small ghost" href="#/liturgy">La Divine Liturgie pas à pas</a></p>
    </section>`;
    return { html, title: 'Découvrir l’Orthodoxie', nav: 'theology' };
  }
  function fiche(k) {
    const F = O.DECOUVRIR, i = +k - 1, f = F[i];
    if (!f) return { html: '<section class="page"><p>Fiche introuvable.</p></section>', title: 'Découvrir', nav: 'theology' };
    const prev = i > 0 ? '#/learn/' + i : '', next = i < F.length - 1 ? '#/learn/' + (i + 2) : '';
    const html = `<section class="page learn" data-swipe>
      ${U.back('#/learn', 'Découvrir l’Orthodoxie')}
      ${U.pageHead('Карточка ' + (i + 1) + ' / ' + F.length, f.t, f.intro)}
      <article class="card"><ul class="learn-pts">${f.pts.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></article>
      <article class="card learn-ret"><div class="card-k">À retenir</div><p>${esc(f.ret)}</p></article>
      ${f.liens.length ? `<p class="center">${f.liens.map(([h, l]) => `<a class="btn small ghost" href="${h}">${esc(l)}</a>`).join(' ')}</p>` : ''}
      <p class="center"><button class="btn small ${L().done[i] ? 'done' : ''}" data-act="learn-done" data-i="${i}">${L().done[i] ? 'Lu ✓' : 'Marquer comme lu'}</button> ${O.askBtn ? O.askBtn(f.t, f.intro + ' ' + f.pts.join(' ')) : ''}</p>
      <div class="row between rnav">${prev ? `<a class="btn small ghost" data-sw="prev" href="${prev}">‹ Précédente</a>` : '<span></span>'}${next ? `<a class="btn small ghost" data-sw="next" href="${next}">Suivante ›</a>` : '<span></span>'}</div>
    </section>`;
    return { html, title: f.t, nav: 'theology' };
  }
  K.act['learn-done'] = (el) => { const i = +el.dataset.i; L().done[i] = !L().done[i]; K.save(); K.render(); };
  route('/learn', hub);
  route('/learn/:k', fiche);

  /* ---------- Glossaire ---------- */
  route('/glossary', () => {
    const G = O.GLOSS.slice().sort((a, b) => a[0].localeCompare(b[0], 'fr'));
    const html = `<section class="page">
      ${U.back('#/learn', 'Découvrir l’Orthodoxie')}
      ${U.pageHead('Словарь', 'Glossaire', 'Les mots que l’on entend à l’église, en une ligne.')}
      <input type="search" class="search-in" id="glQ" placeholder="Chercher un mot (ex. narthex, tropaire)" aria-label="Chercher un mot" autocomplete="off">
      <p class="muted small" id="glN">${G.length} mots</p>
      <dl class="gloss" id="glList">${G.map(([w, d]) => `<div class="gl-item" data-hay="${esc(norm(w + ' ' + d))}"><dt>${esc(w)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl>
    </section>`;
    const after = () => {
      const q = document.getElementById('glQ'), items = [...document.querySelectorAll('#glList .gl-item')];
      q.addEventListener('input', () => {
        const v = norm(q.value.trim()); let n = 0;
        items.forEach((it) => { const ok = !v || it.dataset.hay.includes(v); it.hidden = !ok; if (ok) n++; });
        document.getElementById('glN').textContent = n + (n > 1 ? ' mots' : ' mot');
      });
    };
    return { html, title: 'Glossaire', nav: 'theology', after };
  });

  /* ---------- Distinctions théologiques ---------- */
  route('/distinctions', () => {
    const D = O.DISTINCTIONS;
    const html = `<section class="page apolo">
      ${U.back('#/theology', 'Théologie')}
      ${U.pageHead('Различія', 'Distinctions théologiques', 'Des repères pour retrouver vite une idée : essence et énergies, ousia et hypostase, synergie, théosis…')}
      <input type="search" class="search-in" id="diQ" placeholder="Chercher (ex. Palamas, volonté, Filioque)" aria-label="Chercher" autocomplete="off">
      <p class="muted small" id="diN">${D.length} distinctions</p>
      <div id="diList">${D.map((d) => `<details class="card apo" data-hay="${esc(norm(d.t + ' ' + d.def + ' ' + d.pts.join(' ') + ' ' + d.refs))}">
        <summary><span class="apo-q">${esc(d.t)}</span></summary>
        <div class="apo-body"><p>${esc(d.def)}</p>
          <ul class="apo-pts">${d.pts.map((p) => `<li><p>${esc(p)}</p></li>`).join('')}</ul>
          <p class="muted small"><b>Sources :</b> ${esc(d.refs)}</p>
          <p class="center">${O.askBtn ? O.askBtn(d.t, d.def + ' ' + d.pts.join(' ')) : ''}</p></div></details>`).join('')}</div>
      <p class="muted xs center">Repères rédigés de mémoire à partir des Pères et de manuels usuels ; à vérifier dans les sources citées avant de citer. Ce n’est pas un enseignement officiel.</p>
    </section>`;
    const after = () => {
      const q = document.getElementById('diQ'), items = [...document.querySelectorAll('#diList .apo')];
      q.addEventListener('input', () => {
        const v = norm(q.value.trim()); let n = 0;
        items.forEach((it) => { const ok = !v || it.dataset.hay.includes(v); it.hidden = !ok; if (ok) n++; });
        document.getElementById('diN').textContent = n + (n > 1 ? ' distinctions' : ' distinction');
      });
    };
    return { html, title: 'Distinctions théologiques', nav: 'theology', after };
  });

  /* ---------- Conciles et hérésies ---------- */
  route('/councils', () => {
    const html = `<section class="page">
      ${U.back('#/theology', 'Théologie')}
      ${U.pageHead('Соборы', 'Conciles et hérésies', 'Les sept conciles œcuméniques, quelques conciles locaux importants, et les principales hérésies avec la réponse de l’Église.')}
      <h2 class="more-h">Les sept conciles œcuméniques</h2>
      <ol class="council-list">${O.COUNCILS.map((c) => `<li class="card council"><div class="council-y">${esc(c.y)}</div><div><b>${esc(c.n)}</b>
        <p><span class="muted small">Contre :</span> ${esc(c.who)}</p><p><span class="muted small">Décision :</span> ${esc(c.res)}</p><p class="muted small">${esc(c.note)}</p></div></li>`).join('')}</ol>
      <h2 class="more-h">Conciles et événements importants</h2>
      <ul class="council-local">${O.COUNCILS_LOCAL.map((c) => `<li><span class="council-y">${esc(c.y)}</span><div><b>${esc(c.n)}</b><span class="muted small"> — ${esc(c.t)}</span></div></li>`).join('')}</ul>
      <h2 class="more-h">Les principales hérésies</h2>
      <div class="heresies">${O.HERESIES.map((h) => `<article class="card"><div class="card-k">${esc(h.n)}</div><p class="muted small">${esc(h.d)}</p><p>${esc(h.th)}</p><p><b>Réponse :</b> ${esc(h.rep)}</p></article>`).join('')}</div>
      <p class="muted xs center">Les orthodoxes reconnaissent sept conciles œcuméniques. Les catholiques en comptent vingt et un. Les historiens discutent encore de certaines positions (Nestorius, Origène). Rédigé de mémoire : vérifie avant de citer.</p>
    </section>`;
    return { html, title: 'Conciles et hérésies', nav: 'theology' };
  });
})();
