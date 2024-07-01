const sidebarCards = document.querySelectorAll(
  ".sidebar-card:not(.sidebar-card_user)"
);

sidebarCards.forEach((card) => {
  const cardHeader = card.querySelector(".sidebar-card__header");
  cardHeader.addEventListener("click", () => {
    card.classList.toggle("open");
  });
});
