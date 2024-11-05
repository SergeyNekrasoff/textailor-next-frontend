import { defineStore } from 'pinia'
import { useResizeObserver } from '@/app/shared/lib/use/useResizeObserver'

const namespace = 'app'

export const useAppStore = defineStore(namespace, () => {
  const { screenWidth } = useResizeObserver(document.body)

  return {
    screenWidth
  }
})
