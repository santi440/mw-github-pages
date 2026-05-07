// Reveal animations (IntersectionObserver)
(function() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (reveals.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => obs.observe(el));
  } else {
    // Fallback: si no hay IntersectionObserver, mostramos todo.
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // Navbar shadow on scroll (si existe navbar)
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // Hero entrance
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero-text > *').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = `opacity 0.7s ease ${i * 0.1}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s`;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }, 80 + i * 100);
    });

    const hv = document.querySelector('.hero-visual');
    if (hv) {
      hv.style.opacity = '0';
      hv.style.transform = 'translateX(36px)';
      hv.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s';
      setTimeout(() => {
        hv.style.opacity = '1';
        hv.style.transform = 'none';
      }, 200);
    }
  });

  // Smooth scroll to section (para links con clase .scroll-to-section)
  document.querySelectorAll('.scroll-to-section').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
