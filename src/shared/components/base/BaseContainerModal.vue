<template>
  <div class="modals-container">
    <!-- <component
      :is="modal.component"
      v-for="modal in modals"
      :key="modal.id"
      v-model="modal.value"
      v-bind="modal.bind"
      v-on="modal.on"
      @close="hide(modal.id)"
    > -->
    <component
      :is="modal.component"
      v-for="modal in modals"
      :key="modal.id"
      @close="hide(modal.id)"
    >
      <!-- <template v-for="(slot, key) in modal.slots" #[key]>
        <component :is="slot.component" :key="key" v-bind="slot.bind" v-on="slot.on" />
      </template> -->
    </component>
  </div>
</template>

<script setup lang="ts">
import { useModal } from '@/shared/lib/use/useModal'

const { modals, hide } = useModal()
</script>
