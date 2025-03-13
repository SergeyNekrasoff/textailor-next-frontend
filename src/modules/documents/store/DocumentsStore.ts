import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import type { Ref } from 'vue'
import type { AxiosError } from 'axios'
import { DocumentsService } from '../services/documents'
import type { DocumentRequest, UpdateDocumentRequest, DocumentResponseData } from '../types'

export const useDocumentsStore = defineStore('documents', () => {
  const documentRef: Ref<DocumentResponseData | null> = shallowRef(null)
  const documents: Ref<DocumentResponseData[] | null> = shallowRef(null)
  const loading: Ref<boolean> = ref(false)

  const router = useRouter()

  const document = computed({
    get: () => documentRef.value,
    set: (value: DocumentResponseData) => {
      documentRef.value = {
        ...documentRef.value,
        id: value.id,
        title: value.title,
        content: value.content,
        createdAt: value.createdAt,
        updatedAt: value.updatedAt
      }
    }
  })
  const documentTitle = computed(() => documentRef.value?.title)
  const documentId = computed(() => documentRef.value?.id)

  const createDocument = async (payload: DocumentRequest) => {
    try {
      loading.value = true
      const response = (await DocumentsService.createDocument(payload)) as DocumentResponseData

      if (!response) return

      document.value = response.data

      router.push({
        name: 'DocumentPage',
        params: { id: response.data.id }
      })

      loading.value = false
    } catch (error) {
      loading.value = false
      return (error as AxiosError).response
    }
  }

  const getDocument = async (id: number) => {
    try {
      loading.value = true
      const response = (await DocumentsService.getDocumentById(id)) as DocumentResponseData

      document.value = response.data
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

      documents.value = response.data
      loading.value = false
    } catch (error) {
      loading.value = false
      return (error as AxiosError).response
    }
  }

  const updateDocument = async (payload: UpdateDocumentRequest) => {
    console.log(`content: ${JSON.stringify(payload)}`)
    try {
      loading.value = true
      ;(await DocumentsService.updateDocument(payload)) as DocumentResponseData

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
    documentRef,
    documentTitle,
    documentId,
    documents,
    createDocument,
    getDocument,
    getDocuments,
    updateDocument,
    deleteDocument,
    loading
  }
})
