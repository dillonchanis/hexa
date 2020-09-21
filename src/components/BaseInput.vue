<template>
  <input
    class="block w-full px-2 py-1 text-sm border rounded form-input bg-cool-gray-50 text-cool-gray-700 border-cool-gray-300 focus:border-cool-gray-300 focus:shadow-outline-blue"
    :id="label"
    :name="label"
    :value="modelValue"
    @input="event => $emit('update:modelValue', event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HexInput',
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: String
    }
  }
})
</script>
