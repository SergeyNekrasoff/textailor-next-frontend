<template>
  <div class="mt-8 mb-16">
    <div class="text-2xl mb-4">Get started with general features</div>
    <div class="flex items-start justify-start w-full gap-4">
      <div class="w-[33%] h-64">
        <div
          class="flex flex-col items-start justify-end border bg-divider_light_2 border-black_mute rounded-lg h-full w-full p-4 hover:bg-gray_dark_4 hover:shadow-md hover:shadow-gray_dark_1 transition ease-in-out delay-20"
        >
          <img :src="getImageUrl('chat-ai')" class="w-14 h-14 absolute top-[12px] right-[12px]" />
          <div class="h-[50%] mb-2">
            <div class="text-2xl font-[600] mb-2">Use Editor with Chat</div>
            <div class="text-sm font-light text-gray_light_1">
              Create benefit-focused texts for your purposes. AI assistant helping with everyday
              tasks like writing, brainstorming, researching, and more.
            </div>
          </div>
          <button type="button" class="hover:text-text_dark_code" @click="openCreateDocModal">
            Try this
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCreateDocModal } from '@/modules/documents/composables/useCreateDocModal'

const { openCreateDocModal } = useCreateDocModal()

const getImageUrl = (iconName: unknown) => {
  return new URL(`../../../assets/icons/${iconName}.svg`, import.meta.url).href
}
</script>
