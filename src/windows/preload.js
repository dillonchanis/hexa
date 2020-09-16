const {
  ipcRenderer,
  desktopCapturer,
  screen
// eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('electron')

window.ipcRenderer = ipcRenderer
window.desktopCapturer = desktopCapturer
window.electronScreen = screen
