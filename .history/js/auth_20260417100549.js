/* =========================================================
   PARKIIIN — AUTH.JS
   Authentication-related UI and handlers.
   Extracted safely from main.js without logic changes.
   ========================================================= */

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

/* Auth page aliases */

/**
 * Switch between login form (#lf) and signup form (#sf).
 * @param {string} formId   'lf' | 'sf'
 * @param {HTMLElement} btn  The tab button that was clicked
 */
function authTab(formId, btn) {
  return authSwitchTab(formId, btn);
}

/* Auth page aliases continued */

/**
 * Switch the signup user-type sub-tab.
 * @param {string} type  'driver' | 'owner'
 * @param {HTMLElement} btn
 */
function userTypeTab(type, btn) {
  return authSwitchUserType(type, btn);
}

/* Auth page aliases continued */

/**
 * Toggle password visibility for a given input field.
 * @param {string} inputId  ID of the password input
 * @param {HTMLElement} btn  The eye button element
 */
function togglePassword(inputId, btn) {
  return authTogglePassword(inputId, btn);
}

/* Auth page aliases continued */

/**
 * Login form submit handler.
 * Replace the body with real auth logic (fetch, redirect, etc.).
 */
function handleLogin(e) {
  return authHandleLoginSubmit(e);
}

/**
 * Signup form submit handler.
 * Replace the body with real registration logic.
 */
function handleSignup(e) {
  return authHandleSignupSubmit(e);
}

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

/* ═══════════════════════════════════════════════════════════
   AUTH PAGE  (pages/login.html)
   ═══════════════════════════════════════════════════════════ */

/**
 * Toggle password field visibility and swap the eye SVG icon.
 * @param {string} fieldId
 * @param {HTMLElement} btn
 */
function authTogglePassword(fieldId, btn) {
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
function authSwitchTab(panelId, activeBtn) {
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
function authSwitchUserType(type, btn) {
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
  if (!digits) return _setFieldState(input, input.id + '-err', 'Утасны дугаар оруулна уу');
  if (digits.length < 8) return _setFieldState(input, input.id + '-err', 'Дугаар хэт богино');
  return _setFieldState(input, input.id + '-err', '');
}

/** Score password and update the strength meter. */
function onPasswordInput(input) {
  const val = input.value;
  const wrap = document.getElementById('pwStrengthWrap');
  if (!val) {
    if (wrap) wrap.style.display = 'none';
    return _setFieldState(input, input.id + '-err', '');
  }
  if (wrap) wrap.style.display = 'flex';

  let score = 0;
  if (val.length >= 8) score++;
  if (val.length >= 12) score++;
  if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
  if (/\d/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const levels = [
    { key: 'weak', lbl: 'Маш сул' },
    { key: 'weak', lbl: 'Сул' },
    { key: 'fair', lbl: 'Дунд' },
    { key: 'good', lbl: 'Хүчтэй' },
    { key: 'strong', lbl: 'Маш хүчтэй' },
  ];
  const lvl = levels[Math.min(score, 4)];
  const fill = document.getElementById('pwStrengthFill');
  const lbl = document.getElementById('pwStrengthLbl');
  if (fill) fill.className = 'pw-strength-fill pw-strength-fill--' + lvl.key;
  if (lbl) { lbl.className = 'pw-strength-lbl pw-strength-lbl--' + lvl.key; lbl.textContent = lvl.lbl; }

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
function authHandleLoginSubmit(e) {
  e.preventDefault();
  clearAuthError();

  const emailInput = document.getElementById('login-email');
  const pwInput = document.getElementById('login-password');
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
function authHandleSignupSubmit(e) {
  e.preventDefault();
  clearAuthError();

  const f = {
    lastname: document.getElementById('signup-lastname'),
    firstname: document.getElementById('signup-firstname'),
    phone: document.getElementById('signup-phone'),
    email: document.getElementById('signup-email'),
    password: document.getElementById('signup-password'),
    password2: document.getElementById('signup-password2'),
    terms: document.getElementById('terms-check'),
  };

  let ok = true;
  if (!validateField(f.lastname)) ok = false;
  if (!validateField(f.firstname)) ok = false;
  if (!validatePhone(f.phone)) ok = false;
  if (!validateEmail(f.email)) ok = false;

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
