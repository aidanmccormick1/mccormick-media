/* ============================================================
   McCormick Media — Main JS
   Rivian-Inspired Immersive Scroll Experience
   ============================================================ */

// ---------- PAGE LOADER ----------
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => loader.classList.add('loaded'), 400);
  }
});

// ---------- SCROLL PROGRESS BAR ----------
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  if (!scrollProgress) return;
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.transform = `scaleX(${scrollTop / scrollHeight})`;
}

// ---------- CUSTOM CURSOR ----------
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

if (cursorDot && cursorRing) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = 'a, button, .service-card, .gs-item, .video-project, .video-card, .photo-grid-item';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hover');
      cursorRing.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hover');
      cursorRing.classList.remove('hover');
    });
  });

  document.addEventListener('mousedown', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(0.7)';
    cursorRing.style.transform = 'translate(-50%, -50%) scale(0.85)';
  });
  document.addEventListener('mouseup', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });
}

// ---------- HERO CANVAS — blue network particles ----------
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -9999, y: -9999 };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  canvas.parentElement.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = -9999; mouse.y = -9999;
  });

  function makeParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '0,102,255' : '0,194,255',
    };
  }

  const COUNT = 80;
  for (let i = 0; i < COUNT; i++) particles.push(makeParticle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120 && dist > 0) {
        const force = (120 - dist) / 120 * 1.0;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }
      p.vx *= 0.97; p.vy *= 0.97;
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      if (p.x > W) { p.x = W; p.vx *= -1; }
      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      if (p.y > H) { p.y = H; p.vy *= -1; }
      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${p.color})`;
      ctx.fill();
      ctx.restore();
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 140) * 0.2;
          ctx.strokeStyle = '#0066FF';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
}

// ---------- HERO CHARACTER-BY-CHARACTER ANIMATION ----------
const heroHeadline = document.querySelector('.hero-headline');
if (heroHeadline) {
  let charIndex = 0;
  const children = Array.from(heroHeadline.childNodes);
  children.forEach(child => {
    if (child.nodeType === 3 && child.textContent.trim()) {
      const wrapped = child.textContent.replace(/\S/g, (char) => {
        const delay = 0.4 + (charIndex++) * 0.028;
        return `<span class="char" style="animation-delay:${delay}s">${char}</span>`;
      });
      const span = document.createElement('span');
      span.innerHTML = wrapped;
      child.replaceWith(span);
    }
  });
}

// ============================================================
//  SCROLL-DRIVEN ANIMATIONS (Rivian-style)
// ============================================================

function clamp(val, min, max) { return Math.min(Math.max(val, min), max); }
function lerp(a, b, t) { return a + (b - a) * t; }

// How far an element is through the viewport (0 = just entered bottom, 1 = exiting top)
function getScrollProgress(el) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  // 0 when bottom of element enters viewport, 1 when top exits
  return clamp(1 - (rect.bottom / (vh + rect.height)), 0, 1);
}

// ---------- STICKY HERO FADE-OUT ----------
const heroSection = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
const heroScrollHint = document.querySelector('.hero-scroll-hint');

function updateHeroParallax() {
  if (!heroSection || !heroContent) return;
  const scrollY = window.scrollY;
  const vh = window.innerHeight;
  const progress = clamp(scrollY / (vh * 0.6), 0, 1); // 0 to 1 over 60vh of scroll

  // Content fades out and scales down as you scroll
  const opacity = 1 - progress;
  const scale = 1 - progress * 0.08;
  const translateY = progress * -60;

  heroContent.style.opacity = opacity;
  heroContent.style.transform = `translateY(${translateY}px) scale(${scale})`;

  // Scroll hint fades faster
  if (heroScrollHint) {
    heroScrollHint.style.opacity = 1 - clamp(scrollY / (vh * 0.2), 0, 1);
  }
}

// ---------- HORIZONTAL SCROLL GALLERY (cinematic) ----------
const workSection    = document.getElementById('workPreview');
const galleryTrack   = document.getElementById('galleryTrack');
const galleryProgBar = document.getElementById('galleryProgressBar');
const galleryCta     = document.getElementById('galleryCta');

let galleryScrollDist = 0;

function setupGallery() {
  if (!workSection || !galleryTrack) return;

  // Total horizontal distance to scroll = track width minus one viewport width
  galleryScrollDist = galleryTrack.scrollWidth - window.innerWidth;

  // Make the section tall enough that we can scroll through the whole track
  // Plus one vh for the "enter" and one for the "exit"
  workSection.style.height = `${galleryScrollDist + window.innerHeight * 1.5}px`;
}

if (workSection && galleryTrack) {
  setupGallery();
  window.addEventListener('resize', setupGallery);
}

function updateHorizontalScroll() {
  if (!workSection || !galleryTrack || galleryScrollDist <= 0) return;

  const rect = workSection.getBoundingClientRect();
  // How far we've scrolled into the section (0 = section top just hit viewport top)
  const scrolledInto = -rect.top;

  if (scrolledInto < 0 || scrolledInto > galleryScrollDist + window.innerHeight * 0.5) return;

  // Progress 0→1 over the scrollable distance
  const progress = clamp(scrolledInto / galleryScrollDist, 0, 1);
  const translateX = -progress * galleryScrollDist;

  galleryTrack.style.transform = `translateX(${translateX}px)`;

  // Update progress bar
  if (galleryProgBar) galleryProgBar.style.width = `${progress * 100}%`;

  // Show CTA when near end (>85%)
  if (galleryCta) galleryCta.classList.toggle('visible', progress > 0.85);
}

// ---------- SCROLL-SYNCED TEXT REVEALS ----------
// These are continuous animations tied to scroll position, not just one-shot intersection triggers.
function updateScrollReveal() {
  document.querySelectorAll('.scroll-text').forEach(el => {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // Start animating when element is 85% from top of viewport
    const start = vh * 0.85;
    const end = vh * 0.35;
    const progress = clamp((start - rect.top) / (start - end), 0, 1);

    // Smooth easing
    const eased = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    el.style.opacity = eased;
    el.style.transform = `translateY(${(1 - eased) * 40}px)`;
  });
}

// ---------- SCALE REVEAL ON GALLERY IMAGES ----------
// Handled via CSS hover transitions on .gs-item img — no JS needed here
function updateImageScaleReveal() {}

// ---------- PARALLAX DEPTH LAYERS ----------
function updateParallaxLayers() {
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.1;
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    el.style.transform = `translateY(${center * speed}px)`;
  });
}

// ---------- STATS COUNTER WITH SCROLL SYNC ----------
const statNums = document.querySelectorAll('.stat-num');
const statObserved = new Set();

function updateCounters() {
  statNums.forEach(el => {
    if (statObserved.has(el)) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
      statObserved.add(el);
      const target = parseInt(el.dataset.target);
      const duration = 1600;
      const startTime = performance.now();

      function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      }

      function animate(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        el.textContent = Math.round(easeOutExpo(progress) * target);
        if (progress < 1) requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    }
  });
}

// ---------- NAV SCROLL ----------
const navbar = document.getElementById('navbar');
let lastScroll = 0;
function updateNav() {
  if (!navbar) return;
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 40);

  if (scrollY > window.innerHeight) {
    if (scrollY > lastScroll && scrollY - lastScroll > 5) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  lastScroll = scrollY;
}

if (navbar) {
  navbar.style.transition = 'background 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
}

// ---------- INTERSECTION OBSERVER REVEALS (for elements not scroll-synced) ----------
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length) {
  // Stagger grid children
  document.querySelectorAll('.services-grid, .video-cards, .stats-grid, .service-items-grid').forEach(grid => {
    grid.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.12}s`;
    });
  });

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObs.observe(el));
}

// ---------- MASTER SCROLL HANDLER ----------
// One rAF loop for all scroll-driven animations (performant)
let ticking = false;

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollProgress();
      updateHeroParallax();
      updateHorizontalScroll();
      updateScrollReveal();
      updateImageScaleReveal();
      updateParallaxLayers();
      updateCounters();
      updateNav();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
// Initial call
onScroll();

// ---------- HAMBURGER ----------
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ---------- TYPEWRITER ----------
const typeEl = document.getElementById('typewriter');
if (typeEl) {
  const words = ['All Platforms', 'Every Brand', 'Your Audience', 'Any Stage'];
  let wi = 0, ci = 0, deleting = false;

  function type() {
    const word = words[wi];
    if (!deleting) {
      typeEl.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      typeEl.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 60 : 90);
  }
  setTimeout(type, 1200);
}

// ---------- MAGNETIC HOVER ON BUTTONS ----------
document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ---------- SERVICE CARD GLOW ----------
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
  });
});

// ---------- 3D TILT ON CARDS ----------
document.querySelectorAll('.video-card, .video-project').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px) scale(1.01)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// (drag-to-scroll removed — gallery is now scroll-driven)

// ---------- CONTACT FORM ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit-btn');
    const success = document.getElementById('formSuccess');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      contactForm.style.display = 'none';
      if (success) success.style.display = 'block';
    }, 1000);
  });
}

// ---------- ACTIVE NAV LINK ----------
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href').split('/').pop();
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }
});

// ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
