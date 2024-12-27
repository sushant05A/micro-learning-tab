# Micro-Learning Tab

## Overview
Micro-Learning Tab is a Chrome extension that replaces the new tab page with bite-sized educational content, such as daily coding challenges from LeetCode, a digital clock, and a search bar for quick queries. Additionally, the extension provides customizable settings for a personalized experience.

---

## Features
- **Daily Coding Challenges:** Displays the daily challenge from LeetCode, including its title, difficulty, and acceptance rate.
- **Digital Clock:** A visually appealing clock showing the current time and date.
- **Search Bar:** Quickly search using Google directly from the new tab page.

---

## Installation
1. Clone or download the repository.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" (top-right corner).
4. Click "Load unpacked" and select the extension folder.
5. The extension is now installed and active.

---

## File Structure
```
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── styles.css
├── newtab.html
├── settings.html
├── newtab.js
├── settings.js
├── background.js
├── manifest.json
```
- **`icons/`**: Contains icons for the extension.
- **`styles.css`**: Styling for both the new tab page and settings page.
- **`newtab.html`**: The main new tab page.
- **`settings.html`**: The settings page for user preferences.
- **`newtab.js`**: Handles functionality for the new tab page.
- **`settings.js`**: Manages settings and Chrome storage.
- **`background.js`**: Background script to fetch data (e.g., daily challenges).
- **`manifest.json`**: Extension configuration and metadata.

---

## How to Use
### New Tab Page
- Open a new tab to view the daily coding challenge, clock, and search bar.
- Search directly using the search bar to get instant results on Google.

### Settings
- Right-click the extension icon and select "Options" to open the settings page.
- Modify preferences such as enabling dark mode, notifications, and setting the preferred challenge difficulty.
- Save changes or reset to default settings.

---

## Permissions
- **`storage`**: To save and retrieve user settings.
- **`host_permissions`**: Access `https://leetcode.com/*` to fetch daily challenges.

---

## Development
### Prerequisites
- Google Chrome or Chromium-based browser.
- Basic understanding of JavaScript, HTML, and CSS.

### Steps
1. Modify the code in the respective files as needed.
2. Reload the extension via `chrome://extensions/` after making changes.

---

## Known Issues
- The extension might not load challenges if there is no active internet connection.
- Ensure the LeetCode daily challenge endpoint remains unchanged to avoid data fetching errors.

---

## Contribution
1. Fork the repository.
2. Create a new branch (`feature/my-new-feature`).
3. Commit changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/my-new-feature`).
5. Open a pull request.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author
**Sushant**


