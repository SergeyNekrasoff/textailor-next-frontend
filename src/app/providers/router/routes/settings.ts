import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'SettingsPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/settings',
  component: () => import('@/interfaces/settings/pages/SettingsPage.vue'),
  meta: {
    head: 'SETTINGS'
  }
}
