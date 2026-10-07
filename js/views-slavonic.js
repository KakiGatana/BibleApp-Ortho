/* Vues : slavon (hub, alphabet, leçons, vocabulaire, cartes, quiz) */
(function () {
  const O = window.ORTHO, K = O.core, C = O.cal, U = K.U;
  const { S, esc, ic, route } = K;
  S.lessons = S.lessons || {};
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const todayIso = () => C.isoKey(C.today());
  const INTERVALS = [0, 1, 3, 7, 14, 30, 60];

  /* ----- statistiques cartes ----- */
  function cardStats() {
    const t = todayIso(); let nw = 0, learning = 0, known = 0, due = 0;
    O.VOCAB.forEach((_, i) => {
      const c = S.cards[i];
      if (!c) { nw++; return; }
      if (c.b >= 3) known++; else learning++;
      if (c.d <= t) due++;
    });
    return { nw, learning, known, due, total: O.VOCAB.length };
  }

  /* ---------- hub ---------- */
  function hubView() {
    const cs = cardStats();
    const lessonsDone = O.LESSONS.filter((l) => S.lessons[l.id]).length;
    const tile = (href, icon, title, sub, badge) => `<a class="tile" href="${href}"><span class="tile-ic">${ic(icon)}</span><div><b>${title}</b><span>${sub}</span></div>${badge ? `<span class="badge hot">${badge}</span>` : ''}</a>`;
    const html = `<section class="page">
      <div class="hero hero-slav compact">
        <div class="hero-stars" aria-hidden="true"></div>
        <div class="hero-body">
          <div class="chips"><span class="chip gold">Церковнославянскій языкъ</span></div>
          <h1 class="hero-title">Apprendre le slavon</h1>
          <p class="hero-cs cs">Начало премудрости страхъ Господень</p>
          <p class="hero-sub">Le début de la sagesse est la crainte du Seigneur (Pr 1:7)</p>
        </div>
      </div>
      <div class="stats">
        <div><b>${lessonsDone}/${O.LESSONS.length}</b><span>leçons</span></div>
        <div><b>${cs.known}</b><span>mots acquis</span></div>
        <div><b>${cs.learning}</b><span>en cours</span></div>
        <div><b>${cs.due}</b><span>à réviser</span></div>
      </div>
      <div class="tiles">
        ${tile('#/slavonic/alphabet', 'slav', 'L’alphabet', '38 lettres, sons, noms et valeurs numériques')}
        ${tile('#/slavonic/lessons', 'book', 'Leçons', 'Histoire, lecture, cas, verbes, liturgie', lessonsDone < O.LESSONS.length ? 'à suivre' : '')}
        ${tile('#/slavonic/vocab', 'cards', 'Vocabulaire', `${O.VOCAB.length} mots du culte, classés par thème`)}
        ${tile('#/slavonic/cards', 'flame', 'Cartes de révision', 'Répétition espacée : on revoit au bon moment', cs.due ? cs.due + ' à revoir' : '')}
        ${tile('#/slavonic/quiz', 'quiz', 'Quiz', 'Lettres, vocabulaire, culture orthodoxe')}
        ${tile('#/prayers', 'pray', 'Lire des prières', 'Mot à mot : Notre Père, Trisagion, tropaire de Pâques…')}
      </div>
      <aside class="tip">${ic('flame')}<div><b>Méthode conseillée.</b> 10 minutes par jour : une leçon ou 10 cartes, puis une prière lue mot à mot. Au bout de quelques semaines, tu reconnaîtras les mots en écoutant la liturgie.</div></aside>
    </section>`;
    return { html, title: 'Slavon', nav: 'slavonic' };
  }
  route('/slavonic', hubView);

  /* ---------- alphabet ---------- */
  function alphabetView() {
    const html = `<section class="page">
      ${U.back('#/slavonic', 'Slavon')}
      ${U.pageHead('Азбука', 'L’alphabet slavon', 'Touche une lettre pour voir son nom, sa prononciation, sa valeur numérique — et l’écouter.')}
      <div class="alpha">${O.ALPHABET.map((a, i) => `<button class="letter" data-act="letter" data-i="${i}" aria-label="Lettre ${esc(a[2])}"><span class="L cs">${esc(a[0])}<small>${esc(a[1])}</small></span><span class="n">${esc(a[2])}</span></button>`).join('')}</div>
      <p class="center"><a class="btn" href="#/slavonic/quiz/alphabet">S’entraîner avec le quiz ${ic('right', 'ic xs')}</a></p>
    </section>`;
    return { html, title: 'Alphabet slavon', nav: 'slavonic' };
  }
  route('/slavonic/alphabet', alphabetView);
  K.act.letter = (el) => {
    const a = O.ALPHABET[+el.dataset.i], i = +el.dataset.i;
    K.openSheet(`<div class="letter-sheet"><div class="big-letter cs">${esc(a[0])}${esc(a[1])}</div>
      <h2 class="cs">${esc(a[2])}</h2><p class="muted">${esc(a[3])}</p>
      <dl class="facts"><div><dt>Son</dt><dd>« ${esc(a[4])} »</dd></div>${a[5] ? `<div><dt>Valeur</dt><dd>${a[5]}</dd></div>` : ''}<div><dt>Rang</dt><dd>${i + 1}/${O.ALPHABET.length}</dd></div></dl>
      <p>${esc(a[6])}</p>
      <div class="row center"><button class="btn small ghost" data-act="speak" data-text="${esc(a[2])}">${ic('speak', 'ic xs')} Écouter le nom</button>
      ${i > 0 ? `<button class="btn small ghost" data-act="letter" data-i="${i - 1}">${ic('left', 'ic xs')}</button>` : ''}${i < O.ALPHABET.length - 1 ? `<button class="btn small ghost" data-act="letter" data-i="${i + 1}">${ic('right', 'ic xs')}</button>` : ''}</div></div>`, 'letter-sh');
  };

  /* ---------- leçons ---------- */
  function lessonsView() {
    const html = `<section class="page">
      ${U.back('#/slavonic', 'Slavon')}
      ${U.pageHead('Урокъ', 'Leçons', 'Un parcours court et pratique, pour comprendre ce que tu entends et lis à l’église.')}
      <ol class="lessons">${O.LESSONS.map((l, i) => `<li><a class="card lesson-card ${S.lessons[l.id] ? 'done' : ''}" href="#/slavonic/lesson/${l.id}"><span class="num">${i + 1}</span><div><h3>${esc(l.title)}</h3><p class="muted small">${esc(l.sub)} · ${l.time}</p></div>${S.lessons[l.id] ? ic('check') : ic('right')}</a></li>`).join('')}</ol>
    </section>`;
    return { html, title: 'Leçons', nav: 'slavonic' };
  }
  route('/slavonic/lessons', lessonsView);

  function lessonView(id) {
    const i = O.LESSONS.findIndex((l) => l.id === id), l = O.LESSONS[i];
    if (!l) return { html: '<section class="page"><p>Leçon introuvable.</p></section>', nav: 'slavonic' };
    const prev = O.LESSONS[i - 1], next = O.LESSONS[i + 1];
    const html = `<section class="page lesson">
      ${U.back('#/slavonic/lessons', 'Leçons')}
      ${U.pageHead(`Leçon ${i + 1} · ${l.time}`, esc(l.title), esc(l.sub))}
      <div class="prose">${U.blocks(l.blocks)}</div>
      <p class="center"><button class="btn ${S.lessons[l.id] ? 'done' : ''}" data-act="lesson-done" data-id="${l.id}">${ic('check', 'ic xs')} ${S.lessons[l.id] ? 'Leçon terminée' : 'J’ai terminé cette leçon'}</button></p>
      <nav class="pager">${prev ? `<a href="#/slavonic/lesson/${prev.id}">${ic('left')}<span>${esc(prev.title)}</span></a>` : '<span></span>'}${next ? `<a href="#/slavonic/lesson/${next.id}"><span>${esc(next.title)}</span>${ic('right')}</a>` : '<span></span>'}</nav>
    </section>`;
    return { html, title: l.title, nav: 'slavonic' };
  }
  route('/slavonic/lesson/:id', lessonView);
  K.act['lesson-done'] = (el) => { S.lessons[el.dataset.id] = !S.lessons[el.dataset.id]; K.save(); if (S.lessons[el.dataset.id]) K.toast('Bravo !'); K.render(); };

  /* ---------- vocabulaire ---------- */
  function vocabView() {
    const themes = ['Tous', ...Array.from(new Set(O.VOCAB.map((v) => v[4])))];
    const row = (v, i) => { const c = S.cards[i]; const st = !c ? 'new' : c.b >= 3 ? 'known' : 'learn';
      return `<li class="v-row" data-t="${esc(v[4])}" data-s="${esc((v[0] + ' ' + v[1] + ' ' + v[2]).toLowerCase())}"><span class="st ${st}" title="${st === 'new' ? 'Nouveau' : st === 'known' ? 'Acquis' : 'En cours'}"></span><button class="cs v-cs" data-act="speak" data-text="${esc(v[0])}">${esc(v[0])}</button><span class="tr">${esc(v[1])}</span><span class="v-fr">${esc(v[2])}</span><span class="pos">${esc(v[3])}</span></li>`; };
    const html = `<section class="page">
      ${U.back('#/slavonic', 'Slavon')}
      ${U.pageHead('Словарь', 'Vocabulaire', `${O.VOCAB.length} mots essentiels pour suivre les offices. Touche un mot pour l’écouter.`)}
      <div class="search"><span>${ic('search')}</span><input id="vq" type="search" placeholder="Rechercher en slavon ou en français" autocomplete="off"></div>
      <div class="chips-row" id="vthemes">${themes.map((t, i) => `<button class="chip-btn ${i === 0 ? 'on' : ''}" data-t="${esc(t)}">${esc(t)}</button>`).join('')}</div>
      <ul class="vlist" id="vlist">${O.VOCAB.map(row).join('')}</ul>
      <p class="center"><a class="btn" href="#/slavonic/cards">Réviser avec les cartes</a></p>
    </section>`;
    const after = (root) => {
      let theme = 'Tous';
      const upd = () => { const q = root.querySelector('#vq').value.trim().toLowerCase(); root.querySelectorAll('.v-row').forEach((r) => { r.style.display = (theme === 'Tous' || r.dataset.t === theme) && (!q || r.dataset.s.includes(q)) ? '' : 'none'; }); };
      root.querySelector('#vq').addEventListener('input', upd);
      root.querySelector('#vthemes').addEventListener('click', (e) => { const b = e.target.closest('[data-t]'); if (!b) return; theme = b.dataset.t; root.querySelectorAll('#vthemes .chip-btn').forEach((x) => x.classList.toggle('on', x === b)); upd(); });
    };
    return { html, title: 'Vocabulaire', nav: 'slavonic', after };
  }
  route('/slavonic/vocab', vocabView);

  /* ---------- cartes de révision (Leitner) ---------- */
  let sess = null, dir = 'cs-fr';
  function buildSession() {
    const t = todayIso();
    const due = [], nw = [];
    O.VOCAB.forEach((_, i) => { const c = S.cards[i]; if (!c) nw.push(i); else if (c.d <= t) due.push(i); });
    const q = shuffle(due).slice(0, 20).concat(shuffle(nw).slice(0, Math.max(0, 8)));
    sess = { q: shuffle(q), i: 0, shown: false, again: 0, good: 0, total: q.length };
  }
  function cardsView() {
    if (!sess || sess.i >= sess.q.length) buildSession();
    const cs = cardStats();
    const html = `<section class="page">
      ${U.back('#/slavonic', 'Slavon')}
      ${U.pageHead('Повторение', 'Cartes de révision', 'Répétition espacée : plus tu connais un mot, plus il revient rarement.')}
      <div class="stats"><div><b>${cs.nw}</b><span>nouveaux</span></div><div><b>${cs.learning}</b><span>en cours</span></div><div><b>${cs.known}</b><span>acquis</span></div><div><b>${cs.due}</b><span>dus</span></div></div>
      <div class="row center">${U.seg([['cs-fr', 'Слав. → FR'], ['fr-cs', 'FR → Слав.']], dir, 'card-dir')}</div>
      <div id="cardArea"></div>
    </section>`;
    return { html, title: 'Cartes', nav: 'slavonic', after: () => renderCard() };
  }
  route('/slavonic/cards', cardsView);
  K.act['card-dir'] = (el) => { dir = el.dataset.v; K.render(); };
  function renderCard() {
    const area = K.$('#cardArea'); if (!area) return;
    if (!sess || !sess.total) { area.innerHTML = `<div class="card center done-card"><h3>Tout est à jour ✦</h3><p class="muted">Aucune carte à revoir pour le moment. Reviens demain, ou parcours le vocabulaire.</p><a class="btn" href="#/slavonic/vocab">Voir le vocabulaire</a></div>`; return; }
    if (sess.i >= sess.q.length) {
      area.innerHTML = `<div class="card center done-card"><h3>Séance terminée</h3><p>${sess.good} bien · ${sess.again} à revoir</p><p class="cs">Слава Тебѣ, Господи!</p><div class="row center"><button class="btn" data-act="card-new">Une autre série</button><a class="btn ghost" href="#/slavonic">Retour</a></div></div>`;
      return;
    }
    const idx = sess.q[sess.i], v = O.VOCAB[idx];
    const front = dir === 'cs-fr' ? `<div class="fc-front cs" data-act="speak" data-text="${esc(v[0])}">${esc(v[0])}</div>` : `<div class="fc-front fr-q">${esc(v[2])}</div><div class="muted">${esc(v[3])}</div>`;
    const back = dir === 'cs-fr' ? `<div class="fc-back"><b>${esc(v[2])}</b><span class="muted">${esc(v[3])}</span><em class="tr">${esc(v[1])}</em></div>` : `<div class="fc-back"><div class="cs fc-front" data-act="speak" data-text="${esc(v[0])}">${esc(v[0])}</div><em class="tr">${esc(v[1])}</em></div>`;
    area.innerHTML = `<div class="flash"><div class="fc-prog"><i style="width:${(sess.i / sess.q.length) * 100}%"></i></div>
      <div class="fc-card">${front}${sess.shown ? back : ''}</div>
      ${sess.shown ? `<div class="fc-btns"><button class="btn bad" data-act="grade" data-g="0">Je ne savais pas</button><button class="btn ghost" data-act="grade" data-g="1">Hésitant</button><button class="btn good" data-act="grade" data-g="2">Je savais</button></div>` : `<div class="fc-btns"><button class="btn" data-act="reveal">Montrer la réponse</button></div>`}
      <p class="muted xs center">${sess.i + 1} / ${sess.q.length}</p></div>`;
  }
  K.act.reveal = () => { sess.shown = true; renderCard(); };
  K.act['card-new'] = () => { buildSession(); renderCard(); };
  K.act.grade = (el) => {
    const g = +el.dataset.g, idx = sess.q[sess.i];
    const c = S.cards[idx] || { b: 0, d: todayIso(), n: 0 };
    c.n++;
    if (g === 0) { c.b = 0; c.d = todayIso(); sess.again++; sess.q.push(idx); }
    else if (g === 1) { c.d = C.isoKey(C.addDays(C.today(), 1)); sess.good++; }
    else { c.b = Math.min(c.b + 1, INTERVALS.length - 1); c.d = C.isoKey(C.addDays(C.today(), INTERVALS[c.b])); sess.good++; }
    S.cards[idx] = c; K.save();
    sess.i++; sess.shown = false; renderCard();
  };

  /* ---------- quiz ---------- */
  function quizHub() {
    const best = (t) => (S.quiz[t] ? `Record : ${S.quiz[t].best}/10` : 'Pas encore joué');
    const dq = S.quiz.daily || {}, doneToday = dq.last === todayIso();
    const dailyTxt = doneToday ? `Fait aujourd’hui : ${dq.score}/10` : 'Les mêmes 10 questions pour tous, chaque jour';
    const streakTxt = dq.streak > 1 ? ` · ${dq.streak} jours de suite` : '';
    const cats = O.QUIZ_CATS || {};
    const html = `<section class="page">
      ${U.back('#/slavonic', 'Slavon')}
      ${U.pageHead('Испытаніе', 'Quiz', 'Dix questions, et une explication à chaque réponse. Les questions que tu n’as pas encore réussies reviennent en premier.')}
      <div class="tiles">
        <a class="tile" href="#/slavonic/quiz/daily"><span class="tile-ic">${ic('flame')}</span><div><b>Défi du jour</b><span>${dailyTxt}${streakTxt}</span></div>${doneToday ? '<span class="badge">Fait</span>' : '<span class="badge dim">À faire</span>'}</a>
      </div>
      ${U.sectionTitle('Culture orthodoxe')}
      <div class="tiles">
        <a class="tile" href="#/slavonic/quiz/culture"><span class="tile-ic">${ic('theo')}</span><div><b>Tout mélangé</b><span>${best('culture')} · ${O.QUIZ.length} questions</span></div></a>
        ${Object.keys(cats).map((k) => `<a class="tile" href="#/slavonic/quiz/${k}"><span class="tile-ic">${ic('quiz')}</span><div><b>${cats[k]}</b><span>${best(k)} · ${O.QUIZ.filter((q) => O.quizCat(q) === k).length} questions</span></div></a>`).join('')}
      </div>
      ${U.sectionTitle('Slavon')}
      <div class="tiles">
        <a class="tile" href="#/slavonic/quiz/alphabet"><span class="tile-ic">${ic('slav')}</span><div><b>Lettres</b><span>${best('alphabet')}</span></div></a>
        <a class="tile" href="#/slavonic/quiz/vocab"><span class="tile-ic">${ic('cards')}</span><div><b>Vocabulaire</b><span>${best('vocab')}</span></div></a>
      </div></section>`;
    return { html, title: 'Quiz', nav: 'slavonic' };
  }
  route('/slavonic/quiz', quizHub);

  function makeQuiz(type) {
    if (type === 'alphabet') {
      const letters = O.ALPHABET.filter((a) => a[4] !== '—');
      const sounds = Array.from(new Set(letters.map((a) => a[4])));
      return shuffle(letters).slice(0, 10).map((a, k) => {
        if (k % 2 === 0) {
          const opts = shuffle([a[4], ...shuffle(sounds.filter((s) => s !== a[4])).slice(0, 3)]);
          return { p: 'Comment se prononce cette lettre ?', big: a[0] + a[1], opts, c: opts.indexOf(a[4]), e: `${a[0]}${a[1]} — « ${a[2]} » (${a[3]}). ${a[6]}` };
        }
        const others = shuffle(letters.filter((x) => x[4] !== a[4])).slice(0, 3);
        const opts = shuffle([a, ...others]);
        return { p: `Quelle lettre se prononce « ${a[4]} » ?`, optsCs: true, opts: opts.map((o) => o[0] + o[1]), c: opts.indexOf(a), e: `${a[0]}${a[1]} — « ${a[2]} » (${a[3]}). ${a[6]}` };
      });
    }
    if (type === 'vocab') {
      return shuffle(O.VOCAB).slice(0, 10).map((v, k) => {
        const same = O.VOCAB.filter((x) => x !== v && x[3] === v[3]), pool = same.length >= 3 ? same : O.VOCAB.filter((x) => x !== v);
        const others = shuffle(pool).slice(0, 3);
        if (k % 2 === 0) { const opts = shuffle([v[2], ...others.map((o) => o[2])]); return { p: 'Que signifie ce mot ?', big: v[0], speak: v[0], opts, c: opts.indexOf(v[2]), e: `${v[0]} (${v[1]}) = ${v[2]}.` }; }
        const opts = shuffle([v, ...others]); return { p: `Comment dit-on « ${v[2]} » en slavon ?`, optsCs: true, opts: opts.map((o) => o[0]), c: opts.indexOf(v), e: `${v[0]} (${v[1]}) = ${v[2]}.` };
      });
    }
    return cultureQuiz(type);
  }

  /* quiz de culture : défi du jour (mêmes questions pour tous), catégories, et on revoit d'abord ce qu'on n'a pas encore réussi */
  function seeded(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    return function () { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
  }
  function shuffleWith(a, rnd) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function cultureQuiz(type) {
    S.qstat = S.qstat || {};
    const daily = type === 'daily', rnd = daily ? seeded('blagovest-' + todayIso()) : Math.random;
    let pool = O.QUIZ.map((q, id) => ({ q, id })).filter((x) => daily || type === 'culture' || O.quizCat(x.q) === type);
    if (daily) pool = shuffleWith(pool, rnd);
    else {
      // d'abord les questions jamais réussies, avec un peu de hasard
      pool = pool.map((x) => { const st = S.qstat[x.id] || { ok: 0, ko: 0 }; return { x, k: st.ok * 2 - st.ko + Math.random() * 1.6 }; }).sort((a, b) => a.k - b.k).map((o) => o.x);
    }
    return pool.slice(0, 10).map(({ q, id }) => {
      const opts = shuffleWith(q.a.map((x, i) => [x, i === q.c]), rnd);
      return { id, p: q.q, opts: opts.map((o) => o[0]), c: opts.findIndex((o) => o[1]), e: q.e };
    });
  }
  let quiz = null;
  function quizView(type) {
    quiz = { type, qs: makeQuiz(type), i: 0, score: 0, answered: -1, wrong: [] };
    const titles = Object.assign({ alphabet: 'Quiz : les lettres', vocab: 'Quiz : vocabulaire', culture: 'Quiz : culture orthodoxe', daily: 'Défi du jour' }, Object.fromEntries(Object.entries(O.QUIZ_CATS || {}).map(([k, v]) => [k, 'Quiz : ' + v])));
    return { html: `<section class="page">${U.back('#/slavonic/quiz', 'Quiz')}${U.pageHead('', titles[type] || 'Quiz')}<div id="quizArea"></div></section>`, title: 'Quiz', nav: 'slavonic', after: renderQuiz };
  }
  route('/slavonic/quiz/:type', quizView);
  function renderQuiz() {
    const a = K.$('#quizArea'); if (!a || !quiz) return;
    if (quiz.i >= quiz.qs.length) {
      const b = S.quiz[quiz.type] || { best: 0, plays: 0 }; b.plays++; if (quiz.score > b.best) b.best = quiz.score; S.quiz[quiz.type] = b;
      let dailyNote = '';
      if (quiz.type === 'daily') {
        const yest = C.isoKey(C.addDays(C.today(), -1));
        if (b.last !== todayIso()) { b.streak = b.last === yest ? (b.streak || 0) + 1 : 1; b.last = todayIso(); b.score = quiz.score; }
        dailyNote = `<p class="muted small">Défi du jour : ${b.streak} jour${b.streak > 1 ? 's' : ''} de suite. Reviens demain pour un nouveau défi.</p>`;
      }
      K.save();
      const msg = quiz.score >= 9 ? 'Excellent ! Слава Богу.' : quiz.score >= 6 ? 'Très bien, continue !' : 'Courage, on apprend en recommençant.';
      a.innerHTML = `<div class="card center done-card"><div class="score">${quiz.score}<small>/10</small></div><p>${msg}</p>${dailyNote}<div class="row center"><a class="btn" href="#/slavonic/quiz/${quiz.type}" data-act="quiz-again">${quiz.type === 'daily' ? 'Refaire (sans compter)' : 'Rejouer'}</a><a class="btn ghost" href="#/slavonic/quiz">Autres quiz</a></div></div>
        ${quiz.wrong.length ? `<article class="card"><div class="card-k">À revoir (${quiz.wrong.length})</div><ul class="wrongs">${quiz.wrong.map((w) => `<li><b>${esc(w.p)}</b><span>Bonne réponse : ${esc(w.opts[w.c])}</span><span class="muted small">${esc(w.e)}</span></li>`).join('')}</ul></article>` : '<p class="center muted">Aucune erreur : sans faute !</p>'}`;
      return;
    }
    const q = quiz.qs[quiz.i], ans = quiz.answered;
    a.innerHTML = `<div class="quiz"><div class="fc-prog"><i style="width:${(quiz.i / quiz.qs.length) * 100}%"></i></div>
      <p class="q-n muted small">Question ${quiz.i + 1} / ${quiz.qs.length}</p><h2 class="q-p">${esc(q.p)}</h2>
      ${q.big ? `<div class="q-big cs" ${q.speak ? `data-act="speak" data-text="${esc(q.speak)}"` : ''}>${esc(q.big)}</div>` : ''}
      <div class="opts ${q.optsCs ? 'opts-cs' : ''}">${q.opts.map((o, i) => `<button class="opt ${ans >= 0 ? (i === q.c ? 'right' : i === ans ? 'wrong' : 'dim') : ''}" data-act="answer" data-i="${i}" ${ans >= 0 ? 'disabled' : ''}><span class="${q.optsCs ? 'cs' : ''}">${esc(o)}</span></button>`).join('')}</div>
      ${ans >= 0 ? `<div class="explain ${ans === q.c ? 'ok' : 'ko'}"><b>${ans === q.c ? 'Exact !' : 'Pas tout à fait.'}</b> ${esc(q.e)}</div><div class="row end"><button class="btn" data-act="quiz-next">${quiz.i + 1 >= quiz.qs.length ? 'Voir mon score' : 'Suivante'}</button></div>` : ''}</div>`;
  }
  K.act.answer = (el) => {
    const q = quiz.qs[quiz.i]; quiz.answered = +el.dataset.i;
    const ok = quiz.answered === q.c;
    if (ok) quiz.score++; else quiz.wrong.push(q);
    if (q.id != null) { S.qstat = S.qstat || {}; const st = (S.qstat[q.id] = S.qstat[q.id] || { ok: 0, ko: 0 }); ok ? st.ok++ : st.ko++; K.save(); }
    renderQuiz();
  };
  K.act['quiz-next'] = () => { quiz.i++; quiz.answered = -1; renderQuiz(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  K.act['quiz-again'] = () => {};
  O.runQuiz = (type) => K.go('#/slavonic/quiz/' + type);
})();
