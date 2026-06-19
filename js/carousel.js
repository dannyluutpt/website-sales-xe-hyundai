// Hero Banner Carousel Module

export function initHeroCarousel() {
  const slider = document.getElementById("hero-slider");
  const slides = document.querySelectorAll(".hero-slide");
  const prevBtn = document.getElementById("hero-prev-btn");
  const nextBtn = document.getElementById("hero-next-btn");
  const dotsContainer = document.getElementById("hero-carousel-dots");

  if (!slider || slides.length === 0) return;

  let currentIndex = 0;
  const slideCount = slides.length;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 5000; // 5 seconds

  // Initialize Indicator Dots
  dotsContainer.innerHTML = "";
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = `carousel-dot ${index === 0 ? "active" : ""}`;
    dot.setAttribute("aria-label", `Chuyển tới slide ${index + 1}`);
    dot.addEventListener("click", () => {
      goToSlide(index);
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".carousel-dot");

  function updateCarousel() {
    // Slide container translation
    slider.style.transform = `translateX(-${currentIndex * 25}%)`;

    // Update active classes on slides
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    // Update active classes on dots
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    // Bounds check
    if (currentIndex < 0) {
      currentIndex = slideCount - 1;
    } else if (currentIndex >= slideCount) {
      currentIndex = 0;
    }
    updateCarousel();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Button Listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoplay();
    });
  }

  // Autoplay Control
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    startAutoplay();
  }

  // Pause on hover
  const carouselSection = document.getElementById("hero");
  if (carouselSection) {
    carouselSection.addEventListener("mouseenter", stopAutoplay);
    carouselSection.addEventListener("mouseleave", startAutoplay);
  }

  // Mobile Touch/Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;
  const SWIPE_THRESHOLD = 50; // minimum distance in pixels

  if (carouselSection) {
    carouselSection.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselSection.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > SWIPE_THRESHOLD) {
      if (swipeDistance < 0) {
        // Swiped Left -> Next Slide
        nextSlide();
      } else {
        // Swiped Right -> Prev Slide
        prevSlide();
      }
      resetAutoplay();
    }
  }

  // Start initialization
  updateCarousel();
  startAutoplay();
}
