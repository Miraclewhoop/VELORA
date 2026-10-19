(() => {
  'use strict';
  const header = document.getElementById('siteHeader');
  const bar = document.getElementById('progressBar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  let scrollScheduled = false;

  function updateScrollUI() {
    scrollScheduled = false;
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 30);
    if (bar) {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      bar.style.width = Math.min(100, Math.max(0, y / max * 100)) + '%';
    }
    updateStickyStory();
  }
  window.addEventListener('scroll', () => {
    if (!scrollScheduled) {
      scrollScheduled = true;
      requestAnimationFrame(updateScrollUI);
    }
  }, { passive:true });
  window.addEventListener('resize', updateScrollUI, { passive:true });

  function closeMenu() {
    if (!menuToggle || !navLinks) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Deschide meniul');
    navLinks.classList.remove('is-open');
    header?.classList.remove('menu-is-open');
    document.body.classList.remove('menu-open');
  }
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Închide meniul' : 'Deschide meniul');
      navLinks.classList.toggle('is-open', open);
      header?.classList.toggle('menu-is-open', open);
      document.body.classList.toggle('menu-open', open);
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.matchMedia('(min-width:701px)').addEventListener('change', closeMenu);
  }

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      }
    }, { rootMargin:'0px 0px -45px 0px', threshold:.08 });
    revealElements.forEach(el => revealObserver.observe(el));
  } else revealElements.forEach(el => el.classList.add('is-revealed'));

  const steps = [...document.querySelectorAll('.service-step')];
  const photos = [...document.querySelectorAll('.expertise-photo')];
  const photoNumber = document.getElementById('imageNumber');
  let currentStep = -1;
  function updateStickyStory() {
    if (!steps.length || !photos.length || window.innerWidth <= 700) return;
    const targetY = window.innerHeight * .48;
    let best = 0, bestDistance = Infinity;
    steps.forEach((el, index) => {
      const r = el.getBoundingClientRect();
      const middle = r.top + r.height / 2;
      const distance = Math.abs(targetY - middle);
      if (distance < bestDistance) { bestDistance = distance; best = index; }
    });
    if (best === currentStep) return;
    currentStep = best;
    steps.forEach((el, i) => el.classList.toggle('is-active', i === best));
    photos.forEach((el, i) => el.classList.toggle('is-visible', i === best));
    if (photoNumber) photoNumber.textContent = String(best+1).padStart(2,'0') + ' — 04';
  }
  updateScrollUI();

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submitButton = document.getElementById('submitButton');
  function announce(message, state) {
    if (!status) return;
    status.hidden = false;
    status.textContent = message;
    status.dataset.state = state;
  }
  if (form && submitButton) {
    const fields = form.querySelectorAll('input:not([type=hidden]):not([name="_honey"]), select, textarea');
    fields.forEach(field => field.addEventListener('input', () => field.removeAttribute('aria-invalid')));
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        [...fields].filter(field => !field.checkValidity()).forEach(field => field.setAttribute('aria-invalid','true'));
        form.reportValidity();
        announce('Verifică, te rugăm, câmpurile obligatorii și adresa de email.', 'error');
        return;
      }
      // Honeypot: don't reward automated submissions.
      if (form.elements.namedItem('_honey')?.value) {
        announce('Solicitarea a fost înregistrată.', 'success');
        form.reset();
        return;
      }
      const label = submitButton.querySelector('span');
      submitButton.disabled = true;
      if (label) label.textContent = 'Se trimite...';
      if (status) status.hidden = true;
      try {
        const payload = Object.fromEntries(new FormData(form).entries());
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type':'application/json', 'Accept':'application/json' },
          body: JSON.stringify(payload),
          mode: 'cors'
        });
        let result = null;
        try { result = await response.json(); } catch (_) { /* handled below */ }
        const accepted = response.ok && (result?.success === true || result?.success === 'true');
        if (!accepted) throw new Error('Form service did not confirm submission');
        form.reset();
        announce('Solicitarea a fost trimisă. Îți mulțumim! Vom reveni cu un răspuns pe adresa indicată.', 'success');
      } catch (error) {
        announce('Trimiterea nu a putut fi confirmată. Te rugăm să încerci din nou sau să ne scrii direct la office@veloraproduction.ro.', 'error');
      } finally {
        submitButton.disabled = false;
        if (label) label.textContent = 'Trimite solicitarea';
      }
    });
  }
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
