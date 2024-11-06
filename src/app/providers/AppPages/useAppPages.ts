import { inject } from 'vue'
import { AppProviders } from '@/app/providers/types'
import { throwInjectError } from '@/shared/lib/utils/errors'

export function useAppPages() {
  const appPages = inject(AppProviders.AppPages)

  if (!appPages) {
    throwInjectError('AppPages')
  }

  return appPages
}
