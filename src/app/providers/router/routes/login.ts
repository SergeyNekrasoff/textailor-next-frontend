import type { RouteRecordRaw } from 'vue-router'
// import { unAuthGuard } from '../guard'

export const routeName = 'LoginPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/login',
  // beforeEnter: unAuthGuard,
  component: () => import('@/interfaces/auth/pages/LoginPage.vue'),
  meta: {
    head: 'Login',
    requiresAuth: false,
    layout: 'headless'
  }
}
