/* =========================================================
   PARKIIIN — PROFILE.JS
   Profile-page interactions extracted from main.js.
   ========================================================= */

/* ── PROFILE SUBPAGES ─────────────────────────────────── */

function showSub(name) {
  const profileMenu = document.getElementById('profileMenu');
  const sub = document.getElementById('sub-' + name);
  if (profileMenu) profileMenu.style.display = 'none';
  if (sub) sub.style.display = 'block';
}

function hideSub(name) {
  const profileMenu = document.getElementById('profileMenu');
  const sub = document.getElementById('sub-' + name);
  if (sub) sub.style.display = 'none';
  if (profileMenu) profileMenu.style.display = '';
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
