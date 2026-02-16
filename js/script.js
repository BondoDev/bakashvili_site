document.addEventListener("DOMContentLoaded", () => {
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

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        popup.classList.remove("active");
      });
    }
  }

  const historyModal = document.getElementById("historyModal");
  const historyOpenBtn = document.querySelector(".section__history button");
  const historyCloseBtn = document.getElementById("closeHistoryModal");

  if (historyModal && historyOpenBtn && historyCloseBtn) {
    historyModal.style.display = "none";

    historyOpenBtn.addEventListener("click", () => {
      historyModal.style.display = "flex";
    });

    historyCloseBtn.addEventListener("click", () => {
      historyModal.style.display = "none";
    });

    historyModal.addEventListener("click", (e) => {
      if (e.target === historyModal) {
        historyModal.style.display = "none";
      }
    });
  }

  const winemakingModal = document.getElementById("winemakingModal");
  const winemakingHeaderBtn = document.getElementById("seeHowItMadeBtn");
  const winemakingSectionBtn = document.querySelector(
    ".winemaking .text_and_button_continer button"
  );
  const winemakingCloseBtn = document.getElementById("closeWinemakingModal");

  if (winemakingModal) {
    if (winemakingHeaderBtn) {
      winemakingHeaderBtn.addEventListener("click", () => {
        winemakingModal.style.display = "flex";
      });
    }

    if (winemakingSectionBtn) {
      winemakingSectionBtn.addEventListener("click", () => {
        winemakingModal.style.display = "flex";
      });
    }

    if (winemakingCloseBtn) {
      winemakingCloseBtn.addEventListener("click", () => {
        winemakingModal.style.display = "none";
      });
    }

    winemakingModal.addEventListener("click", (e) => {
      if (e.target === winemakingModal) {
        winemakingModal.style.display = "none";
      }
    });
  }
});
