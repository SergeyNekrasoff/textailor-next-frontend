import { defineAsyncComponent, ref, type Ref } from 'vue'
import { useModal } from '@/shared/lib/use/useModal'
import { defineStore } from 'pinia'
import type { AccountRequest } from '../types'
const AccountDeleteModal = defineAsyncComponent(
  () => import('@/interfaces/profile/components/AccountDeleteModal.vue')
)

const modal = useModal()

export const useDeleteAccountModal = defineStore('deleteAccount', () => {
  const account: Ref<AccountRequest | null> = ref(null)

  const openModal = async (accountData: AccountRequest) => {
    account.value = accountData
    modal.show({ component: AccountDeleteModal })
  }

  return {
    openDeleteAccountModal: openModal,
    account
  }
})
