// ============================================================
//  SkinAI Auth Module — Supabase + Demo Mode
// ============================================================

const DEMO_KEY = 'skinai_demo_session';

function switchToDashboard() {
  const lv = document.getElementById('login-view');
  if (lv) lv.style.display = 'none';
  const dv = document.getElementById('dashboard-view');
  if (dv) dv.style.display = 'block';
  if (window.initDashboard) window.initDashboard();
}
window.switchToDashboard = switchToDashboard;
window.switchToLogin = switchToLogin;
window.continueAsDemo = continueAsDemo;
window.switchTab = switchTab;
window.togglePass = togglePass;

function switchToLogin() {
  const lv = document.getElementById('login-view');
  if (lv) lv.style.display = 'block';
  const dv = document.getElementById('dashboard-view');
  if (dv) dv.style.display = 'none';
}

// ---- Auto-redirect if already signed in ----
window.addEventListener('DOMContentLoaded', async () => {
  // Check real Supabase session
  try {
    const { data: { session } } = await window._supabase.auth.getSession();
    if (session) { switchToDashboard(); return; }
  } catch (e) { /* Supabase not configured yet — that's OK */ }

  // Check demo session
  if (localStorage.getItem(DEMO_KEY)) {
    switchToDashboard();
  } else {
    switchToLogin();
  }
});

// ---- Demo / Guest Login ----
function continueAsDemo() {
  const demoUser = {
    isDemo: true,
    name: 'Demo User',
    email: 'demo@skinai.com',
    mobile: '9999900000',
    role: 'Patient',
    loginTime: Date.now()
  };
  localStorage.setItem(DEMO_KEY, JSON.stringify(demoUser));
  switchToDashboard();
}

// ---- Tab Toggle ----
function switchTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  const indicator = document.getElementById('tabIndicator');

  if (tab === 'login') {
    loginForm.style.display = 'flex';
    registerForm.style.display = 'none';
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    indicator.classList.remove('right');
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    indicator.classList.add('right');
  }
}

// ---- Password Eye Toggle ----
function togglePass(id, btn) {
  const input = document.getElementById(id);
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>`;
  } else {
    input.type = 'password';
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>`;
  }
}

// ---- UI Helpers ----
function showError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.display = 'block';
  el.style.color = '';
  setTimeout(() => { el.style.display = 'none'; }, 6000);
}
function showSuccess(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.display = 'block';
  el.style.color = '#10b981';
}
function setLoading(btn, loading) {
  const text = btn.querySelector('.btn-text');
  const loader = btn.querySelector('.btn-loader');
  const arrow = btn.querySelector('.btn-arrow');
  if (loading) {
    if (text) text.style.display = 'none';
    if (loader) loader.style.display = 'flex';
    if (arrow) arrow.style.display = 'none';
    btn.disabled = true;
  } else {
    if (text) text.style.display = '';
    if (loader) loader.style.display = 'none';
    if (arrow) arrow.style.display = '';
    btn.disabled = false;
  }
}

// ---- Login ----
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const mobile = document.getElementById('loginMobile').value.trim().replace(/\D/g, '');
  const password = document.getElementById('loginPassword').value;
  const btn = document.getElementById('loginSubmitBtn');

  setLoading(btn, true);

  try {
    const { data, error } = await window._supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // Optional mobile check
    const storedMobile = ((data.user.user_metadata || {}).mobile || '').replace(/\D/g, '');
    if (storedMobile && mobile && !storedMobile.endsWith(mobile) && !mobile.endsWith(storedMobile)) {
      await window._supabase.auth.signOut();
      setLoading(btn, false);
      showError('loginError', '❌ Mobile number does not match. Please check and try again.');
      return;
    }
    switchToDashboard();
  } catch (err) {
    setLoading(btn, false);
    showError('loginError', '❌ ' + (err.message || 'Login failed. Please try again.'));
  }
}

// ---- Register ----
async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const mobile = document.getElementById('regMobile').value.trim().replace(/\D/g, '');
  const password = document.getElementById('regPassword').value;
  const btn = document.querySelector('#registerForm .submit-btn');

  if (password.length < 6) {
    showError('registerError', '❌ Password must be at least 6 characters.');
    return;
  }
  setLoading(btn, true);

  try {
    const { data, error } = await window._supabase.auth.signUp({
      email, password,
      options: { data: { name, mobile } }
    });
    if (error) throw error;

    if (data.session) {
      switchToDashboard();
    } else {
      setLoading(btn, false);
      showSuccess('registerError',
        '✅ Account created! Please check your email to confirm, then sign in.');
    }
  } catch (err) {
    setLoading(btn, false);
    showError('registerError', '❌ ' + (err.message || 'Registration failed. Please try again.'));
  }
}

window.handleLogin = handleLogin;
window.handleRegister = handleRegister;

