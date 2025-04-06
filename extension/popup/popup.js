/**
 * Popup script for Auto Wayback Machine Saver
 */

import StorageUtils from "../storage.js";

// DOM elements
const enableToggle = document.getElementById("enableToggle");
const statusText = document.getElementById("statusText");
const historyList = document.getElementById("historyList");
const optionsBtn = document.getElementById("optionsBtn");

/**
 * Format a timestamp as a readable date string
 * @param {number} timestamp - The timestamp to format
 * @returns {string} - Formatted date string
 */
function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}

/**
 * Update the UI based on the current enabled state
 * @param {boolean} enabled - Whether auto-archiving is enabled
 */
function updateEnabledState(enabled) {
    enableToggle.checked = enabled;
    statusText.textContent = `Auto-archiving is ${
        enabled ? "enabled" : "disabled"
    }`;
}

/**
 * Render the archive history
 * @param {Array} history - The archive history
 */
function renderHistory(history) {
    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML =
            '<div class="empty-history">No archives yet</div>';
        return;
    }

    history.forEach((entry) => {
        const item = document.createElement("div");
        item.className = "history-item";

        const link = document.createElement("a");
        link.href = entry.archiveUrl;
        link.target = "_blank";
        link.textContent = entry.url;

        const timestamp = document.createElement("div");
        timestamp.className = "timestamp";
        timestamp.textContent = formatDate(entry.timestamp);

        item.appendChild(link);
        item.appendChild(timestamp);
        historyList.appendChild(item);
    });
}

/**
 * Initialize the popup
 */
async function initPopup() {
    try {
        // Get the current enabled state
        const enabled = await StorageUtils.isEnabled();
        updateEnabledState(enabled);

        // Get and render the history
        const history = await StorageUtils.getHistory();
        renderHistory(history);

        // Set up event listeners
        enableToggle.addEventListener("change", async () => {
            const newState = enableToggle.checked;
            await StorageUtils.setEnabled(newState);
            updateEnabledState(newState);
        });

        optionsBtn.addEventListener("click", () => {
            chrome.runtime.openOptionsPage();
        });
    } catch (error) {
        console.error("Error initializing popup:", error);
        historyList.innerHTML =
            '<div class="empty-history">Error loading data</div>';
    }
}

// Initialize the popup when the DOM is loaded
document.addEventListener("DOMContentLoaded", initPopup);
