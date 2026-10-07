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
- Archivo display type evokes photographic signage; Source Sans 3 supports
  long project descriptions and forms. Use sentence case and readable spacing.
- Generous editorial spacing, fine rules, square photographic frames, and
  slightly squared buttons. Work imagery carries the visual weight.

## Page plan
1. Home: split introduction and dimensional viewfinder; selected photography
   immediately follows; retain the full services, stats, video, web-design,
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
a floor, front aperture, and two floating photographic planes. Pointer movement
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

- Pair Archivo display type with Source Sans 3 body text.
- Introduce Aidan directly; make service summaries and invitations conversational.
- Use named action, error, and success colour tokens.
- Give the lead film more space; remove decorative service numbers and the ticker.
- Preserve form input on errors and timeouts, with clear sending and retry states.
- Keep the 3D viewfinder; remove repeated fades and word cycling.
- Load embedded website previews on request, with direct site links always available.
