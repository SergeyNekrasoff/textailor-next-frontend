import { inject } from 'vue'
import { AppProviders } from '@/app/core/providers/types'
import { throwInjectError } from '@/app/shared/lib/utils/errors'

export function useAppRoutes() {
  const appRoutes = inject(AppProviders.AppRoutes)

  if (!appRoutes) {
    throwInjectError('AppRoutes')
  }

  return appRoutes
}
