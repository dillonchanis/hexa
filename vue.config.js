// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      linux: {
        maintainer: 'Dillon Chanis <dillonchanis92@gmail.com>'
      },
      mac: {
        extendInfo: {
          LSUIElement: 1
        }
      },
      externals: ['electron-color-picker']
    }
  }
}
