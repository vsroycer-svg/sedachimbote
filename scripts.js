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