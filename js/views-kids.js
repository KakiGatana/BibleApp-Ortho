/* Pour les enfants : le saint du jour raconté simplement (par l'assistant), le signe de la croix, premières prières. */
(function () {
  const O = window.ORTHO, K = O.core, U = K.U;
  const { S, esc, route } = K;
  const C = O.cal;

  route('/kids', () => {
    const info = C.dayInfo(C.today(), S.settings.style);
    const saints = (info.saints || []).slice(0, 4);
    const html = `<section class="page kids">
      ${U.pageHead('Дѣти', 'Pour les enfants', 'Un coin simple pour découvrir les saints, apprendre le signe de la croix et dire ses premières prières.')}
      <article class="card"><div class="card-k">Le saint du jour</div>
        ${saints.length ? `<ul class="kid-saints">${saints.map((s) => `<li><b>${esc(s.name)}</b><button class="btn small" data-act="kids-ask" data-name="${esc(s.name)}">Raconter simplement</button></li>`).join('')}</ul>` : '<p class="muted">Pas de saint particulier aujourd’hui.</p>'}
        <p class="muted xs">Le récit est écrit par l’assistant IA, avec des mots d’enfant. Il peut se tromper : un adulte peut le relire avec l’enfant.</p></article>
      <article class="card"><div class="card-k">Le signe de la croix</div>
        <ol class="kid-steps">
          <li>Joins les trois premiers doigts de la main droite : ils nous rappellent le Père, le Fils et le Saint-Esprit.</li>
          <li>Plie les deux autres doigts dans la paume : Jésus est Dieu et homme à la fois.</li>
          <li>Touche ton front, puis ton ventre, puis ton épaule droite et enfin ton épaule gauche.</li>
          <li>Dis : « Au nom du Père, et du Fils, et du Saint-Esprit. Amen. »</li>
        </ol></article>
      <article class="card"><div class="card-k">Mes premières prières</div>
        <div class="kid-prayers">
          <a class="btn small ghost" href="#/prayer/jesus">Prière de Jésus</a>
          <a class="btn small ghost" href="#/prayer/pater">Notre Père</a>
          <a class="btn small ghost" href="#/prayer/repas">Avant le repas</a>
          <a class="btn small ghost" href="#/prayer/trisagion">Trisagion</a>
        </div></article>
      <article class="card"><div class="card-k">Jouer et apprendre</div>
        <p>Un petit quiz pour retenir les fêtes, les saints et quelques mots slavons.</p>
        <div class="row"><a class="btn small" href="#/slavonic/quiz">Faire un quiz</a><a class="btn small ghost" href="#/slavonic/alphabet">L’alphabet slavon</a></div></article>
    </section>`;
    return { html, title: 'Pour les enfants', nav: 'saints' };
  });

  K.act['kids-ask'] = (el) => {
    const name = el.dataset.name;
    S.askCtx = { title: 'Pour un enfant : ' + name, text: 'Le saint du jour est : ' + name + '.' };
    S.askAuto = 'Raconte-moi la vie de ' + name + ' comme à un enfant de 6 à 9 ans : 8 phrases simples et chaleureuses, sans détails violents, avec une petite leçon à la fin. Si tu n’es pas sûr de certains faits, dis-le simplement.';
    S.ask = []; K.save(); K.go('#/ask');
  };
})();
