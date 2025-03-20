<template>
  <div class="mt-8 mb-16">
    <div class="text-2xl mb-4">Get started with general features</div>
    <div class="flex items-start justify-start w-full gap-4">
      <div class="w-[33%] h-64">
        <div
          class="flex flex-col items-start justify-end border bg-divider_light_2 border-black_mute rounded-lg h-full w-full p-4"
        >
          <img :src="getImageUrl('chat-ai')" class="w-10 h-10 absolute top-[12px] left-[12px]" />
          <div class="h-[50%] mb-2">
            <div class="text-2xl font-[600] mb-2">Use Editor with Chat</div>
            <div class="text-sm font-light text-gray_light_1">
              Create benefit-focused texts for your purposes. AI assistant helping with everyday
              tasks like writing, brainstorming, researching, and more.
            </div>
          </div>
          <button
            type="button"
            class="text-sm flex items-center justify-start hover:text-text_dark_code hover:translate-x-[1.5px] hover:transform-gpu transition ease-in-out delay-20"
            @click="openCreateDocModal"
          >
            Try this
          </button>
        </div>
      </div>
      <div class="w-[33%] h-64">
        <div
          class="flex flex-col items-start justify-end border bg-divider_light_2 border-black_mute rounded-lg h-full w-full p-4"
        >
          <img :src="getImageUrl('templates')" class="w-10 h-10 absolute top-[12px] left-[12px]" />
          <div class="h-[50%] mb-2">
            <div class="text-2xl font-[600] mb-2">Explore Templates</div>
            <div class="text-sm font-light text-gray_light_1">
              Explore our most popular and highly-rated templates.
            </div>
          </div>
          <button
            type="button"
            class="text-sm flex items-center justify-start text-text_dark_4"
            disabled
          >
            <ExclamationTriangleIcon class="h-5 w-5 mr-2" />
            Coming soon.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCreateDocModal } from '@/modules/documents/composables/useCreateDocModal'
import { ExclamationTriangleIcon } from '@/shared/components/icons'
const { openCreateDocModal } = useCreateDocModal()

const getImageUrl = (iconName: unknown) => {
  return new URL(`../../../assets/icons/${iconName}.svg`, import.meta.url).href
}
</script>
