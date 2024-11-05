import type { InjectionKey } from 'vue'
import type { AppRoutes } from './AppRoutes'
import type { AppPages } from './router'

export const AppProviders = {
  AppRoutes: Symbol() as InjectionKey<typeof AppRoutes>,
  AppPages: Symbol() as InjectionKey<typeof AppPages>
}
