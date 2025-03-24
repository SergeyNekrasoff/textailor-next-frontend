import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useAuthStore } from '@/modules/auth/store/AuthStore'
import { storeToRefs } from 'pinia'

export { pages as AppPages } from './pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const { token } = storeToRefs(authStore)

  if (!to.meta.requiresAuth) {
    return next()
  }

  if (token.value) {
    next()
  } else {
    next('/login')
  }
})

export default router
