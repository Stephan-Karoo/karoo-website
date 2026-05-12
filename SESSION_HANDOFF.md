# Karoo Website — Session Handoff

**Last updated:** 12 May 2026  
**Branch:** `claude/build-karoo-website-rfQYc`  
**Repo:** `Stephan-Karoo/karoo-website`  
**Host:** SiteGround (static files)

---

## What We Built

### Files Created or Modified

| File | Status | Notes |
|------|--------|-------|
| `index.html` | Fully built | Complete homepage with all sections |
| `css/global.css` | Fully built | Design tokens, reset, typography, utilities |
| `css/components.css` | Fully built | All component styles |
| `js/main.js` | Fully built | Navbar, scroll reveal, widgets, form, card shuffle |
| `about.html` | Skeleton | Footer and navbar complete; body content is placeholder |
| `contact.html` | Skeleton | Footer and navbar complete; body content is placeholder |
| `services.html` | Not created | Linked from nav but doesn't exist yet |
| `work.html` | Not created | Linked from nav but doesn't exist yet |

### Homepage Sections (top to bottom)

1. **Navbar** — always dark, fixed, full-width on load → pill on scroll
2. **Hero** — light parchment background, large heading, CTAs, vertical colour bar
3. **Divisions** — 4 division cards on slightly raised background
4. **Features** — dark background, two live-data widgets (workflow + campaign feed)
5. **Process** — numbered steps, how we work
6. **Proof / Selected Work** — 8 project cards, 4-column grid, randomised on load
7. **Client Strip** — 24-logo horizontal marquee
8. **Bio Preview** — founder intro with photo placeholder and CTA to About
9. **Contact / Get in Touch** — dark section, left info column + right contact form
10. **Pre-footer** — 60px dark separator
11. **Footer** — light parchment, 4-column layout

---

## Design System

### Colour Palette

```
Division colours
--orange:       #A56432   Digital Media
--red:          #A23137   Digital Marketing
--green:        #416963   IT Services
--blue:         #2E4A6F   AI Automation

Base palette
--parchment:    #F5F2ED   Primary light bg, hero, footer
--deep-slate:   #1B1E23   Dark sections (features, contact, navbar)
--auth-black:   #282828   Body text
--white:        #FFFFFF

Semantic (light mode)
--bg:           var(--parchment)
--bg-raised:    #EDE9E3   Slightly warmer/darker than parchment (divisions, proof sections)
--bg-card:      #ECEAE5   Card backgrounds
--text:         #282828
--text-muted:   #6B6560
--text-subtle:  #9B958F
--border:       rgba(40,40,40,0.10)
--border-strong:rgba(40,40,40,0.18)
```

### Dark Mode

Dark mode classes are defined in `global.css` under `body.dark-mode {}` but are not currently triggered by any UI toggle. The CSS variables swap automatically when the class is applied. This is ready to wire up to a toggle button.

### Typography Hierarchy

| Use | Font | Variable | Notes |
|-----|------|----------|-------|
| Display headings (h1–h6) | Roslindale | `--font-display` | Self-hosted variable font in `/fonts/roslindale/` |
| Impact labels, eyebrows, section labels | Akira Expanded Demo | `--font-impact` | Self-hosted in `/fonts/akira/`. **Demo version — uppercase/numbers only. Buy full licence before launch.** |
| Body copy | Montserrat | `--font-body` | Google Fonts |
| UI elements (nav, buttons, tags, form) | Poppins | `--font-ui` | Google Fonts |

**Type sizes (fluid):**
```css
h1: clamp(2.8rem, 7vw, 5.5rem)   /* hero heading uses clamp(3.2rem, 8.5vw, 7rem) */
h2: clamp(2rem, 4.5vw, 3.5rem)
h3: clamp(1.4rem, 3vw, 2rem)
h4: 1.25rem
```

### Spacing Scale (8px base)

```
--s1:  0.5rem  /  8px
--s2:  1rem    / 16px
--s3:  1.5rem  / 24px
--s4:  2rem    / 32px
--s5:  3rem    / 48px
--s6:  4rem    / 64px
--s7:  6rem    / 96px   ← standard section padding
--s8:  8rem    / 128px
```

Spacing reduces on mobile via media query at `768px` (s6→3rem, s7→4rem, s8→5rem).

### Border Radius Scale

```
--r-sm:   8px
--r-md:   18px
--r-lg:   28px    ← cards, contact form
--r-pill: 9999px  ← buttons, tags, navbar pill
```

### Textures and Patterns

Three texture layers are used across the site:

| Texture | Implementation | Used on |
|---------|---------------|---------|
| Film grain | SVG `feTurbulence` filter, `body::after`, `opacity: 0.035`, `z-index: 9998` | Whole page, fixed overlay |
| Halftone dot grid | `radial-gradient` 1px dots on 22px grid, `::before` pseudo | Hero section |
| Diagonal orange stripe | `repeating-linear-gradient(-45deg)`, `opacity 0.035`, `::after` pseudo | Hero section |
| Halftone dot grid (small) | `radial-gradient` 1px dots on 5px grid, `::after` on colourbar spans | Vertical colourbar in hero |

### Decorative Shapes

- **Hero top-right triangle** — `.hero__corner`, orange, `clip-path: polygon(100% 0, 0 0, 100% 100%)`, `opacity: 0.14`, `clamp(320px, 45vw, 620px)`
- **Contact bottom-left triangle** — `.contact-section::before`, colour `#2E4A6F`, `clip-path: polygon(0 0, 0 100%, 100% 100%)`, `420×420px`. Uses `z-index: 0` so it floats behind content at `z-index: 1`. Mobile: 260×260px.

### Component Patterns

**Buttons (`global.css`)**
```
.btn            — base styles (pill, Poppins, transitions)
.btn--primary   — orange fill with shadow
.btn--secondary — transparent with border
.btn--ghost     — no background, minimal
.btn--magnetic  — enables JS mouse-follow translate effect
```

**Section labels**
```
.section-label  — Akira font, 0.65rem, 0.16em tracking, uppercase
                  includes a 24px horizontal line before it via ::before
                  default colour: --text-subtle
                  override with inline style when on dark backgrounds
```

---

## Navbar Detail

The navbar transitions from a full-width dark bar → centred pill on scroll. Key implementation detail:

- **Always uses** `left: 50%; transform: translateX(-50%)` — this never changes
- Only `width`, `max-width`, `top`, `border-radius`, and `padding` animate
- Logo starts at `height: 64px`, shrinks to `36px` on scroll
- Hamburger appears at `≤860px`, replacing desktop links
- Sliding underline on hover: each `li:nth-child(n)` gets its division colour via `::after` pseudo-element

```
Nav link 1 (About)    → --orange underline
Nav link 2 (Services) → --red underline
Nav link 3 (Work)     → --green underline
Nav link 4 (Contact)  → --blue underline
Nav link 5 (CTA btn)  → --orange underline
```

---

## Hero Section Detail

Background layers (bottom to top):
1. `background-color: var(--parchment)` — base
2. `::before` — halftone dot grid
3. `::after` — diagonal orange stripe
4. `.hero__corner` — orange triangle, top-right
5. `.hero__colourbar` — 4-band vertical bar, left edge, 48px wide, clipped with diagonal right edge

**Colourbar** (`index.html` element):
```html
<div class="hero__colourbar" aria-hidden="true">
  <span></span> <!-- orange -->
  <span></span> <!-- red -->
  <span></span> <!-- green -->
  <span></span> <!-- blue -->
</div>
```
Each band has halftone dots via `::after` and parchment-coloured separator lines via `::before`.

---

## Current Project Cards (8 total)

Cards are shuffled randomly on each page load (Fisher-Yates in `js/main.js`).

| Client | Image file | Division tag | Colour accent |
|--------|-----------|-------------|---------------|
| Happy Hippo | `HappyHippo-Square-large.jpg` | Digital Media | orange |
| Forever Learning | `ForeverLearning.jpg` | Digital Media | orange |
| CSIROCare Clayton | `CSIRO-Care.jpg` | IT Services | green |
| Elektra Solar | `Elektra-Solar.jpg` | Digital Marketing | red |
| Tuffride | `Tuffride.jpg` | Digital Media | orange |
| Caravans WA | `CWA.jpg` | Digital Marketing | red |
| Just Good Food | `JGF-Big-Square.jpg` | Digital Marketing | red |
| Intelligent Engineering | `Intelligent-Engineering.jpg` | AI Automation | blue |

Grid is 4 columns on desktop → 3 → 2 → 1 at breakpoints 1024px / 760px / 480px.

---

## Client Logo Strip (24 logos)

Logos at `images/client-logos/`. All displayed in the marquee; duplicated in HTML for seamless loop. Animation: `strip-scroll` 35s linear infinite, pauses on hover. Logos are `grayscale(100%) opacity 0.55` by default, full colour on hover.

Logos in the folder:
`ADVMD.jpg`, `Bonza-Trailers.jpg`, `CaravanSolutions.jpg`, `CIIG.jpg`, `CSIRO-Care.jpg`, `CWA.jpg`, `Elektra-Solar.jpg`, `FairDinkumCaravans.png`, `ForeverLearning.jpg`, `GCPD.jpg`, `HappyHippo-Square-large.jpg`, `Intelligent-Engineering.jpg`, `JGF-Big-Square.jpg`, `LOGO500px.png`, `NE.jpg`, `NETrailworx.jpg`, `nextgen.jpg`, `nRV.png`, `NurseEmily.png`, `PreciseLogo-Square2.jpg`, `St-Nich.jpg`, `TEKO-adventure-500px.jpg`, `Tuffride.jpg`, `Vancraft.jpg`

---

## JavaScript Functionality (`js/main.js`)

| Function | What it does |
|----------|-------------|
| `initNavbar()` | Scroll listener adds `.navbar--scrolled` after 60px; hamburger toggle; active link marking |
| `initMagneticButtons()` | Mouse-follow micro-translate on `.btn--magnetic` elements |
| `initScrollReveal()` | IntersectionObserver triggers `.is-visible` on `.reveal` elements (threshold 0.12) |
| `initWorkflowWidget()` | Cycles `.active` class through workflow nodes every 1400ms |
| `initChecklistWidget()` | Checks off checklist items sequentially, resets after 2800ms pause |
| `shuffleProofGrid()` | Fisher-Yates shuffle of `.proof__grid` children on load |
| Smooth scroll | `a[href^="#"]` — smooth scrollIntoView |
| `initForms()` | `.js-contact-form` submit handler with loading/success states. **Currently a placeholder — no real endpoint.** |

---

## Footer Structure

4-column grid. Column header colours:
- Col 1 (Logo + tagline) — no label
- Col 2 **Navigation** — `--red` (#A23137)
- Col 3 **Divisions** — `--green` (#416963)
- Col 4 **Contact** — `--blue` (#2E4A6F)

Logo: `images/logos/Karoo-Digital-Systems.png` with fallback to `Karoo-LIGHT.png`.  
Footer background: `var(--parchment)`.

---

## File Structure

```
karoo-website/
├── index.html
├── about.html          (skeleton — navbar + footer done)
├── contact.html        (skeleton — navbar + footer done)
├── services.html       (NOT CREATED — linked in nav)
├── work.html           (NOT CREATED — linked in nav)
├── css/
│   ├── global.css      (tokens, reset, typography, utilities, buttons)
│   └── components.css  (all section/component styles)
├── js/
│   └── main.js
├── fonts/
│   ├── akira/          (Akira Expanded Demo.otf)
│   └── roslindale/     (variable + static weight TTF files)
├── images/
│   ├── Karoo-Digital-Systems-signage.jpg
│   ├── client-logos/   (24 logo files)
│   ├── logos/          (Karoo-Digital-Systems.png, Karoo-LIGHT.png, division logos)
│   └── placeholder/
└── SESSION_HANDOFF.md
```

---

## Known Issues and TODOs

### Functional issues
- **Contact form has no backend** — `js/main.js` `initForms()` is a placeholder. Needs a real endpoint (ActiveCampaign, Fluent Forms on WordPress, Formspree, etc.)
- **`services.html` and `work.html` don't exist** — nav links to both pages will 404
- **Akira font is the demo version** — only supports uppercase letters and numbers. The Akira full commercial licence must be purchased before the site goes live.

### Visual refinements to consider
- Bio section has a photo placeholder — needs a real founder photo
- `about.html` and `contact.html` page bodies are placeholder content
- Project cards don't link anywhere (no `<a>` wrapping cards currently)
- The contact section section-label uses an inline style (`color:#A23137`) — could be moved to a utility class

### Code quality notes
- The `pre-footer` section contains a now-redundant `<div class="pre-footer__blue-panel">` element in `index.html` — it's unstyled and harmless but could be cleaned up
- Dark mode CSS is written and ready in `global.css` but no toggle UI exists

---

## Next Session Priorities

### 1. `services.html` — 4 Division Sections
Each of the four divisions needs its own section with:
- Full-width colour banner (matching division colour)
- Services list / feature breakdown
- Case study reference or result stats
- CTA to contact

Suggested approach: one long scrolling page with `id="digital-media"`, `id="digital-marketing"`, `id="it-services"`, `id="ai-automation"` anchors (nav links already use these anchors).

The AI Automation section should likely have a dark background to differentiate it — the dark mode CSS variables are already defined and could be scoped to that section using a wrapper class.

### 2. `about.html` — Company Story
Suggested sections:
- Hero (similar to homepage but with a photo or signage image background)
- Founding story / mission
- Team / founder bio (expand on the homepage preview)
- Values or way of working
- Division overview cards (can reuse `.division-card` component)
- CTA to contact

### 3. `work.html` — Full Portfolio Grid
Expand the 8 homepage cards into a full filterable portfolio. Could add filter buttons by division colour. The `.project-card` component and CSS grid are already built — just needs more cards and a filter mechanism.

### 4. Homepage polish (lower priority)
- Add real founder photo to bio section
- Wire up contact form to a real submission endpoint
- Add `<meta>` SEO tags, Open Graph, favicon
- Performance: lazy-load images below the fold (most already have `loading="lazy"`)

---

## Design Decisions Log

| Decision | Rationale |
|----------|-----------|
| Parchment (#F5F2ED) hero, not dark | Creates visual separation from always-dark navbar; feels warmer and more human |
| Navbar stays dark always, never flips | Consistency — removing a class of scroll-related bugs; dark nav works on both light and dark sections |
| Full-bar → pill on scroll | Communicates "you've left the landing zone" without being disruptive; pill feels modern |
| Division colour-bar at top of Proof section, not in hero | Hero stays clean and editorial; the colour system is introduced when work is displayed |
| Fisher-Yates shuffle on project cards | Prevents any one client always appearing first; shows breadth of work on every visit |
| Triangle as `::before` pseudo-element, not a DOM element | Decorative shape has zero layout impact — it can't push other content around |
| All four division colours in nav hover underlines | Reinforces the four-division brand identity on every page |
| Fonts: Roslindale (serif display) + Akira (impact) | Roslindale brings editorial warmth; Akira brings authority for labels; Montserrat/Poppins for legibility |
