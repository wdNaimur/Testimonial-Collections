// ====================================================
// Vertical Video Swiper
// ====================================================
const allVideoTestimonialVertical = document.querySelector(
  ".all-video-swiper-container"
);
const videoNextButtonsVertical = document.querySelectorAll(
  ".video-swiper-right-button"
);
const videoPrevButtonsVertical = document.querySelectorAll(
  ".video-swiper-left-button"
);
const allVideoArrayVertical = [...allVideoTestimonialVertical.children];

let currentVideoIndexVertical = 0;
let autoplayIntervalVertical;
let isVideoPlayingVertical = false;

function resetAndTriggerAnimationsVertical(currentSlide) {
  const quoteEl = currentSlide.querySelector(".video-swiper-testimonial-quote");
  const authorBoxEl = currentSlide.querySelector(".video-swiper-author-box");
  const topSection = currentSlide.querySelector(
    ".video-swiper-testimonial-top"
  );

  quoteEl.classList.remove("fade-out-slide-down");
  void quoteEl.offsetWidth;
  quoteEl.classList.add("fade-in-slide-up");

  authorBoxEl.classList.remove("fade-out-slide-down");
  void authorBoxEl.offsetWidth;
  authorBoxEl.classList.add("fade-in-slide-up-slow");

  topSection.classList.remove("zoom-out");
  void topSection.offsetWidth;
  topSection.classList.add("zoom-in");
}

function triggerExitAnimationsVertical(currentSlide) {
  const quoteEl = currentSlide.querySelector(".video-swiper-testimonial-quote");
  const authorBoxEl = currentSlide.querySelector(".video-swiper-author-box");
  const topSection = currentSlide.querySelector(
    ".video-swiper-testimonial-top"
  );

  quoteEl.classList.remove("fade-in-slide-up");
  quoteEl.classList.add("fade-out-slide-down");

  authorBoxEl.classList.remove("fade-in-slide-up-slow");
  authorBoxEl.classList.add("fade-out-slide-down");

  topSection.classList.remove("zoom-in");
  topSection.classList.add("zoom-out");
}

function attachPlayButtonListenerVertical(currentSlide) {
  const playButton = currentSlide.querySelector(".swiper-play-button");
  const closeButton = currentSlide.querySelector(".swiper-close-button");
  const videoIframe = currentSlide.querySelector(
    ".video-swiper-testimonial-video"
  );

  allVideoArrayVertical.forEach((slide, idx) => {
    if (idx !== currentVideoIndexVertical) {
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
      clearInterval(autoplayIntervalVertical);
      isVideoPlayingVertical = true;
      videoIframe.style.display = "block";
      videoIframe.src += "&autoplay=1";
      playButton.style.display = "none";
      if (closeButton) closeButton.style.display = "flex";
    };
  }

  if (closeButton && videoIframe) {
    closeButton.onclick = () => {
      videoIframe.src = videoIframe.src.replace("&autoplay=1", "");
      videoIframe.style.display = "none";
      if (playButton) playButton.style.display = "flex";
      if (closeButton) closeButton.style.display = "none";
      isVideoPlayingVertical = false;
      startAutoplayVertical();
    };
  }
}

function updateVideoDisplayVertical() {
  allVideoArrayVertical.forEach((child, idx) => {
    child.style.display = idx === currentVideoIndexVertical ? "block" : "none";
  });

  const currentSlide = allVideoArrayVertical[currentVideoIndexVertical];
  resetAndTriggerAnimationsVertical(currentSlide);
  attachPlayButtonListenerVertical(currentSlide);
}

function startAutoplayVertical() {
  if (isVideoPlayingVertical) return;
  clearInterval(autoplayIntervalVertical);

  autoplayIntervalVertical = setInterval(() => {
    const currentSlide = allVideoArrayVertical[currentVideoIndexVertical];
    triggerExitAnimationsVertical(currentSlide);

    setTimeout(() => {
      currentVideoIndexVertical =
        (currentVideoIndexVertical + 1) % allVideoArrayVertical.length;
      updateVideoDisplayVertical();
    }, 200);
  }, 5000);
}

videoNextButtonsVertical.forEach((button) => {
  button.addEventListener("click", () => {
    if (isVideoPlayingVertical) return;
    const currentSlide = allVideoArrayVertical[currentVideoIndexVertical];
    triggerExitAnimationsVertical(currentSlide);
    clearInterval(autoplayIntervalVertical);
    setTimeout(() => {
      currentVideoIndexVertical =
        (currentVideoIndexVertical + 1) % allVideoArrayVertical.length;
      updateVideoDisplayVertical();
    }, 200);
  });
});

videoPrevButtonsVertical.forEach((button) => {
  button.addEventListener("click", () => {
    if (isVideoPlayingVertical) return;
    const currentSlide = allVideoArrayVertical[currentVideoIndexVertical];
    triggerExitAnimationsVertical(currentSlide);
    clearInterval(autoplayIntervalVertical);
    setTimeout(() => {
      currentVideoIndexVertical =
        (currentVideoIndexVertical - 1 + allVideoArrayVertical.length) %
        allVideoArrayVertical.length;
      updateVideoDisplayVertical();
    }, 200);
  });
});

allVideoTestimonialVertical.addEventListener("mouseenter", () =>
  clearInterval(autoplayIntervalVertical)
);
allVideoTestimonialVertical.addEventListener("mouseleave", () => {
  if (!isVideoPlayingVertical) startAutoplayVertical();
});

// Init Vertical
updateVideoDisplayVertical();
startAutoplayVertical();
