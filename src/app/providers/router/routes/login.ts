import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'LoginPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/login',
  component: () => import('@/interfaces/login/pages/LoginPage.vue'),
  meta: {
    head: 'Login',
    layout: 'headless'
  }
}
