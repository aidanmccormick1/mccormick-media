# McCormick Media — light studio redesign

## Goal
Keep the existing photography, video projects, services, business facts, history,
contact information, website showcases, social links, and form destination. Take
inspiration from https://rivian.com/ in the spacious composition, emphasis on
photography, understated navigation, and cinematic movement. Retain McCormick
Media's identity and blue accent.

## Visual system
- Warm ivory #f5f3ed, paper white, charcoal #20231f, secondary text #62665d.
- Existing blue, deepened for readable text; use it for interaction and focus.
- The original Bebas Neue display type and Inter body text support
  long project descriptions and forms. Use sentence case and readable spacing.
- Generous editorial spacing, fine rules, square photographic frames, and
  slightly squared buttons. Work imagery carries the visual weight.

## Page plan
1. Home: split introduction and dimensional viewfinder; selected photography
   immediately follows; retain the full services, video, web-design,
   contact, and footer content.
2. Work: large light editorial title, accessible video/photo tabs, all existing
   projects, thumbnails, and photographs.
3. History: spacious portrait/story composition with the complete founder story
   and business facts.
4. Services: clean editorial groups with the existing offerings and booking links.
5. Contact: light form surface, clear labels and details, same submission endpoint,
   immediate success feedback instead of the previous countdown.
6. Terms: matching readable light layout with unchanged legal content.

## Motion
The opening is a CSS 3D viewfinder: photograph at the back, physical side walls,
a floor and front aperture around one photographic plane. Pointer movement
changes the viewing angle. Scroll moves the viewpoint forward through the frame.
The gallery uses native horizontal scrolling and previous/next controls, with
subtle perspective on desktop. Content stays visible immediately; do not repeat generic reveal animations. Avoid scroll hijacking, continuous particle rendering, and custom cursors.

Respect reduced-motion preferences and offer a persistent motion toggle. On small
screens use a flat, stable photograph and swipeable gallery. Keep content visible
without JavaScript. Motion updates run only on interaction, in animation frames.

## Verification
Check every primary route, local asset and link, retained content and form fields,
keyboard navigation, portfolio tabs, reduced motion, and representative phone,
tablet, and desktop widths. External embeds may depend on their hosts' permissions.

## Review against Spot the Slop
Reference: https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c

The visitor's journey is to see Aidan's photographs, inspect relevant work, choose
a service, and get in touch. Retain business facts, project descriptions, artwork,
and contact details while refining their presentation.

- Retain the original Bebas Neue display and Inter body fonts, as requested.
- Introduce Aidan directly; make service summaries and invitations conversational.
- Use named action, error, and success colour tokens.
- Give the lead film more space; remove decorative service numbers and the ticker.
- Preserve form input on errors and timeouts, with clear sending and retry states.
- Keep the 3D viewfinder; remove repeated fades and word cycling.
- Automatically load embedded website previews; direct site links remain available.

## Web Design presentation
The three existing websites load automatically with eager iframe sources, including
without JavaScript. Each preview sits in a browser window with physical edge depth,
lighting, and a quiet project-specific surface. Alessandro remains the lead project;
the club and learning platform follow in a staggered composition. ResizeObserver
scales a full desktop viewport into each frame so the website design stays legible.
The browser windows respond subtly to pointer movement, flatten during keyboard
interaction, and remain flat on phones, with reduced motion, or when motion is paused.
Direct live-site links are always available for third-party embed restrictions.
Typography restores the original Bebas Neue headings and Inter body text.

## Cover sequence
The opening contains one photographic frame. Remove floating photos that duplicate
the gallery. Four distinct local photographs play once at 1.7-second intervals with
short 220ms transitions, then hold the final image. Pause playback with the existing
motion setting, while the cover is offscreen, or when the page is hidden. Reduced
motion shows a stable frame. Images load automatically; missing images are skipped.
The hero section scrolls normally; only its inner viewfinder scene pins during the
opening, so it does not remain behind the rest of the page.

The homepage statistics strip is removed at the owner’s request.

## Featured film images
Show the corresponding YouTube video thumbnail for each homepage film: FIVE,
OCL 2024 Recap, DPFF Advertisement, and PTSA Short Film. Thumbnails link directly
to their videos; existing descriptions and portfolio links remain. Use the highest
available image resolution with fallbacks shared by the homepage and Work page.
If the thumbnail host fails, keep a readable invitation to watch the linked video.

The cover introduces digital creation and automation: websites, content, and
everyday business workflows, with Aidan as the direct point of contact.
