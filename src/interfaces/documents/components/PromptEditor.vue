<template>
  <div class="prompt">
    <div class="flex items-center justify-end">
      <BaseSelect
        v-model="selectedAiModel"
        :options="AI_MODELS_ENTITY"
        :searchable="true"
        :placeholder="AI_MODELS_ENTITY[0].label"
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
        @send="handlePrompt"
      />
      <div class="p-2 flex items-center justify-between w-full">
        <div class="flex items-center justify-start">
          <BaseButton
            class="button-base cursor-pointer mr-2"
            :class="{ 'bg-divider_dark_2': aiMode === 1 }"
            @click="setModeAI(1)"
          >
            <template v-slot:icon>
              <CpuChipIcon :size="'size-4'" class="text-blue_darker mr-1" />
            </template>
            <span class="button__text text-xs">Depth</span>
          </BaseButton>
          <BaseButton
            class="button-base cursor-pointer"
            :class="{ 'bg-divider_dark_2': aiMode === 0 }"
            @click="setModeAI(0)"
          >
            <template v-slot:icon>
              <BoltIcon :size="'size-4'" class="text-yellow_darker mr-1" />
            </template>
            <span class="button__text text-xs">Speed</span>
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
            class="button-base bg-indigo ml-5"
            :class="{ 'cursor-not-allowed': true }"
            :disabled="true"
            @click="sendPromptRequest"
          >
            <template v-slot:icon>
              <ArrowUpIcon :size="'size-4'" class="text-white_soft" />
            </template>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import BaseEditor from '@/modules/editor/components/BaseEditor.vue'
import BaseSelect from '@/shared/components/base/BaseSelect.vue'
import BaseButton from '@/shared/components/base/BaseButton.vue'
import { BoltIcon, CpuChipIcon, ArrowUpIcon, GlobeAltIcon } from '@/shared/components/icons'
import { EDITOR_MODES, AI_MODELS_ENTITY, SEARCH_STATUSES } from '@/modules/editor/types'

const selectedAiModel: Ref<number | null> = ref(AI_MODELS_ENTITY[0].id)
const selectedSearchMode: Ref<number | null> = ref(SEARCH_STATUSES[0].id)
const aiMode: Ref<number> = ref(0)

const handleModelSelect = (value: string | number) => {
  console.log(`value: ${value}`)
}

const handleSearchModeSelect = (value: string | number) => {
  console.log(`value: ${value}`)
}

const handlePrompt = (value: unknown) => {
  console.log(`prompt: ${value}`)
}

const setModeAI = (value: number) => {
  aiMode.value = value
}

const sendPromptRequest = () => {
  console.log(`send prompt request`)
}
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
