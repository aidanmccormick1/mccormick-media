(() => {
  const filterButtons = [...document.querySelectorAll('[data-work-filter]')];
  const panels = [...document.querySelectorAll('[data-work-medium]')];
  if (!filterButtons.length || !panels.length) return;

  function applyFilter(next) {
    const medium = next || 'all';
    panels.forEach(panel => {
      const match = medium === 'all' || panel.getAttribute('data-work-medium') === medium;
      panel.toggleAttribute('hidden', !match);
    });
    filterButtons.forEach(button => {
      const active = button.getAttribute('data-work-filter') === medium;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('is-active', active);
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => applyFilter(button.getAttribute('data-work-filter')));
  });

  applyFilter('all');
})();
