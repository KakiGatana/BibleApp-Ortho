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
  if ('serviceWorker' in navigator && /^https?:/.test(location.protocol)) {
    navigator.serviceWorker.register('sw.js').then(() => { if (O.push) O.push.sync(); }).catch(() => {});
  }
  if (window.speechSynthesis) speechSynthesis.getVoices();
})();
