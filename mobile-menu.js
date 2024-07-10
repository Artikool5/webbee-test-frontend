const mobileMenuBtns = document.querySelectorAll("header button");
const mobileMenu = document.querySelector(".page-header__bottom");
const mobileMenuBackdrop = document.querySelector(".mobile-menu__backdrop");

function openMenu() {
  mobileMenu.classList.add("mobile-menu-open");
  mobileMenuBackdrop.addEventListener("click", closeMenu);
}
function closeMenu() {
  mobileMenu.classList.remove("mobile-menu-open");
  mobileMenuBackdrop.removeEventListener("click", closeMenu);
}

mobileMenuBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const openedMenu = document.querySelector(".mobile-menu-open");
    if (openedMenu) {
      closeMenu();
    } else openMenu();
  });
});
