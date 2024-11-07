import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'DashboardPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/',
  component: () => import('@/interfaces/dashboard/pages/DashboardPage.vue'),
  meta: {
    head: 'DASHBOARD'
    // layout: 'empty'
  }
}
