import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'SignupPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/signup',
  component: () => import('@/interfaces/auth/pages/SignupPage.vue'),
  meta: {
    head: 'Sign Up',
    layout: 'headless'
  }
}
