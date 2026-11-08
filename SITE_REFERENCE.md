# McCormick Media website — reference and audit

Generated from a local audit of `/Users/aidanmccormick/Desktop/mccormick-media`.

## What this site is

- Static, hand-built portfolio and service site for **McCormick Media** (Aidan McCormick, photographer/videographer/brand manager).
- Hosted on **GitHub Pages** from `aidanmccormick1/mccormick-media` with custom domain **aidanmccormick.com** (`CNAME`).
- No build step is actually used for the live site. `package.json` names `media-i-thinl` and lists Parcel/Lottie, but the deployed pages are plain static HTML, CSS, and JS.
- Main design direction is documented in `DESIGN.md`: near-black surfaces, white type, electric blue accent, Bebas Neue display + Inter body.

## Top-level structure

```text
index.html                  Home
css/style.css               Main stylesheet (~42KB)
js/main.js                  Main JavaScript (~23KB)
pages/*.html                History, Work, Services, Contact, Terms
img/*                      Photography/logo assets (~1.8MB JPEG, ~7.5MB PNG)
public/*                   Favicon assets
CNAME, README.md, AGENTS.md, DESIGN.md
```

Also present but not part of the main site: `page.html`, `book-now.html`, `404.html`, `index.css`, `book-now.css`, `page.css`, `404.css`, `style.css`, and the entire `components/` directory. These are leftover TeleportHQ/template exports.

## Page map

| Page | Role | Main content |
| --- | --- | --- |
| `index.html` | Home | Hero, services preview, horizontal-scroll gallery, stats, featured video, web design iframe previews, CTA, footer |
| `pages/history.html` | About | Aidan bio, stats, CTA |
| `pages/services.html` | Services | Video production, photography, brand management packages |
| `pages/work.html` | Portfolio | 7 YouTube video projects + photo grid (30+ images) |
| `pages/contact.html` | Contact | Formspree contact form with animated submit success |
| `pages/terms.html` | Legal | Terms and conditions |
| `404.html` | Error page | TeleportHQ 404 template, not main-site styled |

## Design tokens in `css/style.css`

```css
--accent: #0066FF;
--accent2: #00C2FF;
--accent3: #FFB800;
--accent-dark: #0044CC;
--dark: #0A0A0A;
--dark2: #111111;
--dark3: #1A1A1A;
--light: #F5F5F5;
--muted: #888888;
--white: #FFFFFF;
--font-head: 'Bebas Neue', sans-serif;
--font-body: 'Inter', sans-serif;
--radius: 12px;
--transition: 0.3s ease;
```

Fonts are loaded from Google Fonts on every main page (`Inter` 300–900 + `Bebas Neue`).

## Main JavaScript features (`js/main.js`)

- Page loader
- Scroll progress bar
- Custom cursor (`cursorDot` + `cursorRing`)
- Canvas particle network in hero
- Hero headline character-by-character animation
- Sticky hero fade/parallax
- Horizontal scroll gallery calculation and transform
- Scroll-synced text reveals
- IntersectionObserver reveals
- Stats counter animation
- Nav scroll hide/show
- Typewriter headline
- Button magnetic hover
- Service card glow
- 3D card tilt
- Contact form submit to Formspree plus launch animation
- Active nav link detection
- Smooth anchor scrolling

## Integrations and external dependencies

- Forms: Formspree endpoint `https://formspree.io/f/xlgzlodb`
- Email: `mailto:am@aidanmccormick.com`
- Images: `../img/*` for local assets; `cdn.myportfolio.com/*` for 32 gallery images; `i.postimg.cc` for watermark
- Video: YouTube thumbnails via `img.youtube.com` and IDs in `data-vid`
- Web design previews: iframes for `aidanmccormick1.github.io/alessandro-truck-site`, `americanbeachvolleyballclub.com`, `learn.americanbeachvolleyballclub.com`
- Social links: LinkedIn, Instagram, YouTube
- CDNs: Google Fonts, Lottie, unpkg

## Form

`pages/contact.html` uses Formspree with `name`, `email`, `service`, and `message` fields. On success it hides the form, runs the launch animation, then shows `.form-success`. Form endpoint should be verified in Formspree before production use.

## Asset audit summary

Total repository size: about `9.7MB`.

| Asset group | Notes |
| --- | --- |
| `img/F*.jpg`, `S*.jpg` | Used by home gallery and work grid |
| `img/aidan-mccormick.jpg` | Used in about section (appears duplicate of `_DSC9805-2.jpg` by size/name) |
| `img/AM LOGO White.png` | Used in nav/footer |
| `img/AM LOGO.png` | Not referenced in main site |
| `img/Subject.png` | 6.9MB, not referenced in HTML/CSS/JS |
| `img/logo-white.png` | 0 bytes; unused |
| `img/.logo-white.png.tjRrdZ` | 95KB hidden temp file; unused |
| `public/am logo square.png` | Used as favicon |

Local image reference counts:
- Home: 6 local images + 8 CDN images
- Work: 6 local images + 24 CDN images; 7 YouTube video IDs

## Legacy/generated files in the repository

These do not share the main site's CSS or design system and appear to be old TeleportHQ exports:

- `page.html`, `book-now.html`, `404.html`
- `index.css`, `book-now.css`, `page.css`, `404.css`, root `style.css`
- `components/*.html` and matching `components/*.css`

They also reference `public/am logo square.png` as if located in the same directory, which resolves incorrectly when opened from `components/`.

## Broad issues found

1. **Third-party gallery dependency.** Home and Work depend on 32 images hosted on `cdn.myportfolio.com`. If that host changes or removes them, much of the portfolio disappears. There is no self-hosted fallback for most images.
2. **Large and unused assets.** `img/Subject.png` is 6.9MB and unused. Several other assets are duplicates or unused, and the repository is about 9.7MB mostly due to images.
3. **Inconsistent 404 experience.** The root `404.html` is a separate TeleportHQ template with unrelated fonts/layout and no main navigation/footer.
4. **Legacy file clutter.** The repository contains two generations of site code: the active McCormick Media system and older TeleportHQ exports. This makes maintenance and audits harder.
5. **Relative path problems in legacy previews.** Component files reference `public/...` instead of `../public/...`, so icons/previews break when opened directly.
6. **No SEO or social metadata.** Main pages have titles but no meta descriptions, canonical URLs, Open Graph, Twitter cards, or sitemap.
7. **Accessibility risks.** Global `cursor: none` relies on the custom cursor and is not keyboard-friendly. The hero canvas, gallery, and motion-heavy interactions do not have reduced-motion handling. Many gallery images use generic `alt="McCormick Media"`.
8. **Performance opportunities.** The home animation runs an O(n²) particle loop continuously, while many weighty CDN images are not optimized or converted to modern formats. Some large JavaScript interactions (magnetic hover, card tilt, canvas) are attached to every relevant element.
9. **Potential fragile footer/reference year.** Footer says `© 2025`, while repo/date context says 2026; verify current-year behavior is intended.
10. **Title typo in legacy files.** Several template files use the project name `Media I thinl`, not the live McCormick Media brand.

## Quick local commands

```bash
# Count files and repository size
du -sh .
# List images over 500KB
find img -type f -size +500k -exec ls -lh {} \;
# Search references to an asset
grep -R "Subject.png" . --exclude-dir=.git
```

## Completed in this audit pass

- Replaced the unrelated TeleportHQ `404.html` with an on-brand 404 page using the main stylesheet.
- Fixed component preview favicon paths from `public/...` to `../public/...`.
- Added per-page SEO metadata (description, canonical, Open Graph, Twitter cards).
- Added `robots.txt` and `sitemap.xml`.
- Added baseline accessibility CSS utilities, skip-link support, reduced-motion handling, and stronger-focus/body-class options.
- Added a background accessibility settings panel activated with `Alt+A` or `?a11y=1`, with persisted options.
- Added OS reduced-motion detection to the hero particle canvas.
