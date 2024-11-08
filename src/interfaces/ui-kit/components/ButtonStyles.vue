<template>
  <section class="pr-6">
    <h2 class="mb-8">Buttons</h2>

    <BaseButton class="mb-4" :disabled="true">
      <template v-slot:icon>
        <RectangleStackIcon
          :size="'size-6'"
          class="h-4 w-4 mr-2 text-text_dark_2"
          :class="{ 'text-divider_dark_1': true }"
        />
      </template>
      Show All
    </BaseButton>

    <BaseButton class="mb-4" :primary="true">
      <template v-slot:icon>
        <RectangleStackIcon :size="'size-6'" class="h-4 w-4 mr-2 text-text_dark_2" />
      </template>
      Subscribe
    </BaseButton>

    <BaseButton class="mb-4 w-1/2" :solid="true">
      <template v-slot:icon>
        <SendIcon :size="'size-6'" class="h-4 w-4 mr-2 text-text_dark_2" />
      </template>
      Send
    </BaseButton>

    <BaseButton class="mb-4 w-3/4">
      <template v-slot:icon>
        <ArrowDownTrayIcon :size="'size-6'" class="h-4 w-4 mr-2 text-text_dark_2" />
      </template>
      Download
    </BaseButton>
  </section>
</template>
<script setup lang="ts">
import BaseButton from '../../../shared/components/base/BaseButton.vue'
import { RectangleStackIcon, ArrowDownTrayIcon, SendIcon } from '@/shared/components/icons'
// import useToggle from '@/shared/lib/use/useToggle'

// const { isActive: isDisabled, toggle } = useToggle(true)
</script>
