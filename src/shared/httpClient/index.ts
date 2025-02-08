import axios, { type AxiosInstance, type AxiosError, type AxiosRequestConfig } from 'axios'

export interface ApiClientConfig {
  baseURL?: string
  timeout?: number
}

export interface ApiError {
  status: number
  message: string
}

class HttpClient {
  private instance: AxiosInstance

  constructor(config: ApiClientConfig = {}) {
    const defaultConfig: ApiClientConfig = {
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 5000
    }

    this.instance = axios.create({
      ...defaultConfig,
      ...config
    })

    this.initializeInterceptors()
  }

  private initializeInterceptors(): void {
    this.instance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token')

        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      (error: AxiosError) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token')
          window.location.href = '/login'
        }

        return Promise.reject(error)
      }
    )
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config)
  }

  public post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config)
  }

  public put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config)
  }

  public delete<T>(url: string, config: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config)
  }
}

export default HttpClient
