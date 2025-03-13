<template>
  <div class="prompt">
    <div class="flex items-center justify-end">
      <BaseSelect
        v-model="selectedAiModel"
        :options="AI_MODELS_ENTITY"
        :searchable="true"
        :placeholder="AI_MODELS_ENTITY[2].label"
        @update:modelValue="handleModelSelect"
      />
    </div>
    <div
      class="flex flex-col items-start justify-between border border-divider_dark_2 rounded-lg min-h-[150px]"
    >
      <BaseEditor
        class="prompt-editor"
        :mode="EDITOR_MODES.BASE"
        :placeholder="'Ask AI anything...'"
        @editable-content="handlePrompt"
      />
      <div class="p-2 flex items-center justify-between w-full">
        <div class="flex items-center justify-start">
          <BaseButton
            class="button-base cursor-pointer mr-2"
            :class="{ 'bg-divider_dark_2': temperature === 1 }"
            @click="setModeAI(1)"
          >
            <template v-slot:icon>
              <CpuChipIcon :size="'size-4'" class="text-blue_darker mr-1" />
            </template>
            <span class="button__text text-xs">Depth</span>
          </BaseButton>
          <BaseButton
            class="button-base cursor-pointer mr-2"
            :class="{ 'bg-divider_dark_2': temperature === 0 }"
            @click="setModeAI(0)"
          >
            <template v-slot:icon>
              <BoltIcon :size="'size-4'" class="text-yellow_darker mr-1" />
            </template>
            <span class="button__text text-xs">Speed</span>
          </BaseButton>
          <BaseButton
            class="button-base cursor-pointer"
            :class="{ 'bg-divider_dark_2': temperature === 0.5 }"
            @click="setModeAI(0.5)"
          >
            <template v-slot:icon>
              <AdjustmentsVerticalIcon :size="'size-4'" class="text-green_darker mr-1" />
            </template>
            <span class="button__text text-xs">Balance</span>
          </BaseButton>
        </div>
        <div class="flex items-center justify-end">
          <BaseSelect
            v-model="selectedSearchMode"
            :options="SEARCH_STATUSES"
            :placeholder="SEARCH_STATUSES[0].label"
            @update:modelValue="handleSearchModeSelect"
          >
            <template v-slot:icon>
              <GlobeAltIcon :size="'size-4'" class="text-gray_dark_1" />
            </template>
          </BaseSelect>
          <BaseButton
            class="button-base bg-blue_dark ml-5"
            :class="!hasContent ? 'cursor-not-allowed' : 'cursor-pointer'"
            :disabled="!hasContent"
            @click="sendPromptRequest"
          >
            <template v-slot:icon>
              <SpinnerLoader v-if="loading" size="sm" />
              <ArrowUpIcon v-else :size="'size-4'" class="text-white_soft" />
            </template>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import BaseEditor from '@/modules/editor/components/BaseEditor.vue'
import BaseSelect from '@/shared/components/base/BaseSelect.vue'
import BaseButton from '@/shared/components/base/BaseButton.vue'
import SpinnerLoader from '@/shared/components/base/SpinnerLoader.vue'
import {
  BoltIcon,
  CpuChipIcon,
  ArrowUpIcon,
  GlobeAltIcon,
  AdjustmentsVerticalIcon
} from '@/shared/components/icons'
import { EDITOR_MODES, SEARCH_STATUSES } from '@/modules/editor/types'
import { AI_MODELS_ENTITY } from '@/shared/config/ai'
import { useChatStore } from '@/modules/ai/store/chat'
import { storeToRefs } from 'pinia'

const apiChatStore = useChatStore()
const { getGenerateContent } = useChatStore()
const { loading } = storeToRefs(apiChatStore)

const selectedAiModel: Ref<number | null> = ref(AI_MODELS_ENTITY[2].id)
const selectedSearchMode: Ref<number | null> = ref(SEARCH_STATUSES[0].id)
const temperature: Ref<number> = ref(0)
const hasContent: Ref<boolean> = ref(false)
const textContent: Ref<string> = ref('')

const handleModelSelect = (value: string | number) => {
  console.log(`value: ${value}`)
}

const handleSearchModeSelect = (value: string | number) => {
  console.log(`value: ${value}`)
}

const handlePrompt = (value: string) => {
  if (value) {
    textContent.value = value
    hasContent.value = true
  } else {
    textContent.value = ''
    hasContent.value = false
  }
}

const setModeAI = (value: number) => {
  temperature.value = value
}

const sendPromptRequest = () => {
  const model = AI_MODELS_ENTITY.find(model => model.id === selectedAiModel.value)?.label

  getGenerateContent({
    prompt: textContent.value,
    model: model,
    maxTokens: 2000,
    temperature: temperature.value
  })
}

onMounted(() => {})
</script>

<style lang="scss" setup>
.prompt {
  .button-base {
    @apply p-2;
  }
}
.prompt-editor {
  @apply w-full p-1 h-[120px] overflow-y-auto text-xs;
}
</style>
