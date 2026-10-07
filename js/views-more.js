/* Vues : théologie, favoris & notes, réglages, à propos */
(function () {
  const O = window.ORTHO, K = O.core, C = O.cal, U = K.U;
  const { S, esc, ic, route } = K;
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI'];

  /* ---------- théologie ---------- */
  function theologyView() {
    const html = `<section class="page">
      ${U.pageHead('Богословіе', 'Théologie', 'Les grandes lignes de la foi orthodoxe, expliquées simplement, avec les Pères de l’Église.')}
      <div class="cards theo-cards">${O.THEOLOGY.map((t, i) => `<a class="card theo-card" href="#/theo/${t.id}"><span class="roman">${ROMAN[i]}</span><div><h3>${esc(t.title)}</h3><p class="muted small">${esc(t.sub)}</p></div></a>`).join('')}</div>
      ${U.sectionTitle('Aller plus loin')}
      <div class="tiles">
        <a class="tile" href="#/theo-conciles"><span class="tile-ic">${ic('theo')}</span><div><b>Les sept conciles</b><span>De Nicée I (325) à Nicée II (787)</span></div></a>
        <a class="tile" href="#/slavonic/quiz/culture"><span class="tile-ic">${ic('quiz')}</span><div><b>Quiz de culture orthodoxe</b><span>Teste tes connaissances</span></div></a>
      </div>
    </section>`;
    return { html, title: 'Théologie', nav: 'theology' };
  }
  route('/theology', theologyView);

  function theoView(id) {
    const i = O.THEOLOGY.findIndex((t) => t.id === id), t = O.THEOLOGY[i];
    if (!t) return { html: '<section class="page"><p>Article introuvable.</p></section>', nav: 'theology' };
    const prev = O.THEOLOGY[i - 1], next = O.THEOLOGY[i + 1];
    const html = `<section class="page theo">
      ${U.back('#/theology', 'Théologie')}
      <header class="page-head"><div class="kicker">${ROMAN[i]} · ${esc(t.sub)}</div><h1>${esc(t.title)}</h1></header>
      <p class="lead">${esc(t.lead)}</p>
      <div class="prose">${U.blocks(t.blocks)}</div>
      ${t.quote ? `<figure class="pull"><blockquote>« ${esc(t.quote.t)} »</blockquote><figcaption>${esc(t.quote.a)}</figcaption></figure>` : ''}
      <div class="row center">${U.favBtn('theo:' + t.id, 'Favori')}${O.askBtn ? O.askBtn(t.title, t.sub || '') : ''}<button class="tool ${S.notes['theo:' + t.id] ? 'on' : ''}" data-act="note" data-key="theo:${t.id}" data-label="${esc(t.title)}">${ic('note')}<span>Note</span></button></div>
      <nav class="pager">${prev ? `<a href="#/theo/${prev.id}">${ic('left')}<span>${esc(prev.title)}</span></a>` : '<span></span>'}${next ? `<a href="#/theo/${next.id}"><span>${esc(next.title)}</span>${ic('right')}</a>` : '<span></span>'}</nav>
    </section>`;
    return { html, title: t.title, nav: 'theology' };
  }
  route('/theo/:id', theoView);

  route('/theo-conciles', () => ({
    html: `<section class="page">${U.back('#/theology', 'Théologie')}${U.pageHead('Вселенскіе соборы', 'Les sept conciles œcuméniques', 'Les sept grandes assemblées qui ont défini la foi de l’Église indivise.')}
      <ol class="council">${O.CONCILES.map(([y, n, d], i) => `<li><span class="c-y">${y}</span><div><h3>${i + 1}. ${esc(n)}</h3><p>${esc(d)}</p></div></li>`).join('')}</ol></section>`,
    title: 'Conciles', nav: 'theology'
  }));

  /* ---------- favoris & notes ---------- */
  function resolve(id) {
    const [k, ...rest] = id.split(':'), r = rest.join(':');
    if (k === 'v') { const v = O.VERSES[+r]; return v && { type: 'Verset', title: v[0], text: v[1], href: '#/today' }; }
    if (k === 'vf') { const f = O.FEASTS.find((x) => x.id === r); return f && { type: 'Verset de fête', title: f.verse[0], text: f.verse[1], href: '#/feast/' + f.id }; }
    if (k === 'passage') { const p = O.READINGS.find((x) => x.id === r); return p && { type: 'Écriture', title: p.ref + ' — ' + p.title, text: '', href: '#/passage/' + p.id }; }
    if (k === 'prayer') { const p = O.PRAYERS.find((x) => x.id === r); return p && { type: 'Prière', title: p.title, text: p.titleCs, href: '#/prayer/' + p.id }; }
    if (k === 'feast') { const f = O.FEASTS.find((x) => x.id === r); return f && { type: 'Fête', title: f.name, text: '', href: '#/feast/' + f.id }; }
    if (k === 'theo') { const t = O.THEOLOGY.find((x) => x.id === r); return t && { type: 'Théologie', title: t.title, text: '', href: '#/theo/' + t.id }; }
    if (k === 's') { const [md, ...n] = r.split(':'); return { type: 'Saint', title: n.join(':'), text: md.split('-').reverse().join('/'), href: '#/saints' }; }
    return null;
  }
  function favoritesView() {
    const favs = S.fav.map((id) => ({ id, r: resolve(id) })).filter((x) => x.r);
    const notes = Object.keys(S.notes).map((id) => ({ id, r: resolve(id), t: S.notes[id] })).filter((x) => x.r);
    const html = `<section class="page">
      ${U.pageHead('Mon livre', 'Favoris et notes', 'Tes versets, prières et pensées, sauvegardés sur cet appareil.')}
      ${U.sectionTitle('Favoris')}
      ${favs.length ? `<ul class="favs">${favs.map(({ id, r }) => `<li><a href="${r.href}"><span class="fav-type">${r.type}</span><b>${esc(r.title)}</b>${r.text ? `<span class="muted small clamp">${esc(r.text)}</span>` : ''}</a>${U.favBtn(id)}</li>`).join('')}</ul>` : `<div class="empty card center"><p class="muted">Pas encore de favoris. Touche ${ic('heart', 'ic xs')} sur un verset, une prière ou une fête pour le retrouver ici.</p></div>`}
      ${U.sectionTitle('Notes')}
      ${notes.length ? `<ul class="favs">${notes.map(({ id, r, t }) => `<li><a href="${r.href}"><span class="fav-type">${r.type}</span><b>${esc(r.title)}</b><span class="note-t">${esc(t)}</span></a><button class="tool" data-act="note" data-key="${esc(id)}" data-label="${esc(r.title)}">${ic('note')}</button></li>`).join('')}</ul>` : `<div class="empty card center"><p class="muted">Aucune note. Touche ${ic('note', 'ic xs')} pour écrire une pensée liée à un texte.</p></div>`}
    </section>`;
    return { html, title: 'Favoris', nav: 'favorites' };
  }
  route('/favorites', favoritesView);

  /* ---------- réglages ---------- */
  let deferredInstall = null;
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredInstall = e; });
  function settingsView() {
    const st = S.settings;
    const html = `<section class="page">
      ${U.pageHead('Настройки', 'Réglages', 'Personnalise l’affichage, le calendrier et tes données.')}
      <article class="card set">
        <div class="set-row"><div><b>Thème</b><span class="muted small">Parchemin le jour, lapis la nuit.</span></div>${U.seg([['auto', 'Auto'], ['light', 'Clair'], ['dark', 'Nuit']], st.theme, 'set-theme', 'data-theme-seg')}</div>
        <div class="set-row"><div><b>Calendrier</b><span class="muted small">Julien révisé : fêtes fixes alignées sur le civil (Constantinople, Grèce, Roumanie, Antioche, France…). Julien : décalage de 13 jours (Russie, Serbie, Jérusalem, Athos…).</span></div>${U.seg([['new', 'Julien révisé'], ['old', 'Julien']], st.style, 'set-style')}</div>
        <div class="set-row"><div><b>Langue d’affichage</b><span class="muted small">Dans les textes parallèles.</span></div>${U.seg([['fr', 'Français'], ['both', 'FR + СЛ'], ['cs', 'Слав.']], st.lang, 'set-lang')}</div>
        <div class="set-row"><div><b>Taille du texte</b><span class="muted small" id="fsv">${Math.round(st.fs * 100)} %</span></div><input type="range" id="fs" min="0.85" max="1.4" step="0.05" value="${st.fs}" aria-label="Taille du texte"></div>
        <div class="set-row"><div><b>Mode lecture</b><span class="muted small">Texte plus grand et plus aéré pour lire les passages et les prières.</span></div><button class="switch ${st.reading ? 'on' : ''}" data-act="toggle-reading" role="switch" aria-checked="${!!st.reading}"><i></i></button></div>
        <div class="set-row"><div><b>Police très lisible</b><span class="muted small">Lettres plus ouvertes et plus espacées (Atkinson Hyperlegible), conçues pour la lisibilité. Utile en cas de dyslexie ou de vue fatiguée.</span></div><button class="switch ${st.font ? 'on' : ''}" data-act="toggle-font" role="switch" aria-checked="${!!st.font}"></button></div>
        <div class="set-row"><div><b>Contraste renforcé</b><span class="muted small">Textes plus foncés ou plus clairs, bordures plus nettes.</span></div><button class="switch ${st.contrast ? 'on' : ''}" data-act="toggle-contrast" role="switch" aria-checked="${!!st.contrast}"></button></div>
        <div class="set-row"><div><b>Prononciation</b><span class="muted small">Afficher la prononciation dans la lecture mot à mot.</span></div><button class="switch ${st.translit ? 'on' : ''}" data-act="toggle-translit" role="switch" aria-checked="${st.translit}"><i></i></button></div>
      </article>
      ${O.i18n ? O.i18n.card() : ''}
      ${O.push ? O.push.card() : ''}
      ${O.sync ? O.sync.card() : ''}
      ${O.textsCard ? O.textsCard() : ''}
      ${O.iconsCard ? O.iconsCard() : ''}
      <article class="card set">
        <div class="card-k">Mes données</div>
        <p class="muted small">Tout est enregistré dans ton navigateur : favoris, notes, progression, cartes. Rien n’est envoyé nulle part, sauf si tu actives les notifications (voir ci-dessus).</p>
        <div class="row"><button class="btn small" data-act="export">Exporter (JSON)</button><label class="btn small ghost">Importer<input type="file" id="imp" accept="application/json" hidden></label><button class="btn small ghost danger" data-act="reset">Tout effacer</button></div>
        ${deferredInstall ? `<div class="row"><button class="btn" data-act="install">Installer l’application</button></div>` : '<p class="muted xs">Astuce : dans le menu de ton navigateur, « Ajouter à l’écran d’accueil » installe Blagovest comme une appli, qui fonctionne hors ligne.</p>'}
      </article>
      <p class="center"><a class="btn ghost" href="#/about">À propos de Blagovest</a></p>
    </section>`;
    const after = (root) => {
      root.querySelector('#fs').addEventListener('input', (e) => { S.settings.fs = +e.target.value; K.save(); K.applySettings(); root.querySelector('#fsv').textContent = Math.round(S.settings.fs * 100) + ' %'; });
      root.querySelector('#imp').addEventListener('change', (e) => {
        const f = e.target.files[0]; if (!f) return;
        const rd = new FileReader();
        rd.onload = () => { try { const d = JSON.parse(rd.result); if (typeof d !== 'object') throw 0; Object.assign(S, d); K.save(); K.applySettings(); K.toast('Données importées'); K.render(); } catch (err) { K.toast('Fichier invalide'); } };
        rd.readAsText(f);
      });
    };
    return { html, title: 'Réglages', nav: 'settings', after };
  }
  route('/settings', settingsView);
  K.act.export = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }));
    a.download = 'blagovest-sauvegarde-' + C.isoKey(C.today()) + '.json'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };
  K.act.reset = () => { if (confirm('Effacer tous tes favoris, notes et ta progression sur cet appareil ?')) { localStorage.removeItem('blagovest:v1'); location.reload(); } };
  K.act.install = () => { if (deferredInstall) { deferredInstall.prompt(); deferredInstall = null; } };

  /* ---------- à propos ---------- */
  route('/about', () => ({
    html: `<section class="page prose-page">
      ${U.pageHead('Благовѣстъ', 'À propos', 'Une application pour lire, prier et apprendre avec l’Église orthodoxe.')}
      <div class="prose">
        <h2>Pourquoi « Blagovest » ?</h2>
        <p><i>Благовѣстъ</i> (<i>blagovest</i>) est un mot slavon à double sens : la « bonne nouvelle » (l’Évangile) et le carillon des cloches qui appelle à la prière. C’est l’esprit de cette application : annoncer et appeler.</p>
        <h2>Ce qu’elle contient</h2>
        <ul>
          <li><b>Calendrier liturgique</b> complet : date de Pâques, fêtes mobiles et fixes, jeûnes, tons de l’Octoèque, saints de chaque jour — en calendrier julien révisé ou julien.</li>
          <li><b>Un verset par jour</b> (366), avec méditation théologique, et le texte slavon pour une partie d’entre eux.</li>
          <li><b>Écritures</b> en parallèle français / slavon d’Église (psaumes, Béatitudes, Magnificat, Prologue de Jean…).</li>
          <li><b>Prières</b> avec lecture mot à mot, prononciation et écoute.</li>
          <li><b>Slavon</b> : alphabet, leçons, vocabulaire, cartes à répétition espacée, quiz.</li>
          <li><b>Théologie</b> : quinze articles et la liste des sept conciles.</li>
        </ul>
        <h2>À lire avant de s’y fier</h2>
        <ul>
          <li>Les <b>règles de jeûne</b> sont données à titre indicatif. Les usages varient selon les juridictions, la santé et la situation de chacun : suis les conseils de ton père spirituel.</li>
          <li>Les <b>textes slavons</b> sont donnés d’après les livres liturgiques courants, mais peuvent contenir des variantes d’orthographe ou des erreurs de saisie : vérifie-les dans un livre imprimé avant tout usage liturgique.</li>
          <li>Les <b>traductions françaises</b> sont libres, proches des textes de la Septante et des Évangiles ; elles ne sont pas des traductions liturgiques officielles. Les numéros de psaumes suivent la Septante.</li>
          <li>Les <b>citations des Pères</b> sont données de mémoire ou en substance : consulte les éditions critiques pour les citer.</li>
          <li>La <b>synthèse vocale</b> utilise une voix russe moderne : c’est une aide d’écoute approximative, pas un modèle de chant liturgique.</li>
        </ul>
        <h2>Technique</h2>
        <p>Application statique (HTML, CSS, JavaScript), sans suivi ni compte. Elle fonctionne hors ligne une fois chargée et peut être installée sur l’écran d’accueil. Les données sont enregistrées uniquement dans ton navigateur.</p>
        <h2>Une erreur ? Une idée ?</h2>
        <p>Une faute de français, une erreur de slavon, une icône qui n’est pas la bonne, un passage à ajouter : dis-le pour que ce soit corrigé. Il faut un compte GitHub (gratuit) ; sinon, préviens la personne qui t’a envoyé l’appli.</p>
        <p class="center"><a class="btn small" href="https://github.com/KakiGatana/BibleApp-Ortho/issues/new" target="_blank" rel="noopener">Signaler une erreur</a></p>
        <p class="center"><a class="btn ghost small" href="#/credits">Crédits des icônes</a></p>
        <p class="center cs big">Слава Богу о всѣхъ. Аминь.</p>
      </div></section>`,
    title: 'À propos', nav: 'settings'
  }));
})();
