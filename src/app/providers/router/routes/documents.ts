import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'DocumentsPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/documents',
  component: () => import('@/interfaces/documents/pages/DocumentsPage.vue'),
  meta: {
    head: 'DOCUMENTS'
  }
}
