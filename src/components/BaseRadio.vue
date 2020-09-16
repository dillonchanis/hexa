<template>
  <input
    class="w-4 h-4 transition duration-150 ease-in-out text-cool-gray-600 form-radio"
    type="radio"
    :name="name"
    :id="id"
    :value="value"
    :checked="modelValue === value"
    @change="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseRadio',
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
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
