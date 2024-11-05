import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'SettingsPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/settings',
  component: () => import('@/pages/settings'),
  meta: {
    head: 'SETTINGS'
  }
}
