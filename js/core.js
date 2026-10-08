/* =========================================================
   Noyau : état persistant, routeur, composants partagés
   ========================================================= */
(function () {
  const O = (window.ORTHO = window.ORTHO || {});
  const C = O.cal;

  /* ---------- utilitaires ---------- */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ic = (n, cls) => `<svg class="${cls || 'ic'}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  /* ---------- état ---------- */
  const KEY = 'blagovest:v1';
  const defaults = () => ({
    settings: { theme: 'auto', style: 'new', lang: 'both', fs: 1, translit: true },
    fav: [], notes: {}, cards: {}, done: {}, visits: [], quiz: {}
  });
  function load() {
    const d = defaults();
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
      return Object.assign(d, raw, { settings: Object.assign(d.settings, raw.settings || {}) });
    } catch (e) { return d; }
  }
  const S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* stockage indisponible */ } }

  function applySettings() {
    const r = document.documentElement;
    if (S.settings.theme === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', S.settings.theme);
    r.setAttribute('data-lang', S.settings.lang);
    r.setAttribute('data-reading', S.settings.reading ? '1' : '0');
    r.setAttribute('data-font', S.settings.font ? 'legible' : 'normal');
    r.setAttribute('data-contrast', S.settings.contrast ? '1' : '0');
    r.style.setProperty('--fs', S.settings.fs);
    const lb = $('#langBadge');
    if (lb) { const uc = (S.settings.ui || 'fr').toUpperCase(); lb.textContent = { both: uc + ' · СЛ', fr: uc, cs: 'СЛ' }[S.settings.lang]; }
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', effectiveTheme() === 'dark' ? '#254287' : '#edf1f9');
  }
  function effectiveTheme() {
    if (S.settings.theme !== 'auto') return S.settings.theme;
    return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /* ---------- séries (jours consécutifs) ---------- */
  function markVisit() {
    const t = C.isoKey(C.today());
    if (!S.visits.includes(t)) { S.visits.push(t); S.visits = S.visits.slice(-400); save(); }
  }
  function streak() {
    const set = new Set(S.visits);
    let n = 0, d = C.today();
    while (set.has(C.isoKey(d))) { n++; d = C.addDays(d, -1); }
    return n;
  }

  /* ---------- feuille modale & toast ---------- */
  const sheet = () => $('#sheet'), back = () => $('#sheetBack');
  function openSheet(html, cls) {
    const s = sheet();
    s.className = 'sheet ' + (cls || '');
    s.innerHTML = `<button class="sheet-close icon-btn" data-act="sheet-close" aria-label="Fermer">${ic('close')}</button>` + html;
    s.hidden = false; back().hidden = false;
    requestAnimationFrame(() => { s.classList.add('open'); back().classList.add('open'); });
    document.body.classList.add('noscroll');
  }
  function closeSheet() {
    const s = sheet(); s.classList.remove('open'); back().classList.remove('open');
    document.body.classList.remove('noscroll');
    setTimeout(() => { s.hidden = true; back().hidden = true; }, 220);
  }
  let toastT;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200);
  }

  /* ---------- synthèse vocale (approximation : voix russe moderne) ---------- */
  function modernize(s) {
    return s.normalize('NFD').replace(/[̀-ͯ҃-҉]/g, '').normalize('NFC')
      .replace(/ѣ/g, 'е').replace(/Ѣ/g, 'Е').replace(/ѳ/g, 'ф').replace(/Ѳ/g, 'Ф').replace(/ѵ/g, 'и').replace(/Ѵ/g, 'И')
      .replace(/і/g, 'и').replace(/І/g, 'И').replace(/ѡ/g, 'о').replace(/Ѡ/g, 'О').replace(/ѧ/g, 'я').replace(/Ѧ/g, 'Я')
      .replace(/ѯ/g, 'кс').replace(/ѱ/g, 'пс').replace(/ꙋ/g, 'у').replace(/є/g, 'е').replace(/ѿ/g, 'от').replace(/ѕ/g, 'дз')
      .replace(/(^|[^а-яё])мiр/gi, '$1мир');
  }
  function speak(text) {
    if (!('speechSynthesis' in window)) { toast('La synthèse vocale n’est pas disponible sur cet appareil.'); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(modernize(text));
    u.lang = 'ru-RU'; u.rate = 0.82;
    const v = speechSynthesis.getVoices().find((x) => /^ru/i.test(x.lang));
    if (v) u.voice = v; else toast('Aucune voix russe installée : la lecture peut être approximative.');
    speechSynthesis.speak(u);
  }

  /* ---------- routeur ---------- */
  const routes = [];
  function route(pattern, fn) {
    routes.push([new RegExp('^' + pattern.replace(/:\w+/g, '([^/]+)') + '$'), fn]);
  }
  function go(h) { if (location.hash === h) render(); else location.hash = h; }
  function render() {
    const path = location.hash.replace(/^#/, '') || '/today';
    const view = $('#view');
    for (const [re, fn] of routes) {
      const m = re.exec(path);
      if (!m) continue;
      let out;
      try { out = fn(...m.slice(1).map(decodeURIComponent)); } catch (e) { console.error(e); out = { html: `<section class="page"><h1>Oups</h1><p>Une erreur est survenue : ${esc(e.message)}</p></section>`, nav: 'today' }; }
      view.innerHTML = out.html;
      view.classList.remove('enter'); void view.offsetWidth; view.classList.add('enter');
      document.title = (out.title ? out.title + ' · ' : '') + 'Blagovest';
      updateNav(out.nav);
      window.scrollTo(0, 0);
      if (out.after) out.after(view);
      return;
    }
    go('#/today');
  }

  /* ---------- navigation ---------- */
  const NAV = [
    ['today', 'Aujourd’hui', 'sun', '#/today'],
    ['calendar', 'Calendrier', 'cal', '#/calendar'],
    ['bible', 'Écritures', 'book', '#/bible'],
    ['prayers', 'Prières', 'pray', '#/prayers'],
    ['slavonic', 'Slavon', 'slav', '#/slavonic'],
    ['theology', 'Théologie', 'theo', '#/theology'],
    ['apolo', 'Objections et réponses', 'theo', '#/apolo'],
    ['psalter', 'Psautier', 'book', '#/psalter'],
    ['kids', 'Pour les enfants', 'saint', '#/kids'],
    ['liturgy', 'La Divine Liturgie', 'pray', '#/liturgy'],
    ['parishes', 'Paroisses près de moi', 'pin', '#/parishes'],
    ['jesus', 'Prière de Jésus', 'beads', '#/jesus'],
    ['quiz', 'Quiz', 'quiz', '#/slavonic/quiz'],
    ['ask', 'Assistant IA', 'chat', '#/ask'],
    ['search', 'Recherche', 'search', '#/search'],
    ['feasts', 'Fêtes', 'feast', '#/feasts'],
    ['saints', 'Saints', 'saint', '#/saints'],
    ['favorites', 'Favoris', 'heart', '#/favorites'],
    ['install', 'Installer et partager', 'share', '#/install'],
    ['settings', 'Réglages', 'gear', '#/settings']
  ];
  const TABS = ['ask', 'calendar', 'today', 'jesus'];
  const TAB_LABEL = { today: 'Accueil', calendar: 'Calendrier', ask: 'Assistant IA', jesus: 'Prière de Jésus' };
  const TAB_ICON = { today: 'home', calendar: 'cal', ask: 'chat', jesus: 'beads' };
  function buildNav() {
    $('#sideNav').innerHTML = NAV.map(([id, l, i, h]) => `<a href="${h}" data-nav="${id}">${ic(i)}<span>${l}</span></a>`).join('');
    const tab = (id) => {
      const n = NAV.find((x) => x[0] === id);
      return `<a href="${n[3]}" data-nav="${id}" class="${id === 'today' ? 'tab-main' : ''}"><span class="tab-ic">${ic(TAB_ICON[id])}</span><span class="tab-l">${TAB_LABEL[id]}</span></a>`;
    };
    $('#tabbar').innerHTML = TABS.map(tab).join('') +
      `<button data-act="more" data-nav="more" aria-label="Ouvrir le menu"><span class="tab-ic">${ic('menu')}</span><span class="tab-l">Menu</span></button>`;
  }
  function updateNav(id) {
    $$('[data-nav]').forEach((a) => a.classList.toggle('active', a.dataset.nav === id || (a.dataset.nav === 'more' && id && !TABS.includes(id))));
    document.body.classList.toggle('not-home', !!id && id !== 'today');
    document.body.setAttribute('data-sec', id || '');
  }
  const MORE = [
    ['Lire et prier', [['bible', 'Écritures', 'book', 'Psaumes, Évangiles, canon, plan de lecture'], ['prayers', 'Prières', 'pray', 'Prière du matin et du soir, prières mot à mot'], ['psalter', 'Psautier', 'book', 'Les 150 psaumes en 20 kathismes, avec marque-page'], ['slavonic', 'Slavon', 'slav', 'Alphabet, leçons, cartes, quiz'], ['theology', 'Théologie', 'theo', 'Les grands thèmes de la foi, les conciles'], ['apolo', 'Objections et réponses', 'chat', 'Arguments contre la foi et l’Orthodoxie, et comment y répondre'], ['quiz', 'Quiz', 'quiz', 'Défi du jour, culture orthodoxe, slavon']]],
    ['Le temps de l’Église', [['feasts', 'Fêtes', 'feast', 'Sens des fêtes et tropaires'], ['saints', 'Saints', 'saint', 'Les saints de chaque jour'], ['kids', 'Pour les enfants', 'saint', 'Le saint du jour raconté simplement, premières prières'], ['liturgy', 'La Divine Liturgie', 'pray', 'Pas à pas : ce qui se passe, ce qui se dit, ce que je fais'], ['parishes', 'Paroisses près de moi', 'pin', 'Trouver une paroisse orthodoxe à proximité']]],
    ['Mon espace', [['search', 'Recherche', 'search', 'Chercher dans toute l’application'], ['favorites', 'Favoris et notes', 'heart', 'Ce que j’ai gardé'], ['settings', 'Réglages', 'gear', 'Notifications, sauvegarde, thème, mode lecture'], ['install', 'Installer et partager', 'share', 'Ajouter à l’écran d’accueil, l’envoyer à un proche']]]
  ];
  function moreSheet() {
    const href = (id) => NAV.find((n) => n[0] === id)[3];
    const row = ([id, l, i, d]) => `<a href="${href(id)}" data-act="sheet-close" class="more-row"><span class="more-ic">${ic(i)}</span><span class="more-t"><b>${l}</b><small>${d}</small></span>${ic('right', 'ic more-go')}</a>`;
    openSheet(`<h2 class="sheet-title">Menu</h2>
      <a href="#/today" data-act="sheet-close" class="more-row more-home"><span class="more-ic">${ic('home')}</span><span class="more-t"><b>Retour à l’accueil</b><small>Le jour, le verset et les saints du jour</small></span>${ic('right', 'ic more-go')}</a>
      ${MORE.map(([title, items]) => `<h3 class="more-h">${title}</h3><div class="more-list">${items.map(row).join('')}</div>`).join('')}
      <div class="more-list"><a href="#/about" data-act="sheet-close" class="more-row"><span class="more-ic">${ic('logo')}</span><span class="more-t"><b>À propos de Blagovest</b><small>Sources, limites, avertissements</small></span>${ic('right', 'ic more-go')}</a></div>`);
  }

  /* ---------- favoris & notes ---------- */
  const isFav = (id) => S.fav.includes(id);
  function toggleFav(id) {
    const i = S.fav.indexOf(id);
    if (i >= 0) S.fav.splice(i, 1); else S.fav.unshift(id);
    save();
    $$(`[data-act="fav"][data-id="${CSS.escape(id)}"]`).forEach((b) => { b.classList.toggle('on', isFav(id)); b.setAttribute('aria-pressed', isFav(id)); });
    toast(isFav(id) ? 'Ajouté aux favoris' : 'Retiré des favoris');
  }
  function noteSheet(key, label) {
    openSheet(`<h2 class="sheet-title">Ma note</h2><p class="muted small">${esc(label || '')}</p>
      <textarea id="noteText" class="note-area" rows="7" placeholder="Une pensée, une prière, une question à poser à mon père spirituel…">${esc(S.notes[key] || '')}</textarea>
      <div class="row end"><button class="btn ghost" data-act="note-del" data-key="${esc(key)}">Effacer</button><button class="btn" data-act="note-save" data-key="${esc(key)}">Enregistrer</button></div>`);
    setTimeout(() => { const t = $('#noteText'); t && t.focus(); }, 280);
  }

  /* ---------- composants partagés ---------- */
  const U = {
    esc, ic, $, $$,
    pageHead(kicker, title, sub, extra) {
      return `<header class="page-head">${kicker ? `<div class="kicker">${kicker}</div>` : ''}<h1>${title}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}${extra || ''}</header>`;
    },
    back(href, label) { return `<a class="back" href="${href}">${ic('left')}<span>Retour : ${esc(label)}</span></a>`; },
    sectionTitle(t, right) { return `<div class="sec-title"><h2>${t}</h2>${right || ''}</div>`; },
    seg(opts, cur, act, extra) {
      return `<div class="seg" role="tablist">${opts.map(([v, l]) => `<button role="tab" aria-selected="${v === cur}" class="${v === cur ? 'on' : ''}" data-act="${act}" data-v="${esc(v)}" ${extra || ''}>${l}</button>`).join('')}</div>`;
    },
    favBtn(id, label) {
      return `<button class="tool ${isFav(id) ? 'on' : ''}" data-act="fav" data-id="${esc(id)}" aria-pressed="${isFav(id)}" aria-label="Favori" title="Favori">${ic('heart')}${label ? `<span>${label}</span>` : ''}</button>`;
    },
    tools({ id, text, cs, noteKey, noteLabel, share }) {
      return `<div class="tools">
        ${id ? U.favBtn(id) : ''}
        ${cs ? `<button class="tool" data-act="speak" data-text="${esc(cs)}" aria-label="Écouter (voix russe approximative)" title="Écouter (approximatif)">${ic('speak')}</button>` : ''}
        ${text ? `<button class="tool" data-act="copy" data-text="${esc(text)}" aria-label="Copier" title="Copier">${ic('copy')}</button>` : ''}
        ${share ? `<button class="tool" data-act="share" data-text="${esc(share)}" aria-label="Partager" title="Partager">${ic('share')}</button>` : ''}
        ${noteKey ? `<button class="tool ${S.notes[noteKey] ? 'on' : ''}" data-act="note" data-key="${esc(noteKey)}" data-label="${esc(noteLabel || '')}" aria-label="Note" title="Note">${ic('note')}</button>` : ''}
      </div>`;
    },
    /* Lignes parallèles français / slavon */
    pairs(fr, cs, offset) {
      const n = Math.max(fr.length, (cs || []).length);
      let out = '<div class="pairs">';
      for (let i = 0; i < n; i++) {
        out += `<div class="pair"><span class="vn" aria-hidden="true">${(offset || 1) + i}</span>
          <p class="fr">${esc(fr[i] || '')}</p>
          <p class="cs" data-act="speak" data-text="${esc((cs && cs[i]) || '')}" title="Toucher pour écouter">${esc((cs && cs[i]) || '')}</p></div>`;
      }
      return out + '</div>';
    },
    lines(text, cls) { return text.split('\n').map((l) => `<p class="${cls}">${esc(l)}</p>`).join(''); },
    blocks(blocks) {
      return blocks.map((b) => {
        if (b.h) return `<h3>${b.h}</h3>`;
        if (b.p) return `<p>${b.p}</p>`;
        if (b.tip) return `<aside class="tip">${ic('flame')}<div>${b.tip}</div></aside>`;
        if (b.table) return `<div class="tbl-wrap"><table class="tbl"><thead><tr>${b.table.head.map((x) => `<th>${x}</th>`).join('')}</tr></thead><tbody>${b.table.rows.map((r) => `<tr>${r.map((c, i) => `<td${/[Ѐ-ӿ]/.test(c) ? ' class="cs"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
        if (b.ex) return `<ul class="ex">${b.ex.map(([cs, tr, fr]) => `<li><span class="cs" data-act="speak" data-text="${esc(cs)}">${esc(cs)}</span><em class="tr">${esc(tr)}</em><span class="fr">${esc(fr)}</span></li>`).join('')}</ul>`;
        return '';
      }).join('');
    },
    /* Panneau de jeûne */
    fastPanel(f, compact) {
      const MEALS = {
        1: ['Omelette aux herbes et salade', 'Gratin de légumes', 'Pâtes au fromage', 'Poisson grillé et pommes de terre', 'Risotto aux champignons'],
        2: ['Poisson au four et riz', 'Soupe de légumes avec du pain', 'Salade de lentilles', 'Pâtes aux fruits de mer', 'Tarte aux légumes sans laitage'],
        3: ['Soupe de pois chiches', 'Lentilles et riz', 'Pâtes à la tomate et à l’huile d’olive', 'Ratatouille', 'Houmous avec du pain'],
        4: ['Légumes vapeur', 'Soupe de légumes sans huile', 'Riz aux légumes', 'Pommes de terre au four', 'Haricots blancs à la tomate', 'Fruits et compote'],
        5: ['Pain et eau', 'Fruits secs et noix', 'Légumes crus ou cuits à l’eau']
      };
      const allow = [
        ['viande', '🥩', [1, 0, 0, 0, 0, 0]], ['laitages & œufs', '🧀', [1, 1, 0, 0, 0, 0]], ['poisson', '🐟', [1, 1, 1, 0, 0, 0]], ['huile', '🫒', [1, 1, 1, 1, 0, 0]], ['vin', '🍷', [1, 1, 1, 1, 2, 0]]
      ];
      return `<section class="fast fast-${f.level}" aria-label="Jeûne du jour">
        <div class="fast-head"><div class="fast-meter" aria-hidden="true">${[1, 2, 3, 4, 5].map((n) => `<i class="${n <= f.level ? 'on' : ''}"></i>`).join('')}</div>
          <div><div class="fast-label">${esc(f.label)}</div>${f.period ? `<div class="fast-period">${esc(f.period)}</div>` : ''}</div></div>
        ${compact ? '' : `<p class="fast-desc">${esc(f.note || f.desc)}</p>
        <ul class="allow">${allow.map(([n, e, a]) => { const s = a[f.level]; return `<li class="${s === 1 ? 'yes' : s === 2 ? 'maybe' : 'no'}"><span class="em">${e}</span><span>${n}</span><b>${s === 1 ? 'permis' : s === 2 ? 'toléré' : 'non'}</b></li>`; }).join('')}</ul>
        ${MEALS[f.level] ? `<details class="fast-ideas"><summary>Idées de repas pour aujourd’hui</summary><ul>${MEALS[f.level].map((m) => `<li>${esc(m)}</li>`).join('')}</ul><p class="muted xs">Simples suggestions. Le jeûne se vit selon ta santé et les conseils de ton père spirituel.</p></details>` : ''}`}
      </section>`;
    },
    toneBadge(t) { return t ? `<span class="chip tone" title="Ton de l’Octoèque">Ton ${t}</span>` : ''; },
    ordinal: C.ORD
  };

  /* ---------- actions (délégation) ---------- */
  const act = {
    'sheet-close': () => closeSheet(),
    more: () => moreSheet(),
    fav: (el) => toggleFav(el.dataset.id),
    copy: (el) => { navigator.clipboard ? navigator.clipboard.writeText(el.dataset.text).then(() => toast('Copié')) : toast('Copie indisponible'); },
    share: (el) => {
      if (navigator.share) navigator.share({ text: el.dataset.text, title: 'Blagovest' }).catch(() => {});
      else if (navigator.clipboard) navigator.clipboard.writeText(el.dataset.text).then(() => toast('Copié dans le presse-papiers'));
    },
    speak: (el) => { if (el.dataset.text) speak(el.dataset.text); },
    note: (el) => noteSheet(el.dataset.key, el.dataset.label),
    'note-save': (el) => { const v = $('#noteText').value.trim(); if (v) S.notes[el.dataset.key] = v; else delete S.notes[el.dataset.key]; save(); closeSheet(); toast('Note enregistrée'); render(); },
    'note-del': (el) => { delete S.notes[el.dataset.key]; save(); closeSheet(); toast('Note effacée'); render(); },
    'cycle-lang': () => { const o = ['both', 'fr', 'cs']; S.settings.lang = o[(o.indexOf(S.settings.lang) + 1) % 3]; save(); applySettings(); toast({ both: 'Français + slavon', fr: 'Français seulement', cs: 'Slavon seulement' }[S.settings.lang]); },
    'toggle-theme': () => { S.settings.theme = effectiveTheme() === 'dark' ? 'light' : 'dark'; save(); applySettings(); const sw = $('[data-theme-seg]'); if (sw) render(); },
    'set-theme': (el) => { S.settings.theme = el.dataset.v; save(); applySettings(); render(); },
    'set-style': (el) => { S.settings.style = el.dataset.v; save(); render(); },
    'set-lang': (el) => { S.settings.lang = el.dataset.v; save(); applySettings(); render(); },
    'toggle-reading': () => { S.settings.reading = !S.settings.reading; save(); applySettings(); render(); },
    'toggle-font': () => { S.settings.font = !S.settings.font; save(); applySettings(); render(); },
    'toggle-contrast': () => { S.settings.contrast = !S.settings.contrast; save(); applySettings(); render(); },
    'toggle-translit': () => { S.settings.translit = !S.settings.translit; save(); render(); }
  };
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]');
    if (!el) return;
    const fn = act[el.dataset.act];
    if (fn) { if (el.tagName === 'A' && el.getAttribute('href') === '#') e.preventDefault(); fn(el, e); }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet().hidden) closeSheet(); });
  document.addEventListener('click', (e) => { if (e.target.id === 'sheetBack') closeSheet(); });

  O.core = { S, save, esc, ic, $, $$, clamp, route, go, render, applySettings, effectiveTheme, markVisit, streak, openSheet, closeSheet, toast, speak, modernize, buildNav, isFav, toggleFav, noteSheet, act, U };
})();
