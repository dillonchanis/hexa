import MainWindowInit from './main.window'
import ColorSelectorWindowInit from './color-selector.window'

export interface IWindowCreatable {
  init: Function;
  create: Function;
  get: Function;
}

export default {
  main: MainWindowInit(__dirname),
  colorSelector: ColorSelectorWindowInit(__dirname)
}
