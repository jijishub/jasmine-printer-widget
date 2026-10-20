# Jasmine Printer Widget 🌸🖨️📜

This is a mini pet project widget I use to practice my C# and JavaScript.

## Overview
A frameless, transparent Windows desktop widget styled as an isometric pastel-pink pixel art printer. Hovering over the printer feeds out a receipt scroll displaying my most forgotten hobbies. Clicking `+` bumps a hobby's score and pushes it down the list so neglected hobbies naturally rise to the top.

Because the entire widget runs on just four core files (`index.html`, `style.css`, `test.js`, and `test.cs`), it also works as a lightweight base that can easily be adapted into other custom desktop receipt widgets.

## Tech Stack
- **Desktop Host:** C# (.NET 8), WPF, WebView2, Win32 Interop
- **Frontend:** Vanilla JavaScript, HTML5, CSS3 (`localStorage` persistence)

## Running Locally
** Prerequisites:** Windows 10/11 and [.NET 8.0 SDK]
In terminal:
```
winget install Microsoft.DotNet.SDK.8
```

```bash
dotnet run
```
