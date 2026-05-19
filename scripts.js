// Lógica JavaScript para navegación, scroll suave, header fijo y animaciones
document.addEventListener('DOMContentLoaded', () => {
  // Menú hamburguesa - abrir/cerrar en móvil
  const toggleButton = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu ul');
  toggleButton.addEventListener('click', () => {
    navMenu.classList.toggle('nav-open');
  });

  // Scroll suave para enlaces internos
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        const headerOffset = 80; // ajusta si el header cambia de tamaño
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      // Cierra el menú móvil tras seleccionar
      navMenu.classList.remove('nav-open');
    });
  });

  // Header sticky: cambia background al hacer scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // Efecto de aparición (reveal) con IntersectionObserver
  const sections = document.querySelectorAll('.section-hidden');
  const observerOptions = {
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-show');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });