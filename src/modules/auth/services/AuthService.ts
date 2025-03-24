import { HttpClient } from '@/shared/httpClient/index'
import type { AxiosError } from 'axios'
import type { UserLogin, UserRegister } from '../types'

const httpClient = new HttpClient()

export const AuthService = {
  async login(user: UserLogin) {
    try {
      const response = await httpClient.post('/auth/login', {
        email: user.email,
        password: user.password
      })
      return response
    } catch (error) {
      return (error as AxiosError).response
    }
  },

  async register(user: UserRegister) {
    try {
      const response = await httpClient.post('/auth/register', {
        username: user.username,
        email: user.email,
        password: user.password
      })
      return response
    } catch (error) {
      return (error as AxiosError).response
    }
  },

  async logout(): Promise<void | unknown> {
    try {
      const response = await httpClient.post('/auth/logout')
      return response
    } catch (error) {
      return (error as AxiosError).response
    }
  }
}
