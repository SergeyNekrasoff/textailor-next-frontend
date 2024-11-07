import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'TemplatesPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/templates',
  component: () => import('@/interfaces/templates/pages/TemplatesPage.vue'),
  meta: {
    head: 'TEMPLATES'
  }
}
