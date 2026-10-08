/* Chants : lecteurs Spotify / YouTube pour tes propres playlists. Rien n'est chargé tant que tu n'appuies pas sur « Écouter ». */
(function () {
  const O = window.ORTHO, K = O.core, U = K.U;
  const { S, esc, route } = K;
  S.chants = Object.assign({ lists: [] }, S.chants || {});
  const LISTS = () => S.chants.lists;

  /* Reconnaît un lien Spotify ou YouTube et en tire une adresse d'intégration sûre (jamais d'adresse libre). */
  function parse(raw) {
    let u; try { u = new URL(String(raw).trim()); } catch (e) { return null; }
    const h = u.hostname.replace(/^www\./, '').replace(/^music\./, '');
    if (h === 'open.spotify.com') {
      const m = u.pathname.replace(/^\/intl-[a-z-]+/i, '').match(/^\/(playlist|album|track|artist|show|episode)\/([A-Za-z0-9]{10,30})/);
      if (!m) return null;
      return { kind: 'Spotify', open: 'https://open.spotify.com/' + m[1] + '/' + m[2], embed: 'https://open.spotify.com/embed/' + m[1] + '/' + m[2], h: m[1] === 'track' || m[1] === 'episode' ? 152 : 380 };
    }
    if (h === 'youtube.com' || h === 'm.youtube.com' || h === 'youtu.be' || h === 'youtube-nocookie.com') {
      const list = u.searchParams.get('list'), v = h === 'youtu.be' ? u.pathname.slice(1) : u.searchParams.get('v');
      const okId = (x) => /^[A-Za-z0-9_-]{6,64}$/.test(x || '');
      if (okId(list)) return { kind: 'YouTube', open: 'https://www.youtube.com/playlist?list=' + list, embed: 'https://www.youtube-nocookie.com/embed/videoseries?list=' + list, h: 315 };
      if (okId(v)) return { kind: 'YouTube', open: 'https://www.youtube.com/watch?v=' + v, embed: 'https://www.youtube-nocookie.com/embed/' + v, h: 315 };
    }
    return null;
  }

  function view() {
    const L = LISTS();
    const html = `<section class="page chants">
      ${U.back('#/pray', 'Prier')}
      ${U.pageHead('Пѣснопѣнія', 'Chants', 'Écoute les chants orthodoxes de tes propres playlists Spotify ou YouTube, sans quitter l’appli.')}
      <article class="card">
        <div class="card-k">Ajouter une playlist</div>
        <p class="muted small">Sur Spotify ou YouTube, ouvre ta playlist (ou un album, un chant), choisis « Partager », puis « Copier le lien », et colle-le ici.</p>
        <form id="chForm" class="ch-form">
          <input type="url" id="chUrl" placeholder="Lien Spotify ou YouTube" aria-label="Lien de la playlist" autocomplete="off" required>
          <input type="text" id="chName" placeholder="Nom (facultatif, ex. Pâques en russe)" maxlength="60" aria-label="Nom de la playlist" autocomplete="off">
          <button class="btn" type="submit">Ajouter</button>
        </form>
        <p class="muted xs" id="chMsg" aria-live="polite"></p>
      </article>
      <div id="chList" data-notrans>${L.length ? L.map(card).join('') : ''}</div>
      ${L.length ? '' : '<article class="card"><p class="muted">Aucune playlist pour l’instant. Ajoute-en une avec le champ ci-dessus : russe, serbe, grec, slavon, comme tu les aimes.</p></article>'}
      <p class="muted xs center">Rien n’est chargé depuis Spotify ou YouTube tant que tu n’appuies pas sur « Écouter ». Une connexion est nécessaire. Sur téléphone, le son peut s’arrêter quand l’écran se verrouille : utilise alors « Ouvrir dans l’application ». Les chants restent la propriété de leurs auteurs et de leurs chœurs : Blagovest ne les héberge pas.</p>
    </section>`;
    const after = () => {
      document.getElementById('chForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const p = parse(document.getElementById('chUrl').value), msg = document.getElementById('chMsg');
        if (!p) { msg.textContent = 'Lien non reconnu. Colle un lien de playlist, d’album ou de vidéo Spotify ou YouTube.'; return; }
        const name = document.getElementById('chName').value.trim() || (p.kind + ' · playlist ' + (L.length + 1));
        L.push({ t: name, kind: p.kind, open: p.open, embed: p.embed, h: p.h }); K.save(); K.render();
      });
    };
    return { html, title: 'Chants', nav: 'prayers', after };
  }
  function card(c, i) {
    return `<article class="card ch-card" data-i="${i}"><div class="ch-top"><div><b>${esc(c.t)}</b><span class="muted small"> · ${esc(c.kind)}</span></div>
      <button class="icon-btn" data-act="chant-del" data-i="${i}" aria-label="Retirer cette playlist">✕</button></div>
      <div class="ch-player" id="chP${i}"><div class="row"><button class="btn small ${c.kind === 'Spotify' ? 'ghost' : ''}" data-act="chant-play" data-i="${i}">Écouter ici</button><a class="btn small ${c.kind === 'Spotify' ? '' : 'ghost'}" href="${esc(c.open)}" target="_blank" rel="noopener">Ouvrir dans ${esc(c.kind)}</a></div></div>
      ${c.kind === 'Spotify' ? '<p class="muted xs">Ici, Spotify ne joue que des extraits de 30 secondes si tu n’es pas connecté à Spotify dans ce navigateur. Pour écouter en entier, « Ouvrir dans Spotify ».</p>' : ''}</article>`;
  }
  K.act['chant-play'] = (el) => {
    const c = LISTS()[+el.dataset.i], box = document.getElementById('chP' + el.dataset.i);
    if (!c || !box) return;
    const p = parse(c.open); if (!p) return; // on reconstruit l'adresse depuis le lien d'origine : jamais d'adresse stockée telle quelle
    const f = document.createElement('iframe');
    f.src = p.embed; f.height = String(p.h); f.loading = 'lazy'; f.title = c.t; f.className = 'ch-frame';
    f.setAttribute('allow', 'autoplay; encrypted-media; clipboard-write; fullscreen; picture-in-picture');
    f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    el.remove(); box.insertBefore(f, box.firstChild); // le lien « Ouvrir dans l’application » reste disponible
  };
  K.act['chant-del'] = (el) => { if (confirm('Retirer cette playlist de la liste ?')) { LISTS().splice(+el.dataset.i, 1); K.save(); K.render(); } };
  route('/chants', view);
})();
