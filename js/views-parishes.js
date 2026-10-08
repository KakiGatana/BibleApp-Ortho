/* Paroisses orthodoxes près de moi : données libres d'OpenStreetMap (Overpass). Aucune requête n'est envoyée avant que tu appuies sur un bouton. */
(function () {
  const O = window.ORTHO, K = O.core, U = K.U;
  const { esc, route } = K;
  const OVERPASS = 'https://overpass-api.de/api/interpreter';
  const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
  let radius = 25, busy = false;

  const km = (a, b, c, d) => {
    const R = 6371, rad = Math.PI / 180, dLat = (c - a) * rad, dLon = (d - b) * rad;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a * rad) * Math.cos(c * rad) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  };
  const DENOM = { orthodox: 'Orthodoxe', eastern_orthodox: 'Orthodoxe', russian_orthodox: 'Orthodoxe russe', greek_orthodox: 'Orthodoxe grecque', serbian_orthodox: 'Orthodoxe serbe', romanian_orthodox: 'Orthodoxe roumaine', bulgarian_orthodox: 'Orthodoxe bulgare', georgian_orthodox: 'Orthodoxe géorgienne', antiochian_orthodox: 'Orthodoxe d’Antioche', ukrainian_orthodox: 'Orthodoxe ukrainienne', macedonian_orthodox: 'Orthodoxe macédonienne' };
  const safeUrl = (u) => (/^https?:\/\//i.test(u || '') ? u : (u ? 'https://' + u : ''));

  function view() {
    const html = `<section class="page parishes">
      ${U.pageHead('Приходъ', 'Paroisses près de moi', 'Trouver une paroisse orthodoxe à proximité, à partir des données libres d’OpenStreetMap.')}
      <article class="card">
        <p class="muted small"><b>Vie privée :</b> rien n’est envoyé tant que tu n’appuies pas sur un bouton. Ensuite, ta position (ou le nom de la ville saisie) est transmise aux services libres d’OpenStreetMap (Overpass et Nominatim) pour trouver les lieux de culte. Elle n’est pas enregistrée par Blagovest.</p>
        <div class="set-row"><div><b>Rayon de recherche</b></div>${U.seg([['10', '10 km'], ['25', '25 km'], ['60', '60 km'], ['150', '150 km']], String(radius), 'par-radius')}</div>
        <div class="row"><button class="btn" data-act="par-geo">Utiliser ma position</button></div>
        <form id="parForm" class="par-form"><input type="search" id="parCity" placeholder="Ou une ville (ex. Lyon, Paris 15e)" aria-label="Ville" autocomplete="off"><button class="btn small" type="submit">Chercher</button></form>
      </article>
      <div id="parOut" aria-live="polite"></div>
      <p class="muted xs center">Les données viennent de contributeurs bénévoles : une paroisse peut manquer, être mal classée ou ne pas avoir d’horaires. Vérifie toujours par téléphone ou sur le site de la paroisse (et auprès de ta juridiction) avant de te déplacer.</p>
    </section>`;
    const after = () => {
      const f = document.getElementById('parForm');
      f.addEventListener('submit', (e) => { e.preventDefault(); const q = document.getElementById('parCity').value.trim(); if (q) byCity(q); });
    };
    return { html, title: 'Paroisses près de moi', nav: 'saints', after };
  }
  route('/parishes', view);

  const out = (h) => { const o = document.getElementById('parOut'); if (o) o.innerHTML = h; };
  const msg = (t) => out(`<article class="card"><p>${esc(t)}</p></article>`);

  function geo() {
    if (busy) return;
    if (!navigator.geolocation) { msg('La localisation n’est pas disponible sur cet appareil. Saisis une ville.'); return; }
    msg('Recherche de ta position…');
    navigator.geolocation.getCurrentPosition((p) => search(p.coords.latitude, p.coords.longitude), () => msg('Position refusée ou indisponible. Tu peux saisir une ville.'), { enableHighAccuracy: false, timeout: 12000, maximumAge: 600000 });
  }

  async function byCity(q) {
    if (busy) return;
    msg('Recherche de la ville…');
    try {
      const r = await fetch(NOMINATIM + '?format=json&limit=1&q=' + encodeURIComponent(q), { headers: { Accept: 'application/json' } });
      const j = await r.json();
      if (!j.length) { msg('Ville introuvable. Essaie un autre nom.'); return; }
      search(+j[0].lat, +j[0].lon, j[0].display_name);
    } catch (e) { msg('Pas de connexion : cette recherche a besoin d’Internet.'); }
  }

  async function search(lat, lon, label) {
    busy = true; msg('Recherche des paroisses…');
    const q = `[out:json][timeout:25];(nwr["amenity"="place_of_worship"]["religion"="christian"]["denomination"~"orthodox"]["denomination"!~"oriental|armenian|coptic|ethiopian|syriac|malankara"](around:${radius * 1000},${lat},${lon}););out center tags 80;`;
    try {
      const r = await fetch(OVERPASS, { method: 'POST', body: 'data=' + encodeURIComponent(q), headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
      if (!r.ok) throw new Error(r.status);
      const j = await r.json();
      const list = (j.elements || []).map((e) => {
        const c = e.center || { lat: e.lat, lon: e.lon }, t = e.tags || {};
        return { name: t.name || 'Lieu de culte orthodoxe (sans nom)', den: DENOM[t.denomination] || t.denomination || 'Orthodoxe', d: km(lat, lon, c.lat, c.lon), lat: c.lat, lon: c.lon, t };
      }).sort((a, b) => a.d - b.d).slice(0, 30);
      if (!list.length) { msg('Aucune paroisse trouvée dans ce rayon dans OpenStreetMap. Élargis le rayon, ou cherche sur le site de ta juridiction.'); busy = false; return; }
      out(`${label ? `<p class="muted small">Autour de : ${esc(label.split(',').slice(0, 2).join(','))}</p>` : ''}<p class="muted small">${list.length} résultat${list.length > 1 ? 's' : ''}, du plus proche au plus lointain.</p>` + list.map((p) => {
        const a = [p.t['addr:housenumber'], p.t['addr:street'], p.t['addr:postcode'], p.t['addr:city']].filter(Boolean).join(' ');
        const web = safeUrl(p.t.website || p.t['contact:website']), tel = p.t.phone || p.t['contact:phone'];
        return `<article class="card par-card"><div class="par-top"><b>${esc(p.name)}</b><span class="chip tone">${p.d < 1 ? Math.round(p.d * 1000) + ' m' : p.d.toFixed(1) + ' km'}</span></div>
          <div class="muted small">${esc(p.den)}${a ? ' · ' + esc(a) : ''}</div>
          ${p.t.opening_hours ? `<div class="muted small">Horaires : ${esc(p.t.opening_hours)}</div>` : ''}
          <div class="row">
            <a class="btn small" href="https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lon}#map=17/${p.lat}/${p.lon}" target="_blank" rel="noopener">Voir sur la carte</a>
            ${web ? `<a class="btn small ghost" href="${esc(web)}" target="_blank" rel="noopener">Site</a>` : ''}
            ${tel ? `<a class="btn small ghost" href="tel:${esc(String(tel).replace(/[^+\d]/g, ''))}">Appeler</a>` : ''}
          </div></article>`;
      }).join(''));
    } catch (e) { msg('Le service de cartes ne répond pas pour le moment (ou pas de connexion). Réessaie dans un instant.'); }
    busy = false;
  }

  K.act['par-geo'] = geo;
  K.act['par-radius'] = (el) => { radius = +el.dataset.v; document.querySelectorAll('[data-act="par-radius"]').forEach((b) => b.classList.toggle('on', b === el)); };
})();
