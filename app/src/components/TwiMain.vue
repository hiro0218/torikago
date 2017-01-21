<style scoped>
#webview {
 height: 100%;
 width: 100%;
}
</style>

<template>
  <webview id="webview"></webview>
</template>

<script>
  var remote = require('electron').remote
  var shell = remote.shell
  var browserWindow = remote.BrowserWindow
  var focusedWindow = browserWindow.getFocusedWindow()

  export default {
    name: 'twi-main',
    mounted () {
      this.startWebview();
    },
    methods: {
      startWebview: function() {
        var self = this;
        var webview = document.getElementById('webview');

        window.addEventListener('load', function() {
          webview.setAttribute('src', 'https://mobile.twitter.com/home');
          self.setExternalLink(webview);
          self.setStyle(webview);
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
            }
          `);
        });
      }
    }
  }
</script>
