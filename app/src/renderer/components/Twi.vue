<style>
.twi-container {
 -webkit-app-region: no-drag;

 height: calc(100% - 24px);
 width: 100%;
}

#webview {
  height: 100%;
  width: 100%;
}
</style>

<template>
  <div class="twi-container">
    <div class="overlay"></div>
    <webview id="webview"
             useragent="Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/53.0.2785.86 Mobile/14A403 Safari/601.1.46"></webview>
  </div>
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
          case 0:
            // ACCOUNT
            webview.executeJavaScript("document.querySelectorAll('[data-testid=loggedInUserLink]')[0].click()");
            break;
          case 1:
            // HOME
            webview.executeJavaScript("document.querySelectorAll('[data-testid=homeLink]')[0].click()");
            break;
          case 2:
            // NOTICE
            webview.executeJavaScript("document.querySelectorAll('[data-testid=notificationsLink]')[0].click()");
            break;
          case 3:
            // DM
            webview.executeJavaScript("document.querySelectorAll('[data-testid=directMessagesLink]')[0].click()");
            break;
          case 4:
            // SEARCH
            webview.executeJavaScript("document.querySelectorAll('[data-testid=searchLink]')[0].click()");
            break;
          case 5:
            // TWEET
            webview.executeJavaScript("document.querySelectorAll('[data-testid=fab-tweet]')[0].click()");
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
              font-family: -apple-system, "Hiragino Kaku Gothic ProN", "Hiragino Kaku Gothic Pro", sans-serif !important;
            }
            /* header */
            header[role="banner"] {
              display: none !important;
            }
            [data-testid="fab-tweet"] {
              border-radius: .25rem !important;
              box-shadow: none !important;
              opacity: .1;
              transition: opacity .2s;
            }
            [data-testid="fab-tweet"]:hover {
              opacity: 1;
            }
            /* tweet */
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
