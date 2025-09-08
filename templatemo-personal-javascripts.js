/* Mobile menu functionality */
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
  });
}

if (mobileNavLinks.length) {
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle?.classList.remove('active');
      mobileMenu?.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
}

document.addEventListener('click', (e) => {
  if (mobileMenuToggle && mobileMenu && !mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

/* Navbar scroll effect */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
}

/* Scroll animations via IntersectionObserver */
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -80px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('animate');
  });
}, observerOptions);

const portfolioObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.portfolio-item');
      items.forEach((item, index) => {
        setTimeout(() => item.classList.add('animate'), index * 150);
      });
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  animatedElements.forEach(el => observer.observe(el));

  const portfolioSection = document.querySelector('.portfolio-grid');
  if (portfolioSection) portfolioObserver.observe(portfolioSection);
});

/* Smooth scrolling */
const anchorLinks = document.querySelectorAll('a[href^="#"]');
if (anchorLinks.length) {
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });
}

/* Contact form */
const contactForm = document.querySelector('.contact-form');
const submitBtn = contactForm?.querySelector('.submit-btn');
if (contactForm && submitBtn) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.background = 'linear-gradient(135deg, #94a3b8, #64748b)';

    setTimeout(() => {
      submitBtn.textContent = 'Message Sent! ✓';
      submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      submitBtn.style.transform = 'scale(1.05)';
      setTimeout(() => submitBtn.style.transform = 'scale(1)', 200);
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        contactForm.reset();
      }, 3000);
    }, 2000);
  });
}

/* Parallax hero */
const hero = document.querySelector('.hero');
if (hero) {
  let ticking = false;
  function updateParallax() {
    const rate = window.pageYOffset * -0.3;
    hero.style.transform = `translateY(${rate}px)`;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}

/* Skill tag hover */
const skillTags = document.querySelectorAll('.skill-tag');
if (skillTags.length) {
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => tag.style.transform = 'translateY(-2px) scale(1.05)');
    tag.addEventListener('mouseleave', () => tag.style.transform = 'translateY(0) scale(1)');
  });
}

/* Escape to close mobile menu */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenuToggle?.classList.contains('active') && mobileMenu) {
    mobileMenuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});
