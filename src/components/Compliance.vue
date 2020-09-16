<template>
  <div class="font-bold text-cool-gray-900">
    <div>
      <span
        class="block text-xs font-semibold tracking-wide text-cool-gray-500"
      >
        Small Text
      </span>

      <div class="flex justify-between">
        <div class="flex items-center">
          <ComplianceIcon :compliant="compliance?.small.aa" />
          <span class="inline-block ml-1">AA</span>
        </div>
        <div class="flex items-center">
          <ComplianceIcon :compliant="compliance?.small.aaa" />
          <span class="inline-block ml-1">AAA</span>
        </div>
      </div>
    </div>

    <div class="mt-3">
      <span
        class="block text-xs font-semibold tracking-wide text-cool-gray-500"
      >
        Large Text
      </span>

      <div class="flex justify-between">
        <div class="flex items-center">
          <ComplianceIcon :compliant="compliance?.large.aa" />
          <span class="inline-block ml-1">AA</span>
        </div>
        <div class="flex items-center">
          <ComplianceIcon :compliant="compliance?.large.aaa" />
          <span class="inline-block ml-1">AAA</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { WCAGCompliant } from '@/utils'

import ComplianceIcon from '@/components/ComplianceIcon.vue'

export default defineComponent({
  name: 'Compliance',
  components: {
    ComplianceIcon
  },
  props: {
    compliance: {
      type: Object as PropType<WCAGCompliant> | null
    }
  }
})
</script>
