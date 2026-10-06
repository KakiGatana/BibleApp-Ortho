/* =========================================================
   Moteur liturgique : Pâques, cycle mobile, fêtes fixes,
   jeûnes, tons de l'Octoèque. Aucune dépendance.
   ========================================================= */
(function () {
  const O = (window.ORTHO = window.ORTHO || {});
  const DAY = 86400000;

  const utc = (y, m, d) => new Date(Date.UTC(y, m - 1, d));
  const addDays = (dt, n) => new Date(dt.getTime() + n * DAY);
  const diff = (a, b) => Math.round((a.getTime() - b.getTime()) / DAY);
  const pad = (n) => String(n).padStart(2, '0');
  const mdKey = (m, d) => pad(m) + '-' + pad(d);
  const isoKey = (dt) => dt.getUTCFullYear() + '-' + pad(dt.getUTCMonth() + 1) + '-' + pad(dt.getUTCDate());
  const fromIso = (s) => { const [y, m, d] = s.split('-').map(Number); return utc(y, m, d); };
  const today = () => { const n = new Date(); return utc(n.getFullYear(), n.getMonth() + 1, n.getDate()); };

  /* ---------- Pâques (comput julien, Meeus) ---------- */
  function julianOffset(y) { return Math.floor(y / 100) - Math.floor(y / 400) - 2; } // 13 j de 1900 à 2099
  const paschaCache = {};
  function pascha(y) {
    if (paschaCache[y]) return paschaCache[y];
    const a = y % 4, b = y % 7, c = y % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const month = Math.floor((d + e + 114) / 31);
    const day = ((d + e + 114) % 31) + 1;
    return (paschaCache[y] = addDays(utc(y, month, day), julianOffset(y)));
  }

  /* Date « nominale » : celle du calendrier des saints.
     style 'new' (julien révisé) = date civile ; 'old' (julien) = civile − 13 j */
  function nominal(dt, style) {
    if (style === 'old') {
      const n = addDays(dt, -julianOffset(dt.getUTCFullYear()));
      return { m: n.getUTCMonth() + 1, d: n.getUTCDate(), date: n };
    }
    return { m: dt.getUTCMonth() + 1, d: dt.getUTCDate(), date: dt };
  }
  /* inverse : à quelle date civile tombe la date nominale m/d de l'année y */
  function civilFromNominal(y, m, d, style) {
    const n = utc(y, m, d);
    return style === 'old' ? addDays(n, julianOffset(y)) : n;
  }

  const ORD = (n) => (n === 1 ? '1er' : n + 'e');
  const WD = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

  /* ---------- Cycle mobile (jours relatifs à Pâques) ---------- */
  const brightDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const brightCs = ['Понедѣльникъ', 'Вторникъ', 'Среда', 'Четвертокъ', 'Пятокъ', 'Суббота'];
  const MOV = {
    '-77': { n: 'Dimanche de Zachée', r: 3, t: 'seigneur', id: 'zachee', cs: 'Недѣля о Закхеѣ' },
    '-70': { n: 'Dimanche du Publicain et du Pharisien', r: 3, t: 'triode', id: 'publicain', cs: 'Недѣля о мытарѣ и фарисеѣ' },
    '-63': { n: 'Dimanche de l’Enfant prodigue', r: 3, t: 'triode', id: 'prodigue', cs: 'Недѣля о блудномъ сынѣ' },
    '-57': { n: 'Samedi des défunts (avant la Viande)', r: 3, t: 'triode', id: 'samedi-defunts', cs: 'Суббота мясопустная, вселенская родительская' },
    '-56': { n: 'Dimanche de la Viande — Jugement dernier', r: 3, t: 'triode', id: 'viande', cs: 'Недѣля мясопустная, о страшнѣмъ судѣ' },
    '-49': { n: 'Dimanche du Fromage — Pardon mutuel', r: 3, t: 'triode', id: 'fromage', cs: 'Недѣля сыропустная, изгнаніе Адамово' },
    '-48': { n: 'Lundi pur — Entrée dans le Grand Carême', r: 4, t: 'careme', id: 'lundi-pur', cs: 'Чистый понедѣльникъ' },
    '-43': { n: 'Samedi de saint Théodore (miracle des koliva)', r: 2, t: 'careme', id: 'theodore', cs: 'Чудо святаго Феодора Тирона' },
    '-42': { n: 'Dimanche de l’Orthodoxie (1er du Carême)', r: 4, t: 'careme', id: 'orthodoxie', cs: 'Недѣля Православія' },
    '-36': { n: 'Samedi des défunts (2e du Carême)', r: 2, t: 'careme', id: 'defunts2', cs: 'Суббота родительская' },
    '-35': { n: 'Dimanche de saint Grégoire Palamas (2e du Carême)', r: 3, t: 'careme', id: 'palamas', cs: 'Недѣля 2-я Великаго поста' },
    '-29': { n: 'Samedi des défunts (3e du Carême)', r: 2, t: 'careme', id: 'defunts3', cs: 'Суббота родительская' },
    '-28': { n: 'Dimanche de la Vénération de la Sainte Croix (3e du Carême)', r: 3, t: 'careme', id: 'croix-careme', cs: 'Недѣля Крестопоклонная' },
    '-22': { n: 'Samedi des défunts (4e du Carême)', r: 2, t: 'careme', id: 'defunts4', cs: 'Суббота родительская' },
    '-21': { n: 'Dimanche de saint Jean Climaque (4e du Carême)', r: 3, t: 'careme', id: 'climaque', cs: 'Недѣля преподобнаго Іоанна Лѣствичника' },
    '-15': { n: 'Samedi de l’Acathiste', r: 3, t: 'theotokos', id: 'acathiste', cs: 'Суббота Акаѳиста' },
    '-14': { n: 'Dimanche de sainte Marie l’Égyptienne (5e du Carême)', r: 3, t: 'careme', id: 'marie-egyptienne', cs: 'Недѣля преподобныя Маріи Египетскія' },
    '-8': { n: 'Samedi de Lazare', r: 4, t: 'seigneur', id: 'lazare', cs: 'Суббота Лазарева' },
    '-7': { n: 'Dimanche des Rameaux — Entrée du Seigneur à Jérusalem', r: 5, t: 'seigneur', id: 'rameaux', cs: 'Вход Господень во Иерусалимъ' },
    '-6': { n: 'Grand et Saint Lundi', r: 4, t: 'passion', id: 'gl', cs: 'Великій понедѣльникъ' },
    '-5': { n: 'Grand et Saint Mardi', r: 4, t: 'passion', id: 'gm', cs: 'Великій вторникъ' },
    '-4': { n: 'Grand et Saint Mercredi', r: 4, t: 'passion', id: 'gme', cs: 'Великая среда' },
    '-3': { n: 'Grand et Saint Jeudi — Sainte Cène', r: 4, t: 'passion', id: 'gj', cs: 'Великій четвертокъ' },
    '-2': { n: 'Grand et Saint Vendredi — Passion du Seigneur', r: 5, t: 'passion', id: 'gv', cs: 'Великій пятокъ' },
    '-1': { n: 'Grand et Saint Samedi — Descente aux enfers', r: 5, t: 'passion', id: 'gs', cs: 'Великая суббота' },
    '0': { n: 'SAINTE PÂQUE — Résurrection de notre Seigneur Jésus-Christ', r: 6, t: 'pascha', id: 'paques', cs: 'СВЯТАЯ ПАСХА' },
    '7': { n: 'Dimanche de Thomas — Antipâque', r: 4, t: 'pascal', id: 'thomas', cs: 'Недѣля Ѳомина' },
    '14': { n: 'Dimanche des saintes Femmes myrophores', r: 4, t: 'pascal', id: 'myrophores', cs: 'Недѣля святыхъ женъ мироносицъ' },
    '21': { n: 'Dimanche du Paralytique', r: 3, t: 'pascal', id: 'paralytique', cs: 'Недѣля о разслабленнѣмъ' },
    '25': { n: 'Mi-Pentecôte', r: 3, t: 'pascal', id: 'mi-pentecote', cs: 'Преполовеніе Пятидесятницы' },
    '28': { n: 'Dimanche de la Samaritaine', r: 3, t: 'pascal', id: 'samaritaine', cs: 'Недѣля о самарянынѣ' },
    '35': { n: 'Dimanche de l’Aveugle-né', r: 3, t: 'pascal', id: 'aveugle', cs: 'Недѣля о слѣпомъ' },
    '39': { n: 'Ascension de notre Seigneur', r: 5, t: 'seigneur', id: 'ascension', cs: 'Вознесеніе Господне' },
    '42': { n: 'Dimanche des 318 Pères du 1er Concile de Nicée', r: 3, t: 'pascal', id: 'nicee', cs: 'Недѣля святыхъ отецъ перваго Вселенскаго Собора' },
    '48': { n: 'Samedi des défunts (avant la Pentecôte)', r: 3, t: 'pascal', id: 'defunts-pentecote', cs: 'Суббота Троицкая родительская' },
    '49': { n: 'PENTECÔTE — Descente du Saint-Esprit', r: 5, t: 'seigneur', id: 'pentecote', cs: 'ДЕНЬ СВЯТЫЯ ТРОИЦЫ. Пятидесятница' },
    '50': { n: 'Lundi du Saint-Esprit', r: 4, t: 'seigneur', id: 'saint-esprit', cs: 'День Святаго Духа' },
    '56': { n: 'Dimanche de Tous les Saints', r: 3, t: 'saint', id: 'tous-saints', cs: 'Недѣля всѣхъ святыхъ' }
  };
  for (let i = 1; i <= 6; i++) {
    MOV[String(i)] = { n: brightDays[i - 1] + ' de la Semaine lumineuse', r: 4, t: 'pascal', id: 'lumineuse', cs: brightCs[i - 1] + ' Свѣтлыя седмицы' };
  }

  /* ---------- Tons de l'Octoèque (dimanches uniquement) ---------- */
  function toneForSunday(dt, rel) {
    if (rel >= 7 && rel <= 56) return Math.floor(rel / 7); // Thomas = 1 … Tous les saints = 8
    if (rel > 56) { const n = (rel - 49) / 7; return ((n - 2) % 8) + 1; }
    if (rel < -70) { // cycle de l'année précédente, avant le Triode
      const pp = pascha(dt.getUTCFullYear() - 1);
      const n = diff(dt, addDays(pp, 49)) / 7;
      if (n >= 2) return ((n - 2) % 8) + 1;
    }
    return null;
  }

  /* ---------- Jeûne ---------- */
  const LEVELS = [
    { n: 0, short: 'Gras', label: 'Pas de jeûne', desc: 'Tous les aliments sont permis.' },
    { n: 1, short: 'Maigre', label: 'Sans viande', desc: 'Pas de viande ; laitages, œufs et poisson permis.' },
    { n: 2, short: 'Poisson', label: 'Poisson, huile et vin', desc: 'Pas de viande, laitages ni œufs ; poisson, huile et vin permis.' },
    { n: 3, short: 'Huile', label: 'Huile et vin', desc: 'Pas de viande, laitages, œufs ni poisson ; huile et vin permis.' },
    { n: 4, short: 'Strict', label: 'Jeûne strict', desc: 'Xérophagie : nourriture végétale sans huile (le vin est toléré selon l’usage).' },
    { n: 5, short: 'Très strict', label: 'Jeûne très strict', desc: 'Jour de jeûne le plus rigoureux, parfois jusqu’à l’abstinence totale.' }
  ];

  function fastFor(c) {
    const { rel, wd, m, d } = c;
    const md = mdKey(m, d);
    const mk = (level, period, note) => ({ level, period, note: note || '', ...LEVELS[level] });
    const weekend = wd === 0 || wd === 6;

    // Jours sans jeûne
    if (rel >= 0 && rel <= 6) return mk(0, 'Semaine lumineuse', 'Toute la semaine est sans jeûne, même le mercredi et le vendredi.');
    if (rel >= 49 && rel <= 55) return mk(0, 'Semaine de la Pentecôte', 'Pas de jeûne cette semaine-là.');
    if (md >= '12-25' || md <= '01-04') return mk(0, 'Fêtes de Noël', 'De Noël à la veille de l’Épiphanie : pas de jeûne, même le mercredi et le vendredi.');
    if (rel >= -69 && rel <= -64) return mk(0, 'Semaine du Publicain', 'Le mercredi et le vendredi ne sont pas jeûnés.');

    // Semaine du fromage
    if (rel >= -55 && rel <= -49) return mk(1, 'Semaine du fromage', 'Plus de viande ; laitages, œufs et poisson permis, même le mercredi et le vendredi.');

    // Grand Carême et Semaine sainte
    if (rel >= -48 && rel <= -1) {
      if (rel === -48) return mk(5, 'Grand Carême', 'Lundi pur : jeûne le plus strict du début du Carême.');
      if (rel === -8) return mk(2, 'Grand Carême', 'Samedi de Lazare : le caviar est permis.');
      if (rel === -7) return mk(2, 'Grand Carême', 'Dimanche des Rameaux : poisson permis.');
      if (rel === -3) return mk(3, 'Semaine sainte', 'Grand Jeudi : huile et vin permis (jour de la Cène).');
      if (rel === -2) return mk(5, 'Semaine sainte', 'Grand Vendredi : jour de jeûne absolu, en mémoire de la Passion.');
      if (rel === -1) return mk(4, 'Semaine sainte', 'Grand Samedi : le vin est permis, mais pas l’huile.');
      if (md === '03-25') return mk(rel >= -6 ? 3 : 2, 'Grand Carême', 'Annonciation : poisson permis (huile et vin pendant la Semaine sainte).');
      if (md === '03-09' && !weekend) return mk(3, 'Grand Carême', 'Quarante martyrs de Sébaste : huile et vin permis.');
      if (rel >= -6) return mk(4, 'Semaine sainte', 'Jeûne strict de la Semaine sainte.');
      return weekend ? mk(3, 'Grand Carême', 'Samedis et dimanches : huile et vin permis.') : mk(4, 'Grand Carême', 'Jours de semaine du Carême : xérophagie.');
    }

    // Jours de jeûne strict fixes
    if (md === '01-05') return weekend ? mk(3, 'Veille de l’Épiphanie', 'Veille de la Théophanie.') : mk(4, 'Veille de l’Épiphanie', 'Jeûne strict de la veille de la Théophanie.');
    if (md === '08-29') return mk(weekend ? 3 : 4, 'Décollation de saint Jean-Baptiste', 'Jour de jeûne strict toute l’année, même hors saison de jeûne.');
    if (md === '09-14') return mk(weekend ? 3 : 4, 'Exaltation de la Croix', 'Jour de jeûne strict toute l’année, même hors saison de jeûne.');

    // Carême des Apôtres
    if (rel >= 57 && (m < 6 || (m === 6 && d <= 28))) {
      if (md === '06-24') return mk(2, 'Carême des Apôtres', 'Nativité de saint Jean-Baptiste : poisson permis.');
      if (wd === 1 || wd === 3 || wd === 5) return mk(4, 'Carême des Apôtres', 'Lundi, mercredi, vendredi : jeûne strict.');
      if (wd === 2 || wd === 4) return mk(3, 'Carême des Apôtres', 'Mardi et jeudi : huile et vin.');
      return mk(2, 'Carême des Apôtres', 'Samedi et dimanche : poisson permis.');
    }
    // Carême de la Dormition
    if (m === 8 && d <= 14) {
      if (md === '08-06') return mk(2, 'Carême de la Dormition', 'Transfiguration : poisson permis.');
      if (wd === 1 || wd === 3 || wd === 5) return mk(4, 'Carême de la Dormition', 'Lundi, mercredi, vendredi : jeûne strict.');
      return mk(3, 'Carême de la Dormition', 'Huile et vin permis ; pas de poisson.');
    }
    // Carême de la Nativité
    if ((m === 11 && d >= 15) || (m === 12 && d <= 24)) {
      if (md === '11-21') return mk(2, 'Carême de la Nativité', 'Entrée de la Mère de Dieu au Temple : poisson permis.');
      const late = m === 12 && d >= 20;
      if (md === '12-24') return mk(weekend ? 3 : 4, 'Carême de la Nativité', 'Veille de Noël : jeûne strict.');
      if (wd === 1 || wd === 3 || wd === 5) return mk(4, 'Carême de la Nativité', 'Lundi, mercredi, vendredi : jeûne strict.');
      if (wd === 2 || wd === 4) return mk(3, 'Carême de la Nativité', 'Mardi et jeudi : huile et vin.');
      return mk(late ? 3 : 2, 'Carême de la Nativité', late ? 'Du 20 au 24 décembre : plus de poisson.' : 'Samedi et dimanche : poisson permis.');
    }

    // Mercredis et vendredis ordinaires
    if (wd === 3 || wd === 5) {
      const fishFeast = c.feastRank >= 5;
      return fishFeast
        ? mk(2, 'Mercredi / vendredi', 'Grande fête : le poisson est permis.')
        : mk(3, wd === 3 ? 'Mercredi (trahison de Judas)' : 'Vendredi (Crucifixion)', 'Jour de jeûne hebdomadaire : ni viande, ni laitages, ni œufs, ni poisson.');
    }
    return mk(0, '', '');
  }

  /* ---------- Analyse complète d'un jour ---------- */
  const FIXED_FEASTS_INDEX = {};
  function buildIndex() {
    (O.FEASTS || []).forEach((f) => {
      if (f.md) (FIXED_FEASTS_INDEX[f.md] = FIXED_FEASTS_INDEX[f.md] || []).push(f);
    });
  }
  const FEASTS_BY_REL = {};
  function buildRelIndex() {
    (O.FEASTS || []).forEach((f) => { if (typeof f.rel === 'number') FEASTS_BY_REL[f.rel] = f; });
  }

  function parseSaint(s) {
    let rank = 1, t = s;
    if (t.startsWith('**')) { rank = 3; t = t.slice(2); } else if (t.startsWith('*')) { rank = 2; t = t.slice(1); }
    return { name: t, rank };
  }

  function dayInfo(dt, style) {
    if (!FIXED_FEASTS_INDEX._built) { buildIndex(); buildRelIndex(); FIXED_FEASTS_INDEX._built = true; }
    style = style || 'new';
    const y = dt.getUTCFullYear();
    const wd = dt.getUTCDay();
    const pas = pascha(y);
    const rel = diff(dt, pas);
    const nom = nominal(dt, style);
    const md = mdKey(nom.m, nom.d);

    const items = []; // {name, cs, rank, kind, ref}
    const mv = MOV[String(rel)];
    if (mv) items.push({ name: mv.n, cs: mv.cs, rank: mv.r, kind: mv.t, feastId: FEASTS_BY_REL[rel] ? FEASTS_BY_REL[rel].id : null, movable: true });

    // dimanches ordinaires
    let sundayName = null;
    if (wd === 0 && !mv) {
      if (md >= '12-26' && md <= '12-31') sundayName = 'Dimanche après la Nativité';
      else if (md >= '01-02' && md <= '01-05') sundayName = 'Dimanche avant l’Épiphanie';
      else if (md >= '01-07' && md <= '01-13') sundayName = 'Dimanche après l’Épiphanie';
      else if (md >= '12-11' && md <= '12-17') sundayName = 'Dimanche des saints Ancêtres du Christ';
      else if (md >= '12-18' && md <= '12-24') sundayName = 'Dimanche des saints Pères (avant la Nativité)';
      else if (rel > 56) sundayName = ORD((rel - 49) / 7) + ' dimanche après la Pentecôte';
      else if (rel < -77) {
        const n = diff(dt, addDays(pascha(y - 1), 49)) / 7;
        sundayName = ORD(n) + ' dimanche après la Pentecôte';
      }
      if (sundayName) items.push({ name: sundayName, rank: 3, kind: 'dimanche', sunday: true });
    }

    // fêtes fixes
    (FIXED_FEASTS_INDEX[md] || []).forEach((f) => {
      // l'Exaltation, etc. sont gardés ; la Nativité etc. aussi
      items.push({ name: f.name, cs: f.cs, rank: f.rank, kind: f.kind, feastId: f.id, fixed: true });
    });
    // fête du saint nom d'un lieu : saints du jour
    const saintsRaw = (O.SAINTS && O.SAINTS[md]) || [];
    const saints = saintsRaw.map(parseSaint);

    const feastRank = items.reduce((mx, it) => (it.kind !== 'dimanche' && it.rank > mx ? it.rank : mx), 0);
    const fast = fastFor({ rel, wd, m: nom.m, d: nom.d, feastRank });

    // titre principal
    const best = items.slice().sort((a, b) => b.rank - a.rank)[0];
    const topSaint = saints.slice().sort((a, b) => b.rank - a.rank)[0];
    let title = best ? best.name : topSaint ? topSaint.name : '';
    let rank = Math.max(best ? best.rank : 0, topSaint ? topSaint.rank : 0, wd === 0 ? 3 : 0, 1);
    const tone = wd === 0 ? toneForSunday(dt, rel) : null;

    const sr = O.SAINT_LIVES && O.SAINT_LIVES[md];
    return {
      date: dt, iso: isoKey(dt), wd, rel, year: y, pascha: pas, style,
      nominal: { m: nom.m, d: nom.d, md, date: nom.date },
      items, saints, fast, tone, rank, title,
      life: sr || null,
      season: seasonOf(rel, nom.m, nom.d)
    };
  }

  function seasonOf(rel, m, d) {
    const md = mdKey(m, d);
    if (rel >= -70 && rel < -48) return { id: 'triode', name: 'Triode préparatoire' };
    if (rel >= -48 && rel < -7) return { id: 'careme', name: 'Grand Carême' };
    if (rel >= -7 && rel < 0) return { id: 'passion', name: 'Semaine sainte' };
    if (rel >= 0 && rel <= 6) return { id: 'pascha', name: 'Semaine lumineuse' };
    if (rel >= 7 && rel < 49) return { id: 'pascal', name: 'Temps pascal' };
    if (rel >= 49 && rel <= 56) return { id: 'pentecote', name: 'Pentecôte' };
    if (md >= '12-25' || md <= '01-06') return { id: 'noel', name: 'Temps de Noël' };
    if ((m === 11 && d >= 15) || (m === 12 && d <= 24)) return { id: 'jeune-nativite', name: 'Carême de la Nativité' };
    if (m === 8 && d <= 14) return { id: 'jeune-dormition', name: 'Carême de la Dormition' };
    if (rel >= 57 && (m < 6 || (m === 6 && d <= 28))) return { id: 'jeune-apotres', name: 'Carême des Apôtres' };
    return { id: 'ordinaire', name: 'Temps ordinaire' };
  }

  /* Résumé d'un mois (pour la grille) */
  function monthGrid(y, m, style) {
    const first = utc(y, m, 1);
    const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const cells = [];
    const lead = (first.getUTCDay() + 6) % 7; // lundi = 0
    for (let i = 0; i < lead; i++) cells.push(null);
    for (let d = 1; d <= days; d++) cells.push(dayInfo(utc(y, m, d), style));
    return cells;
  }

  /* Jour de l'année (1..366) pour le verset quotidien */
  function dayOfYear(dt) {
    const y = dt.getUTCFullYear();
    const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    let n = diff(dt, utc(y, 1, 1)) + 1;
    // on aligne sur une année bissextile : à partir du 1er mars, saute la case 29 février
    if (!isLeap && dt.getUTCMonth() >= 2) n += 1;
    return n;
  }

  function longDate(dt) {
    return WD[dt.getUTCDay()] + ' ' + dt.getUTCDate() + (dt.getUTCDate() === 1 ? 'er ' : ' ') + MONTHS[dt.getUTCMonth()] + ' ' + dt.getUTCFullYear();
  }

  O.cal = {
    utc, addDays, diff, pad, mdKey, isoKey, fromIso, today, pascha, julianOffset, nominal, civilFromNominal,
    dayInfo, monthGrid, dayOfYear, longDate, LEVELS, WD, MONTHS, MOV, parseSaint, ORD
  };
})();
