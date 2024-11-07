<template>
  <div class="mt-8 mb-16">
    <div class="flex items-center justify-between mb-4">
      <div class="text-2xl">Get started with Templates</div>
      <!-- <BaseButton>
        <template v-slot:icon>
          <RectangleStackIcon class="h-4 w-4 mr-2 text-text_dark_2" />
        </template>

        Browse Template Library
      </BaseButton> -->
      <button>
        <RectangleStackIcon :size="'size-6'" class="h-4 w-4 mr-2 text-text_dark_2" />
        Browse Template Library
      </button>
    </div>
    <div class="flex items-start justify-start w-full gap-4">
      <div v-for="template in templates" :key="template.id" class="w-[20%] h-48">
        <router-link
          to="/"
          class="flex flex-col items-start justify-end border bg-divider_light_2 border-black_mute rounded-lg h-full w-full p-4 hover:bg-gray_dark_4 hover:shadow-md hover:shadow-gray_dark_1 transition ease-in-out delay-20"
        >
          <div class="h-[60%] flex flex-col items-start justify-between">
            <div class="text-xl mb-2">{{ template.category }}</div>
            <div class="text-sm pb-0.5">{{ template.name }}</div>
            <div class="text-gray_light_1 font-light text-sm line-clamp-2">
              {{ template.description }}
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { BaseButton } from '@/shared/ui/buttons'
import { RectangleStackIcon } from '@/shared/components/icons'

const templates = [
  {
    id: 1,
    img: '/',
    category: 'Email',
    name: 'Newsletter',
    description:
      'Engage readers with a newsletter featuring curated content, highlights, and updates.'
  },
  {
    id: 2,
    img: '/',
    category: 'Social',
    name: 'Instagram Caption',
    description: 'Generate catchy captions for your Instagram posts.'
  },
  {
    id: 3,
    img: '/',
    category: 'Ads',
    name: 'Google Search Ad',
    description: 'Make your Google Ads stand out with engaging headlines.'
  },
  {
    id: 4,
    img: '/',
    category: 'Website',
    name: 'Landing Page Headline',
    description: 'Generate the perfect headline for your landing page.'
  },
  {
    id: 5,
    img: '/',
    category: 'Blog',
    name: 'Blog Ideas',
    description: 'Keep your blogs posts fresh and different every time.'
  }
]
</script>
