/* Corrida do Curral — interface. Desenvolvido por Marco Nunes. */
(() => {
  // ---------- Textos (PT / EN / FR) ----------
  const ANIMAL_BASE = [ // índice = lugar (0 baixo, 1 esquerda, 2 cima, 3 direita)
    { em: '🐒', food: '🍌', color: 'var(--macaco)' },
    { em: '🐰', food: '🥕', color: 'var(--coelho)' },
    { em: '🐻', food: '🍯', color: 'var(--urso)' },
    { em: '🐭', food: '🧀', color: 'var(--rato)' },
  ];
  const I18N = {
    pt: {
      title: 'Corrida da Floresta',
      lead: 'Leve seu bicho até a comida do outro lado da floresta. Feche o caminho do adversário com troncos.',
      language: 'Idioma',
      animals: ['Macaco', 'Coelho', 'Urso', 'Rato'],
      goals: ['às bananas', 'às cenouras', 'ao mel', 'ao queijo'],
      introH: 'Como se joga', introGo: 'Entendi, vamos jogar',
      rules: [
        ['Objetivo', 'A clareira tem 9 × 9 casas. Os dois bichos começam frente a frente, no meio da sua borda. Ganha quem chegar primeiro a qualquer casa da borda oposta, onde está a sua comida: o macaco busca as bananas e o urso, o mel.'],
        ['Sua vez', 'Os dois jogam um de cada vez. Na sua vez, faça só uma coisa: andar com o seu bicho ou colocar um tronco.'],
        ['Andar', 'Uma casa por vez: para frente, para trás ou para os lados. Na diagonal, não.'],
        ['Pular', 'Se outro bicho estiver colado em você, dá para pular por cima dele e andar duas casas de uma vez.'],
        ['Diagonal', 'Se houver um tronco (ou a borda) logo atrás do bicho que você ia pular, você vai para uma das casas ao lado dele, na diagonal.'],
        ['Troncos', 'Cada tronco tem o tamanho de 2 casas e fica no sulco entre elas, deitado ou em pé. Não pode ficar em cima de outro, nem cruzar outro, e nunca sai do lugar. Cada bicho tem 10 troncos. Quando acabam, só dá para andar.'],
        ['Proibido trancar', 'Vale fazer labirintos, mas todo bicho precisa sempre ter um caminho até a comida e pelo menos uma casa para andar. O jogo não deixa colocar um tronco que tranque alguém.'],
      ],
      setupH: 'Quem vai correr?', count: 'Como vocês vão jogar?',
      modos: { pc: '🤖 Contra o computador', pessoa: '👥 Duas pessoas' },
      nivel: 'Nível do computador', voce: 'Você', pessoaN: (n) => `Pessoa ${n}`, computador: 'Computador',
      kinds: { human: 'Pessoa', easy: 'Computador (fácil)', hard: 'Computador (esperto)' },
      wants: (i) => `quer chegar ${I18N.pt.goals[i]}`,
      wallsHint: (n) => `Cada bicho começa com ${n} troncos.`,
      start: 'Começar a corrida', resume: 'Continuar partida salva', seeRules: 'Ver regras',
      yourTurn: 'Sua vez', aiThinking: 'Computador pensando…', stepsLeft: (n) => `faltam ${n} passos`,
      move: '🐾 Andar', wall: (n) => `🪵 Tronco (${n})`, steps: (n) => `${n} passos`,
      undo: '↶ Desfazer', showPath: 'Mostrar caminho', newGame: 'Nova partida', rulesLabel: 'Regras',
      rotate: '⟲ Girar', place: 'Colocar', cancel: 'Cancelar', pass: 'Passar a vez',
      wallHelp: 'Toque (ou passe o mouse) num sulco entre as casas.',
      checkFence: 'Confira o tronco. Use Girar para deitar ou pôr em pé.',
      placed: (a) => `${a} colocou um tronco.`, jumped: (a) => `${a} pulou!`, passed: (a) => `${a} passou a vez.`,
      tapMarked: 'Toque numa das casas marcadas para andar.', noDir: 'Tem tronco ou borda nessa direção.',
      undone: 'Jogada desfeita.', stuckTurn: 'Seu bicho está cercado e não tem para onde andar. Coloque um tronco ou passe a vez.',
      err: {
        none: 'Seus troncos acabaram. Agora só dá para andar.', outside: 'Esse lugar fica fora da floresta.',
        overlap: 'Esse tronco ficaria em cima de outro.', cross: 'Esse tronco cruzaria outro.',
        trap: 'Não pode trancar: todo bicho precisa de um caminho até a comida.',
        stuck: 'Não pode: um bicho ficaria sem nenhuma casa para andar.', badmove: 'Esse movimento não vale.', over: 'A partida acabou.',
      },
      win: (i) => `O ${I18N.pt.animals[i]} chegou ${I18N.pt.goals[i]}!`,
      winSub: (p, w) => `Vitória em ${p} jogadas, com ${w} troncos na floresta.`,
      again: 'Jogar de novo', change: 'Mudar o modo', credit: 'Desenvolvido por',
      keys: 'Teclado: setas andam, T tronco, A andar, R gira o tronco, Enter coloca.',
    },
    en: {
      title: 'Forest Race',
      lead: 'Take your animal to its food on the far side of the forest. Block your opponent with logs.',
      language: 'Language',
      animals: ['Monkey', 'Rabbit', 'Bear', 'Mouse'],
      goals: ['the bananas', 'the carrots', 'the honey', 'the cheese'],
      introH: 'How to play', introGo: 'Got it, let’s play',
      rules: [
        ['Goal', 'The clearing has 9 × 9 squares. The two animals start face to face, in the middle of their side. The first to reach any square on the opposite side, where its food is, wins: the monkey wants the bananas and the bear wants the honey.'],
        ['Your turn', 'Players take turns. On your turn, do just one thing: move your animal or place a log.'],
        ['Moving', 'One square at a time: forward, back or sideways. Never diagonally.'],
        ['Jumping', 'If another animal is right next to you, you can jump over it and move two squares at once.'],
        ['Diagonal', 'If there is a log (or the edge) right behind the animal you would jump, you move to one of the squares beside it, diagonally.'],
        ['Logs', 'Each log is 2 squares long and sits in the groove between squares, lying down or standing up. It can’t sit on top of another or cross one, and it never moves. Each animal has 10 logs. When they run out, you can only move.'],
        ['No trapping', 'Mazes are fine, but every animal must always have a way to its food and at least one square to move to. The game won’t let you place a log that traps anyone.'],
      ],
      setupH: 'Who is racing?', count: 'How do you want to play?',
      modos: { pc: '🤖 Against the computer', pessoa: '👥 Two players' },
      nivel: 'Computer level', voce: 'You', pessoaN: (n) => `Player ${n}`, computador: 'Computer',
      kinds: { human: 'Person', easy: 'Computer (easy)', hard: 'Computer (clever)' },
      wants: (i) => `wants to reach ${I18N.en.goals[i]}`,
      wallsHint: (n) => `Each animal starts with ${n} logs.`,
      start: 'Start the race', resume: 'Continue saved game', seeRules: 'See rules',
      yourTurn: 'Your turn', aiThinking: 'Computer is thinking…', stepsLeft: (n) => `${n} steps to go`,
      move: '🐾 Move', wall: (n) => `🪵 Log (${n})`, steps: (n) => `${n} steps`,
      undo: '↶ Undo', showPath: 'Show path', newGame: 'New game', rulesLabel: 'Rules',
      rotate: '⟲ Rotate', place: 'Place', cancel: 'Cancel', pass: 'Skip turn',
      wallHelp: 'Tap (or hover) a groove between squares.',
      checkFence: 'Check the log. Use Rotate to turn it.',
      placed: (a) => `${a} placed a log.`, jumped: (a) => `${a} jumped!`, passed: (a) => `${a} skipped a turn.`,
      tapMarked: 'Tap one of the marked squares to move.', noDir: 'There is a log or the edge that way.',
      undone: 'Move undone.', stuckTurn: 'Your animal is boxed in and can’t move. Place a log or skip your turn.',
      err: {
        none: 'You’re out of logs. You can only move now.', outside: 'That spot is outside the forest.',
        overlap: 'That log would sit on top of another.', cross: 'That log would cross another.',
        trap: 'No trapping: every animal needs a way to its food.',
        stuck: 'Not allowed: an animal would have no square to move to.', badmove: 'That move isn’t allowed.', over: 'The game is over.',
      },
      win: (i) => `The ${I18N.en.animals[i]} reached ${I18N.en.goals[i]}!`,
      winSub: (p, w) => `Won in ${p} turns, with ${w} logs in the forest.`,
      again: 'Play again', change: 'Change mode', credit: 'Developed by',
      keys: 'Keyboard: arrows move, T log, A move, R rotates the log, Enter places it.',
    },
    fr: {
      title: 'Course en Forêt',
      lead: 'Mène ton animal jusqu’à sa nourriture de l’autre côté de la forêt. Bloque ton adversaire avec des troncs.',
      language: 'Langue',
      animals: ['Singe', 'Lapin', 'Ours', 'Souris'],
      animalsArt: ['Le Singe', 'Le Lapin', 'L’Ours', 'La Souris'],
      goals: ['aux bananes', 'aux carottes', 'au miel', 'au fromage'],
      introH: 'Comment jouer', introGo: 'Compris, on joue',
      rules: [
        ['But du jeu', 'La clairière a 9 × 9 cases. Les deux animaux partent face à face, au milieu de leur côté. Le premier qui atteint une case du côté opposé, là où se trouve sa nourriture, gagne : le singe veut les bananes et l’ours veut le miel.'],
        ['Ton tour', 'On joue chacun son tour. À ton tour, fais une seule chose : déplacer ton animal ou poser un tronc.'],
        ['Se déplacer', 'Une case à la fois : en avant, en arrière ou sur les côtés. Jamais en diagonale.'],
        ['Sauter', 'Si un autre animal est juste à côté de toi, tu peux sauter par-dessus et avancer de deux cases d’un coup.'],
        ['Diagonale', 'S’il y a un tronc (ou le bord) juste derrière l’animal que tu voulais sauter, tu vas sur une des cases à côté de lui, en diagonale.'],
        ['Troncs', 'Chaque tronc mesure 2 cases et se place dans la rainure entre les cases, couché ou debout. Il ne peut ni chevaucher ni croiser un autre tronc, et ne bouge plus jamais. Chaque animal a 10 troncs. Quand il n’y en a plus, on ne peut que se déplacer.'],
        ['Interdit d’enfermer', 'Les labyrinthes sont permis, mais chaque animal doit toujours avoir un chemin vers sa nourriture et au moins une case où aller. Le jeu refuse tout tronc qui enfermerait quelqu’un.'],
      ],
      setupH: 'Qui fait la course ?', count: 'Comment voulez-vous jouer ?',
      modos: { pc: '🤖 Contre l’ordinateur', pessoa: '👥 Deux joueurs' },
      nivel: 'Niveau de l’ordinateur', voce: 'Toi', pessoaN: (n) => `Joueur ${n}`, computador: 'Ordinateur',
      kinds: { human: 'Personne', easy: 'Ordinateur (facile)', hard: 'Ordinateur (malin)' },
      wants: (i) => `veut aller ${I18N.fr.goals[i]}`,
      wallsHint: (n) => `Chaque animal commence avec ${n} troncs.`,
      start: 'Lancer la course', resume: 'Reprendre la partie', seeRules: 'Voir les règles',
      yourTurn: 'À toi', aiThinking: 'L’ordinateur réfléchit…', stepsLeft: (n) => `encore ${n} pas`,
      move: '🐾 Avancer', wall: (n) => `🪵 Tronc (${n})`, steps: (n) => `${n} pas`,
      undo: '↶ Annuler', showPath: 'Voir le chemin', newGame: 'Nouvelle partie', rulesLabel: 'Règles',
      rotate: '⟲ Tourner', place: 'Poser', cancel: 'Annuler', pass: 'Passer son tour',
      wallHelp: 'Touche (ou survole) une rainure entre les cases.',
      checkFence: 'Vérifie le tronc. Utilise Tourner pour le coucher ou le redresser.',
      placed: (a) => `${a} a posé un tronc.`, jumped: (a) => `${a} a sauté !`, passed: (a) => `${a} passe son tour.`,
      tapMarked: 'Touche une des cases marquées pour avancer.', noDir: 'Il y a un tronc ou le bord de ce côté.',
      undone: 'Coup annulé.', stuckTurn: 'Ton animal est coincé et ne peut pas bouger. Pose un tronc ou passe ton tour.',
      err: {
        none: 'Tu n’as plus de troncs. Tu ne peux que te déplacer.', outside: 'Cet endroit est hors de la forêt.',
        overlap: 'Ce tronc chevaucherait un autre.', cross: 'Ce tronc en croiserait un autre.',
        trap: 'Interdit d’enfermer : chaque animal doit avoir un chemin vers sa nourriture.',
        stuck: 'Interdit : un animal n’aurait plus aucune case où aller.', badmove: 'Ce coup n’est pas permis.', over: 'La partie est terminée.',
      },
      win: (i) => `${I18N.fr.animalsArt[i]} est arrivé ${I18N.fr.goals[i]} !`,
      winSub: (p, w) => `Victoire en ${p} coups, avec ${w} troncs dans la forêt.`,
      again: 'Rejouer', change: 'Changer de mode', credit: 'Développé par',
      keys: 'Clavier : flèches pour avancer, T tronc, A avancer, R tourne le tronc, Entrée le pose.',
    },
  };

  // ---------- Desenhos dos bichos (SVG próprio, 100×100) ----------
  const EYES = (y, dx = 14) => `<circle cx="${50 - dx}" cy="${y}" r="6.5" fill="#1d1d1b"/><circle cx="${50 + dx}" cy="${y}" r="6.5" fill="#1d1d1b"/><circle cx="${52 - dx}" cy="${y - 2.5}" r="2.2" fill="#fff"/><circle cx="${52 + dx}" cy="${y - 2.5}" r="2.2" fill="#fff"/>`;
  const CHEEKS = (y) => `<circle cx="25" cy="${y}" r="5" fill="#ff7aa2" opacity=".55"/><circle cx="75" cy="${y}" r="5" fill="#ff7aa2" opacity=".55"/>`;
  const FACES = [
    // Macaco
    `<circle cx="16" cy="50" r="14" fill="#7a4413"/><circle cx="16" cy="50" r="8" fill="#ffd29a"/><circle cx="84" cy="50" r="14" fill="#7a4413"/><circle cx="84" cy="50" r="8" fill="#ffd29a"/>
     <circle cx="50" cy="52" r="36" fill="#8f5418"/><path d="M50 24c-14 0-24 8-24 20 0 4 2 7 5 9-3 3-5 7-5 11 0 11 11 18 24 18s24-7 24-18c0-4-2-8-5-11 3-2 5-5 5-9 0-12-10-20-24-20z" fill="#ffd29a"/>
     <path d="M42 16q8-12 16 0" fill="none" stroke="#8f5418" stroke-width="6" stroke-linecap="round"/>${EYES(44, 11)}
     <ellipse cx="46" cy="62" rx="2" ry="1.6" fill="#5a2e08"/><ellipse cx="54" cy="62" rx="2" ry="1.6" fill="#5a2e08"/><path d="M40 70q10 9 20 0" fill="none" stroke="#5a2e08" stroke-width="3" stroke-linecap="round"/>`,
    // Coelho
    `<ellipse cx="34" cy="22" rx="10" ry="24" fill="#f4f4f0" stroke="#d9d9d2" stroke-width="2" transform="rotate(-12 34 22)"/><ellipse cx="34" cy="24" rx="5" ry="16" fill="#ff9ec0" transform="rotate(-12 34 24)"/>
     <ellipse cx="66" cy="22" rx="10" ry="24" fill="#f4f4f0" stroke="#d9d9d2" stroke-width="2" transform="rotate(12 66 22)"/><ellipse cx="66" cy="24" rx="5" ry="16" fill="#ff9ec0" transform="rotate(12 66 24)"/>
     <circle cx="50" cy="60" r="32" fill="#fbfbf7" stroke="#d9d9d2" stroke-width="2"/>${EYES(55, 13)}${CHEEKS(67)}
     <path d="M46 66h8l-4 5z" fill="#ff5f8f"/><path d="M50 71v4M50 75q-5 4-9 1M50 75q5 4 9 1" fill="none" stroke="#7d6a6a" stroke-width="2" stroke-linecap="round"/>
     <path d="M30 68h-14M30 72l-13 4M70 68h14M70 72l13 4" stroke="#9a8f8f" stroke-width="1.5" stroke-linecap="round"/>`,
    // Urso
    `<circle cx="24" cy="26" r="14" fill="#9c5a24"/><circle cx="24" cy="26" r="7" fill="#e9b07a"/><circle cx="76" cy="26" r="14" fill="#9c5a24"/><circle cx="76" cy="26" r="7" fill="#e9b07a"/>
     <circle cx="50" cy="55" r="36" fill="#a8622a"/>${EYES(48, 15)}<ellipse cx="50" cy="66" rx="17" ry="13" fill="#f0c48f"/>
     <ellipse cx="50" cy="61" rx="7" ry="5" fill="#2a1a0e"/><path d="M50 66v4M43 72q7 6 14 0" fill="none" stroke="#2a1a0e" stroke-width="3" stroke-linecap="round"/>`,
    // Rato
    `<circle cx="20" cy="30" r="19" fill="#9aa3ad"/><circle cx="20" cy="30" r="12" fill="#ffb3cc"/><circle cx="80" cy="30" r="19" fill="#9aa3ad"/><circle cx="80" cy="30" r="12" fill="#ffb3cc"/>
     <path d="M50 30c-20 0-32 14-32 30 0 12 14 24 32 26 18-2 32-14 32-26 0-16-12-30-32-30z" fill="#b6bec7"/>${EYES(54, 12)}${CHEEKS(66)}
     <circle cx="50" cy="72" r="5" fill="#ff5f8f"/><path d="M38 70h-18M38 74l-17 5M62 70h18M62 74l17 5" stroke="#5f6670" stroke-width="1.5" stroke-linecap="round"/>`,
  ];
  const face = (seat, extra = '') => `<svg viewBox="0 0 100 100" ${extra} aria-hidden="true">${FACES[seat]}</svg>`;

  const $ = (id) => document.getElementById(id);
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem('curral2:' + k)); } catch { return null; } },
    set(k, v) { try { localStorage.setItem('curral2:' + k, JSON.stringify(v)); } catch {} },
    del(k) { try { localStorage.removeItem('curral2:' + k); } catch {} },
  };
  const navLang = (navigator.language || 'pt').slice(0, 2);
  let lang = store.get('lang') || (I18N[navLang] ? navLang : 'pt');
  const T = () => I18N[lang];
  const aName = (seat) => T().animals[seat];

  // Só 2 jogadores: o macaco (embaixo) contra o urso (em cima), frente a frente.
  // modo 'pc': você é o macaco e o computador é o urso; modo 'pessoa': duas pessoas.
  const SEATS = [0, 2];
  let cfg = store.get('cfg2') || { modo: 'pc', nivel: 'hard' };
  const kindOf = (seat) => (seat === 0 || cfg.modo === 'pessoa' ? 'human' : cfg.nivel);
  let state = null, history = [], mode = 'move', ghostKey = null, showPath = false, aiTimer = null, touchMode = false;
  let lastMsg = null; // {key, arg, err}
  let animatedPly = -1;

  // ---------- Desenhos das regras (SVG) ----------
  function mini(n, spec) {
    const S = 36, C = 30, W = n * S - (S - C);
    let s = `<svg viewBox="-4 -4 ${W + 8} ${W + 8}" role="img" aria-hidden="true"><rect x="-4" y="-4" width="${W + 8}" height="${W + 8}" rx="8" fill="#1e5a2c"/>`;
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      const goal = spec.goalRow === r;
      s += `<rect x="${c * S}" y="${r * S}" width="${C}" height="${C}" rx="6" fill="${goal ? '#ffe45c' : '#6fc24a'}"/>`;
      if (goal && spec.food) s += `<text x="${c * S + 15}" y="${r * S + 21}" font-size="16" text-anchor="middle">${spec.food}</text>`;
    }
    for (const [r, c] of spec.dots || []) s += `<circle cx="${c * S + 15}" cy="${r * S + 15}" r="7" fill="#ffd400" stroke="#1e5a2c" stroke-width="2"/>`;
    for (const [r, c] of spec.no || []) s += `<text x="${c * S + 15}" y="${r * S + 21}" font-size="16" text-anchor="middle" fill="#b8322a" font-weight="900">✕</text>`;
    for (const f of spec.fences || []) {
      const r = +f.k[1], c = +f.k[3], H = f.k[0] === 'H';
      const x = H ? c * S : c * S + C, y = H ? r * S + C : r * S, w = H ? 2 * C + 6 : 6, h = H ? 6 : 2 * C + 6;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${f.bad ? '#e0362c' : '#a0612b'}" stroke="${f.bad ? '#6d1712' : '#5a3214'}" stroke-width="1.5"/>`;
      if (f.bad) s += `<circle cx="${x + w / 2}" cy="${y + h / 2}" r="9" fill="#fff" stroke="#b8322a" stroke-width="2"/><text x="${x + w / 2}" y="${y + h / 2 + 5}" font-size="13" text-anchor="middle" fill="#b8322a" font-weight="900">✕</text>`;
    }
    for (const [r, c, seat] of spec.pieces || []) s += `<circle cx="${c * S + 15}" cy="${r * S + 15}" r="15" fill="#fff" stroke="${['#ffc400', '#ff7f11', '#e8384f', '#1fa3e0'][seat]}" stroke-width="3"/><svg x="${c * S + 2}" y="${r * S + 2}" width="26" height="26" viewBox="0 0 100 100">${FACES[seat]}</svg>`;
    return s + '</svg>';
  }
  const FIGS = [
    mini(5, { goalRow: 0, food: '🍌', pieces: [[4, 2, 0]], dots: [[3, 2], [2, 2], [1, 2]] }),
    mini(3, { pieces: [[0, 0, 0], [2, 2, 2]], fences: [{ k: 'H0,1' }] }),
    mini(3, { pieces: [[1, 1, 0]], dots: [[0, 1], [2, 1], [1, 0], [1, 2]], no: [[0, 0], [0, 2], [2, 0], [2, 2]] }),
    mini(4, { pieces: [[3, 1, 0], [2, 1, 2]], dots: [[1, 1]] }),
    mini(4, { pieces: [[3, 1, 0], [2, 1, 2]], fences: [{ k: 'H1,1' }], dots: [[2, 0], [2, 2]] }),
    mini(4, { pieces: [[3, 1, 0]], fences: [{ k: 'H0,0' }, { k: 'V1,2' }] }),
    mini(4, { pieces: [[3, 0, 0]], fences: [{ k: 'H2,0' }, { k: 'V2,1', bad: true }] }),
  ];

  // ---------- Idioma ----------
  function applyLang() {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
    document.title = T().title;
    $('langSel').value = lang;
    document.querySelectorAll('[data-t]').forEach((el) => { el.textContent = T()[el.dataset.t]; });
    $('rulesList').innerHTML = T().rules.map(([h, p], i) =>
      `<li class="rule${i === 6 ? ' gold' : ''}">${FIGS[i]}<div><h3><span class="n">${i + 1}</span>${h}</h3><p>${p}</p></div></li>`).join('');
    $('rulesShort').innerHTML = T().rules.map(([h, p]) => `<li><b>${h}.</b> ${p}</li>`).join('');
    document.querySelectorAll('#count button').forEach((b) => { b.textContent = T().modos[b.dataset.modo]; });
    $('count').setAttribute('aria-label', T().count);
    renderSetup();
    if (state && !$('game').hidden) { render(); if (lastMsg) setMsg(lastMsg.key, lastMsg.arg, lastMsg.err); }
    if (state && state.winner !== -1 && !$('over').hidden) fillWin();
  }
  $('langSel').onchange = () => { lang = $('langSel').value; store.set('lang', lang); applyLang(); };

  // ---------- Telas ----------
  function show(which) {
    for (const id of ['intro', 'setup', 'game']) $(id).hidden = id !== which;
    window.scrollTo(0, 0);
  }
  $('introGo').onclick = $('skip').onclick = () => show('setup');
  $('seeRules').onclick = () => show('intro');

  function renderSetup() {
    document.querySelectorAll('#count button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.modo === cfg.modo)));
    $('seats').innerHTML = '';
    for (const seat of SEATS) {
      const a = ANIMAL_BASE[seat];
      const row = document.createElement('div');
      row.className = 'seat'; row.style.setProperty('--c', a.color);
      row.innerHTML = `<span class="em">${face(seat)}</span><div><b>${aName(seat)}</b><small>${T().wants(seat)} ${a.food}</small></div>`;
      if (seat === 2 && cfg.modo === 'pc') {
        // o urso é o computador: escolhe o nível
        const sel = document.createElement('select');
        sel.id = 'nivel'; sel.setAttribute('aria-label', T().nivel);
        for (const v of ['easy', 'hard']) sel.add(new Option(T().kinds[v], v, false, cfg.nivel === v));
        sel.onchange = () => { cfg.nivel = sel.value; store.set('cfg2', cfg); };
        row.append(sel);
      } else {
        const quem = document.createElement('span');
        quem.className = 'quem';
        quem.textContent = cfg.modo === 'pc' ? T().voce : T().pessoaN(seat === 0 ? 1 : 2);
        row.append(quem);
      }
      $('seats').append(row);
    }
    $('wallsHint').textContent = T().wallsHint(10);
    // partidas salvas da versão antiga (3 ou 4 bichos) não podem ser continuadas
    const saved = store.get('game');
    $('resume').hidden = !(saved && saved.state && saved.state.winner === -1 && saved.state.players.length === 2);
  }
  $('count').onclick = (e) => {
    const b = e.target.closest('button'); if (!b) return;
    cfg.modo = b.dataset.modo; store.set('cfg2', cfg); renderSetup();
  };
  $('start').onclick = () => startGame();
  $('resume').onclick = () => { const s = store.get('game'); if (s) { state = s.state; history = s.history || []; showGame(); } };

  function startGame() {
    state = Q.newGame(SEATS.map((seat) => ({ seat, kind: kindOf(seat) })));
    history = []; lastMsg = null; showGame();
  }
  function showGame() {
    show('game'); $('over').hidden = true;
    mode = 'move'; ghostKey = null; touchMode = false; setMsg(null); buildBoard(); render(); save(); maybeAI();
  }
  function toSetup() { clearTimeout(aiTimer); $('over').hidden = true; clearRain(); show('setup'); renderSetup(); }
  $('newGame').onclick = toSetup; $('toSetup').onclick = toSetup;
  $('again').onclick = () => { clearRain(); startGame(); };
  function save() { if (state) store.set('game', { state, history: history.slice(-60) }); }

  // ---------- Tabuleiro ----------
  const board = $('board');
  let cells = [];
  const STRIP_FOR = { 0: 's-top', 1: 's-rig', 2: 's-bot', 3: 's-lef' }; // onde fica a comida de cada lugar
  const STRIP_VAR = { 's-top': '--tt', 's-rig': '--tr', 's-bot': '--tb', 's-lef': '--tl' };
  function buildBoard() {
    board.innerHTML = ''; cells = [];
    for (let r = 0; r < Q.N; r++) for (let c = 0; c < Q.N; c++) {
      const d = document.createElement('div');
      d.className = 'cell'; d.style.setProperty('--x', c); d.style.setProperty('--y', r);
      d.dataset.r = r; d.dataset.c = c;
      board.append(d); cells.push(d);
    }
    const field = $('field');
    for (const id of Object.values(STRIP_FOR)) { $(id).classList.remove('on'); $(id).innerHTML = ''; field.style.removeProperty(STRIP_VAR[id]); }
    for (const p of state.players) {
      const a = ANIMAL_BASE[p.seat], id = STRIP_FOR[p.seat], el = $(id);
      el.classList.add('on'); el.style.setProperty('--c', a.color);
      el.innerHTML = Array(5).fill(`<span aria-hidden="true">${a.food}</span>`).join('');
      field.style.setProperty(STRIP_VAR[id], 'var(--th)');
    }
  }
  const cell = (r, c) => cells[r * Q.N + c];
  const isHumanTurn = () => state && state.winner === -1 && state.players[state.turn].kind === 'human';

  function render() {
    board.querySelectorAll('.fence,.pawn').forEach((e) => e.remove());
    const p = state.players[state.turn], a = ANIMAL_BASE[p.seat], t = T();
    const human = isHumanTurn();
    cells.forEach((d) => {
      d.className = 'cell'; d.textContent = '';
      const r = +d.dataset.r, c = +d.dataset.c;
      if (state.winner === -1 && Q.atGoal(p, r, c)) {
        d.classList.add('goal'); d.style.setProperty('--gc', a.color);
        d.innerHTML = `<span class="prize" aria-hidden="true">${a.food}</span>`;
      }
    });
    const moves = state.winner === -1 ? Q.legalMoves(state, state.turn) : [];
    if (human && mode === 'move') {
      for (const m of moves) { const d = cell(m.r, m.c); d.classList.add('can'); d.style.setProperty('--mc', a.color); }
    }
    if (showPath && state.winner === -1) {
      (Q.shortestPath(state, state.turn) || []).slice(1).forEach(([r, c]) => { const d = cell(r, c); d.classList.add('path'); d.style.setProperty('--pc', a.color); });
    }
    for (const [k, owner] of Object.entries(state.walls)) board.append(fenceEl(k, owner));
    if (ghostKey) {
      const f = fenceEl(ghostKey, state.turn);
      f.classList.add('ghost', Q.wallProblem(state, state.turn, ghostKey) ? 'bad' : 'good');
      board.append(f);
    }
    state.players.forEach((pl, i) => {
      const d = document.createElement('div');
      d.className = 'pawn' + (i === state.turn && state.winner === -1 ? ' now' : '');
      d.style.setProperty('--x', pl.c); d.style.setProperty('--y', pl.r); d.style.setProperty('--c', ANIMAL_BASE[pl.seat].color);
      d.innerHTML = `<span role="img" aria-label="${aName(pl.seat)}">${face(pl.seat)}</span>`;
      board.append(d);
    });
    board.setAttribute('aria-label', `${t.title} 9×9`);

    $('turn').style.setProperty('--c', a.color);
    $('turn').innerHTML = `<span class="em">${face(p.seat)}</span><div><b>${aName(p.seat)}</b><small>${p.kind === 'human' ? t.yourTurn : t.aiThinking} · ${t.stepsLeft(Q.distance(state, state.turn))}</small></div>`;
    $('m-move').textContent = t.move;
    $('m-wall').textContent = t.wall(p.wallsLeft);
    $('m-move').setAttribute('aria-pressed', String(mode === 'move'));
    $('m-wall').setAttribute('aria-pressed', String(mode === 'wall'));
    $('m-move').disabled = !human;
    $('m-wall').disabled = !human || p.wallsLeft === 0;
    $('who').innerHTML = state.players.map((pl, i) => {
      const an = ANIMAL_BASE[pl.seat];
      return `<li class="${i === state.turn ? 'now' : ''}" style="--c:${an.color}"><span class="em">${face(pl.seat)}</span><span>${aName(pl.seat)}<br><small>${t.kinds[pl.kind]}</small></span><span class="st">${t.steps(Q.distance(state, i))}<br>${pl.wallsLeft} 🪵</span></li>`;
    }).join('');
    $('undo').disabled = !history.some((h) => h.players[h.turn].kind === 'human');
    $('showPath').setAttribute('aria-pressed', String(showPath));
    $('confirm').hidden = !(ghostKey && touchMode && mode === 'wall' && human);
    $('passBox').hidden = !(human && moves.length === 0);
    if (human && moves.length === 0 && !lastMsg) setMsg('stuckTurn', null, true);
  }

  function fenceEl(key, owner) {
    const f = document.createElement('div');
    f.className = 'fence ' + key[0]; f.style.setProperty('--y', key[1]); f.style.setProperty('--x', key[3]);
    f.style.setProperty('--oc', ANIMAL_BASE[state.players[owner].seat].color);
    if (state.last && state.last.type === 'wall' && state.last.key === key) {
      f.classList.add('lastf');
      if (state.ply !== animatedPly) { f.classList.add('new'); animatedPly = state.ply; } // anima só o tronco recém-colocado, uma vez
    }
    f.innerHTML = '<i></i>';
    return f;
  }

  // mensagens guardadas como chave, para trocar de idioma sem perder
  function setMsg(key, arg, err) {
    lastMsg = key ? { key, arg, err } : null;
    const t = T();
    let text = '';
    if (key) {
      const v = key.startsWith('err.') ? t.err[key.slice(4)] : t[key];
      text = typeof v === 'function' ? v(arg) : (v || '');
    }
    $('msg').textContent = text; $('msg').className = 'msg' + (err ? ' err' : '');
  }

  // ---------- Ações ----------
  function act(action) {
    try {
      const prev = state;
      state = Q.apply(state, action);
      history.push(prev);
    } catch (e) { setMsg('err.' + e.message, null, true); return false; }
    ghostKey = null; touchMode = false; mode = 'move';
    const l = state.last, an = aName(state.players[l.pi].seat);
    if (l.type === 'wall') setMsg('placed', an);
    else if (l.type === 'pass') setMsg('passed', an);
    else if (l.jump) setMsg('jumped', an);
    else setMsg(null);
    render(); save();
    if (state.winner !== -1) { finish(); return true; }
    maybeAI();
    return true;
  }
  function fillWin() {
    const seat = state.players[state.winner].seat, a = ANIMAL_BASE[seat];
    $('over-em').innerHTML = `${face(seat)}<span>${a.food}</span>`;
    $('over-t').textContent = T().win(seat);
    $('over-p').textContent = T().winSub(state.ply, Object.keys(state.walls).length);
  }
  function finish() {
    fillWin();
    $('over').hidden = false; $('again').focus();
    const food = ANIMAL_BASE[state.players[state.winner].seat].food;
    for (let i = 0; i < 26; i++) {
      const s = document.createElement('span');
      s.className = 'rain'; s.textContent = food;
      s.style.left = Math.random() * 100 + 'vw';
      s.style.animationDuration = 2.2 + Math.random() * 2.5 + 's';
      s.style.animationDelay = Math.random() * 1.5 + 's';
      s.style.fontSize = 24 + Math.random() * 30 + 'px';
      $('over').append(s);
    }
    store.del('game');
  }
  function clearRain() { document.querySelectorAll('.rain').forEach((e) => e.remove()); }
  function maybeAI() {
    clearTimeout(aiTimer);
    if (!state || state.winner !== -1) return;
    const p = state.players[state.turn];
    if (p.kind === 'human') return;
    aiTimer = setTimeout(() => {
      const a = Q.aiChoose(state, p.kind === 'easy' ? 'easy' : 'hard');
      act(a);
    }, 650);
  }

  // ---------- Toque / mouse ----------
  function pt(e) {
    const rect = board.getBoundingClientRect();
    const pitch = rect.width / 10.92 * 1.24;
    return { u: (e.clientX - rect.left) / pitch, v: (e.clientY - rect.top) / pitch };
  }
  // cerca de 2 casas centrada no cruzamento de sulcos mais próximo
  function nearestWall(e) {
    const { u, v } = pt(e);
    const cf = 1 / 1.24, g = 1 - cf;
    if (u < -0.3 || v < -0.3 || u > Q.N + 0.3 || v > Q.N + 0.3) return null;
    const clamp = (x) => Math.max(0, Math.min(Q.N - 2, x));
    const kx = clamp(Math.round(u - cf - g / 2)), dx = Math.abs(u - (kx + cf + g / 2));
    const ky = clamp(Math.round(v - cf - g / 2)), dy = Math.abs(v - (ky + cf + g / 2));
    return (dx <= dy ? 'V' : 'H') + `${ky},${kx}`;
  }
  let lastTouch = 0; // celulares geram eventos de "mouse" falsos logo depois do toque
  const realMouse = (e) => e.pointerType === 'mouse' && !touchMode && Date.now() - lastTouch > 1200;
  board.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') lastTouch = Date.now(); });
  board.addEventListener('pointermove', (e) => {
    if (!realMouse(e) || mode !== 'wall' || !isHumanTurn()) return;
    const k = nearestWall(e);
    if (k !== ghostKey) { ghostKey = k; touchMode = false; render(); }
  });
  board.addEventListener('pointerleave', (e) => {
    if (realMouse(e) && mode === 'wall' && ghostKey) { ghostKey = null; render(); }
  });
  board.addEventListener('pointerup', (e) => {
    if (!isHumanTurn()) return;
    if (mode === 'move') {
      const { u, v } = pt(e);
      // casa mais próxima do toque (tolerante a toques no sulco)
      const r = Math.max(0, Math.min(Q.N - 1, Math.floor(v + 0.1))), c = Math.max(0, Math.min(Q.N - 1, Math.floor(u + 0.1)));
      const moves = Q.legalMoves(state, state.turn);
      let m = moves.find((x) => x.r === r && x.c === c);
      if (!m) { // escolhe a casa marcada mais perto do dedo, se estiver bem perto
        let best = null, bd = 0.75;
        for (const x of moves) { const d = Math.hypot(x.c + 0.4 - u, x.r + 0.4 - v); if (d < bd) { bd = d; best = x; } }
        m = best;
      }
      if (m) act({ type: 'move', r: m.r, c: m.c }); else setMsg('tapMarked');
      return;
    }
    const k = nearestWall(e);
    if (!k) return;
    if (e.pointerType === 'mouse' && Date.now() - lastTouch > 1200) { tryWall(k); return; }
    // toque: primeiro mostra a prévia; tocar de novo no mesmo lugar ou em "Colocar" confirma
    if (touchMode && ghostKey === k) { tryWall(k); return; }
    previewTouch(k);
  });
  function previewTouch(k) {
    touchMode = true; ghostKey = k;
    const why = Q.wallProblem(state, state.turn, k);
    if (why) setMsg('err.' + why, null, true); else setMsg('checkFence');
    render();
  }
  function tryWall(k) {
    const why = Q.wallProblem(state, state.turn, k);
    if (why) { setMsg('err.' + why, null, true); return; }
    act({ type: 'wall', key: k });
  }
  const rotate = () => { if (ghostKey) previewTouch((ghostKey[0] === 'H' ? 'V' : 'H') + ghostKey.slice(1)); };
  $('c-rot').onclick = rotate;
  $('c-yes').onclick = () => ghostKey && tryWall(ghostKey);
  $('c-no').onclick = () => { ghostKey = null; touchMode = false; setMsg('wallHelp'); render(); };
  $('pass').onclick = () => act({ type: 'pass' });
  function setMode(m) {
    if (!isHumanTurn()) return;
    if (m === 'wall' && state.players[state.turn].wallsLeft === 0) { setMsg('err.none', null, true); return; }
    mode = m; ghostKey = null; touchMode = false;
    setMsg(m === 'wall' ? 'wallHelp' : null);
    render();
  }
  $('m-move').onclick = () => setMode('move');
  $('m-wall').onclick = () => setMode('wall');
  $('showPath').onclick = () => { showPath = !showPath; render(); };
  $('undo').onclick = () => {
    clearTimeout(aiTimer);
    while (history.length) {
      state = history.pop();
      if (state.players[state.turn].kind === 'human') break;
    }
    ghostKey = null; touchMode = false; mode = 'move'; setMsg('undone'); render(); save(); maybeAI();
  };
  document.addEventListener('keydown', (e) => {
    if ($('game').hidden || !isHumanTurn() || e.target.closest('select,input')) return;
    const k = e.key.toLowerCase();
    if (k === 't' || k === 'c') return setMode('wall');
    if (k === 'a') return setMode('move');
    if (k === 'r' && mode === 'wall') { if (!ghostKey) previewTouch('H3,3'); else rotate(); return; }
    if (k === 'escape' && ghostKey) { ghostKey = null; touchMode = false; render(); return; }
    if (k === 'enter' && mode === 'wall' && ghostKey) { e.preventDefault(); tryWall(ghostKey); return; }
    const dirs = { arrowup: [-1, 0], arrowdown: [1, 0], arrowleft: [0, -1], arrowright: [0, 1] };
    const d = dirs[k]; if (!d) return;
    e.preventDefault();
    if (mode === 'wall') { // setas movem a prévia da cerca
      const g = ghostKey || 'H3,3';
      const r = Math.max(0, Math.min(7, +g[1] + d[0])), c = Math.max(0, Math.min(7, +g[3] + d[1]));
      previewTouch(`${g[0]}${r},${c}`); return;
    }
    const p = state.players[state.turn];
    const moves = Q.legalMoves(state, state.turn);
    const pick = moves.find((m) => m.r === p.r + d[0] && m.c === p.c + d[1]) ||
      moves.find((m) => m.r === p.r + 2 * d[0] && m.c === p.c + 2 * d[1]) ||
      moves.find((m) => (d[0] ? m.r === p.r + d[0] : m.c === p.c + d[1]) && m.jump);
    if (pick) act({ type: 'move', r: pick.r, c: pick.c }); else setMsg('noDir', null, true);
  });

  // ---------- Início: sempre abre nas regras ----------
  const start = (data) => {
    applyLang();
    if (data && data.state) { state = data.state; history = data.history || []; showGame(); }
    else show('intro');
  };
  window.claude?.hot?.snapshot?.(() => ({ state, history: history.slice(-60) }));
  window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {});
})();
