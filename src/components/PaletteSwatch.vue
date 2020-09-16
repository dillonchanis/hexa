<template>
  <div
    v-for="color in colors"
    class="relative overflow-hidden rounded cursor-pointer pb-full"
    :key="color"
  >
    <Palette :color="color" @copy-to-clipboard="copyToClipboard" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Palette from '@/components/Palette.vue'

export default defineComponent({
  name: 'PaletteSwatch',
  components: { Palette },
  emits: ['copy-to-clipboard'],
  props: {
    colors: {}
  },
  methods: {
    copyToClipboard(color: string) {
      this.$emit('copy-to-clipboard', color)
    }
  }
})
</script>
