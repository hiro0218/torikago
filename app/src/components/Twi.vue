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

  const PAGE = {
    DEFAULT: 'https://mobile.twitter.com',
    HOME: 'https://mobile.twitter.com',
    NOTICE: 'https://mobile.twitter.com/notifications',
    DM: 'https://mobile.twitter.com/messages',
    SEARCH: 'https://mobile.twitter.com/search',
    TWEET: 'https://mobile.twitter.com/compose/tweet'
  }

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
      setMenuGoPage: function(page) {
        var webview = document.getElementById('webview');

        switch (page) {
          case 1:
            webview.src = PAGE.HOME;
            break;
          case 2:
            webview.src = PAGE.NOTICE;
            break;
          case 3:
            webview.src = PAGE.DM;
            break;
          case 4:
            webview.src = PAGE.SEARCH;
            break;
          case 5:
            webview.src = PAGE.TWEET;
            break;
          default:
            webview.src = PAGE.DEFAULT;
        }
      },
      startWebview: function() {
        var self = this;
        var webview = document.getElementById('webview');

        webview.src = PAGE.DEFAULT;
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
            /* tweet */
            div[data-testid="UserCell"] {
              display: none !important;
            }
            textarea[data-testid="tweet-textarea"]::-webkit-input-placeholder {
              opacity: 0;
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
