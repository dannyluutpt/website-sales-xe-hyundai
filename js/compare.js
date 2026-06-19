// Dynamic Vehicle Comparison Module

import { HYUNDAI_CARS } from "./data.js";

// Helper to format currency to VND
function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(amount).replace("₫", "VNĐ");
}

export function setupCompare() {
  const compareDrawer = document.getElementById("compare-drawer");
  if (!compareDrawer) return; // Exit early if comparison drawer is missing

  const compareCountText = document.getElementById("compare-count");
  const compareItemsList = document.getElementById("compare-drawer-items");
  const btnCompareNow = document.getElementById("btn-compare-now");
  const btnClearCompare = document.getElementById("btn-clear-compare");

  const compareModal = document.getElementById("compare-modal");
  const compareCloseBtn = document.getElementById("compare-modal-close");
  const compareTableContent = document.getElementById("compare-table-content");

  let selectedCars = []; // Array of car objects

  // Initialize event listeners on page load
  function init() {
    // Listen for compare clicks on car cards
    document.body.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-add-compare");
      if (btn) {
        e.preventDefault();
        const carId = btn.getAttribute("data-car");
        toggleCompareCar(carId);
      }
    });

    // Modal Close
    if (compareCloseBtn) {
      compareCloseBtn.addEventListener("click", () => {
        compareModal.classList.remove("active");
        document.body.style.overflow = "auto";
      });
    }

    // Clear comparison
    if (btnClearCompare) {
      btnClearCompare.addEventListener("click", clearComparison);
    }

    // Compare Now action
    if (btnCompareNow) {
      btnCompareNow.addEventListener("click", openCompareModal);
    }
  }

  function toggleCompareCar(carId) {
    const car = HYUNDAI_CARS.find(c => c.id === carId);
    if (!car) return;

    const existsIndex = selectedCars.findIndex(c => c.id === carId);

    if (existsIndex > -1) {
      // Remove car
      selectedCars.splice(existsIndex, 1);
      updateCompareButtons(carId, false);
    } else {
      // Add car (max 2 cars)
      if (selectedCars.length >= 2) {
        alert("Bạn chỉ có thể so sánh tối đa 2 xe cùng một lúc.");
        return;
      }
      selectedCars.push(car);
      updateCompareButtons(carId, true);
    }

    updateDrawer();
  }

  function updateCompareButtons(carId, isAdded) {
    // Find all buttons for this car across the page (main fleet and showroom buttons)
    const btns = document.querySelectorAll(`.btn-add-compare[data-car="${carId}"]`);
    btns.forEach(btn => {
      if (isAdded) {
        btn.classList.add("added");
        btn.innerHTML = `<i class="fas fa-check"></i> Đã chọn`;
      } else {
        btn.classList.remove("added");
        btn.innerHTML = `<i class="fas fa-exchange-alt"></i> So sánh`;
      }
    });
  }

  function clearComparison() {
    selectedCars.forEach(car => {
      updateCompareButtons(car.id, false);
    });
    selectedCars = [];
    updateDrawer();
  }

  function updateDrawer() {
    const count = selectedCars.length;
    
    if (count === 0) {
      compareDrawer.classList.remove("active");
      return;
    }

    // Show drawer
    compareDrawer.classList.add("active");
    compareCountText.textContent = count;

    // Render tiny thumbnails in drawer
    compareItemsList.innerHTML = "";
    selectedCars.forEach(car => {
      const item = document.createElement("div");
      item.className = "compare-drawer-item";
      item.innerHTML = `
        <img src="${car.image}" alt="${car.name}">
        <span>${car.name.replace("Hyundai ", "")}</span>
        <button class="remove-item-btn" data-car="${car.id}">&times;</button>
      `;

      item.querySelector(".remove-item-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleCompareCar(car.id);
      });

      compareItemsList.appendChild(item);
    });

    // Enable/Disable "Compare Now" button based on count
    if (count === 2) {
      btnCompareNow.removeAttribute("disabled");
      btnCompareNow.classList.add("pulse-btn");
    } else {
      btnCompareNow.setAttribute("disabled", "true");
      btnCompareNow.classList.remove("pulse-btn");
    }
  }

  function openCompareModal() {
    if (selectedCars.length !== 2) return;

    const car1 = selectedCars[0];
    const car2 = selectedCars[1];

    // Helper functions to parse values for highlights (e.g. comparing horsepower)
    const getHorsepower = (powerStr) => parseInt(powerStr.match(/\d+/)?.[0] || 0);
    const getTorqueValue = (torqueStr) => parseInt(torqueStr.match(/\d+/)?.[0] || 0);

    const hp1 = getHorsepower(car1.specs.power);
    const hp2 = getHorsepower(car2.specs.power);
    const tq1 = getTorqueValue(car1.specs.torque);
    const tq2 = getTorqueValue(car2.specs.torque);

    const isPriceBetter1 = car1.price < car2.price;
    const isPriceBetter2 = car2.price < car1.price;
    const isHpBetter1 = hp1 > hp2;
    const isHpBetter2 = hp2 > hp1;
    const isTqBetter1 = tq1 > tq2;
    const isTqBetter2 = tq2 > tq1;

    compareTableContent.innerHTML = `
      <div class="compare-grid">
        <!-- Row 1: Headers -->
        <div class="compare-cell label-cell header-cell">Thông số so sánh</div>
        <div class="compare-cell value-cell header-cell">
          <img src="${car1.image}" alt="${car1.name}">
          <h3>${car1.name}</h3>
          <p>${car1.type}</p>
        </div>
        <div class="compare-cell value-cell header-cell">
          <img src="${car2.image}" alt="${car2.name}">
          <h3>${car2.name}</h3>
          <p>${car2.type}</p>
        </div>

        <!-- Row 2: Price -->
        <div class="compare-cell label-cell">Giá bán niêm yết</div>
        <div class="compare-cell value-cell ${isPriceBetter1 ? 'better-highlight' : ''}">
          <strong>${formatVND(car1.price)}</strong>
        </div>
        <div class="compare-cell value-cell ${isPriceBetter2 ? 'better-highlight' : ''}">
          <strong>${formatVND(car2.price)}</strong>
        </div>

        <!-- Row 3: Engine -->
        <div class="compare-cell label-cell">Động cơ</div>
        <div class="compare-cell value-cell">${car1.specs.engine}</div>
        <div class="compare-cell value-cell">${car2.specs.engine}</div>

        <!-- Row 4: Power -->
        <div class="compare-cell label-cell">Công suất cực đại</div>
        <div class="compare-cell value-cell ${isHpBetter1 ? 'better-highlight' : ''}">${car1.specs.power}</div>
        <div class="compare-cell value-cell ${isHpBetter2 ? 'better-highlight' : ''}">${car2.specs.power}</div>

        <!-- Row 5: Torque -->
        <div class="compare-cell label-cell">Mô-men xoắn</div>
        <div class="compare-cell value-cell ${isTqBetter1 ? 'better-highlight' : ''}">${car1.specs.torque}</div>
        <div class="compare-cell value-cell ${isTqBetter2 ? 'better-highlight' : ''}">${car2.specs.torque}</div>

        <!-- Row 6: Transmission -->
        <div class="compare-cell label-cell">Hộp số</div>
        <div class="compare-cell value-cell">${car1.specs.transmission}</div>
        <div class="compare-cell value-cell">${car2.specs.transmission}</div>

        <!-- Row 7: Dimensions -->
        <div class="compare-cell label-cell">Kích thước (DxRxC)</div>
        <div class="compare-cell value-cell">${car1.specs.dimensions}</div>
        <div class="compare-cell value-cell">${car2.specs.dimensions}</div>

        <!-- Row 8: Wheelbase -->
        <div class="compare-cell label-cell">Chiều dài cơ sở</div>
        <div class="compare-cell value-cell ${car1.specs.wheelbase > car2.specs.wheelbase ? 'better-highlight' : ''}">${car1.specs.wheelbase}</div>
        <div class="compare-cell value-cell ${car2.specs.wheelbase > car1.specs.wheelbase ? 'better-highlight' : ''}">${car2.specs.wheelbase}</div>

        <!-- Row 9: Highlights -->
        <div class="compare-cell label-cell bullet-cell">Trang bị nổi bật</div>
        <div class="compare-cell value-cell bullet-cell">
          <ul>
            ${car1.highlights.map(h => `<li>${h}</li>`).join("")}
          </ul>
        </div>
        <div class="compare-cell value-cell bullet-cell">
          <ul>
            ${car2.highlights.map(h => `<li>${h}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;

    // Open Modal
    compareModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  init();
}
