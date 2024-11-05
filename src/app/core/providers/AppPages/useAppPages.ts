import { inject } from 'vue'
import { AppProviders } from '@/app/core/providers/types'
import { throwInjectError } from '@/app/shared/lib/utils/errors'

export function useAppPages() {
  const appPages = inject(AppProviders.AppPages)

  if (!appPages) {
    throwInjectError('AppPages')
  }

  return appPages
}
