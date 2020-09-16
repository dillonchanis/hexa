import MainWindowInit from './main.window'

export interface IWindowCreatable {
  init: Function
  create: Function
  get: Function
}

export interface IWindowToggle extends IWindowCreatable {
  toggle: Function
  status: Function
}

export default {
  main: MainWindowInit(__dirname)
}
