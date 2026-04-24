/* =========================================================
   PARKIIIN — TIPS.JS
   Tips-page interactions extracted from main.js.
   ========================================================= */

/* Tips page aliases */

function ttab(btn, showPanelId, hidePanelId) {
  return switchTipsTab(btn, showPanelId, hidePanelId);
}

/**
 * Filter tip articles by category.
 * Articles use data-cat attribute matching pill data-cat.
 * @param {HTMLElement} btn  The clicked pill button
 * @param {string} cat       Category key or 'all'
 */
function tipsCat(btn, cat) {
  return filterTipsByCategory(btn, cat);
}

/* ── TIPS PAGE ────────────────────────────────────────── */

/**
 * Switch between the Нийтлал (article) and Видео panels.
 * Extends the existing ttab() with content-panel show/hide.
 * @param {HTMLElement} btn   The clicked tab button
 * @param {'article'|'video'} type
 */
function tipsTabSwitch(btn, type) {
  switchTipsTab(btn); // reuse existing active-state logic

  const articlesSection = document.getElementById('tipsArticlesSection');
  const videosSection = document.getElementById('tipsVideosSection');

  if (articlesSection) articlesSection.style.display = type === 'article' ? '' : 'none';
  if (videosSection) videosSection.style.display = type === 'video' ? '' : 'none';

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
    const desc = card.querySelector('.article-desc')?.textContent.toLowerCase() ?? '';
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

/* ═══════════════════════════════════════════════════════════
   TIPS PAGE  (pages/tips.html)
   ═══════════════════════════════════════════════════════════ */

/**
 * Switch between Нийтлал (articles) and Видео (videos) panels.
 * @param {HTMLElement} btn       - the clicked tips-tab button
 * @param {string}      showId    - panel to show
 * @param {string}      hideId    - panel to hide
 */
function switchTipsTab(btn, showId, hideId) {
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
function filterTipsByCategory(btn, cat) {
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
    const desc = (card.querySelector('.tip-desc')?.textContent || '').toLowerCase();
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
