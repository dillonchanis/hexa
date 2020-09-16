<template>
  <div
    class="relative flex items-center justify-center w-full h-full overflow-hidden rounded-full"
    :style="styles"
    @mousemove="captureScreen"
    @click="getColor"
  >
    <div
      class="flex items-center justify-center w-full h-full overflow-hidden border-4 border-black rounded-full"
    >
      <div class="w-4 h-4 bg-transparent border border-white"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DesktopCapturer, Screen, Point } from 'electron'

declare global {
  interface Window {
    desktopCapturer: DesktopCapturer
    electronScreen: Screen
  }
}

export default defineComponent({
  name: 'ColorSelector',
  data() {
    return {
      hexSize: 64,
      styles: {
        background: 'transparent',
        backgroundImage: '',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '2200px 2200px'
      }
    }
  },
  methods: {
    async captureScreen(): Promise<void> {
      const currentMousePosition: Point = window.electronScreen.getCursorScreenPoint()
      const desktopCapturer = window.desktopCapturer

      try {
        const sources = await desktopCapturer.getSources({
          types: ['screen'],
          thumbnailSize: {
            width: 1000,
            height: 1000
          }
        })
        const entireScreenSource = sources.find(
          source =>
            source.name === 'Entire Screen' || source.name === 'Screen 1'
        )

        const image = entireScreenSource?.thumbnail
          .crop({
            x: currentMousePosition.x,
            y: currentMousePosition.y,
            width: window.innerWidth,
            height: window.innerHeight
          })
          .toDataURL()

        this.styles.backgroundImage = `url("${image}")`
      } catch (e) {
        console.log(e)
      }
    },
    getColor(): void {
      window.ipcRenderer.invoke('colorSelected')
    }
  }
})
</script>

<style scoped>
.bg-hexagon-grid {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23000000' fill-opacity='0.4' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
