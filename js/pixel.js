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
    w: '#efe6d2', v: '#c9a75a', x: '#b8b2a6', N: '#3a3446', q: '#26222e', A: '#a9b2c4', a: '#6c7486', O: '#c99a3a', P: '#9c7428', k: '#7a4a2a', n: '#6b4a2e', h: '#7a4a2a', f: '#f2cf6a', o: '#fff3c4', W: '#ecd38a'
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
    /* Mère de Dieu Hodigitria : l’Enfant sur son bras, sa main qui le désigne */
    hodegetria: [
      'gggggggggggggggggggggggg',
      'gGRGRGRRGGGGGGGGGGRGRGRg',
      'gGRRRGRRYYYYYYGGGRRRGRGg',
      'gGRGRGRYYYYYYYYYGGRGGRGg',
      'gGGGGGYYMMMYMMMYYGGGGGGg',
      'gGGGGYYMMUUUUMMMYYGGGGGg',
      'gGGGGYYMUSSSSMMMYYGGGGGg',
      'gGGGGYYMSKSKSMMMYYGGGGGg',
      'gGGGGYMMSSsSSMMMMYGGGGGg',
      'gGGGGYMMMSSSMMGYYYGGGGGg',
      'gGGGMMMMMMMMMMYSSSSYGGGg',
      'gGGMMMMMMSSMMMYKSKSYGGGg',
      'gGGMMYMMMMMMMggggggMGGGg',
      'gGMMMMMMMMMMMgYggYgMMGGg',
      'gGMMMMMMMMMMMggggggMMGGg',
      'gGMMMMMMMMMMMMSSSSMMMMGg',
      'gGMMMMMMMUUUMMMMMMMMMMGg',
      'gGMMMMMMMUUUMMMMMMMMMMGg',
      'gGMMMMMMMUUUMMMMMMMMMMGg',
      'gMMMMMMMMUUUMMMMMMMMMMMg',
      'gMMMMMMmMUUUMMMMMmMMMMMg',
      'gMMMMMMmMUUUMMMMMmMMMMMg',
      'gMmMMMMMMUUUMMMMMMMMmMMg',
      'gMmMMMMMMUUUMMMMMMMMmMMg',
      'gggggggggggggggggggggggg'
    ],
    /* saint Nicolas : évêque, omophorion à croix, Évangile */
    nicolas: [
      'gggggggggggggggggggggggg',
      'gGGGGGGGGGGGGGGGGGGGGGGg',
      'gGGGGGGGGYYYYYYGGGGGGGGg',
      'gGGGGGGYYYYYYYYYYGGGGGGg',
      'gGGGGGYYYSSSSSSYYYGGGGGg',
      'gGGGGYYYxSSSSSSxYYYGGGGg',
      'gGGGGYYwwSSSSSSwwYYGGGGg',
      'gGGGGYYwwSKSSKSwwYYGGGGg',
      'gGGGGYYwwSSsSSSwwYYGGGGg',
      'gGGGGYYwwwSssSwwwYYGGGGg',
      'gGGSGGYwwwwwwwwwwYGGGGGg',
      'gGSSSCCwwwwwwwwwwCCGGGGg',
      'gGSSSCwwKwwwwwwKwwCCGGGg',
      'gGGCCCwKKKwwwwKKKwCCCGGg',
      'gGGCCCCwKwwwwwwKwggggGGg',
      'gGGCCCCCwwwKwwwwwgYRgGGg',
      'gGGcCCCCCwwKKKwwSgRYgGGg',
      'gGGcCCCCCCwwKwwCSggggGGg',
      'gGcCCCYCCCwwKwwCCCYCCCGg',
      'gGcCCYYYCCwwKwwCCYYYCCGg',
      'gcCCCCYCCCwwKwwCCCYCCCCg',
      'gcCCCCCCCCwwwwwCCCCCCcCg',
      'gcCCCCCCCCwwKwwCCCCCCcCg',
      'gcCCCcCCCCwwKwwCCCCcCcCg',
      'gggggggggggggggggggggggg'
    ],
    /* saint Séraphin de Sarov : moine, cheveux et barbe blancs, croix sur la poitrine */
    seraphim: [
      'gggggggggggggggggggggggg',
      'gGGGGGGGGGGGGGGGGGGGGGGg',
      'gGGGGGGGGYYYYYYGGGGGGGGg',
      'gGGGGGGYYYYYYYYYYGGGGGGg',
      'gGGGGGYYYwwwwwwYYYGGGGGg',
      'gGGGGYYYwwwwwwwwYYYGGGGg',
      'gGGGGYYwwSSSSSSwwYYGGGGg',
      'gGGGGYYwwSKSSKSwwYYGGGGg',
      'gGGGGYYwwSSsSSSwwYYGGGGg',
      'gGGGGYYwwwSssSwwwYYGGGGg',
      'gGGGGGYwwwwwwwwwwYGGGGGg',
      'gGGNNNNwwwwwwwwwwNNNNGGg',
      'gGNNNNNNwwwwwwwwNNNNNNGg',
      'gGNNNNNNNwwwwwwNNNNNNNGg',
      'gGNNNNNNNNwwwwNNNNNNNNGg',
      'gGNNNNNNNNNYYNNNNNNNNNGg',
      'gGNNNNNNNNYYYYNNNNNNNNGg',
      'gGNNNNSSNNNYYNNNSSNNNNGg',
      'gGNNNNSSNNNYYNNNSSNNNNGg',
      'gNNNNNNNNNNYYNNNNNNNNNNg',
      'gNqNNNNNNNNNNNNNNNNNqNNg',
      'gNqNNNNNNNNNNNNNNNNNqNNg',
      'gqNNNNNNNNNNNNNNNNNNNqNg',
      'gqNNNNNNNNNNNNNNNNNNNqNg',
      'gggggggggggggggggggggggg'
    ],
    /* saint Georges : soldat, manteau rouge, cuirasse, lance */
    georges: [
      'gggggggggggggggggggggggg',
      'gGGGGGGGGGGGGGGGGGGGAGGg',
      'gGGGGGGGGYYYYYYGGGGaAaGg',
      'gGGGGGGYYYYYYYYYYGGGkGGg',
      'gGGGGGYYYHHHHHHYYYGGkGGg',
      'gGGGGYYYHHHHHHHHYYYGkGGg',
      'gGGGGYYHHSSSSSSHHYYGkGGg',
      'gGGGGYYHHSKSSKSHHYYGkGGg',
      'gGGGGYYHHSSsSSSHHYYGkGGg',
      'gGGGGYYYYHSSSSHYYYYGkGGg',
      'gGGGGGYYYYSSSSYYYYGGkGGg',
      'gGGCCCCCAAAAAAAACCCCkGGg',
      'gGCCCCCAAaAAAAaAACCCkCGg',
      'gGCCCCCAaAAYAAaAACCCkCGg',
      'gCCCCCCAAaAAAAaAACCCkCCg',
      'gCCCCCCAaAAAAAAaACCSSSCg',
      'gCCCCCCAAAaaaaAAACCCkCCg',
      'gCCCcCCAAAAAAAAAACCckCCg',
      'gCCCcCCAAAAAAAAAACCckCCg',
      'gCCCcCCAaAAAAAAaACCckCCg',
      'gCCCcCCAaAAAAAAaACCckCCg',
      'gCCCcCCAAAAAAAAAACCckCCg',
      'gCCCcCCAaAAAAAAaACCckCCg',
      'gCCCcCCAAAAAAAAAACCckCCg',
      'gggggggggggggggggggggggg'
    ],
    /* saint Jean le Précurseur : vêtement en poil de chameau, rouleau */
    jean: [
      'gggggggggggggggggggggggg',
      'gGGGGGGGGGGGGGGGGGGGGGGg',
      'gGGGGGGGGYYYYYYGGGGGGGGg',
      'gGGGGGGYYYYYYYYYYGGGGGGg',
      'gGGGGGYYHHHHHHHHYYGGGGGg',
      'gGGGGYYHHHHHHHHHHYYGGGGg',
      'gGGGGYHHHSSSSSSHHHYGGGGg',
      'gGGGGYHHHSKSSKSHHHYGGGGg',
      'gGGGGYHHHSSsSSSHHHYGGGGg',
      'gGGGGHHHHHSssSHHHHHGGGGg',
      'gGGSGHHHHHHHHHHHHHHGGGGg',
      'gGSSSkkkHHHHHHHHkkkkGGGg',
      'gGSSSknkkHHHHHHkknkkkGGg',
      'gGGkkkkknkkHHkkkkwwwwkGg',
      'gGGkknkkkkkkkkkkSwKKwkGg',
      'gGkkkkkkknkkkkkkSwwwwkGg',
      'gGkknkkkkkkkknkkkwKKwkGg',
      'gkkkkkkknkkkkkkkkwwwwkkg',
      'gkknkkkkkkknkkkkkkknkkkg',
      'gkkkkknkkkkkkkknkkkkkkkg',
      'gkknkkkkkkknkkkkkkknkkkg',
      'gkkkkknkkkkkkkknkkkkkkkg',
      'gkknkkkkkkknkkkkkkknkkkg',
      'gkkkkknkkkkkkkknkkkkkkkg',
      'gggggggggggggggggggggggg'
    ],
    /* apôtre Pierre : cheveux et barbe gris et courts, clés */
    pierre: [
      'gggggggggggggggggggggggg',
      'gGGGGGGGGGGGGGGGGGGGGGGg',
      'gGGGGGGGGYYYYYYGGGGGGGGg',
      'gGGGGGGYYYYYYYYYYGGGGGGg',
      'gGGGGGYYYxxxxxxYYYGGGGGg',
      'gGGGGYYYxxxxxxxxYYYGGGGg',
      'gGGGGYYxxSSSSSSxxYYGGGGg',
      'gGGGGYYxxSKSSKSxxYYGGGGg',
      'gGGGGYYxxSSsSSSxxYYGGGGg',
      'gGGGGYYxxxSssSxxxYYGGGGg',
      'gGGGGGYxxxxxxxxxxYGGGGGg',
      'gGGBBBBBxxxxxxOOOOOOGGGg',
      'gGSSBBBBBBOOOOOOOOOOOGGg',
      'gGSYBBBBBOOOOOPOOOOOOOGg',
      'gGYYYBBBOOOOOPOOOOOOOOGg',
      'gGGYBBBBOOOOPOOOOOOOOOGg',
      'gGBBBBBOOOOPOOOOOOOOOOGg',
      'gBBBBBOOOOPOOOOOOOOOOOOg',
      'gBbBBBOOOPOOOOOOOOOOPOOg',
      'gBBBBBOOOPOOOOOOOOOOPOOg',
      'gBbBBBOOPOOOOOOOOOOOPOOg',
      'gBBBBBOOPOOOOOOOOOOOOOOg',
      'gBbBBBOPOOOOOOOOOOOOPOOg',
      'gBBBBBOPOOOOOOOOOOOOPOOg',
      'gggggggggggggggggggggggg'
    ],
    /* apôtre Paul : front dégarni, longue barbe sombre, livre des Épîtres */
    paul: [
      'gggggggggggggggggggggggg',
      'gGGGGGGGGGGGGGGGGGGGGGGg',
      'gGGGGGGGGYYYYYYGGGGGGGGg',
      'gGGGGGGYYYYYYYYYYGGGGGGg',
      'gGGGGGYYYSSSSSSYYYGGGGGg',
      'gGGGGYYYHSSSSSSHYYYGGGGg',
      'gGGGGYYHHSSSSSSHHYYGGGGg',
      'gGGGGYYHHSKSSKSHHYYGGGGg',
      'gGGGGYYHHSSsSSSHHYYGGGGg',
      'gGGGGYYHHHSssSHHHYYGGGGg',
      'gGGGGGYHHHHHHHHHHYGGGGGg',
      'gGGBBBBBCCHHHHCCCCCCCGGg',
      'gGSSBBBBCCCHHCCCCggggGGg',
      'gGSSBBBBCCCCCCCCCgYRgGGg',
      'gGGBBBBCCCCCCCCCSgRYgGGg',
      'gGBBBBBCCCCcCCCCSggggGGg',
      'gGBBBBCCCCcCCCCCCCCCCCGg',
      'gBBBBBCCCCcCCCCCCCCCCCCg',
      'gBbBBCCCCcCCCCCCCCcCCCCg',
      'gBBBBBCCCCcCCCCCCCCCCCCg',
      'gBbBBCCCCcCCCCCCCCcCCCCg',
      'gBBBBBCCCcCCCCCCCCCCCCCg',
      'gBbBBCCCcCCCCCCCCCcCCCCg',
      'gBBBBBCCCcCCCCCCCCCCCCCg',
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

  /* décor : un mur de plâtre et un sol en carreaux, en pixels, pour que les dessins ressortent */
  function tile(w, h, base, dots) {
    let r = `<rect width="${w}" height="${h}" fill="${base}"/>`;
    dots.forEach(([x, y, c]) => { r += `<rect x="${x}" y="${y}" width="1" height="1" fill="${c}"/>`; });
    return 'url("data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">${r}</svg>`) + '")';
  }
  (function decor() {
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const dots = []; for (let i = 0; i < 34; i++) dots.push([Math.floor(rnd() * 16), Math.floor(rnd() * 16), rnd() < .6 ? '#dccba6' : '#f3e8cf']);
    const floor = [];
    for (let x = 0; x < 8; x++) for (let y = 0; y < 4; y++) if ((x < 4) === (y < 2)) floor.push([x, y, '#8a6a4a']);
    const r = document.documentElement.style;
    r.setProperty('--px-wall', tile(16, 16, '#e8dabb', dots));
    r.setProperty('--px-floor', tile(8, 4, '#6e5238', floor));
  })();
  const scene = (inner, cls) => `<div class="px-scene ${cls || ''}" aria-hidden="true"><div class="px-wall">${inner}</div><div class="px-floor"></div></div>`;
  const lamp = () => `<div class="px-lamp">${svg('lampada')}<i class="px-glow"></i></div>`;

  /* coin des icônes : la Mère de Dieu, la lampada allumée, le Christ */
  function iconCorner() {
    if (!on()) return '';
    return scene(`<div class="px-shelf">${svg('hodegetria', { cls: 'px-ic' })}${lamp()}${svg('christ', { cls: 'px-ic' })}</div>`, 'px-corner');
  }

  /* rangée d’icônes, comme une petite iconostase : des saints, la Mère de Dieu et le Christ */
  function iconRow(list) {
    if (!on()) return '';
    const L = list || ['jean', 'hodegetria', '*', 'christ', 'nicolas'];
    return scene(`<div class="px-row">${L.map((n) => n === '*' ? lamp() : svg(n, { cls: 'px-ic' })).join('')}</div>`, 'px-iconrow');
  }

  /* icône du jour, quand la fête ou le saint a son dessin */
  const DAY = [
    [/Nicolas/, 'nicolas'], [/Séraphin de Sarov/, 'seraphim'], [/Georges le Victorieux|Georges, grand/, 'georges'],
    [/Pierre et Paul/, ['pierre', 'paul']], [/Précurseur|Jean-Baptiste/, 'jean'],
    [/Mère de Dieu|Théotokos|Dormition|Annonciation/, 'hodegetria'],
    [/Seigneur|Transfiguration|Théophanie|Pâque|Nativité de notre|Exaltation/, 'christ']
  ];
  function dayIcons(names) {
    if (!on()) return '';
    const found = [];
    (names || []).forEach((n) => { const m = DAY.find(([re]) => re.test(n)); if (m) [].concat(m[1]).forEach((x) => { if (!found.includes(x)) found.push(x); }); });
    if (!found.length) return '';
    return scene(`<div class="px-row">${found.slice(0, 2).map((n) => svg(n, { cls: 'px-ic' })).join(lamp())}</div>`, 'px-day');
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

  O.PIXEL = { svg, iconCorner, iconRow, dayIcons, candles, decorate, on };
  K.act['toggle-pixel'] = () => { S.settings.pixel = !on(); K.save(); background(); K.render(); };
})();
