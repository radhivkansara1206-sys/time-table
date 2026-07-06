# Class Schedule PWA

A beautiful, modern class schedule built as a Progressive Web App (PWA). It features a glassmorphism design, dynamic background animations, and can be installed natively on both Windows and Android devices. It also includes an integration for the Windows 11 Widget Board.

## 🚀 How to Run Locally

To install and use this app, it must be served over a local web server (PWAs cannot be installed directly from a `file://` URL). 

1. Open your terminal or command prompt in this folder.
2. Start a local server. If you have Python installed, you can run:
   ```bash
   python -m http.server 8080
   ```
   *(Alternatively, you can use VS Code's "Live Server" extension, or Node's `npx serve`)*
3. Open your browser and navigate to: `http://localhost:8080`

## 💻 Installation & Setup on Windows

1. Open `http://localhost:8080` (or your hosted URL) in **Microsoft Edge** or **Google Chrome**.
2. Click the **"Install as App & Add Widget"** button on the webpage, or click the app installation icon that appears in the right side of the URL address bar.
3. Once installed, the Class Schedule will open in its own standalone window and appear in your Windows Start Menu.

### Setting up the Windows 11 Widget
After installing the app on Windows 11:
1. Press `Win + W` to open the Windows Widgets board.
2. Click the **+** (Add Widget) button at the top of the board.
3. Look for "Class Schedule" or "Today's Schedule" in the list of available widgets.
4. Click to pin it to your board!

## 📱 Installation & Setup on Android

1. Host the files on a public web server (like GitHub Pages, Vercel, or Netlify), or access your computer's local IP address from your phone on the same Wi-Fi network.
2. Open the URL in **Google Chrome** on your Android device.
3. A prompt may appear at the bottom of the screen saying **"Add Class Schedule to Home screen"**. Tap it.
   - *If the prompt doesn't appear automatically, tap the three dots (menu) in the top right corner of Chrome and select **"Add to Home screen"** or **"Install app"**.*
4. The app will be installed and you will find the "Schedule" icon in your app drawer and home screen. It will run in full-screen mode like a native app.

## 🎨 Features
- **PWA Ready**: Works offline with a registered Service Worker.
- **Windows 11 Widget**: Includes an Adaptive Card template (`widget-template.json`) and data (`widget-data.json`) to display your schedule in the Windows widget board.
- **Responsive Design**: Looks great on both desktop and mobile devices.
- **Modern UI**: CSS animations and a clean, glass-like aesthetic.
