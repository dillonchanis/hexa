module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      linux: {
        maintainer: 'Dillon Chanis <dillonchanis92@gmail.com>'
      },
      mac: {
        hardenedRuntime: true,
        entitlements: './build/entitlements.mac.inherit.plist',
        extendInfo: {
          LSUIElement: 1
        }
      },
      externals: ['electron-color-picker'],
      builderOptions: {
        publish: ['github'],
        appId: 'com.evergrove.hexa'
      }
    }
  }
}
