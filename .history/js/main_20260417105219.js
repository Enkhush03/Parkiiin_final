/* =========================================================
   PARKIIIN — MAIN.JS
   All shared interactive behaviour lives here.
   ========================================================= */

/* ── PAGE NAVIGATION ──────────────────────────────────── */

/**
 * Navigate to a page by its id.
 * Pages that should hide the nav: login, forgot.
 */
function nav(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }

  // hide subpages when navigating away
  document.querySelectorAll('.subpage').forEach(s => (s.style.display = 'none'));
  const profileMenu = document.getElementById('profileMenu');
  if (profileMenu) profileMenu.style.display = '';

  // nav visibility rules
  const hideNav = ['login', 'forgot'];
  const shouldHide = hideNav.includes(id);
  const topNav = document.getElementById('topNav');
  const bottomNav = document.getElementById('bottomNav');
  if (topNav) topNav.style.display = shouldHide ? 'none' : '';
  if (bottomNav) bottomNav.style.display = shouldHide ? 'none' : '';
}

/* ── NAV ACTIVE STATE ─────────────────────────────────── */

/** Highlight the clicked desktop nav link */
function act(btn) {
  document.querySelectorAll('#navLinks .nav-link').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/** Highlight the clicked bottom nav item */
function bact(btn) {
  document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ── MOBILE MENU ──────────────────────────────────────── */

function toggleMenu() {
  document.getElementById('mobileMenu')?.classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobileMenu')?.classList.remove('open');
}

/* ── AUTH UI STATE ─────────────────────────────────────── */

const AUTH_STATE_KEY = 'parkiiin:isAuthenticated';

function setAuthState(isAuthenticated) {
  try {
    if (isAuthenticated) localStorage.setItem(AUTH_STATE_KEY, 'true');
    else localStorage.removeItem(AUTH_STATE_KEY);
  } catch (error) {
    console.warn('Failed to save authentication state to localStorage.', error);
  }
}

function isAuthenticated() {
  try {
    return localStorage.getItem(AUTH_STATE_KEY) === 'true';
  } catch (error) {
    console.warn('Failed to read authentication state from localStorage.', error);
    return false;
  }
}

function syncAuthUI() {
  const loggedIn = isAuthenticated();
  document.querySelectorAll('[data-auth-visible]').forEach(el => {
    const mode = el.getAttribute('data-auth-visible');
    const show = (mode === 'logged-in' && loggedIn) || (mode === 'logged-out' && !loggedIn);
    if (show) el.style.removeProperty('display');
    else el.style.display = 'none';
  });
}

/* ── PUBLIC HANDLER ALIASES (Legacy Compatibility) ───── */

/* ── FILTER TABS ──────────────────────────────────────── */

/** Activate a filter tab within its parent row */
function ftab(btn) {
  const parent = btn.closest('.filter-tabs');
  if (!parent) return;
  parent.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
}

/* ── SERVICE TABS ─────────────────────────────────────── */

function svcTab(btn, type) {
  document.querySelectorAll('.service-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const wash = document.getElementById('svcWash');
  const repair = document.getElementById('svcRepair');
  if (wash) wash.style.display = type === 'wash' ? '' : 'none';
  if (repair) repair.style.display = type === 'repair' ? '' : 'none';
}

/* ── HAMBURGER ARIA STATE ─────────────────────────────── */

/**
 * Keep aria-expanded in sync when toggling the mobile menu.
 */
(function patchHamburger() {
  const btn = document.getElementById('hamburgerBtn');
  if (!btn) return;
  const orig = window.toggleMenu;
  window.toggleMenu = function () {
    if (orig) orig();
    const isOpen = document.getElementById('mobileMenu')?.classList.contains('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };
})();

/* ── INIT ─────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  syncAuthUI();
  // Mark bottom-nav current page as active for standalone pages
  const currentFile = window.location.pathname.split('/').pop();
  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    const href = item.getAttribute('href') || '';
    if (href.endsWith(currentFile)) {
      item.classList.add('active');
    }
  });

  // SPA guard: ensure nav visibility matches the active page on first load
  const firstPage = document.querySelector('.page.active');
  if (!firstPage) return;

  const activeId = firstPage.id;
  const hideNav = ['login', 'forgot'];
  const topNav = document.getElementById('topNav');
  const bottomNav = document.getElementById('bottomNav');
  if (topNav && hideNav.includes(activeId)) topNav.style.display = 'none';
  if (bottomNav && hideNav.includes(activeId)) bottomNav.style.display = 'none';
});

/* ── CAR TYPES PAGE ───────────────────────────────────── */

/** Open the "add car" bottom sheet. */
function addCar() {
  document.getElementById('addCarSheet')?.classList.add('open');
  document.getElementById('addCarBackdrop')?.classList.add('open');
  document.getElementById('addCarSheet')?.setAttribute('aria-hidden', 'false');
  // Focus first input for keyboard accessibility
  setTimeout(() => document.getElementById('newPlate')?.focus(), 360);
}

/** Close the "add car" bottom sheet. */
function closeAddCar() {
  document.getElementById('addCarSheet')?.classList.remove('open');
  document.getElementById('addCarBackdrop')?.classList.remove('open');
  document.getElementById('addCarSheet')?.setAttribute('aria-hidden', 'true');
}

/**
 * Select a vehicle type in the type picker.
 * @param {HTMLElement} btn
 */
function selectCarType(btn) {
  document.querySelectorAll('#carTypeGrid .car-type-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/**
 * Handle the add-car form submission.
 * Adds a new row to the live car list and updates the count badge.
 * @param {Event} e
 */
function submitAddCar(e) {
  e.preventDefault();

  const plate = document.getElementById('newPlate')?.value.trim();
  const model = document.getElementById('newModel')?.value.trim();
  const typeBtn = document.querySelector('#carTypeGrid .car-type-btn.active');
  const emoji = typeBtn?.dataset.emoji || '🚗';

  if (!plate || !model) {
    alert('Улсын дугаар болон маркийн нэрийг оруулна уу.');
    return;
  }

  const btn = document.getElementById('addCarSubmitBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Нэмж байна...'; }

  // TODO: replace with real API call
  setTimeout(() => {
    // Remove the --last class from the current last row
    const list = document.getElementById('carList');
    list?.querySelectorAll('.vehicle-row--last').forEach(r => r.classList.remove('vehicle-row--last'));

    // Build new <li>
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="car_detail.html?plate=${encodeURIComponent(plate)}"
         class="vehicle-row vehicle-row--link vehicle-row--last"
         aria-label="${model} — ${plate}">
        <span class="vehicle-emoji" aria-hidden="true">${emoji}</span>
        <div class="vehicle-info">
          <div class="vehicle-plate">${plate}</div>
          <div class="vehicle-model">${model}</div>
        </div>
        <span class="menu-arrow" aria-hidden="true">›</span>
      </a>`;
    list?.appendChild(li);

    // Update count badge
    const badge = document.getElementById('carCountBadge');
    if (badge && list) {
      badge.textContent = `Нийт: ${list.querySelectorAll('.vehicle-row').length}`;
    }

    // Reset form and close sheet
    document.getElementById('addCarForm')?.reset();
    document.querySelectorAll('#carTypeGrid .car-type-btn').forEach((b, i) => {
      b.classList.toggle('active', i === 0);
    });
    if (btn) { btn.disabled = false; btn.textContent = 'Машин нэмэх →'; }
    closeAddCar();
  }, 700);
}

/* ── TIPS PAGE ────────────────────────────────────────── */

/**

 * Reads window.ACTIVITY_END_TIME and ACTIVITY_START_TIME set in the HTML.
 */
function initActivityFeed() {
  const remaining = document.getElementById('activityRemaining');
  const bar = document.getElementById('activityProgressBar');
  if (!remaining) return;

  const endTime = window.ACTIVITY_END_TIME ? new Date(window.ACTIVITY_END_TIME) : null;
  const startTime = window.ACTIVITY_START_TIME ? new Date(window.ACTIVITY_START_TIME) : null;

  if (!endTime) return;

  clearInterval(_activityTimerInterval);

  _activityTimerInterval = setInterval(() => {
    const now = new Date();
    const secsLeft = Math.round((endTime - now) / 1000);

    remaining.textContent = _fmtMSS(Math.max(secsLeft, 0));

    if (secsLeft <= 0) {
      clearInterval(_activityTimerInterval);
      remaining.textContent = '00:00';
      remaining.style.color = '#ef4444';
      document.querySelector('.activity-status-badge')?.setAttribute('style',
        'background:#fee2e2;color:#dc2626;');
    }

    // Update progress bar
    if (bar && startTime) {
      const total = (endTime - startTime) / 1000;
      const elapsed = (now - startTime) / 1000;
      const pct = Math.min((elapsed / total) * 100, 100);
      bar.style.width = `${pct.toFixed(1)}%`;
    }
  }, 1000);
}

/**
 * Extend the active session by 30 minutes.
 * Updates window.ACTIVITY_END_TIME and DOM display.
 */
function extendSession() {
  if (!window.ACTIVITY_END_TIME) return;

  const newEnd = new Date(new Date(window.ACTIVITY_END_TIME).getTime() + 30 * 60 * 1000);
  window.ACTIVITY_END_TIME = newEnd.toISOString();

  // Update display label
  const hhmm = newEnd.toLocaleTimeString('mn-MN', { hour: '2-digit', minute: '2-digit' });
  const endEl = document.getElementById('activityEndTime');
  const labelEl = document.getElementById('activityEndLabel');
  if (endEl) endEl.textContent = hhmm;
  if (labelEl) labelEl.textContent = `${hhmm} дуусна`;

  // Restart the timer with new end time
  initActivityFeed();

  // Visual feedback
  const btn = document.querySelector('.btn-secondary');
  if (btn) {
    const orig = btn.textContent;
    btn.textContent = '✓ 30 мин нэмэгдлээ!';
    setTimeout(() => { btn.textContent = orig; }, 2000);
  }
}

/**
 * End the parking session with a confirmation prompt.
 * TODO: replace the setTimeout with a real API call.
 */
function endSession() {
  if (!confirm('Зогсоолоос гарахдаа итгэлтэй байна уу?')) return;

  clearInterval(_activityTimerInterval);

  const btn = document.getElementById('endSessionBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Дуусгаж байна...'; }

  // TODO: call API to end session
  setTimeout(() => {
    window.location.href = 'booking.html'; // navigate to summary/history
  }, 800);
}

// Auto-init when the activity page is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('activityRemaining')) initActivityFeed();
});


/* ── MY RATES PAGE ────────────────────────────────────── */

/**
 * Toggle the "liked" state on a review like button.
 * Increments count when liking, decrements when unliking.
 * @param {HTMLElement} btn
 */
function likeReview(btn) {
  const countEl = btn.querySelector('span');
  const isLiked = btn.classList.toggle('liked');
  btn.setAttribute('aria-pressed', isLiked ? 'true' : 'false');

  if (countEl) {
    const dataCount = parseInt(btn.dataset.count ?? '0', 10);
    const current = parseInt(countEl.textContent, 10);
    const next = isLiked ? dataCount + 1 : dataCount;
    countEl.textContent = next;

    // Brief scale micro-animation
    btn.style.transform = 'scale(1.18)';
    setTimeout(() => { btn.style.transform = ''; }, 160);
  }
}

/**
 * Open the edit review flow for a given review id (stub).
 * @param {string} reviewId
 */
function editReview(reviewId) {
  // TODO: open edit-review modal / navigate to edit page
  alert(`"${reviewId}" үнэлгээг засах хуудас удахгүй нэмэгдэнэ.`);
}

/**
 * Animate the star chart bar fills on page load.
 * Resets to 0% then transitions to the original width so the bars slide in.
 */
function animateStarChart() {
  const fills = document.querySelectorAll('.star-chart-fill');
  if (!fills.length) return;

  // Store target widths, reset to 0, then re-apply to trigger CSS transition
  fills.forEach(fill => {
    const target = fill.style.width;
    fill.style.width = '0%';
    // micro-delay so the browser registers the 0% value before transitioning
    requestAnimationFrame(() => requestAnimationFrame(() => {
      fill.style.width = target;
    }));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.star-chart')) animateStarChart();
});

/* ── WASH / REPAIR BOOKING PAGE ──────────────────────── */

/** Current appointment selection state */
const apptState = { svcName: 'Бүтэн угаалга', svcPrice: 45000, date: '6-р сарын 24', time: '11:00' };

/**
 * Format a number as Mongolian currency (e.g. 45000 → "45,000₮").
 * @param {number} n
 * @returns {string}
 */
function _fmtApptPrice(n) {
  return n.toLocaleString('mn-MN') + '₮';
}

/**
 * Recalculate and push all summary DOM elements from apptState.
 */
function _updateApptSummary() {
  const vat = Math.round(apptState.svcPrice * 0.10);
  const total = apptState.svcPrice + vat;
  const q = id => document.getElementById(id);
  if (q('apptSumSvcName')) q('apptSumSvcName').textContent = apptState.svcName;
  if (q('apptSumSvcPrice')) q('apptSumSvcPrice').textContent = _fmtApptPrice(apptState.svcPrice);
  if (q('apptSumDatetime')) q('apptSumDatetime').textContent = `${apptState.date}, ${apptState.time}`;
  if (q('apptCostSvc')) q('apptCostSvc').textContent = _fmtApptPrice(apptState.svcPrice);
  if (q('apptCostVat')) q('apptCostVat').textContent = _fmtApptPrice(vat);
  if (q('apptCostTotal')) q('apptCostTotal').textContent = _fmtApptPrice(total);
}

/**
 * Select a service card — updates DOM state and summary.
 * @param {HTMLElement} card
 */
function selectSvc(card) {
  document.querySelectorAll('.svc-card').forEach(c => {
    c.classList.remove('svc-card--selected');
    c.setAttribute('aria-checked', 'false');
  });
  card.classList.add('svc-card--selected');
  card.setAttribute('aria-checked', 'true');
  apptState.svcName = card.querySelector('.svc-title')?.textContent.trim() ?? '';
  apptState.svcPrice = parseInt(card.dataset.price ?? '0', 10);
  _updateApptSummary();
}

/**
 * Select a date pill — updates active styling and apptState.date.
 * @param {HTMLElement} btn
 */
function selectDatePill(btn) {
  document.querySelectorAll('.date-pill').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
  apptState.date = btn.dataset.date ?? '';
  _updateApptSummary();
}

/**
 * Select an available time slot — updates active styling and apptState.time.
 * @param {HTMLElement} btn
 */
function selectApptTime(btn) {
  if (btn.disabled || btn.classList.contains('appt-time-slot--disabled')) return;
  document.querySelectorAll('.appt-time-slot:not(.appt-time-slot--disabled)').forEach(b => {
    b.classList.remove('appt-time-slot--selected');
    b.setAttribute('aria-pressed', 'false');
    const s = b.querySelector('.appt-slot-status');
    if (s) s.textContent = 'Боломжтой';
  });
  btn.classList.add('appt-time-slot--selected');
  btn.setAttribute('aria-pressed', 'true');
  const s = btn.querySelector('.appt-slot-status');
  if (s) s.textContent = 'Сонгосон';
  apptState.time = btn.dataset.time ?? '';
  _updateApptSummary();
}

/**
 * Submit the appointment booking (stub — replace timeout with real API call).
 */
function submitApptBooking() {
  if (!apptState.svcName || !apptState.date || !apptState.time) {
    alert('Үйлчилгээ, огноо болон цагаа сонгоно уу.');
    return;
  }
  const btn = document.getElementById('apptPayBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Боловсруулж байна…'; }
  // TODO: replace with real API call
  setTimeout(() => { window.location.href = 'wash_repair_success.html'; }, 900);
}

/* ── WASH / REPAIR SUCCESS PAGE ───────────────────────── */

/**
 * Share the booking confirmation via the Web Share API.
 * Falls back to clipboard copy if navigator.share is not available.
 */
async function shareBooking() {
  const text = 'Миний Emerald Full Care захиалга баталгаажлаа! ID: #88219 | 14:30 | 12/24';
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Parkiiin захиалга', text });
    } catch (_) { /* user cancelled */ }
  } else {
    try {
      await navigator.clipboard.writeText(text);
      _showSuccessToast('Захиалгын мэдээллийг хуулав ✓');
    } catch (_) {
      alert(text);
    }
  }
}

/**
 * Trigger a download of the QR code SVG as an image file.
 * Uses a canvas intermediate for PNG export.
 */
function saveToGallery() {
  const svg = document.querySelector('.success-qr-svg');
  if (!svg) { alert('QR код олдсонгүй.'); return; }

  const serialized = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([serialized], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'parkiiin-qr-88219.svg';
  a.click();

  URL.revokeObjectURL(url);
  _showSuccessToast('QR код татагдлаа ✓');
}

/**
 * Show a brief toast notification on the success page.
 * @param {string} msg
 */
function _showSuccessToast(msg) {
  // Reuse existing toast if page doesn't have one yet
  let toast = document.getElementById('_successToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = '_successToast';
    Object.assign(toast.style, {
      position: 'fixed', bottom: '90px', left: '50%',
      transform: 'translateX(-50%)',
      background: '#1a2e2a', color: 'white',
      padding: '10px 20px', borderRadius: '100px',
      fontSize: '13px', fontWeight: '600',
      boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      zIndex: '9999', transition: 'opacity 0.3s',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      whiteSpace: 'nowrap',
    });
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => { toast.style.opacity = '0'; }, 2400);
}

/* ── NEARBY REPAIR PAGE ───────────────────────────────── */

/**
 * Live-filter repair cards by shop name.
 * @param {string} query
 */
function filterRepair(query) {
  const q = query.toLowerCase().trim();
  document.querySelectorAll('#repairList .wash-card').forEach(card => {
    const name = (card.dataset.name ?? '').toLowerCase();
    card.style.display = (!q || name.includes(q)) ? '' : 'none';
  });
}

/**
 * Sort the repair list by distance, rating, or price.
 * @param {HTMLElement} btn
 * @param {'distance'|'rating'|'price'} key
 */
function repairSort(btn, key) {
  document.querySelectorAll('.repair-sort-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');

  const list = document.getElementById('repairList');
  if (!list) return;

  const cards = [...list.querySelectorAll('.wash-card')];
  cards.sort((a, b) => {
    const av = parseFloat(a.dataset[key]) || 0;
    const bv = parseFloat(b.dataset[key]) || 0;
    return key === 'rating' ? bv - av : av - bv;
  });
  cards.forEach(c => list.appendChild(c));
}

/**
 * Toggle the primary repair filter button.
 * @param {HTMLElement} btn
 */
function toggleRepairFilter(btn) {
  btn.classList.toggle('active');
  btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
}

/**
 * Navigate to the appointment booking page for a repair shop.
 * @param {string} name
 */
function bookRepair(name) {
  window.location.href = 'wash_repair_booking.html?venue=' + encodeURIComponent(name) + '&type=repair';
}

/**
 * Navigate to the find park map filtered to repair shops.
 */
function showRepairMap() {
  window.location.href = '../findPark.html?category=repair';
}

/* ═══════════════════════════════════════════════════════════
   FIND PARK PAGE  (pages/findPark.html)
   ═══════════════════════════════════════════════════════════ */


