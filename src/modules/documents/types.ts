export interface DocumentRequest {
  title: string
  content: string
}

export interface UpdateDocumentRequest extends DocumentRequest {
  id: string
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
  status: number
  message: string
}
