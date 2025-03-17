<template>
  <div
    class="mx-auto mt-4 w-[90%] max-w-[1280px] flex flex-col justify-center px-6 py-8 duration-500"
  >
    <div class="flex w-full flex-1 flex-col max-w-screen-xl mx-auto">
      <div class="my-16">
        <div class="flex items-center justify-between">
          <div class="text-2xl mb-4">Documents</div>
        </div>
        <div class="flex items-center justify-between mb-6">
          <div class="w-64">
            <BaseFormInput
              v-model="search"
              :name="'search'"
              :input-type="'text'"
              :border="false"
              placeholder="Enter document name"
              @update:model-value="delayHandleChange"
              @keypress.enter="delayHandleChange"
              @blur="handleBlur"
            >
              <template #prefix>
                <MagnifyingGlassIcon class="h-4 w-4 text-text_dark_2" />
              </template>
              <template v-if="search" #postfix>
                <XCircleIcon
                  class="h-4 w-4 mr-2 text-text_dark_2 cursor-pointer"
                  @click="search = ''"
                />
              </template>
            </BaseFormInput>
          </div>
          <div>
            <BaseSelect
              v-model="sortBy"
              :options="FILTER"
              :placeholder="'Sort by'"
              :position="'bottom'"
            >
              <template v-slot:icon>
                <FunnelIcon class="h-4 w-4 text-gray_dark_1" />
              </template>
            </BaseSelect>
          </div>
        </div>
        <div v-if="notFound" class="flex flex-col items-center justify-center my-4 w-full">
          <ArchiveBoxXMarkIcon :size="'size-10'" class="h-24 w-24 mb-4 text-text_dark_4" />
          <p class="text-xl font-[400] mb-1">Not found</p>
        </div>
        <div
          v-if="sortedDocuments?.length === 0 && !notFound"
          class="flex flex-col items-center justify-center my-4 w-full"
        >
          <DocumentPlusIcon :size="'size-10'" class="h-24 w-24 mb-4 text-text_dark_4" />
          <p class="text-xl font-[400] mb-1">No documents found</p>
          <span class="text-xs font-[400] text-gray_dark_1">
            Get started by creating new document
          </span>

          <BaseButton class="mt-6 bg-text_dark_4" @click="openCreateDocModal">
            <template v-slot:icon>
              <DocumentPlusIcon :size="'size-6'" class="h-4 w-4 mr-2 text-text_dark_2" />
            </template>
            Create new document
          </BaseButton>
        </div>

        <div v-else>
          <div class="grid grid-cols-4 gap-4 w-full">
            <div v-for="(document, index) in sortedDocuments" :key="index" class="h-36 relative">
              <router-link
                :to="{
                  path: `/document/${document.id}`,
                  name: 'DocumentPage',
                  params: { id: document.id },
                  query: { doc: true }
                }"
                class="flex flex-col items-start justify-between border bg-divider_light_2 border-black_mute rounded-lg h-full w-full p-3 hover:bg-gray_dark_4 transition ease-in-out delay-20"
              >
                <div
                  class="flex flex-col items-start justify-between h-full w-full overflow-hidden"
                >
                  <div class="flex flex-row flex-nowrap items-center justify-start w-full">
                    <DocumentTextIcon :size="'size-5'" class="h-4 w-4 text-text_dark_4 mr-2" />
                    <p class="text-lg line-clamp-1 text-wrap truncate overflow-hidden w-11/12">
                      {{ document?.title }}
                    </p>
                  </div>
                  <span
                    class="text-xs font-[300] text-text_dark_2 line-clamp-3 h-12 truncate text-wrap w-full"
                  >
                    {{ convertHtmlToString(document?.content) }}
                  </span>
                  <div class="flex items-center justify-between text-gray_dark_1 text-xs w-full">
                    <span v-if="sortBy !== 2"
                      >Created {{ TimestampConverter(document?.createdAt) }}</span
                    >
                    <span v-else>Updated {{ TimestampConverter(document?.updatedAt) }}</span>
                    <button
                      type="button"
                      class="flex items-center justify-center rounded-md"
                      @click.stop.prevent="openDeleteDocModal(document)"
                    >
                      <TrashIcon
                        :size="'size-5'"
                        class="h-4 w-4 text-text_dark_2 hover:text-text_light_code"
                      />
                    </button>
                  </div>
                </div>
              </router-link>
            </div>
            <div v-if="!notFound" class="h-36 relative">
              <div
                class="flex flex-col items-center justify-center h-full w-full p-3 border border-black_soft rounded-lg hover:bg-gray_dark_4"
              >
                <button
                  class="flex flex-col items-center justify-center w-full h-full"
                  @click="openCreateDocModal"
                >
                  <PlusCircleIcon :size="'size-6'" class="h-6 w-6 my-2 text-text_dark_2" />
                  <span class="text-xs text-text_light_1">New document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="loading" class="flex flex-col items-center justify-center w-full py-12">
          <span class="text-xs py-4 text-gray_dark_2">Waiting please...</span>
          <BarsLoader />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import {
  DocumentTextIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
  DocumentPlusIcon,
  PlusCircleIcon,
  TrashIcon,
  FunnelIcon,
  ArchiveBoxXMarkIcon
} from '@/shared/components/icons'
import BaseFormInput from '@/shared/components/base/BaseFormInput.vue'
import BarsLoader from '@/shared/components/base/BarsLoader.vue'
import BaseButton from '@/shared/components/base/BaseButton.vue'
import BaseSelect from '@/shared/components/base/BaseSelect.vue'
import { useCreateDocModal } from '@/modules/documents/composables/useCreateDocModal'
import { useDeleteDocModal } from '@/modules/documents/composables/useDeleteDocModal'
import { useDocumentsStore } from '@/modules/documents/store/DocumentsStore'
import { storeToRefs } from 'pinia'
import { TimestampConverter } from '@/shared/lib/utils/timestampConverter'
import { convertHtmlToString } from '@/shared/lib/utils/convertHtmlToString'
import { debounce } from '@/shared/lib/utils/debounce'

const FILTER = [
  {
    id: 1,
    label: 'Name'
  },
  {
    id: 2,
    label: `Last Modified`
  },
  {
    id: 3,
    label: `Date Created`
  }
]

const apiDocumentsStore = useDocumentsStore()
const { getDocuments, findDocumentByTitle } = useDocumentsStore()
const { documents, notFound, loading } = storeToRefs(apiDocumentsStore)

const { openCreateDocModal } = useCreateDocModal()
const { openDeleteDocModal } = useDeleteDocModal()

const search: Ref<string> = ref('')
const sortBy: Ref<number> = ref(0)

const handleChange = async (value: string) => {
  await findDocumentByTitle(value)
}

const handleBlur = (value: string) => {
  search.value = value
}

const delayHandleChange = debounce(handleChange, 200)

watch(search, async (value: string) => {
  if (value.length === 0) {
    await getDocuments()
  }
})

const sortedDocuments = computed(() => {
  if (sortBy.value === 1) {
    return documents.value!.sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    )
  } else if (sortBy.value === 2) {
    return documents.value!.sort((a, b) => {
      const date1 = new Date(a.updatedAt)
      const date2 = new Date(b.updatedAt)

      return date2.getTime() - date1.getTime()
    })
  } else if (sortBy.value === 3) {
    return documents.value!.sort((a, b) => {
      const date1 = new Date(a.createdAt)
      const date2 = new Date(b.createdAt)

      return date2.getTime() - date1.getTime()
    })
  }

  return documents.value
})

onMounted(async () => {
  await getDocuments()
})
</script>
