/* Pixel art : petits dessins originaux (icônes, lampada, cierges, église, livre, croix), rendus en SVG net.
   Chaque sprite est une grille de caractères ; chaque caractère est une couleur de la palette ('.' = vide).
   Les caractères 'f' et 'o' (flamme) sont regroupés pour être animés en CSS. Réglage : S.settings.pixel. */
(function () {
  const O = window.ORTHO, K = O.core;
  const { S } = K;
  if (S.settings.pixel === undefined) S.settings.pixel = true;

  const PAL = {
    g: '#a87a1e', G: '#d6a33a', Y: '#f2cf6a', R: '#b23a26', r: '#e0704f', H: '#5a3a22', S: '#e3b48e', s: '#c48d66', K: '#2a1d14',
    B: '#2f5aa8', b: '#1f3f7c', L: '#5c8ad4', C: '#b5502e', c: '#8a3a22', M: '#7a3424', m: '#5a2418', U: '#2f5aa8',
    w: '#efe6d2', v: '#c9a75a', k: '#7a4a2a', n: '#6b4a2e', h: '#7a4a2a', f: '#f2cf6a', o: '#fff3c4', W: '#ecd38a'
  };

  const SPR = {
    /* Christ Pantocrator : main droite qui bénit, livre dans la main gauche, IC XC, nimbe crucifère */
    christ: [
      'gggggggggggggggggggggggg',
      'gGRGRRGGGGGGGGGGGRGRGRRg',
      'gGRGRGGGGYYYYYYGGGRGGRGg',
      'gGRGRRGYYYYRRYYYYRGRGRRg',
      'gGGGGGYYYHHHHHHYYYGGGGGg',
      'gGGGGYYYHHHHHHHHYYYGGGGg',
      'gGGGGRRYHSSSSSSHYRRGGGGg',
      'gGGGGRRYHSKSSKSHYRRGGGGg',
      'gGGGGYYHHSSsSSSHHYYGGGGg',
      'gGGGGYYHHHSssSHHHYYGGGGg',
      'gGGSGGYHHHHHHHHHHYGGGGGg',
      'gGSSSCCCCCHHHHBBBBBGGGGg',
      'gGSSSCCCYCCCBBBBBBBBGGGg',
      'gGGCCCCCYCCBBLBBBBbBGGGg',
      'gGGCCCCCYCBBLBBggggBGGGg',
      'gGGcCCCCYCBLBBbgYRgBGGGg',
      'gGGGCCCCYBBLBbSgRYgBGGGg',
      'gGGGCCCCYBLBBbSggggBGGGg',
      'gGGcCCCCYBLBbBBBBBBbBGGg',
      'gGcCCCCCYLBBbBBBBBBbBBGg',
      'gGcCCCCCYLBbBBBBBBbBBBGg',
      'gcCCCCcCYBBbBBBBBbbBBBBg',
      'gcCCCCcCYBbBBBBBbbBBBBBg',
      'gcCCCcCcYBbBBBBbbbBBBBBg',
      'gggggggggggggggggggggggg'
    ],
    /* Mère de Dieu du Signe : bras levés en prière, le Christ dans un médaillon, MP ΘΥ */
    theotokos: [
      'gggggggggggggggggggggggg',
      'gGRGRGRRGGGGGGGGGGRGRGRg',
      'gGRRRGRRGYYYYYYGGRRRGRGg',
      'gGRGRGRYYYYYYYYYYGRGGRGg',
      'gGGGGGYYYMMYMMMYYYGGGGGg',
      'gGGGGYYYMMUUUUMMYYYGGGGg',
      'gGGGGYYMMUSSSSUMMYYGGGGg',
      'gGGGGYYMMSKSSKSMMYYGGGGg',
      'gGGGGYMMMSSsSSSMMMYGGGGg',
      'gGSSGGMMMMSSSSMMMMGGSSGg',
      'gGUUGGMMMMMMMMMMMMGGUUGg',
      'gGMMGMMYMMMMMMMMYMMGMMGg',
      'gGMMGMMMMYYYYYYMMMMGMMGg',
      'gGMMMMMMYUUYYUUYMMMMMMGg',
      'gGGMMMMMYUYSSYUYMMMMMGGg',
      'gGGGMMMMYUYSSYUYMMMMGGGg',
      'gGGGMMMMYUggggUYMMMMGGGg',
      'gGGGMMMMYUgSggUYMMMMGGGg',
      'gGGGMMMMMYYYYYYMMMMMGGGg',
      'gGGMMMMMMMUUUUMMMMMMMGGg',
      'gGGMMMMMMMUUUUMMMMMMMGGg',
      'gGMMMMMMMMUUUUMMMMMMMMGg',
      'gGMmMMMMMMUUUUMMMMMMmMGg',
      'gMMmMMMMMMUUUUMMMMMMmMMg',
      'gggggggggggggggggggggggg'
    ],
    /* lampada suspendue, flamme animée */
    lampada: [
      '....K....',
      '...K.K...',
      '..K...K..',
      '.K.....K.',
      '.K.....K.',
      'K.......K',
      'K...f...K',
      'gGGGoGGGg',
      '.RRRRRRR.',
      '.RrRRRRR.',
      '..RRRRR..',
      '...gGg...',
      '....g....'
    ],
    candle: [
      '..f..',
      '.fof.',
      '.fof.',
      '..K..',
      '.WWv.',
      '.WWv.',
      '.WWv.',
      '.WWv.',
      '.WWv.',
      '.WWv.',
      '.WWv.',
      '.WWv.',
      'gGGGg',
      '.ggg.'
    ],
    cross: [
      '...Y...',
      '..YYY..',
      '...Y...',
      'YYYYYYY',
      '...Y...',
      '...Y...',
      '.YYY...',
      '...YYY.',
      '...Y...',
      '...Y...',
      '...Y...'
    ],
    church: [
      '........Y........',
      '.......YYY.......',
      '........Y........',
      '.......GGG.......',
      '......GGGGG......',
      '.....GGYGGGG.....',
      '.....GYGGGGG.....',
      '......GGGGG......',
      '.......GgG.......',
      '......wwwww......',
      '......wKwKw......',
      '..BBBBBBBBBBBBB..',
      '.BBBBBBBBBBBBBBB.',
      '.wwwwwwwwwwwwwww.',
      '.wwKwwwwhhwwwKww.',
      '.wwKwwwwhhwwwKww.',
      '.wwwwwwwhhwwwwww.',
      'nnnnnnnnnnnnnnnnn'
    ],
    book: [
      '..kkkkk.kkkkk..',
      '.kwwwwwkwwwwwk.',
      '.kwKKKwkwKKKwk.',
      '.kwwwwwkwwwwwk.',
      '.kwKKwwkwKKKwk.',
      '.kwwwwwkwwwwwk.',
      'kkwwwwwkwwwwwkk',
      'kkkkkkkKkkkkkkk'
    ]
  };

  /* SVG d'un sprite : les pixels voisins de même couleur sont fusionnés en bandes */
  function svg(name, { h, cls, label } = {}) {
    const rows = SPR[name]; if (!rows) return '';
    const W = rows[0].length, H = rows.length;
    let base = '', fl = '';
    rows.forEach((row, y) => {
      let x = 0;
      while (x < W) {
        const ch = row[x]; let e = x + 1;
        while (e < W && row[e] === ch) e++;
        if (ch !== '.' && PAL[ch]) {
          const r = `<rect x="${x}" y="${y}" width="${e - x}" height="1" fill="${PAL[ch]}"/>`;
          if (ch === 'f' || ch === 'o') fl += r; else base += r;
        }
        x = e;
      }
    });
    const size = h ? ` height="${h}" width="${Math.round((h * W) / H)}"` : '';
    const a11y = label ? `role="img" aria-label="${K.esc(label)}"` : 'aria-hidden="true"';
    return `<svg class="px ${cls || ''}" viewBox="0 0 ${W} ${H}"${size} shape-rendering="crispEdges" ${a11y}>${base}${fl ? `<g class="px-fl">${fl}</g>` : ''}</svg>`;
  }

  const on = () => S.settings.pixel !== false;

  /* coin des icônes : la Mère de Dieu, le Christ, et la lampada allumée entre les deux */
  function iconCorner() {
    if (!on()) return '';
    return `<div class="px-corner" aria-hidden="true">
      <div class="px-shelf">${svg('theotokos', { cls: 'px-ic' })}<div class="px-lamp">${svg('lampada')}<i class="px-glow"></i></div>${svg('christ', { cls: 'px-ic' })}</div>
    </div>`;
  }

  /* cierges (pour le score d’un quiz : plus de cierges allumés quand le score monte) */
  function candles(n) {
    if (!on()) return '';
    return `<div class="px-candles" aria-hidden="true">${Array.from({ length: n }, () => `<span class="px-candle">${svg('candle')}<i class="px-glow"></i></span>`).join('')}</div>`;
  }

  /* petit dessin dans l’en-tête de page, selon la rubrique */
  const HEAD = [
    [/^#\/(learn|theology|theo|councils|distinctions|glossary|liturgy|parishes)/, 'church'],
    [/^#\/(slavonic|bible|psalter|passage|peres)/, 'book'],
    [/^#\/(apolo|objections|debats|ask)/, 'cross'],
    [/^#\/(saints|feasts|feast|calendar|kids|prayers|prayer|pray|chants)/, 'candle']
  ];
  function decorate(view) {
    const r = document.documentElement;
    r.setAttribute('data-pixel', on() ? '1' : '0');
    if (!on() || !view) return;
    const head = view.querySelector('.page-head');
    if (!head || head.querySelector('.ph-px')) return;
    const m = HEAD.find(([re]) => re.test(location.hash));
    if (m) head.insertAdjacentHTML('beforeend', `<span class="ph-px">${svg(m[1])}</span>`);
  }

  /* fond : le Christ Pantocrator en grand, très pâle, derrière le contenu */
  function background() {
    const r = document.documentElement;
    const data = 'data:image/svg+xml,' + encodeURIComponent(svg('christ').replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '));
    r.style.setProperty('--px-bg', `url("${data}")`);
    r.setAttribute('data-pixel', on() ? '1' : '0');
  }
  background();

  O.PIXEL = { svg, iconCorner, candles, decorate, on };
  K.act['toggle-pixel'] = () => { S.settings.pixel = !on(); K.save(); background(); K.render(); };
})();
