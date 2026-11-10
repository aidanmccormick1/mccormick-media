import { archivePhotos as originalArchivePhotos } from '/data/photo-archive.js';
const wallOrder = [0,18,9,25,4,22,11,2,1,27,15,3,12,20,8,5,6,23,16,10,7,26,14,21,13,24,17,19];
const archivePhotos = wallOrder.map(index => originalArchivePhotos[index]);
const featuredPhotos = [0,1,12,2,3,25].map(index => originalArchivePhotos[index]);
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
const films = [
  ['FIVE', 'https://www.youtube.com/watch?v=oI9p2Z92RQ8'],
  ['OCL 2024 Recap', 'https://www.youtube.com/watch?v=7EXa5hYzCig'],
  ['OCL 2025 Recap', 'https://www.youtube.com/watch?v=kSD1K-4DFY0'],
  ['OCL 2026 Recap', 'https://www.youtube.com/watch?v=xVVZRi2lfjs'],
  ['DPFF Advertisement', 'https://www.youtube.com/watch?v=Q7CAsF3_qAI'],
  ['Dana Hills Football', 'https://www.youtube.com/watch?v=d2Arwz-hlMc'],
  ['PTSA Short Film', 'https://www.youtube.com/watch?v=UeoR4JYEkCY']
];
const oclFilms = films.filter(([title]) => /^OCL \d{4} Recap$/.test(title)).sort((a,b) => a[0].localeCompare(b[0]));
const websites = [
  ['Alessandro', 'Local service website', 'https://aidanmccormick1.github.io/alessandro-truck-site/'],
  ['American Beach Volleyball Club', 'Club website', 'https://americanbeachvolleyballclub.com/'],
  ['ABVC Learn', 'Learning platform', 'https://learn.americanbeachvolleyballclub.com/']
];
const links = [['Overview','/'],['Work','/pages/work/'],['Web','/pages/web-design/'],['About','/pages/history/'],['Services','/pages/services/']];
const pathname = location.pathname;
const page = pathname.includes('/terms')?'terms':pathname.includes('404.html')?'notFound':pathname.includes('web-design')?'web':pathname.includes('/work')?'work':pathname.includes('history')?'about':pathname.includes('services')?'services':pathname.includes('contact')?'contact':'home';
const escapeHTML = str => String(str).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const photo = (src, alt, cls='', eager=false) => `<img class="${cls}" src="${src}" alt="${escapeHTML(alt)}" loading="${eager?'eager':'lazy'}" decoding="async" ${eager?'fetchpriority="high"':''}>`;
const outbound = (url,label,cls='') => url?`<a class="${cls}" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`:`<span class="archive-note">Archive / ${label}</span>`;
const contour = `<svg class="contour" viewBox="0 0 280 250" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet"><path d="M-33 201C13 187 2 142 68 135c48-6 76 24 116-7 31-23 8-68 58-93 18-9 37-6 58-16"/><path d="M-37 215C16 205 11 156 70 149c52-5 80 22 124-9 29-21 15-65 58-88 23-12 42-5 58-14"/><path d="M-36 230C24 220 22 167 73 163c55-4 86 17 129-12 35-23 17-60 62-84 21-11 38-6 57-15"/><path d="M-34 245C33 231 33 181 78 177c61-5 84 13 129-16 35-22 25-55 64-77 25-15 43-9 60-17"/><path d="M-37 263C42 242 42 195 84 191c59-5 90 10 133-19 37-24 28-50 66-71 26-14 46-10 62-20"/></svg>`;
const header = `<header class="header" id="top"><a class="identity" href="/" aria-label="Aidan McCormick home"><img class="identity-logo" src="/img/AM%20LOGO.png" alt=""><span class="identity-type">McCormick Media</span></a><nav class="nav" aria-label="Main navigation">${links.map(([n,u])=>`<a href="${u}" ${((page==='home'&&u==='/')||(page==='web'&&u.includes('web-design'))||(page==='about'&&u.includes('history'))||(page==='work'&&u.includes('/work'))||(page==='services'&&u.includes('services')))?'aria-current="page"':''}>${n}</a>`).join('')}<a class="contact-link" href="/pages/contact/">Contact</a></nav><button class="menu-button" type="button" aria-expanded="false" aria-controls="mobile-nav">Menu <span aria-hidden="true">+</span></button></header><nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden>${links.map(([n,u])=>`<a href="${u}">${n}</a>`).join('')}<a href="/pages/contact/">Contact</a></nav>`;
const footer = `<footer class="footer"><div><strong>McCormick Media</strong><p class="footer-bio">I'm an AI entrepreneur and media creator based in Santa Barbara, California. My work spans artificial intelligence and software development, media production, photography and videography, creative technology, and web design and development. I started in photography and kept finding new ways to make things. Video, web development, and digital tools became part of the same process. I focus on understanding what a project needs and choosing the right way to make it. I work across Santa Barbara and Orange County.</p></div><div class="footer-right"><a href="mailto:am@aidanmccormick.com">am@aidanmccormick.com</a><span>Orange County / Santa Barbara</span><span>© ${new Date().getFullYear()} Aidan McCormick</span><a href="/pages/terms/">Terms</a></div></footer>`;
const contactLine = `<div class="contact-line"><div><p>Something in mind?</p><a href="/pages/contact/">Get in touch</a></div></div>`;
function filmPlayer(film) {
 const id = new URL(film[1]).searchParams.get('v');
 return `<article class="film-project" data-reveal><div class="film-project-heading"><h3>${film[0]}</h3></div><div class="video-embed" data-video-id="${id}" data-video-title="${escapeHTML(film[0])}"><img class="video-poster" src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy" decoding="async"><button class="video-play" type="button" data-play-video aria-label="Play ${escapeHTML(film[0])}"><span aria-hidden="true"></span><span>Play</span></button></div></article>`;
}
function filmCollection() {
 return films.map(film => {
  if(film===oclFilms[0]) return `<section class="ocl-series" aria-labelledby="ocl-series-title"><h2 id="ocl-series-title">Three years of OCL coverage!</h2><div class="ocl-series-grid">${oclFilms.map(filmPlayer).join('')}</div></section>`;
  return oclFilms.includes(film) ? '' : filmPlayer(film);
 }).join('');
}
function sitePreview(site, index) {return `<article class="site-project is-browsing" data-reveal><div class="site-project-heading"><div><h2>${site[0]}</h2></div>${outbound(site[2],'Open site','row-link')}</div><div class="live-browser"><div class="live-toolbar"><span>${new URL(site[2]).hostname}</span><button type="button" class="browse-toggle" aria-pressed="true">Pause preview</button></div><div class="live-viewport"><iframe src="${site[2]}" title="${site[0]} live website" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe><button type="button" class="preview-cover" hidden aria-label="Browse ${site[0]} inside this page"><span>Browse site</span></button></div></div></article>`}
const sceneIcons = {
 camera:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 6h4l2-3h4l2 3h4v14H4z"/><circle cx="12" cy="12" r="4"/></svg>',
 web:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01M13 6.5h.01"/></svg>'
};
function home(){return `<main class="experience">
<section class="opening-scene scene group-inspired" id="overview"><div class="hero-composition"><div class="hero-grid" aria-hidden="true"><span>+</span><span>+</span><span>+</span><span>+</span></div><div class="opening-image">${photo(images.kayak,'People with kayaks on the coast','hero-still',true)}</div><a class="floating-project project-left" href="#image-studies" aria-label="Photography"><span class="project-icon">${sceneIcons.camera}</span><strong>Photo</strong></a><a class="floating-project project-right" href="#digital" aria-label="Web projects"><span class="project-icon">${sceneIcons.web}</span><strong>Web</strong></a><a class="floating-film" href="#moving-image" aria-label="Browse films">Film</a></div><div class="opening-copy"><h1><span>PHOTO.</span><span>FILM.</span><span>WEB.</span></h1><div class="hero-actions"><a class="hero-pill hero-pill-outline" href="/pages/work/">View the work</a><a class="hero-pill hero-pill-solid" href="/pages/contact/">Let's talk</a></div></div></section>
<section class="field-stage scene" id="image-studies" aria-label="Featured photography"><div class="field-copy"><h2>Photography</h2><a class="scene-link photo-archive-link" href="/pages/work/#photography">See all photos</a></div><div class="featured-gallery"><div class="featured-rail" tabindex="0" role="region" aria-label="Featured photographs. Swipe or use left and right arrow keys to browse.">${featuredPhotos.map((image,i)=>`<div class="featured-slide" role="group" aria-label="Photograph ${i+1} of ${featuredPhotos.length}"><img src="${image.src}" alt="${escapeHTML(image.alt)}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async"></div>`).join('')}</div><nav class="featured-thumbnails" aria-label="Choose a photograph">${featuredPhotos.map((image,i)=>`<button type="button" data-featured-photo="${i}" aria-label="Show ${escapeHTML(image.alt)}" ${i===0?'aria-current="true"':''}><img src="${image.src}" alt="" width="${image.width}" height="${image.height}" loading="lazy" decoding="async"></button>`).join('')}</nav></div></section>
<section class="film-scene scene embedded-film-scene" id="moving-image"><div class="scene-copy"><h2>Stories<br><i>in motion.</i></h2><a href="/pages/work/#film" class="scene-link">All films</a></div>${filmPlayer(films[0])}</section>
<section class="web-scene scene" id="digital"><div class="web-scene-intro" data-reveal><h2>Out in<br><i>the world.</i></h2><a class="scene-link" href="/pages/web-design/">All web projects</a></div>${sitePreview(websites[0],0)}</section>
<section class="closing-scene scene" id="next-project"><h2>What are<br><i>you making?</i></h2><a class="scene-link" href="/pages/contact/">Tell me about it</a></section>
<nav class="scene-dots" aria-label="Jump to a scene">${[["overview","Overview"],["image-studies","Photography"],["moving-image","Film"],["digital","Web"],["next-project","Contact"]].map(([id,label])=>`<a href="#${id}" aria-label="${label}" title="${label}"><span></span></a>`).join('')}</nav></main>`}
function work(){return `<main class="subpage"><section class="page-heading"><h1>Photo &amp; video</h1></section><section class="collection archive-collection" id="photography"><div class="wall-stage"><div class="section-heading"><div><span class="micro">ALPINE / IMAGE STUDIES</span><h2>Photo wall</h2></div></div><div class="wall-base"><div class="wall-landscape" aria-hidden="true">${contour}</div><div class="photo-rail photo-wall" id="photo-rail" role="region" aria-label="Photo wall. Scroll down to explore, or use the section buttons and arrow keys. Select a photo to enlarge it." tabindex="0">${Array.from({length:Math.ceil(archivePhotos.length/4)},(_,panel)=>`<div class="wall-panel">${archivePhotos.slice(panel*4,panel*4+4).map((image,offset)=>{const i=panel*4+offset;return `<button class="wall-photo" type="button" data-photo="${i}" aria-label="Open photo ${i+1}: ${escapeHTML(image.alt)}"><img src="${image.src}" alt="${escapeHTML(image.alt)}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async"><span class="wall-photo-number">${String(i+1).padStart(2,'0')}</span><span class="wall-photo-open" aria-hidden="true">View</span></button>`;}).join('')}</div>`).join('')}</div></div><div class="wall-bottom"><nav class="wall-dots" aria-label="Photo wall sections">${Array.from({length:Math.ceil(archivePhotos.length/4)},(_,i)=>`<button type="button" data-wall-section="${i}" aria-label="Photos ${i*4+1} to ${Math.min(i*4+4,archivePhotos.length)}" ${i===0?'aria-current="true"':''}><span></span></button>`).join('')}</nav></div></div><dialog class="photo-viewer" aria-label="Enlarged photograph"><div class="viewer-toolbar"><span class="micro">IMAGE STUDIES</span><span id="viewer-position" aria-live="polite"></span><button type="button" id="viewer-close" aria-label="Close photograph">Close</button></div><div class="viewer-stage"><button type="button" id="viewer-prev" aria-label="Previous photograph">Previous</button><img id="viewer-image" alt=""><button type="button" id="viewer-next" aria-label="Next photograph">Next</button></div></dialog></section><section class="collection" id="film"><div class="film-grid">${filmCollection()}</div></section>${contactLine}</main>`}
function web(){return `<main class="subpage web-page"><section class="page-heading"><h1>Work for the web</h1></section><section class="site-previews" aria-label="Live website projects">${websites.map(sitePreview).join('')}</section>${contactLine}</main>`}
function about(){return `<main class="subpage"><section class="page-heading"><h1>About me</h1></section><section class="about-layout"><div class="about-photo">${photo('/img/aidan-mccormick.jpg','Aidan McCormick')}</div><div><p>I'm an AI entrepreneur and media creator based in Santa Barbara, California. My work spans artificial intelligence and software development, media production, photography and videography, creative technology, and web design and development. I started in photography and kept finding new ways to make things. Video, web development, and digital tools became part of the same process. I focus on understanding what a project needs and choosing the right way to make it. I work across Santa Barbara and Orange County.</p></div></section>${contactLine}</main>`}
function services(){return `<main class="subpage"><section class="page-heading"><h1>Ways I can help</h1></section><div class="simple-list service-list">${['Photography','Film & video','Web design','Digital systems','Content'].map(service=>`<div class="list-row"><div><strong>${service}</strong></div></div>`).join('')}</div><section class="ai-services" aria-labelledby="ai-services-title"><h2 id="ai-services-title">AI tools &amp; workflows</h2><p>Practical AI support for content, research, and everyday tasks.</p></section>${contactLine}</main>`}
function contact(){return `<main class="subpage"><section class="page-heading"><h1>Get in touch</h1></section><section class="contact-layout"><div class="contact-info"><a href="mailto:am@aidanmccormick.com">am@aidanmccormick.com</a><p>Orange County / Santa Barbara</p>${contour}</div><form id="contact-form" class="contact-form" action="https://formspree.io/f/xlgzlodb" method="POST"><label>Name<input name="name" required autocomplete="name" placeholder="Your name"></label><label>Email<input type="email" name="email" required autocomplete="email" placeholder="you@example.com"></label><label>Project type<select name="service"><option>General inquiry</option><option>Photography</option><option>Video</option><option>Website</option><option>Automation</option><option>Other</option></select></label><label>What are you working on?<textarea name="message" rows="5" required placeholder="A few details are enough."></textarea></label><button type="submit">Send message</button></form></section></main>`}
function terms(){return `<main class="subpage"><section class="page-heading"><h1>Terms &amp;<br>conditions</h1></section><section class="terms-copy"><p>Last updated: 2025</p>

      <h2>1. Services</h2>
      <p>McCormick Media provides photography, video production, and digital brand management services. All services are subject to a written agreement or confirmed booking between the client and McCormick Media.</p>

      <h2>2. Payment</h2>
      <p>Payment terms are agreed upon before the commencement of any project. A deposit may be required to secure your booking. Full payment is due upon project completion unless otherwise agreed in writing.</p>

      <h2>3. Intellectual Property</h2>
      <p>All content created by McCormick Media remains the intellectual property of McCormick Media until full payment is received. Upon receipt of full payment, clients receive a license to use the delivered materials as agreed. McCormick Media retains the right to use work in its portfolio unless a written agreement states otherwise.</p>

      <h2>4. Revisions</h2>
      <p>The number of revisions included with any project is agreed upon prior to the start of work. Additional revisions beyond what is agreed upon may be subject to additional fees.</p>

      <h2>5. Cancellations</h2>
      <p>Cancellations must be made in writing. Deposits are non-refundable unless cancellation is made within 48 hours of booking. McCormick Media reserves the right to cancel a project if terms are violated.</p>

      <h2>6. Limitation of Liability</h2>
      <p>McCormick Media is not liable for any indirect, incidental, or consequential damages arising from the use of my services or delivered content.</p>

      <h2>7. Privacy</h2>
      <p>Any personal information submitted through this website or in the course of business is used solely to communicate with you and fulfill your service requests. I do not sell or share your information with third parties.</p>

      <h2>8. Contact</h2>
      <p>For any questions about these terms, please contact me at am@aidanmccormick.com.</p></section></main>`}
function notFound(){return `<main class="subpage"><section class="page-heading"><span class="micro">404</span><h1>Page not found.</h1><p>The page may have moved.</p><a class="hero-pill hero-pill-outline" href="/">Back to overview</a></section></main>`}
const content = {home,work,web,about,services,contact,terms,notFound};
document.getElementById('app').innerHTML=`<div class="site-shell">${header}${content[page]()}${footer}</div>`;
if (location.hash) requestAnimationFrame(() => {const hash = decodeURIComponent(location.hash.slice(1)); const target = ({video:'film',films:'film','photo-gallery':'photography'})[hash] || hash; document.getElementById(target)?.scrollIntoView();});
document.title = ({home:'Aidan McCormick | AI, Media & Creative Technology',work:'Photography & Video Portfolio | Aidan McCormick',web:'Website Design Projects | Aidan McCormick',about:'About Aidan McCormick | Creative Work',services:'Creative Services | Aidan McCormick',contact:'Contact Aidan McCormick | Creative Projects',terms:'Terms & Conditions | Aidan McCormick',notFound:'Page not found | McCormick Media'})[page];
const menu = document.querySelector('.menu-button'); const mobile = document.querySelector('.mobile-nav');
menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));menu.textContent=expanded?'Menu':'Close';mobile.hidden=expanded;});


document.body.classList.add(`page-${page}`);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let motionOff = reducedMotion.matches;
document.body.classList.toggle('motion-off', motionOff);
reducedMotion.addEventListener('change', event => {motionOff = event.matches; document.body.classList.toggle('motion-off', motionOff); renderMotion();});
const featuredRail = document.querySelector('.featured-rail');
if(featuredRail) {
 const stage=featuredRail.closest('.field-stage'), slides=[...featuredRail.children], thumbnails=[...stage.querySelectorAll('[data-featured-photo]')];
 let selected=0, previewSteps=0, timer, inView=false, hovered=false, interacted=false, scrollFrame;
 const stopPreview=()=>{clearTimeout(timer);};
 const updateSelection=()=>{
  scrollFrame=null;
  selected=Math.max(0,Math.min(slides.length-1,Math.round(featuredRail.scrollLeft/featuredRail.clientWidth)));
  thumbnails.forEach((button,i)=>{if(i===selected)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');});
 };
 const showPhoto=index=>{
  const target=Math.max(0,Math.min(slides.length-1,index));
  featuredRail.scrollTo({left:target*featuredRail.clientWidth,behavior:'instant'});
  if(!motionOff)slides[target].animate([{opacity:.4},{opacity:1}],{duration:280,easing:'ease-out'});
 };
 const schedulePreview=()=>{
  stopPreview();
  if(!inView||hovered||interacted||motionOff||document.hidden||previewSteps>=2)return;
  timer=setTimeout(()=>{previewSteps++;showPhoto(selected+1);schedulePreview();},1900);
 };
 const takeControl=()=>{interacted=true;stopPreview();};
 thumbnails.forEach((button,i)=>button.addEventListener('click',()=>{takeControl();showPhoto(i);}));
 featuredRail.addEventListener('keydown',event=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();takeControl();showPhoto(event.key==='Home'?0:event.key==='End'?slides.length-1:selected+(event.key==='ArrowRight'?1:-1));
 });
 featuredRail.addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateSelection);},{passive:true});
 featuredRail.addEventListener('pointerdown',takeControl,{passive:true});
 featuredRail.addEventListener('wheel',takeControl,{passive:true});
 stage.addEventListener('focusin',takeControl);
 stage.addEventListener('pointerenter',()=>{hovered=true;stopPreview();});
 stage.addEventListener('pointerleave',()=>{hovered=false;schedulePreview();});
 document.addEventListener('visibilitychange',schedulePreview);
 reducedMotion.addEventListener('change',schedulePreview);
 window.addEventListener('resize',()=>featuredRail.scrollTo({left:selected*featuredRail.clientWidth,behavior:'instant'}));
 new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;schedulePreview();},{threshold:.55}).observe(featuredRail);
}
const revealTargets = document.querySelectorAll('[data-reveal], .page-heading, .gallery-figure, .list-row, .about-layout, .contact-layout, .contact-line');
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {if (entry.isIntersecting) {if (!motionOff) entry.target.animate([{opacity:0, transform:'translateY(70px) rotateX(5deg)'},{opacity:1, transform:'translateY(0) rotateX(0)'}], {duration:850,easing:'cubic-bezier(.16,1,.3,1)'}); revealObserver.unobserve(entry.target);}}), {threshold:.12});
revealTargets.forEach(element => revealObserver.observe(element));
const previewCards = document.querySelectorAll('.site-project');
previewCards.forEach(card => {
 const toggle = card.querySelector('.browse-toggle'), cover = card.querySelector('.preview-cover'), frame = card.querySelector('iframe');
 const setActive = active => {card.classList.toggle('is-browsing', active); frame.inert = !active; frame.tabIndex = active ? 0 : -1; toggle.setAttribute('aria-pressed', String(active)); toggle.textContent = active ? 'Pause preview' : 'Browse site'; cover.hidden = active;};
 toggle.addEventListener('click', () => setActive(!card.classList.contains('is-browsing')));
 cover.addEventListener('click', () => {setActive(true); frame.focus();});
 card.addEventListener('keydown', event => {if(event.key === 'Escape') {setActive(false); toggle.focus();}});
});
const animatedScenes = [...document.querySelectorAll('.opening-scene, .film-scene')];
let motionFrame = null;
const renderMotion = () => {
 motionFrame = null;
 animatedScenes.forEach(scene => {const box = scene.getBoundingClientRect(); const image = scene.querySelector('.opening-image, .scene-media'); if (!image) return; if (motionOff || box.bottom < 0 || box.top > innerHeight) {if (motionOff) image.style.transform = ''; return;} const progress = Math.max(-1,Math.min(1,box.top/innerHeight)); image.style.transform = `translate3d(0,${progress * -65}px,0) scale(${1.12 + Math.abs(progress)*.06})`;});
};
window.addEventListener('scroll', () => {if(!motionFrame) motionFrame = requestAnimationFrame(renderMotion);}, {passive:true});
window.addEventListener('resize', renderMotion); renderMotion();
menu.addEventListener('keydown', event => {if(event.key === 'Escape') {mobile.hidden = true; menu.setAttribute('aria-expanded','false');menu.textContent='Menu';}});

const photoRail = document.getElementById('photo-rail');
if (photoRail) {
 const panels = [...photoRail.querySelectorAll('.wall-panel')], dots = [...document.querySelectorAll('[data-wall-section]')];
 const wallSection = photoRail.closest('.archive-collection');
 wallSection.classList.add('scroll-wall');
 const viewer = document.querySelector('.photo-viewer'), viewerImage = document.getElementById('viewer-image'), viewerPosition = document.getElementById('viewer-position');
 let wallAnimation, selected = 0, settleTimer, dragging = false, dragStart = 0, scrollStart = 0, dragged = false, focusedPhoto = null, viewing = 0;
 const updateWall = () => {
  selected = panels.reduce((best,panel,index) => Math.abs(panel.offsetLeft-photoRail.scrollLeft) < Math.abs(panels[best].offsetLeft-photoRail.scrollLeft) ? index : best,0);
  if(photoRail.scrollLeft >= photoRail.scrollWidth-photoRail.clientWidth-2) selected=panels.length-1;
  dots.forEach((dot,i) => {if(i===selected)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current');});
 };
 const cancelWallAnimation = () => {cancelAnimationFrame(wallAnimation);photoRail.classList.remove('is-moving');};
 const wallIsPinned = () => !motionOff && window.innerHeight > 560;
 const wallRange = () => ({start:wallSection.getBoundingClientRect().top+window.scrollY,travel:wallSection.offsetHeight-window.innerHeight});
 const syncWall = () => {
  wallFrame = null;
  if(!wallIsPinned()) {
   photoRail.classList.remove('is-moving');
   wallSection.style.removeProperty('--wall-entry');
   panels.forEach(panel=>panel.style.removeProperty('transform'));
   return;
  }
  const {start,travel}=wallRange();
  const progress=Math.max(0,Math.min(1,(window.scrollY-start)/Math.max(1,travel)));
  photoRail.classList.add('is-moving');
  photoRail.scrollLeft=progress*(photoRail.scrollWidth-photoRail.clientWidth);
  wallSection.style.setProperty('--wall-entry',Math.max(0,Math.min(1,(start-window.scrollY)/window.innerHeight)));
  panels.forEach(panel=>{
   const distance=Math.max(-1,Math.min(1,(panel.offsetLeft-photoRail.scrollLeft)/photoRail.clientWidth));
   panel.style.transform=`perspective(1400px) rotateY(${distance*5}deg) scale(${1-Math.abs(distance)*.045})`;
  });
  updateWall();
 };
 let wallFrame;
 const scheduleWall = () => {if(wallFrame==null)wallFrame=requestAnimationFrame(syncWall);};
 const moveWall = (left,behavior='instant') => {
  const max=photoRail.scrollWidth-photoRail.clientWidth;
  if(wallIsPinned()) {
   const {start,travel}=wallRange();
   window.scrollTo({top:start+Math.max(0,Math.min(1,left/Math.max(1,max)))*travel,behavior});
  } else photoRail.scrollLeft=left;
 };
 const go = index => {
  index=Math.max(0,Math.min(panels.length-1,index));cancelWallAnimation();
  const start=photoRail.scrollLeft,target=Math.min(panels[index].offsetLeft,photoRail.scrollWidth-photoRail.clientWidth);
  selected=index;
  if(wallIsPinned()){moveWall(target,'smooth');return;}
  if(motionOff){photoRail.scrollLeft=target;updateWall();return;}
  photoRail.classList.add('is-moving');const began=performance.now();
  const frame=now=>{const progress=Math.min(1,(now-began)/150);photoRail.scrollLeft=start+(target-start)*progress;if(progress<1)wallAnimation=requestAnimationFrame(frame);else{photoRail.classList.remove('is-moving');updateWall();}};
  wallAnimation=requestAnimationFrame(frame);
 };
 let touchStart=null;
 photoRail.addEventListener('wheel',event=>{
  if(!wallIsPinned()||Math.abs(event.deltaX)<=Math.abs(event.deltaY))return;
  const max=photoRail.scrollWidth-photoRail.clientWidth;
  if((event.deltaX<0&&photoRail.scrollLeft<=1)||(event.deltaX>0&&photoRail.scrollLeft>=max-1))return;
  event.preventDefault();
  moveWall(photoRail.scrollLeft+event.deltaX*2);
 },{passive:false});
 photoRail.addEventListener('touchstart',event=>{const touch=event.touches[0];touchStart={x:touch.clientX,y:touch.clientY};},{passive:true});
 photoRail.addEventListener('touchmove',event=>{
  if(!touchStart||!wallIsPinned())return;
  const touch=event.touches[0],dx=touchStart.x-touch.clientX,dy=touchStart.y-touch.clientY;
  if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>8){event.preventDefault();moveWall(photoRail.scrollLeft+dx*2.2);touchStart={x:touch.clientX,y:touch.clientY};}
 },{passive:false});
 photoRail.addEventListener('touchend',()=>{touchStart=null;},{passive:true});
 photoRail.addEventListener('touchcancel',()=>{touchStart=null;},{passive:true});

 dots.forEach((dot,i)=>dot.addEventListener('click',()=>go(i)));
 photoRail.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();go(event.key==='Home'?0:event.key==='End'?panels.length-1:selected+(event.key==='ArrowRight'?1:-1));}});
 photoRail.addEventListener('scroll',()=>{clearTimeout(settleTimer);settleTimer=setTimeout(()=>{if(!wallIsPinned())photoRail.classList.remove('is-moving');updateWall();},90);},{passive:true});
 photoRail.addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse'||event.button!==0)return;cancelWallAnimation();dragging=true;dragged=false;dragStart=event.clientX;scrollStart=photoRail.scrollLeft;});
 photoRail.addEventListener('pointermove',event=>{if(!dragging)return;if(Math.abs(event.clientX-dragStart)>6){dragged=true;photoRail.setPointerCapture(event.pointerId);photoRail.classList.add('is-dragging');moveWall(scrollStart-(event.clientX-dragStart)*1.7);}});
 const endDrag=()=>{dragging=false;photoRail.classList.remove('is-dragging');updateWall();};
 photoRail.addEventListener('pointerup',endDrag);photoRail.addEventListener('pointercancel',endDrag);photoRail.addEventListener('pointerleave',event=>{if(!photoRail.hasPointerCapture(event.pointerId))endDrag();});
 photoRail.querySelectorAll('img').forEach(image=>image.addEventListener('dragstart',event=>event.preventDefault()));
 const showPhoto=index=>{viewing=(index+archivePhotos.length)%archivePhotos.length;const photo=archivePhotos[viewing];viewerImage.src=photo.src;viewerImage.alt=photo.alt;viewerPosition.textContent=`${String(viewing+1).padStart(2,'0')} / ${archivePhotos.length}`;};
 photoRail.addEventListener('click',event=>{if(dragged&&event.detail!==0){dragged=false;return;}dragged=false;const button=event.target.closest('[data-photo]');if(!button)return;focusedPhoto=button;showPhoto(Number(button.dataset.photo));viewer.showModal();document.body.classList.add('viewer-open');document.getElementById('viewer-close').focus();});
 document.querySelectorAll('[data-play-video]').forEach(button=>button.addEventListener('click',()=>{
  const frame=button.closest('.video-embed'), id=frame.dataset.videoId, title=frame.dataset.videoTitle;
  const iframe=document.createElement('iframe');
  iframe.src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
  iframe.title=`${title} video`;iframe.loading='eager';iframe.allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';
  frame.replaceChildren(iframe);
 }));
 document.getElementById('viewer-close').addEventListener('click',()=>viewer.close());
 document.getElementById('viewer-prev').addEventListener('click',()=>showPhoto(viewing-1));document.getElementById('viewer-next').addEventListener('click',()=>showPhoto(viewing+1));
 viewer.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();showPhoto(viewing+(event.key==='ArrowRight'?1:-1));}});
 viewer.addEventListener('close',()=>{document.body.classList.remove('viewer-open');focusedPhoto?.focus({preventScroll:true});});
 window.addEventListener('scroll',scheduleWall,{passive:true});
 window.addEventListener('resize',scheduleWall);
 reducedMotion.addEventListener('change',scheduleWall);
 photoRail.addEventListener('focusin',event=>{if(event.target.matches('.wall-photo'))go(Math.floor(Number(event.target.dataset.photo)/4));});
 syncWall();updateWall();
}

const sceneDots = document.querySelectorAll('.scene-dots a');
if (sceneDots.length) {
 const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {if (entry.isIntersecting) sceneDots.forEach(dot => {const active = dot.hash === `#${entry.target.id}`;if(active) dot.setAttribute('aria-current','location');else dot.removeAttribute('aria-current');});}),{rootMargin:'-35% 0px -35% 0px'});
 document.querySelectorAll('.experience > .scene').forEach(scene => sectionObserver.observe(scene));
}

const inquiryForm = document.getElementById('contact-form');
if (inquiryForm) {
 const status = document.createElement('p'); status.className = 'form-status'; status.setAttribute('role','status'); status.setAttribute('aria-live','polite'); inquiryForm.append(status);
 inquiryForm.addEventListener('submit',async event => {
  event.preventDefault(); if(!inquiryForm.reportValidity()) return;
  const button = inquiryForm.querySelector('button[type="submit"]'); button.disabled = true; button.textContent = 'Sending…'; status.textContent = '';
  const controller = new AbortController(), timeout = setTimeout(() => controller.abort(),20000);
  try {
   const response = await fetch(inquiryForm.action,{method:'POST',body:new FormData(inquiryForm),headers:{Accept:'application/json'},signal:controller.signal});
   if(!response.ok) throw new Error('Submission failed');
   inquiryForm.reset(); status.textContent = 'Message sent. Thank you for getting in touch.';
  } catch(error) {status.textContent = 'Your message could not be sent. Please try again, or email am@aidanmccormick.com. Your details are still here.';}
  finally {clearTimeout(timeout);button.disabled = false;button.textContent = 'Send message';}
 });
}
