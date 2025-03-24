import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { AxiosError } from 'axios'
import { AuthService } from '../services/AuthService'
import type { UserLogin, UserRegister, User } from './../types'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null> = ref(null)
  const token: Ref<string | null> = ref(null)
  const error: Ref<string> = ref('')
  const loading: Ref<boolean> = ref(false)

  const router = useRouter()

  const login = async (payload: UserLogin) => {
    try {
      loading.value = true
      const response = await AuthService.login(payload)

      if (!response?.data.access_token) return

      token.value = response?.data.access_token
      user.value = {
        id: response?.data.id,
        username: response?.data.username,
        email: response?.data.email,
        password: response?.data.password
      }
      localStorage.setItem('token', response?.data.access_token)
      router.push('/')

      loading.value = false
    } catch (error) {
      loading.value = false
      return (error as AxiosError).response
    }
  }

  const register = async (payload: UserRegister) => {
    try {
      loading.value = true
      const response = await AuthService.register(payload)

      if (response?.status === 400) {
        error.value = response?.data.message
        return
      }

      router.push('/')
      loading.value = false
    } catch (error) {
      loading.value = false
      return (error as AxiosError).response
    }
  }

  const logout = async (): Promise<void | unknown> => {
    try {
      const response = await AuthService.logout()

      if (response?.status === 201) {
        token.value = null
        localStorage.removeItem('token')
        router.push('/login')
      }
    } catch (error) {
      return (error as AxiosError).response
    }
  }

  return {
    register,
    login,
    logout,
    token,
    user,
    error
  }
})
