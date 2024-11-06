import { inject } from 'vue'
import { AppProviders } from '@/app/providers/types'
import { throwInjectError } from '@/shared/lib/utils/errors'

export function useAppRoutes() {
  const appRoutes = inject(AppProviders.AppRoutes)

  if (!appRoutes) {
    throwInjectError('AppRoutes')
  }

  return appRoutes
}
