// Quick Links CRUD with chrome.storage.sync & chrome.storage.local and duplicate warning

let currentType = 'link';
let searchTerm = '';
const STORAGE_KEY = 'quickLinksData';

const toggleButtons = document.querySelectorAll('.toggle-btn');
const searchInput = document.getElementById('searchInput');
const itemsContainer = document.getElementById('itemsContainer');
const toast = document.getElementById('toast');
const header = document.querySelector('.header');

let allItems = [];
let editIndex = null;

// --- Inject Add Button (if not already present) ---
if (!document.querySelector('.add-btn')) {
  header.insertAdjacentHTML('beforeend', `
    <button class="add-btn" title="Add New">
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke-width="2"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v8m-4-4h8"/>
      </svg>
    </button>
  `);
}

// --- Inject Modal HTML (if not already present) ---
if (!document.getElementById('itemModal')) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="modal" id="itemModal" style="display:none;">
      <div class="modal-content">
        <h2 id="modalTitle">Add Item</h2>
        <div id="modalWarning" style="color:#dc2626;font-size:13px;min-height:22px;margin-bottom:2px"></div>
        <input id="itemName" placeholder="Name" type="text" required />
        <input id="itemLink" placeholder="URL or Prompt" type="text" required />
        <select id="itemType">
          <option value="link">Link</option>
          <option value="prompt">Prompt</option>
        </select>
        <button id="saveItemBtn" type="button">Save</button>
        <button id="cancelItemBtn" type="button">Cancel</button>
      </div>
    </div>
  `);
}

// --- Initialization ---
init();

function init() {
  setupEventListeners();
  if (isChromeStorageAvailable()) {
    loadDataAndRender();
  } else {
    alert("chrome.storage is not available! Are you running as an extension?");
  }
}

function isChromeStorageAvailable() {
  return typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync && chrome.storage.local;
}

function setupEventListeners() {
  toggleButtons.forEach(btn =>
    btn.addEventListener('click', () => setActiveType(btn.dataset.type))
  );

  searchInput.addEventListener('input', e => {
    searchTerm = e.target.value;
    renderItems();
  });

  // Add button
  document.querySelector('.add-btn').onclick = () => openModal();

  // Delegate for Copy, Edit, Delete
  itemsContainer.addEventListener('click', e => {
    // Copy
    const copyBtn = e.target.closest('.copy-btn');
    if (copyBtn) {
      copyToClipboard(copyBtn.dataset.content);
      return;
    }
    // Edit
    const editBtn = e.target.closest('.edit-btn');
    if (editBtn) {
      const idx = Number(editBtn.dataset.idx);
      openModal(allItems[idx], idx);
      return;
    }
    // Delete
    const delBtn = e.target.closest('.delete-btn');
    if (delBtn) {
      const idx = Number(delBtn.dataset.idx);
      if (confirm("Delete this item?")) {
        allItems.splice(idx, 1);
        persistAndRender();
        showToast('Deleted');
      }
    }
  });
}

function setActiveType(type) {
  currentType = type;
  toggleButtons.forEach(btn =>
    btn.classList.toggle('active', btn.dataset.type === type)
  );
  searchTerm = '';
  searchInput.value = '';
  renderItems();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showToast(msg) {
  toast.querySelector('span').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied!');
  } catch {
    showToast('Failed to copy');
  }
}

function getFilteredItems() {
  return allItems.filter(item =>
    item.type === currentType &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

function renderItems() {
  const list = getFilteredItems();
  if (list.length === 0) {
    itemsContainer.innerHTML = `
      <div class="no-items">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586
                   a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <p>No items found</p>
      </div>`;
    return;
  }

  itemsContainer.innerHTML = list.map(item => {
    const isLink = item.type === 'link';
    const text = isLink
      ? item.link
      : (item.link.length > 100 ? item.link.slice(0, 100) + '…' : item.link);

    // Find index in allItems
    const idx = allItems.findIndex(i =>
      i.name === item.name && i.link === item.link && i.type === item.type
    );

    return `
      <div class="item-card">
        <div class="item-header">
          <h3 class="item-name">${escapeHtml(item.name)}</h3>
          <button class="copy-btn" data-content="${escapeHtml(item.link)}">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2
                       m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            Copy
          </button>
        </div>
        <p class="item-content">${escapeHtml(text)}</p>
        <div class="crud-btns">
          <button class="edit-btn" data-idx="${idx}" title="Edit">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 13v6h6M16 7l-1.5-1.5"/>
            </svg>
          </button>
          <button class="delete-btn" data-idx="${idx}" title="Delete">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>`;
  }).join('');
}

// --- Modal Logic ---
function openModal(item = null, idx = null) {
  document.getElementById('itemModal').style.display = 'flex';
  document.getElementById('modalTitle').textContent = idx !== null ? 'Edit Item' : 'Add Item';
  document.getElementById('itemName').value = item ? item.name : '';
  document.getElementById('itemLink').value = item ? item.link : '';
  document.getElementById('itemType').value = item ? item.type : currentType;
  document.getElementById('modalWarning').textContent = '';
  editIndex = idx;

  // Effect for Save/Cancel
  const saveBtn = document.getElementById('saveItemBtn');
  const cancelBtn = document.getElementById('cancelItemBtn');
  saveBtn.classList.remove('save-btn-effect');
  cancelBtn.classList.remove('cancel-btn-effect');

  saveBtn.onclick = function() {
    saveBtn.classList.add('save-btn-effect');
    setTimeout(() => saveBtn.classList.remove('save-btn-effect'), 1000);
    saveItem();
  };
  cancelBtn.onclick = function() {
    cancelBtn.classList.add('cancel-btn-effect');
    setTimeout(() => cancelBtn.classList.remove('cancel-btn-effect'), 1000);
    closeModal();
  };
}


function closeModal() {
  document.getElementById('itemModal').style.display = 'none';
  document.getElementById('modalWarning').textContent = '';
  editIndex = null;
}

// --- Duplicate check and save ---
function saveItem() {
  const name = document.getElementById('itemName').value.trim();
  const link = document.getElementById('itemLink').value.trim();
  const type = document.getElementById('itemType').value;
  const warningDiv = document.getElementById('modalWarning');
  warningDiv.textContent = '';

  if (!name || !link) {
    warningDiv.textContent = 'Name and Link/Prompt required';
    return;
  }

  // Check for duplicate (excluding current item if editing)
  const duplicate = allItems.some((item, idx) =>
    idx !== editIndex &&
    ((item.name === name && item.type === type) ||
     (item.link === link && item.type === type))
  );

  if (duplicate) {
    warningDiv.textContent = 'Data already exists!';
    return;
  }

  const item = { name, link, type };
  if (editIndex !== null) {
    allItems[editIndex] = item;
  } else {
    allItems.unshift(item);
  }
  persistAndRender();
  closeModal();
}

function persistAndRender() {
  if (isChromeStorageAvailable()) {
    chrome.storage.sync.set({ [STORAGE_KEY]: allItems });
    chrome.storage.local.set({ [STORAGE_KEY]: allItems });
  }
  renderItems();
}

// --- Load Data ---
function loadDataAndRender() {
  if (!isChromeStorageAvailable()) return;
  chrome.storage.sync.get([STORAGE_KEY], syncResult => {
    if (syncResult[STORAGE_KEY]) {
      allItems = syncResult[STORAGE_KEY];
      renderItems();
    } else {
      chrome.storage.local.get([STORAGE_KEY], localResult => {
        if (localResult[STORAGE_KEY]) {
          allItems = localResult[STORAGE_KEY];
        } else {
          import('./data/data.js').then(module => {
            allItems = module.sampleData;
            chrome.storage.local.set({ [STORAGE_KEY]: allItems });
            chrome.storage.sync.set({ [STORAGE_KEY]: allItems });
            renderItems();
          });
          return;
        }
        renderItems();
      });
    }
  });
}
