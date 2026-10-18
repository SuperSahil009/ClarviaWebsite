const menuButton = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-site-nav]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const setMenuState = (isOpen) => {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", String(isOpen));
  navigation.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
};

menuButton?.addEventListener("click", () => {
  setMenuState(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
    menuButton?.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) setMenuState(false);
});
