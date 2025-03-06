import { HttpClient } from '@/shared/httpClient/index'
import type { GenerateChatDto } from '../types'
import type { AxiosError } from 'axios'

const httpClient = new HttpClient()

export const chatService = {
  async generateResponse(payload: GenerateChatDto): Promise<string | unknown> {
    try {
      const response = await httpClient.post('/chat', payload)
      return response
    } catch (error) {
      return (error as AxiosError).response
    }
  }
}
