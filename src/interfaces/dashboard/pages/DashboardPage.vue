<template>
  <div class="mx-auto w-[90%] max-w-[1280px] flex flex-col justify-center px-6 py-8 duration-500">
    <div class="flex w-full flex-1 flex-col max-w-screen-xl mx-auto">
      <div class="mt-8 mb-16">
        <!-- <BaseCarousel :items="items" class="bg-black_mute rounded-md h-48" /> -->
      </div>

      <features />
      <templates />
      <documents />
    </div>
  </div>
</template>

<script setup lang="ts">
import features from '../components/DashboardFeatures.vue'
import templates from '../components/DashboardTemplates.vue'
import documents from '../components/DashboardDocuments.vue'
// import { BaseCarousel } from '@/shared/ui/carousel'
</script>
