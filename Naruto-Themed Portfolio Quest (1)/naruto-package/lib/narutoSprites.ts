// Central sprite registry — every path relative to /public.
// All sprites share the same character, scale family, and lighting.
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
    mid: `${base}/jump/jump-mid.png`,
    land: `${base}/jump/jump-land.png`,
  },
  idle: {
    idle: `${base}/idle/idle.png`,
    grin: `${base}/idle/grin.png`,
    look: `${base}/idle/look.png`,
    thinking: `${base}/idle/thinking.png`,
    laugh: `${base}/idle/laugh.png`,
  },
  sit: {
    edge: `${base}/sit/sit-edge.png`,
    knee: `${base}/sit/sit-knee.png`,
    cross: `${base}/sit/sit-cross.png`,
    lean: `${base}/sit/lean.png`,
    sitLean: `${base}/sit/sit-lean.png`,
    hang: `${base}/sit/hang.png`,
    lying: `${base}/sit/lying.png`,
    sleep: `${base}/sit/sleep.png`,
  },
  interaction: {
    point: `${base}/interaction/point.png`,
    pointWalk: `${base}/interaction/point-walk.png`,
    thumbsUp: `${base}/interaction/thumbs-up.png`,
    cheer: `${base}/interaction/cheer.png`,
    scroll: `${base}/interaction/scroll.png`,
    peek: `${base}/interaction/peek.png`,
    wave: `${base}/interaction/wave.png`,
    peace: `${base}/interaction/peace.png`,
    salute: `${base}/interaction/salute.png`,
    kunai: `${base}/interaction/kunai.png`,
    ramen: `${base}/interaction/ramen.png`,
  },
  shadowClone: {
    handSign: `${base}/shadow-clone/hand-sign.png`,
    handSignAlt: `${base}/shadow-clone/hand-sign-alt.png`,
    armsCrossed: `${base}/shadow-clone/arms-crossed.png`,
  },
  effects: {
    smoke: [
      `${base}/effects/smoke-01.png`,
      `${base}/effects/smoke-02.png`,
      `${base}/effects/smoke-03.png`,
    ],
  },
} as const;

export type ClonePose = 'sit' | 'hang' | 'lean' | 'point';

export interface CloneConfig {
  id: string;
  pose: ClonePose;
  sprite: string;
  /** Index of the letter (0-based, spaces skipped) the clone perches on */
  letterIndex: number;
  /** Rendered height in px (vary these — avoid symmetry) */
  height: number;
  /** Fraction of the letter's line-height where the glyph's visual top sits */
  glyphTop: number;
  /** Px of overlap onto the letter (sitting bodies overlap; hangers don't) */
  overlap: number;
  /** Horizontal nudge as a fraction of the letter width */
  dx?: number;
  /** Static tilt in degrees (leaning clone) */
  tilt?: number;
}

/** "Mission Log" -> letters M i s s i o n L o g (indices 0..9) */
export const CLONES: CloneConfig[] = [
  { id: 'sitter',  pose: 'sit',   sprite: NarutoSprites.sit.edge,        letterIndex: 0, height: 48, glyphTop: 0.20, overlap: 15 },
  { id: 'hanger',  pose: 'hang',  sprite: NarutoSprites.sit.hang,        letterIndex: 4, height: 54, glyphTop: 0.26, overlap: 0 },
  { id: 'leaner',  pose: 'lean',  sprite: NarutoSprites.sit.lean,        letterIndex: 7, height: 46, glyphTop: 0.76, overlap: 2, dx: -0.6, tilt: 6 },
  { id: 'pointer', pose: 'point', sprite: NarutoSprites.interaction.point, letterIndex: 9, height: 55, glyphTop: 0.44, overlap: 6 },
];

/** Master timeline (ms) — single source of truth for the choreography */
export const TIMELINE = {
  leafDrift: 500,
  runIn: 900,
  runDuration: 620,
  lookAround: 1800,
  grin: 2850,
  handSign: 3250,
  firstPoof: 3700,
  poofStagger: 100,
  thumbsUp: 4400,
  runOut: 5500,
  cloneDepart: 12200,
  departStagger: 150,
} as const;
