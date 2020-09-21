<template>
  <span
    class="absolute inset-0 inline-flex items-center justify-center shadow-inner"
    :style="{ backgroundColor: color }"
    @click="() => copyToClipboard(color)"
  >
    <transition
      enter-class="transition duration-300 ease-in-out"
      enter-from-class="transform -translate-y-1 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in-out"
      leave-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-1 opacity-0"
    >
      <span
        class="p-1 bg-white rounded text-xxs text-cool-gray-800"
        v-if="show"
      >
        Copied!
      </span>
    </transition>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Palette',
  emits: ['copy-to-clipboard'],
  props: {
    color: {
      type: String
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    copyToClipboard(color: string) {
      this.show = true

      setTimeout(() => {
        this.show = false
      }, 400)

      this.$emit('copy-to-clipboard', color)
    }
  }
})
</script>
