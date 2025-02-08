import type { RouteRecordRaw } from 'vue-router'
// import { unAuthGuard } from '../guard'

export const routeName = 'SignupPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/signup',
  // beforeEnter: unAuthGuard,
  component: () => import('@/interfaces/auth/pages/SignupPage.vue'),
  meta: {
    head: 'Sign Up',
    requiresAuth: false,
    layout: 'headless'
  }
}
