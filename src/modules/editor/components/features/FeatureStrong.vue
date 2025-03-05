<template>
  <div class="relative xss:hidden">
    <transition name="slide-fade">
      <span v-if="isHovered" class="feature-tooltip">Strong</span>
    </transition>
    <button
      id="nodeStrong"
      type="button"
      role="button"
      ref="nodeStrong"
      class="w-[36px] h-[36px] text-text_dark_2 flex items-center justify-center rounded-lg p-1 transition hover:bg-divider_dark_2"
      :class="getCurrentModal ? 'bg-gray_dark_2' : ''"
      @click="toggle"
    >
      <span class="text-base font-medium" :class="getCurrentModal ? 'text-gray_light_3' : ''">
        B
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useElementHover } from '@vueuse/core'
import type { Ref } from 'vue'

const emits = defineEmits(['open-modal', 'add-text-strong'])

interface IProps {
  currentModal: string
}

const props = defineProps<IProps>()

const visibleWidgetStrongText: Ref<boolean> = ref(false)
const nodeStrong: Ref<HTMLDivElement | null> = ref(null)
const isHovered = useElementHover(nodeStrong)

const toggle = () => {
  visibleWidgetStrongText.value = !visibleWidgetStrongText.value

  emits('add-text-strong', visibleWidgetStrongText.value)
}

const getCurrentModal = computed(() => {
  return props.currentModal && props.currentModal === 'text-strong'
})

watch(
  () => visibleWidgetStrongText.value,
  value => {
    if (value) {
      emits('open-modal', 'text-strong')
    } else {
      emits('open-modal', '')
    }
  }
)
</script>
