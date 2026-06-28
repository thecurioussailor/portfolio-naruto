# Naruto-Themed Portfolio Quest — Project Context & Handoff

## What this is
A single-page, cinematic, game-inspired developer/designer portfolio themed as a "Naruto quest."
Calm sunset hero that builds energy as you scroll. Each section is a "Stage" of the quest.
Owner: **Ashutosh Sagar** — full-stack creative (developer + designer). Reference (DO NOT copy text): ashutoshsagar.com. All copy is currently on-theme placeholder.

## Design system
- **Mood:** calm + cinematic hero → more energetic on scroll. Cinematic anime vibe, light game touches (NOT a full RPG HUD).
- **Palette:** bg deep plum/indigo `#14101f` / `#181226` / `#1d1733`; primary orange `#ef6c1a`, light orange `#ff8a3d`; leaf green `#6fa653`; cream text `#f4ecdb`; muted purple text `#c5b6d6` / `#9d8eb3`.
- **Type:** Shippori Mincho (serif display/headings), Zen Kaku Gothic New (body), Space Mono (labels/tags/UI).
- **Motifs:** Japanese kanji eyebrow labels per stage (起源/術/任務/旅/召喚), "chakra" progress bar, ninja "Lv." badges, A/B/S mission ranks, Genin→Sage timeline.

## Sections (in order)
1. **Hero** — full-bleed cliff-village sunset, multi-layer parallax (mouse + scroll), flying birds, canvas particles (leaves + fireflies), pulsing "Begin the Quest" CTA, scroll cue.
2. **Stage 01 · Origin (about)** — tilted manga "memory" panel + story + stat chips; chibi cutout peeks from right.
3. **Stage 02 · Jutsu (skills)** — 6 cards, animated chakra-mastery bars, level badges.
4. **Stage 03 · Missions (projects)** — ranked cards (S/A/B), hover lift + image zoom; child-Naruto cutout peeks from left.
5. **Stage 04 · Journey (timeline)** — vertical timeline over the walking-road image as parallax band; Genin→Sage rank nodes.
6. **Stage 05 · Summon (contact)** — porch image, "Send a Scroll" mailto, social links.
7. **Footer** — logo, nav, copyright.
- Fixed HUD nav: chakra scroll-progress bar, active-section highlight, smooth scroll.

## Assets (in /assets)
- `hero-cliff-village.jpg` — hero background
- `pillar-sunset.webp` — mission card (S-rank)
- `naruto-sky.png` — mission card (A-rank)
- `chibi-sleeping-fox.jpg` — mission card
- `tree-hang.jpg` — mission card (B-rank)
- `journey-road.jpg` — Stage 04 parallax band
- `porch-talk.jpg` — Stage 05 contact image
- `manga-corner.webp` — Stage 01 memory panel
- `chibi-peek.png` — transparent cutout, peeks in Stage 01
- `child-peek.png` — transparent cutout, peeks in Stage 03

## Improvements the owner wants to make (TODO in rebuild)
- Replace all placeholder copy with real story / projects / experience.
- Real project screenshots in mission cards (consider drag-drop or CMS).
- Responsive / mobile polish (current build is desktop-first).
- (Add your own here as you iterate.)

## Effects to preserve when rebuilding
- Multi-layer parallax on hero (background, content, birds react to mouse + scroll).
- Canvas particle field (drifting leaves + glowing fireflies), fixed full-viewport.
- Scroll-progress "chakra" bar + sticky nav that condenses on scroll + active link.
- Intersection-observer reveal-on-scroll; chakra bars animate width when in view.
- Peeking character cutouts slide in from screen edges on scroll.
- Mission card hover: lift + inner image zoom.
