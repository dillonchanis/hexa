import { ipcMain, IpcMainEvent, clipboard } from 'electron'
import { Menubar } from 'menubar'
import { getColorHexRGB } from 'electron-color-picker'

import { Events } from '@/events'
import MainWindow from '@/main.window'

ipcMain.handle(Events.ToggleLargeWindow, () => {
  MainWindow.toggle()
  return MainWindow.status()
})

ipcMain.on(Events.CreateDropperWindow, async () => {
  const color = await getColorHexRGB().catch((error: Error) => {
    console.warn('[ERROR] getColor', error)
    return ''
  })

  const main: Menubar | undefined = MainWindow.get()
  main?.window?.webContents.send(Events.ColorSelected, color)
})

ipcMain.on(Events.ColorSelected, (event: IpcMainEvent, color: string) => {
  const main: Menubar = MainWindow.get()
  main.window?.webContents.send(Events.ColorSelected, color)
})

ipcMain.on(Events.CopyToClipboard, (event: IpcMainEvent, value: string) => {
  clipboard.writeText(value)
})
