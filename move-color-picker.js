/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Moves the correct color picker executable to the dist_electron root dir
 */

const path = require('path')
const shell = require('shelljs')

const DEPENDENCY_PATH = './node_modules/electron-color-picker/library'
const DIST_PATH = path.join(__dirname, './dist_electron')

const EXECUTABLES = {
  darwin: 'ColorPicker',
  win32: 'mockingbot-color-picker-ia32.exe',
  linux: 'scrot'
}

const os = process.platform

let exePath

if (os === 'darwin') {
  exePath = path.join(
    __dirname,
    `${DEPENDENCY_PATH}/${os}/`,
    EXECUTABLES.darwin
  )
} else if (os === 'win32') {
  exePath = path.join(__dirname, `${DEPENDENCY_PATH}/${os}/`, EXECUTABLES.win32)
} else if (os === 'linux') {
  exePath = path.join(
    __dirname,
    `${DEPENDENCY_PATH}/${os}/linux-scrot/`,
    EXECUTABLES.linux
  )
} else {
  console.error(`${os} is not supported.`)
}

shell.cp(exePath, DIST_PATH)
