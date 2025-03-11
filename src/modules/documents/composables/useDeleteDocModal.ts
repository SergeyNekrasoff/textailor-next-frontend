const DocumentDeleteModal = defineAsyncComponent(
  () => import('../components/DocumentDeleteModal.vue')
)
import { defineAsyncComponent, ref, type Ref } from 'vue'
import { useModal } from '@/shared/lib/use/useModal'
import { defineStore } from 'pinia'
import type { DocumentResponseData } from '../types'

const modal = useModal()

export const useDeleteDocModal = defineStore('deleteDocument', () => {
  const document: Ref<DocumentResponseData | null> = ref(null)

  const openModal = async (doc: DocumentResponseData) => {
    document.value = doc
    modal.show({ component: DocumentDeleteModal })
  }

  return {
    openDeleteDocModal: openModal,
    document
  }
})
