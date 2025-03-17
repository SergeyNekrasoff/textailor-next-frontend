<template>
  <div class="relative flex items-center justify-start" ref="optionsRef">
    <slot name="icon"></slot>

    <button class="button-select" :class="{ 'is-open': isOpen }" @click="isOpen = !isOpen">
      <span class="pr-1.5">{{ selectedOption?.label || props.placeholder }}</span>
      <CaretUpIcon v-if="isOpen" :size="'size-2.5'" />
      <CaretDownIcon v-else :size="'size-2.5'" />
    </button>

    <div
      v-if="isOpen"
      class="options-container"
      :class="position === 'top' ? 'options-container--top' : 'options-container--bottom'"
    >
      <template v-if="props.searchable">
        <input
          v-model="searchTerm"
          type="text"
          class="search-input"
          placeholder="Enter AI model..."
          @input="handleSearch"
        />
      </template>

      <ul v-if="filteredOptions.length > 0" class="options-list">
        <li
          v-for="option in filteredOptions"
          :key="option.id"
          @click="handleOptionClick(option)"
          class="option-item"
          :class="{ 'is-selected': option.id === selectedOptionId }"
        >
          <CheckCircleIcon
            v-if="option.id === selectedOptionId"
            class="text-green_light mr-3"
            :size="'size-5'"
          />
          {{ option.label }}
        </li>
      </ul>
      <div v-else class="flex items-center justify-center">
        <ArchiveBoxXMarkIcon :size="'size-5'" class="text-gray_dark_1" />
        <p class="text-sm text-gray_dark_1 font-[400] p-2">Not found</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import {
  CaretUpIcon,
  CaretDownIcon,
  CheckCircleIcon,
  ArchiveBoxXMarkIcon
} from '@/shared/components/icons'
import { onClickOutside } from '@vueuse/core'
import { useSelect } from '@/shared/lib/use/useSelect'

interface UseSelectProps {
  modelValue?: string | number | null
  options?: Array<{ id: number; label: string; data?: unknown }>
  placeholder?: string
  searchable?: boolean
  position?: string
}

const props = withDefaults(defineProps<UseSelectProps>(), {
  modelValue: null,
  options: () => [],
  placeholder: 'Select an option',
  searchable: false,
  position: 'top'
})

const optionsRef: Ref<HTMLDivElement | null> = ref(null)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const {
  isOpen,
  searchTerm,
  filteredOptions,
  selectedOption,
  selectedOptionId,
  handleSelect,
  handleSearch
} = useSelect(props)

const handleOptionClick = (option: { id: number; label: string; data?: unknown }) => {
  handleSelect(option)
  emit('update:modelValue', option.id)
}

onClickOutside(optionsRef, () => (isOpen.value = false))
</script>

<style lang="scss" setup>
.button-select {
  @apply text-xs flex items-center justify-start rounded-md p-2 bg-transparent text-gray_light_1;
}

.options-container {
  @apply absolute left-auto right-0 border border-solid border-divider_dark_2 rounded-lg bg-black_soft z-[1000] w-[250px] overflow-hidden;

  &--top {
    @apply bottom-0 top-auto transform-gpu translate-y-[-32px];
  }

  &--bottom {
    @apply top-0 bottom-auto transform-gpu translate-y-[38px];
  }
}

.options-list {
  @apply max-h-[200px] overflow-y-auto;
}

.option-item {
  @apply p-3 text-xs cursor-pointer pl-12 flex items-center justify-start;
}

.option-item:hover {
  @apply bg-black_mute;
}

.option-item.is-selected {
  @apply bg-black_mute pl-4;
}

.search-input {
  @apply m-2 p-2 rounded-md border border-solid border-divider_dark_1 text-xs;
  width: calc(100% - 15px);
}

@media (max-width: 480px) {
  .options-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    max-height: 50vh;
  }
}
</style>
