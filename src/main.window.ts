/* global __static */

import { app } from 'electron'
import { menubar, Menubar } from 'menubar'
import path from 'path'
import url from 'url'
import { IWindowToggle } from './windows'

const window = (): IWindowToggle => {
  const WINDOW = Object.freeze({
    sm: 164,
    lg: 500
  })
  let win: Menubar | undefined
  let settingsIsOpen: boolean = false

  const init = (): void => {
    if (!win) {
      create()
    }
  }

  const create = (): void => {
    const appIndex = url.format({
      pathname: path.join(app.getAppPath(), 'index.html'),
      protocol: 'file',
      slashes: true
    })

    win = menubar({
      index: process.env.WEBPACK_DEV_SERVER_URL
        ? process.env.WEBPACK_DEV_SERVER_URL
        : appIndex,
      browserWindow: {
        alwaysOnTop: true,
        width: WINDOW.sm,
        height: 282,
        transparent: true,
        webPreferences: {
          nodeIntegration: false,
          preload: path.join(__dirname, 'preload.js')
        }
      },
      icon: path.join(__static, 'menu-icon.png')
    })

    win.on('ready', () => {
      win?.showWindow()
    })
  }

  const updateWindowDimensions = (width: number): void => {
    const menubar = get()
    menubar?.window?.setBounds({ width })
    const bounds: Electron.Rectangle | undefined = menubar?.tray?.getBounds()
    console.log(bounds)
    menubar?.positioner.move('trayCenter', bounds)
  }

  const toggle = (): void => {
    settingsIsOpen = !settingsIsOpen

    if (settingsIsOpen) {
      updateWindowDimensions(WINDOW.lg)
      return
    }

    updateWindowDimensions(WINDOW.sm)
  }

  const get = (): Menubar | undefined => win

  const status = (): boolean => settingsIsOpen

  return {
    init,
    create,
    get,
    toggle,
    status
  }
}

export default window()
