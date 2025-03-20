import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'BillingPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/settings/billing',
  component: () => import('@/interfaces/billing/pages/BillingPage.vue'),
  meta: {
    head: 'BILLING'
  }
}
