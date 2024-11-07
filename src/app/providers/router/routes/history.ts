import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'HistoryPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/history',
  component: () => import('@/interfaces/history/pages/HistoryPage.vue'),
  meta: {
    head: 'HISTORY'
  }
}
