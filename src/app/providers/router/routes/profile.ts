import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'ProfilePage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/settings/profile',
  component: () => import('@/interfaces/profile/pages/ProfilePage.vue'),
  meta: {
    head: 'PROFILE'
  }
}
