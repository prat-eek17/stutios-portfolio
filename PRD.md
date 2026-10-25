# PRD — StutiOS: Pixel-Art macOS Desktop Portfolio

## Original Problem Statement
Build a pixel-art portfolio website that looks like a macOS desktop for Stuti Handa (Data Science B.Tech, VIT Chennai). Pastel gradient background (pink→peach→lavender), top menu bar with name + live clock, floating clouds, sticky note with tagline, pixel-art girl character above the dock, project desktop icons (each matching project type), draggable/stackable macOS windows, boot screen intro, custom pixel cursor, 8-bit window sounds, "Rejected Concepts" trash can easter egg. Font: Press Start 2P. Vibe: retro pixel OS, pastel, cute but professional. Content from uploaded resume PDF.

## Architecture
- Pure frontend experience (React 19 + framer-motion + Tailwind). Backend left as stock FastAPI health endpoint; no DB needed.
- All pixel art is hand-authored inline SVG grids (`src/components/desktop/PixelArt.jsx`) — zero external image dependencies.
- 8-bit sounds synthesized with Web Audio API (`src/sound.js`) — no audio files.
- Custom pixel cursors (arrow + hand) generated at runtime from pixel grids and injected as CSS.
- Content single-source: `src/data.js` (real resume data from the uploaded PDF).

## User Personas
- Recruiters/hiring managers exploring Stuti's projects and skills
- Peers/collaborators looking for contact links

## Implemented (2026-07 / build 1)
- Boot screen: CRT scanlines, StutiOS pixel logo + heart mark, progress bar, click-to-start (initializes audio + boot chime)
- Top menu bar: StutiOS logo, File/Projects/Help menus, name, sound toggle, wifi/battery pixel icons, live clock
- Pastel gradient desktop + grain overlay + 5 drifting pixel clouds with mouse parallax
- Sticky note with tagline (tape graphic, hover straighten)
- Pixel girl sprite: idle bob animation, rotating speech-bubble lines on click
- 3 desktop project icons (earth, robot, flask) opening project windows with real resume content
- Dock: About, Skills, Projects, Experience, Contact, Trash — spring-bounce hover, tooltips, open/minimized indicators
- macOS windows: drag via titlebar, z-index stacking, traffic lights (close/minimize/maximize), Escape closes top window, spring open animation
- Trash easter egg: "Rejected Concepts" list + Empty Trash button with sound
- Skills ticker marquee above bottom edge
- Contact window: email + phone (real); LinkedIn/GitHub URLs are PLACEHOLDER guesses (linkedin.com/in/stutihanda, github.com/stutihanda) — confirm with owner
- Sounds: boot chime, open, close, click, trash; muted until boot click; toggle in menu bar
- Responsive: 375 / 768 / 1366 verified; dock scales down on mobile; sticky note hidden on small screens
- Favicon: pixel heart SVG; title "StutiOS — Stuti Handa"

## Implemented (2026-07 / build 2 additions)
- Per-project "VIEW ON GITHUB" buttons with real repo URLs (proj_1, Personal-AI-Assistant, AnalyzeProject); contact GitHub link now https://github.com/Stutihanda
- Resume download: real PDF bundled at /public/stuti_resume.pdf, "DOWNLOAD RESUME" pixel buttons in About + Contact windows
- Night mode: menu-bar moon/sun toggle, deep-purple gradient, 32 twinkling pixel stars, dimmed clouds, inverted menu icons
- Pixel girl 2.0: wanders the desktop (25-70vw) with direction flip, raises arm and waves with a speech bubble after 20s of visitor idle

## Implemented (2026-07 / build 3 additions)
- Achievement system: pixel toast popups (HELLO WORLD, NIGHT OWL, CLEAN SLATE, NEW FRIEND, KONAMI MASTER) with 8-bit fanfare arpeggio
- Konami code easter egg (↑↑↓↓←→←→BA) rains 18 pixel hearts across the desktop
- Night mode persists via localStorage (survives reload)
- Genie-style minimize: windows shrink and dive toward the dock
- Full source packaged at /app/stutios-portfolio + downloadable zip at /stutios-portfolio-code.zip

- Real LinkedIn URL wired in: linkedin.com/in/stuti-handa-a53064290

## Implemented (2026-07 / build 4 additions)
- Trophy Room dock app: 6 achievements listed, locked ones greyed with hints; achievements persist via localStorage
- Pixel cat companion: lavender cat trails the girl with a lag, meows on click (CAT PERSON achievement)
- Visitor counter: MongoDB-backed hit counter (POST /api/visitors/hit on boot), retro odometer in menu bar
- Snap-to-grid: dragged windows snap to a 16px grid with a spring settle
- Achievements unlocked state shared app-wide; trophy icons greyscale when locked

## Implemented (2026-07 / build 5 additions)
- Chiptune engine: generative 8-bit melody + bassline loop (Web Audio), starts on boot, music-note toggle in menu bar
- Theme cycler: Pastel → Night → Mint Terminal → Vaporwave, persisted in localStorage, per-theme menu bar/dock/cloud styling
- Screen saver: flying pixel toasters + CRT dim after 45s idle, wake on any input, TOASTER TIME achievement (7 total)
- About StutiOS window: menu-bar logo opens system info window (version, credits, fun specs, visitor number)

## Backlog
- P2: Cat walk frames / tail-flick idle animation
- P3: Drum-machine toy window (playable 8-bit beat pads)

## Next Tasks
1. Deploy to production when ready
