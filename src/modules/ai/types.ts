export interface GenerateChatDto {
  prompt: string
  model?: string
  maxTokens?: number
  temperature?: number
}
