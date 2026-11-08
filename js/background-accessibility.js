(() => {
  const storageKey = 'mm:a11y-settings';
  const defaults = {
    highContrast: false,
    largerText: false,
    underlineLinks: false,
    strongFocus: false,
    systemCursor: false,
  };

  let settings = { ...defaults };
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    Object.assign(settings, saved);
  } catch {}

  function applySettings() {
    const body = document.body;
    body.classList.toggle('a11y-high-contrast', !!settings.highContrast);
    body.classList.toggle('a11y-large-text', !!settings.largerText);
    body.classList.toggle('a11y-underline-links', !!settings.underlineLinks);
    body.classList.toggle('a11y-strong-focus', !!settings.strongFocus);
    body.classList.toggle('a11y-system-cursor', !!settings.systemCursor);
  }

  function persistSettings() {
    try { localStorage.setItem(storageKey, JSON.stringify(settings)); } catch {}
  }

  function setPreference(key, value) {
    settings[key] = value;
    persistSettings();
    applySettings();
    showToast('Accessibility settings updated');
  }

  function resetSettings() {
    settings = { ...defaults };
    persistSettings();
    applySettings();
    syncControls();
    showToast('Accessibility settings reset');
  }

  function syncMotionSetting(enabled) {
    const toggle = document.getElementById('motionToggle');
    if (!toggle) return;
    const pressed = toggle.getAttribute('aria-pressed') === 'true';
    const wantsPaused = !enabled;
    if (pressed !== wantsPaused) toggle.click();
  }

  const panel = document.createElement('section');
  panel.className = 'a11y-panel';
  panel.hidden = true;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-labelledby', 'a11yTitle');
  panel.innerHTML = `
    <h2 id="a11yTitle">Accessibility settings</h2>
    <p>Quiet display options. Open with Alt+A.</p>
    <label class="a11y-option"><input type="checkbox" data-key="highContrast" /> High contrast</label>
    <label class="a11y-option"><input type="checkbox" data-key="largerText" /> Larger text</label>
    <label class="a11y-option"><input type="checkbox" data-key="underlineLinks" /> Underline links</label>
    <label class="a11y-option"><input type="checkbox" data-key="strongFocus" /> Strong focus outlines</label>
    <label class="a11y-option"><input type="checkbox" data-key="systemCursor" /> System cursor</label>
    <label class="a11y-option"><input type="checkbox" data-motion-toggle /> Pause motion</label>
    <div class="a11y-actions">
      <button type="button" class="btn btn-outline btn-sm" data-reset>Reset</button>
      <button type="button" class="btn btn-primary btn-sm" data-close>Done</button>
    </div>
  `;
  document.body.appendChild(panel);

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'sr-only';
  trigger.textContent = 'Open accessibility settings (Alt plus A)';
  trigger.addEventListener('click', () => panel.hidden ? openPanel() : closePanel());
  document.body.appendChild(trigger);

  const toast = document.createElement('div');
  toast.className = 'a11y-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  function openPanel() {
    panel.hidden = false;
    syncControls();
    panel.querySelector('input')?.focus();
  }

  function closePanel() {
    panel.hidden = true;
  }

  function syncControls() {
    panel.querySelectorAll('[data-key]').forEach(input => {
      const key = input.getAttribute('data-key');
      input.checked = !!settings[key];
    });
    const motionInput = panel.querySelector('[data-motion-toggle]');
    if (motionInput) {
      motionInput.checked = document.getElementById('motionToggle')?.getAttribute('aria-pressed') === 'true';
    }
  }

  panel.querySelectorAll('[data-key]').forEach(input => {
    input.addEventListener('change', event => {
      const key = event.target.getAttribute('data-key');
      setPreference(key, event.target.checked);
    });
  });

  panel.querySelector('[data-motion-toggle]')?.addEventListener('change', event => {
    syncMotionSetting(!event.target.checked);
    showToast('Motion setting updated');
  });

  panel.querySelector('[data-reset]')?.addEventListener('click', () => {
    resetSettings();
    syncMotionSetting(true);
  });

  panel.querySelector('[data-close]')?.addEventListener('click', closePanel);
  panel.addEventListener('keydown', event => {
    if (event.key === 'Escape') closePanel();
  });

  document.addEventListener('keydown', event => {
    if (event.altKey && !event.ctrlKey && !event.metaKey && (event.key === 'a' || event.key === 'A')) {
      event.preventDefault();
      if (panel.hidden) openPanel();
      else closePanel();
    }
  });

  if (new URLSearchParams(window.location.search).get('a11y') === '1') {
    window.addEventListener('load', openPanel, { once: true });
  }

  const motionOption = panel.querySelector('[data-motion-toggle]')?.closest('.a11y-option');
  if (!document.getElementById('motionToggle') && motionOption) {
    motionOption.style.display = 'none';
  }

  applySettings();
  syncControls();
})();
