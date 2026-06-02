// GitHub Uploader - Service Worker

chrome.runtime.onInstalled.addListener(() => {
  console.log('GitHub Uploader eklentisi yüklendi.');
});

// ─── Detached window yönetimi ─────────────────────────────────────────────────
// Mesaj: { type: 'OPEN_DETACHED' }  → bağımsız pencere aç (zaten açıksa öne getir)
// Mesaj: { type: 'CLOSE_DETACHED' } → bağımsız pencereyi kapat

let detachedWindowId = null;

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'OPEN_DETACHED') {
    openDetachedWindow().then(id => sendResponse({ windowId: id }));
    return true; // async
  }
  if (msg.type === 'CLOSE_DETACHED') {
    closeDetachedWindow().then(() => sendResponse({}));
    return true;
  }
});

// Detached pencere kapanınca kaydı temizle
chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === detachedWindowId) {
    detachedWindowId = null;
    // İğne durumunu da sıfırla
    chrome.storage.local.set({ gh_pinned: false });
  }
});

async function openDetachedWindow() {
  // Pencere hâlâ açıksa öne getir
  if (detachedWindowId !== null) {
    try {
      await chrome.windows.update(detachedWindowId, { focused: true });
      return detachedWindowId;
    } catch {
      detachedWindowId = null;
    }
  }

  const win = await chrome.windows.create({
    url: chrome.runtime.getURL('popup.html?mode=detached'),
    type: 'popup',
    width: 400,
    height: 660,
    focused: true
  });

  detachedWindowId = win.id;
  return detachedWindowId;
}

async function closeDetachedWindow() {
  if (detachedWindowId !== null) {
    try {
      await chrome.windows.remove(detachedWindowId);
    } catch { /* zaten kapanmış */ }
    detachedWindowId = null;
  }
}
