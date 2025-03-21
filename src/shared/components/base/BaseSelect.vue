<template>
  <div class="relative flex items-center justify-start" ref="optionsRef">
    <slot name="icon"></slot>

    <button
      class="button-select"
      :class="[{ 'is-open': isOpen }, { 'button-select--xl': size === 'xl' }]"
      @click="isOpen = !isOpen"
    >
      <span class="pr-1.5">{{ selectedOption?.label || props.placeholder }}</span>
      <CaretUpIcon v-if="isOpen" :class="size === 'xl' ? 'size-3' : 'w-3 h-3'" />
      <CaretDownIcon v-else :class="size === 'xl' ? 'size-3' : 'w-3 h-3'" />
    </button>

    <div
      v-if="isOpen"
      class="options-container"
      :class="[
        { 'options-container--bottom': position === 'bottom' },
        { 'options-container--xl': size === 'xl' }
      ]"
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
  size?: string
}

const props = withDefaults(defineProps<UseSelectProps>(), {
  modelValue: null,
  options: () => [],
  placeholder: 'Select an option',
  searchable: false,
  position: 'top',
  size: ''
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

  &--xl {
    @apply w-full text-sm justify-between border border-solid border-text_dark_4 p-3;
  }
}

.options-container {
  @apply absolute left-auto right-0 border border-solid border-divider_dark_2 rounded-lg bg-black_soft z-[1000] w-[250px] overflow-hidden bottom-0 top-auto transform-gpu translate-y-[-32px];

  &--bottom {
    @apply top-0 bottom-auto transform-gpu translate-y-[38px];
  }

  &--xl {
    @apply w-full;
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
