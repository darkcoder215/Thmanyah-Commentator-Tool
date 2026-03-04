/* ═══════════════════════════════════════════════════════════════════
   Thmanyah Commentator Analysis Tool — Application Logic
   ═══════════════════════════════════════════════════════════════════ */

// ── Configuration ──
const CONFIG = {
  apiKey: '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',
  model: 'google/gemini-2.5-pro',
  apiUrl: 'https://openrouter.ai/api/v1/chat/completions',
  maxFileSizeMB: 200,
  warnFileSizeMB: 50,
};

const FORMAT_MAP = {
  'audio/wav': 'wav', 'audio/wave': 'wav', 'audio/x-wav': 'wav',
  'audio/mp3': 'mp3', 'audio/mpeg': 'mp3',
  'audio/aac': 'aac', 'audio/ogg': 'ogg', 'audio/flac': 'flac',
  'audio/mp4': 'm4a', 'audio/x-m4a': 'm4a', 'audio/m4a': 'm4a',
  'audio/aiff': 'aiff', 'audio/x-aiff': 'aiff',
};

const ACCEPTED_EXTENSIONS = ['wav','mp3','ogg','flac','m4a','aac','aiff','mp4','webm'];

const CATEGORY_ICONS = {
  'الأداء الصوتي': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
  'اللغة والأسلوب': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  'التحليل التكتيكي': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  'تغطية الأحداث': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  'التوازن العاطفي': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  'التفاعل مع المشاهد': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  'المعرفة الرياضية': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  'الإبداع والتميز': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
};

// ── State ──
let state = {
  currentView: 'upload',
  file: null,
  report: null,
  abortController: null,
  timerInterval: null,
  timerSeconds: 0,
};

// ── Helpers ──
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function formatNum(n) {
  return String(n);
}

function getScoreColor(score) {
  if (score >= 85) return '#00C17A';
  if (score >= 70) return '#FFBC0A';
  if (score >= 50) return '#FF9172';
  return '#F24935';
}

function getScoreRating(score) {
  if (score >= 90) return 'ممتاز';
  if (score >= 80) return 'جيد جدًا';
  if (score >= 70) return 'جيد';
  if (score >= 60) return 'مقبول';
  return 'يحتاج تحسين';
}

function getScoreClass(score) {
  if (score >= 85) return 'score-excellent';
  if (score >= 70) return 'score-good';
  if (score >= 50) return 'score-average';
  return 'score-below-avg';
}

function getScoreBgStyle(score) {
  const color = getScoreColor(score);
  return `background: ${color}12; color: ${color};`;
}

function getMomentBadgeClass(type) {
  if (type === 'excellent' || type === 'positive') return 'badge-green';
  if (type === 'note' || type === 'neutral') return 'badge-amber';
  return 'badge-red';
}

function getMomentLabel(type) {
  if (type === 'excellent' || type === 'positive') return 'تعليق مميز';
  if (type === 'note' || type === 'neutral') return 'ملاحظة';
  return 'يحتاج تحسين';
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function getFileFormat(file) {
  if (FORMAT_MAP[file.type]) return FORMAT_MAP[file.type];
  const ext = file.name.split('.').pop().toLowerCase();
  if (ACCEPTED_EXTENSIONS.includes(ext)) return ext;
  return null;
}

// ── View Management ──
function showView(viewName) {
  state.currentView = viewName;
  $$('.view').forEach(v => v.classList.remove('view-active'));
  const target = $(`.view-${viewName}`);
  if (target) target.classList.add('view-active');

  // Update top bar
  const topBarActions = $('.top-bar-actions');
  const pageTitle = $('.page-title');
  if (viewName === 'upload') {
    pageTitle.textContent = 'تحليل جديد';
    topBarActions.style.display = 'none';
  } else if (viewName === 'loading') {
    pageTitle.textContent = 'جارٍ التحليل...';
    topBarActions.style.display = 'none';
  } else if (viewName === 'report') {
    pageTitle.textContent = 'تقرير تحليل الأداء';
    topBarActions.style.display = 'flex';
  }

  // Update nav items
  $$('.nav-item').forEach(item => {
    item.classList.remove('active', 'selected');
  });
  if (viewName === 'upload') {
    $$('.nav-item')[1].classList.add('active');
  } else if (viewName === 'report') {
    $$('.nav-item')[2].classList.add('active');
  } else {
    $$('.nav-item')[0].classList.add('active');
  }
}

// ── File Upload ──
function initUpload() {
  const dropZone = $('#dropZone');
  const fileInput = $('#fileInput');
  const browseBtn = $('#browseBtn');

  if (!dropZone || !fileInput) return;

  browseBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFile(e.target.files[0]);
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });

  dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
  });
}

function validateFile(file) {
  const format = getFileFormat(file);
  if (!format) {
    return { valid: false, error: 'صيغة الملف غير مدعومة', detail: `الصيغ المدعومة: ${ACCEPTED_EXTENSIONS.join(', ')}` };
  }
  const maxBytes = CONFIG.maxFileSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return { valid: false, error: 'حجم الملف كبير جدًا', detail: `الحد الأقصى ${CONFIG.maxFileSizeMB} ميغابايت. حجم ملفك: ${formatFileSize(file.size)}` };
  }
  return { valid: true };
}

function handleFile(file) {
  const validation = validateFile(file);
  if (!validation.valid) {
    showError(validation.error, validation.detail);
    return;
  }

  state.file = file;

  // Update file info display
  const fileInfo = $('#fileInfo');
  if (fileInfo) {
    fileInfo.innerHTML = `
      <div class="file-info-card">
        <div class="file-info-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
        </div>
        <div class="file-info-details">
          <span class="file-info-name">${file.name}</span>
          <span class="file-info-size">${formatFileSize(file.size)}</span>
        </div>
        <button class="file-info-remove" onclick="removeFile()" aria-label="إزالة">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `;
    fileInfo.style.display = 'block';
  }

  // Show analyze button
  const analyzeBtn = $('#analyzeBtn');
  if (analyzeBtn) {
    analyzeBtn.style.display = 'flex';
    analyzeBtn.onclick = () => startAnalysis();
  }
}

function removeFile() {
  state.file = null;
  const fileInfo = $('#fileInfo');
  const analyzeBtn = $('#analyzeBtn');
  const fileInput = $('#fileInput');
  if (fileInfo) { fileInfo.innerHTML = ''; fileInfo.style.display = 'none'; }
  if (analyzeBtn) analyzeBtn.style.display = 'none';
  if (fileInput) fileInput.value = '';
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('فشل في قراءة الملف'));
    reader.readAsDataURL(file);
  });
}

// ── Progress / Loading ──
function startTimer() {
  state.timerSeconds = 0;
  updateTimerDisplay();
  state.timerInterval = setInterval(() => {
    state.timerSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

function updateTimerDisplay() {
  const el = $('#loadingTimer');
  if (!el) return;
  const mins = Math.floor(state.timerSeconds / 60);
  const secs = state.timerSeconds % 60;
  el.textContent = `${formatNum(mins)}:${formatNum(String(secs).padStart(2, '0'))}`;
}

function updateProgress(step, total, message) {
  const stepsContainer = $('#loadingSteps');
  if (!stepsContainer) return;

  const steps = stepsContainer.querySelectorAll('.loading-step');
  steps.forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i < step - 1) s.classList.add('done');
    else if (i === step - 1) s.classList.add('active');
  });

  const msgEl = $('#loadingMessage');
  if (msgEl) msgEl.textContent = message;

  const progressFill = $('#loadingProgressFill');
  if (progressFill) {
    progressFill.style.width = `${(step / total) * 100}%`;
  }
}

// ── Analysis Flow ──
async function startAnalysis() {
  if (!state.file) return;

  showView('loading');
  startTimer();

  try {
    // Step 1: Encode file
    updateProgress(1, 4, 'جارٍ تجهيز الملف الصوتي...');
    const base64Audio = await fileToBase64(state.file);
    const format = getFileFormat(state.file);

    // Step 2: Send to API
    updateProgress(2, 4, 'جارٍ الإرسال إلى الذكاء الاصطناعي...');
    await sleep(500);

    // Step 3: Analyze
    updateProgress(3, 4, 'جارٍ تحليل التعليق وتقييم الأداء...');
    const result = await callAPI(base64Audio, format);

    // Step 4: Build report
    updateProgress(4, 4, 'جارٍ إنشاء التقرير...');
    await sleep(400);

    state.report = result;
    stopTimer();
    populateReport(result);
    showView('report');
    animateReport();

  } catch (err) {
    stopTimer();
    if (err.name === 'AbortError') {
      showView('upload');
      return;
    }
    showView('upload');
    showError('فشل في التحليل', err.message || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
  }
}

function cancelAnalysis() {
  if (state.abortController) {
    state.abortController.abort();
    state.abortController = null;
  }
  stopTimer();
  showView('upload');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── API Call ──
async function callAPI(base64Audio, format) {
  state.abortController = new AbortController();

  const prompt = buildAnalysisPrompt();

  const payload = {
    model: CONFIG.model,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          {
            type: 'input_audio',
            input_audio: {
              data: base64Audio,
              format: format,
            },
          },
        ],
      },
    ],
  };

  let response;
  let lastError;

  // Retry up to 3 times for network errors
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      response = await fetch(CONFIG.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CONFIG.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.href,
          'X-Title': 'Thmanyah Commentator Analysis Tool',
        },
        body: JSON.stringify(payload),
        signal: state.abortController.signal,
      });
      break;
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      lastError = err;
      if (attempt < 2) await sleep(2000 * Math.pow(2, attempt));
    }
  }

  if (!response) {
    throw new Error(lastError?.message || 'فشل الاتصال بالخادم. تأكد من اتصال الإنترنت وحاول مرة أخرى.');
  }

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const errMsg = errData?.error?.message || '';

    if (response.status === 401) {
      throw new Error('مفتاح API غير صالح. يرجى التحقق من المفتاح.');
    } else if (response.status === 429) {
      throw new Error('تم تجاوز حد الطلبات. يرجى الانتظار قليلًا ثم المحاولة مرة أخرى.');
    } else if (response.status === 413) {
      throw new Error('الملف الصوتي كبير جدًا. يرجى ضغطه أو اقتصاصه ثم المحاولة مرة أخرى.');
    } else {
      throw new Error(errMsg || `خطأ من الخادم (${response.status}). يرجى المحاولة لاحقًا.`);
    }
  }

  const data = await response.json();

  if (!data.choices || !data.choices[0]?.message?.content) {
    throw new Error('لم يتم استلام رد من النموذج. يرجى المحاولة مرة أخرى.');
  }

  const rawContent = data.choices[0].message.content;
  return parseApiResponse(rawContent);
}

function buildAnalysisPrompt() {
  return `أنت خبير متخصص في تقييم وتحليل أداء المعلقين الرياضيين في مباريات كرة القدم وفقًا لأعلى المعايير المهنية العالمية المعتمدة في التقييم الإعلامي الرياضي.

استمع بعناية شديدة إلى التسجيل الصوتي المرفق وقم بالمهام التالية:

1. حدد معلومات المباراة من سياق التعليق: اسما الفريقين، النتيجة، اسم البطولة والجولة، والتاريخ إن ذُكر.
2. حدد اسم المعلق والقناة الناقلة.
3. أنشئ نصًا كاملًا (تفريغ) للتعليق مع التوقيت الزمني الدقيق بالدقائق وتحديد هوية كل متحدث (معلق رئيسي، محلل، مراسل، إلخ).
4. قيّم الأداء عبر 8 محاور رئيسية، كل محور يحتوي على 4 معايير فرعية بدرجة من 0 إلى 100:

   المحور 1 — الأداء الصوتي: وضوح النطق والإلقاء، التنوع في طبقات الصوت، إيقاع وسرعة الكلام، إدارة فترات الصمت
   المحور 2 — اللغة والأسلوب: سلامة اللغة العربية، ثراء المفردات، البلاغة والتعبيرات، الأسلوب السردي
   المحور 3 — التحليل التكتيكي: قراءة التشكيلات والخطط، تفسير القرارات التكتيكية، دقة المعلومات والإحصائيات، الإعداد والتحضير المسبق
   المحور 4 — تغطية الأحداث: وصف اللعب لحظة بلحظة، تعليق الأهداف واللحظات الحاسمة، التزامن مع الصورة، تغطية الإعادات
   المحور 5 — التوازن العاطفي: الحياد وعدم الانحياز، التعامل مع قرارات الحكم، إدارة الانفعالات، الاحترافية في المواقف الصعبة
   المحور 6 — التفاعل مع المشاهد: بناء الإثارة والتشويق، إضافة قيمة معرفية، التواصل مع المحلل، الخاتمة والتلخيص
   المحور 7 — المعرفة الرياضية: معرفة تاريخ اللاعبين، الإلمام بسياق البطولة، المراجع التاريخية والمقارنات، معرفة القوانين واللوائح
   المحور 8 — الإبداع والتميز: أسلوب تعليق فريد، عبارات وتعبيرات لا تُنسى، القدرة على السرد القصصي، اتساق الهوية الشخصية

5. حدد أبرز اللحظات المحورية في التعليق مع التوقيت.
6. اذكر 3-5 نقاط قوة و2-4 مجالات تحتاج تحسين.
7. احسب الدرجة الكلية كمعدل مرجح لدرجات المحاور.
8. استخرج إحصائيات الأداء: عدد الكلمات التقريبي في الدقيقة، إجمالي الكلمات، نسبة الصمت، عدد المفردات الفريدة، نسبة التكرار، عدد الأخطاء المعلوماتية، عدد التفاعلات مع المحلل.
9. اقتبس 3-4 من أبرز العبارات المميزة التي قالها المعلق حرفيًا مع التوقيت.
10. قدّر مستوى الحماس التعليقي عبر المباراة كمصفوفة من 0-100 لكل 5 دقائق.

مهم جدًا: استخدم الأرقام الإنجليزية (0-9) وليس العربية. أعد جميع النتائج حصريًا بصيغة JSON صالحة (بدون أي نص قبلها أو بعدها، وبدون علامات markdown). استخدم الهيكل التالي بالضبط:

{
  "match_info": {"team_a": "...", "team_b": "...", "score": "X - X", "competition": "...", "date": "..."},
  "commentator": {"name": "...", "channel": "..."},
  "overall": {"score": 79, "rating": "جيد جدًا", "summary": "ملخص الأداء في 2-3 جمل"},
  "tags": ["وصف قصير 1", "وصف قصير 2", "وصف قصير 3"],
  "categories": [
    {"name": "الأداء الصوتي", "score": 85, "rating": "جيد جدًا", "criteria": [
      {"name": "وضوح النطق والإلقاء", "score": 88, "note": "ملاحظة تفصيلية"},
      {"name": "التنوع في طبقات الصوت", "score": 84, "note": "..."},
      {"name": "إيقاع وسرعة الكلام", "score": 82, "note": "..."},
      {"name": "إدارة فترات الصمت", "score": 80, "note": "..."}
    ]},
    {"name": "اللغة والأسلوب", "score": 82, "rating": "جيد جدًا", "criteria": [...]},
    {"name": "التحليل التكتيكي", "score": 71, "rating": "جيد", "criteria": [...]},
    {"name": "تغطية الأحداث", "score": 88, "rating": "ممتاز", "criteria": [...]},
    {"name": "التوازن العاطفي", "score": 65, "rating": "مقبول", "criteria": [...]},
    {"name": "التفاعل مع المشاهد", "score": 83, "rating": "جيد جدًا", "criteria": [...]},
    {"name": "المعرفة الرياضية", "score": 77, "rating": "جيد", "criteria": [...]},
    {"name": "الإبداع والتميز", "score": 80, "rating": "جيد جدًا", "criteria": [...]}
  ],
  "performance_stats": {
    "words_per_minute": 142,
    "total_words": 12847,
    "silence_percentage": 18,
    "unique_vocabulary": 1243,
    "repetition_rate": 7.2,
    "factual_errors": 2,
    "analyst_interactions": 14,
    "peak_excitement_count": 8
  },
  "notable_quotes": [
    {"time": "23'", "text": "اقتباس حرفي مميز من المعلق", "context": "سياق الاقتباس"},
    {"time": "67'", "text": "...", "context": "..."}
  ],
  "excitement_timeline": [60, 45, 70, 80, 55, 90, 40, 65, 75, 85, 95, 70, 80, 60, 50, 88, 92, 45],
  "key_moments": [
    {"time": "12'", "type": "excellent", "description": "وصف اللحظة"},
    {"time": "55'", "type": "note", "description": "..."},
    {"time": "78'", "type": "needs_improvement", "description": "..."}
  ],
  "strengths": ["نقطة قوة 1", "نقطة قوة 2", "نقطة قوة 3"],
  "improvements": ["مجال تحسين 1", "مجال تحسين 2"],
  "transcription": [
    {"time": "00:00", "speaker": "المعلق", "text": "نص الكلام"},
    {"time": "00:30", "speaker": "المحلل", "text": "نص الكلام"}
  ]
}`;
}

function parseApiResponse(rawContent) {
  let text = rawContent.trim();

  // Strip markdown code blocks if present
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  text = text.trim();

  // Try direct parse
  try {
    const parsed = JSON.parse(text);
    return validateReport(parsed);
  } catch (e) { /* continue */ }

  // Try extracting JSON object from text
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      return validateReport(parsed);
    } catch (e) { /* continue */ }
  }

  // Try fixing common issues: trailing commas
  try {
    const fixed = text.replace(/,\s*([}\]])/g, '$1');
    const parsed = JSON.parse(fixed);
    return validateReport(parsed);
  } catch (e) { /* continue */ }

  throw new Error('لم يتمكن النظام من تحليل استجابة النموذج. يرجى المحاولة مرة أخرى.\n\nالاستجابة الخام:\n' + text.substring(0, 500));
}

function validateReport(data) {
  // Ensure required fields exist with defaults
  const report = {
    match_info: {
      team_a: data.match_info?.team_a || 'غير محدد',
      team_b: data.match_info?.team_b || 'غير محدد',
      score: data.match_info?.score || 'غير محدد',
      competition: data.match_info?.competition || 'غير محدد',
      date: data.match_info?.date || 'غير محدد',
    },
    commentator: {
      name: data.commentator?.name || 'غير محدد',
      channel: data.commentator?.channel || 'غير محدد',
    },
    overall: {
      score: Math.min(100, Math.max(0, data.overall?.score ?? 50)),
      rating: data.overall?.rating || getScoreRating(data.overall?.score ?? 50),
      summary: data.overall?.summary || '',
    },
    tags: Array.isArray(data.tags) ? data.tags.slice(0, 4) : [],
    categories: [],
    key_moments: [],
    strengths: Array.isArray(data.strengths) ? data.strengths : [],
    improvements: Array.isArray(data.improvements) ? data.improvements : [],
    transcription: Array.isArray(data.transcription) ? data.transcription : [],
    performance_stats: data.performance_stats || null,
    notable_quotes: Array.isArray(data.notable_quotes) ? data.notable_quotes : [],
    excitement_timeline: Array.isArray(data.excitement_timeline) ? data.excitement_timeline : [],
  };

  // Validate categories
  if (Array.isArray(data.categories)) {
    report.categories = data.categories.map(cat => ({
      name: cat.name || 'غير محدد',
      score: Math.min(100, Math.max(0, cat.score ?? 50)),
      rating: cat.rating || getScoreRating(cat.score ?? 50),
      criteria: Array.isArray(cat.criteria) ? cat.criteria.map(cr => ({
        name: cr.name || '',
        score: Math.min(100, Math.max(0, cr.score ?? 50)),
        note: cr.note || '',
      })) : [],
    }));
  }

  // Validate key moments
  if (Array.isArray(data.key_moments)) {
    report.key_moments = data.key_moments.map(m => ({
      time: m.time || '',
      type: m.type || 'note',
      description: m.description || '',
    }));
  }

  return report;
}

// ── Report Population ──
function populateReport(data) {
  populateMatchBanner(data);
  populateOverallScore(data);
  populateCategoryCards(data);
  populatePerformanceStats(data);
  populateDetailedBreakdown(data);
  populateRadarChart(data);
  populateExcitementTimeline(data);
  populateNotableQuotes(data);
  populateTranscription(data);
  populateKeyMoments(data);
  populateStrengthsAndImprovements(data);
}

function populateMatchBanner(data) {
  const mi = data.match_info;
  const c = data.commentator;

  const el = (id) => document.getElementById(id);
  const setText = (id, text) => { const e = el(id); if (e) e.textContent = text; };

  setText('rTeamAName', mi.team_a);
  setText('rTeamBName', mi.team_b);
  setText('rMatchScore', mi.score);
  setText('rMatchLabel', mi.competition);
  setText('rMatchDate', mi.date);
  setText('rCommentatorName', c.name);
  setText('rCommentatorChannel', c.channel);

  // Team badge initials
  const badgeA = el('rTeamABadge');
  const badgeB = el('rTeamBBadge');
  if (badgeA) badgeA.textContent = mi.team_a.substring(0, 2);
  if (badgeB) badgeB.textContent = mi.team_b.substring(0, 2);

  // Commentator avatar
  const avatar = el('rCommentatorAvatar');
  if (avatar) avatar.textContent = c.name.charAt(0) || '؟';
}

function populateOverallScore(data) {
  const o = data.overall;
  const scoreNum = document.getElementById('rOverallScore');
  const summaryEl = document.getElementById('rOverallSummary');
  const tagsContainer = document.getElementById('rOverallTags');

  if (scoreNum) scoreNum.textContent = formatNum(o.score);
  if (summaryEl) {
    const ratingHtml = `<span class="highlight highlight-green">${o.rating}</span>`;
    summaryEl.innerHTML = `أداء ${ratingHtml} — ${o.summary}`;
  }

  if (tagsContainer && data.tags.length > 0) {
    const tagColors = ['tag-green', 'tag-amber', 'tag-blue', 'tag-green'];
    tagsContainer.innerHTML = data.tags.map((t, i) =>
      `<span class="tag ${tagColors[i % tagColors.length]}">${t}</span>`
    ).join('');
  }

  // Update ring color
  const ringFill = $('.score-ring-fill');
  if (ringFill) ringFill.setAttribute('stroke', getScoreColor(o.score));
}

function populateCategoryCards(data) {
  const container = document.getElementById('rCategoryCards');
  if (!container) return;
  container.innerHTML = '';

  data.categories.forEach(cat => {
    const color = getScoreColor(cat.score);
    const icon = CATEGORY_ICONS[cat.name] || CATEGORY_ICONS['الأداء الصوتي'];

    const card = document.createElement('div');
    card.className = 'card score-card';
    card.innerHTML = `
      <div class="score-card-header">
        <div class="score-card-icon" style="background: ${color}12; color: ${color};">
          ${icon}
        </div>
        <div class="score-card-value">
          <span class="score-card-number">${formatNum(cat.score)}</span>
          <span class="score-card-rating">${cat.rating}</span>
        </div>
      </div>
      <h3 class="score-card-title">${cat.name}</h3>
      <p class="score-card-desc">${cat.criteria.map(c => c.name).slice(0, 2).join('، ')}</p>
      <div class="mini-bar"><div class="mini-bar-fill" style="width:${cat.score}%; background:${color};"></div></div>
    `;
    container.appendChild(card);
  });
}

function populateDetailedBreakdown(data) {
  const container = document.getElementById('rCriteriaList');
  if (!container) return;
  container.innerHTML = '';

  data.categories.forEach(cat => {
    const dotColor = getScoreColor(cat.score);

    let groupHtml = `
      <div class="criteria-group">
        <h3 class="criteria-group-title">
          <span class="criteria-dot" style="background:${dotColor}"></span>
          ${cat.name}
        </h3>
    `;

    cat.criteria.forEach(cr => {
      const crColor = getScoreColor(cr.score);
      const crClass = getScoreClass(cr.score);
      groupHtml += `
        <div class="criteria-item">
          <div class="criteria-info">
            <span class="criteria-name">${cr.name}</span>
            <span class="criteria-score ${crClass}">${formatNum(cr.score)}</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${cr.score}%; background:${crColor};"></div></div>
          <p class="criteria-note">${cr.note}</p>
        </div>
      `;
    });

    groupHtml += '</div>';
    container.insertAdjacentHTML('beforeend', groupHtml);
  });
}

function populateTranscription(data) {
  const section = document.getElementById('rTranscriptionSection');
  const container = document.getElementById('rTranscriptionList');
  if (!section || !container) return;

  if (!data.transcription || data.transcription.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';
  container.innerHTML = '';

  const speakerColors = {};
  const colors = ['#00C17A', '#0072F9', '#FFBC0A', '#F24935', '#82003A'];
  let colorIdx = 0;

  data.transcription.forEach(entry => {
    if (!speakerColors[entry.speaker]) {
      speakerColors[entry.speaker] = colors[colorIdx % colors.length];
      colorIdx++;
    }
    const color = speakerColors[entry.speaker];

    const row = document.createElement('div');
    row.className = 'transcript-entry';
    row.innerHTML = `
      <span class="transcript-time">${entry.time}</span>
      <span class="transcript-speaker" style="background:${color}15; color:${color}; border: 1px solid ${color}30;">${entry.speaker}</span>
      <span class="transcript-text">${entry.text}</span>
    `;
    container.appendChild(row);
  });
}

function populateKeyMoments(data) {
  const container = document.getElementById('rMomentsList');
  if (!container) return;
  container.innerHTML = '';

  data.key_moments.forEach(m => {
    const badgeClass = getMomentBadgeClass(m.type);
    const label = m.label || getMomentLabel(m.type);

    const el = document.createElement('div');
    el.className = 'moment';
    el.innerHTML = `
      <div class="moment-time">${m.time}</div>
      <div class="moment-content">
        <div class="moment-badge ${badgeClass}">${label}</div>
        <p class="moment-text">${m.description}</p>
      </div>
    `;
    container.appendChild(el);
  });

  // Re-add the timeline lines (all but last)
  const moments = container.querySelectorAll('.moment');
  moments.forEach((m, i) => {
    if (i < moments.length - 1) m.classList.add('has-line');
  });
}

function populateStrengthsAndImprovements(data) {
  const strengthsList = document.getElementById('rStrengthsList');
  const improvementsList = document.getElementById('rImprovementsList');

  if (strengthsList) {
    strengthsList.innerHTML = data.strengths.map(s =>
      `<li><span class="strength-icon">&#10003;</span><span>${s}</span></li>`
    ).join('');
  }

  if (improvementsList) {
    improvementsList.innerHTML = data.improvements.map(s =>
      `<li><span class="improvement-icon">!</span><span>${s}</span></li>`
    ).join('');
  }
}

// ── New Sections: Stats, Radar, Excitement, Quotes ──
function populatePerformanceStats(data) {
  const container = document.getElementById('rPerformanceStats');
  if (!container || !data.performance_stats) { if (container) container.closest('.stats-section')?.remove(); return; }
  const s = data.performance_stats;
  const stats = [
    { label: 'كلمة / دقيقة', value: s.words_per_minute || '—', icon: 'speed' },
    { label: 'إجمالي الكلمات', value: s.total_words ? s.total_words.toLocaleString() : '—', icon: 'words' },
    { label: 'نسبة الصمت', value: s.silence_percentage != null ? s.silence_percentage + '%' : '—', icon: 'silence' },
    { label: 'مفردات فريدة', value: s.unique_vocabulary ? s.unique_vocabulary.toLocaleString() : '—', icon: 'vocab' },
    { label: 'نسبة التكرار', value: s.repetition_rate != null ? s.repetition_rate + '%' : '—', icon: 'repeat' },
    { label: 'أخطاء معلوماتية', value: s.factual_errors ?? '—', icon: 'errors' },
    { label: 'تفاعلات مع المحلل', value: s.analyst_interactions ?? '—', icon: 'interact' },
    { label: 'لحظات ذروة الحماس', value: s.peak_excitement_count ?? '—', icon: 'peak' },
  ];
  container.innerHTML = stats.map(st => `
    <div class="stat-card">
      <span class="stat-value" data-count="${parseFloat(String(st.value).replace(/[^0-9.]/g,'')) || 0}">${st.value}</span>
      <span class="stat-label">${st.label}</span>
    </div>
  `).join('');
}

function populateRadarChart(data) {
  const container = document.getElementById('rRadarChart');
  if (!container || !data.categories || data.categories.length < 6) return;
  const cats = data.categories;
  const n = cats.length;
  const cx = 150, cy = 150, maxR = 120;
  const angleStep = (2 * Math.PI) / n;

  // Build grid
  let gridSvg = '';
  [0.25, 0.5, 0.75, 1].forEach(scale => {
    let pts = [];
    for (let i = 0; i < n; i++) {
      const a = angleStep * i - Math.PI / 2;
      pts.push(`${cx + maxR * scale * Math.cos(a)},${cy + maxR * scale * Math.sin(a)}`);
    }
    gridSvg += `<polygon points="${pts.join(' ')}" fill="none" stroke="#EFEDE2" stroke-width="1"/>`;
  });
  // Axes
  for (let i = 0; i < n; i++) {
    const a = angleStep * i - Math.PI / 2;
    gridSvg += `<line x1="${cx}" y1="${cy}" x2="${cx + maxR * Math.cos(a)}" y2="${cy + maxR * Math.sin(a)}" stroke="#EFEDE2" stroke-width="1"/>`;
  }
  // Data polygon
  let dataPts = [];
  for (let i = 0; i < n; i++) {
    const a = angleStep * i - Math.PI / 2;
    const r = maxR * (cats[i].score / 100);
    dataPts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  const dataPolygon = `<polygon points="${dataPts.join(' ')}" fill="rgba(0,193,122,0.15)" stroke="#00C17A" stroke-width="2.5" class="radar-polygon"/>`;
  // Dots + labels
  let dotsSvg = '';
  for (let i = 0; i < n; i++) {
    const a = angleStep * i - Math.PI / 2;
    const r = maxR * (cats[i].score / 100);
    dotsSvg += `<circle cx="${cx + r * Math.cos(a)}" cy="${cy + r * Math.sin(a)}" r="4" fill="#00C17A"/>`;
    const lr = maxR + 22;
    const lx = cx + lr * Math.cos(a);
    const ly = cy + lr * Math.sin(a);
    dotsSvg += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" font-size="11" font-weight="700" fill="#333">${cats[i].name.split(' ')[0]}</text>`;
    dotsSvg += `<text x="${lx}" y="${ly + 14}" text-anchor="middle" dominant-baseline="middle" font-size="10" font-weight="600" fill="#00C17A">${cats[i].score}</text>`;
  }
  container.innerHTML = `<svg viewBox="0 0 300 300" class="radar-svg">${gridSvg}${dataPolygon}${dotsSvg}</svg>`;
}

function populateExcitementTimeline(data) {
  const container = document.getElementById('rExcitementBars');
  if (!container || !data.excitement_timeline || data.excitement_timeline.length === 0) {
    const section = document.getElementById('rExcitementSection');
    if (section) section.remove();
    return;
  }
  container.innerHTML = data.excitement_timeline.map((v, i) => {
    const color = v >= 85 ? '#00C17A' : v >= 70 ? '#FFBC0A' : v >= 50 ? '#FF9172' : '#F24935';
    const minutes = i * 5;
    return `<div class="excitement-bar" style="height:${v}%; background:${color};" title="${minutes}' — ${v}%"><span class="excitement-label">${minutes}'</span></div>`;
  }).join('');
}

function populateNotableQuotes(data) {
  const container = document.getElementById('rNotableQuotes');
  if (!container || !data.notable_quotes || data.notable_quotes.length === 0) {
    const section = document.getElementById('rQuotesSection');
    if (section) section.remove();
    return;
  }
  container.innerHTML = data.notable_quotes.map(q => `
    <div class="quote-card">
      <div class="quote-mark">"</div>
      <p class="quote-text">${q.text}</p>
      <div class="quote-meta">
        <span class="quote-time">${q.time}</span>
        <span class="quote-context">${q.context || ''}</span>
      </div>
    </div>
  `).join('');
}

// ── Animations ──
function animateReport() {
  // Animate score ring
  const ring = document.querySelector('.view-report .score-ring-fill');
  if (ring && state.report) {
    const total = 2 * Math.PI * 70;
    const score = state.report.overall.score;
    const target = total - (total * score / 100);

    ring.setAttribute('stroke-dashoffset', String(total));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ring.style.transition = 'stroke-dashoffset 1.5s ease-out';
        ring.style.strokeDashoffset = target;
      });
    });
  }

  // Animate progress bars
  document.querySelectorAll('.view-report .progress-fill, .view-report .mini-bar-fill').forEach(bar => {
    const w = bar.style.width;
    bar.style.width = '0%';
    bar.style.transition = 'width 1s ease-out';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { bar.style.width = w; });
    });
  });

  // Staggered card animations
  document.querySelectorAll('.view-report .score-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = `opacity 0.5s ease-out ${0.15 + i * 0.05}s, transform 0.5s ease-out ${0.15 + i * 0.05}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    });
  });
}

// ── PDF Export ──
async function exportPDF() {
  const exportBtn = document.getElementById('exportPdfBtn');
  if (exportBtn) {
    exportBtn.disabled = true;
    exportBtn.innerHTML = `
      <svg class="btn-icon spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
      <span>جارٍ التصدير...</span>
    `;
  }

  try {
    const reportEl = document.querySelector('.view-report .report-content');
    if (!reportEl) throw new Error('لا يوجد تقرير لتصديره');

    // Dynamically load html2pdf.js if not already loaded
    if (!window.html2pdf) {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js');
    }

    const commentatorName = state.report?.commentator?.name || 'تقرير';
    const filename = `تحليل-${commentatorName}-${new Date().toISOString().slice(0,10)}.pdf`;

    // Add print mode class for PDF-specific styling
    reportEl.classList.add('pdf-mode');

    await html2pdf().set({
      margin: [10, 10, 10, 10],
      filename: filename,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollY: 0,
        windowWidth: 900,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    }).from(reportEl).save();

    reportEl.classList.remove('pdf-mode');

  } catch (err) {
    showError('فشل تصدير PDF', err.message);
  } finally {
    if (exportBtn) {
      exportBtn.disabled = false;
      exportBtn.innerHTML = `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        <span>تصدير PDF</span>
      `;
    }
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error('فشل تحميل مكتبة التصدير'));
    document.head.appendChild(script);
  });
}

// ── Error Handling ──
function showError(title, message) {
  const modal = document.getElementById('errorModal');
  const titleEl = document.getElementById('errorTitle');
  const msgEl = document.getElementById('errorMessage');

  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = message;
  if (modal) modal.classList.add('visible');
}

function hideError() {
  const modal = document.getElementById('errorModal');
  if (modal) modal.classList.remove('visible');
}

// ── Transcription Toggle ──
function toggleTranscription() {
  const content = document.getElementById('rTranscriptionContent');
  const btn = document.getElementById('transcriptionToggle');
  if (!content) return;

  const isOpen = content.classList.toggle('expanded');
  if (btn) btn.textContent = isOpen ? 'إخفاء' : 'عرض الكل';
}

// ── New Analysis ──
function startNewAnalysis() {
  state.report = null;
  state.file = null;
  removeFile();
  showView('upload');
}

// ── Tab Filtering ──
function filterCriteria(filter) {
  const groups = document.querySelectorAll('#rCriteriaList .criteria-group');
  groups.forEach(group => {
    const items = group.querySelectorAll('.criteria-item');
    let visibleCount = 0;

    items.forEach(item => {
      const scoreEl = item.querySelector('.criteria-score');
      const score = parseInt(scoreEl?.textContent.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))) || 0;

      if (filter === 'all') {
        item.style.display = '';
        visibleCount++;
      } else if (filter === 'strengths' && score >= 85) {
        item.style.display = '';
        visibleCount++;
      } else if (filter === 'improvements' && score < 75) {
        item.style.display = '';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    group.style.display = visibleCount > 0 ? '' : 'none';
  });
}

// ── Initialization ──
document.addEventListener('DOMContentLoaded', () => {
  initUpload();
  showView('upload');

  // Sidebar toggle
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.addEventListener('click', () => {
      if (sidebar && sidebar.classList.contains('open')) sidebar.classList.remove('open');
    });
  }

  // Nav items
  document.querySelectorAll('.nav-item').forEach((item, idx) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      if (idx === 0) showView('upload');
      else if (idx === 1) { startNewAnalysis(); }
      else if (idx === 2 && state.report) showView('report');
      else if (idx === 2 && !state.report) showError('لا يوجد تقرير', 'قم بتحليل تسجيل صوتي أولًا لعرض التقرير.');
    });
  });

  // Tab switching
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab') && e.target.closest('.card-tabs')) {
      const tabs = e.target.closest('.card-tabs').querySelectorAll('.tab');
      tabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');

      const text = e.target.textContent.trim();
      if (text === 'جميع المعايير') filterCriteria('all');
      else if (text === 'نقاط القوة') filterCriteria('strengths');
      else if (text === 'يحتاج تحسين') filterCriteria('improvements');
    }
  });

  // Error modal close
  const errorClose = document.getElementById('errorClose');
  if (errorClose) errorClose.addEventListener('click', hideError);
  const errorModal = document.getElementById('errorModal');
  if (errorModal) errorModal.addEventListener('click', (e) => {
    if (e.target === errorModal) hideError();
  });
});
