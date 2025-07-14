

// --- State & DOM refs ---
let currentType = 'link';
let searchTerm   = '';
// popup.js
import { sampleData } from './data/data.js';  


const toggleButtons  = document.querySelectorAll('.toggle-btn');
const searchInput    = document.getElementById('searchInput');
const itemsContainer = document.getElementById('itemsContainer');
const toast          = document.getElementById('toast');

// --- Initialization ---
function init() {
  renderItems();
  setupEventListeners();
}
init();

// --- Event Listeners ---
function setupEventListeners() {
  toggleButtons.forEach(btn =>
    btn.addEventListener('click', () => setActiveType(btn.dataset.type))
  );

  searchInput.addEventListener('input', e => {
    searchTerm = e.target.value;
    renderItems();
  });

  itemsContainer.addEventListener('click', e => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    copyToClipboard(btn.dataset.content);
  });
}

// --- Helpers ---
function setActiveType(type) {
  currentType = type;
  toggleButtons.forEach(btn =>
    btn.classList.toggle('active', btn.dataset.type === type)
  );
  searchTerm = '';
  searchInput.value = '';
  renderItems();
}

function getFilteredItems() {
  return sampleData.filter(item =>
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
    const text   = isLink
      ? item.link
      : (item.link.length > 100 ? item.link.slice(0,100) + '…' : item.link);

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
      </div>`;
  }).join('');
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied!');
  } catch {
    showToast('Failed to copy');
  }
}

function showToast(msg) {
  toast.querySelector('span').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
