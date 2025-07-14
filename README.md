
## 📌 Quick Links & Prompts — Chrome Extension

A sleek, mobile-inspired Chrome Extension that helps you save, manage, and access frequently used **links**, **AI prompts**, and **todo tasks**—across devices.

Designed to look like an iPhone interface with dark mode, syncing, and smooth animations.

---

### 🚀 Features

* 🔗 **Store Important Links** — Save and copy frequently visited URLs.
* ✍️ **Manage AI Prompts** — Store and reuse your favorite ChatGPT prompts.
* 📝 **ToDo List (API Integrated)** — Connects to your personal backend for CRUD operations.
* 🔁 **Sync Across Devices** — Uses `chrome.storage.sync` and `chrome.storage.local`.
* 🎨 **Dark Mode + iOS UI** — Toggle light/dark mode, with iPhone-style rounded design.
* 📅 **Live Date/Time Notch** — Real-time clock bar styled like a mobile phone notch.
* 🔒 **No Login or Backend Required** — Everything stored in Chrome sync/local.

---

### 📂 Folder Structure

```
Quick-links/
├── icons/                # Extension icons (16px, 48px, 128px)
├── public/
│   └── data1.json        # Sample JSON data (optional fallback)
├── data/
│   └── data.js           # Default sample data if no sync/local data found
├── popup.js              # Main frontend logic (CRUD, sync, modals)
├── index.html            # Extension popup UI
├── styles.css            # Mobile-inspired styles (light/dark theme)
├── manifest.json         # Chrome extension manifest
├── README.md             # You're reading it
```

---

### 🧠 Technologies Used

* **JavaScript (ES6+)**
* **Chrome Extension APIs**

  * `chrome.storage.sync` and `chrome.storage.local`
* **HTML5 + CSS3**
* **Mobile-first Design (iOS/Apple-inspired)**
* Optional: Connects to your custom ToDo **backend API** (CRUD)

---

### 🛠️ Installation

1. **Clone this repository**:

```bash
git clone https://github.com/its-kundan/quick-links.git
```

2. **Go to `chrome://extensions/`** in your browser.

3. **Enable Developer Mode** (top right).

4. **Click “Load unpacked”** and select the cloned folder.

5. ✅ You’re done! Click the extension icon to use it.

---

### 💡 Customization

* **Edit `data/data.js`** to change default links/prompts.
* **Set up ToDo API**: Update `popup.js` with your API endpoints.
* **Change icon colors** in `styles.css`.
* Default dark mode can be enabled in `popup.js` with:

```js
document.documentElement.classList.add('darkmode');
```

---

### 🎯 Roadmap Ideas

* [ ] Bookmark folders/categories
* [ ] Shareable QR cards
* [ ] Quick keyboard shortcut popup
* [ ] AI prompt templates & tags

---

### 🔗 LinkedIn Integration

You can add your LinkedIn profile by updating this snippet in `index.html`:

```html
<a href="https://linkedin.com/in/your-username" target="_blank">
  <!-- LinkedIn Icon SVG -->
</a>
```

---

### 📸 Screenshots

> You can upload screenshots or GIFs showing light/dark modes, ToDo feature, and mobile UI in action.

---

### 🙌 Credits

* Design inspired by iOS (Apple mobile UI)
* Icons from [Heroicons](https://heroicons.com/)
* Thanks to Chrome's Extension APIs

---

### 📄 License

MIT License — free to use, modify, and share.

