/* =========================================================
   PARKIIIN — PARKING.JS
   Parking / find-park interactions extracted from main.js.
   ========================================================= */

/* ── FIND PARK MAP PAGE ───────────────────────────────── */

/**
 * Marker data table — maps markerId → detail card content.
 * Extend this object as new locations are added.
 */
const MARKER_DATA = {
  central: { emoji: '🏢', name: 'Central Tower Parking', loc: 'Сүхбаатар дүүрэг, УБ', price: '2,000₮', slots: '12 зогсоол', rating: '4.8' },
  shangri: { emoji: '🏬', name: 'Shangri-La Зогсоол', loc: 'Сүхбаатар дүүрэг, 1-р хороо', price: '5,000₮', slots: 'Нээлттэй', rating: '4.9' },
  cleanmax: { emoji: '🚿', name: 'CleanMax Auto Wash', loc: 'Сүхбаатар дүүрэг, 1.2км', price: '25,000₮', slots: 'Үйлчилгээ', rating: '4.8' },
  autodoc: { emoji: '🔧', name: 'Auto Doc Repair', loc: 'Баянзүрх дүүрэг, 1.2км', price: 'Тохиролцоно', slots: 'Засвар', rating: '4.9' },
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
    set('detailImg', data.emoji);
    set('detailName', data.name);
    set('detailLoc', `<svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true"
      style="fill:none;stroke:currentColor;stroke-width:2;display:inline;vertical-align:middle;margin-right:2px;">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/></svg>${data.loc}`, true);
    set('detailPrice', `${data.price}<span style="font-size:11px;font-weight:400;color:var(--text-muted);">/цаг</span>`, true);
    set('detailSlots', data.slots);
    set('detailRating', data.rating);
  }

  const card = document.getElementById('parkingDetailCard');
  if (card) { card.classList.add('show'); card.setAttribute('aria-hidden', 'false'); }
  document.getElementById('mapControls')?.classList.add('card-open');
}

/** Dismiss the detail card and deselect all markers. */
function dismissCard() {
  const card = document.getElementById('parkingDetailCard');
  if (card) { card.classList.remove('show'); card.setAttribute('aria-hidden', 'true'); }
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
  btn.style.transform = 'rotate(360deg)';
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
