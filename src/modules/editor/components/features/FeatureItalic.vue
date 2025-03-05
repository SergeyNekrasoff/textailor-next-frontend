<template>
  <div class="relative xss:hidden">
    <transition name="slide-fade">
      <span v-if="isHovered" class="feature-tooltip">Italic</span>
    </transition>
    <button
      id="nodeItalic"
      type="button"
      role="button"
      ref="nodeItalic"
      class="w-[36px] h-[36px] text-text_dark_2 flex items-center justify-center rounded-lg p-1 transition hover:bg-divider_dark_2"
      :class="getCurrentModal ? 'bg-gray_dark_2' : ''"
      @click="toggle"
    >
      <i class="text-base font-medium" :class="getCurrentModal ? 'text-gray_light_3' : ''"> I </i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useElementHover } from '@vueuse/core'
import type { Ref } from 'vue'

const emits = defineEmits(['open-modal', 'add-italic-text'])

interface IProps {
  currentModal: string
}

const props = defineProps<IProps>()

const visibleWidgetItalicText: Ref<boolean> = ref(false)
const nodeItalic: Ref<HTMLDivElement | null> = ref(null)
const isHovered = useElementHover(nodeItalic)

const toggle = () => {
  visibleWidgetItalicText.value = !visibleWidgetItalicText.value

  emits('add-italic-text', visibleWidgetItalicText.value)
}

const getCurrentModal = computed(() => {
  return props.currentModal && props.currentModal === 'text-italic'
})

watch(
  () => visibleWidgetItalicText.value,
  value => {
    if (value) {
      emits('open-modal', 'text-italic')
    } else {
      emits('open-modal', '')
    }
  }
)
</script>
