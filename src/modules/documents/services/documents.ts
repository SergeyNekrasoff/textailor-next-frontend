import { HttpClient } from '@/shared/httpClient/index'
import type { DocumentRequest, UpdateDocumentRequest, DocumentResponseData } from '../types'
import type { AxiosError } from 'axios'

const httpClient = new HttpClient()

export const DocumentsService = {
  async createDocument(payload: DocumentRequest): Promise<DocumentResponseData | unknown> {
    try {
      const response = (await httpClient.post('/documents', payload)) as DocumentResponseData
      return response
    } catch (error) {
      return (error as AxiosError).response
    }
  },

  async getDocumentById(id: string): Promise<DocumentResponseData | unknown> {
    try {
      const response = (await httpClient.get(`/documents/${id}`)) as DocumentResponseData
      return response
    } catch (error) {
      return (error as AxiosError).response
    }
  },

  async getAllDocuments(): Promise<DocumentResponseData[] | [] | unknown> {
    try {
      const response = (await httpClient.get('/documents')) as DocumentResponseData[]
      return response
    } catch (error) {
      return (error as AxiosError).response
    }
  },

  async updateDocument(payload: UpdateDocumentRequest): Promise<DocumentResponseData | unknown> {
    try {
      const response = (await httpClient.put(`/documents/${payload.id}`, {
        title: payload.title,
        content: payload.content
      })) as DocumentResponseData
      return response
    } catch (error) {
      return (error as AxiosError).response
    }
  },

  async deleteDocument(id: number): Promise<void | unknown> {
    try {
      const response = (await httpClient.delete(`/documents/${id}`)) as DocumentResponseData
      return response
    } catch (error) {
      return (error as AxiosError).response
    }
  }
}
