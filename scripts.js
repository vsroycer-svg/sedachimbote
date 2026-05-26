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