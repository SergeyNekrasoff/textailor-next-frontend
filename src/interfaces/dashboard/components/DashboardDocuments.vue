<template>
  <div class="my-16">
    <div v-if="projects.length">
      <div class="flex items-center justify-between">
        <div class="text-2xl mb-4">Documents</div>
      </div>
      <div class="grid grid-cols-4 gap-4 w-full">
        <div v-for="project in projects" :key="project.id" class="h-36">
          <router-link
            to="/"
            class="flex flex-col items-start justify-between border bg-divider_light_2 border-black_mute rounded-lg h-full w-full p-4 hover:bg-gray_dark_4 transition ease-in-out delay-20"
          >
            <div class="flex flex-col items-start justify-between h-full">
              <div class="text-lg">{{ project.name }}</div>
              <div class="text-xs font-[100] text-gray_light_1">
                {{ project.content }}
              </div>
              <div class="text-gray_light_1 text-xs">{{ project.date }}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center my-4 w-full">
      <FolderPlusIcon :size="'size-10'" class="h-24 w-24 mb-4 text-text_dark_4" />
      <p class="text-xl font-[400] mb-1">No documents found</p>
      <span class="text-xs font-[400] text-gray_dark_1">Get started by creating new document</span>

      <BaseButton class="mt-6 bg-text_dark_4">
        <template v-slot:icon>
          <DocumentPlusIcon :size="'size-6'" class="h-4 w-4 mr-2 text-text_dark_2" />
        </template>
        Create new document
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FolderPlusIcon, DocumentPlusIcon } from '@/shared/components/icons'
import BaseButton from '@/shared/components/base/BaseButton.vue'

const projects = []
// const projects = [
//   {
//     id: 1,
//     name: '2024-04-10 Untitled (2)',
//     content: 'Charge Any Device Fast ​ Description:AnchorCable ...',
//     date: 'Created 2 days ago'
//   },
//   {
//     id: 2,
//     name: '2024-04-10 Untitled',
//     content: 'Create benefit-focused texts for your purposes. ...',
//     date: 'Created 13 hours ago'
//   },
//   {
//     id: 3,
//     name: '2024-03-18 Untitled',
//     content: 'As an informed consumer, you are looking for a lu...',
//     date: 'Created 3 weeks ago'
//   },
//   {
//     id: 4,
//     name: 'Journey to Dubai',
//     content: '',
//     date: 'Created 2 days ago'
//   }
// ]
</script>
