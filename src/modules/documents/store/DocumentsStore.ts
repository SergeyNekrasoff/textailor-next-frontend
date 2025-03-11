import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import type { Ref } from 'vue'
import type { AxiosError } from 'axios'
import { DocumentsService } from '../services/documents'
import type { DocumentRequest, UpdateDocumentRequest, DocumentResponseData } from '../types'

export const useDocumentsStore = defineStore('documents', () => {
  const document: Ref<DocumentResponseData | null> = shallowRef(null)
  const documents: Ref<DocumentResponseData[] | []> = ref([])
  const loading: Ref<boolean> = ref(false)

  const router = useRouter()

  const createDocument = async (payload: DocumentRequest) => {
    try {
      loading.value = true
      const response = (await DocumentsService.createDocument(payload)) as DocumentResponseData

      if (!response) return

      document.value = response

      router.push({
        name: 'DocumentPage',
        params: { id: response.id }
      })

      loading.value = false
    } catch (error) {
      loading.value = false
      return (error as AxiosError).response
    }
  }

  const getDocument = async (id: string) => {
    try {
      loading.value = true
      const response = (await DocumentsService.getDocumentById(id)) as DocumentResponseData

      console.log(`createDocument data: ${JSON.stringify(response)}`)
      loading.value = false
    } catch (error) {
      loading.value = false
      return (error as AxiosError).response
    }
  }

  const getDocuments = async () => {
    try {
      loading.value = true
      const response = (await DocumentsService.getAllDocuments()) as DocumentResponseData[]

      if (!response) return

      documents.value = response as DocumentResponseData[]
      loading.value = false
    } catch (error) {
      loading.value = false
      return (error as AxiosError).response
    }
  }

  const updateDocument = async (payload: UpdateDocumentRequest) => {
    try {
      loading.value = true
      const response = (await DocumentsService.updateDocument(payload)) as DocumentResponseData

      console.log(`getDocument data: ${JSON.stringify(response)}`)
      loading.value = false
    } catch (error) {
      loading.value = false
      return (error as AxiosError).response
    }
  }

  const deleteDocument = async (id: number) => {
    try {
      loading.value = true
      await DocumentsService.deleteDocument(id)

      loading.value = false
      await getDocuments()
    } catch (error) {
      loading.value = false
      return (error as AxiosError).response
    }
  }

  return {
    document,
    documents,
    createDocument,
    getDocument,
    getDocuments,
    updateDocument,
    deleteDocument,
    loading
  }
})
