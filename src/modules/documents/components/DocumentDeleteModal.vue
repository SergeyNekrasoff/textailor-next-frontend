<template>
  <BaseModal @close="$emit('close')">
    <div class="modal">
      <div ref="modalRef" class="modal__inner">
        <div class="modal__header">
          <div class="text-lg font-[200] leading-none tracking-tight mb-2">
            Сonfirm <span class="font-semibold">{{ document?.title }}</span> for delete?
          </div>
        </div>
        <div class="modal__footer">
          <BaseButton
            v-if="document?.id"
            class="bg-red_dark mr-2 w-1/2 text-center hover:bg-indigo"
            social
            @click="handleDeleteDocument(document.id)"
          >
            <template v-if="loading">
              <SpinnerLoader :size="'sm'" />
            </template>
            <template v-else> Delete </template>
          </BaseButton>
          <BaseButton class="w-1/2 text-center" solid center @click="$emit('close')">
            Cancel
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import BaseModal from '@/shared/components/base/BaseModal.vue'
import BaseButton from '@/shared/components/base/BaseButton.vue'
import SpinnerLoader from '@/shared/components/base/SpinnerLoader.vue'
import { useDocumentsStore } from '@/modules/documents/store/DocumentsStore'
import { useDeleteDocModal } from '@/modules/documents/composables/useDeleteDocModal'

const apiDocumentsStore = useDocumentsStore()
const { deleteDocument } = useDocumentsStore()
const { loading } = storeToRefs(apiDocumentsStore)
const storeDeleteDocument = useDeleteDocModal()
const { document } = storeToRefs(storeDeleteDocument)

const emit = defineEmits(['close'])

const modalRef: Ref<HTMLElement | null> = ref(null)

onClickOutside(modalRef, () => {
  emit('close')
})

const handleDeleteDocument = async (id: number) => {
  await deleteDocument(id)
  emit('close')
}
</script>

<style lang="scss" scoped>
.modal {
  @apply fixed inset-x-0 inset-y-0 z-[100];
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);

  &__inner {
    @apply flex flex-col justify-between items-center gap-1 bg-black_mute w-[420px] h-[200px] absolute inset-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg p-6;
  }

  &__body {
    @apply w-full flex justify-center;
  }

  &__footer {
    @apply w-full flex;
  }

  &__header {
    @apply w-full flex flex-col items-center justify-center mb-2;
  }
}
</style>
