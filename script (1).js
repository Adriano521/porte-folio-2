// ========================================
// PORTFOLIO — JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // 1. SCROLL FLUIDE
  // ========================================

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      // Ignore les liens "#"
      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  // ========================================
  // 2. NAVBAR AU SCROLL
  // ========================================

  const header = document.querySelector(".header");

  const updateHeader = () => {

    if (!header) {
      return;
    }

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  };

  window.addEventListener("scroll", updateHeader);

  updateHeader();


  // ========================================
  // 3. ANIMATION DES ÉLÉMENTS
  // ========================================

  const animatedElements = document.querySelectorAll(
    ".skill-card, .project-card, .about-content, .section-heading"
  );


  // Vérifie si l'utilisateur préfère
  // réduire les animations.
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  if (!prefersReducedMotion && "IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.15
      }
    );


    animatedElements.forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });

  } else {

    // Si les animations sont désactivées,
    // on affiche directement les éléments.
    animatedElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  // ========================================
  // 4. BOUTON "RETOUR EN HAUT"
  // ========================================

  const backToTop = document.createElement("button");

  backToTop.className = "back-to-top";
  backToTop.setAttribute("aria-label", "Retour en haut");
  backToTop.innerHTML = "↑";

  document.body.appendChild(backToTop);


  const updateBackToTop = () => {

    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

  };


  window.addEventListener("scroll", updateBackToTop);

  updateBackToTop();


  backToTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  // ========================================
  // 5. ANIMATION DU BOUTON PRINCIPAL
  // ========================================

  const buttons = document.querySelectorAll(".button");

  buttons.forEach((button) => {

    button.addEventListener("mouseenter", () => {
      button.classList.add("button-hover");
    });

    button.addEventListener("mouseleave", () => {
      button.classList.remove("button-hover");
    });

  });


  // ========================================
  // 6. EFFET PARALLAXE LÉGER SUR LA PHOTO
  // ========================================

  const heroVisual = document.querySelector(".hero-visual");

  if (
    heroVisual &&
    !prefersReducedMotion
  ) {

    heroVisual.addEventListener("mousemove", (event) => {

      const rect = heroVisual.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;


      heroVisual.style.transform = `
        perspective(1000px)
        rotateY(${x * 4}deg)
        rotateX(${-y * 4}deg)
      `;

    });


    heroVisual.addEventListener("mouseleave", () => {

      heroVisual.style.transform = `
        perspective(1000px)
        rotateY(0deg)
        rotateX(0deg)
      `;

    });

  }


  // ========================================
  // 7. ANNÉE AUTOMATIQUE DU FOOTER
  // ========================================

  const footerYear = document.querySelector(".footer-year");

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

});