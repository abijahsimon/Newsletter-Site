const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector("#mobile-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = mobileNav?.classList.toggle("is-open") ?? false;
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mobileNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    mobileNav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

