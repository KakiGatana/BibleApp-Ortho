// Applique le thème avant le premier rendu (évite le flash)
  try { var s = JSON.parse(localStorage.getItem('blagovest:v1') || '{}').settings || {};
    if (s.theme === 'light' || s.theme === 'dark') document.documentElement.setAttribute('data-theme', s.theme);
    document.documentElement.setAttribute('data-lang', s.lang || 'both'); } catch (e) {}
