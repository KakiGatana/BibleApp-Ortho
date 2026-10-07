/* Vues : Aujourd'hui / jour, calendrier, année, fêtes, saints */
(function () {
  const O = window.ORTHO, K = O.core, C = O.cal, U = K.U;
  const { S, esc, ic, route } = K;

  const SHORT = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  const shortDate = (dt) => dt.getUTCDate() + (dt.getUTCDate() === 1 ? 'er ' : ' ') + SHORT[dt.getUTCMonth()];
  const nomText = (m, d) => d + (d === 1 ? 'er ' : ' ') + C.MONTHS[m - 1];
  const todayIso = () => C.isoKey(C.today());
  const feastById = (id) => (O.FEASTS || []).find((f) => f.id === id);

  /* Lien de lecture externe (AELF) pour une référence biblique */
  function aelfLink(ref) {
    const m = /^\s*([1-3]?)\s*([A-Za-zé]+)\s+(\d+)/.exec(ref);
    if (!m || m[2] === 'Ps') return null;
    return `https://www.aelf.org/bible/${m[1]}${m[2]}/${m[3]}`;
  }
  function refLinks(refs) {
    return refs.split(/\s*;\s*/).map((r) => {
      const l = aelfLink(r);
      return l ? `<a class="ref" href="${l}" target="_blank" rel="noopener">${esc(r)}${ic('ext', 'ic xs')}</a>` : `<span class="ref">${esc(r)}</span>`;
    }).join(' ');
  }
  O.aelfLink = aelfLink;

  /* ---------- verset du jour ---------- */
  function verseFor(info) {
    const topFeast = info.items.filter((i) => i.feastId).sort((a, b) => b.rank - a.rank)[0];
    const f = topFeast && feastById(topFeast.feastId);
    if (f && f.verse) return { id: 'vf:' + f.id, ref: f.verse[0], fr: f.verse[1], cs: f.verse[2] || '', med: f.meaning[0].split('. ')[0].replace(/\.?$/, '.'), feast: true };
    const idx = (C.dayOfYear(info.date) - 1) % O.VERSES.length;
    const v = O.VERSES[idx];
    return { id: 'v:' + idx, ref: v[0], fr: v[1], med: v[2], cs: v[3] || '', idx };
  }
  O.verseFor = verseFor;

  /* ---------- plan de lecture ---------- */
  const NT = [];
  O.NT_CHAPTERS.forEach(([ab, name, n]) => { for (let i = 1; i <= n; i++) NT.push([ab, name, i]); });
  const hebPs = (n) => (n <= 8 ? n : n === 9 ? 9 : n <= 112 ? n + 1 : n === 113 ? 114 : n <= 115 ? 116 : n <= 145 ? n + 1 : n === 146 ? 147 : n);
  function planFor(date) {
    const i = (C.dayOfYear(date) - 1);
    const nt = NT[i % NT.length];
    const ps = (i % 150) + 1;
    return { nt, ps };
  }

  function heroTone(info) {
    const k = info.items.map((i) => i.kind);
    if (info.rel >= 0 && info.rel <= 6) return 'pascha';
    if (info.rel >= -7 && info.rel < 0) return 'passion';
    if (info.season.id === 'careme' || info.season.id === 'triode') return 'careme';
    if (info.season.id === 'pentecote') return 'pentecote';
    if (info.season.id === 'noel') return 'noel';
    if (k.includes('theotokos') && info.rank >= 4) return 'theotokos';
    if (info.season.id.startsWith('jeune')) return 'jeune';
    return 'ordinaire';
  }

  function upcoming(date, style) {
    const out = [];
    for (let i = 1; i <= 120 && out.length < 5; i++) {
      const d = C.addDays(date, i), inf = C.dayInfo(d, style);
      const it = inf.items.filter((x) => x.rank >= 4 && x.kind !== 'dimanche').sort((a, b) => b.rank - a.rank)[0];
      if (it) out.push({ d, it, i });
    }
    return out;
  }

  /* ---------- vue : jour ---------- */
  function dayView(iso) {
    const date = iso ? C.fromIso(iso) : C.today();
    if (isNaN(date)) return { html: '<section class="page"><p>Date invalide.</p></section>', nav: 'today' };
    const style = S.settings.style;
    const info = C.dayInfo(date, style);
    const isToday = C.isoKey(date) === todayIso();
    const v = verseFor(info);
    const tone = heroTone(info);
    const topItems = info.items.slice().sort((a, b) => b.rank - a.rank);
    const secondary = topItems.slice(1).filter((x) => x.kind !== 'dimanche' || topItems[0].kind !== 'dimanche');
    const nomLine = style === 'old' ? `<span class="chip">${nomText(info.nominal.m, info.nominal.d)} · calendrier julien</span>` : '';
    const done = !!(S.done[C.isoKey(date)] || {}).verse;
    const plan = planFor(date);
    const ntLink = aelfLink(plan.nt[0] + ' ' + plan.nt[2]);
    const psLink = `https://www.aelf.org/bible/Ps/${hebPs(plan.ps)}`;
    const wordPool = O.VOCAB.filter((w) => w[4] !== 'Mots-outils');
    const word = wordPool[(C.dayOfYear(date) * 7) % wordPool.length];
    const prayer = O.PRAYERS[C.dayOfYear(date) % O.PRAYERS.length];
    const topFeast = topItems.find((i) => i.feastId);
    const f = topFeast && feastById(topFeast.feastId);
    const up = isToday ? upcoming(date, style) : [];
    const pas = C.pascha(date.getUTCFullYear());
    const toPascha = C.diff(pas, date);
    const last7 = Array.from({ length: 7 }, (_, i) => C.addDays(C.today(), i - 6));
    const vset = new Set(S.visits);

    const html = `
    <section class="page day">
      <div class="hero hero-${tone}">
        <div class="hero-stars" aria-hidden="true"></div>
        <svg class="hero-cross" aria-hidden="true"><use href="#i-logo"/></svg>
        <div class="hero-nav">
          <a class="icon-btn light" href="#/day/${C.isoKey(C.addDays(date, -1))}" aria-label="Jour précédent">${ic('left')}</a>
          <div class="hero-date">${isToday ? '<b>Aujourd’hui</b> · ' : ''}${esc(C.longDate(date))}</div>
          <a class="icon-btn light" href="#/day/${C.isoKey(C.addDays(date, 1))}" aria-label="Jour suivant">${ic('right')}</a>
        </div>
        <div class="hero-body">
          <div class="chips">
            <span class="chip gold">${esc(info.season.name)}</span>${U.toneBadge(info.tone)}${nomLine}
          </div>
          <h1 class="hero-title">${esc(info.title || 'Jour de prière')}</h1>
          ${topItems[0] && topItems[0].cs ? `<p class="hero-cs cs">${esc(topItems[0].cs)}</p>` : ''}
          ${secondary.length ? `<p class="hero-sub">${secondary.slice(0, 3).map((s) => esc(s.name)).join(' · ')}</p>` : ''}
          <div class="hero-foot">
            ${f ? `<a class="btn small light" href="#/feast/${f.id}">Sens de la fête ${ic('right', 'ic xs')}</a>` : ''}
            ${!isToday ? `<a class="btn small light ghost" href="#/today">Retour à aujourd’hui</a>` : ''}
          </div>
        </div>
      </div>

      <div class="grid2">
        <article class="card verse-card">
          <div class="card-k">Verset du jour</div>
          <blockquote class="verse">
            <p class="fr">${esc(v.fr)}</p>
            ${v.cs ? `<p class="cs rubric" data-act="speak" data-text="${esc(v.cs)}">${esc(v.cs)}</p>` : ''}
            <footer>— ${esc(v.ref)}${v.cs ? '' : ' <span class="muted xs">· slavon à venir</span>'}</footer>
          </blockquote>
          <div class="meditation"><span class="med-k">Méditation</span><p>${esc(v.med)}</p></div>
          <div class="verse-actions">
            ${U.tools({ id: v.id, text: `${v.fr} — ${v.ref}${v.cs ? '\n' + v.cs : ''}`, cs: v.cs, share: `« ${v.fr} » — ${v.ref} (Blagovest)`, noteKey: v.id, noteLabel: v.ref })}
            ${O.askBtn ? O.askBtn(v.ref, v.fr + ' — ' + (v.med || '')) : ''}${O.shareBtn ? O.shareBtn(v) : ''}
            <button class="btn small ${done ? 'done' : ''}" data-act="done-verse" data-iso="${C.isoKey(date)}">${ic('check', 'ic xs')} ${done ? 'Lu' : 'Marquer comme lu'}</button>
          </div>
          ${S.notes[v.id] ? `<div class="note-preview">${ic('note', 'ic xs')} ${esc(S.notes[v.id])}</div>` : ''}
        </article>

        <article class="card card-teal">
          <div class="card-k">Jeûne du jour</div>
          ${U.fastPanel(info.fast)}
        </article>
      </div>

      <article class="card card-wine">
        <div class="card-k">${info.saints.length > 1 ? 'Saints et mémoires du jour' : 'Saint du jour'}</div>
        ${info.items.length ? `<ul class="saint-list">${info.items.sort((a, b) => b.rank - a.rank).map((i) => `<li class="rank-${i.rank}"><span class="dot"></span><div><b>${esc(i.name)}</b>${i.cs ? `<div class="cs small">${esc(i.cs)}</div>` : ''}${i.feastId ? ` <a class="mini" href="#/feast/${i.feastId}">en savoir plus</a>` : ''}</div></li>`).join('')}</ul>` : ''}
        <ul class="saint-list">${info.saints.map((s, ix) => `<li class="rank-${s.rank}"><span class="dot"></span><div><b>${esc(s.name)}</b></div>${O.iconThumb ? O.iconThumb('entry:' + info.nominal.md + ':' + ix, s.name) : ''}${U.favBtn('s:' + info.nominal.md + ':' + s.name)}</li>`).join('') || '<li class="muted">Mémoire des saints du jour.</li>'}</ul>
        ${info.life ? `<div class="life"><span class="med-k">Un peu d’histoire</span><p>${info.life}</p></div>` : ''}
      </article>

      <div class="grid3">
        <article class="card mini-card">
          <div class="card-k">Lecture du jour</div>
          <p class="read-line"><b>${esc(plan.nt[1])} ${plan.nt[2]}</b><br><span class="muted small">Nouveau Testament en un an (260 chapitres)</span></p>
          <div class="row">${ntLink ? `<a class="btn small ghost" href="${ntLink}" target="_blank" rel="noopener">Lire ${ic('ext', 'ic xs')}</a>` : ''}</div>
          <p class="read-line"><b>Psaume ${plan.ps}</b> <span class="muted small">(LXX)</span></p>
          <div class="row"><a class="btn small ghost" href="${psLink}" target="_blank" rel="noopener">Lire ${ic('ext', 'ic xs')}</a>${O.READINGS.find((r) => r.id === 'ps' + plan.ps) ? `<a class="btn small ghost" href="#/passage/ps${plan.ps}">Texte ici</a>` : ''}</div>
        </article>
        <article class="card mini-card card-wine">
          <div class="card-k">Mot slavon</div>
          <div class="word-big cs" data-act="speak" data-text="${esc(word[0])}">${esc(word[0])}</div>
          <div class="muted tr">${esc(word[1])}</div>
          <div class="word-fr">${esc(word[2])}</div>
          <a class="btn small ghost" href="#/slavonic/cards">Réviser le vocabulaire</a>
        </article>
        <article class="card mini-card card-violet">
          <div class="card-k">Prière du jour</div>
          <h3 class="prayer-t">${esc(prayer.title)}</h3>
          <p class="cs small">${esc(prayer.titleCs)}</p>
          <a class="btn small ghost" href="#/prayer/${prayer.id}">Prier</a>
        </article>
      </div>

      ${isToday ? `<article class="card card-slate">
        <div class="card-k">Ton chemin</div>
        <div class="streak"><div class="flame">${ic('flame')}<b>${K.streak()}</b></div><div><div><b>jour${K.streak() > 1 ? 's' : ''} de suite</b></div><div class="muted small">Chaque visite compte. Reviens demain pour continuer.</div></div>
        <div class="week">${last7.map((d) => `<span class="${vset.has(C.isoKey(d)) ? 'on' : ''}" title="${esc(C.longDate(d))}">${C.WD[d.getUTCDay()][0].toUpperCase()}</span>`).join('')}</div></div>
      </article>` : ''}

      <article class="card card-ochre">
        <div class="card-k">Pâques ${info.year}</div>
        <div class="paques-line"><b>${esc(C.longDate(pas))}</b> <span class="muted">${toPascha > 0 ? `dans ${toPascha} jour${toPascha > 1 ? 's' : ''}` : toPascha === 0 ? 'c’est aujourd’hui !' : `il y a ${-toPascha} jours`}</span></div>
        <a class="mini" href="#/year/${info.year}">Voir toute l’année liturgique ${ic('right', 'ic xs')}</a>
      </article>

      ${up.length ? `<article class="card card-indigo">
        <div class="card-k">Prochaines grandes fêtes</div>
        <ul class="up-list">${up.map((u) => `<li><span class="up-d">${esc(shortDate(u.d))}</span><a href="#/day/${C.isoKey(u.d)}">${esc(u.it.name)}</a><span class="muted small">dans ${u.i} j</span></li>`).join('')}</ul>
      </article>` : ''}
    </section>`;
    return { html, title: isToday ? 'Aujourd’hui' : C.longDate(date), nav: 'today' };
  }
  route('/today', () => dayView());
  route('/day/:iso', (iso) => dayView(iso));
  K.act['done-verse'] = (el) => {
    const iso = el.dataset.iso; S.done[iso] = S.done[iso] || {}; S.done[iso].verse = !S.done[iso].verse; K.save();
    if (S.done[iso].verse) K.toast('Que le Seigneur bénisse ta lecture.');
    K.render();
  };

  /* ---------- vue : calendrier ---------- */
  function calendarView(ym) {
    const now = C.today();
    let y = now.getUTCFullYear(), m = now.getUTCMonth() + 1;
    if (ym) { const p = ym.split('-').map(Number); if (p[0] && p[1]) { y = p[0]; m = K.clamp(p[1], 1, 12); } }
    const style = S.settings.style;
    const cells = C.monthGrid(y, m, style);
    const prev = m === 1 ? `${y - 1}-12` : `${y}-${C.pad(m - 1)}`;
    const next = m === 12 ? `${y + 1}-01` : `${y}-${C.pad(m + 1)}`;
    const tIso = todayIso();
    const dow = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const pas = C.pascha(y);
    const html = `
    <section class="page cal">
      ${U.pageHead('Calendrier liturgique', `${C.MONTHS[m - 1][0].toUpperCase() + C.MONTHS[m - 1].slice(1)} ${y}`, null)}
      <div class="cal-controls">
        <div class="cal-nav"><a class="icon-btn" href="#/calendar/${prev}" aria-label="Mois précédent">${ic('left')}</a><a class="btn small ghost" href="#/calendar/${tIso.slice(0, 7)}">Aujourd’hui</a><a class="icon-btn" href="#/calendar/${next}" aria-label="Mois suivant">${ic('right')}</a></div>
        ${U.seg([['new', 'Julien révisé'], ['old', 'Julien (ancien)']], style, 'set-style')}
      </div>
      <div class="cal-grid" role="grid" aria-label="${C.MONTHS[m - 1]} ${y}">
        ${dow.map((d) => `<div class="cal-dow" role="columnheader">${d}</div>`).join('')}
        ${cells.map((c) => {
          if (!c) return '<div class="cal-cell empty"></div>';
          const topItem = c.items.slice().sort((a, b) => b.rank - a.rank)[0];
          const kind = topItem ? topItem.kind : '';
          const cls = ['cal-cell', 'r' + Math.min(c.rank, 6), c.iso === tIso ? 'today' : '', c.wd === 0 ? 'sun' : '', 'lv' + c.fast.level, kind === 'theotokos' ? 'theo' : '', kind === 'pascha' || kind === 'pascal' ? 'pas' : ''].join(' ');
          return `<a class="${cls}" role="gridcell" href="#/day/${c.iso}" title="${esc(c.title)}">
            <span class="n">${c.date.getUTCDate()}</span>
            ${style === 'old' ? `<span class="nom">${c.nominal.d}</span>` : ''}
            <span class="t">${esc(c.title.replace(/^(Saint|Sainte|Saints|Apôtre|Apôtres|Prophète)\s/, ''))}</span>
            <span class="marks">${c.rank >= 5 ? '<i class="star"></i>' : c.rank === 4 ? '<i class="star sm"></i>' : ''}${c.wd === 0 ? '<i class="cr"></i>' : ''}</span>
            <span class="fbar"></span></a>`;
        }).join('')}
      </div>
      <div class="legend">
        <span><i class="star"></i> Grande fête</span><span><i class="cr"></i> Dimanche</span>
        <span class="lg-f"><i class="lvdot l1"></i><i class="lvdot l2"></i><i class="lvdot l3"></i><i class="lvdot l4"></i><i class="lvdot l5"></i> Intensité du jeûne</span>
      </div>
      <div class="cal-foot">
        <a class="card link-card" href="#/year/${y}"><div><b>Année liturgique ${y}</b><div class="muted small">Pâques le ${esc(C.longDate(pas))}</div></div>${ic('right')}</a>
      </div>
    </section>`;
    return { html, title: `${C.MONTHS[m - 1]} ${y}`, nav: 'calendar' };
  }
  route('/calendar', () => calendarView());
  route('/calendar/:ym', (ym) => calendarView(ym));

  /* ---------- vue : année liturgique ---------- */
  function yearView(ys) {
    const y = parseInt(ys, 10) || C.today().getUTCFullYear();
    const style = S.settings.style;
    const pas = C.pascha(y);
    const rel = (n) => C.addDays(pas, n);
    const movable = [
      [-70, 'Dimanche du Publicain et du Pharisien', 'Début du Triode'], [-49, 'Dimanche du Pardon (du Fromage)', 'Veille du Carême'], [-48, 'Lundi pur', 'Début du Grand Carême'],
      [-42, 'Dimanche de l’Orthodoxie', ''], [-8, 'Samedi de Lazare', ''], [-7, 'Dimanche des Rameaux', ''], [-2, 'Grand Vendredi', ''], [0, 'Pâques', ''], [7, 'Dimanche de Thomas', ''],
      [39, 'Ascension', ''], [49, 'Pentecôte', ''], [56, 'Tous les saints', ''], [57, 'Début du Carême des Apôtres', 'jusqu’au 28/29 juin (nominal)']
    ];
    const fixed = O.FEASTS.filter((f) => f.md).map((f) => {
      const [mm, dd] = f.md.split('-').map(Number);
      return { f, d: C.civilFromNominal(y, mm, dd, style), mm, dd };
    }).sort((a, b) => a.d - b.d);
    const html = `
    <section class="page">
      ${U.back('#/calendar', 'Calendrier')}
      ${U.pageHead('Année liturgique', String(y), `Pâques : <b>${esc(C.longDate(pas))}</b> (comput julien). Calendrier choisi : <b>${style === 'old' ? 'julien (ancien)' : 'julien révisé'}</b>.`,
        `<div class="row">${U.seg([['new', 'Julien révisé'], ['old', 'Julien (ancien)']], style, 'set-style')}<a class="icon-btn" href="#/year/${y - 1}">${ic('left')}</a><a class="icon-btn" href="#/year/${y + 1}">${ic('right')}</a></div>`)}
      <div class="grid2">
        <article class="card"><div class="card-k">Cycle de Pâques (fêtes mobiles)</div>
          <ul class="timeline">${movable.map(([n, name, sub]) => { const d = rel(n); return `<li><a href="#/day/${C.isoKey(d)}"><span class="tl-d">${esc(shortDate(d))}</span><span class="tl-n">${esc(name)}${sub ? `<small>${esc(sub)}</small>` : ''}</span></a></li>`; }).join('')}</ul>
        </article>
        <article class="card"><div class="card-k">Fêtes à date fixe</div>
          <ul class="timeline">${fixed.map(({ f, d }) => `<li><a href="#/feast/${f.id}"><span class="tl-d">${esc(shortDate(d))}</span><span class="tl-n">${esc(f.name)}<small>${f.rank >= 5 ? 'Grande fête' : 'Fête'}</small></span></a></li>`).join('')}</ul>
        </article>
      </div>
      <article class="card"><div class="card-k">Périodes de jeûne</div>
        <ul class="fast-periods">
          <li><i class="lvdot l4"></i><div><b>Grand Carême</b><span>${esc(shortDate(rel(-48)))} → ${esc(shortDate(rel(-1)))}</span></div></li>
          <li><i class="lvdot l3"></i><div><b>Carême des Apôtres</b><span>${esc(shortDate(rel(57)))} → ${esc(shortDate(C.civilFromNominal(y, 6, 28, style)))}</span></div></li>
          <li><i class="lvdot l3"></i><div><b>Carême de la Dormition</b><span>${esc(shortDate(C.civilFromNominal(y, 8, 1, style)))} → ${esc(shortDate(C.civilFromNominal(y, 8, 14, style)))}</span></div></li>
          <li><i class="lvdot l3"></i><div><b>Carême de la Nativité</b><span>${esc(shortDate(C.civilFromNominal(y, 11, 15, style)))} → ${esc(shortDate(C.civilFromNominal(y, 12, 24, style)))}</span></div></li>
        </ul>
        <p class="muted small">Mercredis et vendredis : jeûne toute l’année (sauf semaines sans jeûne : Noël → Théophanie, Publicain, Semaine lumineuse, Pentecôte).</p>
      </article>
    </section>`;
    return { html, title: 'Année liturgique ' + y, nav: 'calendar' };
  }
  route('/year', () => yearView());
  route('/year/:y', (y) => yearView(y));

  /* ---------- vue : fêtes ---------- */
  const KIND = { seigneur: 'Fête du Seigneur', theotokos: 'Fête de la Mère de Dieu', saint: 'Fête de saints', pascha: 'La Fête des fêtes', passion: 'Semaine sainte' };
  function feastsView() {
    const style = S.settings.style, y = C.today().getUTCFullYear();
    const withDate = O.FEASTS.map((f) => {
      let d;
      if (f.md) { const [mm, dd] = f.md.split('-').map(Number); d = C.civilFromNominal(y, mm, dd, style); } else d = C.addDays(C.pascha(y), f.rel);
      const order = f.md ? ((parseInt(f.md, 10) + 3) % 12) * 100 + parseInt(f.md.slice(3), 10) : 2000 + f.rel + 100;
      return { f, d, order };
    });
    const fixed = withDate.filter((x) => x.f.md).sort((a, b) => a.order - b.order);
    const mov = withDate.filter((x) => !x.f.md).sort((a, b) => a.f.rel - b.f.rel);
    const card = ({ f, d }) => `<a class="card feast-card k-${f.kind}" href="#/feast/${f.id}">
      <div class="fc-top"><span class="fc-date">${esc(shortDate(d))}</span><span class="fc-kind">${KIND[f.kind] || 'Fête'}</span></div>
      <h3>${esc(f.name)}</h3><p class="cs small">${esc(f.cs)}</p><p class="muted small">${esc(f.sub || '')}</p></a>`;
    const html = `<section class="page">
      ${U.pageHead('Dodécaorton et grandes fêtes', 'Fêtes', 'Le sens de chaque fête, son tropaire en français et en slavon, ses lectures, ses traditions.')}
      ${U.sectionTitle('Fêtes mobiles — cycle de Pâques')}<div class="cards">${mov.map(card).join('')}</div>
      ${U.sectionTitle('Fêtes fixes — depuis le 1er septembre')}<div class="cards">${fixed.map(card).join('')}</div>
    </section>`;
    return { html, title: 'Fêtes', nav: 'feasts' };
  }
  route('/feasts', feastsView);

  function feastView(id) {
    const f = feastById(id);
    if (!f) return { html: '<section class="page"><p>Fête introuvable.</p></section>', nav: 'feasts' };
    const style = S.settings.style, y = C.today().getUTCFullYear();
    let dateTxt;
    if (f.md) { const [mm, dd] = f.md.split('-').map(Number); const d = C.civilFromNominal(y, mm, dd, style); dateTxt = `${nomText(mm, dd)} (nominal) — en ${y} : ${C.longDate(d)}`; }
    else { const d = C.addDays(C.pascha(y), f.rel); dateTxt = `Date mobile — en ${y} : ${C.longDate(d)}`; }
    const html = `<section class="page feast k-${f.kind}">
      ${U.back('#/feasts', 'Fêtes')}
      <div class="hero hero-${f.kind === 'theotokos' ? 'theotokos' : f.kind === 'pascha' ? 'pascha' : f.kind === 'passion' ? 'passion' : 'ordinaire'} compact">
        <div class="hero-stars" aria-hidden="true"></div>
        <div class="hero-body">
          <div class="chips"><span class="chip gold">${KIND[f.kind] || 'Fête'}</span></div>
          <h1 class="hero-title">${esc(f.name)}</h1>
          <p class="hero-cs cs">${esc(f.cs)}</p>
          <p class="hero-sub">${esc(dateTxt)}</p>
        </div>
      </div>
      <div class="prose">
        <h2>Le sens de la fête</h2>
        ${f.meaning.map((p) => `<p>${esc(p)}</p>`).join('')}
        ${O.iconFigure ? O.iconFigure('feast:' + f.id, f.name) : ''}
        <div class="icon-note">${ic('saint')}<div><b>L’icône</b><p>${esc(f.icon)}</p></div></div>
      </div>
      <article class="card tropar">
        <div class="card-k">Tropaire${f.troparion.tone ? ` — ton ${f.troparion.tone}` : ''}</div>
        <p class="fr big">${esc(f.troparion.fr)}</p>
        ${f.troparion.cs ? `<p class="cs rubric big" data-act="speak" data-text="${esc(f.troparion.cs)}">${esc(f.troparion.cs)}</p>` : '<p class="muted small">Slavon : à compléter.</p>'}
        ${U.tools({ id: 'feast:' + f.id, text: f.troparion.fr + (f.troparion.cs ? '\n' + f.troparion.cs : ''), cs: f.troparion.cs, noteKey: 'feast:' + f.id, noteLabel: f.name })}
        ${O.askBtn ? O.askBtn(f.name, (f.troparion.fr || '') + ' ' + ((f.meaning && f.meaning[0]) || '')) : ''}
      </article>
      <div class="grid2">
        <article class="card"><div class="card-k">Lectures de la Liturgie</div>
          <p><span class="muted small">Épître</span><br>${refLinks(f.reading.epistle)}</p>
          <p><span class="muted small">Évangile</span><br>${refLinks(f.reading.gospel)}</p>
        </article>
        <article class="card"><div class="card-k">Traditions</div><p>${esc(f.traditions)}</p></article>
      </div>
      ${f.verse ? `<article class="card"><div class="card-k">Verset de la fête</div><blockquote class="verse"><p class="fr">${esc(f.verse[1])}</p>${f.verse[2] ? `<p class="cs rubric">${esc(f.verse[2])}</p>` : ''}<footer>— ${esc(f.verse[0])}</footer></blockquote></article>` : ''}
    </section>`;
    return { html, title: f.name, nav: 'feasts' };
  }
  route('/feast/:id', feastView);

  /* ---------- vue : saints ---------- */
  function saintsIndex() {
    if (O._sIdx) return O._sIdx;
    const arr = [];
    Object.keys(O.SAINTS).forEach((md) => O.SAINTS[md].forEach((s, ix) => { const p = C.parseSaint(s); arr.push({ md, ix, m: +md.slice(0, 2), d: +md.slice(3), name: p.name, rank: p.rank }); }));
    return (O._sIdx = arr);
  }
  function saintsList(q, month) {
    const nq = q.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const items = saintsIndex().filter((s) => (month ? s.m === month : true) && (!nq || s.name.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().includes(nq)));
    if (!items.length) return '<p class="muted center">Aucun résultat.</p>';
    let last = '', out = '';
    items.forEach((s) => {
      const key = s.md;
      if (key !== last) { if (last) out += '</ul>'; out += `<h3 class="day-h">${nomText(s.m, s.d)}</h3><ul class="saint-list">`; last = key; }
      out += `<li class="rank-${s.rank}"><span class="dot"></span><div><b>${esc(s.name)}</b></div>${O.iconThumb ? O.iconThumb('entry:' + s.md + ':' + s.ix, s.name) : ''}</li>`;
    });
    return out + '</ul>';
  }
  function saintsView() {
    const nowM = C.today().getUTCMonth() + 1;
    const html = `<section class="page">
      ${U.pageHead('Ménologe', 'Saints de l’année', `Le calendrier des saints, <b>${S.settings.style === 'old' ? 'selon les dates du calendrier julien' : 'selon les dates du calendrier julien révisé'}</b>. Cherche un nom ou parcours un mois.`)}
      <div class="search"><span>${ic('search')}</span><input id="sq" type="search" placeholder="Rechercher un saint (ex. Nicolas, Marie, Séraphin…)" autocomplete="off"></div>
      <div class="chips-row" id="months">${C.MONTHS.map((m, i) => `<button class="chip-btn ${i + 1 === nowM ? 'on' : ''}" data-m="${i + 1}">${m.slice(0, 4)}${m.length > 4 ? '.' : ''}</button>`).join('')}</div>
      <div id="sres" class="saints-res">${saintsList('', nowM)}</div>
    </section>`;
    const after = (root) => {
      let month = nowM;
      const upd = () => { root.querySelector('#sres').innerHTML = saintsList(root.querySelector('#sq').value, root.querySelector('#sq').value ? 0 : month); };
      root.querySelector('#sq').addEventListener('input', upd);
      root.querySelector('#months').addEventListener('click', (e) => {
        const b = e.target.closest('[data-m]'); if (!b) return; month = +b.dataset.m;
        root.querySelectorAll('#months .chip-btn').forEach((x) => x.classList.toggle('on', x === b)); root.querySelector('#sq').value = ''; upd();
      });
    };
    return { html, title: 'Saints', nav: 'saints', after };
  }
  route('/saints', saintsView);
})();
