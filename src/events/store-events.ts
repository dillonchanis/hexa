import { ipcMain, IpcMainEvent } from 'electron'
import store from '../store'
import { StoreEvents, UpdateStoreEvents } from './'

ipcMain.handle(StoreEvents.Initialize, () => {
  return {
    colorPickerEnabled: store.getColorPickerEnabled(),
    sampleTextEnabled: store.getSampleTextEnabled(),
    paletteEnabled: store.getPaletteEnabled(),
    spacingToolEnabled: store.getSpacingToolEnabled()
  }
})

ipcMain.on(UpdateStoreEvents.ColorPickerEnabled, (e: IpcMainEvent, value: boolean) => {
  store.setColorPickerEnabled(value)
})

ipcMain.on(UpdateStoreEvents.SampleTextEnabled, (e: IpcMainEvent, value: boolean) => {
  store.setSampleTextEnabled(value)
})

ipcMain.on(UpdateStoreEvents.PaletteEnabled, (e: IpcMainEvent, value: boolean) => {
  store.setPaletteEnabled(value)
})

ipcMain.on(UpdateStoreEvents.SpacingToolEnabled, (e: IpcMainEvent, value: boolean) => {
  store.setSpacingToolEnabled(value)
})