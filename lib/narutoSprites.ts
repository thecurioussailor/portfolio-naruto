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

export type ClonePose = 'sit' | 'hang' | 'lean' | 'point';

export interface CloneConfig {
  id: string;
  pose: ClonePose;
  sprite: string;
  letterIndex: number;
  height: number;
  glyphTop: number;
  overlap: number;
  dx?: number;
  tilt?: number;
}

/**
 * "Mission Log" non-space letters by index:
 *  0=M 1=i 2=s 3=s 4=i 5=o 6=n 7=L 8=o 9=g
 *
 * Three clones only:
 *  - sitter  → sits on top of "M" (index 0), legs over left edge
 *  - hanger  → hangs from the dot/top of second "i" (index 4)
 *  - pointer → leans on "g" at end of "Log" (index 9), tilted to guide eye down
 */
export const CLONES: CloneConfig[] = [
  {
    id: 'sitter',
    pose: 'sit',
    sprite: NarutoSprites.sit.edge,
    letterIndex: 0,
    height: 44,
    glyphTop: 0.0,   // sit flush on the very top of the M
    overlap: 8,
    dx: -0.3,        // nudge left so legs hang over the left stroke
  },
  {
    id: 'hanger',
    pose: 'hang',
    sprite: NarutoSprites.sit.hang,
    letterIndex: 4,   // second "i"
    height: 50,
    glyphTop: 0.08,  // hang from near the top / dot area
    overlap: 0,
    dx: 0.1,
  },
  {
    id: 'pointer',
    pose: 'point',
    sprite: NarutoSprites.interaction.point,
    letterIndex: 9,   // "g"
    height: 52,
    glyphTop: 0.10,  // sit on top of the g, not mid-stroke
    overlap: 10,
    dx: 0.2,
    tilt: 14,        // lean forward so pointing gesture aims downward toward cards
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
  poofStagger:   100,
  thumbsUp:     4400,
  runOut:       5500,
  cloneDepart: 12200,
  departStagger: 150,
} as const;
