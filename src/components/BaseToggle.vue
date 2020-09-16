<template>
  <span
    role="checkbox"
    tabindex="0"
    class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline"
    :ariaChecked="on"
    :class="{
      'bg-cool-gray-600': on,
      'bg-cool-gray-200': off
    }"
    @click="toggle"
  >
    <span
      aria-hidden="true"
      class="relative inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow"
      :class="{
        'translate-x-5': on,
        'translate-x-0': off
      }"
    >
      <span
        class="absolute inset-0 flex items-center justify-center w-full h-full transition-opacity duration-200 ease-in opacity-0"
        :class="{
          'opacity-0 ease-out duration-100': on,
          'opacity-100 ease-in duration-200': off
        }"
      >
        <svg class="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 12 12">
          <path
            d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>

      <span
        class="absolute inset-0 flex items-center justify-center w-full h-full transition-opacity duration-100 ease-out opacity-0"
        :class="{
          'opacity-100 ease-in duration-200': on,
          'opacity-0 ease-out duration-100': off
        }"
      >
        <svg
          class="w-3 h-3 text-cool-gray-600"
          fill="currentColor"
          viewBox="0 0 12 12"
        >
          <path
            d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
          />
        </svg>
      </span>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseToggle',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggle(): void {
      this.$emit('update:modelValue', !this.modelValue)
    }
  },
  computed: {
    on(): boolean {
      return +this.modelValue === 1
    },
    off(): boolean {
      return +this.modelValue === 0
    }
  }
})
</script>
