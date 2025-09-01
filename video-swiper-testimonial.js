const allVideoTestimonial = document.querySelector(
  ".all-video-swiper-container"
);
const videoNextButtons = document.querySelectorAll(
  ".video-swiper-right-button"
);
const videoPrevButtons = document.querySelectorAll(".video-swiper-left-button");
const allVideoArray = [...allVideoTestimonial.children];

const quoteEl = document.querySelector(".video-swiper-testimonial-quote");
const authorBoxEl = document.querySelector(".video-swiper-author-box");
const topSection = document.querySelector(".video-swiper-testimonial-top");

let currentVideoIndex = 0;
let autoplayInterval;
let isVideoPlaying = false; // ✅ New flag

// Function to reset and trigger entry animations
function resetAndTriggerAnimations() {
  quoteEl.classList.remove("fade-out-slide-up");
  authorBoxEl.classList.remove("fade-out-slide-up-slow");
  topSection.classList.remove("zoom-out");

  void quoteEl.offsetWidth;
  void authorBoxEl.offsetWidth;
  void topSection.offsetWidth;

  quoteEl.classList.add("fade-in-slide-up");
  authorBoxEl.classList.add("fade-in-slide-up-slow");
  topSection.classList.add("zoom-in");
}

// Function to trigger exit animations
function triggerExitAnimations() {
  quoteEl.classList.remove("fade-in-slide-up");
  authorBoxEl.classList.remove("fade-in-slide-up-slow");

  quoteEl.classList.add("fade-out-slide-up");
  authorBoxEl.classList.add("fade-out-slide-up-slow");
}

// New function to handle the play button and close button logic for the active slide
function attachPlayButtonListener() {
  const currentSlide = allVideoArray[currentVideoIndex];
  const playButton = currentSlide.querySelector(".swiper-play-button");
  const closeButton = currentSlide.querySelector(".swiper-close-button");
  const videoIframe = currentSlide.querySelector(
    ".video-swiper-testimonial-video"
  );

  // Reset all video iframes
  allVideoArray.forEach((slide) => {
    const iframe = slide.querySelector(".video-swiper-testimonial-video");
    const playBtn = slide.querySelector(".swiper-play-button");
    const closeBtn = slide.querySelector(".swiper-close-button");

    iframe.src = iframe.src.replace("&autoplay=1", "");
    iframe.style.display = "none";
    playBtn.style.display = "flex";
    if (closeBtn) {
      closeBtn.style.display = "none";
    }
  });

  // Play button listener
  if (playButton && videoIframe) {
    const playListener = () => {
      clearInterval(autoplayInterval);
      isVideoPlaying = true; // ✅ stop autoplay when video plays
      videoIframe.style.display = "block";
      videoIframe.src += "&autoplay=1";
      playButton.style.display = "none";
      if (closeButton) {
        closeButton.style.display = "flex";
      }
    };
    playButton.onclick = null;
    playButton.onclick = playListener;
  }

  // Close button listener
  if (closeButton && videoIframe) {
    const closeListener = () => {
      const videoSrc = videoIframe.src;
      videoIframe.src = videoSrc.replace("&autoplay=1", "");
      videoIframe.style.display = "none";
      if (playButton) playButton.style.display = "flex";
      closeButton.style.display = "none";

      isVideoPlaying = false; // ✅ allow autoplay again
      startAutoplay();
    };
    closeButton.onclick = null;
    closeButton.onclick = closeListener;
  }
}

// Function to update the displayed video and its content
function updateVideoDisplay() {
  if (currentVideoIndex >= 0 && currentVideoIndex < allVideoArray.length) {
    allVideoArray.forEach((child) => {
      child.style.display = "none";
    });

    allVideoArray[currentVideoIndex].style.display = "block";

    resetAndTriggerAnimations();
    attachPlayButtonListener();
  } else {
    console.error("Invalid video index:", currentVideoIndex);
  }
}

// Function to start the autoplay
function startAutoplay() {
  if (isVideoPlaying) return; // ✅ don’t autoplay while video plays
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
  autoplayInterval = setInterval(() => {
    triggerExitAnimations();
    setTimeout(() => {
      currentVideoIndex = (currentVideoIndex + 1) % allVideoArray.length;
      updateVideoDisplay();
    }, 600);
  }, 5000);
}

// Event listener for the "next" buttons
videoNextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isVideoPlaying) return; // ✅ ignore if video is playing
    startAutoplay();
    triggerExitAnimations();
    setTimeout(() => {
      currentVideoIndex = (currentVideoIndex + 1) % allVideoArray.length;
      updateVideoDisplay();
    }, 600);
  });
});

// Event listener for the "previous" buttons
videoPrevButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isVideoPlaying) return; // ✅ ignore if video is playing
    startAutoplay();
    triggerExitAnimations();
    setTimeout(() => {
      currentVideoIndex =
        (currentVideoIndex - 1 + allVideoArray.length) % allVideoArray.length;
      updateVideoDisplay();
    }, 600);
  });
});

// Stop autoplay when hovering
allVideoTestimonial.addEventListener("mouseenter", () => {
  clearInterval(autoplayInterval);
});

// Restart autoplay when mouse leaves (only if no video is playing)
allVideoTestimonial.addEventListener("mouseleave", () => {
  if (!isVideoPlaying) startAutoplay();
});

// Initial setup
updateVideoDisplay();
startAutoplay();
