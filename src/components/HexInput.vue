<template>
  <div>
    <label :for="label" class="sr-only">
      {{ label }}
    </label>
    <input
      :id="label"
      class="flex-1 block w-full p-1 text-xs rounded form-input"
      maxlength="7"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HexInput',
  props: {
    label: {
      type: String,
      required: true
    }
  }
})
</script>
