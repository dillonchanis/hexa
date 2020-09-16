<template>
  <IconCheck v-if="compliant" class="w-5 h-5 text-green-500" />
  <IconBan v-else-if="indeterminate" class="w-5 h-5 text-cool-gray-500" />
  <IconXCircle v-else class="w-5 h-5 text-red-500" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconCheck from '@/components/Icons/Check.vue'
import IconXCircle from '@/components/Icons/XCircle.vue'
import IconBan from '@/components/Icons/Ban.vue'

export default defineComponent({
  name: 'ComplianceIcon',
  components: {
    IconCheck,
    IconXCircle,
    IconBan
  },
  props: {
    compliant: {
      type: Boolean
    }
  },
  computed: {
    indeterminate(): boolean {
      return typeof this.compliant === 'undefined'
    }
  }
})
</script>
