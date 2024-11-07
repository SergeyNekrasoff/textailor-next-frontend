<template>
  <div class="mt-8 mb-16">
    <div class="text-2xl mb-4">Get started with general features</div>
    <div class="flex items-start justify-start w-full gap-4">
      <div v-for="feature in features" :key="feature.id" class="w-[33%] h-64">
        <router-link
          :to="feature.urlPath"
          class="flex flex-col items-start justify-end border bg-divider_light_2 border-black_mute rounded-lg h-full w-full p-4 hover:bg-gray_dark_4 hover:shadow-md hover:shadow-gray_dark_1 transition ease-in-out delay-20"
        >
          <div class="h-[40%] mb-2">
            <div class="text-2xl font-[600] mb-2">{{ feature.title }}</div>
            <div class="text-sm font-light text-gray_light_1">{{ feature.description }}</div>
          </div>
          <button type="button">{{ feature.ctaText }}</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    id: 1,
    title: 'Explore Templates',
    description: 'Explore our most popular and highly-rated templates.',
    ctaText: 'Show',
    urlPath: '/templates',
    icon: 'templates'
  },
  {
    id: 2,
    title: 'Discover Chat',
    description:
      'Chat serves as an AI assistant helping with everyday tasks like writing, brainstorming, researching, and more.',
    ctaText: 'New chat',
    urlPath: '/chat',
    icon: 'chat-ai'
  },
  {
    id: 3,
    title: 'Use Editor',
    description: 'Create benefit-focused texts for your purposes.',
    ctaText: 'Try this',
    urlPath: '/editor',
    icon: 'editor'
  }
]

// const getImageUrl = (iconName: unknown) => {
//   return new URL(`../../../assets/icons/${iconName}.svg`, import.meta.url).href
// }
</script>
