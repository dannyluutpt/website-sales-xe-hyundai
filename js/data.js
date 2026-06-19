// Hyundai Car Specifications and Dealer Pricing Database (Vietnamese market)

export const HYUNDAI_CARS = [
  {
    id: "accent",
    name: "Hyundai Accent 2024",
    type: "Sedan",
    price: 439000000,
    priceRange: "439.000.000 - 569.000.000 VNĐ",
    image: "https://hyundai-api.thanhcong.vn/storage/uploads/product/Accent_662x376.png",
    colors: [
      { name: "Trắng Ngọc Trai", hex: "#f0f3f5", filter: "brightness(1.05) contrast(1.02) saturate(0.9)" },
      { name: "Đen Huyền Bí", hex: "#151516", filter: "brightness(0.25) contrast(1.3) saturate(0.8)" },
      { name: "Đỏ Quyến Rũ", hex: "#a8121a", filter: "hue-rotate(342deg) saturate(1.7) brightness(0.65) contrast(1.15)" },
      { name: "Bạc Ánh Kim", hex: "#b4b8bc", filter: "brightness(0.8) contrast(1.1) saturate(0.2)" },
      { name: "Vàng Cát", hex: "#c8b195", filter: "hue-rotate(18deg) saturate(0.7) brightness(0.85) contrast(1.05)" }
    ],
    specs: {
      engine: "Smartstream G1.5 MPI",
      power: "115 Hp @ 6,300 rpm",
      torque: "144 Nm @ 4,500 rpm",
      transmission: "Hộp số vô cấp thông minh iVT / Số sàn 6 cấp (6MT)",
      dimensions: "4.535 x 1.765 x 1.485 mm",
      wheelbase: "2.670 mm"
    },
    tagline: "Kiến tạo chuẩn mực mới",
    highlights: [
      "Hệ thống an toàn chủ động Hyundai Smartsense",
      "Màn hình thông tin & giải trí kép 10.25 inch sắc nét",
      "Hệ thống sạc không dây chuẩn Qi tiện lợi",
      "Đề nổ từ xa bằng nút bấm thông minh"
    ]
  },
  {
    id: "creta",
    name: "Hyundai Creta",
    type: "SUV (B-SUV)",
    price: 599000000,
    priceRange: "599.000.000 - 699.000.000 VNĐ",
    image: "https://hyundai-api.thanhcong.vn/storage/uploads/product/20250603/Creta.png",
    colors: [
      { name: "Trắng Ngọc Trai", hex: "#f0f3f5", filter: "brightness(1.05) contrast(1.02) saturate(0.9)" },
      { name: "Đen Huyền Bí", hex: "#151516", filter: "brightness(0.25) contrast(1.3) saturate(0.8)" },
      { name: "Đỏ Quyến Rũ", hex: "#a8121a", filter: "hue-rotate(342deg) saturate(1.7) brightness(0.65) contrast(1.15)" },
      { name: "Xám Kim Loại", hex: "#7a7e83", filter: "brightness(0.65) contrast(1.2) saturate(0.1)" },
      { name: "Xanh Đại Dương", hex: "#103c6b", filter: "hue-rotate(200deg) saturate(1.3) brightness(0.55) contrast(1.2)" }
    ],
    specs: {
      engine: "Smartstream G1.5 MPI",
      power: "115 Hp @ 6,300 rpm",
      torque: "144 Nm @ 4,500 rpm",
      transmission: "Hộp số vô cấp thông minh iVT",
      dimensions: "4.315 x 1.790 x 1.660 mm",
      wheelbase: "2.610 mm"
    },
    tagline: "Khởi nguồn chất sống mới",
    highlights: [
      "Hệ thống hỗ trợ giữ làn đường & tránh va chạm trước",
      "Phanh tay điện tử tích hợp tính năng Auto Hold",
      "Hàng ghế trước có làm mát (cooling seats) cao cấp",
      "Hệ thống 8 loa cao cấp Bose cho âm thanh sống động"
    ]
  },
  {
    id: "tucson",
    name: "Hyundai Tucson 2025",
    type: "SUV (C-SUV)",
    price: 769000000,
    priceRange: "769.000.000 - 989.000.000 VNĐ",
    image: "https://hyundai-api.thanhcong.vn/storage/uploads/product/20241008/web-tucson.png",
    colors: [
      { name: "Trắng Ngọc Trai", hex: "#f0f3f5", filter: "brightness(1.05) contrast(1.02) saturate(0.9)" },
      { name: "Đen Huyền Bí", hex: "#151516", filter: "brightness(0.25) contrast(1.3) saturate(0.8)" },
      { name: "Đỏ Lịch Lãm", hex: "#8c151c", filter: "hue-rotate(338deg) saturate(1.5) brightness(0.55) contrast(1.2)" },
      { name: "Bạc Ánh Kim", hex: "#b4b8bc", filter: "brightness(0.8) contrast(1.1) saturate(0.2)" },
      { name: "Vàng Cát", hex: "#c8b195", filter: "hue-rotate(18deg) saturate(0.7) brightness(0.85) contrast(1.05)" }
    ],
    specs: {
      engine: "Smartstream G2.0 / D2.0 / 1.6 T-GDi",
      power: "156 / 186 / 180 Hp",
      torque: "192 / 416 / 265 Nm",
      transmission: "Tự động 6 cấp / 8 cấp / Ly hợp kép 7 cấp (7DCT)",
      dimensions: "4.640 x 1.865 x 1.665 mm",
      wheelbase: "2.755 mm"
    },
    tagline: "Khai mở giới hạn mới",
    highlights: [
      "Hệ dẫn động 4 bánh toàn thời gian thông minh HTRAC",
      "Màn hình thông tin giải trí cong kép 12.3 inch cực sang",
      "Cần số điện tử dạng xoay tích hợp trên vô lăng tiện lợi",
      "Cửa sổ trời toàn cảnh Panorama đóng mở một chạm"
    ]
  },
  {
    id: "santafe",
    name: "Hyundai Santa Fe 2025",
    type: "SUV (D-SUV)",
    price: 1069000000,
    priceRange: "1.069.000.000 - 1.365.000.000 VNĐ",
    image: "https://hyundai-api.thanhcong.vn/storage/uploads/product/web-santafe.png",
    colors: [
      { name: "Trắng Ngọc Trai", hex: "#f0f3f5", filter: "brightness(1.05) contrast(1.02) saturate(0.9)" },
      { name: "Đen Huyền Bí", hex: "#151516", filter: "brightness(0.25) contrast(1.3) saturate(0.8)" },
      { name: "Xám Đồng Matte", hex: "#8c8780", filter: "hue-rotate(25deg) saturate(0.4) brightness(0.65) contrast(1.1)" },
      { name: "Vàng Cát Lịch Lãm", hex: "#baae9d", filter: "hue-rotate(20deg) saturate(0.6) brightness(0.8) contrast(1.02)" },
      { name: "Đỏ Ruby", hex: "#7a0c10", filter: "hue-rotate(335deg) saturate(1.4) brightness(0.48) contrast(1.2)" }
    ],
    specs: {
      engine: "Smartstream G2.5 / G2.5 T-GDi Turbo",
      power: "194 / 281 Hp @ 6,000 rpm",
      torque: "246 / 422 Nm @ 4,000 rpm",
      transmission: "Tự động 8 cấp (8AT) / Ly hợp kép ướt 8 cấp (8DCT)",
      dimensions: "4.830 x 1.900 x 1.780 mm",
      wheelbase: "2.815 mm"
    },
    tagline: "Khai phá lối đi riêng",
    highlights: [
      "Ngôn ngữ thiết kế H-Shape Boxy cơ bắp thời thượng",
      "Hệ thống điều hòa đa vùng có khử khuẩn tia cực tím UV-C",
      "Ghế da cao cấp chỉnh điện 14 hướng, nhớ vị trí, massage",
      "Hệ thống an toàn thông minh SmartSense tích hợp kiểm soát hành trình thích ứng"
    ]
  },
  {
    id: "palisade",
    name: "Hyundai Palisade",
    type: "SUV (E-SUV)",
    price: 1469000000,
    priceRange: "1.469.000.000 - 1.589.000.000 VNĐ",
    image: "https://hyundai-api.thanhcong.vn/storage/uploads/product/PALISADE.png",
    colors: [
      { name: "Trắng Ngọc Trai", hex: "#f0f3f5", filter: "brightness(1.05) contrast(1.02) saturate(0.9)" },
      { name: "Đen Huyền Bí", hex: "#151516", filter: "brightness(0.25) contrast(1.3) saturate(0.8)" },
      { name: "Xanh Lục Bảo", hex: "#1c3c34", filter: "hue-rotate(130deg) saturate(0.6) brightness(0.42) contrast(1.2)" },
      { name: "Đỏ Đô Lịch Lãm", hex: "#7a0c10", filter: "hue-rotate(335deg) saturate(1.4) brightness(0.48) contrast(1.2)" },
      { name: "Xám Ánh Kim", hex: "#707478", filter: "brightness(0.65) contrast(1.1) saturate(0.1)" }
    ],
    specs: {
      engine: "Diesel R2.2 CRDi",
      power: "200 Hp @ 3,800 rpm",
      torque: "440 Nm @ 1,750 - 2,750 rpm",
      transmission: "Hộp số tự động 8 cấp (8AT) nút bấm điện tử Shift-by-wire",
      dimensions: "4.995 x 1.975 x 1.785 mm",
      wheelbase: "2.900 mm"
    },
    tagline: "Khẳng định vị thế thủ lĩnh",
    highlights: [
      "Khoang cabin siêu rộng rãi với cấu hình 6 hoặc 7 ghế ngồi tiện nghi",
      "Nội thất bọc da Nappa cao cấp kết hợp trần da lộn sang trọng",
      "Hàng ghế thứ hai chỉnh điện độc lập dạng thương gia (Captain Chairs)",
      "Màn hình trung tâm 12.3 inch kết nối đa phương tiện cùng 12 loa Infinity"
    ]
  },
  {
    id: "custin",
    name: "Hyundai Custin",
    type: "MPV",
    price: 820000000,
    priceRange: "820.000.000 - 974.000.000 VNĐ",
    image: "https://hyundai-api.thanhcong.vn/storage/uploads/product/CUSTIN.png",
    colors: [
      { name: "Trắng Ngọc Trai", hex: "#f0f3f5", filter: "brightness(1.05) contrast(1.02) saturate(0.9)" },
      { name: "Đen Huyền Bí", hex: "#151516", filter: "brightness(0.25) contrast(1.3) saturate(0.8)" },
      { name: "Bạc Ánh Kim", hex: "#b4b8bc", filter: "brightness(0.8) contrast(1.1) saturate(0.2)" },
      { name: "Xanh Midnight", hex: "#162035", filter: "hue-rotate(210deg) saturate(0.8) brightness(0.45) contrast(1.1)" }
    ],
    specs: {
      engine: "Smartstream 1.5 T-GDi / 2.0 T-GDi Turbo",
      power: "170 / 236 Hp @ 6,000 rpm",
      torque: "253 / 353 Nm @ 1,500 - 4,000 rpm",
      transmission: "Hộp số tự động 8 cấp (8AT) mượt mà",
      dimensions: "4.950 x 1.850 x 1.725 mm",
      wheelbase: "3.055 mm"
    },
    tagline: "Du hành đẳng cấp thương gia",
    highlights: [
      "Cửa trượt điện thông minh 2 bên chống kẹt tối tân",
      "Hàng ghế thứ 2 chuẩn VIP không trọng lực, ngả điện 10 hướng",
      "Sạc điện thoại không dây chuẩn Qi được trang bị ở cả hàng ghế 1 và 2",
      "Chế độ thư giãn một chạm thông minh tự động điều chỉnh tư thế tối ưu"
    ]
  },
  {
    id: "stargazer",
    name: "Hyundai Stargazer X",
    type: "MPV",
    price: 489000000,
    priceRange: "489.000.000 - 599.000.000 VNĐ",
    image: "https://hyundai-api.thanhcong.vn/storage/uploads/product/20260324/New-Stargazer.png",
    colors: [
      { name: "Trắng Ngọc Trai", hex: "#f0f3f5", filter: "brightness(1.05) contrast(1.02) saturate(0.9)" },
      { name: "Đen Huyền Bí", hex: "#151516", filter: "brightness(0.25) contrast(1.3) saturate(0.8)" },
      { name: "Đỏ Thể Thao", hex: "#a8121a", filter: "hue-rotate(342deg) saturate(1.7) brightness(0.65) contrast(1.15)" },
      { name: "Xám Nhám (Matte)", hex: "#606265", filter: "brightness(0.6) contrast(1.25) saturate(0.05)" },
      { name: "Vàng Cát", hex: "#c8b195", filter: "hue-rotate(18deg) saturate(0.7) brightness(0.85) contrast(1.05)" }
    ],
    specs: {
      engine: "Smartstream G1.5 MPI",
      power: "115 Hp @ 6,300 rpm",
      torque: "144 Nm @ 4,500 rpm",
      transmission: "Hộp số vô cấp thông minh iVT",
      dimensions: "4.495 x 1.815 x 1.710 mm",
      wheelbase: "2.780 mm"
    },
    tagline: "Ngôi sao gia đình phiêu lưu",
    highlights: [
      "Không gian hành lý và cabin rộng rãi hàng đầu phân khúc",
      "Bàn gấp tiện ích phía sau ghế hành khách trước",
      "Hệ thống an toàn SmartSense hỗ trợ phanh khẩn cấp tự động",
      "Màn hình hiển thị áp suất lốp chi tiết cho từng bánh"
    ]
  },
  {
    id: "ioniq5",
    name: "Hyundai Ioniq 5 (Xe điện)",
    type: "EV",
    price: 1300000000,
    priceRange: "1.300.000.000 - 1.450.000.000 VNĐ",
    image: "https://hyundai-api.thanhcong.vn/storage/uploads/product/IONIQ5.png",
    colors: [
      { name: "Trắng Ngọc Trai", hex: "#f0f3f5", filter: "brightness(1.05) contrast(1.02) saturate(0.9)" },
      { name: "Đen Huyền Bí", hex: "#151516", filter: "brightness(0.25) contrast(1.3) saturate(0.8)" },
      { name: "Bạc Vũ Trụ", hex: "#c0c4c8", filter: "brightness(0.85) contrast(1.05) saturate(0.1)" },
      { name: "Xám Vàng Nhám (Gravity Matte)", hex: "#a4a199", filter: "hue-rotate(30deg) saturate(0.35) brightness(0.78) contrast(1.08)" }
    ],
    specs: {
      engine: "Động cơ điện đơn (RWD) hiệu năng cao",
      power: "217 Hp (Mô-tơ đơn) / 325 Hp (Mô-tơ kép AWD)",
      torque: "350 Nm / 605 Nm",
      transmission: "Hộp số tự động đơn cấp chuyển số điện tử",
      dimensions: "4.635 x 1.890 x 1.605 mm",
      wheelbase: "3.000 mm"
    },
    tagline: "Định hình tương lai di động",
    highlights: [
      "Kiến trúc điện 800V cho phép sạc từ 10% đến 80% chỉ trong 18 phút",
      "Tính năng V2L (Vehicle-to-Load) cung cấp nguồn điện AC 230V tiện lợi",
      "Thiết kế Parametric Pixel kết hợp retro-modern độc bản đoạt giải xe thế giới",
      "Quãng đường di chuyển ấn tượng lên tới 451 km (theo chuẩn WLTP)"
    ]
  }
];

// Bank Interest Rates Packages
export const INTEREST_RATES = [
  { id: "hyundai", name: "Hyundai Financial (Ưu đãi đặc biệt)", rate: 6.9 },
  { id: "vcb", name: "Vietcombank (Hỗ trợ liên kết)", rate: 7.5 },
  { id: "scb", name: "Standard Chartered (Quốc tế)", rate: 8.2 }
];

// Rolling Cost Settings
export const REGISTRATION_FEES = {
  hanoi: {
    name: "Hà Nội",
    taxRate: 0.12,
    plateFee: 20000000
  },
  hcm: {
    name: "TP. Hồ Chí Minh",
    taxRate: 0.10,
    plateFee: 20000000
  },
  provinces: {
    name: "Các Tỉnh Khác",
    taxRate: 0.10,
    plateFee: 1000000
  }
};

// Fixed expenses for all passenger cars in VND
export const FIXED_EXPENSES = {
  inspection: 90000,
  roadMaintenance: 1560000, // 1 year road tax
  insuranceCivil: 480000    // Standard 5-seater civil liability insurance
};
