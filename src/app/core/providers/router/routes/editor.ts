import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'EditorPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/editor',
  component: () => import('@/pages/editor'),
  meta: {
    head: 'EDITOR'
  }
}
