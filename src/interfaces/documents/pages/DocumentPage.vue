<template>
  <div class="mx-auto w-full grid grid-cols-10">
    <div class="chat">
      <div class="chat__inner" :class="loadingContent ? 'justify-end' : 'justify-between'">
        <template v-if="loadingNews || loadingContent">
          <div
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
          >
            <span class="text-xs py-4 text-gray_dark_2">Waiting please...</span>
            <BarsLoader />
          </div>
        </template>
        <template v-else-if="!responseChat">
          <div class="flex flex-col items-center justify-start mt-16">
            <ChatBubbleLeftEllipsisIcon :size="'size-24'" />
            <div class="text-4xl font-semibold mb-4">Welcome to Chat</div>
            <div class="text-sm font-[400] text-gray_light_1 text-center mb-5 w-[64%]">
              Get started by writing a task and Chat can do the rest. Not sure where to start? Check
              out the Prompt Library for inspiration.
            </div>
            <div
              v-if="news && !responseChat"
              class="flex flex-row items-start justify-start w-[90%]"
            >
              <button
                v-for="item in news"
                :key="item.id"
                type="button"
                class="chat-toggle-pill"
                @click="getGenerateContent({ prompt: item.text })"
              >
                {{ item.text }}
                <ArrowTopRightOnSquareIcon :size="'size-4'" class="ml-1" />
              </button>
            </div>
          </div>
        </template>

        <div v-else class="flex flex-col items-center justify-center pt-20 p-4">
          <div
            class="xss:p-2 xs:p-2 s:p-4 m:p-4 lg:p-6 xl:p-8 flex flex-col items-start justify-start max-h-[850px]"
          >
            <h2
              v-if="responseChat?.title"
              class="xss:text-xl s:text-2xl m:text-4xl font-bold my-4 text-gray_light_3"
            >
              {{ responseChat?.title }}
            </h2>
            <b
              v-if="responseChat?.abstract"
              class="xss:text-lg s:text-lg m:text-xl font-[400] py-1"
              >{{ responseChat?.abstract }}</b
            >
            <div
              v-if="
                responseChat?.content &&
                Array.isArray(responseChat?.content) &&
                responseChat?.content.length > 0
              "
              class="h-full overflow-y-auto overflow-x-hidden"
            >
              <p
                v-for="(item, index) in responseChat?.content"
                :key="index"
                class="chat-content-item text-md text-gray_light_1 mb-4 p-2 hover:bg-divider_light_2 hover:rounded-lg hover:cursor-pointer"
              >
                <button
                  type="button"
                  class="chat-content-item__copy w-5 h-5 absolute bottom-[-6px] right-[-2px] top-auto hover:text-white_soft"
                >
                  <ArrowRightCircleIcon
                    :size="'size-5'"
                    class="h-5 w-5 pointer"
                    @click="shareContent(item)"
                  />
                </button>
                {{ item }}
              </p>
            </div>
            <div v-else>
              <p
                class="chat-content-item text-md text-gray_light_1 mb-4 p-2 hover:bg-divider_light_2 hover:rounded-lg hover:pointer"
              >
                <button
                  type="button"
                  class="chat-content-item__copy w-5 h-5 absolute bottom-[-6px] right-[-2px] top-auto hover:text-text-gray_light_1 bg-green_lighter"
                >
                  <ArrowRightCircleIcon
                    :size="'size-5'"
                    class="h-5 w-5 pointer"
                    @click="shareContent(responseChat?.content[0])"
                  />
                </button>
                {{ responseChat?.content }}
              </p>
            </div>
          </div>
          <div
            class="w-full flex items-center justify-end p-2 xss:px-2 xs:px-2 s:px-4 m:px-4 lg:px-6 xl:px-8"
          >
            <button type="button" class="w-5 h-5 mr-2 hover:scale-90">
              <LikeIcon :size="'size-4'" class="h-4 w-4 text-text_dark_2 pointer" />
            </button>
            <button type="button" class="w-5 h-5 hover:scale-90">
              <DislikeIcon :size="'size-4'" class="h-4 w-4 text-text_dark_2 pointer" />
            </button>
            <div class="px-2 text-divider_dark_1">|</div>
            <button type="button" class="w-5 h-5 hover:scale-90">
              <Square2StackIcon :size="'size-5'" class="h-5 w-5 text-text_dark_2 pointer" />
            </button>
          </div>
        </div>
        <div class="w-full p-4">
          <PromptEditor />
        </div>
      </div>
    </div>
    <div class="chat-editor">
      <BaseEditor
        class="w-full"
        :mode="EDITOR_MODES.ADVANCED"
        :placeholder="'Start typing, copy or paste to get started...'"
        :deliveryContent="selectedContent"
        @word-count="setWordCount"
        @character-count="setCharacterCount"
        @send="handleContent"
      />
    </div>
    <div
      class="absolute bottom-0 left-0 right-0 w-full border-t border-text_dark_4 p-4 h-8 flex items-center justify-end z-[0]"
    >
      <span class="text-xs text-divider_dark_3 mr-2">{{ wordCount }} words</span>
      <span class="text-base text-black_mute mr-2">•</span>
      <span class="text-xs text-divider_dark_3">{{ characterCount }} characters</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import {
  ChatBubbleLeftEllipsisIcon,
  ArrowTopRightOnSquareIcon,
  ArrowRightCircleIcon,
  Square2StackIcon,
  LikeIcon,
  DislikeIcon
} from '@/shared/components/icons'
import BaseEditor from '@/modules/editor/components/BaseEditor.vue'
import BarsLoader from '@/shared/components/base/BarsLoader.vue'
import PromptEditor from '@/interfaces/documents/components/PromptEditor.vue'
import { EDITOR_MODES } from '@/modules/editor/types'
import { useChatStore } from '@/modules/ai/store/chat'
import { storeToRefs } from 'pinia'

const apiChatStore = useChatStore()
const { getGenerateContent, getNewsTitles } = useChatStore()
const { news, responseChat, loadingContent, loadingNews } = storeToRefs(apiChatStore)

const wordCount: Ref<number> = ref(0)
const characterCount: Ref<number> = ref(0)
const selectedContent: Ref<string> = ref('')

const handleContent = (value: unknown) => {
  console.log(`content: ${value}`)
}

const shareContent = (value: string) => {
  selectedContent.value = value
}

const setWordCount = (value: number) => {
  wordCount.value = value
}

const setCharacterCount = (value: number) => {
  characterCount.value = value
}

onMounted(async () => {
  await getNewsTitles({
    prompt:
      'create top 5 modern and shorten headlines using from 2 to 5 words for topics in tech, cryptocurrency, software, startups, scientific and global to explore',
    model: 'gpt-3.5-turbo',
    maxTokens: 100,
    temperature: 0
  })
})
</script>

<style lang="scss" setup>
.chat {
  @apply col-span-4 border-r border-divider_dark_2 min-w-[96px] z-10;
  background-color: var(--vt-c-bg);
  height: calc(100vh - 48px);

  &__inner {
    @apply flex flex-col items-center h-full;
  }
}

.chat-toggle-pill {
  @apply cursor-pointer bg-ff border border-solid border-divider_light_2 rounded-md mr-2 mb-2 flex items-start justify-between p-2 text-xs text-left w-[20%] min-h-[50px];
  transition: transform 0.2s ease-in-out;

  &:hover {
    @apply bg-indigo_soft;
    transform: translateY(-1.5px);
  }
}

.chat-content-item {
  &:hover {
    .chat-content-item__copy {
      display: flex;
    }
  }

  &__copy {
    display: none;
  }
}

.chat-input {
  @apply flex items-start justify-start;

  .base-input__wrap {
    height: 90px !important;
  }
}

.chat-editor {
  @apply col-span-5 p-4 h-[calc(100vh-60px)] relative;
}
</style>
