import { defineStore } from 'pinia'
import type { User } from '../types'

export interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: () =>
    <AuthState>{
      user: null,
      token: null
    },

  getters: {
    isAuthenticated: state => !!state.token && !!state.user
  },

  actions: {
    setUser(user: User) {
      this.user = user
    },

    setToken(token: string) {
      this.token = token
    },

    clearAuth() {
      this.user = null
      this.token = null
    }
  }
})
