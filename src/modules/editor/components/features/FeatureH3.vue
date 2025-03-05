<template>
  <div class="relative xss:hidden">
    <transition name="slide-fade">
      <span v-if="isHovered" class="feature-tooltip">Subection</span>
    </transition>
    <button
      id="nodeH3"
      type="button"
      role="button"
      ref="nodeH3"
      class="w-[36px] h-[36px] text-text_dark_2 flex items-center justify-center rounded-lg p-1 transition hover:bg-divider_dark_2"
      :class="getCurrentModal ? 'bg-gray_dark_2' : ''"
      @click="toggle"
    >
      <span class="text-sm font-medium" :class="getCurrentModal ? 'text-gray_light_3' : ''">
        H3
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useElementHover } from '@vueuse/core'
import type { Ref } from 'vue'

const emit = defineEmits(['open-modal', 'add-h3-text'])

interface IProps {
  currentModal: string
}

const props = defineProps<IProps>()

const visibleWidgetH3Text: Ref<boolean> = ref(false)
const nodeH3: Ref<HTMLDivElement | null> = ref(null)
const isHovered = useElementHover(nodeH3)

const toggle = (): void => {
  visibleWidgetH3Text.value = !visibleWidgetH3Text.value

  emit('add-h3-text', 'h3')
}

const getCurrentModal = computed(() => {
  return props.currentModal && props.currentModal === 'text-h3'
})

watch(
  () => visibleWidgetH3Text.value,
  value => {
    if (value) {
      emit('open-modal', 'text-h3')
    } else {
      emit('open-modal', '')
    }
  }
)
</script>
