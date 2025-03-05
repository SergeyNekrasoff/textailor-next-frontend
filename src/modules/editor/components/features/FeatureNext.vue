<template>
  <div class="relative xss:hidden">
    <transition name="slide-fade">
      <span v-if="isHovered" class="feature-tooltip">Redo</span>
    </transition>
    <button
      id="nodeNext"
      ref="nodeNext"
      type="button"
      role="button"
      class="w-[36px] h-[36px] text-text_dark_2 flex items-center justify-center rounded-lg p-1 transition hover:bg-divider_dark_2"
      @click="click"
    >
      <ArrowLongRightIcon :size="'size-6'" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineEmits } from 'vue'
import { ArrowLongRightIcon } from '@/shared/components/icons'
import { useElementHover } from '@vueuse/core'

const emits = defineEmits(['to-next'])
const nodeNext: Ref<HTMLButtonElement | null> = ref(null)
const isHovered = useElementHover(nodeNext)

const click = () => {
  emits('to-next')
}
</script>
