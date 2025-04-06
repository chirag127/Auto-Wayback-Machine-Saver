/**
 * Storage utility for the Auto Wayback Machine Saver extension
 * Handles saving and retrieving data from chrome.storage.local
 */

const StorageKeys = {
  ENABLED: 'enabled',
  HISTORY: 'history',
  IGNORE_LIST: 'ignoreList'
};

const StorageDefaults = {
  [StorageKeys.ENABLED]: true,
  [StorageKeys.HISTORY]: [],
  [StorageKeys.IGNORE_LIST]: [
    'localhost',
    '127.0.0.1',
    'chrome://',
    'chrome-extension://',
    'file://',
    'mail.google.com',
    'gmail.com',
    'online-banking',
    'bank',
    'account'
  ]
};

const StorageUtils = {
  /**
   * Get a value from storage
   * @param {string} key - The key to retrieve
   * @returns {Promise<any>} - The value from storage or the default value
   */
  async get(key) {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        resolve(result[key] !== undefined ? result[key] : StorageDefaults[key]);
      });
    });
  },

  /**
   * Set a value in storage
   * @param {string} key - The key to set
   * @param {any} value - The value to store
   * @returns {Promise<void>}
   */
  async set(key, value) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, resolve);
    });
  },

  /**
   * Check if auto-archiving is enabled
   * @returns {Promise<boolean>}
   */
  async isEnabled() {
    return this.get(StorageKeys.ENABLED);
  },

  /**
   * Enable or disable auto-archiving
   * @param {boolean} enabled - Whether auto-archiving should be enabled
   * @returns {Promise<void>}
   */
  async setEnabled(enabled) {
    return this.set(StorageKeys.ENABLED, enabled);
  },

  /**
   * Get the archive history
   * @returns {Promise<Array>} - Array of archived URLs with timestamps
   */
  async getHistory() {
    return this.get(StorageKeys.HISTORY);
  },

  /**
   * Add an entry to the archive history
   * @param {Object} entry - The entry to add
   * @param {string} entry.url - The URL that was archived
   * @param {string} entry.archiveUrl - The Wayback Machine URL
   * @param {number} entry.timestamp - When the URL was archived
   * @returns {Promise<void>}
   */
  async addToHistory(entry) {
    const history = await this.getHistory();
    history.unshift(entry); // Add to the beginning of the array
    
    // Limit history to 100 entries to prevent excessive storage usage
    if (history.length > 100) {
      history.pop(); // Remove the oldest entry
    }
    
    return this.set(StorageKeys.HISTORY, history);
  },

  /**
   * Clear the archive history
   * @returns {Promise<void>}
   */
  async clearHistory() {
    return this.set(StorageKeys.HISTORY, []);
  },

  /**
   * Get the ignore list
   * @returns {Promise<Array<string>>} - Array of domains/patterns to ignore
   */
  async getIgnoreList() {
    return this.get(StorageKeys.IGNORE_LIST);
  },

  /**
   * Add a domain to the ignore list
   * @param {string} domain - The domain to add
   * @returns {Promise<void>}
   */
  async addToIgnoreList(domain) {
    const ignoreList = await this.getIgnoreList();
    if (!ignoreList.includes(domain)) {
      ignoreList.push(domain);
      return this.set(StorageKeys.IGNORE_LIST, ignoreList);
    }
    return Promise.resolve();
  },

  /**
   * Remove a domain from the ignore list
   * @param {string} domain - The domain to remove
   * @returns {Promise<void>}
   */
  async removeFromIgnoreList(domain) {
    const ignoreList = await this.getIgnoreList();
    const index = ignoreList.indexOf(domain);
    if (index !== -1) {
      ignoreList.splice(index, 1);
      return this.set(StorageKeys.IGNORE_LIST, ignoreList);
    }
    return Promise.resolve();
  }
};

export default StorageUtils;
export { StorageKeys, StorageDefaults };
