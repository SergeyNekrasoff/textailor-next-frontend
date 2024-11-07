import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'NotFoundPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/:pathMatch(.*)*',
  component: () => import('@/interfaces/not-found/pages/NotFoundPage.vue'),
  meta: {
    head: 'NOT FOUND',
    layout: 'empty'
  }
}
