'use strict';

const remote = require('electron').remote;
const app = remote.require('electron').app;
const Menu = remote.require('electron').Menu;
const dialog = remote.require('electron').dialog;
// const shell = remote.shell;
const nativeImage = remote.require('electron').nativeImage;
const pkg = require('../package.json');

module.exports = {
  menubar: [],
  goBack: function() {},
  goForward: function() {},
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
      }, {
        label: 'Exit',
        accelerator: 'Cmd+Q',
        click: function (item, focusedWindow) {
          focusedWindow.close();
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
