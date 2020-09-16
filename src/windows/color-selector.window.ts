import { BrowserWindow } from 'electron'
import path from 'path'
import { IWindowCreatable } from './'

export default (dirname: string): IWindowCreatable => {
  let win: BrowserWindow | undefined

  const init = (): void => {
    if (!win) {
      create()
    }
  }

  const create = (): void => {
    win = new BrowserWindow({
      width: 200,
      height: 200,
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      hasShadow: false,
      resizable: false,
      autoHideMenuBar: true,
      focusable: false,
      thickFrame: false,
      webPreferences: {
        preload: path.join(dirname, '../src/windows/preload.js')
      }
    })

    const windowPath: string =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080/#/select'
      : `file://${__dirname}/index.html#select`
    
    win.loadURL(windowPath)

    win.on('closed', () => {
      win = undefined
    })
  } 

  const get = (): BrowserWindow | undefined =>  win
  
  return {
    init,
    create,
    get
  }
}