<template>
  <label
    class="block p-3 border rounded"
    :for="id"
    :class="{
      'border-cool-gray-300 text-cool-gray-800 bg-cool-gray-50':
        modelValue === value,
      'border-cool-gray-200 text-cool-gray-700 bg-white': modelValue !== value
    }"
  >
    <BaseRadio
      :id="id"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', $event.target.value)"
    />
    <span class="inline-block ml-2 text-sm font-medium leading-5">
      {{ label }}
    </span>
    <img
      class="object-cover w-full h-20 mt-3 rounded-sm shadow-inner"
      :src="imageSrc"
      :alt="imageAlt"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import BaseRadio from './BaseRadio.vue'

export default defineComponent({
  name: 'ColorSelectorRadio',
  components: { BaseRadio },
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    imageSrc: {
      type: String,
      required: true
    },
    imageAlt: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    modelValue: {
      type: String
    }
  }
})
</script>
