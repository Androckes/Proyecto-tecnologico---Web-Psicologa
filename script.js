const yearNode = document.querySelector("#year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

const menuToggle = document.querySelector(".menu-toggle");
const mainMenu = document.querySelector("#main-menu");

if (menuToggle && mainMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mainMenu.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  mainMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      mainMenu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });
}

const bookingForm = document.querySelector("#booking-form");
const feedbackNode = document.querySelector("#form-feedback");

if (bookingForm) {
  const dateInput = bookingForm.querySelector('input[name="date"]');

  if (dateInput) {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    dateInput.min = localDate;

    dateInput.addEventListener("input", () => {
      const pickedDate = new Date(`${dateInput.value}T00:00:00`);
      const isSunday = pickedDate.getDay() === 0;

      if (dateInput.value && isSunday) {
        dateInput.setCustomValidity("Por favor elige una fecha distinta a domingo.");
      } else {
        dateInput.setCustomValidity("");
      }
    });
  }

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (dateInput) {
      dateInput.dispatchEvent(new Event("input", { bubbles: true }));
    }

    if (!bookingForm.reportValidity()) {
      if (feedbackNode) {
        feedbackNode.hidden = false;
        feedbackNode.classList.add("is-error");
        feedbackNode.textContent =
          "Por favor revisa los campos obligatorios para poder enviar tu solicitud con tranquilidad.";
      }
      return;
    }

    if (feedbackNode) {
      feedbackNode.hidden = false;
      feedbackNode.classList.remove("is-error");
      feedbackNode.textContent =
        "Tu solicitud fue recibida correctamente. Gracias por dar este primer paso. Cinthya se pondrá en contacto contigo para continuar la coordinación.";
    }

    bookingForm.reset();

    if (dateInput) {
      const today = new Date();
      const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
      dateInput.min = localDate;
      dateInput.setCustomValidity("");
    }
  });
}
