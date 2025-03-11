<template>
  <BaseModal @close="$emit('close')">
    <div class="modal">
      <div ref="modalRef" class="modal__inner">
        <div class="modal__header">
          <div class="text-lg font-semibold leading-none tracking-tight mb-2">New document</div>
          <BaseFormInput
            v-model="title"
            class="my-2"
            name="title"
            placeholder="Enter document name"
          />
        </div>
        <div class="modal__footer">
          <BaseButton
            class="bg-indigo_soft mr-2 w-1/2 text-center hover:bg-indigo"
            social
            :disabled="title === ''"
            @click="createNewDocument"
          >
            <template v-if="loading">
              <SpinnerLoader :size="'sm'" />
            </template>
            <template v-else> Create </template>
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
import BaseFormInput from '@/shared/components/base/BaseFormInput.vue'
import BaseButton from '@/shared/components/base/BaseButton.vue'
import SpinnerLoader from '@/shared/components/base/SpinnerLoader.vue'
import { useDocumentsStore } from '@/modules/documents/store/DocumentsStore'

const apiDocumentsStore = useDocumentsStore()
const { createDocument } = useDocumentsStore()
const { loading } = storeToRefs(apiDocumentsStore)

const emit = defineEmits(['close'])

const modalRef: Ref<HTMLElement | null> = ref(null)
const title: Ref<string> = ref('')

onClickOutside(modalRef, () => {
  emit('close')
})

const createNewDocument = async () => {
  await createDocument({
    title: title.value,
    content: ''
  })
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
