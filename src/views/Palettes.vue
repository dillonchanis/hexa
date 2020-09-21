<template>
  <div class="flex-1 w-full h-full p-4 pt-2 overflow-y-scroll">
    <div class="flex justify-between">
      <div>
        <span class="text-sm font-semibold text-cool-gray-700 leading-500">
          Tailwind Palette
        </span>
        <span class="block text-xs text-cool-gray-600">
          Click a palette to copy it's Hex value!
        </span>
      </div>

      <button
        type="button"
        class="p-0 m-0 bg-transparent outline-none cursor-pointer"
        @click="close"
      >
        <IconClose
          class="w-4 h-4 text-cool-gray-500 hover:text-cool-gray-600"
        />
      </button>
    </div>

    <div class="my-3">
      <PaletteGroup :colors="colors" @copy-to-clipboard="copyToClipboard" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { colors } from 'tailwindcss/defaultTheme'
import IconClose from '@/components/Icons/Close.vue'
import PaletteGroup from '@/components/PaletteGroup.vue'

export interface TailwindColor {
  [key: string]: { [key: string]: string }
}

export default defineComponent({
  name: 'Settings',
  components: {
    IconClose,
    PaletteGroup
  },
  props: {},
  data() {
    return {
      twColors: { ...colors }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    copyToClipboard(color: string): void {
      this.$emit('copy-to-clipboard', color)
    }
  },
  computed: {
    // We don't care about standalone colors:
    // white, black, transparent, etc.
    colors(): TailwindColor {
      const colors = this.twColors
      const isObject = (obj: any) => obj === Object(obj)

      return Object.entries(colors).reduce((res, [key, val]) => {
        if (isObject(val)) {
          return { ...res, [key]: val }
        }

        return { ...res }
      }, {})
    }
  }
})
</script>
