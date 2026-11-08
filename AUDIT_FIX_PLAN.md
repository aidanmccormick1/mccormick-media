# McCormick Media audit fix plan

This plan is organized by risk and autonomy. Items marked **Do now** can be changed safely without product decisions. Items marked **Needs approval** require client/domain decisions or content.

## Phase 0 — Baseline and verification

- Work in the repository root: `/Users/aidanmccormick/Desktop/mccormick-media`.
- Use Git checkpoints before each phase:
  - `git status --short`
  - `git add -A && git commit -m "checkpoint: ..."` after meaningful chunks.
- Verify every edited HTML file with a parser and link checks.
- Browser smoke-test:
  - Home, About, Services, Work, Contact, Terms
  - Desktop Chrome, macOS Safari, mobile-width Chrome
  - Keyboard-only navigation
  - Reduced-motion OS toggle

## Phase 1 — Correctness and reliability (Do now)

### 1.1 Replace the legacy 404 page with an on-brand page
- Impact: removes unrelated TeleportHQ template and improves first impression/legal reliability
- Risk: low
- Files:
  - `404.html`
  - `404.css` or remove stylesheet from HTML and inline basic styles
- Actions:
  - Rewrite 404 with the main design system (`css/style.css` equivalent paths)
  - Include nav/logo, clear message, home CTA, footer
  - Ensure status-code handling is unchanged (GitHub Pages will still serve it)
  - Keep layout mobile-friendly

### 1.2 Make hidden asset paths valid in legacy previews
- Impact: template previews stop showing broken favicon images
- Risk: low
- Files:
  - `components/*.html`
- Actions:
  - Change `public/am logo square.png` to `../public/am logo square.png` across all component previews
  - Optionally add `../index.html` breadcrumb links
- Alternative:
  - Move legacy templates into `_legacy/` and exclude from normal browsing

### 1.3 Remove or archive clearly unused heavyweight assets
- Impact: reduces repository size from ~9.7MB
- Risk: low if restricted to files with no references
- Candidate files:
  - `img/Subject.png` (6.9MB, unreferenced)
  - `img/AM LOGO.png` (unreferenced)
  - `img/logo-white.png` (0 bytes, unreferenced)
  - `img/.logo-white.png.tjRrdZ` (hidden temp file)
  - `img/_DSC9805-2.jpg` (likely duplicate of `aidan-mccormick.jpg`; verify first)
- Actions:
  - Archive candidates into `assets/archive/unused-2026-11/`
  - Only delete after confirming no hidden references

### 1.4 Add metadata and canonical URLs
- Impact: SEO and social sharing
- Risk: low
- Files:
  - `index.html`
  - `pages/history.html`
  - `pages/services.html`
  - `pages/work.html`
  - `pages/contact.html`
  - `pages/terms.html`
- Actions:
  - Add unique meta descriptions, document titles, canonical URLs, Open Graph, and Twitter card tags
  - Add `robots.txt` and `sitemap.xml`
  - Add structured data for local business/person as appropriate

### 1.5 Rename image files with spaces/apostrophes
- Impact: more robust URLs and asset pipelines
- Risk: medium (requires updating all references)
- Files:
  - `img/S26_Cathy’sRetirementParty-32.jpg`
  - `img/F2025_KAYAKING_-16.jpg`
  - `img/AM LOGO White.png`
  - `img/am logo square.png`
- Actions:
  - Rename to slug-safe names
  - Update all HTML/CSS/JS references
  - Keep redirects only if needed (GitHub Pages cannot easily redirect arbitrary image paths)

## Phase 2 — Accessibility (Do now, “background” options)

### 2.1 Add baseline accessibility utilities
- Impact: supports keyboard and screen-reader users without changing normal visual design
- Risk: low
- Files:
  - `css/style.css`
  - `js/main.js`
- Actions:
  - Add visually-hidden `.sr-only` utility
  - Ensure skip link before nav: "Skip to main content"
  - Ensure all interactive elements have visible `:focus-visible`
  - Add `prefers-reduced-motion` CSS to disable animations, transitions, canvas particle movement, and large transform effects
  - Add ARIA landmarks where needed (`main`, `nav`, `footer`)
  - Add meaningful alt text to important images; decorative images get `alt=""`

### 2.2 Add hidden accessibility settings background panel
- Impact: provides non-intrusive settings options
- Risk: low
- Files:
  - `css/style.css`
  - `js/main.js`
- Requirements:
  - Not visible to ordinary viewers by default
  - Activated only by keyboard shortcut (`Alt+A`) or query parameter (`?a11y=1`)
  - Persists options in `localStorage`
  - Respects OS settings on first load
- Options:
  - High contrast
  - Reduced motion
  - Larger text
  - Underline links
  - Disable custom cursor
  - Stronger focus outlines
- Implementation:
  - Inject panel via JavaScript into every main page
  - Keep panel `hidden` and off-screen initially
  - Use `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
  - Provide “Apply settings” and “Reset settings”
  - Add visible live-region feedback for changes
- Safety note:
  - This is an accommodation feature, not a legal guarantee or substitute for accessible design

### 2.3 Convert canvas animations to be motion-safe
- Files:
  - `js/main.js`
  - `css/style.css`
- Actions:
  - Do not start hero particle loop when reduced motion is requested
  - Pause/stop `requestAnimationFrame` loops when toggled on
  - Avoid transform-only reveal dependencies when motion is reduced

## Phase 3 — Performance (Do now, low visual impact)

### 3.1 Self-host or cache portfolio images
- Risk: medium
- Actions:
  - Download and optimize CDN gallery images into `img/portfolio/`
  - Generate responsive JPEG/WebP assets
  - Replace remote URLs
  - Retain alt text describing actual photo subjects

### 3.2 Compress oversized images
- Actions:
  - Convert `Subject.png` if retained
  - Compress JPEGs with a tool like `sips`, `imageoptim`, or `sharp`
  - Serve dimensions matching layout (`width`/`height` attributes)

### 3.3 Reduce font payload
- Actions:
  - Load only actually used Inter weights (300, 400, 500, 600, 700, plus Bebas Neue)
  - Use `font-display: swap`
  - Remove legacy template font requests entirely by archiving legacy files

### 3.4 Avoid non-essential main-thread work
- Actions:
  - Defer heavy interactions until after initial load
  - Pause particle canvas off-screen
  - Lazy-load iframes and below-the-fold images
  - Consider removing button magnetic hover and 3D tilt on mobile/touch and reduced motion

## Phase 4 — Architecture cleanup (Needs approval partly)

### 4.1 Separate legacy templates
- Actions:
  - Move all TeleportHQ files under `legacy/`
  - Keep a single on-brand 404
  - Update `package.json` or remove if no longer using Parcel
- Needs approval:
  - Whether to keep template previews at all

### 4.2 Normalize JavaScript
- Actions:
  - Split `js/main.js` into modules over time: core, motion, gallery, forms, accessibility
  - Add error guards around canvas/form elements (already partially present)
  - Add analytics only if desired

### 4.3 Contact form verification
- Verify Formspree form endpoint and spam settings
- Add confirmation auto-reply
- Add privacy-safe success state
- Consider accessibility announcements (`aria-live`) for submit status

## Verification checklist

- All pages return 200 locally
- No required relative asset returns 404
- Lighthouse accessibility target: 90+
- Lighthouse performance target: 80+
- Keyboard navigation works without mouse
- Reduced-motion toggle makes all motion stop
- Hidden accessibility shortcut works without normal visitors encountering panel
- Forms submit successfully without network errors
- Mobile layout checked at 320px, 375px, 768px, 1024px, 1440px

## First autonomous actions to implement now

1. Replace legacy 404 page.
2. Fix component favicon references.
3. Add SEO metadata to main pages.
4. Add accessibility CSS utilities and reduced-motion handling.
5. Inject hidden accessibility settings panel (Alt+A / `?a11y=1`).
6. Make canvas/motion respect reduced-motion settings.
7. Update `SITE_REFERENCE.md` with completed/blocked items.

