<template>
  <div ref="target" :class="dropdownClasses">
    <div class="dropdown__toggle">
      <slot name="toggle" :toggle="toggle"></slot>
    </div>
    <div class="dropdown__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

const route = useRoute()

const emit = defineEmits(['open', 'close'])

const props = defineProps({
  alignContent: {
    type: String,
    default: 'left',
    validator: (value: string) => {
      return ['left', 'right'].indexOf(value) !== -1
    }
  },
  direction: {
    type: String,
    default: 'down',
    validator: (value: string) => {
      return ['up', 'down'].indexOf(value) !== -1
    }
  }
})

const target = ref(null)
const isOpen = ref(false)

onClickOutside(target, () => close())

const close = () => {
  isOpen.value = false
  emit('close')
}

const toggle = () => {
  isOpen.value = !isOpen.value
}

const dropdownClasses = computed(() => [
  'dropdown',
  `dropdown_align_${props.alignContent}`,
  `dropdown_direction_${props.direction}`,
  isOpen.value && 'dropdown_open'
])

watch(
  () => route.path,
  () => close(),
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.dropdown {
  @apply relative w-full;

  &__toggle {
    @apply flex cursor-pointer;
  }

  &__content {
    @apply hidden absolute z-50 min-w-40 list-none p-2 rounded-md overflow-hidden my-2 border bg-black_mute border-black_mute transition ease-in-out;

    .dropdown_open & {
      @apply block;
    }

    .dropdown_align_left & {
      @apply -translate-x-52 transform-gpu;
    }

    .dropdown_align_right & {
      @apply translate-x-52 transform-gpu;
    }

    .dropdown_direction_down & {
      @apply top-0;
    }

    .dropdown_direction_up & {
      @apply bottom-0;
    }
  }

  &-profile {
    .dropdown__content {
      @apply p-0;
    }
  }
}
</style>
