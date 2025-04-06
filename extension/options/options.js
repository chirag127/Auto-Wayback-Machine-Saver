/**
 * Options page script for Auto Wayback Machine Saver
 */

import StorageUtils from "../storage.js";

// DOM elements
const newDomainInput = document.getElementById("newDomain");
const addDomainBtn = document.getElementById("addDomainBtn");
const ignoreList = document.getElementById("ignoreList");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

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
 * Render the ignore list
 * @param {Array<string>} domains - The list of domains to ignore
 */
function renderIgnoreList(domains) {
    ignoreList.innerHTML = "";

    if (domains.length === 0) {
        ignoreList.innerHTML =
            '<li class="empty-list">No domains in ignore list</li>';
        return;
    }

    domains.forEach((domain) => {
        const item = document.createElement("li");

        const domainText = document.createElement("span");
        domainText.textContent = domain;

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", async () => {
            await StorageUtils.removeFromIgnoreList(domain);
            const updatedList = await StorageUtils.getIgnoreList();
            renderIgnoreList(updatedList);
        });

        item.appendChild(domainText);
        item.appendChild(removeBtn);
        ignoreList.appendChild(item);
    });
}

/**
 * Render the archive history
 * @param {Array} history - The archive history
 */
function renderHistory(history) {
    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML = '<div class="empty-list">No archives yet</div>';
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
 * Initialize the options page
 */
async function initOptions() {
    try {
        // Get and render the ignore list
        const domains = await StorageUtils.getIgnoreList();
        renderIgnoreList(domains);

        // Get and render the history
        const history = await StorageUtils.getHistory();
        renderHistory(history);

        // Set up event listeners
        addDomainBtn.addEventListener("click", async () => {
            const domain = newDomainInput.value.trim();
            if (domain) {
                await StorageUtils.addToIgnoreList(domain);
                newDomainInput.value = "";
                const updatedList = await StorageUtils.getIgnoreList();
                renderIgnoreList(updatedList);
            }
        });

        newDomainInput.addEventListener("keypress", async (e) => {
            if (e.key === "Enter") {
                const domain = newDomainInput.value.trim();
                if (domain) {
                    await StorageUtils.addToIgnoreList(domain);
                    newDomainInput.value = "";
                    const updatedList = await StorageUtils.getIgnoreList();
                    renderIgnoreList(updatedList);
                }
            }
        });

        clearHistoryBtn.addEventListener("click", async () => {
            if (
                confirm("Are you sure you want to clear your archive history?")
            ) {
                await StorageUtils.clearHistory();
                const emptyHistory = await StorageUtils.getHistory();
                renderHistory(emptyHistory);
            }
        });
    } catch (error) {
        console.error("Error initializing options page:", error);
        ignoreList.innerHTML = '<li class="empty-list">Error loading data</li>';
        historyList.innerHTML =
            '<div class="empty-list">Error loading data</div>';
    }
}

// Initialize the options page when the DOM is loaded
document.addEventListener("DOMContentLoaded", initOptions);
