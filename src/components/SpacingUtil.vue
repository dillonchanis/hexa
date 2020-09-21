<template>
  <label
    for="spacing"
    class="relative font-semibold tracking-wide uppercase text-xxs text-cool-gray-700"
  >
    Spacing (in px)
  </label>
  <div class="flex mt-1">
    <div class="w-14">
      <BaseInput v-model="value" label="spacing" />
    </div>
    <span class="inline-flex flex-1 ml-2 rounded-md shadow-sm">
      <button
        type="button"
        class="inline-flex items-center justify-center flex-1 px-1 py-1 font-medium leading-4 text-white transition duration-150 ease-in-out border border-transparent rounded-md text-xxs bg-cool-gray-600 hover:bg-cool-gray-500 focus:outline-none focus:border-cool-gray-700 focus:shadow-outline-gray active:bg-cool-gray-700"
        @click="copyToClipboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="-ml-0.5 mr-2 h-4 w-4"
        >
          <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
          <path
            d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"
          />
        </svg>
        {{ themeValue || 'N/A' }}
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { spacing } from 'tailwindcss/defaultTheme'
import _ from 'lodash'

import BaseInput from '@/components/BaseInput.vue'

const themeLookup: { [key: string]: string } = _.reduce(
  spacing,
  (acc, val, key) => {
    return {
      ...acc,
      [val]: key
    }
  },
  {}
)

const twSpacing = _.reduce(
  spacing,
  (acc: number[], val: string) => {
    const x = _.replace(val, 'rem', '')
    const num = _.toNumber(x)
    return [...acc, num]
  },
  []
).filter(x => !_.isNaN(x))

export default defineComponent({
  name: 'SpacingUtil',
  components: {
    BaseInput
  },
  emits: ['copy-to-clipboard'],
  data() {
    return {
      base: 16,
      value: ''
    }
  },
  methods: {
    closest(needle: number, haystack: number[]): number {
      return haystack.reduce((a, b) => {
        const aDiff = Math.abs(a - needle)
        const bDiff = Math.abs(b - needle)

        if (aDiff === bDiff) {
          return a < b ? a : b
        } else {
          return bDiff < aDiff ? b : a
        }
      })
    },
    copyToClipboard() {
      const value = this.themeValue || ''
      this.$emit('copy-to-clipboard', value)
    }
  },
  computed: {
    needle(): number {
      const value = _.toNumber(this.value)
      return value / this.base
    },

    found(): string {
      const closestValue = this.closest(this.needle, twSpacing)
      const addRemSuffix = `${closestValue}rem`

      return addRemSuffix
    },

    themeValue(): string {
      return themeLookup[this.found]
    }
  }
})
</script>
