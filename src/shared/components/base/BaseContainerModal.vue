<template>
  <div class="modals-container">
    <component
      :is="modal.component"
      v-for="modal in modals"
      :key="modal.id"
      @close="hide(modal.id)"
    >
    </component>
  </div>
</template>

<script setup lang="ts">
import { useModal } from '@/shared/lib/use/useModal'

const { modals, hide } = useModal()
</script>
