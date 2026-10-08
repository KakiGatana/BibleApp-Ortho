/* Vues : recherche globale, prière du matin et du soir */
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
    // fiches, glossaire, distinctions, objections, conciles, hérésies, paroles des Pères, pages utiles
    (O.DECOUVRIR || []).forEach((f, i) => add('Fiche', f.t, f.intro + ' ' + f.pts.join(' '), '#/learn/' + (i + 1), f.ret));
    (O.GLOSS || []).forEach(([w, d]) => add('Glossaire', w, d, '#/glossary'));
    (O.DISTINCTIONS || []).forEach((d) => add('Distinction', d.t, d.def, '#/distinctions', d.pts.join(' ') + ' ' + d.refs));
    (O.APOLO || []).forEach((e) => add('Objection', e.q.replace(/[«»]/g, '').trim(), e.pts.map((x) => x[1]).join(' '), '#/apolo', e.lim + ' ' + (e.lire || '')));
    (O.DEBATS || []).forEach((e) => add('Débat', e.q.replace(/[«»]/g, '').trim(), e.pts.map((x) => x[1]).join(' '), '#/debats', e.lim + ' ' + (e.refs || '') + ' ' + (e.table ? e.table.rows.map((r) => r.join(' ')).join(' ') : '')));
    (O.PERES || []).forEach((x) => add('Parole des Pères', x.a, x.t, '#/peres', x.s));
    (O.COUNCILS || []).forEach((c) => add('Concile', c.n + ' (' + c.y + ')', c.res, '#/councils', c.who + ' ' + c.note));
    (O.HERESIES || []).forEach((h) => add('Hérésie', h.n, h.th, '#/councils', h.d + ' ' + h.rep));
    [['Psautier', 'Les 150 psaumes en 20 kathismes, lecture avec marque-page', '#/psalter'], ['La Divine Liturgie', 'Déroulé pas à pas : ce qui se passe, ce qui se dit, ce que je fais', '#/liturgy'],
      ['Chants', 'Mes playlists Spotify et YouTube de chants orthodoxes', '#/chants'], ['Paroisses près de moi', 'Trouver une paroisse orthodoxe à proximité', '#/parishes'],
      ['Pour les enfants', 'Le saint du jour raconté simplement, signe de la croix, premières prières', '#/kids'], ['Son d’ambiance', 'Un bourdon discret ou ton propre fichier audio', '#/settings'],
      ['Prière de Jésus', 'Corde de prière : 33, 50 ou 100 nœuds', '#/jesus']].forEach(([t, d, h]) => add('Page', t, d, h));
    // saints et mémoires : lien vers le jour de l'année en cours
    const y = C.today().getUTCFullYear(), style = S.settings.style;
    Object.keys(O.SAINTS || {}).forEach((md) => {
      const [mm, dd] = md.split('-').map(Number);
      let href = '#/saints';
      try { href = '#/day/' + C.isoKey(C.civilFromNominal(y, mm, dd, style)); } catch (e) { /* on garde la liste des saints */ }
      O.SAINTS[md].forEach((raw) => { const n = C.parseSaint(raw).name; add('Saint', n, dd + '/' + mm, href); });
    });
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
      ${U.pageHead('Поиск', 'Recherche', 'Dans les Écritures, les prières, les fêtes, les saints, la théologie, les objections, le glossaire, les conciles, le vocabulaire slavon et les versets du jour. Les accents sont ignorés.')}
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

  /* ---------- prière du matin et du soir ---------- */
  const RULES = {
    morning: {
      title: 'Prière du matin', cs: 'Правило утреннее', sub: 'Pour commencer la journée devant Dieu.',
      ids: ['roi-celeste', 'trisagion', 'pater', 'venez-adorons', 'symbole', 'jesus', 'bogoroditse', 'doxologie']
    },
    evening: {
      title: 'Prière du soir', cs: 'Правило вечернее', sub: 'Pour rendre grâce et confier la nuit au Seigneur.',
      ids: ['roi-celeste', 'trisagion', 'pater', 'phos-hilaron', 'symbole', 'dostoino', 'jesus', 'doxologie']
    }
  };
  O.RULES = RULES;
  const items = (kind) => RULES[kind].ids.map((id) => O.PRAYERS.find((p) => p.id === id)).filter(Boolean);
  const todayIso = () => C.isoKey(C.today());
  const doneList = (kind, iso) => (((S.done[iso || todayIso()] || {}).rule || {})[kind]) || [];
  const progress = (kind) => `${doneList(kind).length}/${items(kind).length}`;

  // jours de suite où une règle (matin ou soir) a été entièrement cochée
  function ruleStreak() {
    const full = (iso) => ['morning', 'evening'].some((k) => items(k).length && doneList(k, iso).length >= items(k).length);
    let d = C.today(), n = 0;
    if (!full(C.isoKey(d))) d = C.addDays(d, -1);
    while (full(C.isoKey(d))) { n++; d = C.addDays(d, -1); }
    return n;
  }

  function ruleTiles() {
    const rs = ruleStreak();
    return (rs ? `<p class="rule-streak">${ic('flame')}<b>${rs}</b> jour${rs > 1 ? 's' : ''} de prière de suite</p>` : '') + `<div class="tiles">${['morning', 'evening'].map((k) => {
      const ok = doneList(k).length === items(k).length;
      return `<a class="tile" href="#/rule/${k}"><span class="tile-ic">${ic(k === 'morning' ? 'sun' : 'moon')}</span><div><b>${RULES[k].title}</b><span>${esc(RULES[k].sub)}</span></div><span class="badge ${ok ? '' : 'dim'}">${ok ? 'Faite' : progress(k)}</span></a>`;
    }).join('')}</div>`;
  }
  O.ruleTiles = ruleTiles;

  function ruleView(kind) {
    const R = RULES[kind];
    if (!R) return { html: '<section class="page"><p>Prière introuvable.</p></section>', nav: 'prayers' };
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
      <p class="muted xs center">Prière indicative et abrégée : adapte-la avec ton père spirituel. Pendant le Carême, ajoute la prière de saint Éphrem.</p>
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
    if (on && set.size === total) K.toast('Prière accomplie. Слава Богу !');
    if (O.push) O.push.sync();
  };

  /* ---------- jalons de série ---------- */
  O.milestones = () => {
    const n = K.streak(), M = [7, 14, 30, 50, 100, 200, 365];
    S.mile = S.mile || {};
    if (M.includes(n) && !S.mile[n]) { S.mile[n] = 1; K.save(); K.toast(n + ' jours de suite ! Слава Богу.'); }
  };

  /* ---------- installer et partager ---------- */
  const appUrl = () => location.origin + location.pathname.replace(/index\.html$/, '');
  route('/install', () => ({
    html: `<section class="page prose-page">
      ${U.pageHead('Установка', 'Installer et partager', 'Blagovest s’installe comme une vraie appli, sans magasin d’applications, et fonctionne hors ligne.')}
      <article class="card"><div class="card-k">Sur Android (Chrome)</div>
        <ol class="steps"><li>Ouvre le site dans Chrome.</li><li>Touche le menu <b>⋮</b> en haut à droite.</li><li>Choisis <b>Installer l’application</b> (ou « Ajouter à l’écran d’accueil »).</li></ol></article>
      <article class="card"><div class="card-k">Sur iPhone et iPad (Safari)</div>
        <ol class="steps"><li>Ouvre le site dans <b>Safari</b> (pas dans un autre navigateur).</li><li>Touche le bouton <b>Partager</b> (le carré avec une flèche).</li><li>Choisis <b>Sur l’écran d’accueil</b>, puis <b>Ajouter</b>.</li><li>Ouvre ensuite l’appli <b>depuis son icône</b>. Les notifications demandent iOS 16.4 ou plus.</li></ol></article>
      <article class="card"><div class="card-k">Sur ordinateur (Chrome, Edge)</div>
        <ol class="steps"><li>Dans la barre d’adresse, touche l’icône d’installation (un petit écran avec une flèche).</li><li>Confirme avec <b>Installer</b>.</li></ol></article>
      <article class="card center"><div class="card-k">Partager Blagovest</div>
        <p class="muted small">Envoie le lien à un proche, à ta paroisse ou à ton catéchuménat.</p>
        <div class="row center"><button class="btn" data-act="share-app">${ic('share')}<span>Partager l’application</span></button><button class="btn ghost" data-act="copy-app">Copier le lien</button></div>
        <p class="muted xs">${esc(appUrl())}</p></article>
    </section>`,
    title: 'Installer et partager', nav: 'install'
  }));
  K.act['share-app'] = async () => {
    const data = { title: 'Blagovest', text: 'Blagovest : Bible, calendrier, prières et slavon orthodoxes.', url: appUrl() };
    try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(appUrl()); K.toast('Lien copié'); } } catch (e) { /* partage annulé */ }
  };
  K.act['copy-app'] = async () => { try { await navigator.clipboard.writeText(appUrl()); K.toast('Lien copié'); } catch (e) { K.toast(appUrl()); } };

  /* ---------- bienvenue (première ouverture seulement) ---------- */
  O.welcome = () => {
    if (S.seen || (S.visits || []).length > 1) return;
    K.openSheet(`${O.i18n ? O.i18n.chips() : ''}<h2 class="sheet-title">Bienvenue dans Blagovest</h2>
      <p class="muted">Благовѣстъ : la « bonne nouvelle », et le carillon qui appelle à la prière. Quelques repères pour commencer :</p>
      <ul class="welcome">
        <li>${ic('home')}<div><b>Accueil</b><span>Le bouton doré au centre : la date liturgique, le verset du jour, les saints et le jeûne.</span></div></li>
        <li>${ic('chat')}<div><b>Assistant IA</b><span>À gauche : pose tes questions de théologie et d’histoire de l’Église.</span></div></li>
        <li>${ic('cal')}<div><b>Calendrier</b><span>Les fêtes, les jeûnes et les saints de chaque jour de l’année.</span></div></li>
        <li>${ic('pray')}<div><b>Prier</b><span>La Prière de Jésus, les prières du matin et du soir, le psautier et la liturgie.</span></div></li>
        <li>${ic('menu')}<div><b>Menu</b><span>Écritures, théologie, slavon, vie de l’Église, quiz et réglages.</span></div></li>
      </ul>
      <p class="center"><button class="btn" data-act="welcome-close">Commencer</button></p>`);
  };
  K.act['welcome-close'] = () => { S.seen = 1; K.save(); K.closeSheet(); };
})();
