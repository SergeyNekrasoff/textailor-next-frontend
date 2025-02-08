import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
// import { useAuthStore } from '@/modules/auth/store/AuthStore'

export { pages as AppPages } from './pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()

//   if (to.meta.requiresAuth && !authStore.isAuth) {
//     next({ name: 'LoginPage' })
//   } else {
//     next()
//   }
// })

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()

//   if (to.name !== 'LoginPage' && !authStore.isAuth) {
//     next({ name: 'LoginPage' })
//   } else {
//     next({ name: 'DashboardPage' })
//   }
// })

export default router
