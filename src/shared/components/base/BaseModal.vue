<template>
  <teleport :to="targetTeleport">
    <div class="modal">
      <div ref="modalRef" class="modal__inner">
        <div v-if="$slots.header" class="modal__header">
          <slot name="header"></slot>
        </div>
        <div class="modal__body">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="modal__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { targetTeleport } from '@/shared/lib/use/useModal'
import { onClickOutside } from '@vueuse/core'

const emit = defineEmits(['close'])
const modalRef = ref()

onClickOutside(modalRef, () => {
  emit('close')
})
</script>
