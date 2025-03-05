<template>
  <div class="relative xss:hidden">
    <transition name="slide-fade">
      <span v-if="isHovered" class="feature-tooltip">Divider</span>
    </transition>
    <button
      id="nodeHr"
      type="button"
      role="button"
      ref="nodeHr"
      class="w-[36px] h-[36px] text-text_dark_2 flex items-center justify-center rounded-lg p-1 transition hover:bg-divider_dark_2"
      @click="toggle"
    >
      <MinusIcon :size="'size-6'" :class="getCurrentModal ? 'text-gray_light_3' : ''" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { useElementHover } from '@vueuse/core'
import { MinusIcon } from '@/shared/components/icons'

const emits = defineEmits(['open-modal', 'add-hr'])

interface IProps {
  currentModal: string
}

const props = defineProps<IProps>()

const visibleHr: Ref<boolean> = ref(false)
const nodeHr: Ref<HTMLDivElement | null> = ref(null)
const isHovered = useElementHover(nodeHr)

const toggle = () => {
  visibleHr.value = !visibleHr.value

  emits('add-hr')
}

const getCurrentModal = computed(() => {
  return props.currentModal && props.currentModal === 'text-hr'
})

watch(
  () => visibleHr.value,
  value => {
    if (value) {
      emits('open-modal', 'text-hr')
    } else {
      emits('open-modal', '')
    }
  }
)
</script>
