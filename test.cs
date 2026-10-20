using System;
using System.IO;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media;
using Microsoft.Web.WebView2.Wpf;

namespace IMissCSharp
{
    public class Program
    {
        [System.Runtime.InteropServices.DllImport("user32.dll")]
        public static extern bool ReleaseCapture();
        [System.Runtime.InteropServices.DllImport("user32.dll")]
        public static extern IntPtr SendMessage(IntPtr hWnd, int msg, int wParam, int lParam);
        [STAThread] // Required for Windows desktop GUI apps
        public static void Main()
        {
            var app = new Application();
            // 1. Create the transparent, frameless window
            var window = new Window
            {
                Title = "Jasmine Printer",
                Width = 360,
                Height = 460,
                WindowStyle = WindowStyle.None, // No title bar or window borders
                AllowsTransparency = true, //enables desktop transparency
                Background = new SolidColorBrush(Color.FromArgb(1, 0, 0, 0)), // transparent window canvas
                Topmost = true, // keeps printer floating above other windows
                WindowStartupLocation = WindowStartupLocation.CenterScreen
            };

            //2. Create WebView2 browser control
            var webView = new WebView2
            {
                //tells the Chromium engine to render with a transparent background
                DefaultBackgroundColor = System.Drawing.Color.Transparent
            };

            //4. Load your local index.html once the engine initializes
            webView.Loaded += async (sender, e) =>
            {
                await webView.EnsureCoreWebView2Async();

                //Disable the default right-click browser context menu

                webView.CoreWebView2.Settings.AreDefaultContextMenusEnabled = false;
                //locate your index.html file
                string htmlPath=Path.GetFullPath("index.html");
                if (!File.Exists(htmlPath))
                {
                    htmlPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "index.html");
                }

                //navigate directly to your html page
                webView.CoreWebView2.Navigate(new Uri(htmlPath).AbsoluteUri);
            };
            
             // Handle messages from JavaScript (Window Dragging)
            webView.WebMessageReceived += (sender, e) =>
            {
                if (e.TryGetWebMessageAsString() == "drag")
                {
                    window.Dispatcher.Invoke(() =>
                    {
                        ReleaseCapture();
                        var hwnd = new System.Windows.Interop.WindowInteropHelper(window).Handle;
                        SendMessage(hwnd, 0xA1, 0x2, 0); // 2. Tells Windows OS to drag the window!
                    });
                }
            };
            window.Content = webView;
            app.Run(window);
        }
    }
}

