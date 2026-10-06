/* Vues : recherche globale, règle de prière du matin et du soir */
(function () {
  const O = window.ORTHO, K = O.core, C = O.cal, U = K.U;
  const { S, esc, ic, route } = K;

  /* ---------- recherche globale ---------- */
  const SL = { 'ѣ': 'е', 'ѳ': 'ф', 'і': 'и', 'ѵ': 'и', 'ѡ': 'о', 'ѧ': 'я', 'ѫ': 'у', 'ѯ': 'кс', 'ѱ': 'пс', 'ѕ': 'з', 'ѿ': 'от', 'ѹ': 'у', 'ꙋ': 'у', 'ё': 'е', 'ъ': 'ъ', 'ь': 'ъ' };
  // normalise en conservant la longueur (pour retrouver la position du résultat dans le texte d'origine)
  function norm(s) {
    let out = '';
    for (const ch of String(s)) {
      let c = ch.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      if (SL[c] !== undefined) c = SL[c].length === 1 ? SL[c] : (SL[c] || ' ');
      out += c.length === 1 ? c : ch.toLowerCase();
    }
    return out;
  }

  let INDEX;
  function buildIndex() {
    const rows = [];
    const add = (type, title, text, href, extra) => rows.push({ type, title, text, href, hay: norm(title + ' ' + text + ' ' + (extra || '')) });
    (O.READINGS || []).forEach((r) => add('Écriture', r.ref + ' — ' + r.title, r.fr.join(' '), '#/passage/' + r.id, (r.cs || []).join(' ') + ' ' + r.tags.join(' ') + ' ' + r.intro + ' ' + (r.csExtract || []).map((x) => x[1]).join(' ')));
    (O.PRAYERS || []).forEach((p) => add('Prière', p.title, p.fr.replace(/\n/g, ' '), '#/prayer/' + p.id, p.titleCs + ' ' + p.cs.replace(/\n/g, ' ')));
    (O.FEASTS || []).forEach((f) => add('Fête', f.name, f.sub || '', '#/feast/' + f.id, f.cs));
    (O.THEOLOGY || []).forEach((t) => add('Théologie', t.title, t.sub || '', '#/theo/' + t.id));
    (O.VOCAB || []).forEach((w) => add('Slavon', w[0] + ' (' + w[1] + ')', w[2], '#/slavonic/vocab'));
    (O.VERSES || []).forEach((v) => add('Verset', v[0], v[1], '', (v[2] || '') + ' ' + (v[3] || '')));
    return rows;
  }

  function snippet(text, q) {
    const i = norm(text).indexOf(q);
    if (i < 0) return text.length > 150 ? text.slice(0, 147) + '…' : text;
    const a = Math.max(0, i - 50), b = Math.min(text.length, i + q.length + 90);
    return (a > 0 ? '…' : '') + esc(text.slice(a, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length, b)) + (b < text.length ? '…' : '');
  }

  function searchView() {
    const html = `<section class="page">
      ${U.pageHead('Поиск', 'Recherche', 'Dans les Écritures, les prières, les fêtes, la théologie, le vocabulaire slavon et les versets du jour. Les accents sont ignorés.')}
      <div class="search"><span>${ic('search')}</span><input id="gq" type="search" placeholder="berger, Magnificat, Господь, repentir…" autocomplete="off" autofocus></div>
      <div id="gres" class="gres"></div>
    </section>`;
    const after = (root) => {
      const inp = root.querySelector('#gq'), box = root.querySelector('#gres');
      const run = () => {
        const q = norm(inp.value.trim());
        if (q.length < 2) { box.innerHTML = '<p class="muted center">Tape au moins deux lettres.</p>'; return; }
        INDEX = INDEX || buildIndex();
        const hits = INDEX.filter((r) => r.hay.includes(q));
        // les titres d'abord
        hits.sort((a, b) => (norm(b.title).includes(q) ? 1 : 0) - (norm(a.title).includes(q) ? 1 : 0));
        box.innerHTML = hits.length
          ? `<p class="muted small">${hits.length} résultat${hits.length > 1 ? 's' : ''}${hits.length > 40 ? ' — les 40 premiers' : ''}</p><ul class="favs">` +
            hits.slice(0, 40).map((r) => {
              const inner = `<span class="fav-type">${r.type}</span><b>${esc(r.title)}</b><span class="muted small clamp">${snippet(r.text, q)}</span>`;
              return `<li>${r.href ? `<a href="${r.href}">${inner}</a>` : `<div class="plain">${inner}</div>`}</li>`;
            }).join('') + '</ul>'
          : '<p class="muted center">Aucun résultat.</p>';
      };
      inp.addEventListener('input', run);
      run();
      setTimeout(() => inp.focus(), 50);
    };
    return { html, title: 'Recherche', nav: 'search', after };
  }
  route('/search', searchView);

  /* ---------- règle de prière ---------- */
  const RULES = {
    morning: {
      title: 'Règle du matin', cs: 'Правило утреннее', sub: 'Pour commencer la journée devant Dieu.',
      ids: ['roi-celeste', 'trisagion', 'pater', 'venez-adorons', 'symbole', 'jesus', 'bogoroditse', 'doxologie']
    },
    evening: {
      title: 'Règle du soir', cs: 'Правило вечернее', sub: 'Pour rendre grâce et confier la nuit au Seigneur.',
      ids: ['roi-celeste', 'trisagion', 'pater', 'phos-hilaron', 'symbole', 'dostoino', 'jesus', 'doxologie']
    }
  };
  O.RULES = RULES;
  const items = (kind) => RULES[kind].ids.map((id) => O.PRAYERS.find((p) => p.id === id)).filter(Boolean);
  const todayIso = () => C.isoKey(C.today());
  const doneList = (kind, iso) => (((S.done[iso || todayIso()] || {}).rule || {})[kind]) || [];
  const progress = (kind) => `${doneList(kind).length}/${items(kind).length}`;

  function ruleTiles() {
    return `<div class="tiles">${['morning', 'evening'].map((k) => {
      const ok = doneList(k).length === items(k).length;
      return `<a class="tile" href="#/rule/${k}"><span class="tile-ic">${ic(k === 'morning' ? 'sun' : 'moon')}</span><div><b>${RULES[k].title}</b><span>${esc(RULES[k].sub)}</span></div><span class="badge ${ok ? '' : 'dim'}">${ok ? 'Faite' : progress(k)}</span></a>`;
    }).join('')}</div>`;
  }
  O.ruleTiles = ruleTiles;

  function ruleView(kind) {
    const R = RULES[kind];
    if (!R) return { html: '<section class="page"><p>Règle introuvable.</p></section>', nav: 'prayers' };
    const list = items(kind), done = new Set(doneList(kind));
    const html = `<section class="page rule" data-kind="${kind}">
      ${U.back('#/prayers', 'Prières')}
      ${U.pageHead(esc(R.cs), esc(R.title), esc(R.sub) + ' Lis chaque prière puis coche-la.')}
      <div class="rule-bar"><b id="rprog">${done.size} / ${list.length}</b><div class="rule-track"><i id="rfill" style="width:${list.length ? (done.size / list.length) * 100 : 0}%"></i></div></div>
      ${U.seg([['fr', 'Français'], ['both', 'Parallèle'], ['cs', 'Слав.']], S.settings.lang, 'set-lang')}
      ${list.map((p, i) => `<article class="card rule-item ${done.has(p.id) ? 'done' : ''}" data-id="${p.id}">
        <div class="row between"><div><span class="muted small">${i + 1}.</span> <b>${esc(p.title)}</b> <span class="cs small">${esc(p.titleCs)}</span></div>
        <button class="btn small ${done.has(p.id) ? '' : 'ghost'}" data-act="rule-toggle" data-kind="${kind}" data-id="${p.id}" aria-pressed="${done.has(p.id)}">${done.has(p.id) ? 'Faite ✓' : 'Faite ?'}</button></div>
        ${U.pairs(p.fr.split('\n'), p.cs.split('\n'), 1).replace('<div class="pairs">', '<div class="pairs novn">')}
        <p class="muted xs"><a href="#/prayer/${p.id}">Lecture mot à mot et explications</a></p>
      </article>`).join('')}
      <p class="muted xs center">Règle indicative et abrégée : adapte-la avec ton père spirituel. Pendant le Carême, ajoute la prière de saint Éphrem.</p>
    </section>`;
    return { html, title: R.title, nav: 'prayers' };
  }
  route('/rule/:kind', ruleView);

  K.act['rule-toggle'] = (el) => {
    const kind = el.dataset.kind, id = el.dataset.id, iso = todayIso();
    S.done[iso] = S.done[iso] || {}; S.done[iso].rule = S.done[iso].rule || {};
    const set = new Set(S.done[iso].rule[kind] || []);
    set.has(id) ? set.delete(id) : set.add(id);
    S.done[iso].rule[kind] = [...set]; K.save();
    const card = el.closest('.rule-item'), on = set.has(id), total = items(kind).length;
    card.classList.toggle('done', on);
    el.textContent = on ? 'Faite ✓' : 'Faite ?'; el.classList.toggle('ghost', !on); el.setAttribute('aria-pressed', on);
    const prog = document.getElementById('rprog'), fill = document.getElementById('rfill');
    if (prog) prog.textContent = set.size + ' / ' + total;
    if (fill) fill.style.width = (set.size / total) * 100 + '%';
    if (on && set.size === total) K.toast('Règle accomplie. Слава Богу !');
  };
})();
