<template>
  <header
    class="flex items-center justify-between w-full px-4 py-2 bg-cool-gray-50"
  >
    <h1 class="text-sm font-semibold text-cool-gray-800">Hexa</h1>
    <div class="flex">
      <button
        v-if="paletteEnabled"
        type="button"
        class="inline-block w-4 h-4 ml-2 cursor-pointer text-cool-gray-400 hover:text-cool-gray-500"
        @click="openPalette"
      >
        <span class="sr-only">Color Palette</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <button
        type="button"
        class="inline-block w-4 h-4 ml-2 cursor-pointer text-cool-gray-400 hover:text-cool-gray-500"
        @click="openSettings"
      >
        <span class="sr-only">Settings</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppHeader',
  props: {
    paletteEnabled: { type: Boolean }
  },
  methods: {
    openSettings() {
      this.$emit('toggle-settings')
    },
    openPalette() {
      this.$emit('toggle-palette')
    }
  }
})
</script>
