# Auto Wayback Machine Saver

A browser extension that automatically saves visited webpages to the Internet Archive's Wayback Machine.

## Features

-   **Auto Archive**: Automatically sends the URL of any visited page to the Wayback Machine
-   **Ignore List**: Avoids archiving sensitive/private websites
-   **Enable/Disable Toggle**: Quick switch to pause auto-archiving
-   **History Log**: Keeps track of archived pages with timestamps

## Installation

### Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store soon.

### Manual Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the extension directory
5. The extension should now be installed and active

## Usage

### Basic Usage

Once installed, the extension will automatically save visited webpages to the Wayback Machine. You don't need to do anything special - just browse the web as usual.

### Extension Popup

Click the extension icon in the toolbar to:

-   Enable or disable auto-archiving
-   View recently archived pages
-   Access the options page

### Options Page

Right-click the extension icon and select "Options" to:

-   Manage the ignore list (domains that won't be archived)
-   Clear your archive history

## Privacy & Security

The extension never archives:

-   Private pages (e.g., `localhost`, `chrome://`)
-   URLs with sensitive domains (e.g., `mail.google.com`, banking sites)
-   Any domain in your custom ignore list

All archive history is stored locally on your device.

## How It Works

The extension uses the Wayback Machine's Save Page Now API to archive web pages. When you visit a page, the extension sends a request to `https://web.archive.org/save/[URL]` to create a snapshot of the page.

The extension includes a default ignore list to prevent archiving of sensitive websites. You can customize this list in the options page.

## Development

### Project Structure

```
auto-wayback-machine-saver/
├── manifest.json       # Extension configuration
├── background.js       # Background service worker
├── storage.js          # Storage utility
├── popup/              # Popup UI
│   ├── popup.html
│   ├── popup.js
│   └── popup.css
├── options/            # Options page
│   ├── options.html
│   ├── options.js
│   └── options.css
└── icons/              # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Building

No build step is required for this extension. You can load it directly as an unpacked extension in Chrome.

### Testing

To test the extension:

1. Load the extension in Chrome as an unpacked extension
2. Visit various websites to test auto-archiving
3. Check the extension popup to see the archive history
4. Test the ignore list by adding domains and verifying they're not archived

## License

[MIT License](LICENSE)

## Acknowledgements

-   [Internet Archive](https://archive.org/) for providing the Wayback Machine service
-   [Wayback Machine API](https://archive.org/help/wayback_api.php) for the archiving functionality
