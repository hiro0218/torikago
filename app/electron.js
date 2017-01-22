'use strict'

const electron = require('electron')
const path = require('path')
const app = electron.app
const Menu = electron.Menu;
const dialog = electron.dialog
const BrowserWindow = electron.BrowserWindow
const pkg = require('./package.json')

let mainWindow
let config = {}

if (process.env.NODE_ENV === 'development') {
  config = require('../config')
  config.url = `http://localhost:${config.port}`
} else {
  config.devtron = false
  config.url = `file://${__dirname}/dist/index.html`
}

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    minWidth: 340,
    maxWidth: 600,
    resizable: true
  })

  mainWindow.once('ready-to-show', () => { mainWindow.show(); })

  mainWindow.loadURL(config.url)

  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/devtron'))

    let installExtension = require('electron-devtools-installer')

    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then((name) => mainWindow.webContents.openDevTools())
      .catch((err) => console.log('An error occurred: ', err))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  createMenu()

  console.log('mainWindow opened')
}

function createMenu () {
  const menu = Menu.buildFromTemplate([{
    label: app.getName(),
    submenu: [{
      label: 'About This App',
      click: function (item, focusedWindow) {
        dialog.showMessageBox(focusedWindow, {
          title: 'About',
          type: 'none',
          icon: path.join(__dirname, '/icons/icon.png'),
          message: pkg.name + ' ' + pkg.version,
          detail: pkg.copyright + " " + pkg.author + '\n\n' +
          pkg.description + '\n\n' +
          'Electron: ' + process.versions.electron + '\n' +
          'Chrome: ' + process.versions.chrome + '\n' +
          'Node.js: ' + process.versions.node +
          'V8: ' + process.versions.v8 + '\n',
          buttons: []
        })
      }
    }]
  }, {
    label: 'Window',
    submenu: [{
      label: 'Always on Top',
      accelerator: 'CmdOrCtrl+Shift+T',
      type: 'checkbox',
      checked: false,
      click: function (item, focusedWindow) {
        focusedWindow.setAlwaysOnTop(!focusedWindow.isAlwaysOnTop())
      }
    }]
  }]);
  Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
