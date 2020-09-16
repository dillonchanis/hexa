<template>
  <div class="flex-1 w-full px-4 pt-2 overflow-y-scroll">
    <header class="flex justify-between">
      <h2 class="font-semibold text-cool-gray-700">Settings</h2>

      <button
        type="button"
        class="p-0 m-0 bg-transparent outline-none cursor-pointer"
        @click="close"
      >
        <IconClose
          class="w-5 h-5 text-cool-gray-500 hover:text-cool-gray-600"
        />
      </button>
    </header>

    <div class="mt-3 space-y-4">
      <div class="flex items-center justify-between">
        <label for="paletteCheckbox">
          <span class="text-sm font-medium leading-5 sm:text-cool-gray-700">
            Enable Tailwind palette
          </span>
          <p class="w-64 text-sm leading-5 text-cool-gray-600">
            Show default TailwindCSS palette option.
          </p>
        </label>

        <BaseCheckbox
          id="paletteCheckbox"
          name="palette"
          :model-value="paletteEnabled"
          @update:modelValue="handlePaletteEnabledChanged"
        />
      </div>

      <div class="flex items-center justify-between">
        <label for="sampleCheckbox">
          <span class="text-sm font-medium leading-5 sm:text-cool-gray-700">
            Show sample text
          </span>
          <p class="w-64 text-sm leading-5 text-cool-gray-600">
            Display sample message with selected colors.
          </p>
        </label>

        <BaseCheckbox
          id="sampleCheckbox"
          name="sampleText"
          :model-value="sampleTextEnabled"
          @update:modelValue="handleSampleTextChanged"
        />
      </div>

      <div class="flex items-center justify-between">
        <label for="spacingCheckbox">
          <span class="text-sm font-medium leading-5 sm:text-cool-gray-700">
            Enable spacing tool
          </span>
          <p class="w-64 text-sm leading-5 text-cool-gray-600">
            Enter size in pixels and we'll give you the closest Tailwind class
            to match.
          </p>
        </label>

        <BaseCheckbox
          id="spacingCheckbox"
          name="spacing"
          :model-value="spacingToolEnabled"
          @update:modelValue="handleSpacingToolEnabledChanged"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// import BaseToggle from '@/components/BaseToggle.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import IconClose from '@/components/Icons/Close.vue'

export default defineComponent({
  name: 'Settings',
  components: {
    // BaseToggle,
    BaseCheckbox,
    IconClose
  },
  props: {
    colorPickerEnabled: { type: Boolean },
    sampleTextEnabled: { type: Boolean },
    paletteEnabled: { type: Boolean },
    spacingToolEnabled: { type: Boolean }
  },
  methods: {
    handleColorPickerChanged(value: boolean): void {
      this.$emit('update:colorPickerEnabled', value)
    },
    handleSampleTextChanged(value: boolean): void {
      this.$emit('update:sampleTextEnabled', value)
    },
    handlePaletteEnabledChanged(value: boolean): void {
      this.$emit('update:paletteEnabled', value)
    },
    handleSpacingToolEnabledChanged(value: boolean): void {
      this.$emit('update:spacingToolEnabled', value)
    },
    close() {
      this.$emit('close')
    }
  }
})
</script>
