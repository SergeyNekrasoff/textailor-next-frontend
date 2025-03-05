<template>
  <div class="relative xss:hidden">
    <transition name="slide-fade">
      <span v-if="isHovered" class="feature-tooltip">Section</span>
    </transition>
    <button
      id="nodeH2"
      type="button"
      role="button"
      ref="nodeH2"
      class="w-[36px] h-[36px] text-text_dark_2 flex items-center justify-center rounded-lg p-1 transition hover:bg-divider_dark_2"
      :class="getCurrentModal ? 'bg-gray_dark_2' : ''"
      @click="toggle"
    >
      <span class="text-sm font-medium" :class="getCurrentModal ? 'text-gray_light_3' : ''">
        H2
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useElementHover } from '@vueuse/core'
import type { Ref } from 'vue'

const emit = defineEmits(['open-modal', 'add-h2-text'])

interface IProps {
  currentModal: string
}

const props = defineProps<IProps>()

const visibleWidgetH2Text: Ref<boolean> = ref(false)
const nodeH2: Ref<HTMLButtonElement | null> = ref(null)
const isHovered = useElementHover(nodeH2)

const toggle = (): void => {
  visibleWidgetH2Text.value = !visibleWidgetH2Text.value

  emit('add-h2-text', 'h2')
}

const getCurrentModal = computed(() => {
  return props.currentModal && props.currentModal === 'text-h2'
})

watch(
  () => visibleWidgetH2Text.value,
  value => {
    if (value) {
      emit('open-modal', 'text-h2')
    } else {
      emit('open-modal', '')
    }
  }
)
</script>
