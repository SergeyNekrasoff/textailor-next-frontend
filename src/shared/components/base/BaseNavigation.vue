<template>
  <nav v-if="!collapsed" class="navigation light:bg-gray_dark_1">
    <!-- <div
      class="absolute left-[325px] top-16 hidden -translate-x-14 rotate-90 transform cursor-pointer flex-row items-center justify-center rounded-t-md bg-black_mute px-3 py-1 text-sm text-white shadow-overlay duration-300 lg:flex z-50 border-r border-t border-l border-divider_dark_2 hover:bg-black_soft"
      @click="toggle"
    >
      <ArrowLeftIcon class="h-5 w-5 text-text_dark_2 -rotate-90 transform" />
    </div> -->
    <div class="flex items-start justify-between w-full">
      <ul class="navigation__list">
        <li
          class="flex items-center justify-start mt-8 w-full hover:bg-divider_dark_2 py-2 px-4 rounded-md"
        >
          <HomeIcon :size="'size-2'" class="h-5 w-5 mr-2 text-text_dark_2" />
          <router-link to="/" class="text-lg font-[500] pt-1 w-full">Dashboard</router-link>
        </li>
        <li class="mb-20 mt-4">
          <hr class="text-divider_dark_2" />
        </li>
        <li class="text-xs py-2 text-text_dark_3">Workspace</li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 py-2 px-2 rounded-md"
        >
          <DocumentTextIcon :size="'size-6'" class="h-5 w-5 mr-2 text-text_dark_2" />
          <router-link to="/projects" class="text-lg font-[500] w-full">Projects</router-link>
        </li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 py-2 px-2 rounded-md"
        >
          <RectangleStackIcon :size="'size-6'" class="h-5 w-5 mr-2 text-text_dark_2" />
          <router-link to="/templates" class="text-lg font-medium w-full">Templates</router-link>
        </li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 py-2 px-2 rounded-md"
        >
          <ChatBubbleBottomCenterTextIcon :size="'size-6'" class="h-5 w-5 mr-2 text-text_dark_2" />
          <router-link to="/chat" class="text-lg font-[500] w-full">Chat</router-link>
        </li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 py-2 px-2 rounded-md"
        >
          <PencilSquareIcon :size="'size-6'" class="h-5 w-5 mr-2 text-text_dark_2" />
          <router-link to="/editor" class="text-lg font-[500] w-full">Editor</router-link>
        </li>
        <li class="mb-4 mt-4">
          <hr class="text-divider_dark_2" />
        </li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 py-2 px-2 rounded-md"
        >
          <DocumentMagnifyingGlassIcon :size="'size-6'" class="h-5 w-5 mr-2 text-text_dark_2" />
          <router-link to="/history" class="text-lg font-[500] w-full">History</router-link>
        </li>
      </ul>
    </div>
    <div class="flex items-start justify-between w-full">
      <ul class="navigation__list">
        <li class="text-xs py-2 text-text_dark_3">Settings</li>
        <li class="flex items-center justify-start w-full py-2 px-2 rounded-md">
          <BookOpenIcon :size="'size-6'" class="h-5 w-5 mr-2 text-text_dark_2" />
          242 words used
        </li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 py-2 px-2 rounded-md"
        >
          <Cog8ToothIcon :size="'size-6'" class="h-5 w-5 mr-2 text-text_dark_2" />
          <router-link to="/settings" class="w-full">Settings</router-link>
        </li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 py-2 px-2 rounded-md mb-10"
        >
          <PlusIcon :size="'size-6'" class="h-5 w-5 mr-2 text-text_dark_2" />
          <button type="button">Invite members</button>
        </li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 py-2 px-2 rounded-md"
        >
          <span class="flex items-center justify-center h-8 w-12 rounded-full bg-purple mr-3">
            J
          </span>
          <router-link to="/account" class="w-full">Judixel89</router-link>
          <ChevronRightIcon :size="'size-6'" class="h-5 w-5" />
        </li>
      </ul>
    </div>
  </nav>
  <!-- <aside v-else class="navigation navigation--collapsed light:bg-gray_dark_1">
    <div
      class="absolute left-[105px] top-16 hidden -translate-x-14 rotate-90 transform cursor-pointer flex-row items-center justify-center rounded-t-md bg-black_mute px-3 py-1 text-sm text-white shadow-overlay duration-300 lg:flex z-50 border-r border-t border-l border-divider_dark_2 hover:bg-black_soft"
      @click="toggle"
    >
      <ArrowRightIcon class="h-5 w-5 text-text_dark_2 -rotate-90 transform" />
    </div>
    <div class="flex items-start justify-between w-full">
      <ul class="navigation__list">
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 p-2 rounded-md mb-10"
        >
          <router-link to="/">
            <HomeIcon :size="'size-6'" class="h-6 w-6 text-text_dark_2" />
          </router-link>
        </li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 p-2 rounded-md mb-2"
        >
          <router-link to="/projects">
            <DocumentTextIcon :size="'size-6'" class="h-6 w-6 text-text_dark_2" />
          </router-link>
        </li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 p-2 rounded-md mb-2"
        >
          <router-link to="/templates">
            <RectangleStackIcon :size="'size-6'" class="h-6 w-6 text-text_dark_2" />
          </router-link>
        </li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 p-2 rounded-md mb-2"
        >
          <router-link to="/chat">
            <ChatBubbleBottomCenterTextIcon :size="'size-6'" class="h-6 w-6 text-text_dark_2" />
          </router-link>
        </li>
        <li class="flex items-center justify-start w-full hover:bg-divider_dark_2 p-2 rounded-md">
          <router-link to="/chat">
            <PencilSquareIcon :size="'size-6'" class="h-6 w-6 text-text_dark_2" />
          </router-link>
        </li>
      </ul>
    </div>
    <div class="flex items-start justify-between w-full">
      <ul class="navigation__list">
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 p-2 rounded-md mb-2"
        >
          <router-link to="/settings">
            <Cog8ToothIcon :size="'size-6'" class="h-6 w-6 text-text_dark_2" />
          </router-link>
        </li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 p-2 rounded-md mb-10"
        >
          <button type="button" @click="openModal">
            <PlusIcon :size="'size-6'" class="h-6 w-6 text-text_dark_2" />
          </button>
        </li>
        <li class="flex items-center justify-center w-full p-2 rounded-md">
          <router-link to="/account">
            <span class="flex items-center justify-center h-8 w-8 rounded-full bg-purple">
              J
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import {
  HomeIcon,
  DocumentTextIcon,
  RectangleStackIcon,
  BookOpenIcon,
  Cog8ToothIcon,
  PlusIcon,
  ChevronRightIcon,
  DocumentMagnifyingGlassIcon,
  ChatBubbleBottomCenterTextIcon,
  PencilSquareIcon
  // ArrowLeftIcon,
  // ArrowRightIcon
} from '@/shared/components/icons'

const collapsed: Ref<boolean> = ref(false)
</script>

<style lang="scss">
.navigation {
  @apply flex flex-col items-start justify-between px-6 py-4 w-[250px] border-r border-divider_dark_2 bg-black_soft fixed top-0 pt-20 z-10 transition ease-in-out delay-100;
  min-height: 100vh;

  &--collapsed {
    @apply w-[60px] px-2 py-2 pt-20;
  }

  &__list {
    @apply w-full;
  }
}
</style>
