<template>
  <div class="relative xss:hidden">
    <transition name="slide-fade">
      <span v-if="isHovered" class="feature-tooltip">Subsubsection</span>
    </transition>
    <button
      id="nodeH4"
      type="button"
      role="button"
      ref="nodeH4"
      class="w-[36px] h-[36px] text-text_dark_2 flex items-center justify-center rounded-lg p-1 transition hover:bg-divider_dark_2"
      :class="getCurrentModal ? 'bg-gray_dark_2' : ''"
      @click="toggle"
    >
      <span class="text-sm font-medium" :class="getCurrentModal ? 'text-gray_light_3' : ''">
        H4
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useElementHover } from '@vueuse/core'
import type { Ref } from 'vue'

const emit = defineEmits(['open-modal', 'add-h4-text'])

interface IProps {
  currentModal: string
}

const props = defineProps<IProps>()

const visibleWidgetH4Text: Ref<boolean> = ref(false)
const nodeH4: Ref<HTMLDivElement | null> = ref(null)
const isHovered = useElementHover(nodeH4)

const toggle = (): void => {
  visibleWidgetH4Text.value = !visibleWidgetH4Text.value

  emit('add-h4-text', 'h4')
}

const getCurrentModal = computed(() => {
  return props.currentModal && props.currentModal === 'text-h4'
})

watch(
  () => visibleWidgetH4Text.value,
  value => {
    if (value) {
      emit('open-modal', 'text-h4')
    } else {
      emit('open-modal', '')
    }
  }
)
</script>
