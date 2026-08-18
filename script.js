const h3 = document.querySelectorAll("footer h3");
const ul = document.querySelectorAll("footer ul.u__gap-8");
const navToggle = document.querySelector(".c__nav-toggle");
console.log(navToggle);
const contact = document.querySelectorAll(".contact");
const modal = document.querySelector(".c__modal");
const accordionHeader = document.querySelectorAll(".c__accordion-header");
const accordionContent = document.querySelectorAll(".c__accordion-content");
console.log(contact);
// Toggle visibility of footer lists
h3.forEach((v, i) => {
  v.addEventListener("click", () => {
    console.log(i);
    ul[i].classList.toggle("show"); // Fix index offset
  });
});
accordionHeader.forEach((v, i) => {
  v.addEventListener("click", () => {
    console.log(i);
    accordionContent[i].classList.toggle("show"); // Fix index offset
  });
});
contact.forEach((v) => {
  v.addEventListener("click", () => {
    modal.classList.add("show");
  });
});
modal.addEventListener("click", () => {
  modal.classList.remove("show");
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
