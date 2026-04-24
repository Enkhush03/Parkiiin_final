/* =========================================================
   PARKIIIN — BOOKING.JS
   Booking-page interactions extracted from main.js.
   ========================================================= */

/* Booking page aliases */

function selectHour(btn) {
  return bookingSelectHour(btn);
}

/* ── BOOKING — VEHICLE TYPE ───────────────────────────── */

function selV(btn) {
  document.querySelectorAll('#vOpts .v-opt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* Booking page aliases continued */

function selPay(btn) {
  return bookingSelectPayment(btn);
}

/* ── BOOKING PAGE ─────────────────────────────────────── */

/**
 * Select a booking hour button and update aria-pressed on all siblings.
 * @param {HTMLElement} btn
 */
function bookingSelectHour(btn) {
  const grid = document.getElementById('hoursGrid');
  if (!grid) return;
  grid.querySelectorAll('.hour-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
  updateBookingSummary();
}

/**
 * Select a payment option and update aria-pressed on all siblings.
 * @param {HTMLElement} btn
 */
function bookingSelectPayment(btn) {
  const grid = document.getElementById('payGrid');
  if (!grid) return;
  grid.querySelectorAll('.pay-opt').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
}

/**
 * Toggle the loyalty points switch and recalculate the summary.
 * @param {HTMLElement} toggleEl
 */
function toggleLoyalty(toggleEl) {
  toggleEl.classList.toggle('on');
  const isOn = toggleEl.classList.contains('on');
  toggleEl.setAttribute('aria-pressed', isOn ? 'true' : 'false');
  updateBookingSummary();
}

/**
 * Recalculate displayed totals based on selected hour + loyalty state.
 * Extend / replace with real pricing logic as needed.
 */
function updateBookingSummary() {
  const RATE_PER_HOUR = 2000;   // ₮ / цаг
  const LOYALTY_DISCOUNT = 200; // fixed ₮ discount

  // Determine selected hours from active button label
  const activeBtn = document.querySelector('#hoursGrid .hour-btn.active');
  let hours = 2; // default
  if (activeBtn) {
    const match = activeBtn.textContent.match(/\d+/);
    if (match) hours = parseInt(match[0], 10);
    if (activeBtn.textContent.includes('Өдрийн')) hours = 10;
  }

  const loyaltyOn = document.getElementById('loyaltyToggle')?.classList.contains('on');
  const base = RATE_PER_HOUR * hours;
  const discount = loyaltyOn ? LOYALTY_DISCOUNT : 0;
  const total = base - discount;

  // Update DOM labels
  const fmtMNT = n => n.toLocaleString('mn-MN') + '₮';

  const summaryRows = document.querySelectorAll('.sum-row');
  const rowBase = summaryRows[0]?.querySelector('.sum-value') || null;
  const rowDiscount = summaryRows[1]?.querySelector('.sum-discount') || null;
  const rowTotal = document.querySelector('.sum-total');
  const rowBaseLabel = summaryRows[0]?.querySelector('.lbl') || null;

  if (rowBaseLabel) rowBaseLabel.textContent = `Зогсоол (${hours} цаг)`;
  if (rowBase) rowBase.textContent = fmtMNT(base);
  if (rowDiscount) rowDiscount.textContent = discount ? `−${fmtMNT(discount)}` : '−';
  if (rowTotal) rowTotal.textContent = fmtMNT(total);

  // Show/hide discount row gracefully
  const discountRow = summaryRows[1] || null;
  if (discountRow) discountRow.style.opacity = loyaltyOn ? '1' : '0.35';
}

/** Navigate to vehicle-selection page (stub). */
function changeVehicle() {
  alert('Машин солих хуудас удахгүй нэмэгдэнэ.');
}

/**
 * Confirm booking: validate, show loading, then redirect to success.
 */
function confirmBooking() {
  const active = document.querySelector('#payGrid .pay-opt.active');
  if (!active) {
    alert('Төлбөрийн хэрэгслээ сонгоно уу.');
    return;
  }

  const btn = document.getElementById('booking-confirm-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Баталгаажуулж байна...';
  }

  // TODO: replace with real API call
  setTimeout(() => {
    if (btn) { btn.disabled = false; btn.textContent = 'Төлбөр баталгаажуулах 💳'; }
    // Multi-page: redirect to success page
    window.location.href = 'success.html';
  }, 900);
}

// Init summary on page load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('hoursGrid')) updateBookingSummary();
});
