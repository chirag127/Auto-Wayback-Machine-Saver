# Installation Guide for Auto Wayback Machine Saver

This guide will help you install and set up the Auto Wayback Machine Saver extension in your browser.

## Prerequisites

- Google Chrome browser (version 88 or later)
- Basic knowledge of how to use Chrome extensions

## Installation Steps

### Method 1: Manual Installation (Developer Mode)

1. **Download the Extension**
   - Clone or download this repository to your local machine
   - Extract the ZIP file if you downloaded it as a ZIP

2. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Type `chrome://extensions/` in the address bar and press Enter
   - Or navigate to Menu (three dots) > More Tools > Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner of the extensions page

4. **Load the Extension**
   - Click the "Load unpacked" button that appears after enabling Developer mode
   - Browse to the folder where you extracted/cloned the extension
   - Select the folder and click "Open"

5. **Verify Installation**
   - The Auto Wayback Machine Saver extension should now appear in your extensions list
   - You should see the extension icon in your browser toolbar

### Method 2: Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store in the future. Once available, you can install it with just a few clicks:

1. Visit the Chrome Web Store page for Auto Wayback Machine Saver
2. Click the "Add to Chrome" button
3. Confirm the installation when prompted

## Post-Installation Setup

After installing the extension, you may want to configure it to suit your needs:

1. **Access the Options Page**
   - Right-click on the extension icon in the toolbar
   - Select "Options" from the context menu

2. **Configure the Ignore List**
   - The extension comes with a default list of domains that won't be archived
   - You can add or remove domains from this list in the Options page

3. **Test the Extension**
   - Open the included `test.html` file in your browser
   - Or visit any website and check if it's being archived

## Troubleshooting

If you encounter any issues during installation or use:

1. **Extension Not Working**
   - Make sure Developer mode is enabled
   - Try reloading the extension from the extensions page
   - Check the browser console for any error messages

2. **Pages Not Being Archived**
   - Verify that the extension is enabled (click the icon to check)
   - Check if the domain is in your ignore list
   - Some websites may block the Wayback Machine from archiving them

3. **Other Issues**
   - Check the GitHub repository for known issues
   - Submit a new issue if you encounter a bug

## Uninstalling

To remove the extension:

1. Go to `chrome://extensions/`
2. Find Auto Wayback Machine Saver in the list
3. Click the "Remove" button
4. Confirm the removal when prompted

## Privacy Note

Remember that the Auto Wayback Machine Saver sends URLs you visit to the Internet Archive's Wayback Machine for archiving. This is the core functionality of the extension, but it means that your browsing activity (except for domains in the ignore list) will be submitted to a third-party service.

If you have privacy concerns, consider:
- Adding sensitive domains to the ignore list
- Temporarily disabling the extension when needed
- Using the extension only in a dedicated browser profile
