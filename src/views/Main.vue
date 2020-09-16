<template>
  <div class="flex items-center h-screen p-3 antialiased bg-white" id="app">
    <div class="grid grid-flow-col grid-cols-3 gap-4">
      <div class="font-bold text-cool-gray-900">
        AA
      </div>

      <div class="flex items-center">
        <div class="mr-1">
          <EyeDropper
            class="w-4 h-4 text-cool-gray-500 hover:text-cool-gray-700"
            @spawn-dropper="spawnDropper"
          />
        </div>
        <HexInput label="foreground" />
      </div>

      <div class="flex items-center">
        <div class="mr-1">
          <EyeDropper
            class="w-4 h-4 text-cool-gray-500 hover:text-cool-gray-700"
            @spawn-dropper="spawnDropper"
          />
        </div>
        <HexInput label="background" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IpcRenderer } from 'electron'

import HexInput from '@/components/HexInput.vue'
import EyeDropper from '@/components/Dropper.vue'

declare global {
  interface Window {
    ipcRenderer: IpcRenderer
  }
}

export default defineComponent({
  name: 'Main',
  components: {
    HexInput,
    EyeDropper
  },
  methods: {
    spawnDropper() {
      window.ipcRenderer.send('createDropperWindow')
    }
  }
})
</script>
