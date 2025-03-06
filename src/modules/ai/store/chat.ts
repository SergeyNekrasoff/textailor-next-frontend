import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import type { GenerateChatDto } from '../types'
import { chatService } from '../services/chat'
import { ref, type Ref } from 'vue'

interface ListItem {
  id: number
  text: string
}

interface Response {
  data: string
}

export const useChatStore = defineStore('chat', () => {
  const news: Ref<ListItem[]> = ref([])
  const loadingNews: Ref<boolean> = ref(false)

  const getGenerateContent = async (payload: GenerateChatDto) => {
    try {
      const response = await chatService.generateResponse(payload)

      console.log(`response: ${JSON.stringify(response)}`)
    } catch (error) {
      return (error as AxiosError).response
    }
  }

  const getNewsTitles = async (payload: GenerateChatDto) => {
    try {
      loadingNews.value = true
      const response = (await chatService.generateResponse(payload)) as Response

      if (!response) return

      news.value = formatStringToHtml(response.data)
      loadingNews.value = false
    } catch (error) {
      loadingNews.value = false
      return (error as AxiosError).response
    }
  }

  const formatStringToHtml = (data: string) => {
    return data
      .split('\n')
      .map((line: string) => {
        const match = line.match(/^(\d+)\. \"(.*)\"$/)

        if (!match) return null

        return {
          id: parseInt(match[1]),
          text: match[2]
        }
      })
      .filter((item): item is ListItem => item !== null)
  }

  return {
    getGenerateContent,
    getNewsTitles,
    news,
    loadingNews
  }
})
