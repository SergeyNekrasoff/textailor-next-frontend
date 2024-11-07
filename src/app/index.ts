import { createApp } from 'vue'
import { router, store } from './providers'
import App from './App.vue'
// import { ApiUserRepository } from '@/modules/user/repositories/user.repository'
// import { UserService } from '@/modules/user/store/user.service'

// const instanceApp = createApp(App)

// Global services
// instanceApp.config.globalProperties.$userService = new UserService(new ApiUserRepository())

// export const app = instanceApp.use(router).use(store)
export const app = createApp(App).use(router).use(store)
