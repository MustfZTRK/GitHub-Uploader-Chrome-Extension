# GitHub Uploader — Chrome Extension

A Chrome extension that lets you upload files and entire folders to a new GitHub repository in one click — no Git, no terminal required.

> **TR:** Dosyalarınızı ve klasörlerinizi tek tıkla yeni bir GitHub reposuna yükleyin.

---

## Features

- � **File & folder selection** — pick individual files or an entire folder (preserves full directory structure)
- 🖱 **Drag & drop support** — drag files or folders directly onto the drop zone
- 📦 **Repo settings** — set project name, description, and visibility (Public / Private)
- 🔐 **Secure authentication** — uses a GitHub Personal Access Token stored locally in `chrome.storage.local`
- ⬆ **One-click upload** — creates the repo and uploads all files in a single action
- 🗂 **Folder structure preserved** — nested paths (e.g. `src/components/App.jsx`) are maintained exactly as-is on GitHub
- 🔗 **Instant repo link** — opens the new repository URL right after upload

---

## Installation

### 1. Create a Personal Access Token

1. Go to GitHub → **Settings** → **Developer Settings** → **Personal Access Tokens** → **Tokens (classic)**
2. Click **"Generate new token"**
3. Check the **`repo`** scope
4. Copy the generated token

### 2. Load the Extension in Chrome

1. Open `chrome://extensions` in Chrome
2. Enable **Developer mode** (top-right toggle)
3. Click **"Load unpacked"**
4. Select this folder (`Github Yükleyici`)

### 3. Usage

1. Click the extension icon in the Chrome toolbar
2. Paste your token and click **"Token Kaydet"** (Save Token)
3. Enter a project name and optional description
4. Choose **Public** or **Private**
5. Click **"📄 Dosya Seç"** to pick files, **"📁 Klasör Seç"** to pick a folder, or drag & drop
6. Click **"⬆ Yükle"** (Upload)

---

## Folder Upload Behavior

When a folder is selected, the root folder name is stripped and only the inner structure is uploaded:

```
Selected folder: myProject/
├── index.html          →  index.html
├── src/
│   ├── App.jsx         →  src/App.jsx
│   └── utils/
│       └── helper.ts   →  src/utils/helper.ts
└── package.json        →  package.json
```

Drag & drop uses the `FileSystemEntry` API and recursively reads all subdirectories — no depth limit.

---

## File Structure

```
Github Yükleyici/
├── manifest.json      # Chrome extension manifest (MV3)
├── popup.html         # Extension UI
├── popup.css          # Styles
├── popup.js           # Logic & GitHub API calls
├── background.js      # Service worker
└── icons/             # Extension icons
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

---

## Security

- Your token is stored only in `chrome.storage.local` (never sent anywhere except `api.github.com`)
- All API requests go exclusively to `https://api.github.com`
- No third-party services, no analytics, no external scripts

---

## Requirements

- Chrome 88+ (Manifest V3 + `webkitdirectory` + `FileSystemEntry` API)
- A GitHub account with a Personal Access Token (`repo` scope)
