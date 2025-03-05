<template>
  <div class="relative xss:hidden">
    <transition name="slide-fade">
      <span v-if="isHovered" class="feature-tooltip">Bulleted list</span>
    </transition>
    <button
      id="nodeList"
      type="button"
      role="button"
      ref="nodeList"
      class="w-[36px] h-[36px] text-text_dark_2 flex items-center justify-center rounded-lg p-1 transition hover:bg-divider_dark_2"
      :class="getCurrentModal ? 'bg-gray_dark_2' : ''"
      @click="toggle"
    >
      <ListBulletIcon :size="'size-6'" :class="getCurrentModal ? 'text-gray_light_3' : ''" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { useElementHover } from '@vueuse/core'
import { ListBulletIcon } from '@/shared/components/icons'

const emits = defineEmits(['open-modal', 'add-list'])

interface IProps {
  currentModal: string
}

const props = defineProps<IProps>()

const visibleList: Ref<boolean> = ref(false)
const nodeList: Ref<HTMLDivElement | null> = ref(null)
const isHovered = useElementHover(nodeList)

const toggle = () => {
  visibleList.value = !visibleList.value

  emits('add-list')
}

const getCurrentModal = computed(() => {
  return props.currentModal && props.currentModal === 'text-list'
})

watch(
  () => visibleList.value,
  value => {
    if (value) {
      emits('open-modal', 'text-list')
    } else {
      emits('open-modal', '')
    }
  }
)
</script>
