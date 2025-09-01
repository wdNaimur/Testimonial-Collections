const swiperContainer = document.querySelector(
  ".image-swiper-testimonial-content"
);
const childrenArray = [...swiperContainer.children];

let currentIndex = 0;
let mouseEnterTimeout;

// Function to update the view based on the current index
function updateSwiper() {
  // Add or remove the 'active-swiper' class for styling
  childrenArray.forEach((child, i) => {
    if (i === currentIndex) {
      child.classList.add("active-swiper");
    } else {
      child.classList.remove("active-swiper");
    }
  });

  // Dynamically calculate the transform value
  const gap = 24; // This value must match the gap in your CSS (1.5rem = 24px)
  let offset = 0;
  for (let i = 0; i < currentIndex; i++) {
    offset += childrenArray[i].offsetWidth + gap;
  }

  // Apply the transform to the parent container to move the content
  if (window.innerWidth > 1280) {
    swiperContainer.style.transform = `translateX(-${offset}px)`;
  }
}

// Show the first testimonial initially
updateSwiper();

// Next slide (non-looping)
function nextSlide() {
  if (currentIndex < childrenArray.length - 1) {
    currentIndex++;
  }
  updateSwiper();
}

// Previous slide (non-looping)
function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
  }
  updateSwiper();
}

// Add a slight delay for the 'mouseenter' effect on individual children
childrenArray.forEach((child, index) => {
  child.addEventListener("mouseenter", () => {
    clearTimeout(mouseEnterTimeout);
    mouseEnterTimeout = setTimeout(() => {
      currentIndex = index;
      updateSwiper();
    }, 500); // 500ms delay before switching
  });

  child.addEventListener("mouseleave", () => {
    clearTimeout(mouseEnterTimeout);
  });
});

// Attach button event listeners
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (nextBtn) nextBtn.addEventListener("click", nextSlide);
if (prevBtn) prevBtn.addEventListener("click", prevSlide);
