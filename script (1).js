/* =========================================================
   PORTFOLIO - JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     NAVBAR AU SCROLL
  ======================================================= */

  const navbar = document.querySelector(".navbar");

  function updateNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateNavbar);

  updateNavbar();


  /* =======================================================
     SCROLL FLUIDE
  ======================================================= */

  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const navbarHeight = navbar.offsetHeight;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =======================================================
     APPARITION DES SECTIONS
  ======================================================= */

  const revealElements = document.querySelectorAll(
    ".section-title, .formation-card, .experience, .skill-card, .contact-section"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });


  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach(element => {
    observer.observe(element);
  });


  /* =======================================================
     ANIMATION DES COMPETENCES
  ======================================================= */

  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card, index) => {

    card.style.transitionDelay = `${index * 70}ms`;

    card.addEventListener("mouseenter", () => {

      skillCards.forEach(otherCard => {

        if (otherCard !== card) {
          otherCard.style.opacity = "0.55";
        }

      });

    });


    card.addEventListener("mouseleave", () => {

      skillCards.forEach(otherCard => {
        otherCard.style.opacity = "1";
      });

    });

  });


  /* =======================================================
     EFFET PARALLAXE PHOTO
  ======================================================= */

  const profile = document.querySelector(".profile-wrapper");

  if (profile && window.matchMedia("(pointer:fine)").matches) {

    profile.addEventListener("mousemove", event => {

      const rect = profile.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      profile.style.transform = `
        perspective(800px)
        rotateY(${x * 5}deg)
        rotateX(${y * -5}deg)
      `;

    });


    profile.addEventListener("mouseleave", () => {

      profile.style.transform = `
        perspective(800px)
        rotateY(0deg)
        rotateX(0deg)
      `;

    });

  }


  /* =======================================================
     EXPERIENCE CARDS
  ======================================================= */

  const experiences =
    document.querySelectorAll(".experience-card");

  experiences.forEach(card => {

    card.addEventListener("mouseenter", () => {

      card.style.zIndex = "5";

    });

    card.addEventListener("mouseleave", () => {

      card.style.zIndex = "1";

    });

  });


  /* =======================================================
     EFFET CURSEUR SUR LES BOUTONS
  ======================================================= */

  const buttons = document.querySelectorAll(
    ".primary-btn, .secondary-btn, .contact-btn"
  );

  buttons.forEach(button => {

    button.addEventListener("mousemove", event => {

      const rect = button.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      button.style.setProperty("--mouse-x", `${x}px`);
      button.style.setProperty("--mouse-y", `${y}px`);

    });

  });


  /* =======================================================
     ANNEE AUTOMATIQUE DU FOOTER
  ======================================================= */

  const footer = document.querySelector("footer");

  if (footer) {

    const year = new Date().getFullYear();

    footer.innerHTML = footer.innerHTML.replace(
      /©\s*\d{4}/,
      `© ${year}`
    );

  }


  /* =======================================================
     CONSOLE
  ======================================================= */

  console.log(
    "Portfolio Adriano Buisine-Fanesi — site chargé."
  );

});
