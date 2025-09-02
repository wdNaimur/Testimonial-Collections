const allVideoTestimonial = document.querySelector(
  ".all-video-swiper-container"
);
const videoNextButtons = document.querySelectorAll(
  ".video-swiper-right-button"
);
const videoPrevButtons = document.querySelectorAll(".video-swiper-left-button");
const allVideoArray = [...allVideoTestimonial.children];

let currentVideoIndex = 0;
let autoplayInterval;
let isVideoPlaying = false;

// ----------------------
// Animation Functions
// ----------------------
function resetAndTriggerAnimations(currentSlide) {
  const quoteEl = currentSlide.querySelector(".video-swiper-testimonial-quote");
  const authorBoxEl = currentSlide.querySelector(".video-swiper-author-box");
  const topSection = currentSlide.querySelector(
    ".video-swiper-testimonial-top"
  );

  quoteEl.classList.remove("fade-out-slide-up");
  void quoteEl.offsetWidth; // restart animation
  quoteEl.classList.add("fade-in-slide-up");

  authorBoxEl.classList.remove("fade-out-slide-up-slow");
  void authorBoxEl.offsetWidth;
  authorBoxEl.classList.add("fade-in-slide-up-slow");

  topSection.classList.remove("zoom-out");
  void topSection.offsetWidth;
  topSection.classList.add("zoom-in");
}

function triggerExitAnimations(currentSlide) {
  const quoteEl = currentSlide.querySelector(".video-swiper-testimonial-quote");
  const authorBoxEl = currentSlide.querySelector(".video-swiper-author-box");
  const topSection = currentSlide.querySelector(
    ".video-swiper-testimonial-top"
  );

  quoteEl.classList.remove("fade-in-slide-up");
  quoteEl.classList.add("fade-out-slide-up");

  authorBoxEl.classList.remove("fade-in-slide-up-slow");
  authorBoxEl.classList.add("fade-out-slide-up-slow");

  topSection.classList.remove("zoom-in");
  topSection.classList.add("zoom-out");
}

// ----------------------
// Play / Close Video
// ----------------------
function attachPlayButtonListener(currentSlide) {
  const playButton = currentSlide.querySelector(".swiper-play-button");
  const closeButton = currentSlide.querySelector(".swiper-close-button");
  const videoIframe = currentSlide.querySelector(
    ".video-swiper-testimonial-video"
  );

  // Reset previous video
  allVideoArray.forEach((slide, idx) => {
    if (idx !== currentVideoIndex) {
      const iframe = slide.querySelector(".video-swiper-testimonial-video");
      const playBtn = slide.querySelector(".swiper-play-button");
      const closeBtn = slide.querySelector(".swiper-close-button");

      iframe.src = iframe.src.replace("&autoplay=1", "");
      iframe.style.display = "none";
      playBtn.style.display = "flex";
      if (closeBtn) closeBtn.style.display = "none";
    }
  });

  // Play
  if (playButton && videoIframe) {
    playButton.onclick = () => {
      clearInterval(autoplayInterval);
      isVideoPlaying = true;
      videoIframe.style.display = "block";
      videoIframe.src += "&autoplay=1";
      playButton.style.display = "none";
      if (closeButton) closeButton.style.display = "flex";
    };
  }

  // Close
  if (closeButton && videoIframe) {
    closeButton.onclick = () => {
      videoIframe.src = videoIframe.src.replace("&autoplay=1", "");
      videoIframe.style.display = "none";
      if (playButton) playButton.style.display = "flex";
      if (closeButton) closeButton.style.display = "none";
      isVideoPlaying = false;
      startAutoplay();
    };
  }
}

// ----------------------
// Update Display
// ----------------------
function updateVideoDisplay() {
  allVideoArray.forEach((child, idx) => {
    child.style.display = idx === currentVideoIndex ? "block" : "none";
  });

  const currentSlide = allVideoArray[currentVideoIndex];
  resetAndTriggerAnimations(currentSlide);
  attachPlayButtonListener(currentSlide);
}

// ----------------------
// Autoplay
// ----------------------
function startAutoplay() {
  if (isVideoPlaying) return;
  clearInterval(autoplayInterval);

  autoplayInterval = setInterval(() => {
    const currentSlide = allVideoArray[currentVideoIndex];
    triggerExitAnimations(currentSlide);

    setTimeout(() => {
      currentVideoIndex = (currentVideoIndex + 1) % allVideoArray.length;
      updateVideoDisplay();
    }, 600);
  }, 5000);
}

// ----------------------
// Navigation
// ----------------------
videoNextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isVideoPlaying) return;
    const currentSlide = allVideoArray[currentVideoIndex];
    triggerExitAnimations(currentSlide);
    setTimeout(() => {
      currentVideoIndex = (currentVideoIndex + 1) % allVideoArray.length;
      updateVideoDisplay();
    }, 600);
  });
});

videoPrevButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isVideoPlaying) return;
    const currentSlide = allVideoArray[currentVideoIndex];
    triggerExitAnimations(currentSlide);
    setTimeout(() => {
      currentVideoIndex =
        (currentVideoIndex - 1 + allVideoArray.length) % allVideoArray.length;
      updateVideoDisplay();
    }, 600);
  });
});

// ----------------------
// Pause on hover
// ----------------------
allVideoTestimonial.addEventListener("mouseenter", () =>
  clearInterval(autoplayInterval)
);
allVideoTestimonial.addEventListener("mouseleave", () => {
  if (!isVideoPlaying) startAutoplay();
});

// ----------------------
// Init
// ----------------------
updateVideoDisplay();
startAutoplay();
