<template>
  <input
    class="w-4 h-4 transition duration-150 ease-in-out text-cool-gray-600 form-checkbox"
    type="checkbox"
    :name="name"
    :id="id"
    :value="value"
    :checked="modelValue"
    @change="$emit('update:modelValue', $event.target.checked)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseCheckbox',
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
      type: Boolean,
      required: false
    },
    modelValue: {
      type: Boolean
    }
  }
})
</script>
