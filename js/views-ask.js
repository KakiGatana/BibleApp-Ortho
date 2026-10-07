/* Vue : assistant théologique (questions / réponses), via le serveur de worker/ */
(function () {
  const O = window.ORTHO, K = O.core, U = K.U;
  const { S, esc, ic, route } = K;
  const CFG = window.BLAGOVEST_PUSH || {};
  const KEEP = 12; // messages gardés sur l'appareil
  const SEND = 6; // derniers messages envoyés au serveur (3 échanges)
  S.ask = Array.isArray(S.ask) ? S.ask : [];
  let busy = false;

  const SUGGEST = [
    'Qu’est-ce que la théosis ?',
    'Pourquoi le filioque pose-t-il problème ?',
    'Que s’est-il passé au concile de Nicée ?',
    'Quelle est la différence entre le calendrier julien et grégorien ?',
    'Pourquoi vénère-t-on les icônes ?'
  ];
  const SUGGEST_CTX = [
    'Explique-moi ce texte simplement.',
    'Quel est son contexte historique ?',
    'Que disent les Pères de l’Église à ce sujet ?',
    'Comment le vivre ou le prier concrètement ?'
  ];

  /* bouton « Demander à l'assistant » pour une page : titre + extrait du texte */
  O.askBtn = (title, text) =>
    `<button class="btn small ghost ask-about" data-act="ask-about" data-title="${esc(title)}" data-text="${esc(String(text || '').slice(0, 1800))}">${ic('chat')}<span>Demander à l’assistant</span></button>`;

  /* mise en forme sûre : on échappe tout, puis on remet gras, italique, liens internes */
  function fmt(text) {
    let h = esc(text);
    h = h.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/(^|[\s(])\*(?!\s)(.+?)\*(?=[\s).,;:!?]|$)/g, '$1<i>$2</i>');
    h = h.replace(/\[\[(passage|prayer|theo):([^\]]+)\]\]/g, (m, k, id) => {
      const list = k === 'passage' ? O.READINGS : k === 'prayer' ? O.PRAYERS : O.THEOLOGY;
      const it = (list || []).find((x) => x.id === id);
      if (!it) return '';
      const label = k === 'passage' ? it.ref : it.title;
      return `<a class="ask-link" href="#/${k}/${id}">${esc(label)}</a>`;
    });
    return h.split(/\n{2,}/).map((p) => '<p>' + p.replace(/\n/g, '<br>') + '</p>').join('');
  }

  const bubble = (m) => `<div class="ask-msg ${m.role === 'user' ? 'me' : 'bot'}">${m.role === 'user' ? '<p>' + esc(m.content) + '</p>' : fmt(m.content)}</div>`;

  function askView() {
    const configured = !!CFG.server, cx = S.askCtx;
    const sugg = cx ? SUGGEST_CTX : SUGGEST;
    const html = `<section class="page ask">
      ${U.pageHead('Вопросы', 'Poser une question', 'Un assistant pour la théologie et l’histoire de l’Église, dans l’esprit de l’Orthodoxie.')}
      <p class="muted small ask-warn">Réponse générée par une IA : elle peut se tromper, surtout sur les citations et les dates. Vérifie dans les sources, et pour ta vie spirituelle, parle à ton prêtre.</p>
      ${cx ? `<div class="ask-ctx"><span>À propos de : <b>${esc(cx.title)}</b></span><button class="icon-btn" data-act="ask-ctx-clear" aria-label="Retirer ce texte">✕</button></div>` : ''}
      <div id="askLog" class="ask-log" aria-live="polite">${S.ask.map(bubble).join('')}</div>
      <div id="askSug" class="ask-sug" ${S.ask.length ? 'hidden' : ''}>${sugg.map((q) => `<button class="chip-btn" data-act="ask-suggest" data-q="${esc(q)}">${esc(q)}</button>`).join('')}</div>
      <form id="askForm" class="ask-form">
        <textarea id="askIn" rows="2" maxlength="1000" placeholder="${configured ? 'Ta question…' : 'Assistant non configuré'}" ${configured ? '' : 'disabled'}></textarea>
        <button class="btn" type="submit" ${configured ? '' : 'disabled'}>Envoyer</button>
      </form>
      ${S.ask.length ? '<p class="center"><button class="btn ghost small" data-act="ask-clear">Effacer la conversation</button></p>' : ''}
    </section>`;
    const after = (root) => {
      const form = root.querySelector('#askForm'), inp = root.querySelector('#askIn');
      form.addEventListener('submit', (e) => { e.preventDefault(); send(inp.value); });
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(inp.value); } });
      const log = root.querySelector('#askLog'); if (log.lastElementChild) log.lastElementChild.scrollIntoView({ block: 'end' });
      if (S.askAuto) { const q = S.askAuto; delete S.askAuto; K.save(); if (configured) send(q); }
    };
    return { html, title: 'Poser une question', nav: 'ask', after };
  }
  route('/ask', askView);

  async function send(text) {
    text = (text || '').trim();
    if (!text || busy) return;
    const log = document.getElementById('askLog'), inp = document.getElementById('askIn');
    if (!log) return;
    busy = true;
    document.getElementById('askSug').hidden = true;
    S.ask.push({ role: 'user', content: text });
    log.insertAdjacentHTML('beforeend', bubble({ role: 'user', content: text }) + '<div class="ask-msg bot" id="askWait"><p class="muted">… je réfléchis</p></div>');
    inp.value = '';
    document.getElementById('askWait').scrollIntoView({ block: 'end' });
    let answer, err;
    try {
      // le serveur attend une alternance user / assistant qui commence et finit par « user »
      let hist = S.ask.slice(-SEND);
      while (hist.length && hist[0].role !== 'user') hist = hist.slice(1);
      const payload = { messages: hist };
      if (S.askCtx) payload.context = { title: S.askCtx.title, text: S.askCtx.text };
      if (S.settings.ui && S.settings.ui !== 'fr') payload.lang = S.settings.ui;
      const r = await fetch(CFG.server.replace(/\/$/, '') + '/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.answer) answer = j.answer; else err = j.message || 'L’assistant n’a pas pu répondre. Réessaie dans un instant.';
    } catch (e) { err = 'Pas de connexion. L’assistant a besoin d’Internet.'; }
    const wait = document.getElementById('askWait'); if (wait) wait.remove();
    if (answer) {
      S.ask.push({ role: 'assistant', content: answer });
      log.insertAdjacentHTML('beforeend', bubble({ role: 'assistant', content: answer }));
    } else {
      S.ask.pop(); // la question n'a pas abouti : on ne la garde pas dans l'historique
      log.insertAdjacentHTML('beforeend', `<div class="ask-msg bot err"><p>${esc(err)}</p></div>`);
      inp.value = text;
    }
    S.ask = S.ask.slice(-KEEP); K.save();
    busy = false;
    if (log.lastElementChild) log.lastElementChild.scrollIntoView({ block: 'end' });
  }

  K.act['ask-suggest'] = (el) => send(el.dataset.q);
  K.act['ask-about'] = (el) => { S.askCtx = { title: el.dataset.title, text: el.dataset.text }; S.ask = []; K.save(); K.go('#/ask'); };
  K.act['ask-ctx-clear'] = () => { delete S.askCtx; K.save(); K.render(); };
  K.act['ask-clear'] = () => { if (confirm('Effacer la conversation sur cet appareil ?')) { S.ask = []; delete S.askCtx; K.save(); K.render(); } };
})();
