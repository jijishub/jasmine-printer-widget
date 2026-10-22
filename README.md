# Jasmine Printer Widget 🌸🖨️📜

This is a mini pet project widget I use to practice my C# and JavaScript.

## Overview
A frameless, transparent Windows desktop widget styled as an isometric pastel-pink pixel art printer. Hovering over the printer feeds out a receipt scroll that can switch between different modular printer modes in `modes/`.

## Printer Modes
Switch modes by changing the `<script src="modes/...">` tag at the bottom of `index.html`:
- **`modes/hobbies.js` (Forgotten Hobbies):** Tracks neglected hobbies using `localStorage`. Clicking `+` bumps a hobby's score and pushes it down the receipt.
- **`modes/spotify.js` (Weekly Top Songs):** Prints your live 7-day top Spotify tracks via Last.fm and auto-refreshes every 3 minutes.

### Last.fm Setup (for `spotify.js`)
1. Create a free [Last.fm account](https://www.last.fm/), connect your Spotify under **Settings > Applications**, and grab a free [Last.fm API Key](https://www.last.fm/api/account/create).
2. Create a `config.js` file in the project root:
   ```js
   const USERNAME = "your_lastfm_username";
   const API_KEY = "your_lastfm_api_key";
   const LIMIT = 7;
   ```

## Tech Stack
- **Desktop Host:** C# (.NET 8), WPF, WebView2, Win32 Interop
- **Frontend:** Vanilla JavaScript, HTML5, CSS3 (`localStorage` & Last.fm REST API)

## Running Locally
**Prerequisites:** Windows 10/11 and [.NET 8.0 SDK]

In terminal:
```
winget install Microsoft.DotNet.SDK.8
```

```bash
dotnet run
```
