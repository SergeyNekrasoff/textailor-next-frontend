<template>
  <div class="relative xss:hidden">
    <transition name="slide-fade">
      <span v-if="isHovered" class="feature-tooltip">Crossed</span>
    </transition>
    <button
      id="nodeTextThrough"
      type="button"
      role="button"
      ref="nodeTextThrough"
      class="w-[36px] h-[36px] text-text_dark_2 flex items-center justify-center rounded-lg p-1 transition hover:bg-divider_dark_2"
      :class="getCurrentModal ? 'bg-gray_dark_2' : ''"
      @click="toggle"
    >
      <s class="text-base font-normal" :class="getCurrentModal ? 'text-gray_light_3' : ''"> S </s>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useElementHover } from '@vueuse/core'
import type { Ref } from 'vue'

const emits = defineEmits(['open-modal', 'add-text-through'])

interface IProps {
  currentModal: string
}

const props = defineProps<IProps>()

const visibleWidgetThroughText: Ref<boolean> = ref(false)
const nodeTextThrough: Ref<HTMLDivElement | null> = ref(null)
const isHovered = useElementHover(nodeTextThrough)

const toggle = () => {
  visibleWidgetThroughText.value = !visibleWidgetThroughText.value

  emits('add-text-through', visibleWidgetThroughText.value)
}

const getCurrentModal = computed(() => {
  return props.currentModal && props.currentModal === 'text-through'
})

watch(
  () => visibleWidgetThroughText.value,
  value => {
    if (value) {
      emits('open-modal', 'text-through')
    } else {
      emits('open-modal', '')
    }
  }
)
</script>
