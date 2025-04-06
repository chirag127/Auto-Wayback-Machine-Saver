/**
 * Background service worker for the Auto Wayback Machine Saver extension
 * Handles tab updates and archives URLs
 */

import StorageUtils from "../storage.js";

// Constants
const WAYBACK_SAVE_URL = "https://web.archive.org/save/";
const ARCHIVE_DELAY = 1000; // Wait 1 second after page load before archiving

/**
 * Check if a URL should be ignored based on the ignore list
 * @param {string} url - The URL to check
 * @param {Array<string>} ignoreList - List of domains/patterns to ignore
 * @returns {boolean} - True if the URL should be ignored
 */
function shouldIgnoreUrl(url, ignoreList) {
    // Don't archive chrome:// URLs, extension pages, or file:// URLs
    if (
        url.startsWith("chrome://") ||
        url.startsWith("chrome-extension://") ||
        url.startsWith("file://") ||
        url.startsWith("about:") ||
        url === "about:blank"
    ) {
        return true;
    }

    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname;

        // Check if the hostname or any part of the URL matches any pattern in the ignore list
        return ignoreList.some((pattern) => {
            return hostname.includes(pattern) || url.includes(pattern);
        });
    } catch (error) {
        console.error("Error parsing URL:", error);
        return true; // Ignore invalid URLs
    }
}

/**
 * Archive a URL using the Wayback Machine
 * @param {string} url - The URL to archive
 * @returns {Promise<string>} - The archive URL
 */
async function archiveUrl(url) {
    try {
        // Create a URL object to ensure the URL is properly encoded
        const encodedUrl = encodeURIComponent(url);
        const archiveRequestUrl = WAYBACK_SAVE_URL + encodedUrl;

        console.log(`Attempting to archive: ${url}`);

        // Use XMLHttpRequest instead of fetch to better handle redirects
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = async function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        // Success - the archive URL is the final URL after redirects
                        const archiveUrl =
                            xhr.responseURL ||
                            `https://web.archive.org/web/*/${url}`;

                        // Add to history
                        await StorageUtils.addToHistory({
                            url: url,
                            archiveUrl: archiveUrl,
                            timestamp: Date.now(),
                        });

                        console.log(
                            `Successfully archived: ${url} -> ${archiveUrl}`
                        );
                        resolve(archiveUrl);
                    } else {
                        // If we get a failure but can still create a valid archive URL
                        const fallbackArchiveUrl = `https://web.archive.org/web/*/${url}`;
                        console.warn(
                            `Archive request failed with status ${xhr.status}, using fallback URL: ${fallbackArchiveUrl}`
                        );

                        // Still add to history but mark as potentially failed
                        await StorageUtils.addToHistory({
                            url: url,
                            archiveUrl: fallbackArchiveUrl,
                            timestamp: Date.now(),
                            status: "failed",
                        });

                        resolve(fallbackArchiveUrl);
                    }
                }
            };

            xhr.onerror = function () {
                console.error("Network error occurred while archiving");
                reject(new Error("Network error occurred while archiving"));
            };

            xhr.open("GET", archiveRequestUrl, true);
            xhr.send();
        });
    } catch (error) {
        console.error("Error archiving URL:", error);
        throw error;
    }
}

/**
 * Handle tab updates
 * @param {number} _tabId - The ID of the updated tab (unused)
 * @param {Object} changeInfo - Information about the change
 * @param {Object} tab - The updated tab
 */
async function handleTabUpdate(_tabId, changeInfo, tab) {
    // Only proceed if the page has finished loading and has a URL
    if (changeInfo.status !== "complete" || !tab.url) {
        return;
    }

    try {
        // Check if auto-archiving is enabled
        const isEnabled = await StorageUtils.isEnabled();
        if (!isEnabled) {
            return;
        }

        // Get the ignore list
        const ignoreList = await StorageUtils.getIgnoreList();

        // Check if the URL should be ignored
        if (shouldIgnoreUrl(tab.url, ignoreList)) {
            console.log(`Ignoring URL: ${tab.url}`);
            return;
        }

        // Wait a bit before archiving to ensure the page is fully loaded
        setTimeout(async () => {
            try {
                await archiveUrl(tab.url);
            } catch (error) {
                console.error("Error in delayed archiving:", error);
            }
        }, ARCHIVE_DELAY);
    } catch (error) {
        console.error("Error in tab update handler:", error);
    }
}

// Listen for tab updates
chrome.tabs.onUpdated.addListener(handleTabUpdate);

// Initialize the extension
async function initialize() {
    console.log("Auto Wayback Machine Saver initialized");

    // Ensure default values are set in storage
    const isEnabled = await StorageUtils.isEnabled();
    console.log(`Auto-archiving is ${isEnabled ? "enabled" : "disabled"}`);

    const ignoreList = await StorageUtils.getIgnoreList();
    console.log(`Ignore list has ${ignoreList.length} entries`);
}

// Listen for messages from content scripts or test pages
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === "check-extension-status") {
        sendResponse({
            status: "active",
            version: chrome.runtime.getManifest().version,
        });
        return true; // Indicates we will send a response asynchronously
    }
});

// Initialize when the service worker starts
initialize();
