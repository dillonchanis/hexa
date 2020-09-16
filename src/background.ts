'use strict'

import { app, protocol, ipcMain, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { Menubar } from 'menubar'

// App Windows
import AppWindows from './windows'

const isDevelopment: boolean = process.env.NODE_ENV !== 'production'

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

ipcMain.on('createDropperWindow', () => {
  AppWindows.colorSelector.init()
  const dropperWin: BrowserWindow = AppWindows.colorSelector.get()
  dropperWin.show()

  const mouse = process.platform === 'darwin'
    ? require('osx-mouse')()
    : require('win-mouse')()
  
  dropperWin.on('close', () => mouse.destroy())

  mouse.on('move', (x: any, y: any) => {
    dropperWin.setPosition(parseInt(x) - 100, parseInt(y) - 100)
  })
})

ipcMain.handle('colorSelected', async () => {
  AppWindows.colorSelector.get().hide()
})
 
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  if (!process.env.WEBPACK_DEV_SERVER_URL) {
    createProtocol('app')
  }

  AppWindows.main.init()

  const mainBar: Menubar = AppWindows.main.get()

  mainBar.on('ready', () => {
    mainBar.showWindow()
  })

  mainBar.on('after-hide', () => {
    AppWindows.colorSelector.get()?.hide()
  })
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
