// MENU MOBILE

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// CONTADOR

const counters = document.querySelectorAll("[data-count]");

const animateCounter = (counter) => {
  const target = +counter.dataset.count;
  let current = 0;

  const increment = target / 100;

  const update = () => {
    current += increment;

    if(current < target){
      counter.textContent = Math.floor(current);
      requestAnimationFrame(update);
    } else {
      counter.textContent = target;
    }
  };

  update();
};

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

counters.forEach(counter=>{
  observer.observe(counter);
});

// BOTON TOP

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", ()=>{

  if(window.scrollY > 500){
    backToTop.hidden = false;
  }else{
    backToTop.hidden = true;
  }

});

backToTop.addEventListener("click", ()=>{
  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
});


function guardarColor() {
    const color = document.getElementById('colorPrincipal').value;
    localStorage.setItem('tema_color', color);
    // Aplicar inmediatamente en esta página
    document.documentElement.style.setProperty('--primary', color);
    mostrarToast('Color actualizado');
}

// Cargar el color guardado al iniciar
const colorGuardado = localStorage.getItem('tema_color') || '#0b84d8';
document.getElementById('colorPrincipal').value = colorGuardado;
document.documentElement.style.setProperty('--primary', colorGuardado);

// Agregar evento change al input
document.getElementById('colorPrincipal').addEventListener('input', guardarColor);
// AÑO FOOTER

document.getElementById("currentYear").textContent =
new Date().getFullYear();
// ========== GESTIÓN DE SESIÓN ==========
function actualizarInterfazUsuario() {
  const authArea = document.getElementById('auth-area');
  if (!authArea) return;

  const usuarioActivo = localStorage.getItem('usuario_activo');
  if (usuarioActivo) {
    const usuario = JSON.parse(usuarioActivo);
    // Mostrar nombre + cerrar sesión
    authArea.innerHTML = `
      <div class="user-info">
        <i class="fas fa-user-circle"></i>
        <span>Hola, ${usuario.nombre.split(' ')[0]}</span>
        <button id="cerrarSesionBtn" class="btn-logout">
          <i class="fas fa-sign-out-alt"></i> Salir
        </button>
      </div>
    `;
    const btnCerrar = document.getElementById('cerrarSesionBtn');
    if (btnCerrar) {
      btnCerrar.addEventListener('click', () => {
        localStorage.removeItem('usuario_activo');
        actualizarInterfazUsuario();  // refrescar
        window.location.reload();      // recargar para volver al estado inicial
      });
    }
  } else {
    // Mostrar botón de Acceder / Registrarse
    authArea.innerHTML = `
      <a href="registro.html" class="btn-login">
        <i class="fas fa-user-circle"></i> Acceder / Registrarse
      </a>
    `;
  }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', actualizarInterfazUsuario);
// FILTRO PROYECTOS

const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn=>{

  btn.addEventListener("click", ()=>{

    filterBtns.forEach(b=>b.classList.remove("filter-btn--active"));
    btn.classList.add("filter-btn--active");

    const filter = btn.dataset.filter;

    projectCards.forEach(card=>{

      if(filter === "all" || card.dataset.category === filter){
        card.style.display = "block";
      }else{
        card.style.display = "none";
      }

    });

  });

});
// ========== CONFIGURACIÓN GLOBAL ==========
function aplicarConfigGlobal() {
    // Color de fondo
    const color = localStorage.getItem('config_color');
    if (color) {
        document.body.style.backgroundColor = color;
        // También podemos cambiar el color de fondo de la sidebar si queremos
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.backgroundColor = color; // o un tono derivado
        }
    }

    // Idioma
    const idioma = localStorage.getItem('config_idioma') || 'es';
    // Traducciones básicas para elementos con clase "i18n"
    const traducciones = {
        es: {
            'Dashboard': 'Dashboard',
            'CRM Clientes': 'CRM Clientes',
            'ERP Gestión': 'ERP Gestión',
            'Configuración': 'Configuración',
            'Facturación y Cobranza': 'Facturación y Cobranza',
            'Gestión de Redes': 'Gestión de Redes',
            'Mantenimiento': 'Mantenimiento',
            'Reportes': 'Reportes',
            'Bienvenido': 'Bienvenido',
            'Usuarios Activos': 'Usuarios Activos',
            'Recibos Emitidos': 'Recibos Emitidos',
            'Pagos del Mes': 'Pagos del Mes',
            'Reclamos Pendientes': 'Reclamos Pendientes',
            'Consumo de Agua - Últimos 6 Meses': 'Consumo de Agua - Últimos 6 Meses',
            'Avisos Importantes': 'Avisos Importantes',
            'Atención al Cliente': 'Atención al Cliente',
        },
        en: {
            'Dashboard': 'Dashboard',
            'CRM Clientes': 'CRM Clients',
            'ERP Gestión': 'ERP Management',
            'Configuración': 'Settings',
            'Facturación y Cobranza': 'Billing and Collection',
            'Gestión de Redes': 'Network Management',
            'Mantenimiento': 'Maintenance',
            'Reportes': 'Reports',
            'Bienvenido': 'Welcome',
            'Usuarios Activos': 'Active Users',
            'Recibos Emitidos': 'Invoices Issued',
            'Pagos del Mes': 'Monthly Payments',
            'Reclamos Pendientes': 'Pending Claims',
            'Consumo de Agua - Últimos 6 Meses': 'Water Consumption - Last 6 Months',
            'Avisos Importantes': 'Important Alerts',
            'Atención al Cliente': 'Customer Service',
        }
    };

    // Seleccionar todos los elementos con atributo data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (traducciones[idioma] && traducciones[idioma][key]) {
            el.textContent = traducciones[idioma][key];
        }
    });

    // También podemos traducir el placeholder del buscador si tiene data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (traducciones[idioma] && traducciones[idioma][key]) {
            el.placeholder = traducciones[idioma][key];
        }
    });
}

// Ejecutar al cargar la página y también cuando se guarde la configuración (opcional)
document.addEventListener('DOMContentLoaded', aplicarConfigGlobal);
// Si queremos aplicar cambios sin recargar, podemos llamar a esta función desde configuracion.html
// Pero es más sencillo recargar la página.