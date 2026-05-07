const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Intersection observer for reveal animations
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
reveals.forEach(el => observer.observe(el));

// Also mark visible elements already in viewport on load
function checkVisible() {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('load', checkVisible);
checkVisible();

// Pillar filter pills
const pills = document.querySelectorAll('.pill-btn');
const cards = document.querySelectorAll('.pillar-card');
pills.forEach(btn => {
  btn.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      if (filter === 'all') {
        card.classList.add('show-all');
      } else {
        card.classList.remove('show-all');
        if (card.dataset.index === filter) {
          card.classList.add('show-all');
        }
      }
    });
    const grid = document.getElementById('pillars-grid');
    if (filter !== 'all') {
      grid.style.gridTemplateColumns = '1fr';
      grid.style.maxWidth = '480px';
      grid.style.margin = '0 auto';
    } else {
      grid.style.gridTemplateColumns = '';
      grid.style.maxWidth = '';
      grid.style.margin = '';
    }
  });
});

// Hero entrance animation
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-text > *').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + i * 120);
  });
  const diagram = document.querySelector('.hero-diagram');
  if (diagram) {
    diagram.style.opacity = '0';
    diagram.style.transform = 'translateX(30px)';
    diagram.style.transition = 'opacity 0.9s ease 0.4s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s';
    setTimeout(() => {
      diagram.style.opacity = '1';
      diagram.style.transform = 'translateX(0)';
    }, 200);
  }
});
