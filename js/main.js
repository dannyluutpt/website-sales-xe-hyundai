// Main Orchestration and Event Handling Script

import { HYUNDAI_CARS } from "./data.js?v=2.2";
import { initParticles } from "./particles.js?v=2.2";
import { initHeroCarousel } from "./carousel.js?v=2.2";
import { setupShowroom } from "./showroom.js?v=2.2";
import { setupCalculator } from "./calculator.js?v=2.2";
import { setupCompare } from "./compare.js?v=2.2";

// Helper to format currency
function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(amount).replace("₫", "VNĐ");
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize particles background
  initParticles();

  // Initialize Hero Carousel
  initHeroCarousel();

  // Render the fleet grid
  renderFleet();

  // Initialize virtual showroom colorizer & hotspots
  setupShowroom();

  // Initialize rolling cost and installment calculators
  setupCalculator();

  // Initialize vehicle comparison logic
  setupCompare();

  // Setup other interactive behaviors
  setupGeneralUI();

  // Setup booking wizard
  setupBookingWizard();
});

// Render the grid of car cards
function renderFleet() {
  const fleetGrid = document.getElementById("fleet-grid");
  if (!fleetGrid) return;

  fleetGrid.innerHTML = "";

  HYUNDAI_CARS.forEach(car => {
    const card = document.createElement("div");
    card.className = "car-card glass-panel";
    
    // Categorize tags
    let typeClass = "";
    if (car.type.includes("SUV")) typeClass = "tag-suv";
    else if (car.type.includes("Sedan")) typeClass = "tag-sedan";
    else if (car.type.includes("MPV")) typeClass = "tag-mpv";
    else if (car.type.includes("EV")) typeClass = "tag-ev";

    card.innerHTML = `
      <div class="car-card-image-wrap">
        <span class="car-tag ${typeClass}">${car.type}</span>
        <img class="car-card-img" src="${car.image}" alt="${car.name}">
      </div>
      <div class="car-card-info">
        <h3>${car.name}</h3>
        <p class="car-card-tagline">${car.tagline}</p>
        <div class="car-card-price">
          <span>Giá chỉ từ:</span>
          <strong>${formatVND(car.price)}</strong>
        </div>
        <div class="car-card-features">
          ${car.highlights.slice(0, 2).map(h => `<span><i class="fas fa-check-circle"></i> ${h}</span>`).join("")}
        </div>
        <div class="car-card-actions">
          <button class="btn btn-secondary btn-add-compare" data-car="${car.id}" title="Thêm vào so sánh">
            <i class="fas fa-exchange-alt"></i> So sánh
          </button>
          <button class="btn btn-primary btn-calc-trigger" data-car="${car.id}">
            <i class="fas fa-calculator"></i> Tính lăn bánh
          </button>
        </div>
      </div>
    `;

    // Add event listener to scroll and pre-select car in calculator
    card.querySelector(".btn-calc-trigger").addEventListener("click", () => {
      const calcCarSelect = document.getElementById("calc-car-select");
      if (calcCarSelect) {
        calcCarSelect.value = car.id;
        calcCarSelect.dispatchEvent(new Event("change"));

        // Scroll to calculator
        document.getElementById("calculator-section").scrollIntoView({
          behavior: "smooth"
        });
      }
    });

    fleetGrid.appendChild(card);
  });
}

function setupGeneralUI() {
  // Sticky Header
  const header = document.querySelector(".main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active");
    });

    // Close menu and toggle active class when clicking link
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
        
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }

  // Calculator Tabs switching (Rolling Price vs Installment)
  const tabBtns = document.querySelectorAll(".calc-tab-btn");
  const tabPanels = document.querySelectorAll(".calc-tab-panel");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabPanels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const target = btn.getAttribute("data-tab");
      document.getElementById(target).classList.add("active");
    });
  });

  // Zalo / Call float action triggers
  const callBtn = document.querySelector(".float-btn.call");
  const zaloBtn = document.querySelector(".float-btn.zalo");

  if (callBtn) {
    callBtn.addEventListener("click", () => {
      // Create subtle log or analytics if needed
      console.log("Hotline clicked");
    });
  }

  // Floating Card Show/Hide logic
  const floatingCard = document.getElementById("advisor-floating-card");
  const closeFloatingCard = document.getElementById("close-floating-card");

  if (closeFloatingCard && floatingCard) {
    closeFloatingCard.addEventListener("click", (e) => {
      e.stopPropagation();
      floatingCard.classList.add("minimized");
    });

    floatingCard.addEventListener("click", () => {
      if (floatingCard.classList.contains("minimized")) {
        floatingCard.classList.remove("minimized");
      }
    });
  }
}

// Multi-step Interactive Booking Wizard
function setupBookingWizard() {
  const wizardForm = document.getElementById("booking-wizard-form");
  if (!wizardForm) return; // Exit early if booking form is missing

  const steps = document.querySelectorAll(".wizard-step-panel");
  const progressLine = document.getElementById("wizard-progress-line");
  const stepIndicators = document.querySelectorAll(".wizard-indicator-step");
  const nextBtns = document.querySelectorAll(".btn-wizard-next");
  const prevBtns = document.querySelectorAll(".btn-wizard-prev");

  // Success voucher popup
  const successModal = document.getElementById("success-modal");
  const successModalClose = document.getElementById("success-modal-close");
  const successVoucherCode = document.getElementById("voucher-code");
  const successVoucherCar = document.getElementById("voucher-car-name");

  let currentStep = 0;

  // Initialize wizard car select list
  const wizardCarSelect = document.getElementById("wizard-car-select");
  if (wizardCarSelect) {
    wizardCarSelect.innerHTML = '<option value="" disabled selected>-- Chọn dòng xe bạn quan tâm --</option>';
    HYUNDAI_CARS.forEach(car => {
      const option = document.createElement("option");
      option.value = car.id;
      option.textContent = car.name;
      wizardCarSelect.appendChild(option);
    });
  }

  function updateWizardUI() {
    // Show/hide steps
    steps.forEach((step, idx) => {
      if (idx === currentStep) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });

    // Update Progress indicators
    stepIndicators.forEach((ind, idx) => {
      if (idx <= currentStep) {
        ind.classList.add("active");
      } else {
        ind.classList.remove("active");
      }
    });

    // Progress line width
    const progressPct = (currentStep / (steps.length - 1)) * 100;
    if (progressLine) {
      progressLine.style.width = `${progressPct}%`;
    }
  }

  function validateStep(stepIndex) {
    if (stepIndex === 0) {
      // Validate Car Selection & Service Interest
      const carVal = wizardCarSelect.value;
      const serviceChecked = document.querySelector('input[name="wizard-service"]:checked');
      
      if (!carVal) {
        alert("Vui lòng chọn dòng xe bạn quan tâm.");
        return false;
      }
      if (!serviceChecked) {
        alert("Vui lòng chọn nhu cầu của bạn (Lái thử, Nhận báo giá, Vay trả góp).");
        return false;
      }
    } else if (stepIndex === 1) {
      // Validate Name & Phone
      const name = document.getElementById("wizard-name").value.trim();
      const phone = document.getElementById("wizard-phone").value.trim();
      const city = document.getElementById("wizard-city").value;

      if (!name) {
        alert("Vui lòng nhập họ tên của bạn.");
        return false;
      }
      if (!phone || !/^\d{9,11}$/.test(phone)) {
        alert("Vui lòng nhập số điện thoại hợp lệ (9 - 11 chữ số).");
        return false;
      }
      if (!city) {
        alert("Vui lòng chọn khu vực sinh sống.");
        return false;
      }
    }
    return true;
  }

  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        currentStep++;
        updateWizardUI();
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      currentStep--;
      updateWizardUI();
    });
  });

  if (wizardForm) {
    wizardForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      if (validateStep(currentStep)) {
        // Collect form data for mock submission
        const selectedCarId = wizardCarSelect.value;
        const selectedCar = HYUNDAI_CARS.find(c => c.id === selectedCarId);
        
        // Generate random voucher code (e.g. HYUNDAI-A7B8C)
        const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let randomCode = '';
        for (let i = 0; i < 5; i++) {
          randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        // Show Success Modal with Personalized Voucher details
        if (successVoucherCar) {
          successVoucherCar.textContent = selectedCar ? selectedCar.name : "xe Hyundai";
        }
        if (successVoucherCode) {
          successVoucherCode.textContent = `HYUNDAI-VIP-${randomCode}`;
        }
        
        successModal.classList.add("active");
        document.body.style.overflow = "hidden";

        // Reset wizard back to step 1
        wizardForm.reset();
        currentStep = 0;
        updateWizardUI();
      }
    });
  }

  if (successModalClose) {
    successModalClose.addEventListener("click", () => {
      successModal.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }
}
