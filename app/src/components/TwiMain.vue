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

  window.addEventListener('load', function() {
    var webview = document.getElementById('webview');
    webview.setAttribute('src', 'https://mobile.twitter.com/home');

    // 外部リンクをブラウザで開く
    webview.addEventListener('new-window', function(e) {
      // リンクを背面で表示する
      focusedWindow.setAlwaysOnTop(true);
      setTimeout(() => { focusedWindow.setAlwaysOnTop(false) }, 1000);

      shell.openExternal(e.url);
    });

    // webview内に対するスタイル
    var style = `
    html {
      font-family: -apple-system, "Hiragino Kaku Gothic ProN", sans-serif;
    }
    `;

    webview.insertCSS(style);

  }, false);

</script>
