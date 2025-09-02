// ====================================================
// Horizontal Video Swiper with Play Conditions
// ====================================================
const allVideoTestimonialHorizontal = document.querySelector(
  ".all-video-horizontal-swiper-container"
);
const videoNextButtonHorizontal = document.querySelector(
  ".horizontal-video-swiper-right-button"
);
const videoPrevButtonHorizontal = document.querySelector(
  ".horizontal-video-swiper-left-button"
);
const allHorizontalVideoArray = [...allVideoTestimonialHorizontal.children];

let currentIndexHorizontal = 0;
let autoplayIntervalHorizontal;
let isVideoPlayingHorizontal = false;

// ----------------------
// Animation Functions
// ----------------------
function triggerEntryAnimationsHorizontal(slide) {
  const leftSection = slide.querySelector(
    ".horizontal-video-swiper-testimonial-left"
  );
  const quoteEl = slide.querySelector(".video-swiper-testimonial-quote");
  const authorBoxEl = slide.querySelector(".video-swiper-author-box");
  const logoEl = slide.querySelector(".logo");

  logoEl.classList.remove("fade-out-slide-down");
  void logoEl.offsetWidth;
  logoEl.classList.add("fade-in-slide-up");

  leftSection.classList.remove("zoom-out");
  void leftSection.offsetWidth;
  leftSection.classList.add("zoom-in");

  quoteEl.classList.remove("fade-out-slide-down");
  void quoteEl.offsetWidth;
  quoteEl.classList.add("fade-in-slide-up");

  authorBoxEl.classList.remove("fade-out-slide-down");
  void authorBoxEl.offsetWidth;
  authorBoxEl.classList.add("fade-in-slide-up-slow");
}

function triggerExitAnimationsHorizontal(slide) {
  const leftSection = slide.querySelector(
    ".horizontal-video-swiper-testimonial-left"
  );
  const quoteEl = slide.querySelector(".video-swiper-testimonial-quote");
  const authorBoxEl = slide.querySelector(".video-swiper-author-box");
  const logoEl = slide.querySelector(".logo");

  logoEl.classList.remove("fade-in-slide-up");
  logoEl.classList.add("fade-out-slide-down");

  leftSection.classList.remove("zoom-in");
  leftSection.classList.add("zoom-out");

  quoteEl.classList.remove("fade-in-slide-up");
  quoteEl.classList.add("fade-out-slide-down");

  authorBoxEl.classList.remove("fade-in-slide-up-slow");
  authorBoxEl.classList.add("fade-out-slide-down");
}

// ----------------------
// Play Button Logic
// ----------------------
function attachPlayButtonListenerHorizontal(currentSlide) {
  const playButton = currentSlide.querySelector(".swiper-play-button");
  const closeButton = currentSlide.querySelector(".swiper-close-button");
  const videoIframe = currentSlide.querySelector(
    ".video-swiper-testimonial-video"
  );

  // Reset all other slides
  allHorizontalVideoArray.forEach((slide, idx) => {
    if (idx !== currentIndexHorizontal) {
      const iframe = slide.querySelector(".video-swiper-testimonial-video");
      const playBtn = slide.querySelector(".swiper-play-button");
      const closeBtn = slide.querySelector(".swiper-close-button");

      iframe.src = iframe.src.replace("&autoplay=1", "");
      iframe.style.display = "none";
      playBtn.style.display = "flex";
      if (closeBtn) closeBtn.style.display = "none";
    }
  });

  if (playButton && videoIframe) {
    playButton.onclick = () => {
      clearInterval(autoplayIntervalHorizontal);
      isVideoPlayingHorizontal = true;

      videoIframe.style.display = "block";
      if (!videoIframe.src.includes("&autoplay=1")) {
        videoIframe.src += "&autoplay=1";
      }

      playButton.style.display = "none";
      if (closeButton) closeButton.style.display = "flex";
    };
  }

  if (closeButton && videoIframe) {
    closeButton.onclick = () => {
      videoIframe.src = videoIframe.src.replace("&autoplay=1", "");
      videoIframe.style.display = "none";
      if (playButton) playButton.style.display = "flex";
      closeButton.style.display = "none";
      isVideoPlayingHorizontal = false;
      startAutoplayHorizontal();
    };
  }
}

// ----------------------
// Update Display
// ----------------------
function updateVideoDisplayHorizontal() {
  allHorizontalVideoArray.forEach((child, idx) => {
    child.style.display = idx === currentIndexHorizontal ? "flex" : "none";
  });

  const currentSlide = allHorizontalVideoArray[currentIndexHorizontal];
  triggerEntryAnimationsHorizontal(currentSlide);
  attachPlayButtonListenerHorizontal(currentSlide);
}

// ----------------------
// Autoplay
// ----------------------
function startAutoplayHorizontal() {
  if (isVideoPlayingHorizontal) return;
  clearInterval(autoplayIntervalHorizontal);

  autoplayIntervalHorizontal = setInterval(() => {
    const currentSlide = allHorizontalVideoArray[currentIndexHorizontal];
    triggerExitAnimationsHorizontal(currentSlide);

    setTimeout(() => {
      currentIndexHorizontal =
        (currentIndexHorizontal + 1) % allHorizontalVideoArray.length;
      updateVideoDisplayHorizontal();
    }, 200);
  }, 5000);
}

// ----------------------
// Navigation
// ----------------------
function goToNextVideoHorizontal() {
  if (isVideoPlayingHorizontal) return;
  const currentSlide = allHorizontalVideoArray[currentIndexHorizontal];
  triggerExitAnimationsHorizontal(currentSlide);
  clearInterval(autoplayIntervalHorizontal);

  setTimeout(() => {
    currentIndexHorizontal =
      (currentIndexHorizontal + 1) % allHorizontalVideoArray.length;
    updateVideoDisplayHorizontal();
  }, 200);
}

function goToPrevVideoHorizontal() {
  if (isVideoPlayingHorizontal) return;
  const currentSlide = allHorizontalVideoArray[currentIndexHorizontal];
  triggerExitAnimationsHorizontal(currentSlide);
  clearInterval(autoplayIntervalHorizontal);

  setTimeout(() => {
    currentIndexHorizontal =
      (currentIndexHorizontal - 1 + allHorizontalVideoArray.length) %
      allHorizontalVideoArray.length;
    updateVideoDisplayHorizontal();
  }, 200);
}

// ----------------------
// Event Listeners
// ----------------------
videoNextButtonHorizontal.addEventListener("click", goToNextVideoHorizontal);
videoPrevButtonHorizontal.addEventListener("click", goToPrevVideoHorizontal);

allVideoTestimonialHorizontal.addEventListener("mouseenter", () =>
  clearInterval(autoplayIntervalHorizontal)
);
allVideoTestimonialHorizontal.addEventListener("mouseleave", () => {
  if (!isVideoPlayingHorizontal) startAutoplayHorizontal();
});

// ----------------------
// Init
// ----------------------
updateVideoDisplayHorizontal();
startAutoplayHorizontal();
