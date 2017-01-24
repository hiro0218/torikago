<style scoped>
#webview {
 height: 100%;
 width: 100%;
}
</style>

<template>
  <webview id="webview"
           useragent="Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/53.0.2785.86 Mobile/14A403 Safari/601.1.46"></webview>
</template>

<script>
  var remote = require('electron').remote;
  var shell = remote.shell;
  var browserWindow = remote.BrowserWindow;
  var focusedWindow = browserWindow.getFocusedWindow();

  export default {
    name: 'twi',
    mounted () {
      this.startWebview();
    },
    methods: {
      setMenuGoBack: function() {
        var webview = document.getElementById('webview');
        if (webview.canGoBack()) {
          webview.goBack();
        }
      },
      setMenuGoForward: function() {
        var webview = document.getElementById('webview');
        if (webview.canGoForward()) {
          webview.goForward();
        }
      },
      startWebview: function() {
        var self = this;
        var webview = document.getElementById('webview');

        webview.setAttribute('src', 'https://mobile.twitter.com');
        self.setExternalLink(webview);
        self.setStyle(webview);

        webview.addEventListener('dom-ready', function() {
          self.openDevTools(webview);
        }, false);

      },
      setExternalLink: function(webview) {
        webview.addEventListener('new-window', function(e) {
          // リンクを背面で表示する
          focusedWindow.setAlwaysOnTop(true);
          setTimeout(() => { focusedWindow.setAlwaysOnTop(false) }, 1000);

          // 外部リンクをブラウザで開く
          shell.openExternal(e.url);
        });
      },
      setStyle: function(webview) {
        // webview 内に対して、スタイルをセットする
        webview.addEventListener('did-finish-load', function() {
          this.insertCSS(`
            html {
              font-family: -apple-system, "Hiragino Kaku Gothic ProN", sans-serif;
              -webkit-font-smoothing: antialiased;
            }
            header[role=banner] > div:first-of-type:not(:only-of-type) {
              display: none;
            }
          `);
        });
      },
      openDevTools: function(webview) {
        if (process.env.NODE_ENV === 'development') {
          webview.openDevTools();
        }
      }
    }
  }
</script>
