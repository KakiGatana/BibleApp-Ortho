/* Objections et réponses : arguments classiques contre la foi chrétienne et contre l'Orthodoxie, avec des pistes de réponse. */
(function () {
  const O = window.ORTHO, K = O.core, U = K.U;
  const { esc, route } = K;
  const CATS = [['all', 'Tout'], ['foi', 'Contre la foi chrétienne'], ['orth', 'Contre l’Orthodoxie']];
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  function entry(e) {
    const kinds = [...new Set(e.pts.map((p) => p[0]))];
    const text = e.q + '\n' + e.pts.map((p) => p[1]).join('\n');
    const hay = norm(e.q + ' ' + e.pts.map((p) => p[1]).join(' '));
    return `<details class="card apo" data-cat="${e.cat}" data-kinds="${kinds.join('|')}" data-hay="${esc(hay)}">
      <summary><span class="apo-q">${esc(e.q)}</span><span class="apo-k">${kinds.map((k) => `<i class="apo-b k-${norm(k)}">${esc(k)}</i>`).join('')}</span></summary>
      <div class="apo-body">
        <ul class="apo-pts">${e.pts.map(([k, t]) => `<li><span class="apo-b k-${norm(k)}">${esc(k)}</span><p>${esc(t)}</p></li>`).join('')}</ul>
        <div class="apo-lim"><b>Honnêtement</b><p>${esc(e.lim)}</p></div>
        ${e.lire ? `<p class="muted small apo-read"><b>Pour aller plus loin :</b> ${esc(e.lire)}</p>` : ''}
        <p class="center">${O.askBtn ? O.askBtn(e.q.replace(/[«»]/g, '').trim(), 'Objection : ' + e.q + '\nPistes de réponse :\n' + text) : ''}</p>
      </div>
    </details>`;
  }

  function view() {
    const list = O.APOLO || [];
    const kinds = O.APOLO_KINDS || [];
    const html = `<section class="page apolo">
      ${U.pageHead('Отвѣтъ', 'Objections et réponses', 'Les arguments classiques contre la foi chrétienne et contre l’Orthodoxie, avec des pistes de réponse : philosophiques, théologiques, historiques, archéologiques.')}
      <article class="card apo-intro"><p>Ce sont des <b>pistes</b>, pas des preuves imparables. Chaque réponse dit aussi ce que l’argument <b>ne prouve pas</b>. Pour discuter avec quelqu’un, écoute d’abord sa question avant de répondre. Et pour approfondir : le bouton « Demander à l’assistant ».</p></article>
      <div class="apo-tools">
        <input type="search" class="search-in" id="apoQ" placeholder="Chercher (ex. pape, icônes, mal, résurrection)" aria-label="Chercher une objection" autocomplete="off">
        <div class="chips" id="apoCats">${CATS.map(([v, l], i) => `<button class="chip-btn ${i === 0 ? 'on' : ''}" data-v="${v}">${l}</button>`).join('')}</div>
        <div class="chips" id="apoKinds"><button class="chip-btn on" data-v="all">Tous les types</button>${kinds.map((k) => `<button class="chip-btn" data-v="${esc(k)}">${esc(k)}</button>`).join('')}</div>
      </div>
      <p class="muted small" id="apoCount">${list.length} objections</p>
      <div id="apoList">${list.map(entry).join('')}</div>
      <p class="muted xs center">Réponses rédigées à partir de sources patristiques, historiques et académiques (liste de lectures sous chaque réponse). À vérifier auprès de ton prêtre ou de ton père spirituel : ce n’est pas un enseignement officiel de l’Église.</p>
    </section>`;
    const after = () => {
      const st = { cat: 'all', kind: 'all', q: '' };
      const cards = [...document.querySelectorAll('#apoList .apo')];
      const apply = () => {
        let n = 0; const q = norm(st.q.trim());
        cards.forEach((c) => {
          const ok = (st.cat === 'all' || c.dataset.cat === st.cat) && (st.kind === 'all' || c.dataset.kinds.split('|').includes(st.kind)) && (!q || c.dataset.hay.includes(q));
          c.hidden = !ok; if (ok) n++;
        });
        const el = document.getElementById('apoCount'); if (el) el.textContent = n + (n > 1 ? ' objections' : ' objection');
      };
      const wire = (id, key) => {
        const box = document.getElementById(id); if (!box) return;
        box.addEventListener('click', (ev) => {
          const b = ev.target.closest('button[data-v]'); if (!b) return;
          st[key] = b.dataset.v; box.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b)); apply();
        });
      };
      wire('apoCats', 'cat'); wire('apoKinds', 'kind');
      const qi = document.getElementById('apoQ'); if (qi) qi.addEventListener('input', () => { st.q = qi.value; apply(); });
    };
    return { html, title: 'Objections et réponses', nav: 'theology', after };
  }
  route('/apolo', view);
})();
