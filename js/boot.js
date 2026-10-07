/* Démarrage */
(function () {
  const O = window.ORTHO, K = O.core;
  K.act['quiz-again'] = (el, e) => { e.preventDefault(); K.render(); };
  K.buildNav();
  K.applySettings();
  K.markVisit();
  window.addEventListener('hashchange', () => { if (!K.$('#sheet').hidden) K.closeSheet(); K.render(); });
  if (window.matchMedia) matchMedia('(prefers-color-scheme: dark)').addEventListener('change', K.applySettings);
  K.render();
  setTimeout(() => { if (O.milestones) O.milestones(); if (O.welcome) O.welcome(); }, 900);
  if ('serviceWorker' in navigator && /^https?:/.test(location.protocol)) {
    // une nouvelle version prend la main : on propose de recharger (pas à la toute première installation)
    const hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadController) showUpdate(); });
    navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then((reg) => {
      if (O.push) O.push.sync();
      // à chaque retour dans l'appli, on cherche une mise à jour
      document.addEventListener('visibilitychange', () => { if (!document.hidden) reg.update().catch(() => {}); });
    }).catch(() => {});
  }
  function showUpdate() {
    if (document.getElementById('updBar')) return;
    const bar = document.createElement('div');
    bar.id = 'updBar'; bar.className = 'update-bar'; bar.setAttribute('role', 'status');
    bar.innerHTML = '<span>Une nouvelle version de Blagovest est disponible.</span><button class="btn small" id="updGo">Actualiser</button><button class="icon-btn" id="updX" aria-label="Plus tard">✕</button>';
    document.body.appendChild(bar);
    document.getElementById('updGo').addEventListener('click', () => location.reload());
    document.getElementById('updX').addEventListener('click', () => bar.remove());
  }
  if (window.speechSynthesis) speechSynthesis.getVoices();
})();
