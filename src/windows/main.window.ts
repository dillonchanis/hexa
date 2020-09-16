import { menubar, Menubar } from 'menubar'
import path from 'path'
import { IWindowToggle } from './'

export default (dirname: string): IWindowToggle => {
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
    win = menubar({
      index: process.env.WEBPACK_DEV_SERVER_URL
        ? process.env.WEBPACK_DEV_SERVER_URL
        : 'app://./index.html',
      browserWindow: {
        alwaysOnTop: true,
        width: WINDOW.sm,
        height: 282,
        transparent: true,
        webPreferences: {
          preload: path.join(dirname, '../src/windows/preload.ts')
        }
      },
      icon: path.join(dirname, '../src/assets/icon.png')
    })

    win.on('ready', () => {
      win?.showWindow()
    })
  }

  const updateWindowDimensions = (width: number): void => {
    const menubar = get()
    menubar?.window?.setBounds({ width })
    const bounds: Electron.Rectangle | undefined = menubar?.tray?.getBounds()
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
