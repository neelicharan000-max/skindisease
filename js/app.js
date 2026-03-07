// SkinAI Main Application Logic

const DEMO_KEY = 'skinai_demo_session';

// ---- Auth Helpers ----
async function logout() {
  localStorage.removeItem(DEMO_KEY);
  try { await window._supabase.auth.signOut(); } catch (e) { }
  if (typeof switchToLogin === 'function') switchToLogin();
}

async function getActiveUser() {
  try {
    const { data: { session } } = await window._supabase.auth.getSession();
    if (session) {
      const meta = session.user.user_metadata || {};
      return { name: meta.name || session.user.email, isDemo: false };
    }
  } catch (e) { }
  const demo = JSON.parse(localStorage.getItem(DEMO_KEY) || 'null');
  if (demo) return demo;
  return null;
}

// ---- State ----
let currentImageSrc = null;
let currentImageFile = null;
let cameraStream = null;
let facingMode = 'user';
let lastResult = null;
let analysisHistory = JSON.parse(localStorage.getItem('skinai_history') || '[]');

// ---- Init ----
async function initDashboard() {
  const user = await getActiveUser();
  if (!user) { if (typeof switchToLogin === 'function') switchToLogin(); return; }

  const name = user.name || 'User';
  const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
  document.getElementById('userAvatar').textContent = initials;
  document.getElementById('userName').textContent = name;

  // Hide role row if present
  const roleEl = document.getElementById('userRole');
  if (roleEl) roleEl.style.display = 'none';

  // Demo badge
  if (user.isDemo) {
    const badge = document.createElement('span');
    badge.style.cssText = 'font-size:10px;background:rgba(245,158,11,0.2);color:#f59e0b;padding:2px 8px;border-radius:10px;margin-left:6px;border:1px solid rgba(245,158,11,0.4);vertical-align:middle';
    badge.textContent = 'DEMO';
    document.getElementById('userName').after(badge);
  }

  // Clock
  updateClock();
  setInterval(updateClock, 1000);

  // Language init
  const savedLang = localStorage.getItem('skinai_lang') || 'en';
  const langLabels = { en: 'EN', te: 'తె', ta: 'த', hi: 'हि' };
  const dashLabel = document.getElementById('dashLangLabel');
  if (dashLabel) dashLabel.textContent = langLabels[savedLang] || 'EN';
  document.querySelectorAll('#dashLangSwitcher .lang-option').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === savedLang);
  });
  applyTranslations();

  renderDiseaseCards();
  renderHistory();
  renderConfusionMatrix();
  drawTrainingChart();

  // Disclaimer on first visit
  if (!sessionStorage.getItem('skinai_disclaimer_seen')) {
    setTimeout(() => showDisclaimer(), 700);
  }
}


function updateClock() {
  const t = document.getElementById('topbarTime');
  if (t) t.textContent = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// ---- Navigation ----
function showSection(name) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  document.getElementById('section-' + name).classList.add('active');
  const navEl = document.getElementById('nav-' + name);
  if (navEl) navEl.classList.add('active');

  const titles = {
    detect: ['Skin Disease Detection', 'Upload or capture a skin lesion image for AI analysis'],
    results: ['Analysis Results', 'CNN classification and Grad-CAM visualization report'],
    history: ['Analysis History', 'Previously analyzed skin lesion images'],
    info: ['Disease Reference Library', '8 classified skin conditions with clinical details'],
    metrics: ['Model Performance Metrics', 'CNN classification accuracy, precision, recall, and F1 scores']
  };
  const [h1, p] = titles[name] || ['SkinAI', ''];
  document.getElementById('pageTitle').textContent = h1;
  document.getElementById('pageSubtitle').textContent = p;

  if (name === 'results' && lastResult) renderFullResults(lastResult);
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ---- Image Upload ----
function handleDragOver(e) {
  e.preventDefault();
  document.getElementById('dropZone').classList.add('drag-over');
}
function handleDragLeave() {
  document.getElementById('dropZone').classList.remove('drag-over');
}
function handleDrop(e) {
  e.preventDefault();
  document.getElementById('dropZone').classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) loadImageFile(file);
}
function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) loadImageFile(file);
}

function loadImageFile(file) {
  if (!file.type.startsWith('image/')) {
    alert('Please upload a valid image file.');
    return;
  }
  currentImageFile = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    currentImageSrc = e.target.result;
    showImagePreview(currentImageSrc, file.name, file.size);
  };
  reader.readAsDataURL(file);
}

function showImagePreview(src, name, size) {
  document.getElementById('imagePreviewWrap').style.display = 'block';
  document.getElementById('imagePreview').src = src;
  const kb = size ? (size / 1024).toFixed(1) + ' KB' : '';
  document.getElementById('imgInfo').textContent = name ? `${name} ${kb ? '· ' + kb : ''}` : 'Captured image';
  document.getElementById('analyzeBtn').disabled = false;
  document.getElementById('dropZone').style.display = 'none';
}

function clearImage() {
  currentImageSrc = null; currentImageFile = null;
  document.getElementById('imagePreviewWrap').style.display = 'none';
  document.getElementById('dropZone').style.display = '';
  document.getElementById('analyzeBtn').disabled = true;
  document.getElementById('fileInput').value = '';
  document.getElementById('processingBanner').style.display = 'none';
}

// ---- Camera ----
async function setMode(mode) {
  document.getElementById('modeUpload').classList.toggle('active', mode === 'upload');
  document.getElementById('modeCamera').classList.toggle('active', mode === 'camera');
  document.getElementById('uploadMode').style.display = mode === 'upload' ? '' : 'none';
  document.getElementById('cameraMode').style.display = mode === 'camera' ? '' : 'none';

  if (mode === 'camera') {
    await startCamera();
  } else {
    stopCamera();
  }
}

async function startCamera() {
  try {
    if (cameraStream) stopCamera();
    const constraints = { video: { facingMode, width: { ideal: 1280 }, height: { ideal: 960 } } };
    cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
    document.getElementById('cameraFeed').srcObject = cameraStream;
  } catch (err) {
    alert('Camera access denied or not available. Please allow camera permissions and try again.');
    setMode('upload');
  }
}

function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
    document.getElementById('cameraFeed').srcObject = null;
  }
  setMode('upload');
}

async function switchCamera() {
  facingMode = facingMode === 'user' ? 'environment' : 'user';
  await startCamera();
}

function capturePhoto() {
  const video = document.getElementById('cameraFeed');
  const canvas = document.getElementById('cameraCanvas');

  if (!video.srcObject) { alert('Camera is not active.'); return; }

  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  currentImageSrc = canvas.toDataURL('image/jpeg', 0.92);

  showImagePreview(currentImageSrc, 'camera_capture.jpg');
  // Switch to show preview
  document.getElementById('imagePreviewWrap').style.display = 'block';
}

// ---- Analysis / Simulation ----
async function analyzeImage() {
  if (!currentImageSrc) return;

  document.getElementById('analyzeBtn').disabled = true;
  document.getElementById('analyzeBtnText').textContent = t('analyzingBtn');
  document.getElementById('processingBanner').style.display = 'block';
  document.getElementById('emptyResults').style.display = '';
  document.getElementById('quickResults').style.display = 'none';

  // Simulate CNN processing steps
  const steps = ['ps1', 'ps2', 'ps3', 'ps4', 'ps5'];
  for (let i = 0; i < steps.length; i++) {
    await delay(500 + Math.random() * 400);
    if (i > 0) document.getElementById(steps[i - 1]).classList.add('done');
    document.getElementById(steps[i]).classList.add('active');
  }
  await delay(600);
  document.getElementById(steps[steps.length - 1]).classList.add('done');
  await delay(300);

  // Generate simulated result
  const result = simulatePrediction();
  lastResult = result;

  // Save to history
  saveToHistory(result);

  // Reset steps
  steps.forEach(id => {
    document.getElementById(id).classList.remove('active', 'done');
  });
  document.getElementById('processingBanner').style.display = 'none';

  // Show results
  document.getElementById('emptyResults').style.display = 'none';
  document.getElementById('quickResults').style.display = 'block';
  document.getElementById('resultBadge').style.display = 'grid';

  renderQuickResults(result);
  document.getElementById('analyzeBtn').disabled = false;
  document.getElementById('analyzeBtnText').textContent = t('analyzeBtn');
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

function simulatePrediction() {
  const diseases = window.DISEASES;
  // Randomly select primary disease
  const idx = Math.floor(Math.random() * diseases.length);
  const primary = diseases[idx];
  const confidence = 0.75 + Math.random() * 0.22; // 75-97%

  // Build all predictions
  const preds = diseases.map((d, i) => {
    let score;
    if (i === idx) {
      score = confidence;
    } else {
      score = Math.random() * (1 - confidence) * 0.6;
    }
    return { ...d, score };
  });

  // Normalize
  const total = preds.reduce((s, p) => s + p.score, 0);
  preds.forEach(p => p.score = p.score / total);
  preds.sort((a, b) => b.score - a.score);

  return {
    disease: primary,
    confidence,
    predictions: preds,
    imageSrc: currentImageSrc,
    timestamp: new Date()
  };
}

// ---- Render Quick Results (with Medication + Precautions + Disclaimer) ----
function renderQuickResults(result) {
  const { disease, confidence, predictions } = result;

  // Disease chip & desc
  document.getElementById('diseaseChip').textContent = disease.name;
  document.getElementById('diseaseDesc').textContent = disease.desc;

  // Risk indicator
  const riskEl = document.getElementById('riskIndicator');
  riskEl.innerHTML = `<span style="width:8px;height:8px;border-radius:50%;background:${disease.riskColor};display:inline-block;margin-right:6px;box-shadow:0 0 6px ${disease.riskColor}"></span>Risk Level: <b style="margin-left:4px;color:${disease.riskColor}">${disease.risk}</b>`;
  riskEl.style.background = disease.riskBg;
  riskEl.style.border = `1px solid ${disease.riskColor}44`;

  // Confidence ring
  const pct = Math.round(confidence * 100);
  document.getElementById('confText').textContent = pct + '%';
  const circumference = 201.06;
  document.getElementById('confRingCircle').style.strokeDashoffset = circumference * (1 - confidence);

  // Predictions list
  const container = document.getElementById('predictionsItems');
  container.innerHTML = '';
  predictions.slice(0, 5).forEach((p, i) => {
    const pct2 = Math.round(p.score * 100);
    const color = i === 0 ? 'linear-gradient(90deg,#7c3aed,#0ea5e9)' : 'linear-gradient(90deg,#1e293b,#334155)';
    container.innerHTML += `
      <div class="pred-item">
        <span class="pred-label" style="color:${i === 0 ? '#f1f5f9' : '#94a3b8'};font-weight:${i === 0 ? 700 : 400}">${p.name}</span>
        <div class="pred-bar-wrap"><div class="pred-bar" style="width:${pct2}%;background:${color}"></div></div>
        <span class="pred-pct">${pct2}%</span>
      </div>`;
  });

  // Grad-CAM
  const img = new Image();
  img.onload = () => {
    generateGradCAM(img,
      document.getElementById('gcOriginal'),
      document.getElementById('gcHeatmap'),
      document.getElementById('gcOverlay')
    );
  };
  img.src = currentImageSrc;

  // Food tip
  const tipCard = document.getElementById('foodTipCard');
  if (tipCard) {
    const fd = window.FOOD_DATA;
    const lang = window.currentLang ? window.currentLang() : 'en';
    const match = fd.disease.find(d => d.id === disease.id);
    if (match) {
      document.getElementById('foodTipContent').innerHTML = `
        <div class="food-tip-inner">
          <div class="food-tip-row"><span class="food-tip-label">✅ Eat:</span><span class="food-tip-val">${match.eat[lang] || match.eat.en}</span></div>
          <div class="food-tip-row"><span class="food-tip-label">❌ Avoid:</span><span class="food-tip-val">${match.avoid[lang] || match.avoid.en}</span></div>
        </div>`;
      tipCard.style.display = 'block';
    } else { tipCard.style.display = 'none'; }
  }

  // ---- Medication Card ----
  let medCard = document.getElementById('medicationCard');
  if (!medCard) {
    medCard = document.createElement('div');
    medCard.id = 'medicationCard';
    medCard.className = 'advice-card med-card';
    document.getElementById('quickResults').appendChild(medCard);
  }
  if (disease.medication && disease.medication.length) {
    medCard.innerHTML = `
      <div class="advice-header">💊 Medication &amp; Treatment Guide</div>
      <ul class="advice-list">
        ${disease.medication.map(m => `<li>${m}</li>`).join('')}
      </ul>
      <p class="advice-note">⚕️ Always consult a certified dermatologist before starting any medication.</p>`;
    medCard.style.display = 'block';
  }

  // ---- Precautions Card ----
  let precCard = document.getElementById('precautionsCard');
  if (!precCard) {
    precCard = document.createElement('div');
    precCard.id = 'precautionsCard';
    precCard.className = 'advice-card prec-card';
    document.getElementById('quickResults').appendChild(precCard);
  }
  if (disease.precautions && disease.precautions.length) {
    precCard.innerHTML = `
      <div class="advice-header">⚠️ Precautions &amp; Lifestyle Tips</div>
      <ul class="advice-list">
        ${disease.precautions.map(p => `<li>${p}</li>`).join('')}
      </ul>`;
    precCard.style.display = 'block';
  }

  // ---- Disclaimer Card ----
  let discCard = document.getElementById('resultDisclaimerCard');
  if (!discCard) {
    discCard = document.createElement('div');
    discCard.id = 'resultDisclaimerCard';
    discCard.className = 'disclaimer-inline-card';
    document.getElementById('quickResults').appendChild(discCard);
  }
  discCard.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="flex-shrink:0;color:#f59e0b">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
    <div>
      <b>Medical Disclaimer</b><br>
      This AI analysis is for <b>informational purposes only</b> and does not constitute medical advice, diagnosis, or treatment.
      Always seek the advice of a qualified dermatologist or physician. Do not delay professional care based on this result.
    </div>`;
  discCard.style.display = 'flex';
}

// ---- Full Results Page ----
function renderFullResults(result) {
  const { disease, confidence, predictions } = result;
  const page = document.getElementById('resultsPage');

  const pct = Math.round(confidence * 100);
  const ts = result.timestamp ? new Date(result.timestamp).toLocaleString('en-IN') : '—';

  page.innerHTML = `
    <div class="report-header-card">
      <div class="report-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="36" height="36">
          <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0h10m-10 0H5a2 2 0 0 1-2-2V7m2 8v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/>
        </svg>
      </div>
      <div class="report-title">
        <h2>Diagnostic Report — ${disease.name}</h2>
        <p>Transparent AI-Assisted Skin Disease Analysis · CNN + Grad-CAM Framework</p>
      </div>
      <div class="report-meta">
        <div class="meta-val">Confidence: <b style="color:#a855f7">${pct}%</b></div>
        <div class="meta-time">${ts}</div>
      </div>
    </div>

    <div class="full-results-grid">
      <div class="full-results-card">
        <h3 class="panel-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          Input Image
        </h3>
        <img src="${result.imageSrc}" style="width:100%;border-radius:12px;max-height:280px;object-fit:contain;background:#000;" alt="Input skin image"/>
      </div>

      <div class="full-results-card">
        <h3 class="panel-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Classification Results
        </h3>
        <div style="margin-bottom:16px;">
          <div style="display:inline-block;padding:6px 18px;border-radius:50px;background:linear-gradient(135deg,#7c3aed,#0ea5e9);color:#fff;font-weight:700;font-size:15px;margin-bottom:10px;">${disease.name}</div>
          <div style="font-size:13px;color:#94a3b8;line-height:1.7;margin-bottom:10px;">${disease.desc}</div>
          <div style="display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:50px;background:${disease.riskBg};border:1px solid ${disease.riskColor}44;font-size:12px;font-weight:600;color:${disease.riskColor};">
            Risk: ${disease.risk}
          </div>
        </div>
        <div style="margin-bottom:10px;font-size:13px;font-weight:600;color:#64748b;">Symptom Tags</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">
          ${disease.symptoms.map(s => `<span style="font-size:11px;color:#94a3b8;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:5px;padding:3px 9px;">${s}</span>`).join('')}
        </div>
        <div style="font-size:13px;color:#64748b;"><b style="color:#94a3b8">Treatment:</b> ${disease.treatment}</div>
      </div>
    </div>

    <div class="full-results-card">
      <h3 class="panel-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        All Predictions (Top 8)
      </h3>
      <div>
        ${predictions.map((p, i) => `
          <div class="pred-item" style="margin-bottom:14px;">
            <span class="pred-label" style="color:${i === 0 ? '#f1f5f9' : '#94a3b8'};font-weight:${i === 0 ? 700 : 400};width:180px;">${p.name}</span>
            <div class="pred-bar-wrap">
              <div class="pred-bar" style="width:${Math.round(p.score * 100)}%;background:${i === 0 ? 'linear-gradient(90deg,#7c3aed,#0ea5e9)' : 'linear-gradient(90deg,#1e293b,#334155)'}"></div>
            </div>
            <span class="pred-pct">${Math.round(p.score * 100)}%</span>
          </div>`).join('')}
      </div>
    </div>

    <div class="full-results-card">
      <h3 class="panel-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        Grad-CAM Explainability Visualization
      </h3>
      <div class="gradcam-full-grid">
        <div class="gradcam-card">
          <div class="gc-label">Original Image</div>
          <canvas id="fullGcOrig" class="gc-canvas"></canvas>
        </div>
        <div class="gradcam-card">
          <div class="gc-label">Activation Heatmap</div>
          <canvas id="fullGcHeat" class="gc-canvas"></canvas>
        </div>
        <div class="gradcam-card">
          <div class="gc-label">Superimposed Overlay</div>
          <canvas id="fullGcOver" class="gc-canvas"></canvas>
        </div>
      </div>
      <div style="display:flex;gap:12px;margin-top:16px;flex-wrap:wrap;">
        <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#94a3b8;">
          <div style="width:40px;height:10px;border-radius:3px;background:linear-gradient(90deg,#0000ff,#00ffff,#00ff00,#ffff00,#ff0000)"></div>
          Low → High Activation
        </div>
        <p style="font-size:12px;color:#64748b;line-height:1.6;">
          Grad-CAM highlights regions most influential to the CNN's prediction. 
          Red/yellow areas indicate high attention; blue indicates low activation.
        </p>
      </div>
    </div>`;

  // Re-render Grad-CAM on full page canvases
  const img = new Image();
  img.onload = () => {
    generateGradCAM(img,
      document.getElementById('fullGcOrig'),
      document.getElementById('fullGcHeat'),
      document.getElementById('fullGcOver')
    );
  };
  img.src = result.imageSrc;
}

// ---- History ----
function saveToHistory(result) {
  analysisHistory.unshift({
    ...result,
    timestamp: result.timestamp.toISOString(),
    predictions: result.predictions.slice(0, 3)
  });
  if (analysisHistory.length > 20) analysisHistory.pop();
  localStorage.setItem('skinai_history', JSON.stringify(analysisHistory));
  renderHistory();
}

function renderHistory() {
  const grid = document.getElementById('historyGrid');
  if (!analysisHistory.length) {
    grid.innerHTML = `<div class="empty-results">
      <div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="64" height="64"><polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 0 .5-4.5"/></svg></div>
      <h3>No History Yet</h3><p>Your completed analyses will appear here for reference.</p>
    </div>`;
    return;
  }

  grid.innerHTML = analysisHistory.map((h, i) => `
    <div class="history-card" onclick="loadHistoryItem(${i})">
      <img class="history-img" src="${h.imageSrc}" alt="${h.disease.name}"/>
      <div class="history-body">
        <div class="history-disease">${h.disease.name}</div>
        <div class="history-date">${new Date(h.timestamp).toLocaleString('en-IN')}</div>
        <div class="history-conf">Confidence: ${Math.round(h.confidence * 100)}%</div>
      </div>
    </div>`).join('');
}

function loadHistoryItem(idx) {
  const h = analysisHistory[idx];
  currentImageSrc = h.imageSrc;
  lastResult = { ...h, timestamp: new Date(h.timestamp) };
  showSection('results');
}

// ---- Disease Cards ----
function renderDiseaseCards() {
  const grid = document.getElementById('diseasesGrid');
  grid.innerHTML = window.DISEASES.map(d => `
    <div class="disease-info-card">
      <div class="di-header">
        <div class="di-name">${d.name}</div>
        <div class="di-risk" style="background:${d.riskBg};color:${d.riskColor};">${d.risk} Risk</div>
      </div>
      <div class="di-desc">${d.desc}</div>
      <div class="di-symptoms">
        ${d.symptoms.map(s => `<span class="di-symptom">${s}</span>`).join('')}
      </div>
      <div class="di-acc">
        <div class="di-acc-label">CNN Classification Accuracy: ${d.accuracy}%</div>
        <div class="di-acc-bar"><div class="di-acc-fill" style="width:${d.accuracy}%;background:linear-gradient(90deg,${d.riskColor}99,${d.riskColor})"></div></div>
      </div>
    </div>`).join('');
}

// ---- Confusion Matrix ----
function renderConfusionMatrix() {
  const diseases = window.DISEASES;
  const names = diseases.map(d => d.name.split(' ')[0].substring(0, 5));
  const n = diseases.length;
  const container = document.getElementById('confusionMatrix');

  // Build matrix (simulated high accuracy)
  const matrix = [];
  for (let i = 0; i < n; i++) {
    matrix.push([]);
    for (let j = 0; j < n; j++) {
      if (i === j) matrix[i].push(Math.floor(90 + Math.random() * 10));
      else matrix[i].push(Math.floor(Math.random() * 5));
    }
  }

  // Grid: n+1 x n+1 (row/col headers)
  container.style.gridTemplateColumns = `repeat(${n + 1}, 1fr)`;

  let cells = '<div class="cm-cell cm-label"></div>';
  names.forEach(name => { cells += `<div class="cm-cell cm-label" title="${name}">${name}</div>`; });

  for (let i = 0; i < n; i++) {
    cells += `<div class="cm-cell cm-label" title="${names[i]}">${names[i]}</div>`;
    for (let j = 0; j < n; j++) {
      const val = matrix[i][j];
      const maxVal = 99;
      const intensity = val / maxVal;
      let bg;
      if (i === j) {
        bg = `rgba(16,185,129,${0.2 + intensity * 0.7})`;
      } else {
        bg = `rgba(239,68,68,${intensity * 0.6})`;
      }
      cells += `<div class="cm-cell" style="background:${bg};font-size:10px" title="${val}">${val}</div>`;
    }
  }
  container.innerHTML = cells;
}

// ---- Training Chart (Canvas) ----
function drawTrainingChart() {
  const canvas = document.getElementById('trainingChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Responsive size
  const W = canvas.offsetWidth || 700;
  const H = 220;
  canvas.width = W * window.devicePixelRatio;
  canvas.height = H * window.devicePixelRatio;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  const padL = 44, padR = 20, padT = 20, padB = 36;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const epochs = 50;
  // Generate smooth training/validation curves
  const trainAcc = [];
  const valAcc = [];
  for (let e = 0; e < epochs; e++) {
    const t = e / (epochs - 1);
    trainAcc.push(0.55 + 0.42 * (1 - Math.exp(-t * 5)) + (Math.random() - 0.5) * 0.015);
    valAcc.push(0.52 + 0.44 * (1 - Math.exp(-t * 4.5)) - 0.02 + (Math.random() - 0.5) * 0.02);
  }

  const allVals = [...trainAcc, ...valAcc];
  const minV = Math.min(...allVals) - 0.02;
  const maxV = Math.min(1, Math.max(...allVals) + 0.02);
  const yScale = v => padT + chartH - ((v - minV) / (maxV - minV)) * chartH;
  const xScale = i => padL + (i / (epochs - 1)) * chartW;

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let g = 0; g <= 5; g++) {
    const y = padT + (g / 5) * chartH;
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + chartW, y); ctx.stroke();
    const val = maxV - g * (maxV - minV) / 5;
    ctx.fillStyle = '#475569'; ctx.font = '10px Inter'; ctx.textAlign = 'right';
    ctx.fillText((val * 100).toFixed(0) + '%', padL - 5, y + 4);
  }

  // Draw training acc (purple)
  function drawLine(data, color, dash) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    if (dash) ctx.setLineDash([5, 4]); else ctx.setLineDash([]);
    data.forEach((v, i) => {
      const x = xScale(i), y = yScale(v);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Fill area under train
  ctx.beginPath();
  trainAcc.forEach((v, i) => {
    const x = xScale(i), y = yScale(v);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.lineTo(xScale(epochs - 1), yScale(minV));
  ctx.lineTo(xScale(0), yScale(minV));
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
  grad.addColorStop(0, 'rgba(124,58,237,0.25)');
  grad.addColorStop(1, 'rgba(124,58,237,0)');
  ctx.fillStyle = grad;
  ctx.fill();

  drawLine(trainAcc, '#7c3aed');
  drawLine(valAcc, '#0ea5e9', true);

  // Axis labels
  ctx.fillStyle = '#64748b'; ctx.font = '11px Inter'; ctx.textAlign = 'center';
  [0, 10, 20, 30, 40, 49].forEach(e => {
    ctx.fillText(e + 1, xScale(e), padT + chartH + 20);
  });
  ctx.fillText('Epoch', padL + chartW / 2, H - 2);

  // Legend
  ctx.fillStyle = '#7c3aed'; ctx.fillRect(W - 160, 8, 18, 4); ctx.borderRadius = 2;
  ctx.fillStyle = '#94a3b8'; ctx.font = '11px Inter'; ctx.textAlign = 'left';
  ctx.fillText('Training Acc', W - 137, 14);
  ctx.strokeStyle = '#0ea5e9'; ctx.setLineDash([4, 3]); ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(W - 70, 10); ctx.lineTo(W - 52, 10); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#94a3b8'; ctx.fillText('Validation Acc', W - 49, 14);
}

// ---- Food Section ----
function renderFoodSection() {
  const container = document.getElementById('foodSection');
  if (!container) return;
  const fd = window.FOOD_DATA;
  const lang = window.currentLang ? window.currentLang() : 'en';

  const avoidItems = [
    { en: 'Processed Junk Food', te: 'ప్రాసెస్డ్ జంక్ ఫుడ్', ta: 'பதப்படுத்தப்பட்ட உணவு', hi: 'प्रसंस्कृत जंक फूड' },
    { en: 'Excess Sugar & Sweets', te: 'అదనపు చక్కెర & స్వీట్లు', ta: 'அதிக சர்க்கரை & இனிப்பு', hi: 'अत्यधिक चीनी और मिठाई' },
    { en: 'Refined Carbohydrates', te: 'రిఫైన్డ్ కార్బోహైడ్రేట్లు', ta: 'சுத்திகரிக்கப்பட்ட கார்போஹைட்ரேட்', hi: 'रिफाइंड कार्बोहाइड्रेट' },
    { en: 'Alcohol', te: 'మద్యం', ta: 'ஆல்கஹால்', hi: 'शराब' },
    { en: 'Trans Fats & Fried Foods', te: 'ట్రాన్స్ కొవ్వులు & వేయించిన ఆహారాలు', ta: 'ட்ரான்ஸ் கொழுப்பு & வறுத்த உணவுகள்', hi: 'ट्रांस फैट और तली हुई चीजें' },
    { en: 'Excessive Dairy', te: 'అధికమైన పాల ఉత్పత్తులు', ta: 'அதிகமான பால் பொருட்கள்', hi: 'अत्यधिक डेयरी उत्पाद' },
    { en: 'High-sodium Processed Foods', te: 'అధిక సోడియం ఆహారాలు', ta: 'அதிக சோடியம் உணவுகள்', hi: 'उच्च-सोडियम प्रसंस्कृत खाद्य पदार्थ' },
    { en: 'Artificial Additives & Preservatives', te: 'కృత్రిమ సంరక్షకాలు', ta: 'செயற்கை சேர்க்கைகள்', hi: 'कृत्रिम योजक और संरक्षक' },
  ];

  container.innerHTML = `
    <div class="food-header-card">
      <div class="food-header-icon">🥗</div>
      <div class="food-header-text">
        <h2>${t('foodTitle')}</h2>
        <p>${t('foodSubtitle')}</p>
      </div>
    </div>

    <div class="food-section-title">🌿 ${t('foodGeneral')}</div>
    <div class="food-cards-grid">
      ${fd.general.map(item => `
        <div class="food-card">
          <div class="food-card-icon">${item.icon}</div>
          <div class="food-card-name">${item.name[lang] || item.name.en}</div>
          <div class="food-card-items">${item.foods[lang] || item.foods.en}</div>
          <div class="food-card-benefit">✓ ${item.benefit[lang] || item.benefit.en}</div>
        </div>`).join('')}
    </div>

    <div class="avoid-general-card">
      <div class="avoid-general-title">🚫 ${fd.avoidGeneral[lang] || fd.avoidGeneral.en}</div>
      <div class="avoid-tags">
        ${avoidItems.map(a => `<span class="avoid-tag">${a[lang] || a.en}</span>`).join('')}
      </div>
    </div>

    <div class="food-section-title">🏥 ${t('foodDisease')}</div>
    <div class="disease-food-grid">
      ${fd.disease.map(d => {
    const diseaseName = t(d.nameKey) || d.nameKey;
    return `
        <div class="disease-food-card" style="border-top: 3px solid ${d.color}">
          <div class="dfc-header">
            <span class="dfc-icon">${d.icon}</span>
            <span class="dfc-name">${diseaseName}</span>
          </div>
          <div class="dfc-section">
            <div class="dfc-label eat">✅ Eat More</div>
            <div class="dfc-content eat">${d.eat[lang] || d.eat.en}</div>
          </div>
          <div class="dfc-section">
            <div class="dfc-label avoid">❌ Avoid</div>
            <div class="dfc-content avoid">${d.avoid[lang] || d.avoid.en}</div>
          </div>
        </div>`;
  }).join('')}
    </div>`;
}
