/* Langues : l'appli est écrite en français ; les autres langues sont obtenues ainsi :
   1. textes essentiels : dictionnaire embarqué (hors ligne) ;
   2. dates : formatées par le navigateur (Intl) ;
   3. tout le reste : traduit à la demande par le serveur (IA), puis gardé sur l'appareil et partagé entre visiteurs.
   Seuls des textes de l'appli (en français) sont envoyés : jamais tes notes, tes favoris ni tes questions. */
(function () {
  const O = window.ORTHO, K = O.core, { S, esc } = K;
  const CFG = window.BLAGOVEST_PUSH || {};
  const LANGS = [['fr', 'Français'], ['en', 'English'], ['ru', 'Русский'], ['sr', 'Српски'], ['es', 'Español'], ['de', 'Deutsch'], ['it', 'Italiano'], ['zh', '中文'], ['ja', '日本語'], ['el', 'Ελληνικά'], ['ro', 'Română']];
  const NAMES = Object.fromEntries(LANGS);
  const LOCALE = { en: 'en', ru: 'ru', sr: 'sr-Cyrl', es: 'es', de: 'de', it: 'it', zh: 'zh-CN', ja: 'ja', el: 'el', ro: 'ro' };
  const ui = () => (S.settings.ui && NAMES[S.settings.ui] ? S.settings.ui : 'fr');
  const lang = ui();

  // première ouverture : on propose la langue du téléphone si elle est gérée (sans l'imposer : le français reste le défaut)
  document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : lang;

  /* ---------- sélecteur de langue ---------- */
  function card() {
    return `<article class="card set">
      <div class="card-k">Language · Langue · Язык</div>
      <div class="set-row"><div><b>${esc(NAMES[lang])}</b><span class="muted small">${lang === 'fr' ? 'Langue de l’application. Les textes sont traduits automatiquement : certaines tournures peuvent être imparfaites.' : 'App language. Texts are translated automatically; some wording may be imperfect.'}</span></div>
      <select class="sel" data-ui-lang aria-label="Language">${LANGS.map(([c, n]) => `<option value="${c}" ${c === lang ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
    </article>`;
  }
  function chips() {
    return `<div class="lang-chips" data-notrans>${LANGS.map(([c, n]) => `<button class="chip-btn ${c === lang ? 'on' : ''}" data-act="ui-lang" data-v="${c}">${n}</button>`).join('')}</div>`;
  }
  function setLang(c) { S.settings.ui = c; K.save(); location.reload(); }
  K.act['ui-lang'] = (el) => setLang(el.dataset.v);
  document.addEventListener('change', (e) => { if (e.target.matches && e.target.matches('[data-ui-lang]')) setLang(e.target.value); });

  O.i18n = { lang, card, chips, LANGS, ui };
  if (lang === 'fr') return;

  /* ---------- traduction ---------- */
  const STATIC = {};
  const SK = (O.I18N_STATIC || {}).keys || [], ST = ((O.I18N_STATIC || {}).tr || {})[lang] || [];
  SK.forEach((k, i) => { if (ST[i]) STATIC[k] = ST[i]; });
  STATIC['Français'] = NAMES[lang]; STATIC['FR'] = lang.toUpperCase(); STATIC['FR+СЛ'] = lang.toUpperCase() + '+СЛ';

  const CK = 'blagovest:tr:' + lang;
  let cache = {};
  try { cache = JSON.parse(localStorage.getItem(CK) || '{}'); } catch (e) { cache = {}; }
  let saveT;
  const saveCache = () => { clearTimeout(saveT); saveT = setTimeout(() => { try { let s = JSON.stringify(cache); if (s.length > 2500000) { const ks = Object.keys(cache); ks.slice(0, ks.length >> 1).forEach((k) => delete cache[k]); s = JSON.stringify(cache); } localStorage.setItem(CK, s); } catch (e) { /* stockage plein */ } }, 800); };

  const SKIP = 'script,style,svg,textarea,input,select,.cs,.hero-cs,.q-big,.note-t,.ask-msg,.sync-code,.credits,.icon-credit,.lang-chips,[data-notrans]';
  const norm = (t) => { const nums = []; const key = t.replace(/\s+/g, ' ').trim().replace(/\d+/g, (m) => { nums.push(m); return '{n}'; }); return { key, nums }; };
  const fill = (tr, nums) => { let i = 0; return tr.replace(/\{n\}/g, () => (nums[i] != null ? nums[i++] : '{n}')); };
  const NEVER = new Set(['Blagovest', 'BLAGOVEST', 'AELF', 'JSON', 'Septante']);
  const frenchy = (key) => !NEVER.has(key) && /[a-zà-ÿ]{3}/.test(key) && key.length <= 900 && !/^[Ѐ-ӿ\s{}\d.,;:!?()«»—-]+$/.test(key);

  /* dates françaises -> format local */
  const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const SHORT = { 'janv.': 0, 'févr.': 1, 'mars': 2, 'avr.': 3, 'mai': 4, 'juin': 5, 'juil.': 6, 'août': 7, 'sept.': 8, 'oct.': 9, 'nov.': 10, 'déc.': 11 };
  const WD = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  function dateTr(t) {
    const s = t.replace(/\s+/g, ' ').trim(), loc = LOCALE[lang];
    let m = /^(·\s*)?(?:(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\s+)?(\d{1,2})(?:er)?\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)(?:\s+(\d{4}))?$/i.exec(s);
    if (m) { const d = new Date(Date.UTC(+(m[5] || 2000), MONTHS.indexOf(m[4].toLowerCase()), +m[3])); const o = { day: 'numeric', month: 'long', timeZone: 'UTC' }; if (m[2]) o.weekday = 'long'; if (m[5]) o.year = 'numeric'; return (m[1] || '') + new Intl.DateTimeFormat(loc, o).format(d); }
    m = /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})$/i.exec(s);
    if (m) return new Intl.DateTimeFormat(loc, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(+m[2], MONTHS.indexOf(m[1].toLowerCase()), 1)));
    m = /^(\d{1,2})(?:er)?\s+(janv\.|févr\.|mars|avr\.|mai|juin|juil\.|août|sept\.|oct\.|nov\.|déc\.)$/i.exec(s);
    if (m) return new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(Date.UTC(2000, SHORT[m[2].toLowerCase()], +m[1])));
    m = /^(janvier|février|avril|juillet|août|septembre|octobre|novembre|décembre|mai|juin|mars)$/i.exec(s);
    if (m) return new Intl.DateTimeFormat(loc, { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2000, MONTHS.indexOf(m[1].toLowerCase()), 1)));
    m = /^(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)$/i.exec(s);
    if (m) return new Intl.DateTimeFormat(loc, { weekday: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2000, 0, 2 + WD.indexOf(m[1].toLowerCase()))));
    return null;
  }

  const ours = new WeakMap(); // nœud -> texte que nous y avons écrit
  const pending = new Map(); // clé -> [cibles]
  const inflight = new Set(), failed = new Map();
  let flushT, busy = 0;

  function lookup(key) { return STATIC[key] || cache[key] || null; }

  function applyText(node, lead, trail, tr) { const v = lead + tr + trail; ours.set(node, v); if (node.nodeValue !== v) node.nodeValue = v; }

  function handleText(node) {
    const raw = node.nodeValue;
    if (!raw || ours.get(node) === raw) return;
    const p = node.parentElement; if (!p || p.closest(SKIP)) return;
    const lead = (/^\s*/.exec(raw) || [''])[0], trail = (/\s*$/.exec(raw) || [''])[0];
    const d = dateTr(raw); if (d) { applyText(node, lead, trail, d); return; }
    const { key, nums } = norm(raw);
    if (!frenchy(key)) return;
    const tr = lookup(key);
    if (tr) { applyText(node, lead, trail, fill(tr, nums)); return; }
    queue(key, { node, lead, trail, nums });
  }
  function handleAttrs(el) {
    if (el.closest && el.closest(SKIP)) return;
    for (const a of ['placeholder', 'aria-label', 'title']) {
      const raw = el.getAttribute && el.getAttribute(a); if (!raw) continue;
      const dd = dateTr(raw); if (dd) { el.setAttribute(a, dd); continue; }
      const { key, nums } = norm(raw); if (!frenchy(key)) continue;
      const tr = lookup(key);
      if (tr) el.setAttribute(a, fill(tr, nums)); else queue(key, { el, a, nums });
    }
  }
  function walk(root) {
    if (root.nodeType === 3) return handleText(root);
    if (root.nodeType !== 1) return;
    if (root.closest && root.closest(SKIP)) return;
    handleAttrs(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n; while ((n = w.nextNode())) { if (n.nodeType === 3) handleText(n); else handleAttrs(n); }
  }

  function queue(key, target) {
    if (failed.has(key) && Date.now() - failed.get(key) < 60000) return;
    if (!CFG.server || !navigator.onLine) return;
    (pending.get(key) || pending.set(key, []).get(key)).push(target);
    clearTimeout(flushT); flushT = setTimeout(flush, 350);
  }

  async function flush() {
    if (busy >= 2) { flushT = setTimeout(flush, 500); return; }
    const keys = [], chosen = [];
    let chars = 0;
    for (const k of pending.keys()) { if (inflight.has(k)) continue; if (keys.length >= 40 || chars + k.length > 12000) break; keys.push(k); chars += k.length; }
    if (!keys.length) return;
    keys.forEach((k) => inflight.add(k));
    busy++;
    try {
      const r = await fetch(CFG.server.replace(/\/$/, '') + '/translate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lang, texts: keys }) });
      const j = await r.json();
      keys.forEach((k, i) => {
        const tr = j.t && j.t[i];
        const targets = pending.get(k) || [];
        if (tr) {
          cache[k] = tr;
          targets.forEach((t) => { if (t.node) { if (t.node.isConnected) applyText(t.node, t.lead, t.trail, fill(tr, t.nums)); } else if (t.el && t.el.isConnected) t.el.setAttribute(t.a, fill(tr, t.nums)); });
        } else failed.set(k, Date.now());
        pending.delete(k);
      });
      saveCache();
    } catch (e) { keys.forEach((k) => { failed.set(k, Date.now()); pending.delete(k); }); }
    finally { keys.forEach((k) => inflight.delete(k)); busy--; if (pending.size) { clearTimeout(flushT); flushT = setTimeout(flush, 200); } }
  }

  // observation de toute la page
  new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === 'characterData') handleText(m.target);
      else m.addedNodes.forEach((n) => walk(n));
    }
  }).observe(document.body, { childList: true, subtree: true, characterData: true });
  walk(document.body);

  // fenêtres natives (confirm) : seulement avec les traductions déjà connues
  const nativeConfirm = window.confirm.bind(window);
  window.confirm = (msg) => { const { key, nums } = norm(String(msg)); const tr = lookup(key); return nativeConfirm(tr ? fill(tr, nums) : msg); };
  // titre de l'onglet
  const titleEl = document.querySelector('title');
  if (titleEl) new MutationObserver(() => { const m = /^(.*) · Blagovest$/.exec(document.title); if (m) { const { key, nums } = norm(m[1]); const tr = lookup(key); if (tr) { const nt = fill(tr, nums) + ' · Blagovest'; if (nt !== document.title) document.title = nt; } } }).observe(titleEl, { childList: true });
})();
