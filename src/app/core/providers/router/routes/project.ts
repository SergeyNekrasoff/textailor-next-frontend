import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'ProjectPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/projects/:id',
  component: () => import('@/pages/project'),
  meta: {
    head: 'PROJECT'
  }
}
