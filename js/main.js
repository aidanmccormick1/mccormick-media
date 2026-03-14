/* ============================================================
   McCormick Media — Main JS
   ============================================================ */

// ---------- NAV SCROLL ----------
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

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

// ---------- REVEAL ON SCROLL ----------
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (entry.target.dataset.delay || 0));
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  // Stagger children inside grids
  document.querySelectorAll('.services-grid, .video-cards, .stats-grid, .service-items-grid').forEach(grid => {
    Array.from(grid.querySelectorAll('.reveal')).forEach((el, i) => {
      el.dataset.delay = i * 100;
    });
  });

  reveals.forEach(el => revealObs.observe(el));
}

// ---------- COUNTER ANIMATION ----------
const statNums = document.querySelectorAll('.stat-num');
if (statNums.length) {
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const duration = 1200;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 16);
        countObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => countObs.observe(el));
}

// ---------- DRAG-TO-SCROLL GALLERY ----------
const strip = document.getElementById('galleryStrip');
if (strip) {
  let isDown = false, startX, scrollLeft;

  strip.parentElement.addEventListener('mousedown', e => {
    isDown = true;
    strip.parentElement.classList.add('active');
    startX = e.pageX - strip.parentElement.offsetLeft;
    scrollLeft = strip.parentElement.scrollLeft;
  });
  strip.parentElement.addEventListener('mouseleave', () => { isDown = false; });
  strip.parentElement.addEventListener('mouseup', () => { isDown = false; });
  strip.parentElement.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - strip.parentElement.offsetLeft;
    const walk = (x - startX) * 1.5;
    strip.parentElement.scrollLeft = scrollLeft - walk;
  });
}

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
