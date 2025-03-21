<template>
  <BaseModal @close="$emit('close')">
    <div class="modal">
      <div ref="modalRef" class="modal__inner">
        <div class="modal__header">
          <ExclamationTriangleIcon class="h-6 w-6 mr-2 text-tt" />
          <div class="text-lg font-[600] leading-none tracking-tight">Delete account</div>
        </div>
        <div class="modal__body">
          <p class="mb-4 font-[200]">
            Are you sure? This action is <strong class="font-[600]">permanent</strong> and cannot be
            undone.
          </p>
          <p class="mb-4 font-[200]">
            You will immediately lose access to all your account, data, remaining credits/words and
            content. If you have an active subscription, you will lose access to it. There are no
            refunds.
          </p>
          <p class="mb-8 font-[200]">
            You won't be able to log back in or sign up with the same email again.
          </p>
          <p class="mb-2 font-[600]">To confirm deletion, type "delete" (all lowercase) below</p>
          <BaseFormInput v-model="confirm" name="input" placeholder="" />
        </div>
        <div class="modal__footer">
          <BaseButton
            class="bg-red_dark mr-2 w-[120px] text-center hover:bg-indigo"
            social
            :disabled="!confirm"
            @click="handleDelete"
          >
            <template v-if="false">
              <SpinnerLoader :size="'sm'" />
            </template>
            <template v-else> Delete </template>
          </BaseButton>
          <BaseButton class="w-[120px] text-center" solid center @click="$emit('close')">
            Cancel
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { ExclamationTriangleIcon } from '@/shared/components/icons'
import { onClickOutside } from '@vueuse/core'
import BaseModal from '@/shared/components/base/BaseModal.vue'
import BaseFormInput from '@/shared/components/base/BaseFormInput.vue'
import BaseButton from '@/shared/components/base/BaseButton.vue'
import SpinnerLoader from '@/shared/components/base/SpinnerLoader.vue'
// import { useDocumentsStore } from '@/modules/documents/store/DocumentsStore'

// const apiDocumentsStore = useDocumentsStore()
// const { deleteDocument } = useDocumentsStore()
const emit = defineEmits(['close'])

const modalRef: Ref<HTMLElement | null> = ref(null)
const confirm: Ref<string> = ref('')

onClickOutside(modalRef, () => {
  emit('close')
})

const handleDelete = async () => {
  // await deleteDocument(id)
  console.log(`delete user`)
  emit('close')
}
</script>

<style lang="scss" scoped>
.modal {
  @apply fixed inset-x-0 inset-y-0 z-[100];
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);

  &__inner {
    @apply flex flex-col justify-start items-center gap-1 bg-black_mute w-[520px] min-h-[380px] absolute inset-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg p-6;
  }

  &__body {
    @apply w-full flex flex-col justify-start items-start text-sm;
  }

  &__footer {
    @apply w-full flex justify-end mt-4;
  }

  &__header {
    @apply w-full flex flex-row items-center justify-start mb-4;
  }
}
</style>
