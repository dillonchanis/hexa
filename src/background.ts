'use strict'

import { app, protocol, IpcRenderer } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

// App Windows
import AppWindows from './windows'

import '@/events/events'
import '@/events/store-events'

const isDevelopment: boolean = process.env.NODE_ENV !== 'production'

declare global {
  interface Window {
    ipcRenderer: IpcRenderer
  }
}

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

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
