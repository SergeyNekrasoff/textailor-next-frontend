<template>
  <BaseModal @close="$emit('close')">
    <div class="modal">
      <div ref="modalRef" class="modal__inner">
        <div class="modal__header">
          <div class="text-lg font-semibold leading-none tracking-tight mb-2">
            Invite your friends
          </div>
          <span class="text-sm text-muted-foreground">
            Share textailor.io with your friends and get rewarded!
          </span>
        </div>
        <div class="modal__body">
          <slot> </slot>
        </div>
        <button
          type="button"
          class="modal__btn"
          kind="outline"
          theme="gray"
          @click="$emit('close')"
        >
          <XMarkIcon :size="'size-6'" class="h-5 w-5 mr-2 text-gray_light_4" />
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { XMarkIcon } from '@/shared/components/icons'
import { onClickOutside } from '@vueuse/core'

import BaseModal from './BaseModal.vue'

const emit = defineEmits(['close'])

const modalRef = ref()

onClickOutside(modalRef, () => {
  emit('close')
})
</script>

<style lang="scss" scoped>
.modal {
  @apply fixed inset-x-0 inset-y-0 z-50;
  background: rgba(0, 0, 0, 0.8);

  &__inner {
    @apply flex flex-col justify-between items-center gap-1 bg-black_mute w-[620px] min-h-[180px] max-h-[420px] absolute inset-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg p-6;
  }

  &__body {
    @apply w-full flex justify-center;
  }

  &__footer {
    @apply w-full flex gap-0.5 py-5 px-4 bg-gray rounded-b-lg;
  }

  &__header {
    @apply w-full flex flex-col items-start justify-center;
  }

  &__btn {
    position: absolute;
    right: 4px;
    top: 10px;
  }
}
</style>
