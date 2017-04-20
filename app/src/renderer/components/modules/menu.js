'use strict';

const remote = require('electron').remote;
const app = remote.require('electron').app;
const Menu = remote.require('electron').Menu;
const dialog = remote.require('electron').dialog;
// const shell = remote.shell;
const nativeImage = remote.require('electron').nativeImage;
const pkg = require('../../../../package.json');

module.exports = {
  menubar: [],
  goBack: function() {},
  goForward: function() {},
  goPage: function(page) {},
  ready: function() {
    var self = this;

    self.menubar.push({
      label: app.getName(),
      submenu: [{
        label: 'About This App',
        click: function (item, focusedWindow) {
          dialog.showMessageBox(focusedWindow, {
            title: 'About',
            type: 'none',
            icon: nativeImage.createFromPath('./app/static/icon.png'),
            message: pkg.name + ' ' + pkg.version,
            detail: pkg.copyright + ' ' + pkg.author + '\n\n' +
            pkg.description + '\n\n' +
            'Electron: ' + process.versions.electron + '\n' +
            'Chrome: ' + process.versions.chrome + '\n' +
            'Node.js: ' + process.versions.node +
            'V8: ' + process.versions.v8 + '\n',
            buttons: []
          })
        }
      },
      { type: 'separator' },
      {
        label: 'Quit',
        accelerator: 'Cmd+Q',
        click: function (item, focusedWindow) {
          app.quit();
        }
      }]
    }, {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
      ]
    }, {
      label: 'View',
      submenu: [{
        label: 'Back',
        accelerator: 'Cmd+Left',
        click: function (item, focusedWindow) {
          self.goBack();
        }
      }, {
        label: 'Forward',
        accelerator: 'Cmd+Right',
        click: function (item, focusedWindow) {
          self.goForward();
        }
      },
      { type: 'separator' },
      {
        label: 'Account',
        accelerator: 'Cmd+0',
        click: function (item, focusedWindow) {
          self.goPage(0);
        }
      },
      { type: 'separator' },
      {
        label: 'Home',
        accelerator: 'Cmd+1',
        click: function (item, focusedWindow) {
          self.goPage(1);
        }
      }, {
        label: 'Notifications',
        accelerator: 'Cmd+2',
        click: function (item, focusedWindow) {
          self.goPage(2);
        }
      }, {
        label: 'Direct Message',
        accelerator: 'Cmd+3',
        click: function (item, focusedWindow) {
          self.goPage(3);
        }
      }, {
        label: 'Search',
        accelerator: 'Cmd+4',
        click: function (item, focusedWindow) {
          self.goPage(4);
        }
      },
      { type: 'separator' },
      {
        label: 'Tweet',
        accelerator: 'Cmd+5',
        click: function (item, focusedWindow) {
          self.goPage(5);
        }
      }]
    }, {
      label: 'Mode',
      submenu: [{
        label: 'Grayscale',
        type: 'checkbox',
        checked: document.body.className.match(/grayscale/),
        click: function () {
          document.body.classList.toggle('grayscale');
        }
      }]
    }, {
      label: 'Window',
      submenu: [{
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
          focusedWindow.reload()
        }
      },
      { type: 'separator' },
      {
        label: 'Always on Top',
        accelerator: 'CmdOrCtrl+Shift+T',
        type: 'checkbox',
        checked: false,
        click: function (item, focusedWindow) {
          focusedWindow.setAlwaysOnTop(!focusedWindow.isAlwaysOnTop())
        }
      }]
    });

    Menu.setApplicationMenu(Menu.buildFromTemplate(self.menubar));

  }
}
