/**
 * Juan José Marco Ortega - Web Personal & Portafolio
 * Script interactivo: tema, navegación móvil, filtros, portapapeles y formulario.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. GESTOR DE TEMA (CLARO / OSCURO) CON PERSISTENCIA
  // -------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Comprobar preferencia guardada o preferencia del sistema
  const savedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (prefersLight) {
    htmlRoot.setAttribute('data-theme', 'light');
  } else {
    htmlRoot.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlRoot.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
    });
  }

  // -------------------------------------------------------------------------
  // 2. MENÚ MÓVIL RESPONSIVE
  // -------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en cualquier enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      });
    });

    // Cerrar menú al hacer clic fuera del header
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target) && navMenu.classList.contains('active')) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. SCROLL SPY (INDICADOR DE SECCIÓN ACTIVA EN NAVBAR)
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  const handleScrollSpy = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScrollSpy, { passive: true });

  // -------------------------------------------------------------------------
  // 4. BOTÓN VOLVER ARRIBA (BACK TO TOP)
  // -------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------------------
  // 5. FILTRO DE SERVICIOS Y PROYECTOS
  // -------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Quitar clase active a todos los botones y asignar al pulsado
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 6. COPIAR CORREO ELECTRÓNICO AL PORTAPAPELES
  // -------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyTooltip = document.getElementById('copyTooltip');
  const emailToCopy = 'marcoortegajuanjose@gmail.com';

  if (copyEmailBtn && copyTooltip) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailToCopy);
        copyTooltip.textContent = '¡Copiado!';
        copyTooltip.classList.add('show');

        setTimeout(() => {
          copyTooltip.classList.remove('show');
          setTimeout(() => {
            copyTooltip.textContent = 'Copiar';
          }, 200);
        }, 2200);
      } catch (err) {
        // Fallback en caso de que el navegador no permita clipboard API
        const tempInput = document.createElement('input');
        tempInput.value = emailToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        copyTooltip.textContent = '¡Copiado!';
        copyTooltip.classList.add('show');
        setTimeout(() => {
          copyTooltip.classList.remove('show');
        }, 2200);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 7. FORMULARIO DE CONTACTO RÁPIDO
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('nameInput').value.trim();
      const email = document.getElementById('emailInput').value.trim();
      const subject = document.getElementById('subjectInput').value.trim();
      const message = document.getElementById('messageInput').value.trim();

      if (!name || !email || !subject || !message) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Por favor, rellena todos los campos obligatorios.';
        return;
      }

      // Preparar enlace de correo listo para abrir en el cliente del usuario
      const mailtoSubject = encodeURIComponent(`[Contacto Web] ${subject}`);
      const mailtoBody = encodeURIComponent(`Hola Juan José,\n\nMi nombre es ${name} (${email}).\n\n${message}`);
      const mailtoUrl = `mailto:marcoortegajuanjose@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      // Feedback amigable
      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `✓ ¡Muchas gracias, <strong>${name}</strong>! Se abrirá tu cliente de correo para enviar el mensaje directamente a <code>marcoortegajuanjose@gmail.com</code>.`;

      // Abrir cliente de correo
      window.location.href = mailtoUrl;

      // Limpiar formulario tras unos segundos
      setTimeout(() => {
        contactForm.reset();
      }, 3000);
    });
  }
});

