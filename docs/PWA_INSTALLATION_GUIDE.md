# NationOS PWA Installation Guide

**Version:** 2.0  
**Last Updated:** December 18, 2025

---

## What is a PWA?

A Progressive Web App (PWA) allows you to install NationOS directly on your device, just like a native app. Once installed, NationOS will:

- Launch in its own window (no browser UI)
- Work offline (cached content)
- Load faster (pre-cached resources)
- Appear on your home screen with the NationOS icon

This is a **sovereign alternative** to app stores—no Apple or Google gatekeeping required.

---

## Prerequisites

**IMPORTANT:** The website must be served over **HTTPS** for PWA installation to work. If you're accessing `http://nationos.io` (without the 's'), the install option will not appear.

Always use: `https://nationos.io`

---

## Installation Instructions

### On Android (Chrome, Brave, Edge)

1. Open **Chrome**, **Brave**, or **Edge** browser
2. Navigate to `https://nationos.io`
3. Wait a few seconds for the page to load completely
4. Look for one of these install options:
   - **Install button** in the address bar (computer icon with down arrow)
   - **"Add to Home screen"** banner at the bottom of the screen
   - **Three-dot menu (⋮)** → **"Install app"** or **"Add to Home screen"**
5. Tap **Install** or **Add**
6. The NationOS icon will appear on your home screen

### On iOS (iPhone/iPad - Safari Only)

**Note:** iOS only supports PWA installation through Safari. Chrome and other browsers on iOS cannot install PWAs.

1. Open **Safari** (the default browser)
2. Navigate to `https://nationos.io`
3. Tap the **Share** button (square with arrow pointing up)
4. Scroll down and tap **"Add to Home Screen"**
5. Edit the name if desired, then tap **"Add"**
6. The NationOS icon will appear on your home screen

### On Desktop (Windows, Mac, Linux)

**Chrome / Edge / Brave:**

1. Navigate to `https://nationos.io`
2. Look for the **Install** icon in the address bar (right side)
   - It looks like a computer monitor with a down arrow, or a plus (+) symbol
3. Click it and select **"Install"**
4. NationOS will open in its own window

**Alternative method:**

1. Click the **three-dot menu (⋮)** in the top-right corner
2. Select **"Install NationOS"** or **"Save and Share" → "Install"**

---

## Troubleshooting

### "Install" option doesn't appear

**Check these requirements:**

1. **HTTPS:** Ensure you're on `https://nationos.io` (not `http://`)
2. **Wait:** The browser needs ~30 seconds of engagement before showing the install prompt
3. **Refresh:** Try refreshing the page and waiting again
4. **Clear cache:** Clear your browser cache and try again
5. **Already installed:** If already installed, the option won't appear

### iOS: "Add to Home Screen" not visible

- Make sure you're using **Safari** (not Chrome or another browser)
- Scroll down in the Share menu—it may be below the fold
- Try force-quitting Safari and reopening

### App doesn't work offline

- Ensure you've visited the main pages at least once while online
- The service worker needs to cache the pages first
- Check that JavaScript is enabled in your browser

---

## Updating the App

PWAs update automatically when you're online. If you want to force an update:

1. Close the app completely
2. Reopen it while connected to the internet
3. The service worker will check for updates

---

## Uninstalling

### Android
- Long-press the NationOS icon → **Uninstall** or **Remove**

### iOS
- Long-press the NationOS icon → Tap the **X** or **Remove App**

### Desktop (Chrome)
- Open `chrome://apps`
- Right-click NationOS → **Remove from Chrome**

---

## Technical Details

For developers and advanced users:

| Component | File | Purpose |
|:----------|:-----|:--------|
| Manifest | `/manifest.json` | App metadata, icons, theme |
| Service Worker | `/sw.js` | Offline caching, background sync |
| Install Manager | `/js/pwa-install.js` | Install prompt handling |

**Cache Strategy:** Stale-while-revalidate (serve cached, update in background)

**Cached Resources:**
- All HTML pages
- CSS stylesheets
- JavaScript files
- Core images and icons

---

## Support

If you encounter issues with PWA installation:

1. Check the browser console for errors (F12 → Console tab)
2. Verify HTTPS is enabled on the server
3. Contact the NationOS community for assistance

---

**Soli Deo Gloria**

*Making the nation portable—one device at a time.*
