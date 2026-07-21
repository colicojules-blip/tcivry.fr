const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = data.get("name").trim();
    const email = data.get("email").trim();
    const subject = data.get("subject").trim();
    const message = data.get("message").trim();

    if (!name || !email || !message) {
      formMessage.textContent = "Merci de compléter les champs obligatoires.";
      return;
    }

    const body = [
      `Nom : ${name}`,
      `Email : ${email}`,
      "",
      message
    ].join("\n");

    const mailto = `mailto:tcivry@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    formMessage.textContent = "Votre application email va s'ouvrir avec le message préparé.";
    window.location.href = mailto;
  });
}

const registrationLinks = document.querySelectorAll(".registration-link");
const registrationNotice = document.querySelector("#registrationNotice");

registrationLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    if (registrationNotice) {
      registrationNotice.textContent =
        "Les inscriptions pour la saison 2026/2027 ne sont pas encore ouvertes. Elles arrivent bientôt !";
      registrationNotice.scrollIntoView({ behavior: "smooth", block: "center" });
      registrationNotice.focus({ preventScroll: true });
    }

    window.alert(
      "Les inscriptions pour la saison 2026/2027 ne sont pas encore ouvertes. Elles arrivent bientôt !"
    );
  });
});
