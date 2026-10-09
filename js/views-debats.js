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
    const text = e.q + '\n' + e.pts.map((p) => p[1]).join('\n');
    return `<details class="card apo" data-who="${e.who.join('|')}">
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

  const PAGE = 40;
  route('/debats', () => {
    const list = O.DEBATS || [];
    const hays = list.map((e) => norm(e.q + ' ' + e.pts.map((p) => p[1]).join(' ') + ' ' + e.lim + ' ' + (e.refs || '') + ' ' + (e.table ? e.table.rows.map((r) => r.join(' ')).join(' ') : '')));
    const themes = [...new Set(list.map((e) => e.th).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'fr'));
    const html = `<section class="page apolo">
      ${U.back('#/hub/theo', 'Théologie')}
      ${U.pageHead('Споръ', 'Cahier de débats', 'Des fiches de discussion de théologie et d’histoire, classées par interlocuteur et par thème.')}
      <article class="card apo-intro"><p>Ces fiches viennent d’une longue discussion avec une IA, que j’ai <b>relue</b> et distillée. L’encadré <b>« À nuancer »</b> de chaque fiche signale où l’argument d’origine va trop loin ou prête le flanc : c’est ce que ton interlocuteur te répondra. Les <b>avis</b> sont marqués comme tels. Vérifie les références avant de les citer.</p></article>
      <div class="apo-tools">
        <input type="search" class="search-in" id="dbQ" placeholder="Chercher (ex. Anselme, Romains 9, baptême)" aria-label="Chercher" autocomplete="off">
        <div class="chips" id="dbWho">${(O.DEBATS_WHO || []).map(([v, l], i) => `<button class="chip-btn ${i === 0 ? 'on' : ''}" data-v="${v}">${l}</button>`).join('')}</div>
        <select class="search-in" id="dbTh" aria-label="Thème"><option value="">Tous les thèmes</option>${themes.map((t) => `<option value="${esc(t)}">${esc(t)}</option>`).join('')}</select>
      </div>
      <p class="muted small" id="dbN">${list.length} fiches</p>
      <div id="dbList" data-notrans></div>
      <p class="center"><button class="btn" id="dbMore" hidden>Afficher la suite</button></p>
    </section>`;
    const after = () => {
      const st = { who: 'tous', th: '', q: '', shown: PAGE };
      const box = document.getElementById('dbWho'), out = document.getElementById('dbList'), more = document.getElementById('dbMore');
      const render = () => {
        const q = norm(st.q.trim());
        const hit = list.filter((e, i) => (st.who === 'tous' || e.who.includes(st.who)) && (!st.th || e.th === st.th) && (!q || hays[i].includes(q)));
        out.innerHTML = hit.slice(0, st.shown).map(entry).join('') || '<p class="muted">Aucune fiche.</p>';
        more.hidden = hit.length <= st.shown;
        const el = document.getElementById('dbN'); if (el) el.textContent = hit.length + (hit.length > 1 ? ' fiches' : ' fiche');
      };
      const reset = () => { st.shown = PAGE; render(); };
      box.addEventListener('click', (ev) => { const b = ev.target.closest('button[data-v]'); if (!b) return; st.who = b.dataset.v; box.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b)); reset(); });
      document.getElementById('dbTh').addEventListener('change', (ev) => { st.th = ev.target.value; reset(); });
      const qi = document.getElementById('dbQ'); qi.addEventListener('input', () => { st.q = qi.value; reset(); });
      more.addEventListener('click', () => { st.shown += PAGE; render(); });
      render();
    };
    return { html, title: 'Cahier de débats', nav: 'theology', after };
  });
})();
