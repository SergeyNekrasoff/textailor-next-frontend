import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'TemplatesPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/templates',
  component: () => import('@/pages/templates'),
  meta: {
    head: 'TEMPLATES'
  }
}
