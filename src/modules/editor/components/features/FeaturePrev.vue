<template>
  <div class="relative xss:hidden">
    <transition name="slide-fade">
      <span v-if="isHovered" class="feature-tooltip">Undo</span>
    </transition>
    <button
      id="nodePrev"
      ref="nodePrev"
      type="button"
      role="button"
      class="w-[36px] h-[36px] text-text_dark_2 border-divider_dark_2 flex items-center justify-center rounded-lg p-1 transition hover:bg-divider_dark_2"
      @click="click"
    >
      <ArrowLongLeftIcon :size="'size-6'" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useElementHover } from '@vueuse/core'
import { ArrowLongLeftIcon } from '@/shared/components/icons'

const emits = defineEmits(['to-prev'])

const nodePrev: Ref<HTMLButtonElement | null> = ref(null)
const isHovered = useElementHover(nodePrev)

const click = () => {
  emits('to-prev')
}
</script>
