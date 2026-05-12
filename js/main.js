/* ============================================================
   KAROO — Main JavaScript
   Navbar, magnetic buttons, widgets, scroll reveal
   ============================================================ */

/* ── Navbar scroll behaviour ─────────────────────────────── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const toggle = nav.querySelector('.navbar__toggle');
  const mobileMenu = nav.querySelector('.navbar__mobile-menu');

  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('navbar--scrolled');
    } else {
      nav.classList.remove('navbar--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Mark active link
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  nav.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
      link.classList.add('active');
    }
  });
})();

/* ── Magnetic buttons ────────────────────────────────────── */
(function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn--magnetic');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.28;
      const dy = (e.clientY - cy) * 0.28;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

/* ── Scroll reveal ───────────────────────────────────────── */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ── Workflow widget ─────────────────────────────────────── */
(function initWorkflowWidget() {
  const widget = document.querySelector('.widget--workflow');
  if (!widget) return;

  const nodes = widget.querySelectorAll('.workflow__node');
  if (!nodes.length) return;

  let current = 0;

  function activate() {
    nodes.forEach(n => n.classList.remove('active'));
    nodes[current].classList.add('active');
    current = (current + 1) % nodes.length;
  }

  activate();
  setInterval(activate, 1400);
})();

/* ── Ops checklist widget ────────────────────────────────── */
(function initChecklistWidget() {
  const widget = document.querySelector('.widget--checklist');
  if (!widget) return;

  const items = widget.querySelectorAll('.checklist__item');
  if (!items.length) return;

  let index = 0;
  let timer;

  function checkNext() {
    if (index < items.length) {
      items[index].classList.add('checklist__item--done');
      index++;
      timer = setTimeout(checkNext, 900);
    } else {
      timer = setTimeout(reset, 2800);
    }
  }

  function reset() {
    items.forEach(i => i.classList.remove('checklist__item--done'));
    index = 0;
    timer = setTimeout(checkNext, 600);
  }

  checkNext();
})();

/* ── Smooth scroll for anchor links ─────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Form submission (placeholder) ──────────────────────── */
(function initForms() {
  document.querySelectorAll('.js-contact-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;

      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Replace with real ActiveCampaign / Fluent Forms endpoint
      setTimeout(() => {
        btn.textContent = 'Sent ✓';
        btn.style.background = '#416963';

        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
          form.reset();
        }, 3500);
      }, 1200);
    });
  });
})();
