document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".donate-button");

  if (button) {
    button.addEventListener("mouseenter", () => {
      button.style.borderColor = "#b6ffb6";
    });

    button.addEventListener("mouseleave", () => {
      button.style.borderColor = "#00ff00";
    });
  }
});
