<template>
  <button
    class="inline-flex items-center p-1 bg-white border border-transparent rounded outline-none focus:border-blue-300 focus:outline-none focus:shadow-outline-blue hover:bg-gray-100"
    type="button"
    @click="spawnDropper"
  >
    <svg v-bind="$attrs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd" transform="rotate(45 9.536 20.88)">
        <path
          fill="currentColor"
          d="M2 2.997A3 3 0 015 0c1.657 0 3 1.347 3 2.997V9H2V2.997z"
        />
        <rect width="10" height="3" y="6" fill="currentColor" rx="1.5" />
        <path
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="2"
          d="M2 8v12.993c0 .556.368 1.268.804 1.602C2.804 22.595 5 24 5 25.5c0-1.5 2.196-2.905 2.196-2.905.444-.329.804-1.045.804-1.602V8"
        />
      </g>
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EyeDropper',
  inheritAttrs: false,
  methods: {
    spawnDropper() {
      this.$emit('spawn-dropper')
    }
  }
})
</script>
