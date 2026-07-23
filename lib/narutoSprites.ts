const base = '/naruto';

export const NarutoSprites = {
  run: [
    `${base}/run/run-01.png`,
    `${base}/run/run-02.png`,
    `${base}/run/run-03.png`,
    `${base}/run/run-04.png`,
  ],
  jump: {
    start: `${base}/jump/jump-start.png`,
    mid:   `${base}/jump/jump-mid.png`,
    land:  `${base}/jump/jump-land.png`,
  },
  idle: {
    idle:     `${base}/idle/idle.png`,
    grin:     `${base}/idle/grin.png`,
    look:     `${base}/idle/look.png`,
    thinking: `${base}/idle/thinking.png`,
    laugh:    `${base}/idle/laugh.png`,
  },
  sit: {
    edge:    `${base}/sit/sit-edge.png`,
    knee:    `${base}/sit/sit-knee.png`,
    cross:   `${base}/sit/sit-cross.png`,
    lean:    `${base}/sit/lean.png`,
    sitLean: `${base}/sit/sit-lean.png`,
    hang:    `${base}/sit/hang.png`,
    lying:   `${base}/sit/lying.png`,
    sleep:   `${base}/sit/sleep.png`,
  },
  interaction: {
    point:     `${base}/interaction/point.png`,
    pointWalk: `${base}/interaction/point-walk.png`,
    thumbsUp:  `${base}/interaction/thumbs-up.png`,
    cheer:     `${base}/interaction/cheer.png`,
    scroll:    `${base}/interaction/scroll.png`,
    peek:      `${base}/interaction/peek.png`,
    wave:      `${base}/interaction/wave.png`,
    peace:     `${base}/interaction/peace.png`,
    salute:    `${base}/interaction/salute.png`,
    kunai:     `${base}/interaction/kunai.png`,
    ramen:     `${base}/interaction/ramen.png`,
  },
  shadowClone: {
    handSign:    `${base}/shadow-clone/hand-sign.png`,
    handSignAlt: `${base}/shadow-clone/hand-sign-alt.png`,
    armsCrossed: `${base}/shadow-clone/arms-crossed.png`,
  },
  effects: {
    smoke: [
      `${base}/effects/smoke-01.png`,
      `${base}/effects/smoke-02.png`,
      `${base}/effects/smoke-03.png`,
    ] as [string, string, string],
  },
} as const;

export type ClonePose = 'sit' | 'hang' | 'lean' | 'point' | 'stand' | 'cheer' | 'wave' | 'peace';

/**
 * zone:
 *   "letter" — anchored to a specific glyph (uses letterIndex + glyphTop + overlap + dx)
 *   "above"  — floats above the heading (uses ax: fraction of heading width, ay: px above heading top)
 *   "flank"  — left or right of the heading (uses side + fx: px from edge, fy: fraction of heading height)
 */
export type CloneZone = 'letter' | 'above' | 'flank';

export interface CloneConfig {
  id: string;
  pose: ClonePose;
  sprite: string;
  height: number;
  tilt?: number;
  // letter zone
  zone?: CloneZone;
  letterIndex?: number;
  glyphTop?: number;
  overlap?: number;
  dx?: number;
  // above zone
  ax?: number;   // 0–1 fraction of heading width
  ay?: number;   // px above heading top (positive = higher up)
  // flank zone
  side?: 'left' | 'right';
  fx?: number;   // px offset from heading edge (positive = outward)
  fy?: number;   // 0–1 fraction of heading height from top
}

/**
 * 14 clones across three zones.
 *
 * "Mission Log" letter indices (non-space):
 *   0=M 1=i 2=s 3=s 4=i 5=o 6=n  7=L 8=o 9=g
 *
 * Flank zone: fx is px inset FROM the heading edge (positive = still inside viewport).
 * fy is a 0–1 fraction of heading height, used to vertically stack flankers.
 * Multiple flankers on the same side use increasing fx to step outward.
 */
export const CLONES: CloneConfig[] = [
  // ── ON LETTERS (4) ──────────────────────────────────────────
  {
    id: 'sitter',
    zone: 'letter',
    pose: 'sit',
    sprite: NarutoSprites.sit.edge,
    letterIndex: 0,
    height: 44,
    glyphTop: -0.05,
    overlap: 6,
    dx: -0.25,
  },
  {
    id: 'hanger',
    zone: 'letter',
    pose: 'hang',
    sprite: NarutoSprites.sit.hang,
    letterIndex: 4,
    height: 46,
    glyphTop: -0.08,
    overlap: 0,
    dx: 0.1,
  },
  {
    id: 'leaner',
    zone: 'letter',
    pose: 'lean',
    sprite: NarutoSprites.sit.lean,
    letterIndex: 6,
    height: 48,
    glyphTop: 0.3,
    overlap: 8,
    dx: 0.8,
  },
  {
    id: 'pointer',
    zone: 'letter',
    pose: 'point',
    sprite: NarutoSprites.interaction.point,
    letterIndex: 9,
    height: 48,
    glyphTop: -0.01,
    overlap: 8,
    dx: -0.9,
    tilt: 10,
  },

  // ── ABOVE THE HEADING (4) ────────────────────────────────────
  {
    id: 'above-1',
    zone: 'above',
    pose: 'stand',
    sprite: NarutoSprites.idle.idle,
    height: 54,
    ax: 0.3,
    ay: 20,
  },
  {
    id: 'above-2',
    zone: 'above',
    pose: 'cheer',
    sprite: NarutoSprites.interaction.cheer,
    height: 56,
    ax: 0.44,
    ay: 47,
  },
  {
    id: 'above-3',
    zone: 'above',
    pose: 'wave',
    sprite: NarutoSprites.interaction.wave,
    height: 52,
    ax: 0.62,
    ay: 65,
  },
  {
    id: 'above-4',
    zone: 'above',
    pose: 'peace',
    sprite: NarutoSprites.interaction.peace,
    height: 54,
    ax: 0.72,
    ay: 18,
  },

  // ── LEFT FLANK (3) — ax negative = left of heading ──────────
  {
    id: 'left-1',
    zone: 'above',
    pose: 'stand',
    sprite: NarutoSprites.idle.look,
    height: 48,
    ax: 0.405,
    ay: 54,
  },
  {
    id: 'left-2',
    zone: 'above',
    pose: 'cheer',
    sprite: NarutoSprites.interaction.cheer,
    height: 54,
    ax: -0.10,
    ay: 60,
  },
  {
    id: 'left-3',
    zone: 'above',
    pose: 'peace',
    sprite: NarutoSprites.interaction.peace,
    height: 52,
    ax: 0.26,
    ay: 18,
  },

  // ── RIGHT FLANK (3) — ax > 1.0 = right of heading ───────────
  // {
  //   id: 'right-1',
  //   zone: 'above',
  //   pose: 'wave',
  //   sprite: NarutoSprites.interaction.wave,
  //   height: 48,
  //   ax: 0.7,
  //   ay: 20,
  // },
  {
    id: 'right-2',
    zone: 'above',
    pose: 'stand',
    sprite: NarutoSprites.idle.idle,
    height: 54,
    ax: 0.68,
    ay: 20,
  },
  {
    id: 'right-3',
    zone: 'above',
    pose: 'sit',
    sprite: NarutoSprites.sit.cross,
    height: 50,
    ax: 0.556,
    ay: 55,
  },
];

export const TIMELINE = {
  leafDrift:     500,
  runIn:         900,
  runDuration:   620,
  lookAround:   1800,
  grin:         2850,
  handSign:     3250,
  firstPoof:    3700,
  poofStagger:   150,   // stagger between each clone appearing
  cloneDepart:  10000,  // auto-depart if cards never scroll into view
  departStagger: 120,
} as const;
