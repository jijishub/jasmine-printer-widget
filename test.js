//left-click (e.button === 0): drag the printer
document.querySelector(".widget-wrapper").addEventListener("mousedown", (e) => {
    if (e.button === 0 && !e.target.closest(".bump-btn")) {
        window.chrome?.webview?.postMessage("drag");
    }
});

// right-click: toggle Pin / Unpin (TopMost)
document.querySelector(".widget-wrapper").addEventListener("contextmenu", (e) => {
    e.preventDefault();
    window.chrome?.webview?.postMessage("toggle_pin");
});