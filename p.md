

# 📝 Product Requirements Document (PRD)

## 📌 Product Name
**Auto Wayback Machine Saver**

---

## 🧠 Purpose

The purpose of this extension is to **automatically save visited webpages to the Wayback Machine**, ensuring users have a permanent archived copy of the pages they view. This can be helpful for personal archiving, citation, fact-checking, or monitoring content changes over time.

---

## 🎯 Goals

- Automatically detect and archive newly visited web pages.
- Ensure minimal user interaction — runs quietly in the background.
- Allow basic control via extension popup: enable/disable, view history.
- Avoid archiving sensitive/private/internal websites.

---

## 🧑‍💻 Target Users

- Journalists and researchers
- Legal professionals
- Academics
- Digital archivists
- Privacy-conscious users
- Anyone who wants to keep permanent snapshots of the web

---

## 🔧 Features

### ✅ MVP Features
| Feature                             | Description |
|------------------------------------|-------------|
| **Auto Archive on Page Load**      | Automatically sends the URL of any visited page to the Wayback Machine. |
| **Archive via API**                | Uses `https://web.archive.org/save/<URL>` to trigger snapshot saves. |
| **Ignore List (Basic)**            | Avoid archiving specific domains (e.g., Gmail, banking sites). |
| **Enable/Disable Toggle**          | Quick switch to pause auto-archiving from extension popup. |
| **History Log (Local)**            | Save archive links locally (e.g., in `chrome.storage`) with timestamps. |

---

### 🚀 Future Features (Post-MVP)
| Feature                             | Description |
|------------------------------------|-------------|
| **Domain Whitelist/Blacklist UI**  | Users can customize which domains to include/exclude. |
| **Notification System**            | Shows a small notification when a page is archived. |
| **Rate Limit Handling**            | Queue or throttle saves to avoid rate limits. |
| **Export Log (CSV/JSON)**          | Users can download saved archive URLs and timestamps. |
| **User-defined Save Delay**        | Set a delay after page load before triggering the save (useful for dynamic content). |
| **Per-Tab Control**                | Option to archive only in specific tabs/windows. |

---

## 🖼️ UX/UI

### Extension Popup UI
- 🔘 Toggle switch: Enable/disable auto-archive
- 📋 List of recently archived pages
- ⚙️ Settings link (to open options page)

### Options Page UI (Basic)
- ✅ List of domains to exclude
- ➕ Add new domains to exclusion list
- 🧹 Clear saved archive history

---

## 🏗️ Technical Requirements

- **Platform:** Chrome (Manifest V3), optionally Firefox (Manifest V2/3)
- **Languages:** JavaScript, HTML, CSS
- **Permissions Needed:**
  - `tabs`: Read URL of current tab
  - `storage`: Save archive history and settings
  - `scripting`: Inject content if needed
- **API Used:**
  - Wayback Machine Save API: `https://web.archive.org/save/<url>`

---

## 🔐 Privacy & Security

- Never archive:
  - Private pages (e.g., `localhost`, `chrome://`)
  - URLs with sensitive domains (e.g., `mail.google.com`, banking sites)
- Store archive history **locally only**, unless cloud sync is added with consent.

---

## 🧪 Testing Plan

| Test Case | Expected Outcome |
|-----------|------------------|
| Visit a public page | Archived successfully |
| Visit a blacklisted domain | Not archived |
| Toggle auto-save off | No archiving occurs |
| View history | List of archived URLs appears correctly |

---

## 📅 Timeline (MVP)
| Task | Duration |
|------|----------|
| Setup Manifest & Boilerplate | 1 day |
| Auto-save on page visit | 1 day |
| Enable/disable toggle | 1 day |
| History log | 1–2 days |
| Exclusion list | 1–2 days |
| UI polish and testing | 1 day |
| 🚀 Deployment to Chrome Web Store | 1 day |

---

## 📦 Deliverables

- `manifest.json` (Manifest V3)
- `background.js` (handles tab updates and archiving)
- `popup.html` + `popup.js` (toggle & recent archive list)
- `options.html` + `options.js` (domain exclusions)
- `storage.js` (utility to manage Chrome storage)
- README + Install instructions

---
