/* Pages-groupes du menu : Prier, Théologie, Vie de l'Église, Mon espace. */
(function () {
  const O = window.ORTHO, K = O.core, U = K.U;
  const { S, esc, route } = K;
  const ic = (n, c) => `<svg class="${c || 'ic'}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  const row = ([href, t, i, d]) => `<a href="${href}" class="more-row"><span class="more-ic">${ic(i)}</span><span class="more-t"><b>${esc(t)}</b><small>${esc(d)}</small></span>${ic('right', 'ic more-go')}</a>`;

  const HUBS = {
    theo: { cs: 'Богословіе', t: 'Théologie', sub: 'Comprendre la foi : repères, Pères, conciles, objections.', nav: 'theology', rows: [
      ['#/theology', 'Théologie', 'theo', 'Les grands thèmes de la foi, avec les Pères'],
      ['#/learn', 'Découvrir l’Orthodoxie', 'book', 'Onze fiches simples : la foi, l’église, la prière'],
      ['#/distinctions', 'Distinctions théologiques', 'theo', 'Essence et énergies, théosis, synergie…'],
      ['#/councils', 'Conciles et hérésies', 'theo', 'Qui a dit quoi, quelle réponse de l’Église'],
      ['#/apolo', 'Objections et réponses', 'chat', 'Arguments contre la foi et l’Orthodoxie'],
      ['#/glossary', 'Glossaire', 'book', 'Les mots que l’on entend à l’église'],
      ['#/peres', 'Paroles des Pères', 'pray', 'Des phrases à méditer']
    ] },
    church: { cs: 'Церковь', t: 'Vie de l’Église', sub: 'Les fêtes, les saints, la liturgie et ta paroisse.', nav: 'saints', rows: [
      ['#/feasts', 'Fêtes', 'feast', 'Sens des fêtes et tropaires'],
      ['#/saints', 'Saints', 'saint', 'Les saints de chaque jour'],
      ['#/liturgy', 'La Divine Liturgie', 'pray', 'Pas à pas : ce qui se passe, ce qui se dit'],
      ['#/parishes', 'Paroisses près de moi', 'pin', 'Trouver une paroisse orthodoxe à proximité'],
      ['#/kids', 'Pour les enfants', 'saint', 'Le saint du jour raconté simplement']
    ] },
    me: { cs: 'Мой уголъ', t: 'Mon espace', sub: 'Ce qui est à toi : favoris, réglages, partage.', nav: 'settings', rows: [
      ['#/search', 'Recherche', 'search', 'Chercher dans toute l’application'],
      ['#/favorites', 'Favoris et notes', 'heart', 'Ce que j’ai gardé'],
      ['#/settings', 'Réglages', 'gear', 'Notifications, sauvegarde, thème, accessibilité'],
      ['#/install', 'Installer et partager', 'share', 'Mettre l’appli sur l’écran d’accueil, l’envoyer'],
      ['#/about', 'À propos de Blagovest', 'logo', 'Sources, limites, avertissements']
    ] }
  };

  route('/hub/:id', (id) => {
    const h = HUBS[id];
    if (!h) return { html: '<section class="page"><p>Page introuvable.</p></section>', title: 'Menu', nav: 'today' };
    const html = `<section class="page hub">
      ${U.pageHead(h.cs, h.t, h.sub)}
      <div class="more-list">${h.rows.map(row).join('')}</div>
    </section>`;
    return { html, title: h.t, nav: h.nav };
  });

  /* ---------- Prier ---------- */
  route('/pray', () => {
    const j = S.jesus || {}, ps = S.psalter || {}, n = (j.rope || 33);
    const html = `<section class="page hub">
      ${U.pageHead('Молитва', 'Prier', 'Ta corde de prière, les prières du matin et du soir, les psaumes et la liturgie.')}
      <a class="card pray-main" href="#/jesus"><span class="more-ic">${ic('beads')}</span><span><b>Prière de Jésus</b><span class="muted small">Ma corde de ${n} nœuds${j.cur ? ' · ' + j.cur + ' / ' + n : ''}</span></span>${ic('right', 'ic more-go')}</a>
      <div class="more-list">${[
        ['#/rule/morning', 'Prière du matin', 'sun', 'Pour commencer la journée devant Dieu'],
        ['#/rule/evening', 'Prière du soir', 'moon', 'Pour finir la journée dans la paix'],
        ['#/prayers', 'Prières', 'pray', 'Le livre de prières, mot à mot en slavon'],
        ['#/psalter', 'Psautier', 'book', ps.k ? 'Reprendre : kathisme ' + ps.k : 'Les 150 psaumes en 20 kathismes'],
        ['#/liturgy', 'La Divine Liturgie', 'pray', 'Suivre l’office pas à pas']
      ].map(row).join('')}</div>
    </section>`;
    return { html, title: 'Prier', nav: 'prayers' };
  });
})();
