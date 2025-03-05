import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'DocumentPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/document/:id',
  component: () => import('@/interfaces/documents/pages/DocumentPage.vue'),
  meta: {
    head: 'DOCUMENT'
  }
}
