import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'DocumentPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/documents/:id',
  component: () => import('@/interfaces/documents/pages/DocumentPage.vue'),
  meta: {
    head: 'DOCUMENT'
  }
}
