import Store, { Options } from 'electron-store'

export interface AppStoreSettings {
  colorPickerEnabled: boolean
  sampleTextEnabled: boolean
  paletteEnabled: boolean
  spacingToolEnabled: boolean
}

const defaults: AppStoreSettings = {
  colorPickerEnabled: false,
  sampleTextEnabled: false,
  paletteEnabled: false,
  spacingToolEnabled: false
}

export class HexaStorage extends Store<AppStoreSettings> {
  constructor(settings: Options<AppStoreSettings> = { defaults }) {
    super(settings)
  }

  setColorPickerEnabled(enabled: boolean): void {
    this.set('colorPickerEnabled', enabled)
  }

  getColorPickerEnabled(): boolean {
    return this.get('colorPickerEnabled')
  }

  setSampleTextEnabled(enabled: boolean): void {
    this.set('sampleTextEnabled', enabled)
  }

  getSampleTextEnabled(): boolean {
    return this.get('sampleTextEnabled')
  }

  setPaletteEnabled(enabled: boolean): void {
    this.set('paletteEnabled', enabled)
  }

  getPaletteEnabled(): boolean {
    return this.get('paletteEnabled')
  }

  setSpacingToolEnabled(enabled: boolean): void {
    this.set('spacingToolEnabled', enabled)
  }

  getSpacingToolEnabled(): boolean {
    return this.get('spacingToolEnabled')
  }
}

const storage = new HexaStorage()
Object.freeze(storage)

export default storage
