/* Regras do jogo (Bloqueio/Quoridor) com cercas de 2 casas. Sem DOM: testável em Node. */
const Q = (() => {
  const N = 9;
  const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  // Lugares ao redor do curral, em sentido horário: baixo, esquerda, cima, direita
  const SEATS = [
    { start: [8, 4], goal: { axis: 'r', v: 0 } },
    { start: [4, 0], goal: { axis: 'c', v: 8 } },
    { start: [0, 4], goal: { axis: 'r', v: 8 } },
    { start: [4, 8], goal: { axis: 'c', v: 0 } },
  ];
  const inB = (r, c) => r >= 0 && r < N && c >= 0 && c < N;

  // Passagem "v r,c" fica à direita da casa (r,c); "h r,c" fica abaixo da casa (r,c).
  // Cerca "Hr,c" (deitada) fecha h r,c e h r,c+1; cerca "Vr,c" (em pé) fecha v r,c e v r+1,c.
  function wallEdges(k) {
    const r = +k[1], c = +k[3];
    return k[0] === 'H' ? [`h${r},${c}`, `h${r},${c + 1}`] : [`v${r},${c}`, `v${r + 1},${c}`];
  }
  function edgeSet(walls, extra) {
    const s = new Set();
    for (const k in walls) for (const e of wallEdges(k)) s.add(e);
    if (extra) for (const e of wallEdges(extra)) s.add(e);
    return s;
  }
  function edgeKey(r, c, dr, dc) {
    if (dc === 1) return `v${r},${c}`;
    if (dc === -1) return `v${r},${c - 1}`;
    if (dr === 1) return `h${r},${c}`;
    return `h${r - 1},${c}`;
  }
  function blocked(has, r, c, dr, dc) {
    if (!inB(r + dr, c + dc)) return true;
    return has(edgeKey(r, c, dr, dc));
  }
  function validKey(k) {
    const m = /^([HV])(\d),(\d)$/.exec(k);
    return !!m && +m[2] < N - 1 && +m[3] < N - 1;
  }
  const ALL_KEYS = [];
  for (let r = 0; r < N - 1; r++) for (let c = 0; c < N - 1; c++) ALL_KEYS.push(`H${r},${c}`, `V${r},${c}`);
  const atGoal = (p, r, c) => (p.goal.axis === 'r' ? r === p.goal.v : c === p.goal.v);
  const hasFn = (state, extra) => { const s = edgeSet(state.walls, extra); return (k) => s.has(k); };

  function newGame(players) {
    const each = players.length === 2 ? 10 : 5;
    return {
      walls: {},
      players: players.map((pl) => ({
        seat: pl.seat, kind: pl.kind,
        r: SEATS[pl.seat].start[0], c: SEATS[pl.seat].start[1],
        goal: SEATS[pl.seat].goal, wallsLeft: each,
      })),
      turn: 0, winner: -1, ply: 0, last: null,
    };
  }

  // Menor número de passos até a chegada (ignora os outros bichos)
  function distFrom(state, pi, r0, c0, extra) {
    const p = state.players[pi];
    const has = hasFn(state, extra);
    if (atGoal(p, r0, c0)) return 0;
    const seen = new Uint8Array(N * N);
    seen[r0 * N + c0] = 1;
    let frontier = [[r0, c0]], d = 0;
    while (frontier.length) {
      d++;
      const next = [];
      for (const [r, c] of frontier) for (const [dr, dc] of DIRS) {
        if (blocked(has, r, c, dr, dc)) continue;
        const nr = r + dr, nc = c + dc, i = nr * N + nc;
        if (seen[i]) continue;
        if (atGoal(p, nr, nc)) return d;
        seen[i] = 1; next.push([nr, nc]);
      }
      frontier = next;
    }
    return Infinity;
  }
  const distance = (state, pi, extra) => distFrom(state, pi, state.players[pi].r, state.players[pi].c, extra);

  function shortestPath(state, pi) {
    const p = state.players[pi];
    const has = hasFn(state);
    const prev = new Int16Array(N * N).fill(-2);
    const s = p.r * N + p.c;
    prev[s] = -1;
    const q = [s];
    for (let h = 0; h < q.length; h++) {
      const i = q[h], r = (i / N) | 0, c = i % N;
      if (atGoal(p, r, c)) {
        const out = [];
        for (let j = i; j !== -1; j = prev[j]) out.push([(j / N) | 0, j % N]);
        return out.reverse();
      }
      for (const [dr, dc] of DIRS) {
        if (blocked(has, r, c, dr, dc)) continue;
        const ni = (r + dr) * N + c + dc;
        if (prev[ni] !== -2) continue;
        prev[ni] = i; q.push(ni);
      }
    }
    return null;
  }

  function legalMoves(state, pi, extra) {
    const p = state.players[pi];
    const has = hasFn(state, extra);
    const occ = (r, c) => state.players.some((o, i) => i !== pi && o.r === r && o.c === c);
    const out = [];
    const add = (r, c, jump) => { if (!out.some((m) => m.r === r && m.c === c)) out.push({ r, c, jump }); };
    for (const [dr, dc] of DIRS) {
      if (blocked(has, p.r, p.c, dr, dc)) continue;
      const tr = p.r + dr, tc = p.c + dc;
      if (!occ(tr, tc)) { add(tr, tc, false); continue; }
      // Tem um bicho na frente: pula por cima se atrás dele estiver livre
      if (!blocked(has, tr, tc, dr, dc) && !occ(tr + dr, tc + dc)) { add(tr + dr, tc + dc, true); continue; }
      // Cerca (ou borda, ou outro bicho) atrás dele: vale ir na diagonal
      const sides = dr ? [[0, -1], [0, 1]] : [[-1, 0], [1, 0]];
      for (const [sr, sc] of sides) {
        if (!blocked(has, tr, tc, sr, sc) && !occ(tr + sr, tc + sc)) add(tr + sr, tc + sc, true);
      }
    }
    return out;
  }

  // Retorna null se pode colocar, ou um código de motivo (traduzido na interface)
  function wallProblem(state, pi, key) {
    if (state.players[pi].wallsLeft <= 0) return 'none';
    if (!validKey(key)) return 'outside';
    const used = edgeSet(state.walls);
    if (wallEdges(key).some((e) => used.has(e))) return 'overlap';
    const cross = (key[0] === 'H' ? 'V' : 'H') + key.slice(1);
    if (Object.prototype.hasOwnProperty.call(state.walls, cross)) return 'cross';
    for (let i = 0; i < state.players.length; i++) {
      // Regra de ouro: sempre sobra um caminho até a comida...
      if (distance(state, i, key) === Infinity) return 'trap';
      // ...e nenhum bicho fica sem nenhuma casa para andar
      if (legalMoves(state, i, key).length === 0) return 'stuck';
    }
    return null;
  }

  function clone(state) { return JSON.parse(JSON.stringify(state)); }

  function apply(state, action) {
    const s = clone(state);
    const pi = s.turn, p = s.players[pi];
    if (s.winner !== -1) throw new Error('over');
    if (action.type === 'move') {
      if (!legalMoves(state, pi).some((m) => m.r === action.r && m.c === action.c)) throw new Error('badmove');
      p.r = action.r; p.c = action.c;
      if (atGoal(p, p.r, p.c)) s.winner = pi;
    } else if (action.type === 'wall') {
      const why = wallProblem(state, pi, action.key);
      if (why) throw new Error(why);
      s.walls[action.key] = pi;
      p.wallsLeft--;
    } else if (action.type === 'pass') {
      // só vale quando o bicho está cercado por outros bichos e não tem para onde ir
      if (legalMoves(state, pi).length) throw new Error('badmove');
    } else throw new Error('badmove');
    s.last = { pi, ...action };
    s.ply++;
    if (s.winner === -1) s.turn = (s.turn + 1) % s.players.length;
    return s;
  }

  // ---------- Computador ----------
  function aiChoose(state, level, rng = Math.random) {
    const me = state.turn, p = state.players[me];
    const moves = legalMoves(state, me);
    const myD = distance(state, me);

    let bestMove = null, bestD = Infinity;
    for (const m of moves) {
      if (atGoal(p, m.r, m.c)) return { type: 'move', r: m.r, c: m.c };
      const d = distFrom(state, me, m.r, m.c);
      if (d < bestD || (d === bestD && rng() < 0.5)) { bestD = d; bestMove = m; }
    }
    if (level === 'easy' && rng() < 0.25 && moves.length) {
      const m = moves[(rng() * moves.length) | 0];
      return { type: 'move', r: m.r, c: m.c };
    }

    const wantsWalls = p.wallsLeft > 0 && (level !== 'easy' || rng() < 0.2);
    if (wantsWalls) {
      const dists = state.players.map((_, i) => distance(state, i));
      let threat = -1;
      dists.forEach((d, i) => { if (i !== me && (threat === -1 || d < dists[threat])) threat = i; });
      const tD = dists[threat];
      if (tD < myD || (tD === myD && tD <= 3) || tD <= 1) {
        let best = null, bestScore = -Infinity, bestGain = 0;
        for (const k of ALL_KEYS) {
          if (wallProblem(state, me, k)) continue;
          const nd = state.players.map((_, i) => distance(state, i, k));
          if (nd.some((d) => d === Infinity)) continue;
          const gain = nd[threat] - tD;
          if (gain <= 0) continue;
          let score = gain * 2 - (nd[me] - myD) * 1.6;
          nd.forEach((d, i) => { if (i !== me && i !== threat) score += (d - dists[i]) * 0.4; });
          score += rng() * 0.1;
          if (score > bestScore) { bestScore = score; best = k; bestGain = gain; }
        }
        if (best && bestGain >= 1 && bestScore >= 1.5) return { type: 'wall', key: best };
      }
    }
    return bestMove ? { type: 'move', r: bestMove.r, c: bestMove.c } : { type: 'pass' };
  }

  return { N, SEATS, ALL_KEYS, edgeKey, wallEdges, validKey, newGame, distance, shortestPath, legalMoves, wallProblem, apply, aiChoose, atGoal, clone };
})();
if (typeof module !== 'undefined') module.exports = Q;
