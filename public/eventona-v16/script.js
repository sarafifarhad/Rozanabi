const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf_gKvd5N5CdqtVNzwrhV2A1pfGS2S8l4vlRqe1BsoNuEO7LA/viewform";

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const eventForm = document.querySelector("[data-event-form]");

function updateHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

eventForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  // Current behavior: collect the visible fields, then open the official Google Form.
  // For real Google Form pre-fill, replace GOOGLE_FORM_URL with a prefilled link that contains entry IDs.
  const formData = new FormData(eventForm);
  const eventName = formData.get("eventName") || "your event";

  window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
  eventForm.reset();

  const note = document.querySelector(".form-note");
  if (note) {
    note.textContent = `Official Google Form opened for ${eventName}.`;
    window.setTimeout(() => {
      note.textContent = "After clicking submit, the official EVENTONA Google Form will open.";
    }, 4500);
  }
});


// Preview mode: keep all links and the form inactive.
document.addEventListener("click", (event) => {
  const disabledLink = event.target.closest('a[aria-disabled="true"]');
  if (disabledLink) {
    event.preventDefault();
  }
});

const disabledForm = document.querySelector("[data-disabled-form]");
if (disabledForm) {
  disabledForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}
