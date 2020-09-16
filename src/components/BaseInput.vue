<template>
  <input
    class="block w-full p-1 px-2 text-base border rounded form-input bg-cool-gray-50 text-cool-gray-700 border-cool-gray-300 focus:border-gray-300 focus:shadow-outline-gray"
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
