const h3 = document.querySelectorAll("footer h3");
const ul = document.querySelectorAll("footer ul.u__gap-8");
const navToggle = document.querySelector(".c__nav-toggle");
console.log(navToggle);
const contact = document.querySelectorAll(".contact");

// Toggle visibility of footer lists
h3.forEach((v, i) => {
  v.addEventListener("click", () => {
    console.log(i);
    ul[i].classList.toggle("show"); // Fix index offset
  });
});

// Toggle nav menu
navToggle.addEventListener("click", () => {
  document.querySelector(".c__nav").classList.toggle("show");
});
const gridContainer = document.querySelector(".c__slider .u__grid-col-3");

let toScroll = 0;
let slideWidth = gridContainer.firstElementChild.offsetWidth; // Initial slide width
const totalSlides = gridContainer.children.length;

const updateSlideWidth = () => {
  const gap = parseInt(getComputedStyle(gridContainer).columnGap || 0, 10);
  slideWidth = gridContainer.firstElementChild.offsetWidth + gap;
};
updateSlideWidth();
window.addEventListener("resize", updateSlideWidth);

setInterval(() => {
  toScroll -= slideWidth;
  if (
    Math.abs(toScroll) >=
    gridContainer.scrollWidth - gridContainer.offsetWidth
  ) {
    toScroll = 0; // Reset to the beginning
    gridContainer.style.transition = "none";
    gridContainer.style.transform = `translateX(${toScroll}px)`;
    setTimeout(() => {
      gridContainer.style.transition = "transform 0.5s ease-in-out";
    });
  } else {
    gridContainer.style.transform = `translateX(${toScroll}px)`;
    gridContainer.style.transition = "transform 0.5s ease-in-out";
  }
}, 2000);
