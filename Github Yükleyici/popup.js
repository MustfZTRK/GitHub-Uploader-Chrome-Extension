// ─── i18n / Çeviri tablosu ────────────────────────────────────────────────────
const STRINGS = {
  tr: {
    // Genel
    labelToken:          'GitHub Personal Access Token',
    placeholderToken:    'ghp_xxxxxxxxxxxxxxxxxxxx',
    titleToggleToken:    'Göster/Gizle',
    linkCreateToken:     'Token oluştur →',
    hintRepoScope:       '(repo yetkisi gerekli)',
    btnSaveToken:        'Token Kaydet',

    labelRepoName:       'Proje Adı',
    placeholderRepoName: 'benim-projem',
    labelRepoDesc:       'Kısa Açıklama',
    placeholderRepoDesc: 'Proje hakkında tek satır açıklama...',
    labelReadme:         'Detaylı Açıklama',
    hintReadme:          '(README.md olarak eklenir)',
    placeholderReadme:   '## Proje Hakkında\n\nProjenizi buraya detaylıca anlatın...\nMarkdown desteklenir.',
    labelVisibility:     'Görünürlük',
    labelFiles:          'Dosyalar',
    dropText:            'Dosya veya klasörü buraya sürükle',
    btnPickFiles:        '📄 Dosya Seç',
    btnPickFolder:       '📁 Klasör Seç',
    btnUpload:           '⬆ Yükle',

    // Dinamik
    charCount:           (n) => n > 0 ? `${n.toLocaleString('tr')} karakter` : '0 karakter',
    fileSummary:         (f, d, size) => `${f} dosya${d > 0 ? `, ${d} klasör` : ''} — ${size}`,
    fileRemoveTitle:     'Kaldır',
    titlePin:            'Pencereyi sabitle',
    titleUnpin:          'Sabitlemeyi kaldır',

    // Durumlar
    statusTokenEmpty:    '⚠ Token boş olamaz',
    statusValidating:    'Doğrulanıyor...',
    statusTokenSaved:    '✓ Token kaydedildi ve doğrulandı',
    statusTokenLoaded:   '✓ Token yüklü',
    statusTokenInvalid:  '✗ Geçersiz token veya yetersiz yetki',
    statusGettingUser:   (u) => `👤 ${u} — Repo oluşturuluyor...`,
    statusCreatingReadme:'📝 README.md oluşturuluyor...',
    statusRepoCreated:   (n) => `📦 Repo oluşturuldu. ${n} dosya yükleniyor...`,
    statusRepoExisting:  (n) => `📂 Mevcut repo kullanılıyor. ${n} dosya yükleniyor...`,
    statusUploading:     (done, total, path) => `⬆ (${done}/${total}) ${path}`,
    statusSuccess:       (n) => `✓ ${n} dosya başarıyla yüklendi!`,
    statusError:         (msg) => `✗ Hata: ${msg}`,
    statusLoading:       'Yükleniyor...',

    // Hata mesajları
    errNoUser:           'Kullanıcı bilgisi alınamadı. Token geçerli mi?',
    errRepoNotFound:     (name) => `"${name}" reposu bulunamadı veya erişim yok.`,
    errFileUpload:       (path, msg) => `"${path}" yüklenemedi: ${msg}`,
    errRepoInvalid:      (detail) => `Repo adı geçersiz: ${detail}`,
    errRepoCreate:       'Repo oluşturulamadı',
  },

  en: {
    labelToken:          'GitHub Personal Access Token',
    placeholderToken:    'ghp_xxxxxxxxxxxxxxxxxxxx',
    titleToggleToken:    'Show/Hide',
    linkCreateToken:     'Create token →',
    hintRepoScope:       '(repo scope required)',
    btnSaveToken:        'Save Token',

    labelRepoName:       'Project Name',
    placeholderRepoName: 'my-project',
    labelRepoDesc:       'Short Description',
    placeholderRepoDesc: 'A brief one-line description...',
    labelReadme:         'Detailed Description',
    hintReadme:          '(added as README.md)',
    placeholderReadme:   '## About\n\nDescribe your project in detail here...\nMarkdown is supported.',
    labelVisibility:     'Visibility',
    labelFiles:          'Files',
    dropText:            'Drag and drop files or folders here',
    btnPickFiles:        '📄 Select Files',
    btnPickFolder:       '📁 Select Folder',
    btnUpload:           '⬆ Upload',

    charCount:           (n) => n > 0 ? `${n.toLocaleString('en')} chars` : '0 chars',
    fileSummary:         (f, d, size) => `${f} file${f !== 1 ? 's' : ''}${d > 0 ? `, ${d} folder${d !== 1 ? 's' : ''}` : ''} — ${size}`,
    fileRemoveTitle:     'Remove',
    titlePin:            'Pin window',
    titleUnpin:          'Unpin window',

    statusTokenEmpty:    '⚠ Token cannot be empty',
    statusValidating:    'Validating...',
    statusTokenSaved:    '✓ Token saved and verified',
    statusTokenLoaded:   '✓ Token loaded',
    statusTokenInvalid:  '✗ Invalid token or insufficient permissions',
    statusGettingUser:   (u) => `👤 ${u} — Creating repo...`,
    statusCreatingReadme:'📝 Creating README.md...',
    statusRepoCreated:   (n) => `📦 Repo created. Uploading ${n} file${n !== 1 ? 's' : ''}...`,
    statusRepoExisting:  (n) => `📂 Using existing repo. Uploading ${n} file${n !== 1 ? 's' : ''}...`,
    statusUploading:     (done, total, path) => `⬆ (${done}/${total}) ${path}`,
    statusSuccess:       (n) => `✓ ${n} file${n !== 1 ? 's' : ''} uploaded successfully!`,
    statusError:         (msg) => `✗ Error: ${msg}`,
    statusLoading:       'Uploading...',

    errNoUser:           'Could not retrieve user info. Is the token valid?',
    errRepoNotFound:     (name) => `Repo "${name}" not found or access denied.`,
    errFileUpload:       (path, msg) => `"${path}" could not be uploaded: ${msg}`,
    errRepoInvalid:      (detail) => `Invalid repo name: ${detail}`,
    errRepoCreate:       'Could not create repo',
  }
};

// Aktif dil
let currentLang = 'tr';

// Kısayol: aktif dildeki string'i al
function t(key, ...args) {
  const val = STRINGS[currentLang][key];
  return typeof val === 'function' ? val(...args) : (val ?? key);
}

// ─── DOM References ──────────────────────────────────────────────────────────
const tokenInput      = document.getElementById('token');
const toggleTokenBtn  = document.getElementById('toggle-token');
const saveTokenBtn    = document.getElementById('save-token');
const tokenStatus     = document.getElementById('token-status');

const repoNameInput   = document.getElementById('repo-name');
const repoDescInput   = document.getElementById('repo-desc');
const repoReadmeInput = document.getElementById('repo-readme');
const readmeCharCount = document.getElementById('readme-char-count');
const dropZone        = document.getElementById('drop-zone');
const fileInput       = document.getElementById('file-input');
const folderInput     = document.getElementById('folder-input');
const pickFilesBtn    = document.getElementById('pick-files-btn');
const pickFolderBtn   = document.getElementById('pick-folder-btn');
const fileListEl      = document.getElementById('file-list');
const fileSummaryEl   = document.getElementById('file-summary');
const uploadBtn       = document.getElementById('upload-btn');
const uploadBtnText   = document.getElementById('upload-btn-text');
const uploadSpinner   = document.getElementById('upload-spinner');
const uploadStatus    = document.getElementById('upload-status');
const repoLinkEl      = document.getElementById('repo-link');
const pinBtn          = document.getElementById('pin-btn');
const langTrBtn       = document.getElementById('lang-tr');
const langEnBtn       = document.getElementById('lang-en');

// ─── Detached mod tespiti ─────────────────────────────────────────────────────
const isDetached = new URLSearchParams(window.location.search).get('mode') === 'detached';
if (isDetached) document.body.classList.add('detached-mode');

// ─── i18n: DOM'u güncelle ─────────────────────────────────────────────────────
function applyTranslations() {
  // data-i18n → textContent
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });

  // data-i18n-placeholder → placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // data-i18n-title → title
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.dataset.i18nTitle);
  });

  // Karakter sayacını yeniden render et
  const len = repoReadmeInput.value.length;
  readmeCharCount.textContent = t('charCount', len);

  // Pin butonu title'ı
  renderPinBtn();

  // Dosya listesi yeniden render (remove butonlarının title'ı değişir)
  renderFileList();

  // html lang attribute
  document.documentElement.lang = currentLang;
}

// ─── Dil değiştirici ─────────────────────────────────────────────────────────
async function switchLang(lang) {
  currentLang = lang;
  await setStorage('gh_lang', lang);

  langTrBtn.classList.toggle('active', lang === 'tr');
  langEnBtn.classList.toggle('active', lang === 'en');

  applyTranslations();
}

langTrBtn.addEventListener('click', () => switchLang('tr'));
langEnBtn.addEventListener('click', () => switchLang('en'));

// ─── Pin (iğne) mantığı ───────────────────────────────────────────────────────
let isPinned = false;

async function initPin() {
  const saved = await getStorage('gh_pinned');
  isPinned = !!saved;
  renderPinBtn();
}

function renderPinBtn() {
  if (isPinned) {
    pinBtn.classList.add('pinned');
    pinBtn.title = t('titleUnpin');
  } else {
    pinBtn.classList.remove('pinned');
    pinBtn.title = t('titlePin');
  }
}

pinBtn.addEventListener('click', async () => {
  isPinned = !isPinned;
  await setStorage('gh_pinned', isPinned);
  renderPinBtn();

  if (isPinned && !isDetached) {
    chrome.runtime.sendMessage({ type: 'OPEN_DETACHED' });
    window.close();
  } else if (!isPinned && isDetached) {
    chrome.runtime.sendMessage({ type: 'CLOSE_DETACHED' });
  }
});

async function maybeRedirectToDetached() {
  if (isDetached) return;
  const saved = await getStorage('gh_pinned');
  if (saved) {
    chrome.runtime.sendMessage({ type: 'OPEN_DETACHED' });
    window.close();
  }
}

// ─── State ────────────────────────────────────────────────────────────────────
let selectedFiles = [];

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await maybeRedirectToDetached();

  // Kaydedilmiş dili yükle
  const savedLang = await getStorage('gh_lang');
  if (savedLang === 'en' || savedLang === 'tr') {
    currentLang = savedLang;
    langTrBtn.classList.toggle('active', currentLang === 'tr');
    langEnBtn.classList.toggle('active', currentLang === 'en');
  }

  await initPin();
  applyTranslations();

  const saved = await getStorage('gh_token');
  if (saved) {
    tokenInput.value = saved;
    setStatus(tokenStatus, t('statusTokenLoaded'), 'success');
  }
  updateUploadBtn();
});

// ─── Token: göster/gizle ──────────────────────────────────────────────────────
toggleTokenBtn.addEventListener('click', () => {
  if (tokenInput.type === 'password') {
    tokenInput.type = 'text';
    toggleTokenBtn.textContent = '🙈';
  } else {
    tokenInput.type = 'password';
    toggleTokenBtn.textContent = '👁';
  }
});

// ─── README karakter sayacı ───────────────────────────────────────────────────
repoReadmeInput.addEventListener('input', () => {
  const len = repoReadmeInput.value.length;
  readmeCharCount.textContent = t('charCount', len);
});

// ─── Token: kaydet ────────────────────────────────────────────────────────────
saveTokenBtn.addEventListener('click', async () => {
  const token = tokenInput.value.trim();
  if (!token) {
    setStatus(tokenStatus, t('statusTokenEmpty'), 'error');
    return;
  }
  setStatus(tokenStatus, t('statusValidating'), 'info');
  const valid = await validateToken(token);
  if (valid) {
    await setStorage('gh_token', token);
    setStatus(tokenStatus, t('statusTokenSaved'), 'success');
    updateUploadBtn();
  } else {
    setStatus(tokenStatus, t('statusTokenInvalid'), 'error');
  }
});

// ─── Dosya Seç butonu ─────────────────────────────────────────────────────────
pickFilesBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  const entries = Array.from(e.target.files).map(file => ({ file, path: file.name }));
  addEntries(entries);
  fileInput.value = '';
});

// ─── Klasör Seç butonu ────────────────────────────────────────────────────────
pickFolderBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  folderInput.click();
});

folderInput.addEventListener('change', (e) => {
  const entries = Array.from(e.target.files).map(file => ({
    file,
    path: stripRootFolder(file.webkitRelativePath)
  }));
  addEntries(entries);
  folderInput.value = '';
});

// ─── Sürükle-Bırak ───────────────────────────────────────────────────────────
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', (e) => {
  if (!dropZone.contains(e.relatedTarget)) dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', async (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  const items = Array.from(e.dataTransfer.items);
  const entries = [];
  const promises = items
    .filter(item => item.kind === 'file')
    .map(item => {
      const entry = item.webkitGetAsEntry();
      return entry ? traverseEntry(entry, '') : Promise.resolve([]);
    });
  const results = await Promise.all(promises);
  results.forEach(list => entries.push(...list));
  addEntries(entries);
});

repoNameInput.addEventListener('input', updateUploadBtn);
uploadBtn.addEventListener('click', uploadToGitHub);

// ─── Fonksiyonlar ─────────────────────────────────────────────────────────────

function traverseEntry(entry, basePath) {
  return new Promise((resolve) => {
    if (entry.isFile) {
      entry.file(
        (file) => resolve([{ file, path: basePath ? `${basePath}/${entry.name}` : entry.name }]),
        () => resolve([])
      );
    } else if (entry.isDirectory) {
      const reader = entry.createReader();
      const allEntries = [];
      const readAll = () => {
        reader.readEntries(async (batch) => {
          if (batch.length === 0) {
            const subPath = basePath ? `${basePath}/${entry.name}` : entry.name;
            const promises = allEntries.map(e => traverseEntry(e, subPath));
            const results = await Promise.all(promises);
            resolve(results.flat());
          } else {
            allEntries.push(...batch);
            readAll();
          }
        }, () => resolve([]));
      };
      readAll();
    } else {
      resolve([]);
    }
  });
}

function stripRootFolder(relativePath) {
  const parts = relativePath.split('/');
  return parts.length <= 1 ? relativePath : parts.slice(1).join('/');
}

function addEntries(entries) {
  entries.forEach(({ file, path }) => {
    const existing = selectedFiles.findIndex(f => f.path === path);
    if (existing === -1) selectedFiles.push({ file, path });
    else selectedFiles[existing] = { file, path };
  });
  renderFileList();
  updateUploadBtn();
}

function removeFile(index) {
  selectedFiles.splice(index, 1);
  renderFileList();
  updateUploadBtn();
}

function renderFileList() {
  fileListEl.innerHTML = '';

  if (selectedFiles.length === 0) {
    fileSummaryEl.classList.add('hidden');
    return;
  }

  const dirs = new Set();
  selectedFiles.forEach(({ path }) => {
    const parts = path.split('/');
    if (parts.length > 1) dirs.add(parts[0]);
  });

  const totalSize = selectedFiles.reduce((s, { file }) => s + file.size, 0);
  fileSummaryEl.textContent = t('fileSummary', selectedFiles.length, dirs.size, formatSize(totalSize));
  fileSummaryEl.classList.remove('hidden');

  const sorted = [...selectedFiles].sort((a, b) => a.path.localeCompare(b.path));
  sorted.forEach(({ file, path }) => {
    const origIndex = selectedFiles.findIndex(f => f.path === path);
    const parts = path.split('/');
    const fileName = parts[parts.length - 1];
    const dirPath = parts.length > 1 ? parts.slice(0, -1).join('/') + '/' : '';

    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `
      <span class="file-item-icon">${getFileIcon(fileName)}</span>
      <span class="file-item-name" title="${path}">
        ${dirPath ? `<span class="file-dir">${escapeHtml(dirPath)}</span>` : ''}
        <span class="file-basename">${escapeHtml(fileName)}</span>
      </span>
      <span class="file-item-size">${formatSize(file.size)}</span>
      <button class="file-remove" data-index="${origIndex}" title="${t('fileRemoveTitle')}">✕</button>
    `;
    fileListEl.appendChild(item);
  });

  document.querySelectorAll('.file-remove').forEach(btn => {
    btn.addEventListener('click', (e) => removeFile(parseInt(e.target.dataset.index)));
  });
}

function updateUploadBtn() {
  const hasToken = tokenInput.value.trim().length > 0;
  const hasName  = repoNameInput.value.trim().length > 0;
  const hasFiles = selectedFiles.length > 0;
  uploadBtn.disabled = !(hasToken && hasName && hasFiles);
}

async function uploadToGitHub() {
  const token     = tokenInput.value.trim();
  const repoName  = repoNameInput.value.trim()
                      .replace(/[^a-zA-Z0-9._-]+/g, '-')
                      .replace(/^-+|-+$/g, '');
  const repoDesc   = repoDescInput.value.trim();
  const readmeText = repoReadmeInput.value.trim();
  const isPrivate  = document.querySelector('input[name="visibility"]:checked').value === 'private';

  if (!token || !repoName || selectedFiles.length === 0) return;

  setLoading(true);
  setStatus(uploadStatus, '', '');
  repoLinkEl.classList.add('hidden');

  try {
    const user = await getGitHubUser(token);
    if (!user) throw new Error(t('errNoUser'));

    setStatus(uploadStatus, t('statusGettingUser', user.login), 'info');

    const repoData = await createRepo(token, repoName, repoDesc, isPrivate);
    let repoFullName, defaultBranch;

    if (repoData.success) {
      repoFullName  = repoData.full_name;
      defaultBranch = repoData.default_branch || 'main';

      if (readmeText) {
        setStatus(uploadStatus, t('statusCreatingReadme'), 'info');
        await updateReadme(token, repoFullName, readmeText, defaultBranch);
      }

      setStatus(uploadStatus, t('statusRepoCreated', selectedFiles.length), 'info');
    } else if (repoData.exists) {
      const existing = await getRepo(token, user.login, repoName);
      if (!existing) throw new Error(t('errRepoNotFound', repoName));
      repoFullName  = existing.full_name;
      defaultBranch = existing.default_branch || 'main';
      setStatus(uploadStatus, t('statusRepoExisting', selectedFiles.length), 'info');
    } else {
      throw new Error(repoData.message || t('errRepoCreate'));
    }

    let uploaded = 0;
    for (const { file, path } of selectedFiles) {
      const content = await readFileAsBase64(file);
      const encodedPath = path.split('/').map(encodeURIComponent).join('/');
      const result = await uploadFile(token, repoFullName, path, encodedPath, content, defaultBranch);
      if (!result.success) throw new Error(t('errFileUpload', path, result.message));
      uploaded++;
      setStatus(uploadStatus, t('statusUploading', uploaded, selectedFiles.length, path), 'info');
    }

    const repoUrl = `https://github.com/${repoFullName}`;
    setStatus(uploadStatus, t('statusSuccess', uploaded), 'success');
    repoLinkEl.innerHTML = `🔗 <a href="${repoUrl}" target="_blank">${repoUrl}</a>`;
    repoLinkEl.classList.remove('hidden');

    selectedFiles = [];
    renderFileList();
    repoNameInput.value = '';
    repoDescInput.value = '';
    repoReadmeInput.value = '';
    readmeCharCount.textContent = t('charCount', 0);
    document.querySelector('input[name="visibility"][value="public"]').checked = true;
    updateUploadBtn();

  } catch (err) {
    setStatus(uploadStatus, t('statusError', err.message), 'error');
  } finally {
    setLoading(false);
  }
}

// ─── GitHub API ───────────────────────────────────────────────────────────────

async function validateToken(token) {
  try {
    const res = await fetch('https://api.github.com/user', {
      headers: { Authorization: `token ${token}`, 'User-Agent': 'GH-Uploader-Extension' }
    });
    return res.status === 200;
  } catch { return false; }
}

async function getGitHubUser(token) {
  try {
    const res = await fetch('https://api.github.com/user', {
      headers: { Authorization: `token ${token}`, 'User-Agent': 'GH-Uploader-Extension' }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

async function updateReadme(token, repoFullName, content, branch) {
  try {
    let sha = null;
    const getRes = await fetch(
      `https://api.github.com/repos/${repoFullName}/contents/README.md`,
      { headers: { Authorization: `token ${token}`, 'User-Agent': 'GH-Uploader-Extension' } }
    );
    if (getRes.status === 200) {
      sha = (await getRes.json()).sha;
    }
    const body = {
      message: sha ? 'Update README.md' : 'Add README.md',
      content: btoa(unescape(encodeURIComponent(content))),
      branch
    };
    if (sha) body.sha = sha;
    await fetch(`https://api.github.com/repos/${repoFullName}/contents/README.md`, {
      method: 'PUT',
      headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'GH-Uploader-Extension' },
      body: JSON.stringify(body)
    });
  } catch { /* devam et */ }
}

async function getRepo(token, owner, name) {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
      headers: { Authorization: `token ${token}`, 'User-Agent': 'GH-Uploader-Extension' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return { full_name: data.full_name, default_branch: data.default_branch };
  } catch { return null; }
}

async function createRepo(token, name, description, isPrivate) {
  try {
    const res = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'GH-Uploader-Extension' },
      body: JSON.stringify({ name, description, private: isPrivate, auto_init: true })
    });
    const data = await res.json();
    if (res.status === 201) {
      return { success: true, full_name: data.full_name, default_branch: data.default_branch };
    } else if (res.status === 422) {
      const isNameTaken = Array.isArray(data.errors) &&
        data.errors.some(e => e.message && e.message.includes('already exists'));
      if (isNameTaken) return { success: false, exists: true };
      const detail = Array.isArray(data.errors) && data.errors[0]?.message
        ? data.errors[0].message : (data.message || 'HTTP 422');
      return { success: false, message: t('errRepoInvalid', detail) };
    } else {
      return { success: false, message: data.message || `HTTP ${res.status}` };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
}

async function uploadFile(token, repoFullName, displayPath, encodedPath, contentBase64, branch) {
  try {
    let sha = null;
    const getRes = await fetch(
      `https://api.github.com/repos/${repoFullName}/contents/${encodedPath}`,
      { headers: { Authorization: `token ${token}`, 'User-Agent': 'GH-Uploader-Extension' } }
    );
    if (getRes.status === 200) sha = (await getRes.json()).sha;

    const body = { message: `Add ${displayPath}`, content: contentBase64, branch };
    if (sha) body.sha = sha;

    const res = await fetch(`https://api.github.com/repos/${repoFullName}/contents/${encodedPath}`, {
      method: 'PUT',
      headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'GH-Uploader-Extension' },
      body: JSON.stringify(body)
    });
    if (res.status === 200 || res.status === 201) return { success: true };
    const data = await res.json();
    return { success: false, message: data.message || `HTTP ${res.status}` };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

// ─── Yardımcı Fonksiyonlar ────────────────────────────────────────────────────

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function setLoading(isLoading) {
  uploadBtn.disabled = isLoading;
  if (isLoading) {
    uploadBtnText.textContent = t('statusLoading');
    uploadSpinner.classList.remove('hidden');
  } else {
    uploadBtnText.textContent = t('btnUpload');
    uploadSpinner.classList.add('hidden');
    updateUploadBtn();
  }
}

function setStatus(el, message, type) {
  el.textContent = message;
  el.className = 'status-msg';
  if (type) el.classList.add(type);
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function getFileIcon(filename) {
  const ext = (filename.split('.').pop() || '').toLowerCase();
  const icons = {
    js: '🟨', ts: '🔷', jsx: '⚛', tsx: '⚛',
    html: '🌐', css: '🎨', scss: '🎨', less: '🎨',
    py: '🐍', java: '☕', cs: '💙', cpp: '⚙', c: '⚙', go: '🐹', rs: '🦀',
    json: '📋', xml: '📋', yaml: '📋', yml: '📋', toml: '📋',
    md: '📝', txt: '📄', pdf: '📕', env: '⚙',
    png: '🖼', jpg: '🖼', jpeg: '🖼', gif: '🖼', svg: '🖼', ico: '🖼', webp: '🖼',
    zip: '📦', rar: '📦', gz: '📦', tar: '📦',
    sh: '🖥', bat: '🖥', ps1: '🖥',
    vue: '💚', rb: '💎', php: '🐘', swift: '🍎', kt: '📱',
  };
  return icons[ext] || '📄';
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function getStorage(key) {
  return new Promise(resolve => chrome.storage.local.get(key, r => resolve(r[key] || null)));
}

function setStorage(key, value) {
  return new Promise(resolve => chrome.storage.local.set({ [key]: value }, resolve));
}
