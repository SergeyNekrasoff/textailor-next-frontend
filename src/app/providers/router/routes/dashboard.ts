import type { RouteRecordRaw } from 'vue-router'
// import { authGuard } from '../guard'

export const routeName = 'DashboardPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/',
  // beforeEnter: authGuard,
  component: () => import('@/interfaces/dashboard/pages/DashboardPage.vue'),
  meta: {
    head: 'DASHBOARD',
    requiresAuth: false
  }
}
