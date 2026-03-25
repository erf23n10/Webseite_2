/* ===========================
   Navbar scroll effect
   =========================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===========================
   Mobile hamburger menu
   =========================== */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-label', 'Menü öffnen');
  });
});

/* ===========================
   Portfolio filter
   =========================== */
const filterBtns = document.querySelectorAll('.portfolio__filter');
const portfolioItems = document.querySelectorAll('.portfolio__item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state
    filterBtns.forEach(b => b.classList.remove('portfolio__filter--active'));
    btn.classList.add('portfolio__filter--active');

    const filter = btn.dataset.filter;

    portfolioItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/* ===========================
   Contact form
   =========================== */
const contactForm   = document.getElementById('contact-form');
const formSuccess   = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Simulate form submission
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Wird gesendet…';
  btn.disabled = true;

  setTimeout(() => {
    contactForm.reset();
    btn.textContent = 'Nachricht senden';
    btn.disabled = false;
    formSuccess.classList.add('visible');
    setTimeout(() => formSuccess.classList.remove('visible'), 5000);
  }, 1200);
});

/* ===========================
   Scroll animations
   =========================== */
const animatedEls = document.querySelectorAll(
  '.feature-card, .portfolio__item, .testimonial-card, .stats__item, .about__list-item'
);

animatedEls.forEach(el => el.classList.add('animate-on-scroll'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger children within the same parent
        const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
        siblings.forEach((sib, idx) => {
          sib.style.transitionDelay = `${idx * 80}ms`;
        });
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

animatedEls.forEach(el => observer.observe(el));

/* ===========================
   Smooth active nav link
   =========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navbar__link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--color-primary)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
