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

interface ResponseGeneratedData {
  title: string
  subtitle?: string
  abstract?: string
  content: string | string[]
}

export const useChatStore = defineStore('chat', () => {
  const news: Ref<ListItem[]> = ref([])
  const responseChat: Ref<ResponseGeneratedData | null> = ref(null)
  const loading: Ref<boolean> = ref(false)

  const getGenerateContent = async (payload: GenerateChatDto) => {
    try {
      loading.value = true
      const response = (await chatService.generateResponse(payload)) as Response

      if (!response) return

      await formatResponseDataToObject(response.data, payload?.prompt)
        .then(response => {
          responseChat.value = {
            ...responseChat.value,
            title: response.title,
            subtitle: response.subtitle,
            abstract: response.abstract,
            content: response.content
          }
        })
        .catch(error => console.error(error))

      loading.value = false
    } catch (error) {
      loading.value = false
      return (error as AxiosError).response
    }
  }

  const getNewsTitles = async (payload: GenerateChatDto) => {
    try {
      loading.value = true
      const response = (await chatService.generateResponse(payload)) as Response

      if (!response) return

      news.value = formatSpecificDataToObject(response.data)
      loading.value = false
    } catch (error) {
      loading.value = false
      return (error as AxiosError).response
    }
  }

  const formatSpecificDataToObject = (data: string) => {
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

  const formatResponseDataToObject = async (
    data: string,
    title: string
  ): Promise<ResponseGeneratedData> => {
    return new Promise((resolve, reject) => {
      try {
        const sections = data.split('\n\n')

        const result = {
          title: title,
          subtitle: sections[0]?.startsWith('Title: ') ? sections[0].replace('Title: ', '') : '',
          abstract: sections[1]?.startsWith('Abstract: ')
            ? sections[1].replace('Abstract: ', '')
            : '',
          content: sections
        }

        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }

  const clearResponse = async (): Promise<null> => {
    return new Promise(resolve => {
      responseChat.value = null
      resolve(null)
    })
  }

  return {
    getGenerateContent,
    getNewsTitles,
    clearResponse,
    news,
    loading,
    responseChat
  }
})
