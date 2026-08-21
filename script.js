const h3 = document.querySelectorAll("footer h4");
const ul = document.querySelectorAll("footer ul.u__gap-8");
const navToggle = document.querySelector(".c__nav-toggle");
const contact = document.querySelectorAll(".contact");

// ==========================================================================
// Toggle Visibility of Footer Lists
// ==========================================================================
h3.forEach((v, i) => {
  v.addEventListener("click", () => {
    if (ul[i]) {
      ul[i].classList.toggle("show");
    }
  });
});

// ==========================================================================
// Toggle Main Mobile Navigation Menu
// ==========================================================================
if (navToggle) {
  navToggle.addEventListener("click", () => {
    const navMenu = document.querySelector(".c__nav");
    if (navMenu) {
      navMenu.classList.toggle("show");
    }
  });
}

// ==========================================================================
// Slider Engine Factory
// ==========================================================================
function initializeAutoplaySlider(containerSelector, intervalTime = 2000) {
  const gridContainer = document.querySelector(containerSelector);
  if (!gridContainer || !gridContainer.firstElementChild) return;

  let toScroll = 0;
  let slideWidth = gridContainer.firstElementChild.offsetWidth;

  const updateSlideWidth = () => {
    const gap = parseInt(getComputedStyle(gridContainer).columnGap || "0", 10);
    slideWidth = gridContainer.firstElementChild.offsetWidth + gap;
  };

  // Run initial calculation and attach to viewport resizes
  updateSlideWidth();
  window.addEventListener("resize", updateSlideWidth);

  // Core Slider Animation Interval
  setInterval(() => {
    toScroll -= slideWidth;

    // Check if the scroll offset has reached the absolute end of the boundary tracks
    if (
      Math.abs(toScroll) >=
      gridContainer.scrollWidth - gridContainer.offsetWidth
    ) {
      toScroll = 0; // Seamless reset to first slide position
      gridContainer.style.transition = "none";
      gridContainer.style.transform = `translateX(${toScroll}px)`;
      setTimeout(() => {
        gridContainer.style.transition = "transform 0.5s ease-in-out";
      }, 50);
    } else {
      gridContainer.style.transform = `translateX(${toScroll}px)`;
      gridContainer.style.transition = "transform 0.5s ease-in-out";
    }
  }, intervalTime);
}

// ==========================================================================
// Initialize Dynamic Layout Sliders
// ==========================================================================
window.addEventListener("DOMContentLoaded", () => {
  // 1. Core Services Carousel Loop
  initializeAutoplaySlider("#services .c__slider .u__grid-col-3", 2000);

  // 2. Client Testimonials Carousel Loop (Targets your testimonials selector)
  initializeAutoplaySlider("#testimonials .c__slider .u__grid-col-3", 3000);
});
