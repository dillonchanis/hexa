<template>
  <div v-for="(twColor, name, index) in colors" :key="index" class="mb-3">
    <span class="font-semibold capitalize text-cool-gray-700">
      {{ name }}
    </span>
    <div class="grid grid-cols-5 gap-2 py-2">
      <PaletteSwatch :colors="twColor" @copy-to-clipboard="copyToClipboard" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TailwindColor } from '../views/Palettes.vue'
import PaletteSwatch from './PaletteSwatch.vue'

export default defineComponent({
  name: 'PaletteGroup',
  components: { PaletteSwatch },
  emits: ['copy-to-clipboard'],
  props: {
    colors: {
      type: Object as PropType<TailwindColor>
    }
  },
  methods: {
    copyToClipboard(color: string): void {
      this.$emit('copy-to-clipboard', color)
    }
  }
})
</script>
