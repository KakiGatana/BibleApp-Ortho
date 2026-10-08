/* Cahier de débats : notes de discussion relues et nuancées, filtrables par interlocuteur. */
(function () {
  const O = window.ORTHO, K = O.core, U = K.U;
  const { esc, route } = K;
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const kindCls = (k) => 'k-' + norm(k);

  function table(t) {
    return `<div class="deb-table-wrap"><table class="deb-table"><thead><tr>${t.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>${t.rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`)).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  function entry(e) {
    const kinds = [...new Set(e.pts.map((p) => p[0]))];
    const hay = norm(e.q + ' ' + e.pts.map((p) => p[1]).join(' ') + ' ' + e.lim + ' ' + (e.refs || '') + ' ' + (e.table ? e.table.rows.map((r) => r.join(' ')).join(' ') : ''));
    const text = e.q + '\n' + e.pts.map((p) => p[1]).join('\n');
    return `<details class="card apo" data-who="${e.who.join('|')}" data-hay="${esc(hay)}">
      <summary><span class="apo-q">${esc(e.q)}</span><span class="apo-k">${e.avis ? '<i class="apo-b k-avis">Avis, pas doctrine</i>' : ''}${kinds.map((k) => `<i class="apo-b ${kindCls(k)}">${esc(k)}</i>`).join('')}</span></summary>
      <div class="apo-body">
        <ul class="apo-pts">${e.pts.map(([k, t]) => `<li><span class="apo-b ${kindCls(k)}">${esc(k)}</span><p>${esc(t)}</p></li>`).join('')}</ul>
        ${e.table ? table(e.table) : ''}
        <div class="apo-lim"><b>À nuancer</b><p>${esc(e.lim)}</p></div>
        ${e.refs ? `<p class="muted small apo-read"><b>Sources :</b> ${esc(e.refs)}</p>` : ''}
        <p class="center">${O.askBtn ? O.askBtn(e.q.replace(/[«»]/g, '').trim(), 'Sujet de débat : ' + e.q + '\nÉléments :\n' + text) : ''}</p>
      </div>
    </details>`;
  }

  route('/debats', () => {
    const list = O.DEBATS || [];
    const html = `<section class="page apolo">
      ${U.back('#/hub/theo', 'Théologie')}
      ${U.pageHead('Споръ', 'Cahier de débats', 'Tes notes de discussion de théologie, classées par interlocuteur : catholiques, protestants, non-croyants.')}
      <article class="card apo-intro"><p>Ces notes viennent d’une discussion avec une IA, que j’ai <b>relue</b>. L’encadré <b>« À nuancer »</b> de chaque fiche signale où l’argument d’origine va trop loin ou prête le flanc : c’est ce que ton interlocuteur te répondra. Vérifie les références avant de les citer.</p></article>
      <div class="apo-tools">
        <input type="search" class="search-in" id="dbQ" placeholder="Chercher (ex. Anselme, Romains 9, baptême)" aria-label="Chercher" autocomplete="off">
        <div class="chips" id="dbWho">${(O.DEBATS_WHO || []).map(([v, l], i) => `<button class="chip-btn ${i === 0 ? 'on' : ''}" data-v="${v}">${l}</button>`).join('')}</div>
      </div>
      <p class="muted small" id="dbN">${list.length} fiches</p>
      <div id="dbList" data-notrans>${list.map(entry).join('')}</div>
    </section>`;
    const after = () => {
      const st = { who: 'tous', q: '' }, cards = [...document.querySelectorAll('#dbList .apo')];
      const apply = () => {
        let n = 0; const q = norm(st.q.trim());
        cards.forEach((c) => { const ok = (st.who === 'tous' || c.dataset.who.split('|').includes(st.who)) && (!q || c.dataset.hay.includes(q)); c.hidden = !ok; if (ok) n++; });
        const el = document.getElementById('dbN'); if (el) el.textContent = n + (n > 1 ? ' fiches' : ' fiche');
      };
      const box = document.getElementById('dbWho');
      box.addEventListener('click', (ev) => { const b = ev.target.closest('button[data-v]'); if (!b) return; st.who = b.dataset.v; box.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b)); apply(); });
      const qi = document.getElementById('dbQ'); qi.addEventListener('input', () => { st.q = qi.value; apply(); });
    };
    return { html, title: 'Cahier de débats', nav: 'theology', after };
  });
})();
