export interface DocumentRequest {
  title: string
  content: string
}

export interface UpdateDocumentRequest {
  id?: number | undefined
  title?: string | undefined
  content: string
}

export interface DocumentResponseData {
  id: number
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface DocumentResponse<T> {
  data: T
  status?: number
  message?: string
}
