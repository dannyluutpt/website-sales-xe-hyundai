// Financial and Rolling Price Calculator Module

import { HYUNDAI_CARS, INTEREST_RATES, REGISTRATION_FEES, FIXED_EXPENSES } from "./data.js";

// Helper to format currency to VND (e.g. 1.200.000.000 VNĐ)
function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(amount).replace("₫", "VNĐ");
}

export function setupCalculator() {
  // Selectors
  const calcCarSelect = document.getElementById("calc-car-select");
  if (!calcCarSelect) return; // Exit early if not on calculator page

  const calcLocationSelect = document.getElementById("calc-location-select");
  const calcBankSelect = document.getElementById("calc-bank-select");
  
  // Sliders
  const downPaymentSlider = document.getElementById("calc-downpayment-slider");
  const downPaymentPercentText = document.getElementById("calc-downpayment-percent");
  const downPaymentValText = document.getElementById("calc-downpayment-val");
  
  const termSlider = document.getElementById("calc-term-slider");
  const termMonthsText = document.getElementById("calc-term-months");
  const termYearsText = document.getElementById("calc-term-years");

  // Output Elements - Rolling Price
  const rollCarPrice = document.getElementById("roll-car-price");
  const rollTax = document.getElementById("roll-tax");
  const rollPlate = document.getElementById("roll-plate");
  const rollInspection = document.getElementById("roll-inspection");
  const rollRoadFee = document.getElementById("roll-road-fee");
  const rollInsurance = document.getElementById("roll-insurance");
  const rollTotalPrice = document.getElementById("roll-total-price");

  // Output Elements - Installment Loan
  const loanPrepAmount = document.getElementById("loan-prep-amount");
  const loanPrincipalAmount = document.getElementById("loan-principal-amount");
  const loanMonthlyAvg = document.getElementById("loan-monthly-avg");
  const loanTotalInterest = document.getElementById("loan-total-interest");
  const loanTotalPayment = document.getElementById("loan-total-payment");

  // Interactive Chart Elements
  const chartDonut = document.getElementById("calc-donut-chart");
  const legendPrepVal = document.getElementById("legend-prep-val");
  const legendLoanVal = document.getElementById("legend-loan-val");
  const legendInterestVal = document.getElementById("legend-interest-val");

  // Populate Car Selector dropdown
  if (calcCarSelect) {
    calcCarSelect.innerHTML = "";
    HYUNDAI_CARS.forEach(car => {
      const option = document.createElement("option");
      option.value = car.id;
      option.textContent = `${car.name} (${formatVND(car.price)})`;
      calcCarSelect.appendChild(option);
    });
  }

  // Populate Location Selector
  if (calcLocationSelect) {
    calcLocationSelect.innerHTML = "";
    Object.keys(REGISTRATION_FEES).forEach(key => {
      const fee = REGISTRATION_FEES[key];
      const option = document.createElement("option");
      option.value = key;
      option.textContent = fee.name;
      calcLocationSelect.appendChild(option);
    });
  }

  // Populate Bank Selector
  if (calcBankSelect) {
    calcBankSelect.innerHTML = "";
    INTEREST_RATES.forEach(bank => {
      const option = document.createElement("option");
      option.value = bank.id;
      option.textContent = `${bank.name} - ${bank.rate}%/năm`;
      calcBankSelect.appendChild(option);
    });
  }

  function getSelectedCar() {
    const carId = calcCarSelect.value;
    return HYUNDAI_CARS.find(c => c.id === carId) || HYUNDAI_CARS[0];
  }

  // 1. Calculate and Update Rolling Price Tab
  function updateRollingPrice() {
    const car = getSelectedCar();
    const locationKey = calcLocationSelect.value;
    const locationData = REGISTRATION_FEES[locationKey] || REGISTRATION_FEES.provinces;

    const basePrice = car.price;
    const taxFee = Math.round(basePrice * locationData.taxRate);
    const plateFee = locationData.plateFee;
    const inspectFee = FIXED_EXPENSES.inspection;
    const roadFee = FIXED_EXPENSES.roadMaintenance;
    const insuranceFee = FIXED_EXPENSES.insuranceCivil;

    const totalPrice = basePrice + taxFee + plateFee + inspectFee + roadFee + insuranceFee;

    // Render numbers in Vietnamese currency format
    rollCarPrice.textContent = formatVND(basePrice);
    rollTax.textContent = formatVND(taxFee);
    rollPlate.textContent = formatVND(plateFee);
    rollInspection.textContent = formatVND(inspectFee);
    rollRoadFee.textContent = formatVND(roadFee);
    rollInsurance.textContent = formatVND(insuranceFee);
    rollTotalPrice.textContent = formatVND(totalPrice);
  }

  // 2. Calculate and Update Loan / Installment Tab
  function updateLoanCalculations() {
    const car = getSelectedCar();
    const bankId = calcBankSelect.value;
    const bankData = INTEREST_RATES.find(b => b.id === bankId) || INTEREST_RATES[0];
    
    const basePrice = car.price;
    const downPaymentPercent = parseInt(downPaymentSlider.value);
    const termMonths = parseInt(termSlider.value);
    const interestRateYear = bankData.rate;

    // Update Slider text elements
    downPaymentPercentText.textContent = `${downPaymentPercent}%`;
    const prepayAmount = Math.round((basePrice * downPaymentPercent) / 100);
    downPaymentValText.textContent = formatVND(prepayAmount);

    termMonthsText.textContent = termMonths;
    const years = (termMonths / 12).toFixed(1);
    termYearsText.textContent = `${years} năm`;

    // Calculate Loan variables
    const loanPrincipal = basePrice - prepayAmount;
    
    // Reducing Balance Method (Dư nợ giảm dần)
    // Total Interest = Gốc * (Số tháng + 1) / (2 * 12) * Lãi suất năm
    const totalInterest = Math.round(loanPrincipal * (termMonths + 1) * (interestRateYear / 100) / 24);
    const totalPayment = loanPrincipal + totalInterest;

    // Monthly payments (first month is maximum, and average is shown here for easy planning)
    const monthlyPrincipal = loanPrincipal / termMonths;
    const monthlyInterestFirst = loanPrincipal * (interestRateYear / 100 / 12);
    const monthlyPaymentMax = monthlyPrincipal + monthlyInterestFirst;

    // Calculate average monthly payment over the term
    const monthlyAvg = monthlyPrincipal + (totalInterest / termMonths);

    // Render output numbers
    loanPrepAmount.textContent = formatVND(prepayAmount);
    loanPrincipalAmount.textContent = formatVND(loanPrincipal);
    loanMonthlyAvg.textContent = `${formatVND(Math.round(monthlyAvg))} / tháng`;
    loanTotalInterest.textContent = formatVND(totalInterest);
    loanTotalPayment.textContent = formatVND(totalPayment);

    // Update Interactive Visual Chart (CSS conic-gradient donut chart)
    updateDonutChart(prepayAmount, loanPrincipal, totalInterest);
  }

  function updateDonutChart(prep, loan, interest) {
    const total = prep + loan + interest;
    if (total === 0) return;

    // Calculate percentages
    const prepPct = (prep / total) * 100;
    const loanPct = (loan / total) * 100;
    const interestPct = (interest / total) * 100;

    // Update Legend Values
    legendPrepVal.textContent = `${prepPct.toFixed(1)}% (${formatVND(prep)})`;
    legendLoanVal.textContent = `${loanPct.toFixed(1)}% (${formatVND(loan)})`;
    legendInterestVal.textContent = `${interestPct.toFixed(1)}% (${formatVND(interest)})`;

    // Apply Conic-Gradient to Chart Div
    // Blue for down payment, Cyan for loan principal, Light Gray for Interest
    const p1 = prepPct.toFixed(2);
    const p2 = (prepPct + loanPct).toFixed(2);
    
    chartDonut.style.background = `conic-gradient(
      #002c5f 0% ${p1}%, 
      #00aad2 ${p1}% ${p2}%, 
      #cbd5e1 ${p2}% 100%
    )`;
  }

  // Combined update trigger
  function runUpdates() {
    updateRollingPrice();
    updateLoanCalculations();
  }

  // Add event listeners for sliders and dropdowns
  calcCarSelect.addEventListener("change", runUpdates);
  calcLocationSelect.addEventListener("change", runUpdates);
  calcBankSelect.addEventListener("change", runUpdates);
  
  downPaymentSlider.addEventListener("input", updateLoanCalculations);
  termSlider.addEventListener("input", updateLoanCalculations);

  // Read URL query parameter for pre-selected car
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedCar = urlParams.get("car");
  if (preselectedCar && calcCarSelect) {
    const options = Array.from(calcCarSelect.options);
    const optionExists = options.some(opt => opt.value === preselectedCar);
    if (optionExists) {
      calcCarSelect.value = preselectedCar;
    }
  }

  // Initialize
  runUpdates();
}
