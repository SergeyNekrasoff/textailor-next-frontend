const DocumentCreateModal = defineAsyncComponent(
  () => import('../components/DocumentCreateModal.vue')
)
import { defineAsyncComponent } from 'vue'
import { useModal } from '@/shared/lib/use/useModal'

const modal = useModal()

export function useCreateDocModal() {
  const openModal = async () => {
    modal.show({ component: DocumentCreateModal })
  }

  return {
    openCreateDocModal: openModal
  }
}
