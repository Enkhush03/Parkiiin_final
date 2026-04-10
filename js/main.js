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
  const topNav    = document.getElementById('topNav');
  const bottomNav = document.getElementById('bottomNav');
  if (topNav)    topNav.style.display    = shouldHide ? 'none' : '';
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
    el.style.display = show ? '' : 'none';
  });
}

/* ── AUTH TABS  (Login ↔ Signup) ─────────────────────── */

/**
 * Switch between login form (#lf) and signup form (#sf).
 * @param {string} formId   'lf' | 'sf'
 * @param {HTMLElement} btn  The tab button that was clicked
 */
function authTab(formId, btn) {
  const lf = document.getElementById('lf');
  const sf = document.getElementById('sf');
  if (lf) lf.style.display = 'none';
  if (sf) sf.style.display = 'none';

  const target = document.getElementById(formId);
  if (target) target.style.display = 'block';

  // update active tab styling
  document.querySelectorAll('.auth-card .tab-b').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

/* ── USER TYPE TABS  (driver | owner) ────────────────── */

/**
 * Switch the signup user-type sub-tab.
 * @param {string} type  'driver' | 'owner'
 * @param {HTMLElement} btn
 */
function userTypeTab(type, btn) {
  document.querySelectorAll('.tab-sw--inner .tab-b').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  // extend here if driver / owner show different fields
}

/* ── FILTER TABS ──────────────────────────────────────── */

/** Activate a filter tab within its parent row */
function ftab(btn) {
  const parent = btn.closest('.filter-tabs');
  if (!parent) return;
  parent.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
}

/* ── TIPS TABS ────────────────────────────────────────── */

function ttab(btn, showPanelId, hidePanelId) {
  const parent = btn.closest('.tips-tabs');
  if (!parent) return;
  parent.querySelectorAll('.tips-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  // Optional: show/hide content panels
  if (showPanelId) {
    const show = document.getElementById(showPanelId);
    const hide = document.getElementById(hidePanelId);
    if (show) show.style.display = '';
    if (hide) hide.style.display = 'none';
  }
}

/**
 * Filter tip articles by category.
 * Articles use data-cat attribute matching pill data-cat.
 * @param {HTMLElement} btn  The clicked pill button
 * @param {string} cat       Category key or 'all'
 */
function tipsCat(btn, cat) {
  // Update active pill
  const parent = btn.closest('.tips-cat-row, .tips-tabs');
  if (parent) {
    parent.querySelectorAll('.tips-cat-pill, .tips-tab').forEach(b => b.classList.remove('active'));
  }
  btn.classList.add('active');

  // Filter articles
  document.querySelectorAll('.tip-article').forEach(card => {
    const cardCat = card.dataset.cat || 'all';
    card.style.display = (cat === 'all' || cardCat === cat) ? '' : 'none';
  });
}

/* ── SERVICE TABS ─────────────────────────────────────── */

function svcTab(btn, type) {
  document.querySelectorAll('.service-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const wash   = document.getElementById('svcWash');
  const repair = document.getElementById('svcRepair');
  if (wash)   wash.style.display   = type === 'wash'   ? '' : 'none';
  if (repair) repair.style.display = type === 'repair' ? '' : 'none';
}

/* ── BOOKING — HOUR SELECTION ─────────────────────────── */

function selectHour(btn) {
  document.querySelectorAll('#hoursGrid .hour-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ── BOOKING — VEHICLE TYPE ───────────────────────────── */

function selV(btn) {
  document.querySelectorAll('#vOpts .v-opt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ── BOOKING — PAYMENT METHOD ─────────────────────────── */

function selPay(btn) {
  document.querySelectorAll('#payGrid .pay-opt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ── PROFILE SUBPAGES ─────────────────────────────────── */

function showSub(name) {
  const profileMenu = document.getElementById('profileMenu');
  const sub = document.getElementById('sub-' + name);
  if (profileMenu) profileMenu.style.display = 'none';
  if (sub)         sub.style.display = 'block';
}

function hideSub(name) {
  const profileMenu = document.getElementById('profileMenu');
  const sub = document.getElementById('sub-' + name);
  if (sub)         sub.style.display = 'none';
  if (profileMenu) profileMenu.style.display = '';
}

/* ── PASSWORD TOGGLE ──────────────────────────────────── */

/**
 * Toggle password visibility for a given input field.
 * @param {string} inputId  ID of the password input
 * @param {HTMLElement} btn  The eye button element
 */
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';

  // swap icon: open eye vs closed eye
  btn.innerHTML = isHidden
    ? /* eye-off */ `<svg viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
    : /* eye-on  */ `<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  btn.setAttribute('aria-label', isHidden ? 'Нууц үг нуух' : 'Нууц үг харуулах');
}

/* ── FORM HANDLERS ────────────────────────────────────── */

/**
 * Login form submit handler.
 * Replace the body with real auth logic (fetch, redirect, etc.).
 */
function handleLogin(e) {
  e.preventDefault();
  const email    = document.getElementById('login-email')?.value.trim();
  const password = document.getElementById('login-password')?.value;

  if (!email || !password) {
    alert('Имэйл болон нууц үгээ оруулна уу.');
    return;
  }

  // TODO: replace with real API call
  nav('profile');
}

/**
 * Signup form submit handler.
 * Replace the body with real registration logic.
 */
function handleSignup(e) {
  e.preventDefault();
  const terms = document.getElementById('terms-check');
  if (terms && !terms.checked) {
    alert('Үйлчилгээний нөхцөлийг зөвшөөрнө үү.');
    return;
  }

  // TODO: replace with real API call
  nav('profile');
}

/* ── PROFILE — SIGN OUT ───────────────────────────────── */

/**
 * Confirm and then redirect to login.
 * In an SPA context, call nav('login') instead of href redirect.
 */
function handleSignOut() {
  const confirmed = confirm('Та нэвтрэх хэсгээс гарахдаа итгэлтэй байна уу?');
  if (!confirmed) return;
  setAuthState(false);

  // SPA: navigate to login page section
  if (typeof nav === 'function' && document.getElementById('login')) {
    nav('login');
    return;
  }
  // Multi-page: redirect
  window.location.href = 'login.html';
}

/* ── PROFILE — SETTINGS ───────────────────────────────── */

/**
 * Open the settings sub-panel (or navigate to settings page).
 * Extend this once a settings page is provided.
 */
function openSettings() {
  // TODO: replace with showSub('settings') once settings page is built
  alert('Тохиргоо хуудас удахгүй нэмэгдэнэ.');
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

  const activeId  = firstPage.id;
  const hideNav   = ['login', 'forgot'];
  const topNav    = document.getElementById('topNav');
  const bottomNav = document.getElementById('bottomNav');
  if (topNav    && hideNav.includes(activeId)) topNav.style.display    = 'none';
  if (bottomNav && hideNav.includes(activeId)) bottomNav.style.display = 'none';
});

/* ── FORGOT PASSWORD — TAB SWITCH ─────────────────────── */

/**
 * Toggle between the email input panel and the phone input panel
 * on the forgot-password page.
 * @param {'email'|'phone'} type
 * @param {HTMLElement} btn  The tab button that was clicked
 */
function forgotTab(type, btn) {
  // Update tab active states
  document.querySelectorAll('#forgotForm ~ * .tab-b, .tab-sw .tab-b').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');

  // Show / hide panels
  const emailPanel = document.getElementById('forgot-email-panel');
  const phonePanel = document.getElementById('forgot-phone-panel');
  const emailInput = document.getElementById('forgot-email');
  const phoneInput = document.getElementById('forgot-phone');

  if (type === 'email') {
    if (emailPanel) emailPanel.style.display = '';
    if (phonePanel) phonePanel.style.display = 'none';
    // clear phone, mark email required
    if (phoneInput) { phoneInput.value = ''; phoneInput.removeAttribute('required'); }
    if (emailInput) emailInput.setAttribute('required', '');
  } else {
    if (emailPanel) emailPanel.style.display = 'none';
    if (phonePanel) phonePanel.style.display = '';
    // clear email, mark phone required
    if (emailInput) { emailInput.value = ''; emailInput.removeAttribute('required'); }
    if (phoneInput) phoneInput.setAttribute('required', '');
  }
}

/* ── FORGOT PASSWORD — FORM SUBMIT ────────────────────── */

/**
 * Handle the forgot-password form submission.
 * Replace the body with a real password-reset API call.
 * @param {Event} e
 */
function handleForgotPassword(e) {
  e.preventDefault();

  const emailInput = document.getElementById('forgot-email');
  const phoneInput = document.getElementById('forgot-phone');
  const emailPanel = document.getElementById('forgot-email-panel');

  // Determine which panel is active
  const isEmailMode = emailPanel && emailPanel.style.display !== 'none';
  const value = isEmailMode
    ? emailInput?.value.trim()
    : phoneInput?.value.trim();

  if (!value) {
    alert(isEmailMode
      ? 'Имэйл хаягаа оруулна уу.'
      : 'Утасны дугаараа оруулна уу.');
    return;
  }

  const btn = document.getElementById('forgot-submit-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Илгээж байна...';
  }

  // TODO: replace with real API call → e.g. fetch('/api/reset-password', …)
  setTimeout(() => {
    alert(`Баталгаажуулах код "${value}" руу илгээгдлээ.`);
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Код илгээх →';
    }
    // Redirect back to login after sending
    const loginHref = document.getElementById('back-to-login-link')?.href;
    if (loginHref) window.location.href = loginHref;
  }, 800);
}

/* ── FIND PARK MAP PAGE ───────────────────────────────── */

/**
 * Marker data table — maps markerId → detail card content.
 * Extend this object as new locations are added.
 */
const MARKER_DATA = {
  central:  { emoji:'🏢', name:'Central Tower Parking', loc:'Сүхбаатар дүүрэг, УБ',       price:'2,000₮', slots:'12 зогсоол', rating:'4.8' },
  shangri:  { emoji:'🏬', name:'Shangri-La Зогсоол',    loc:'Сүхбаатар дүүрэг, 1-р хороо', price:'5,000₮', slots:'Нээлттэй',   rating:'4.9' },
  cleanmax: { emoji:'🚿', name:'CleanMax Auto Wash',     loc:'Сүхбаатар дүүрэг, 1.2км',    price:'25,000₮',slots:'Үйлчилгээ', rating:'4.8' },
  autodoc:  { emoji:'🔧', name:'Auto Doc Repair',        loc:'Баянзүрх дүүрэг, 1.2км',     price:'Тохиролцоно', slots:'Засвар', rating:'4.9' },
};

/** Currently selected marker id */
let _activeMarkerId = null;

/**
 * Select a marker, populate the detail card, and slide it up.
 * @param {HTMLElement} markerEl  The .map-marker element
 * @param {string}      id        Key in MARKER_DATA
 */
function selectMarker(markerEl, id) {
  if (window.event) window.event.stopPropagation();

  document.querySelectorAll('.map-marker').forEach(m => m.classList.remove('selected'));
  markerEl.classList.add('selected');
  _activeMarkerId = id;

  const data = MARKER_DATA[id];
  if (data) {
    const set = (elId, html, isHTML) => {
      const el = document.getElementById(elId);
      if (!el) return;
      if (isHTML) el.innerHTML = html; else el.textContent = html;
    };
    set('detailImg',    data.emoji);
    set('detailName',   data.name);
    set('detailLoc',    `<svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true"
      style="fill:none;stroke:currentColor;stroke-width:2;display:inline;vertical-align:middle;margin-right:2px;">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/></svg>${data.loc}`, true);
    set('detailPrice',  `${data.price}<span style="font-size:11px;font-weight:400;color:var(--text-muted);">/цаг</span>`, true);
    set('detailSlots',  data.slots);
    set('detailRating', data.rating);
  }

  const card = document.getElementById('parkingDetailCard');
  if (card) { card.classList.add('show'); card.setAttribute('aria-hidden','false'); }
  document.getElementById('mapControls')?.classList.add('card-open');
}

/** Dismiss the detail card and deselect all markers. */
function dismissCard() {
  const card = document.getElementById('parkingDetailCard');
  if (card) { card.classList.remove('show'); card.setAttribute('aria-hidden','true'); }
  document.querySelectorAll('.map-marker').forEach(m => m.classList.remove('selected'));
  document.getElementById('mapControls')?.classList.remove('card-open');
  _activeMarkerId = null;
}

/**
 * Switch the active category pill.
 * @param {HTMLElement} btn
 */
function mapCat(btn) {
  document.querySelectorAll('.map-cat').forEach(b => {
    b.classList.remove('active');
  });
  btn.classList.add('active');
}

/**
 * Switch category and highlight the nearest matching marker.
 * Called from the "Үзэх" buttons inside the detail card.
 * @param {'wash'|'repair'} catType
 */
function mapCatAndSelect(catType) {
  const catMap = { wash: 'cleanmax', repair: 'autodoc' };
  const targetId = catMap[catType];
  if (!targetId) return;

  const catBtn = document.querySelector(`.map-cat[data-cat="${catType}"]`);
  if (catBtn) mapCat(catBtn);

  dismissCard();
  setTimeout(() => {
    const cap = targetId.charAt(0).toUpperCase() + targetId.slice(1);
    const targetMarker = document.getElementById('marker' + cap);
    if (targetMarker) selectMarker(targetMarker, targetId);
  }, 80);
}

/** Toggle the filter button active state. */
function toggleMapFilter(btn) {
  btn.classList.toggle('active');
  btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
}

/** Toggle the layers control button. */
function toggleLayers(btn) { btn.classList.toggle('map-control-btn--active'); }

/** Simulate centering on user location with a brief spin. */
function centerLocation(btn) {
  btn.classList.add('map-control-btn--active');
  btn.style.transition = 'transform 0.6s ease';
  btn.style.transform  = 'rotate(360deg)';
  setTimeout(() => { btn.style.transform = ''; }, 650);
}

/** Navigate to the booking page for the selected marker. */
function bookParking() {
  if (typeof nav === 'function' && document.getElementById('book')) {
    nav('book');
  } else {
    window.location.href = 'booking.html';
  }
}

/**
 * Initialise all find-park interactions.
 * Safe to call even when map elements are absent (other pages).
 */
function initFindPark() {
  const mapPage = document.getElementById('mapPage');
  if (!mapPage) return;

  // Tap on map background → dismiss detail card
  mapPage.addEventListener('click', () => dismissCard());

  // Prevent card clicks from bubbling to the map
  const card = document.getElementById('parkingDetailCard');
  if (card) card.addEventListener('click', e => e.stopPropagation());

  // Keyboard: Escape closes card
  document.addEventListener('keydown', e => { if (e.key === 'Escape') dismissCard(); });

  // Keyboard: Enter / Space activates focused marker
  document.querySelectorAll('.map-marker').forEach(marker => {
    marker.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); marker.click(); }
    });
  });
}

document.addEventListener('DOMContentLoaded', initFindPark);


/* ── BOOKING PAGE ─────────────────────────────────────── */

/**
 * Select an hour button and update aria-pressed on all siblings.
 * Overrides the SPA version in case it's declared earlier.
 * @param {HTMLElement} btn
 */
function selectHour(btn) {
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
function selPay(btn) {
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
  const base      = RATE_PER_HOUR * hours;
  const discount  = loyaltyOn ? LOYALTY_DISCOUNT : 0;
  const total     = base - discount;

  // Update DOM labels
  const fmtMNT = n => n.toLocaleString('mn-MN') + '₮';

  const summaryRows = document.querySelectorAll('.sum-row');
  const rowBase     = summaryRows[0]?.querySelector('.sum-value') || null;
  const rowDiscount = summaryRows[1]?.querySelector('.sum-discount') || null;
  const rowTotal    = document.querySelector('.sum-total');
  const rowBaseLabel = summaryRows[0]?.querySelector('.lbl') || null;

  if (rowBaseLabel) rowBaseLabel.textContent = `Зогсоол (${hours} цаг)`;
  if (rowBase)      rowBase.textContent      = fmtMNT(base);
  if (rowDiscount)  rowDiscount.textContent  = discount ? `−${fmtMNT(discount)}` : '−';
  if (rowTotal)     rowTotal.textContent     = fmtMNT(total);

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

  const plate  = document.getElementById('newPlate')?.value.trim();
  const model  = document.getElementById('newModel')?.value.trim();
  const typeBtn = document.querySelector('#carTypeGrid .car-type-btn.active');
  const emoji  = typeBtn?.dataset.emoji || '🚗';

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
 * Switch between the Нийтлал (article) and Видео panels.
 * Extends the existing ttab() with content-panel show/hide.
 * @param {HTMLElement} btn   The clicked tab button
 * @param {'article'|'video'} type
 */
function tipsTabSwitch(btn, type) {
  ttab(btn); // reuse existing active-state logic

  const articlesSection = document.getElementById('tipsArticlesSection');
  const videosSection   = document.getElementById('tipsVideosSection');

  if (articlesSection) articlesSection.style.display = type === 'article' ? '' : 'none';
  if (videosSection)   videosSection.style.display   = type === 'video'   ? '' : 'none';

  // Sync aria-selected
  document.querySelectorAll('.tips-tab').forEach(t => {
    t.setAttribute('aria-selected', t === btn ? 'true' : 'false');
  });
}

/**
 * Live-filter articles and video cards by search keyword.
 * Hides cards whose titles/descriptions don't match the query.
 * @param {string} query
 */
function filterTips(query) {
  const q = query.toLowerCase().trim();

  document.querySelectorAll('.article-card').forEach(card => {
    const title = card.querySelector('.article-title')?.textContent.toLowerCase() ?? '';
    const desc  = card.querySelector('.article-desc')?.textContent.toLowerCase()  ?? '';
    card.style.display = (!q || title.includes(q) || desc.includes(q)) ? '' : 'none';
  });

  document.querySelectorAll('.video-card').forEach(card => {
    const label = card.querySelector('.video-label')?.textContent.toLowerCase() ?? '';
    card.style.display = (!q || label.includes(q)) ? '' : 'none';
  });
}

/**
 * Open an article detail (stub — extend with real routing or modal).
 * @param {string} id
 */
function openArticle(id) {
  // TODO: navigate to article detail page
  alert(`"${id}" нийтлэлийн дэлгэрэнгүй хуудас удахгүй нэмэгдэнэ.`);
}

/**
 * Open a video player (stub — extend with full-screen player modal).
 * @param {string} id
 */
function openVideo(id) {
  // TODO: open video player modal
  alert(`"${id}" видео тоглуулагч удахгүй нэмэгдэнэ.`);
}

/* ── NEARBY WASHING PAGE ──────────────────────────────── */

/**
 * Live-filter wash cards by venue name.
 * @param {string} query
 */
function filterWash(query) {
  const q = query.toLowerCase().trim();
  document.querySelectorAll('#washList .wash-card, #washList .wash-card-small').forEach(card => {
    const name = (card.dataset.name ?? '').toLowerCase();
    card.style.display = (!q || name.includes(q)) ? '' : 'none';
  });
}

/**
 * Client-side sort the wash list by distance, rating, or price.
 * Deactivates other sort buttons, then re-appends cards in sorted order.
 * @param {HTMLElement} btn
 * @param {'distance'|'rating'|'price'} key
 */
function washSort(btn, key) {
  document.querySelectorAll('.wash-filter-sort').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');

  const list = document.getElementById('washList');
  if (!list) return;

  const cards = [...list.querySelectorAll('.wash-card, .wash-card-small')];
  cards.sort((a, b) => {
    const av = parseFloat(a.dataset[key]) || 0;
    const bv = parseFloat(b.dataset[key]) || 0;
    return key === 'rating' ? bv - av : av - bv;
  });

  cards.forEach(c => list.appendChild(c));
}

/**
 * Toggle the filter button active state.
 * @param {HTMLElement} btn
 */
function toggleWashFilter(btn) {
  btn.classList.toggle('active');
  btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
}

/**
 * Quick-book a wash venue from the compact card.
 * @param {string} name
 */
function quickBookWash(name) {
  window.location.href = `booking.html?venue=${encodeURIComponent(name)}&type=wash`;
}

/** Open QR code scanner (stub). */
function openQR() {
  alert('QR код уншуулах функц удахгүй нэмэгдэнэ.');
}

/* ── ACTIVITY FEED PAGE ───────────────────────────────── */

/** Interval reference for the countdown timer */
let _activityTimerInterval = null;

/**
 * Format seconds as MM:SS.
 * @param {number} secs
 * @returns {string}
 */
function _fmtMSS(secs) {
  const m = Math.floor(Math.abs(secs) / 60);
  const s = Math.floor(Math.abs(secs) % 60);
  const sign = secs < 0 ? '-' : '';
  return `${sign}${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

/**
 * Start (or restart) the live countdown timer and progress bar.
 * Reads window.ACTIVITY_END_TIME and ACTIVITY_START_TIME set in the HTML.
 */
function initActivityFeed() {
  const remaining = document.getElementById('activityRemaining');
  const bar       = document.getElementById('activityProgressBar');
  if (!remaining) return;

  const endTime   = window.ACTIVITY_END_TIME   ? new Date(window.ACTIVITY_END_TIME)   : null;
  const startTime = window.ACTIVITY_START_TIME ? new Date(window.ACTIVITY_START_TIME) : null;

  if (!endTime) return;

  clearInterval(_activityTimerInterval);

  _activityTimerInterval = setInterval(() => {
    const now  = new Date();
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
      const total   = (endTime - startTime) / 1000;
      const elapsed = (now - startTime) / 1000;
      const pct     = Math.min((elapsed / total) * 100, 100);
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
  const hhmm = newEnd.toLocaleTimeString('mn-MN', { hour:'2-digit', minute:'2-digit' });
  const endEl   = document.getElementById('activityEndTime');
  const labelEl = document.getElementById('activityEndLabel');
  if (endEl)   endEl.textContent   = hhmm;
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
    const current   = parseInt(countEl.textContent, 10);
    const next      = isLiked ? dataCount + 1 : dataCount;
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
  const vat   = Math.round(apptState.svcPrice * 0.10);
  const total = apptState.svcPrice + vat;
  const q = id => document.getElementById(id);
  if (q('apptSumSvcName'))  q('apptSumSvcName').textContent  = apptState.svcName;
  if (q('apptSumSvcPrice')) q('apptSumSvcPrice').textContent = _fmtApptPrice(apptState.svcPrice);
  if (q('apptSumDatetime')) q('apptSumDatetime').textContent = `${apptState.date}, ${apptState.time}`;
  if (q('apptCostSvc'))     q('apptCostSvc').textContent     = _fmtApptPrice(apptState.svcPrice);
  if (q('apptCostVat'))     q('apptCostVat').textContent     = _fmtApptPrice(vat);
  if (q('apptCostTotal'))   q('apptCostTotal').textContent   = _fmtApptPrice(total);
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
  apptState.svcName  = card.querySelector('.svc-title')?.textContent.trim() ?? '';
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
  setTimeout(() => { window.location.href = '../booking.html'; }, 900);
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
  const url  = URL.createObjectURL(blob);

  const a    = document.createElement('a');
  a.href     = url;
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
   AUTH PAGE  (pages/login.html)
   ═══════════════════════════════════════════════════════════ */

/**
 * Toggle password field visibility and swap the eye SVG icon.
 * @param {string} fieldId
 * @param {HTMLElement} btn
 */
function togglePassword(fieldId, btn) {
  const input = document.getElementById(fieldId);
  if (!input) return;
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  btn.setAttribute('aria-label', isHidden ? 'Нууц үг нуух' : 'Нууц үг харуулах');
  const svg = btn.querySelector('svg');
  if (svg) {
    svg.innerHTML = isHidden
      ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'
      : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  }
}

/**
 * Switch between Login (#lf) and Signup (#sf) panels.
 * @param {string} panelId - 'lf' or 'sf'
 * @param {HTMLElement} activeBtn
 */
function authTab(panelId, activeBtn) {
  document.querySelectorAll('.tab-sw:first-of-type .tab-b').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-selected', 'true');
  }
  ['lf', 'sf'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = id === panelId ? '' : 'none';
  });
  const sub = document.getElementById('authSubtitle');
  if (sub) sub.textContent = panelId === 'lf' ? 'Тавтай морил! Нэвтэрч орно уу' : 'Шинэ данс үүсгэх';
  clearAuthError();
}

/**
 * Switch user-type sub-tab (Driver / Parking owner) inside signup.
 * @param {'driver'|'owner'} type
 * @param {HTMLElement} btn
 */
function userTypeTab(type, btn) {
  document.querySelectorAll('.tab-sw--inner .tab-b').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
}

/* ── Field validation helpers ─────────────────────────────── */

function _setFieldState(input, errId, msg) {
  const err = document.getElementById(errId);
  if (msg) {
    input.classList.add('form-i--invalid');
    input.classList.remove('form-i--valid');
    if (err) err.textContent = msg;
    return false;
  }
  input.classList.remove('form-i--invalid');
  input.classList.add('form-i--valid');
  if (err) err.textContent = '';
  return true;
}

function validateField(input) {
  return _setFieldState(input, input.id + '-err',
    input.value.trim() ? '' : 'Заавал бөглөнө үү');
}

function validateEmail(input) {
  if (!input.value.trim())
    return _setFieldState(input, input.id + '-err', 'Имэйл оруулна уу');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()))
    return _setFieldState(input, input.id + '-err', 'Буруу имэйл формат');
  return _setFieldState(input, input.id + '-err', '');
}

function validatePhone(input) {
  const digits = input.value.replace(/\D/g, '');
  if (!digits)    return _setFieldState(input, input.id + '-err', 'Утасны дугаар оруулна уу');
  if (digits.length < 8) return _setFieldState(input, input.id + '-err', 'Дугаар хэт богино');
  return _setFieldState(input, input.id + '-err', '');
}

/** Score password and update the strength meter. */
function onPasswordInput(input) {
  const val  = input.value;
  const wrap = document.getElementById('pwStrengthWrap');
  if (!val) {
    if (wrap) wrap.style.display = 'none';
    return _setFieldState(input, input.id + '-err', '');
  }
  if (wrap) wrap.style.display = 'flex';

  let score = 0;
  if (val.length >= 8)  score++;
  if (val.length >= 12) score++;
  if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
  if (/\d/.test(val))             score++;
  if (/[^A-Za-z0-9]/.test(val))  score++;

  const levels = [
    { key: 'weak',   lbl: 'Маш сул' },
    { key: 'weak',   lbl: 'Сул' },
    { key: 'fair',   lbl: 'Дунд' },
    { key: 'good',   lbl: 'Хүчтэй' },
    { key: 'strong', lbl: 'Маш хүчтэй' },
  ];
  const lvl  = levels[Math.min(score, 4)];
  const fill = document.getElementById('pwStrengthFill');
  const lbl  = document.getElementById('pwStrengthLbl');
  if (fill) fill.className = 'pw-strength-fill pw-strength-fill--' + lvl.key;
  if (lbl)  { lbl.className = 'pw-strength-lbl pw-strength-lbl--' + lvl.key; lbl.textContent = lvl.lbl; }

  return _setFieldState(input, input.id + '-err',
    val.length < 8 ? 'Хамгийн багадаа 8 тэмдэгт' : '');
}

function validatePassword2(input) {
  const pw1 = document.getElementById('signup-password');
  if (!input.value)
    return _setFieldState(input, input.id + '-err', 'Нууц үгийг давтана уу');
  if (pw1 && input.value !== pw1.value)
    return _setFieldState(input, input.id + '-err', 'Нууц үг таарахгүй байна');
  return _setFieldState(input, input.id + '-err', '');
}

/* ── Alert strip ──────────────────────────────────────────── */

function showAuthAlert(msg, type) {
  const el = document.getElementById('authAlert');
  if (!el) return;
  el.textContent = msg;
  el.className = 'auth-alert auth-alert--' + (type || 'error');
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearAuthError() {
  const el = document.getElementById('authAlert');
  if (el) { el.style.display = 'none'; el.textContent = ''; }
}

/* ── Login submit handler ─────────────────────────────────── */

/**
 * Validate login form and stub-navigate to profile.html.
 * @param {Event} e
 */
function handleLogin(e) {
  e.preventDefault();
  clearAuthError();

  const emailInput = document.getElementById('login-email');
  const pwInput    = document.getElementById('login-password');
  let ok = true;

  if (!emailInput.value.trim()) {
    _setFieldState(emailInput, 'login-email-err', 'Имэйл эсвэл утасны дугаар оруулна уу');
    ok = false;
  } else _setFieldState(emailInput, 'login-email-err', '');

  if (!pwInput.value) {
    _setFieldState(pwInput, 'login-password-err', 'Нууц үг оруулна уу');
    ok = false;
  } else _setFieldState(pwInput, 'login-password-err', '');

  if (!ok) return;

  const btn = document.getElementById('login-submit-btn');
  if (btn) { btn.textContent = 'Нэвтэрч байна...'; btn.disabled = true; }
  setAuthState(true);
  setTimeout(() => { window.location.href = 'profile.html'; }, 800);
}

/* ── Signup submit handler ────────────────────────────────── */

/**
 * Full client-side validation for signup form, then stub-navigate to profile.html.
 * @param {Event} e
 */
function handleSignup(e) {
  e.preventDefault();
  clearAuthError();

  const f = {
    lastname:  document.getElementById('signup-lastname'),
    firstname: document.getElementById('signup-firstname'),
    phone:     document.getElementById('signup-phone'),
    email:     document.getElementById('signup-email'),
    password:  document.getElementById('signup-password'),
    password2: document.getElementById('signup-password2'),
    terms:     document.getElementById('terms-check'),
  };

  let ok = true;
  if (!validateField(f.lastname))  ok = false;
  if (!validateField(f.firstname)) ok = false;
  if (!validatePhone(f.phone))     ok = false;
  if (!validateEmail(f.email))     ok = false;

  if (!f.password.value || f.password.value.length < 8) {
    _setFieldState(f.password, 'signup-password-err', 'Хамгийн багадаа 8 тэмдэгт оруулна уу');
    ok = false;
  } else _setFieldState(f.password, 'signup-password-err', '');

  if (!validatePassword2(f.password2)) ok = false;

  if (f.terms && !f.terms.checked) {
    showAuthAlert('Үйлчилгээний нөхцөлийг зөвшөөрнө үү.', 'error');
    ok = false;
  }

  if (!ok) return;

  const btn = document.getElementById('signup-submit-btn');
  if (btn) { btn.textContent = 'Бүртгэж байна...'; btn.disabled = true; }
  setTimeout(() => {
    showAuthAlert('Бүртгэл амжилттай! Тавтай морил 🎉', 'success');
    setAuthState(true);
    setTimeout(() => { window.location.href = 'profile.html'; }, 1000);
  }, 900);
}

/**
 * Social auth stub — replace with OAuth redirect when backend is ready.
 * @param {'google'|'apple'} provider
 */
function socialLogin(provider) {
  showAuthAlert(
    provider === 'google' ? 'Google нэвтрэлт тун удахгүй...' : 'Apple нэвтрэлт тун удахгүй...',
    'success'
  );
}

/* ═══════════════════════════════════════════════════════════
   FIND PARK PAGE  (pages/findPark.html)
   ═══════════════════════════════════════════════════════════ */

/**
 * Live-filter parking cards by name (data-name attribute).
 * Updates the sheet count badge.
 * @param {string} query
 */
function filterParkingCards(query) {
  const q = (query || '').toLowerCase().trim();
  let visible = 0;
  document.querySelectorAll('#parkingCardList .parking-card').forEach(card => {
    const name = (card.dataset.name || '').toLowerCase();
    const show = !q || name.includes(q);
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  const badge = document.getElementById('sheetCount');
  if (badge) badge.textContent = visible;
}

/**
 * Sort parking card list.
 * @param {HTMLElement} btn - the clicked sort pill
 * @param {'all'|'near'|'cheap'|'free'} key
 */
function parkingSort(btn, key) {
  // Update active pill
  document.querySelectorAll('.map-sort-tabs .filter-tab').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');

  const list = document.getElementById('parkingCardList');
  if (!list) return;

  const cards = [...list.querySelectorAll('.parking-card')];

  if (key === 'free') {
    // Show only cards with data-slots > 0
    cards.forEach(c => {
      const slots = parseInt(c.dataset.slots || '1');
      c.style.display = slots > 0 ? '' : 'none';
    });
    return;
  }

  // Reset display
  cards.forEach(c => c.style.display = '');

  if (key === 'near') {
    cards.sort((a, b) => parseFloat(a.dataset.dist || '0') - parseFloat(b.dataset.dist || '0'));
  } else if (key === 'cheap') {
    cards.sort((a, b) => parseInt(a.dataset.price || '0') - parseInt(b.dataset.price || '0'));
  }
  // 'all' = no sort, just reset display

  cards.forEach(c => list.appendChild(c));

  const badge = document.getElementById('sheetCount');
  if (badge) badge.textContent = cards.length;
}

/**
 * Toggle the parking card list bottom sheet open/collapsed.
 * @param {HTMLElement} btn
 */
function toggleListSheet(btn) {
  const sheet = document.getElementById('parkingListSheet');
  if (!sheet) return;
  sheet.classList.toggle('collapsed');
  const isCollapsed = sheet.classList.contains('collapsed');
  btn.setAttribute('aria-label', isCollapsed ? 'Жагсаалт харуулах' : 'Жагсаалт нуух');
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   TIPS PAGE  (pages/tips.html)
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

/**
 * Switch between Нийтлал (articles) and Видео (videos) panels.
 * @param {HTMLElement} btn       - the clicked tips-tab button
 * @param {string}      showId    - panel to show
 * @param {string}      hideId    - panel to hide
 */
function ttab(btn, showId, hideId) {
  // Update tab buttons
  document.querySelectorAll('.tips-tabs .tips-tab[role="tab"]').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');

  // Toggle panels
  const show = document.getElementById(showId);
  const hide = document.getElementById(hideId);
  if (show) show.style.display = '';
  if (hide) hide.style.display = 'none';
}

/**
 * Filter article cards by category pill.
 * @param {HTMLElement} btn
 * @param {string} cat
 */
function tipsCat(btn, cat) {
  // Update category pill active state
  document.querySelectorAll('[data-cat]').forEach(b => {
    if (b.classList.contains('tips-tab')) {
      b.classList.remove('active');
    }
  });
  btn.classList.add('active');

  // Show/hide articles matching category
  document.querySelectorAll('.tip-article').forEach(card => {
    const cardCat = card.dataset.cat || 'all';
    card.style.display = (cat === 'all' || cardCat === cat) ? '' : 'none';
  });
}

/**
 * Live search across tip-title and tip-desc text.
 * @param {string} query
 */
function tipsSearch(query) {
  const q = (query || '').toLowerCase().trim();
  document.querySelectorAll('.tip-article').forEach(card => {
    const title = (card.querySelector('.tip-title')?.textContent || '').toLowerCase();
    const desc  = (card.querySelector('.tip-desc')?.textContent  || '').toLowerCase();
    card.style.display = (!q || title.includes(q) || desc.includes(q)) ? '' : 'none';
  });
}

/**
 * Open a video — stub ready for real player integration.
 * @param {string} videoId
 */
function openTipVideo(videoId) {
  // TODO: integrate with a video player modal or YouTube embed
  console.log('Open video:', videoId);
  alert('Видео: ' + videoId + '\n(Бодит тоглогчтой холбогдох боломжтой)');
}
