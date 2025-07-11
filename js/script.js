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

////////////// History popup //////////////
document.getElementById("historyModal").style.display = "none";

document
  .querySelector(".section__history button")
  .addEventListener("click", () => {
    document.getElementById("historyModal").style.display = "flex";
  });

document.getElementById("closeHistoryModal").addEventListener("click", () => {
  document.getElementById("historyModal").style.display = "none";
});

document.getElementById("historyModal").addEventListener("click", (e) => {
  if (e.target.id === "historyModal") {
    e.currentTarget.style.display = "none";
  }
});

////////////// Winemaking popup //////////////

document.getElementById("seeHowItMadeBtn").addEventListener("click", () => {
  document.getElementById("winemakingModal").style.display = "flex";
});

// Show modal
document
  .querySelector(".winemaking .text_and_button_continer button")
  .addEventListener("click", () => {
    document.getElementById("winemakingModal").style.display = "flex";
  });

// Close modal
document
  .getElementById("closeWinemakingModal")
  .addEventListener("click", () => {
    document.getElementById("winemakingModal").style.display = "none";
  });

// Close when clicking outside the content
document.getElementById("winemakingModal").addEventListener("click", (e) => {
  if (e.target.id === "winemakingModal") {
    e.currentTarget.style.display = "none";
  }
});
