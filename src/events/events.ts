import { ipcMain, IpcMainEvent, clipboard } from 'electron'
import { Menubar } from 'menubar'
import { getColorHexRGB } from 'electron-color-picker'

import { Events } from '@/events'
import AppWindows from '@/windows'

ipcMain.handle(Events.ToggleLargeWindow, () => {
  AppWindows.main.toggle()
  return AppWindows.main.status()
})

ipcMain.on(Events.CreateDropperWindow, async () => {
  const color = await getColorHexRGB().catch((error: Error) => {
    console.warn('[ERROR] getColor', error)
    return ''
  })

  const main: Menubar | undefined = AppWindows.main.get()
  main?.window?.webContents.send(Events.ColorSelected, color)
})

ipcMain.on(Events.ColorSelected, (event: IpcMainEvent, color: string) => {
  const main: Menubar = AppWindows.main.get()
  main.window?.webContents.send(Events.ColorSelected, color)
})

ipcMain.on(Events.CopyToClipboard, (event: IpcMainEvent, value: string) => {
  clipboard.writeText(value)
})
