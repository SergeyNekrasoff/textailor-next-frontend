<template>
  <header class="header border-b border-divider_dark_2">
    <div class="flex items-center justify-between h-8">
      <router-link to="/">
        <BaseLogo class="scale-[0.9]" />
      </router-link>
      <div class="flex items-center justify-center w-1/3">
        <div
          class="flex justify-center min-w-[40%] text-center rounded-lg border border-divider_dark_2 py-1 text-base font-bold ml-4 text-gray_dark_1"
        >
          {{ routeName }}
        </div>
      </div>
      <div class="flex items-center justify-end">
        <button
          type="button"
          class="py-1 px-2 mr-2 rounded-md flex items-center justify-center border border-gray_dark_2 bg-green_lighter text-black_mute hover:bg-green_light"
        >
          <RocketLaunchIcon :size="'size-4'" class="h-4 w-4 mr-2 pointer" />
          <span class="text-sm">Upgrade</span>
        </button>
        <button type="button">
          <BellIcon :size="'size-6'" class="h-5 w-5 mr-2 pointer" @click="toggleNotification" />
        </button>
        <button type="button">
          <QuestionMarkCircleIcon :size="'size-6'" class="h-5 w-5 pointer" @click="toggleHelp" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import BaseLogo from '@/shared/components/base/BaseLogo.vue'
import { BellIcon, QuestionMarkCircleIcon, RocketLaunchIcon } from '@/shared/components/icons'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const toggleNotification = (): void => {
  console.log(`toggle notifications`)
}

const toggleHelp = (): void => {
  console.log(`toggle help`)
}

const route = useRoute()

const routeName = computed(() => route.meta.head)
</script>

<style lang="scss">
.header {
  @apply h-12 relative bg-black_pure py-2 px-4 z-20;
}

// @media (max-width: $breakpoint-s) {
//   .header {
//     padding-top: var(--xxl);

//     &__logo {
//       position: absolute;
//       top: var(--s);
//       left: 50%;
//       transform: translateX(-50%);
//       white-space: nowrap;
//     }
//   }
// }
</style>
