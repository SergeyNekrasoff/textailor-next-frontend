import axios from 'axios'
import { APP_BASE_URL } from '@/shared/config'
// import type { User } from '../types'

export class AuthService {
  private api = axios.create({
    baseURL: APP_BASE_URL || 'http://localhost:3000'
  })

  public login(username: string, password: string) {
    return this.api.post('/auth/login', { username, password })
  }

  public register(username: string, password: string, email: string) {
    this.api.post('/users', { username, password, email })
  }

  public logout(): void {
    localStorage.removeItem('token')
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token')
    return !!token
  }
}
