<template>
  <div class="p-2 rounded" :style="{ color: foreground, background }">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Sample',
  props: {
    foreground: {
      type: String
    },
    background: {
      type: String
    },
    text: {
      type: String
    }
  }
})
</script>
