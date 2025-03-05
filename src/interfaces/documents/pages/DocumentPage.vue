<template>
  <div class="mx-auto w-full grid grid-cols-10">
    <div class="chat">
      <div class="chat__inner">
        <div class="flex flex-col items-center justify-center pt-48 p-4">
          <ChatBubbleLeftEllipsisIcon :size="'size-24'" />
          <div class="text-4xl font-semibold mb-4">Welcome to Chat</div>
          <div class="text-sm font-[400] text-gray_light_1 text-center w-2/3">
            Get started by writing a task and Chat can do the rest. Not sure where to start? Check
            out the Prompt Library for inspiration.
          </div>
        </div>
        <div class="w-full p-4">
          <BaseFormInput
            class="chat-input"
            :model-value="inputValue"
            :name="'search'"
            :input-type="'text'"
            :is-disabled="isDisabled"
            :border="false"
            placeholder="Ask anything..."
            @update:model-value="handleChange"
            @blur="handleBlur"
          />
          <div class="flex items-center justify-end">models</div>
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
        @send="save"
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
import { ref } from 'vue'
import { ChatBubbleLeftEllipsisIcon } from '@/shared/components/icons'
import BaseEditor from '@/modules/editor/components/BaseEditor.vue'
import BaseFormInput from '@/shared/components/base/BaseFormInput.vue'
import { EDITOR_MODES } from '@/modules/editor/types'

const inputValue: Ref<string> = ref('')
const isDisabled: Ref<boolean> = ref(false)
const wordCount: Ref<number> = ref(0)
const characterCount: Ref<number> = ref(0)

const handleChange = () => console.log(`handle change`)
const handleBlur = () => console.log(`handle blur`)

const save = (value: unknown) => {
  console.log(`content: ${value}`)
}

const setWordCount = (value: number) => {
  wordCount.value = value
}

const setCharacterCount = (value: number) => {
  characterCount.value = value
}
</script>

<style lang="scss" scoped>
.chat {
  @apply col-span-4 border-r border-divider_dark_2 min-w-[96px] z-10;
  background-color: var(--vt-c-bg);
  height: calc(100vh - 48px);

  &__inner {
    @apply flex flex-col items-center justify-between h-full;
  }
}

.chat-input {
  .base-input__wrap {
    height: 60px !important;
  }
}

.chat-editor {
  @apply col-span-5 p-4 h-[calc(100vh-60px)] relative;
}
</style>
