import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import AuthService from '../services/AuthService'

export const useAuthStore = defineStore('auth', () => {
  const token: Ref<string | null> = ref(null)
  const isAuthenticated: Ref<boolean> = ref(false)

  const login = async (email: string, password: string) => {
    try {
      const { data } = await AuthService.login(email, password)

      if (data) {
        token.value = data.access_token
        isAuthenticated.value = true
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = async () => {
    await AuthService.logout()
    isAuthenticated.value = false
    token.value = null
  }

  const getToken = (): string | null => {
    // const token = localStorage.getItem('token')
    // return !!token
    return token.value
  }

  const isAuth = computed(() => !!isAuthenticated.value)

  return {
    login,
    logout,
    getToken,
    isAuth,
    token
  }
})
