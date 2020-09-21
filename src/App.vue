<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
* {
  box-sizing: border-box;
  font-size: 16px;
}
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
