(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 769px) and (pointer: fine)');
  const body = document.body;
  const toggle = document.getElementById('motionToggle');
  let paused = false;
  try { paused = localStorage.getItem('mccormick-motion') === 'paused'; } catch {}
  let motion = !reducedMotion.matches && !paused;
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;
  const object = document.getElementById('studioObject');
  const hero = document.querySelector('.hero');
  const coverFrames = [...document.querySelectorAll('.cover-frame')];
  const coverCaption = document.getElementById('coverCaption');
  const coverIndex = document.getElementById('coverIndex');
  let coverStep = 0;
  let coverTimer = 0;
  const progress = document.getElementById('scrollProgress');
  const nav = document.getElementById('navbar');
  const clamp = (n, min, max) => Math.max(min, Math.min(n, max));

  function syncMotion() {
    motion = !reducedMotion.matches && !paused;
    body.classList.toggle('motion-paused', !motion);
    if (toggle) {
      toggle.textContent = reducedMotion.matches ? 'Reduced motion on' : paused ? 'Resume motion' : 'Pause motion';
      toggle.setAttribute('aria-pressed', String(!motion));
      toggle.disabled = reducedMotion.matches;
    }
    if (!motion) document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    requestUpdate();
  }
  if (toggle) toggle.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('mccormick-motion', paused ? 'paused' : 'on'); } catch {}
    syncMotion();
  });
  reducedMotion.addEventListener('change', syncMotion);
  desktop.addEventListener('change', requestUpdate);

  function scheduleCover() {
    const rect = hero?.getBoundingClientRect();
    const visible = rect && rect.bottom > 88 && rect.top < window.innerHeight;
    if (!motion || document.hidden || !visible || coverStep >= coverFrames.length - 1) {
      window.clearTimeout(coverTimer);
      coverTimer = 0;
      return;
    }
    if (coverTimer) return;
    coverTimer = window.setTimeout(() => {
      coverTimer = 0;
      const rect = hero.getBoundingClientRect();
      if (!motion || document.hidden || rect.bottom <= 88 || rect.top >= window.innerHeight) return;
      let nextStep = coverStep + 1;
      while (nextStep < coverFrames.length && coverFrames[nextStep].complete && !coverFrames[nextStep].naturalWidth) nextStep++;
      const next = coverFrames[nextStep];
      if (!next) return;
      if (!next.complete || !next.naturalWidth) { scheduleCover(); return; }
      coverFrames[coverStep].classList.remove('active');
      coverFrames[coverStep].setAttribute('aria-hidden', 'true');
      next.classList.add('active');
      next.removeAttribute('aria-hidden');
      coverStep = nextStep;
      if (coverCaption) coverCaption.textContent = next.dataset.caption;
      if (coverIndex) coverIndex.textContent = `${String(coverStep + 1).padStart(2, '0')} / ${String(coverFrames.length).padStart(2, '0')}`;
      scheduleCover();
    }, 1700);
  }

  function update() {
    frame = 0;
    scheduleCover();
    if (progress) {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${distance > 0 ? window.scrollY / distance : 0})`;
    }
    nav?.classList.toggle('scrolled', window.scrollY > 20);
    if (!object || !hero) return;
    if (!motion || !desktop.matches) {
      object.style.removeProperty('--scene-z');
      object.style.removeProperty('--scene-x');
      object.style.removeProperty('--scene-y');
      return;
    }
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const travel = clamp(-rect.top / (hero.offsetHeight - window.innerHeight + 88), 0, 1);
    object.style.setProperty('--scene-z', `${travel * 135}px`);
    object.style.setProperty('--scene-x', `${pointerY * -4 + travel * 2}deg`);
    object.style.setProperty('--scene-y', `${-7 + pointerX * 7 + travel * 7}deg`);
  }
  function requestUpdate() { if (!frame) frame = requestAnimationFrame(update); }
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  document.addEventListener('visibilitychange', requestUpdate);
  hero?.addEventListener('pointermove', event => {
    if (!motion || !desktop.matches) return;
    const rect = hero.getBoundingClientRect();
    pointerX = (event.clientX / window.innerWidth - .5) * 2;
    pointerY = ((event.clientY - rect.top) / Math.min(rect.height, window.innerHeight) - .5) * 2;
    requestUpdate();
  });
  hero?.addEventListener('pointerleave', () => { pointerX = pointerY = 0; requestUpdate(); });

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  function setMenu(open) {
    hamburger?.classList.toggle('open', open);
    hamburger?.setAttribute('aria-expanded', String(open));
    navLinks?.classList.toggle('open', open);
  }
  hamburger?.addEventListener('click', () => setMenu(hamburger.getAttribute('aria-expanded') !== 'true'));
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && hamburger?.getAttribute('aria-expanded') === 'true') {
      setMenu(false); hamburger.focus();
    }
  });
  document.addEventListener('pointerdown', event => {
    if (nav && !nav.contains(event.target)) setMenu(false);
  });

  document.querySelectorAll('.stat-num').forEach(el => { el.textContent = el.dataset.target; });
  const gallery = document.getElementById('galleryTrack');
  const galleryCta = document.getElementById('galleryCta');
  if (gallery && galleryCta) {
    gallery.setAttribute('tabindex', '0');
    gallery.setAttribute('role', 'region');
    gallery.setAttribute('aria-label', 'Selected photography. Scroll horizontally to explore.');
    const controls = document.createElement('div');
    controls.className = 'gallery-controls';
    [['←', 'Previous photographs', -1], ['→', 'Next photographs', 1]].forEach(([symbol, label, direction]) => {
      const button = document.createElement('button');
      button.type = 'button'; button.textContent = symbol; button.setAttribute('aria-label', label);
      button.addEventListener('click', () => {
        gallery.scrollBy({ left: direction * gallery.clientWidth * .72, behavior: motion ? 'smooth' : 'instant' });
      });
      controls.appendChild(button);
    });
    galleryCta.appendChild(controls);
  }

  if ('ResizeObserver' in window) {
    const previewSizes = new ResizeObserver(entries => {
      entries.forEach(({ target, contentRect }) => {
        target.style.setProperty('--preview-scale', contentRect.width / 1280);
        target.classList.add('preview-scaled');
      });
    });
    document.querySelectorAll('.web-design-preview').forEach(preview => previewSizes.observe(preview));
  }
  document.querySelectorAll('.project-stage').forEach(stage => {
    const browser = stage.querySelector('.project-browser');
    let tiltFrame = 0;
    let tiltX = 0;
    let tiltY = 0;
    function applyTilt() {
      tiltFrame = 0;
      browser.style.setProperty('--tilt-x', `${tiltX}deg`);
      browser.style.setProperty('--tilt-y', `${tiltY}deg`);
    }
    stage.addEventListener('pointermove', event => {
      if (!motion || !desktop.matches) return;
      const rect = stage.getBoundingClientRect();
      tiltX = clamp((event.clientY - rect.top) / rect.height - .5, -.5, .5) * -4;
      tiltY = clamp((event.clientX - rect.left) / rect.width - .5, -.5, .5) * 6;
      if (!tiltFrame) tiltFrame = requestAnimationFrame(applyTilt);
    });
    stage.addEventListener('pointerleave', () => {
      tiltX = tiltY = 0;
      if (!tiltFrame) tiltFrame = requestAnimationFrame(applyTilt);
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const status = document.createElement('p');
    status.className = 'form-status'; status.setAttribute('role', 'alert');
    contactForm.appendChild(status);
    const success = document.getElementById('formSuccess');
    success?.setAttribute('role', 'status');
    if (success) success.tabIndex = -1;
    contactForm.addEventListener('submit', async event => {
      event.preventDefault();
      const button = contactForm.querySelector('.form-submit-btn');
      const original = button.textContent;
      button.disabled = true; button.textContent = 'Sending…'; status.textContent = '';
      contactForm.setAttribute('aria-busy', 'true');
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 20000);
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST', body: new FormData(contactForm), headers: { Accept: 'application/json' }, signal: controller.signal
        });
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error((data.errors || []).map(error => error.message).join(', ') || 'Unable to send. Please try again.');
        }
        contactForm.hidden = true;
        if (success) { success.style.display = 'block'; success.focus(); }
      } catch (error) {
        status.textContent = error.name === 'AbortError' ? 'Sending took too long. Your message is still here. Please try again or email am@aidanmccormick.com.' : error.message === 'Failed to fetch' ? 'Please check your connection and try again, or email am@aidanmccormick.com.' : error.message;
        button.disabled = false; button.textContent = original;
      } finally {
        window.clearTimeout(timeout);
        contactForm.setAttribute('aria-busy', 'false');
      }
    });
  }
  syncMotion();
})();
