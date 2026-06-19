// Interactive Virtual Showroom Module

import { HYUNDAI_CARS } from "./data.js";

// Database of hotspots for each car model (relative top/left in %)
const HOTSPOTS_DATA = {
  accent: [
    { top: "58%", left: "36%", title: "Đầu xe thể thao", desc: "Lưới tản nhiệt Parametric Jewel Chrome cá tính và hiện đại." },
    { top: "44%", left: "48%", title: "Đèn LED ban ngày", desc: "Dải đèn ban ngày LED chạy ngang mượt mà phong cách tương lai." },
    { top: "66%", left: "66%", title: "Mâm xe 16 inch", desc: "Lazang hợp kim đa chấu cắt kim cương thể thao, cuốn hút." },
    { top: "30%", left: "58%", title: "Nội thất số hóa", desc: "Màn hình giải trí & đồng hồ đo kỹ thuật số kép 10.25 inch sắc nét." }
  ],
  creta: [
    { top: "50%", left: "22%", title: "Lưới tản nhiệt Parametric", desc: "Lưới tản nhiệt màu đen bóng tích hợp đèn định vị LED ẩn độc đáo." },
    { top: "52%", left: "34%", title: "Đèn pha LED đặt thấp", desc: "Cụm đèn chiếu sáng full-LED đặt thấp chia khoang hiệu quả." },
    { top: "66%", left: "48%", title: "Mâm 17 inch thể thao", desc: "Lazang hợp kim 5 chấu kép thể thao, tạo hình boomerang cứng cáp." },
    { top: "26%", left: "50%", title: "Hyundai SmartSense", desc: "Hỗ trợ giữ làn đường và phòng tránh va chạm phía trước thông minh." }
  ],
  tucson: [
    { top: "50%", left: "20%", title: "Lưới tản nhiệt Jewel", desc: "Thiết kế Parametric Hidden Lights với đèn LED ban ngày ẩn mình cá tính." },
    { top: "56%", left: "33%", title: "Cụm đèn pha chiếu sáng", desc: "Hệ thống đèn full-LED projector chiếu sáng thông minh góc cua." },
    { top: "66%", left: "48%", title: "Mâm xe 19 inch", desc: "Lazang thể thao thiết kế đa chấu xoáy khí động học nổi bật." },
    { top: "60%", left: "87%", title: "Dẫn động HTRAC 4WD", desc: "Hệ dẫn động 4 bánh toàn thời gian thông minh phân bổ lực kéo linh hoạt." }
  ],
  santafe: [
    { top: "58%", left: "22%", title: "Đầu xe Boxy hầm hố", desc: "Cản trước thiết kế vuông vức kết hợp hốc gió H-Shape cơ bắp." },
    { top: "46%", left: "33%", title: "Đèn LED H-Shape", desc: "Đèn định vị ban ngày chữ H độc bản, điểm nhấn nhận diện thương hiệu." },
    { top: "66%", left: "48%", title: "Mâm hợp kim 20 inch", desc: "Mâm đúc hợp kim bản lớn phay CNC sắc sảo, nâng tầm sang trọng." },
    { top: "12%", left: "58%", title: "Cửa sổ trời kép", desc: "Cửa sổ trời kép toàn cảnh Panorama mang lại không gian thoáng đạt." }
  ],
  palisade: [
    { top: "52%", left: "22%", title: "Thác nước Cascading", desc: "Lưới tản nhiệt mạ Crom đen lớn hầm hố kiểu thác đổ đặc trưng." },
    { top: "54%", left: "44%", title: "Đèn LED dọc bề thế", desc: "Hệ thống đèn LED định vị đứng kéo dài tạo cảm giác xe to lớn." },
    { top: "68%", left: "56%", title: "Mâm xe 20 inch", desc: "Lazang hợp kim phay xước đa chấu sang trọng của phân khúc E-SUV." },
    { top: "30%", left: "72%", title: "Hàng ghế VIP Captain", desc: "Hàng ghế 2 chỉnh điện độc lập, tích hợp thông gió, sưởi và bệ tỳ tay riêng." }
  ],
  custin: [
    { top: "58%", left: "19%", title: "Thiết kế khí động học", desc: "Mặt ca lăng hình cánh chim kết hợp các thanh nan mạ crom sang trọng." },
    { top: "42%", left: "66%", title: "Cửa trượt điện thông minh", desc: "Cửa trượt tự động hai bên chống kẹt, mở rộng lối đi thoải mái." },
    { top: "71%", left: "43%", title: "Mâm xe 18 inch", desc: "Lazang đúc phay xoáy thể thao, tăng độ êm ái khi vận hành." },
    { top: "30%", left: "72%", title: "Ghế VIP phi hành gia", desc: "Ghế ngồi không trọng lực chỉnh điện 10 hướng, bệ đỡ chân tiện lợi." }
  ],
  stargazer: [
    { top: "56%", left: "20%", title: "Thiết kế Dynamic Crossover", desc: "Ngoại hình đậm chất MPV lai SUV hiện đại và năng động." },
    { top: "43%", left: "22%", title: "Dải LED Horizon", desc: "Dải đèn LED định vị chạy ngang đầu xe độc đáo mang đậm nét công nghệ." },
    { top: "71%", left: "62%", title: "Khoảng sáng gầm 200mm", desc: "Gầm xe được nâng cao giúp di chuyển linh hoạt trên mọi cung đường Việt Nam." },
    { top: "32%", left: "68%", title: "Bàn ăn thông minh", desc: "Bàn gập đa dụng sau lưng ghế trước tiện ích cho các chuyến đi dài." }
  ],
  ioniq5: [
    { top: "36%", left: "33%", title: "Capo Clamshell", desc: "Nắp capo liền khối tối ưu luồng khí và tạo bề mặt mượt mà." },
    { top: "48%", left: "22%", title: "Đèn LED Parametric Pixel", desc: "Cụm đèn pha dạng pixel vuông độc quyền đầy tính tương lai." },
    { top: "48%", left: "88%", title: "Nguồn sạc hai chiều V2L", desc: "Cung cấp nguồn điện xoay chiều AC 230V công suất 3.6kW tiện lợi." },
    { top: "65%", left: "70%", title: "Sạc siêu nhanh 800V", desc: "Tích hợp công nghệ sạc cực nhanh, đầy 80% pin trong 18 phút." }
  ]
};

export function setupShowroom() {
  const showroomImg = document.getElementById("showroom-car-img");
  if (!showroomImg) return; // Exit early if not on homepage

  const carNavs = document.querySelectorAll(".showroom-car-btn");
  const colorContainer = document.getElementById("showroom-colors");
  const colorName = document.getElementById("showroom-color-name");
  const hotspotsContainer = document.getElementById("showroom-hotspots");
  
  // Specs displays
  const specEngine = document.getElementById("spec-engine");
  const specPower = document.getElementById("spec-power");
  const specTorque = document.getElementById("spec-torque");
  const specTransmission = document.getElementById("spec-trans");
  const specDimensions = document.getElementById("spec-dim");
  const specWheelbase = document.getElementById("spec-wheel");
  const carName = document.getElementById("showroom-car-name");
  const carPrice = document.getElementById("showroom-car-price");
  const carTagline = document.getElementById("showroom-car-tagline");

  let currentCar = HYUNDAI_CARS[0];

  function updateShowroom(carId) {
    currentCar = HYUNDAI_CARS.find(c => c.id === carId) || HYUNDAI_CARS[0];

    // Fade animation out
    showroomImg.style.opacity = "0";
    showroomImg.style.transform = "translateX(-20px) scale(0.95)";
    hotspotsContainer.style.opacity = "0";

    setTimeout(() => {
      // Update general text info
      carName.textContent = currentCar.name;
      carPrice.textContent = currentCar.priceRange;
      carTagline.textContent = `"${currentCar.tagline}"`;

      // Update Specs
      specEngine.textContent = currentCar.specs.engine;
      specPower.textContent = currentCar.specs.power;
      specTorque.textContent = currentCar.specs.torque;
      specTransmission.textContent = currentCar.specs.transmission;
      specDimensions.textContent = currentCar.specs.dimensions;
      specWheelbase.textContent = currentCar.specs.wheelbase;

      // Update Car Image & Default Color
      showroomImg.src = currentCar.colors[0].image || currentCar.image;
      showroomImg.style.filter = "none";

      // Update Color Swatches
      renderColors(currentCar);

      // Update Hotspots
      renderHotspots(currentCar.id);

      // Fade animation in
      showroomImg.style.opacity = "1";
      showroomImg.style.transform = "translateX(0) scale(1)";
      
      // Delay hotspots fade in for smooth visual order
      setTimeout(() => {
        hotspotsContainer.style.opacity = "1";
      }, 200);

    }, 300);
  }

  function renderColors(car) {
    colorContainer.innerHTML = "";
    colorName.textContent = car.colors[0].name;

    car.colors.forEach((color, index) => {
      const btn = document.createElement("button");
      btn.className = `color-dot ${index === 0 ? "active" : ""}`;
      btn.style.backgroundColor = color.hex;
      btn.title = color.name;
      btn.setAttribute("aria-label", `Chọn màu ${color.name}`);

      btn.addEventListener("click", () => {
        // Toggle active status
        document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
        btn.classList.add("active");

        // Update color label
        colorName.textContent = color.name;

        // Apply direct image source instead of CSS filter
        if (color.image) {
          showroomImg.src = color.image;
        }
        showroomImg.style.filter = "none";
      });

      colorContainer.appendChild(btn);
    });
  }

  function renderHotspots(carId) {
    hotspotsContainer.innerHTML = "";
    const hotspots = HOTSPOTS_DATA[carId] || [];

    hotspots.forEach(spot => {
      const wrapper = document.createElement("div");
      wrapper.className = "hotspot";
      wrapper.style.top = spot.top;
      wrapper.style.left = spot.left;

      // The pulsing dot
      const dot = document.createElement("div");
      dot.className = "hotspot-dot";

      // Toggle active class on click/tap to ensure it stays on top and visible
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        const isActive = wrapper.classList.contains("active");
        // Clear other active hotspots
        document.querySelectorAll(".hotspot.active").forEach(h => h.classList.remove("active"));
        if (!isActive) {
          wrapper.classList.add("active");
        }
      });
      
      // Tooltip Card
      const tooltip = document.createElement("div");
      tooltip.className = "hotspot-tooltip";
      tooltip.innerHTML = `
        <h4>${spot.title}</h4>
        <p>${spot.desc}</p>
      `;

      // Prevent closing when clicking inside tooltip
      tooltip.addEventListener("click", (e) => {
        e.stopPropagation();
      });

      wrapper.appendChild(dot);
      wrapper.appendChild(tooltip);
      hotspotsContainer.appendChild(wrapper);
    });
  }

  // Set up event listeners for car navigation
  carNavs.forEach(nav => {
    nav.addEventListener("click", (e) => {
      carNavs.forEach(btn => btn.classList.remove("active"));
      nav.classList.add("active");
      
      const carId = nav.getAttribute("data-car");
      updateShowroom(carId);
    });
  });

  // Close active hotspots when clicking outside
  document.addEventListener("click", () => {
    document.querySelectorAll(".hotspot.active").forEach(h => h.classList.remove("active"));
  });

  // Initialize with the first car (Accent)
  updateShowroom("accent");
}
