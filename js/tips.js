import { TipsArticles, TipsVideos } from './data/tipsData.js';

function renderArticles() {
  const container = document.getElementById('articlesList');
  if (!container) return;

  container.innerHTML = TipsArticles.map(article => `
    <div class="tip-article" data-cat="${article.cat}" data-id="${article.id}">
      <div class="tip-img" style="background:${article.gradient}">
        <svg viewBox="0 0 24 24" aria-hidden="true"
          style="width:28px;height:28px;stroke:white;fill:none;stroke-width:2;">
          <path d="${article.iconPath}" />
        </svg>
      </div>
      <div class="tip-body">
        <span class="tip-tag">${article.tag}</span>
        <div class="tip-title">${article.title}</div>
        <div class="tip-desc">${article.desc}</div>
        <div class="tip-read" onclick="openTipVideo('${article.id}')">Унших →</div>
      </div>
    </div>
  `).join('');
}

function renderVideos() {
  const list = document.getElementById('videosList');
  const featured = document.getElementById('featuredVideo');
  if (!list || !featured) return;

  const regular = TipsVideos.filter(v => !v.featured);
  const featuredItem = TipsVideos.find(v => v.featured);

  list.innerHTML = regular.map(v => `
    <div class="video-thumb" style="background:${v.gradient}" role="listitem" tabindex="0"
      aria-label="${v.label} видео тоглуулах" onclick="openTipVideo('${v.id}')">
      <div class="video-play" aria-hidden="true">▶</div>
      <div class="video-duration">${v.duration}</div>
      <div class="video-label">${v.label}</div>
    </div>
  `).join('');

  if (featuredItem) {
    featured.innerHTML = `
      <div class="video-thumb video-thumb--wide"
        style="background:${featuredItem.gradient};width:100%;height:160px;border-radius:16px;position:relative;"
        tabindex="0" aria-label="${featuredItem.label} видео тоглуулах"
        onclick="openTipVideo('${featuredItem.id}')">
        <div class="video-play" style="font-size:28px;" aria-hidden="true">▶</div>
        <div class="video-duration" style="font-size:13px;">${featuredItem.duration}</div>
        <div class="video-label" style="font-size:14px;font-weight:700;">${featuredItem.label}</div>
      </div>
    `;
  }
}

renderArticles();
renderVideos();
function ttab(btn, showPanelId, hidePanelId) {
  return switchTipsTab(btn, showPanelId, hidePanelId);
}

function tipsCat(btn, cat) {
  return filterTipsByCategory(btn, cat);
}
function tipsTabSwitch(btn, type) {
  switchTipsTab(btn); 

  const articlesSection = document.getElementById('tipsArticlesSection');
  const videosSection = document.getElementById('tipsVideosSection');

  if (articlesSection) articlesSection.style.display = type === 'article' ? '' : 'none';
  if (videosSection) videosSection.style.display = type === 'video' ? '' : 'none';

  
  document.querySelectorAll('.tips-tab').forEach(t => {
    t.setAttribute('aria-selected', t === btn ? 'true' : 'false');
  });
}

/**
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
 * @param {string} id
 */
function openArticle(id) {
  alert(`"${id}" нийтлэлийн дэлгэрэнгүй хуудас удахгүй нэмэгдэнэ.`);
}

/**
 * @param {string} id
 */
function openVideo(id) {
  // TODO: open video player modal
  alert(`"${id}" видео тоглуулагч удахгүй нэмэгдэнэ.`);
}


/**

 * @param {HTMLElement} btn  
 * @param {string} showId   
 * @param {string} hideId    
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
 * @param {string} videoId
 */
function openTipVideo(videoId) {
  console.log('Open video:', videoId);
  alert('Видео: ' + videoId + '\n(Бодит тоглогчтой холбогдох боломжтой)');
}
