import { menubar, Menubar } from 'menubar'
import path from 'path'
import { IWindowCreatable } from './'

export default (dirname: string): IWindowCreatable => {
  let win: Menubar | undefined

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
        width: 460,
        height: 60,
        webPreferences: {
          preload: path.join(dirname, '../src/windows/preload.js')
        }
      },
      icon: path.join(dirname, '../src/assets/icon.png')
    })
  } 

  const get = (): Menubar | undefined =>  win
  
  return {
    init,
    create,
    get
  }
}