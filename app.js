import { archivePhotos } from '/data/photo-archive.js';
const images = {
  kayak:'/img/F2025_KAYAKING_-16.jpg',
  hallowheels:'/img/F25_Hallowheels_All_-21.jpg',
  athlete:'/img/S_2026_ARMFARM_APC-24.jpg',
  retirement:'/img/S26_Cathy’sRetirementParty-32.jpg',
  beach:'/assets/beach.jpg',
  volleyball:'/assets/volleyball.jpg',
  basketball:'/assets/basketball.jpg',
  event:'/assets/event.jpg'
};
const imageDescriptions = {kayak:'People with kayaks on the coast', hallowheels:'Hallowheels event', athlete:'Athlete portrait', retirement:'Retirement celebration', beach:'Family at the beach', volleyball:'Beach volleyball', basketball:'Basketball game', event:'Event under blue lighting'};
const photos = [
  ['Kayaking', images.kayak, 'Coast / 2025'],
  ['Hallowheels', images.hallowheels, 'Event / 2025'],
  ['Athlete', images.athlete, 'Sport / 2026'],
  ['Retirement', images.retirement, 'People / 2026']
];
const films = [
  ['FIVE', 'Leadership campaign', 'https://www.youtube.com/watch?v=oI9p2Z92RQ8'],
  ['OCL 2024 Recap', 'Conference recap', 'https://www.youtube.com/watch?v=7EXa5hYzCig'],
  ['OCL 2025 Recap', 'Conference recap', 'https://www.youtube.com/watch?v=kSD1K-4DFY0'],
  ['OCL 2026 Recap', 'Conference recap', 'https://www.youtube.com/watch?v=xVVZRi2lfjs'],
  ['DPFF Advertisement', 'Film festival project', 'https://www.youtube.com/watch?v=Q7CAsF3_qAI'],
  ['Dana Hills Football', 'Season recap', 'https://www.youtube.com/watch?v=d2Arwz-hlMc'],
  ['PTSA Short Film', 'Short film', 'https://www.youtube.com/watch?v=UeoR4JYEkCY']
];
const websites = [
  ['Alessandro', 'Local service website', 'https://aidanmccormick1.github.io/alessandro-truck-site/'],
  ['American Beach Volleyball Club', 'Club website', 'https://americanbeachvolleyballclub.com/'],
  ['ABVC Learn', 'Learning platform', 'https://learn.americanbeachvolleyballclub.com/']
];
const links = [['Overview','/'],['Work','/pages/work.html'],['Web','/pages/web-design.html'],['About','/pages/history.html'],['Services','/pages/services.html']];
const pathname = location.pathname;
const page = pathname.includes('web-design')?'web':pathname.includes('work.html')?'work':pathname.includes('history')?'about':pathname.includes('services')?'services':pathname.includes('contact')?'contact':'home';
const escapeHTML = str => String(str).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const photo = (src, alt, cls='', eager=false) => `<img class="${cls}" src="${src}" alt="${escapeHTML(alt)}" loading="${eager?'eager':'lazy'}" decoding="async" ${eager?'fetchpriority="high"':''}>`;
const outbound = (url,label,cls='') => url?`<a class="${cls}" href="${url}" target="_blank" rel="noopener noreferrer">${label}<span aria-hidden="true"> ↗</span></a>`:`<span class="archive-note">Archive / ${label}</span>`;
const contour = `<svg class="contour" viewBox="0 0 280 250" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet"><path d="M-33 201C13 187 2 142 68 135c48-6 76 24 116-7 31-23 8-68 58-93 18-9 37-6 58-16"/><path d="M-37 215C16 205 11 156 70 149c52-5 80 22 124-9 29-21 15-65 58-88 23-12 42-5 58-14"/><path d="M-36 230C24 220 22 167 73 163c55-4 86 17 129-12 35-23 17-60 62-84 21-11 38-6 57-15"/><path d="M-34 245C33 231 33 181 78 177c61-5 84 13 129-16 35-22 25-55 64-77 25-15 43-9 60-17"/><path d="M-37 263C42 242 42 195 84 191c59-5 90 10 133-19 37-24 28-50 66-71 26-14 46-10 62-20"/></svg>`;
const header = `<header class="header" id="top"><a class="identity" href="/" aria-label="Aidan McCormick home"><img class="identity-logo" src="/img/AM%20LOGO.png" alt=""><span class="identity-type">McCormick Media</span></a><nav class="nav" aria-label="Main navigation">${links.map(([n,u])=>`<a href="${u}" ${((page==='home'&&u==='/')||(page==='web'&&u.includes('web-design'))||(page==='about'&&u.includes('history'))||(page==='work'&&u.includes('work.html'))||(page==='services'&&u.includes('services')))?'aria-current="page"':''}>${n}</a>`).join('')}<a class="contact-link" href="/pages/contact.html">Contact</a></nav><button class="menu-button" type="button" aria-expanded="false" aria-controls="mobile-nav">Menu <span aria-hidden="true">+</span></button></header><nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden>${links.map(([n,u])=>`<a href="${u}">${n}</a>`).join('')}<a href="/pages/contact.html">Contact</a></nav>`;
const footer = `<footer class="footer"><div><span class="micro">AM / FIELD NOTES</span><p>Independent work in photo, video, web, and digital systems.</p></div><div class="footer-right"><a href="mailto:am@aidanmccormick.com">am@aidanmccormick.com</a><span>Orange County / Santa Barbara</span><span>© ${new Date().getFullYear()} Aidan McCormick</span></div></footer>`;
const contactLine = `<div class="contact-line"><span class="micro">CONTACT</span><div><p>Something in mind?</p><a href="/pages/contact.html">Get in touch <span aria-hidden="true">↗</span></a></div></div>`;
function sitePreview(site, index) {return `<article class="site-project" data-reveal><div class="site-project-heading"><div><span class="micro">WEB / ${String(index+1).padStart(2,'0')}</span><h2>${site[0]}</h2></div>${outbound(site[2],'Open site','row-link')}</div><div class="live-browser"><div class="live-toolbar"><span>${new URL(site[2]).hostname}</span><button type="button" class="browse-toggle" aria-pressed="false">Browse site</button></div><div class="live-viewport"><iframe src="${site[2]}" title="${site[0]} live website" loading="lazy" tabindex="-1" inert referrerpolicy="strict-origin-when-cross-origin"></iframe><button type="button" class="preview-cover" aria-label="Browse ${site[0]} inside this page"><span>Browse site <b aria-hidden="true">↗</b></span></button></div></div></article>`}
function home(){return `<main class="experience">
<section class="opening-scene scene group-inspired" id="overview"><div class="hero-composition"><div class="opening-image">${photos.map((p,i)=>photo(p[1],p[0],`hero-carousel-photo ${i===0?'active':''}`,i===0)).join('')}</div><a class="floating-project project-left" href="/pages/work.html#photography"><span>BEHIND THE LENS</span><strong id="hero-project-name">Kayaking</strong><small>View photography ↗</small></a><a class="floating-project project-right" href="/pages/web-design.html"><span>BUILT FOR THE WEB</span><strong>Ideas you<br>can click.</strong><small>Browse live projects ↗</small></a><div class="hero-carousel-controls" aria-label="Featured photograph controls">${photos.map((p,i)=>`<button type="button" class="hero-dot ${i===0?'active':''}" data-slide="${i}" aria-label="Show ${p[0]} photograph" aria-pressed="${i===0}"></button>`).join('')}<button type="button" class="hero-cycle" aria-label="Pause photo carousel" aria-pressed="false">Ⅱ</button></div></div><div class="opening-copy"><h1>Good work.<br><i>Different forms.</i></h1><div class="hero-actions"><a class="hero-pill hero-pill-outline" href="/pages/work.html">View the work <span aria-hidden="true">↗</span></a><a class="hero-pill hero-pill-solid" href="/pages/contact.html">Let's talk</a></div></div></section>
<section class="field-stage scene" id="image-studies" aria-label="Featured photography"><div class="field-photo-wrap">${photos.map((p,i)=>photo(p[1],p[0],`field-photo ${i===0?'active':''}`)).join('')}</div><div class="photo-caption"><div aria-live="polite"><span class="micro">PHOTOGRAPHY</span><strong id="photo-title">Kayaking</strong><span id="photo-meta">Coast / 2025</span></div><div class="photo-controls"><span id="photo-counter">01 / 04</span><button type="button" id="photo-prev" aria-label="Previous image">←</button><button type="button" id="photo-next" aria-label="Next image">→</button></div></div><a class="scene-link photo-archive-link" href="/pages/work.html#photography">Photo archive ↗</a></section>
<section class="film-scene scene" id="moving-image"><div class="scene-media">${photo(images.event,'Event under blue lighting')}</div><div class="scene-copy"><span class="micro">FILM / MOVING IMAGE</span><h2>Stories<br><i>in motion.</i></h2>${outbound(films[0][2],'Watch FIVE','scene-link')}<a href="/pages/work.html#film" class="scene-link">All films ↗</a></div><span class="scene-number" aria-hidden="true">03 / 05</span></section>
<section class="web-scene scene" id="digital"><div class="web-scene-intro" data-reveal><span class="micro">DESIGN / DEVELOPMENT</span><h2>Out in<br><i>the world.</i></h2><a class="scene-link" href="/pages/web-design.html">All web projects ↗</a></div>${sitePreview(websites[0],0)}</section>
<section class="closing-scene scene"><span class="micro">YOUR NEXT PROJECT</span><h2>What are<br><i>you making?</i></h2><a class="scene-link" href="/pages/contact.html">Tell me about it ↗</a><span class="scene-number" aria-hidden="true">05 / 05</span></section>
</main>`}
function work(){return `<main class="subpage"><section class="page-heading"><span class="micro">FIELD / 01</span><h1>Photo & moving image</h1><p>People, places, movement, and stories. A selection from the archive.</p></section><section class="collection archive-collection" id="photography"><div class="section-heading"><h2>Photo archive</h2><div class="archive-controls"><span id="archive-position" aria-live="polite">01 / ${archivePhotos.length}</span><button type="button" id="archive-prev" aria-label="Previous photograph" aria-controls="photo-rail">←</button><button type="button" id="archive-next" aria-label="Next photograph" aria-controls="photo-rail">→</button></div></div><div class="photo-rail" id="photo-rail" role="region" aria-label="Photo archive. Swipe or use the arrow keys to browse." tabindex="0">${archivePhotos.map((image,i)=>`<figure class="archive-photo"><img src="${image.src}" alt="${escapeHTML(image.alt)}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async"><figcaption>${String(i+1).padStart(2,'0')}</figcaption></figure>`).join('')}</div></section><section class="collection" id="film"><div class="section-heading"><span class="micro">FILM & VIDEO</span><span class="section-no">02 / 07</span></div><div class="simple-list">${films.map((f,i)=>`<div class="list-row"><span>${String(i+1).padStart(2,'0')}</span><div><strong>${f[0]}</strong><small>${f[1]}</small></div>${outbound(f[2],'Watch','row-link')}</div>`).join('')}</div></section>${contactLine}</main>`}
function web(){return `<main class="subpage web-page"><section class="page-heading"><span class="micro">DESIGN / DEVELOPMENT</span><h1>Work for the web</h1></section><section class="site-previews" aria-label="Live website projects">${websites.map(sitePreview).join('')}</section>${contactLine}</main>`}
function about(){return `<main class="subpage"><section class="page-heading"><span class="micro">FIELD / 03</span><h1>A little background</h1><p>I'm Aidan. I make photographs, films, websites, and systems. I don't think those things have to be separate.</p></section><section class="about-layout"><div class="about-photo">${photo(images.kayak,'People and kayaks on the coast')}</div><div><span class="micro">AN OPEN-ENDED PRACTICE</span><p>I started with photography and kept finding new ways to make things. Video, web development, and digital tools became part of the same process.</p><p>Most of my work is about understanding what a project needs, then choosing the right way to make it.</p><p>Based between Orange County and Santa Barbara, California.</p></div></section>${contactLine}</main>`}
function services(){return `<main class="subpage"><section class="page-heading"><span class="micro">FIELD / 04</span><h1>Ways I can help</h1><p>There isn't a fixed package for everything. The work depends on the project.</p></section><div class="simple-list service-list">${[['Photography','Events, sports, portraits, and gatherings.'],['Film & video','Coverage, campaigns, recaps, and editing.'],['Web design','Websites that make sense for real users.'],['Digital systems','Automation and practical technical workflows.'],['Content','Creative support from planning through delivery.']].map((s,i)=>`<div class="list-row"><span>${String(i+1).padStart(2,'0')}</span><div><strong>${s[0]}</strong><small>${s[1]}</small></div></div>`).join('')}</div>${contactLine}</main>`}
function contact(){return `<main class="subpage"><section class="page-heading"><span class="micro">FIELD / 05</span><h1>Get in touch</h1><p>A project, a question, or just an idea that needs figuring out.</p></section><section class="contact-layout"><div class="contact-info"><span class="micro">DIRECT EMAIL</span><a href="mailto:am@aidanmccormick.com">am@aidanmccormick.com ↗</a><p>Orange County / Santa Barbara</p>${contour}</div><form id="contact-form" class="contact-form" action="https://formspree.io/f/xlgzlodb" method="POST"><label>Name<input name="name" required autocomplete="name" placeholder="Your name"></label><label>Email<input type="email" name="email" required autocomplete="email" placeholder="you@example.com"></label><label>Project type<select name="service"><option>General inquiry</option><option>Photography</option><option>Video</option><option>Website</option><option>Automation</option><option>Other</option></select></label><label>What are you working on?<textarea name="message" rows="5" required placeholder="A few details are enough."></textarea></label><button type="submit">Send message ↗</button></form></section></main>`}
const content = {home,work,web,about,services,contact};
document.getElementById('app').innerHTML=`<div class="site-shell">${header}${content[page]()}${footer}</div>`;
if (location.hash) requestAnimationFrame(() => {const hash = decodeURIComponent(location.hash.slice(1)); const target = ({video:'film',films:'film','photo-gallery':'photography'})[hash] || hash; document.getElementById(target)?.scrollIntoView();});
document.title = ({home:'Aidan McCormick | Creative work across mediums',work:'Work | Aidan McCormick',web:'Web Design | Aidan McCormick',about:'About | Aidan McCormick',services:'Services | Aidan McCormick',contact:'Contact | Aidan McCormick'})[page];
const menu = document.querySelector('.menu-button'); const mobile = document.querySelector('.mobile-nav');
menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));mobile.hidden=expanded;});
const fields=[...document.querySelectorAll('.field-photo')]; if(fields.length){let active=0;const show=()=>{fields.forEach((node,i)=>node.classList.toggle('active',i===active));document.getElementById('photo-title').textContent=photos[active][0];document.getElementById('photo-meta').textContent=photos[active][2];document.getElementById('photo-counter').textContent=`0${active+1} / 04`;}; document.getElementById('photo-prev').addEventListener('click',()=>{active=(active+fields.length-1)%fields.length;show()});document.getElementById('photo-next').addEventListener('click',()=>{active=(active+1)%fields.length;show()});}


document.body.classList.add(`page-${page}`);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.createElement('button');
motionButton.type = 'button'; motionButton.className = 'motion-toggle';
let motionOff = reducedMotion.matches;
const syncMotion = () => {document.body.classList.toggle('motion-off', motionOff); motionButton.textContent = motionOff ? 'Motion off' : 'Motion on'; motionButton.setAttribute('aria-pressed', String(!motionOff));};
motionButton.addEventListener('click', () => {motionOff = !motionOff; syncMotion();});
reducedMotion.addEventListener('change', event => {motionOff = event.matches; syncMotion();});
document.body.append(motionButton); syncMotion();
const revealTargets = document.querySelectorAll('[data-reveal], .page-heading, .gallery-figure, .list-row, .about-layout, .contact-layout, .contact-line');
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {if (entry.isIntersecting) {if (!motionOff) entry.target.animate([{opacity:0, transform:'translateY(70px) rotateX(5deg)'},{opacity:1, transform:'translateY(0) rotateX(0)'}], {duration:850,easing:'cubic-bezier(.16,1,.3,1)'}); revealObserver.unobserve(entry.target);}}), {threshold:.12});
revealTargets.forEach(element => revealObserver.observe(element));
const previewCards = document.querySelectorAll('.site-project');
previewCards.forEach(card => {
 const toggle = card.querySelector('.browse-toggle'), cover = card.querySelector('.preview-cover'), frame = card.querySelector('iframe');
 const setActive = active => {card.classList.toggle('is-browsing', active); frame.inert = !active; frame.tabIndex = active ? 0 : -1; toggle.setAttribute('aria-pressed', String(active)); toggle.textContent = active ? 'Done browsing' : 'Browse site'; cover.hidden = active;};
 toggle.addEventListener('click', () => setActive(!card.classList.contains('is-browsing')));
 cover.addEventListener('click', () => {setActive(true); frame.focus();});
 card.addEventListener('keydown', event => {if(event.key === 'Escape') {setActive(false); toggle.focus();}});
});
const animatedScenes = [...document.querySelectorAll('.opening-scene, .film-scene')];
let motionFrame = null;
const renderMotion = () => {
 motionFrame = null;
 animatedScenes.forEach(scene => {const box = scene.getBoundingClientRect(); const image = scene.querySelector('.opening-image, .scene-media'); if (motionOff || box.bottom < 0 || box.top > innerHeight) {if (motionOff) image.style.transform = ''; return;} const progress = Math.max(-1,Math.min(1,box.top/innerHeight)); image.style.transform = `translate3d(0,${progress * -65}px,0) scale(${1.12 + Math.abs(progress)*.06})`;});
};
window.addEventListener('scroll', () => {if(!motionFrame) motionFrame = requestAnimationFrame(renderMotion);}, {passive:true});
window.addEventListener('resize', renderMotion); motionButton.addEventListener('click', renderMotion); renderMotion();
menu.addEventListener('keydown', event => {if(event.key === 'Escape') {mobile.hidden = true; menu.setAttribute('aria-expanded','false');}});

const heroPhotos = [...document.querySelectorAll('.hero-carousel-photo')];
if (heroPhotos.length) {
 let current = 0, carouselPaused = false, carouselTimer;
 const dots = [...document.querySelectorAll('.hero-dot')], cycle = document.querySelector('.hero-cycle');
 const showHero = index => {current = index; heroPhotos.forEach((image,i) => image.classList.toggle('active', i === current)); dots.forEach((dot,i) => {dot.classList.toggle('active',i === current);dot.setAttribute('aria-pressed',String(i === current));});document.getElementById('hero-project-name').textContent = photos[current][0];};
 const schedule = () => {clearInterval(carouselTimer);if(!motionOff && !carouselPaused && !document.hidden) carouselTimer = setInterval(() => showHero((current+1)%heroPhotos.length),5000);};
 dots.forEach((dot,index) => dot.addEventListener('click',() => {showHero(index);schedule();}));
 cycle.addEventListener('click',() => {carouselPaused = !carouselPaused;cycle.textContent = carouselPaused ? '▶' : 'Ⅱ';cycle.setAttribute('aria-label',carouselPaused ? 'Play photo carousel' : 'Pause photo carousel');cycle.setAttribute('aria-pressed',String(carouselPaused));schedule();});
 motionButton.addEventListener('click',schedule);reducedMotion.addEventListener('change',schedule);document.addEventListener('visibilitychange',schedule);schedule();
}

const photoRail = document.getElementById('photo-rail');
if (photoRail) {
 const items = [...photoRail.querySelectorAll('.archive-photo')], previous = document.getElementById('archive-prev'), next = document.getElementById('archive-next'), position = document.getElementById('archive-position');
 let selected = 0, settleTimer, dragging = false, dragStart = 0, scrollStart = 0;
 const updateRail = () => {selected = items.reduce((best,item,index) => Math.abs(item.offsetLeft-photoRail.scrollLeft) < Math.abs(items[best].offsetLeft-photoRail.scrollLeft) ? index : best,0); if(photoRail.scrollLeft >= photoRail.scrollWidth-photoRail.clientWidth-2) selected = items.length-1; position.textContent = `${String(selected+1).padStart(2,'0')} / ${items.length}`; previous.disabled = photoRail.scrollLeft < 2; next.disabled = photoRail.scrollLeft >= photoRail.scrollWidth-photoRail.clientWidth-2;};
 const go = index => {index = Math.max(0,Math.min(items.length-1,index));photoRail.scrollTo({left:items[index].offsetLeft,behavior:motionOff ? 'instant' : 'smooth'});};
 previous.addEventListener('click',() => go(selected-1));next.addEventListener('click',() => go(selected+1));
 photoRail.addEventListener('keydown',event => {if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) {event.preventDefault();go(event.key === 'Home' ? 0 : event.key === 'End' ? items.length-1 : selected+(event.key === 'ArrowRight' ? 1 : -1));}});
 photoRail.addEventListener('scroll',() => {clearTimeout(settleTimer);settleTimer = setTimeout(updateRail,100);},{passive:true});
 photoRail.addEventListener('pointerdown',event => {if(event.pointerType !== 'mouse' || event.button !== 0) return; dragging = true;dragStart=event.clientX;scrollStart=photoRail.scrollLeft;photoRail.setPointerCapture(event.pointerId);photoRail.classList.add('is-dragging');});
 photoRail.addEventListener('pointermove',event => {if(dragging) photoRail.scrollLeft=scrollStart-(event.clientX-dragStart);});
 const endDrag = () => {dragging=false;photoRail.classList.remove('is-dragging');updateRail();};
 photoRail.addEventListener('pointerup',endDrag);photoRail.addEventListener('pointercancel',endDrag);
 photoRail.querySelectorAll('img').forEach(image => image.addEventListener('dragstart',event => event.preventDefault()));
 window.addEventListener('resize',updateRail);updateRail();
}
