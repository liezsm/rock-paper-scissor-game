const rulesBtn = document.querySelector("[data-rules-btn]");

const closeBtn = document.querySelector("[data-close-btn]");

const modal = document.querySelector("[data-modal");
// todo fire a click even on rule button to show the rules modal

rulesBtn.addEventListener("click", (e) => {
  modal.classList.add("show-modal");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});
