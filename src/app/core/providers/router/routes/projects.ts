import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'ProjectsPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/projects',
  component: () => import('@/pages/projects'),
  meta: {
    head: 'PROJECTS'
  }
}
