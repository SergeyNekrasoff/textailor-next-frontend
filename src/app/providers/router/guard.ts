// /* eslint-disable @typescript-eslint/no-unsafe-function-type */
// import { useRouter } from 'vue-router'
// import { useAuthStore } from '@/modules/auth/store/AuthStore'

// // export const authGuard = (to: any, from: any, next: Function) => {
// //   const authStore = useAuthStore()

// //   // if (!authStore.isAuth && !to.path.includes('/login')) {
// //   //   console.log(`1`)
// //   //   next('/login')
// //   // } else {
// //   //   next()
// //   // }
// //   if (to.meta.requiresAuth && !authStore.isAuth) {
// //     next({ name: 'Login' })
// //   } else {
// //     next()
// //   }
// // }

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()

//   if (to.meta.requiresAuth && !authStore.isAuth) {
//     next({ name: 'Login' })
//   } else {
//     next()
//   }
// })

// // export const unAuthGuard = (to: any, from: any, next: Function) => {
// //   const authStore = useAuthStore()

// //   console.log(`authStore.isAuth: ${authStore.isAuth}`)

// //   if (authStore.isAuth && to.path === '/login') {
// //     console.log(`2`)
// //     next('/')
// //   } else {
// //     next()
// //   }
// // }
