<template>
  <div class="mx-auto w-full grid grid-cols-10">
    <div class="chat">
      <div class="chat__inner">
        <div class="flex flex-col items-center justify-center pt-48 p-4">
          <ChatBubbleLeftEllipsisIcon :size="'size-24'" />
          <div class="text-4xl font-semibold mb-4">Welcome to Chat</div>
          <div class="text-sm font-[400] text-gray_light_1 text-center mb-5 w-[64%]">
            Get started by writing a task and Chat can do the rest. Not sure where to start? Check
            out the Prompt Library for inspiration.
          </div>
          <template v-if="loadingNews || news.length === 0">
            <BarsLoader />
          </template>
          <div v-else class="flex flex-row flex-wrap items-start justify-start w-[64%]">
            <div v-for="item in news" :key="item.id" class="chat-toggle-pill">
              {{ item.text }} <ArrowTopRightOnSquareIcon :size="'size-4'" class="ml-1" />
            </div>
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
import { ChatBubbleLeftEllipsisIcon, ArrowTopRightOnSquareIcon } from '@/shared/components/icons'
import BaseEditor from '@/modules/editor/components/BaseEditor.vue'
import BarsLoader from '@/shared/components/base/BarsLoader.vue'
import PromptEditor from '@/interfaces/documents/components/PromptEditor.vue'
import { EDITOR_MODES } from '@/modules/editor/types'
import { useChatStore } from '@/modules/ai/store/chat'
import { storeToRefs } from 'pinia'

const apiChatStore = useChatStore()
const { getNewsTitles } = useChatStore()
const { news, loadingNews } = storeToRefs(apiChatStore)

const wordCount: Ref<number> = ref(0)
const characterCount: Ref<number> = ref(0)

const handleContent = (value: unknown) => {
  console.log(`content: ${value}`)
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
      'create top 5 modern and shorten headlines for topics in tech, cryptocurrency, software, startups, scientific research to explore',
    model: 'gpt-3.5-turbo',
    maxTokens: 100,
    temperature: 1
  })
})
</script>

<style lang="scss" setup>
.chat {
  @apply col-span-4 border-r border-divider_dark_2 min-w-[96px] z-10;
  background-color: var(--vt-c-bg);
  height: calc(100vh - 48px);

  &__inner {
    @apply flex flex-col items-center justify-between h-full;
  }
}

.chat-toggle-pill {
  @apply cursor-pointer bg-gray_dark_3 border border-solid border-divider_light_2 rounded-md mr-2 mb-2 flex items-center justify-center p-2 text-xs;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-1.5px);
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
