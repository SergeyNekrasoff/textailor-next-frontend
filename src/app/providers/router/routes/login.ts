import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'LoginPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/login',
  component: () => import('@/interfaces/auth/pages/LoginPage.vue'),
  meta: {
    head: 'Login',
    requiresAuth: false,
    layout: 'headless'
  }
}
