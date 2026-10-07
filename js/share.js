/* Partage d'un verset en belle image (carte 1080 × 1350) */
(function () {
  const O = window.ORTHO, K = O.core;
  const { ic, esc } = K;
  const SITE = 'kakigatana.github.io/BibleApp-Ortho';

  O.shareBtn = (v) =>
    `<button class="btn small ghost" data-act="share-img" data-ref="${esc(v.ref)}" data-fr="${esc(v.fr)}" data-cs="${esc(v.cs || '')}">${ic('share')}<span>Partager en image</span></button>`;

  function wrap(ctx, text, maxW) {
    const lines = []; let line = '';
    for (const w of String(text).split(/\s+/)) {
      const t = line ? line + ' ' + w : w;
      if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
    }
    if (line) lines.push(line);
    return lines;
  }

  // réduit la taille de police jusqu'à ce que le texte tienne dans la hauteur donnée
  function fit(ctx, text, font, maxW, maxH, size, min, lh) {
    for (let s = size; s >= min; s -= 2) {
      ctx.font = font(s);
      const lines = wrap(ctx, text, maxW);
      if (lines.length * s * lh <= maxH) return { s, lines };
    }
    ctx.font = font(min);
    return { s: min, lines: wrap(ctx, text, maxW) };
  }

  async function render({ ref, fr, cs }) {
    const W = 1080, H = 1350, M = 100;
    try { await Promise.all(['italic 60px "Cormorant Garamond"', '600 40px "Cinzel"', '50px "Ponomar Unicode TT"'].map((f) => document.fonts.load(f, 'Aа'))); } catch (e) { /* polices non disponibles : repli */ }
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, W * 0.4, H);
    g.addColorStop(0, '#3b72c9'); g.addColorStop(0.55, '#2756a6'); g.addColorStop(1, '#1b3f84');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // étoiles discrètes
    ctx.fillStyle = 'rgba(255,255,255,.55)';
    [[130, 160], [320, 90], [520, 210], [760, 120], [940, 260], [90, 700], [980, 880], [210, 1180], [860, 1230], [600, 1100]].forEach(([x, y], i) => { ctx.beginPath(); ctx.arc(x, y, i % 3 ? 2 : 3, 0, 7); ctx.fill(); });
    // cadre doré
    ctx.strokeStyle = 'rgba(240,205,122,.7)'; ctx.lineWidth = 3; ctx.strokeRect(46, 46, W - 92, H - 92);
    ctx.strokeStyle = 'rgba(240,205,122,.3)'; ctx.lineWidth = 1.5; ctx.strokeRect(62, 62, W - 124, H - 124);

    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    // en-tête
    ctx.fillStyle = '#f0cd7a'; ctx.font = '600 38px "Cinzel", Georgia, serif';
    ctx.fillText('BLAGOVEST', W / 2, 170);
    ctx.font = '40px "Ponomar Unicode TT", "Noto Serif", serif'; ctx.fillText('Благовѣстъ', W / 2, 225);
    ctx.fillRect(W / 2 - 60, 260, 120, 3);

    // blocs de texte : on mesure d'abord, puis on centre l'ensemble entre l'en-tête et le pied
    const maxW = W - 2 * M - 40, hasCs = !!cs;
    const frBox = fit(ctx, fr, (s) => `italic ${s}px "Cormorant Garamond", "EB Garamond", Georgia, serif`, maxW, hasCs ? 470 : 640, hasCs ? 70 : 80, 30, 1.32);
    const csBox = hasCs ? fit(ctx, cs, (s) => `${s}px "Ponomar Unicode TT", "Noto Serif", serif`, maxW, 280, 50, 26, 1.4) : null;
    const frH = frBox.lines.length * frBox.s * 1.32, csH = csBox ? csBox.lines.length * csBox.s * 1.4 : 0;
    const total = frH + (csBox ? 60 + csH : 0) + 110; // + référence
    let y = 300 + Math.max(0, (H - 300 - 190 - total) / 2);
    ctx.fillStyle = '#fbf3dc'; ctx.font = `italic ${frBox.s}px "Cormorant Garamond", "EB Garamond", Georgia, serif`;
    frBox.lines.forEach((l, i) => ctx.fillText(l, W / 2, y + frBox.s + i * frBox.s * 1.32));
    y += frH;
    if (csBox) {
      y += 60;
      ctx.fillStyle = '#f0cd7a'; ctx.font = `${csBox.s}px "Ponomar Unicode TT", "Noto Serif", serif`;
      csBox.lines.forEach((l, i) => ctx.fillText(l, W / 2, y + csBox.s + i * csBox.s * 1.4));
      y += csH;
    }
    ctx.fillStyle = '#f6dc9a'; ctx.font = '600 40px "Cinzel", Georgia, serif';
    ctx.fillText('— ' + ref.toUpperCase(), W / 2, y + 110);
    // pied
    ctx.fillStyle = 'rgba(251,243,220,.75)'; ctx.font = '30px "EB Garamond", Georgia, serif';
    ctx.fillText(SITE, W / 2, H - 110);
    return new Promise((res) => cv.toBlob(res, 'image/png'));
  }

  K.act['share-img'] = async (el) => {
    const v = { ref: el.dataset.ref, fr: el.dataset.fr, cs: el.dataset.cs };
    K.toast('Création de l’image…');
    try {
      const blob = await render(v);
      const file = new File([blob], 'verset-blagovest.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Blagovest', text: `« ${v.fr} » — ${v.ref}` });
        return;
      }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'verset-blagovest.png'; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 3000);
      K.toast('Image enregistrée');
    } catch (e) {
      if (e && e.name === 'AbortError') return; // partage annulé
      K.toast('Impossible de créer l’image');
    }
  };
  O.shareImage = render;
})();
