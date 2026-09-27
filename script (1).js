const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("navMenu");
const progress = document.getElementById("progress");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});


document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});


const reveal = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        reveal.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll(".reveal")
  .forEach(element => reveal.observe(element));


document.querySelectorAll(".skill").forEach(skill => {

  skill.addEventListener("click", () => {

    const open = skill.classList.toggle("open");

    skill.setAttribute(
      "aria-expanded",
      open
    );

    skill.querySelector("b").textContent =
      open ? "−" : "+";

  });

});


const sections =
  document.querySelectorAll("main section[id]");

const links =
  document.querySelectorAll("nav a[href^='#']");


const activeSection = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        links.forEach(link => {

          link.classList.toggle(
            "active",
            link.getAttribute("href") ===
            `#${entry.target.id}`
          );

        });

      }

    });

  },
  {
    rootMargin: "-40% 0px -50% 0px"
  }
);


sections.forEach(section => {
  activeSection.observe(section);
});


window.addEventListener("scroll", () => {

  const max =
    document.documentElement.scrollHeight -
    window.innerHeight;

  progress.style.width =
    `${max ? (window.scrollY / max) * 100 : 0}%`;

});


document
  .getElementById("copyEmail")
  .addEventListener("click", async () => {

    await navigator.clipboard.writeText(
      "adriano.buisine@gmail.com"
    );

    const button =
      document.getElementById("copyEmail");

    const oldText =
      button.textContent;

    button.textContent =
      "Adresse copiée ✓";

    setTimeout(() => {
      button.textContent = oldText;
    }, 1800);

  });


document.getElementById("year").textContent =
  new Date().getFullYear();
