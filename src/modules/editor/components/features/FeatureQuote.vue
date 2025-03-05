<template>
  <div class="relative xss:hidden">
    <transition name="slide-fade">
      <span v-if="isHovered" class="feature-tooltip">Quote</span>
    </transition>
    <button
      id="nodeQuote"
      type="button"
      role="button"
      ref="nodeQuote"
      class="w-[36px] h-[36px] text-text_dark_2 flex items-center justify-center rounded-lg p-1 transition hover:bg-divider_dark_2"
      :class="getCurrentModal ? 'bg-gray_dark_2' : ''"
      @click.stop="toggle"
    >
      <span class="text-base font-medium" :class="getCurrentModal ? 'text-gray_light_3' : ''">
        Q
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useElementHover } from '@vueuse/core'
import type { Ref } from 'vue'

const emits = defineEmits(['open-modal', 'add-text-quote'])

interface IProps {
  currentModal: string
}

const props = defineProps<IProps>()

const visibleWidgetQuoteText: Ref<boolean> = ref(false)
const nodeQuote: Ref<HTMLDivElement | null> = ref(null)
const isHovered = useElementHover(nodeQuote)

const toggle = () => {
  visibleWidgetQuoteText.value = !visibleWidgetQuoteText.value

  emits('add-text-quote')
}

const getCurrentModal = computed(() => {
  return props.currentModal && props.currentModal === 'text-quote'
})

watch(
  () => visibleWidgetQuoteText.value,
  value => {
    if (value) {
      emits('open-modal', 'text-quote')
    } else {
      emits('open-modal', '')
    }
  }
)
</script>
