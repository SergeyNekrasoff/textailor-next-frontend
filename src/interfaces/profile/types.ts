export interface AccountRequest {
  username: string
  email: string
  password: string
}

export interface AccountResponse {
  id?: number
  username: string
  password: string
  email: string
}
