document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".navbar__hamburger");
  const popup = document.getElementById("mobileMenu");
  const closeBtn = document.querySelector(".navbar__close");

  if (hamburger && popup) {
    hamburger.addEventListener("click", () => {
      popup.classList.toggle("active");
    });

    popup.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        popup.classList.remove("active");
      });
    });

    // ✅ Close with "X"
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        popup.classList.remove("active");
      });
    }
  }
});
