import HttpCLient from '@/shared/httpClient'

const pathToLogin = '/auth/login'
const pathToUsers = '/users'

const authService = new HttpCLient()

class AuthService {
  public async login(email: string, password: string) {
    try {
      const response = await authService.post(pathToLogin, { email, password })
      return response
    } catch (error) {
      console.error('Error login request:', error)
      throw error
    }
  }

  public async register(username: string, password: string, email: string) {
    try {
      const response = await authService.post(pathToUsers, { email, password })
      return response
    } catch (error) {
      console.error('Error register request:', error)
      throw error
    }
  }

  public async hello() {
    try {
      const response = await authService.post('/hello', 'test')
      return response
    } catch (error) {
      console.error('Error hello request:', error)
      throw error
    }
  }

  async logout() {
    localStorage.removeItem('token')
  }
}

export default new AuthService()
