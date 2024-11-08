<template>
  <div v-if="count > 0" class="pagination column gap-xs">
    <div class="pagination__info">Page {{ modelValue }} of {{ count }}</div>

    <div class="pagination__pages row gap-xxs">
      <button
        class="pagination__button pagination__button--arrow-prev pseudo-double-arrow reset"
        type="button"
        :disabled="isDisabled || isFirstPage"
        @click="updateModelValue(modelValue - 1)"
      />

      <button
        class="pagination__button reset"
        :class="{ active: modelValue === 1 }"
        type="button"
        :disabled="isDisabled || isFirstPage"
        @click="updateModelValue(1)"
        v-text="1"
      />

      <span v-if="visibleDotsLeft">...</span>

      <button
        v-for="page in pages"
        :key="page"
        class="pagination__button reset"
        :class="{ active: page === modelValue }"
        type="button"
        :disabled="page === modelValue || isDisabled"
        @click="updateModelValue(page)"
        v-text="page"
      />

      <span v-if="visibleDotsRight">...</span>

      <button
        v-if="count > 1"
        class="pagination__button reset"
        :class="{ active: count === modelValue }"
        :disabled="count === modelValue || isDisabled"
        type="button"
        @click="updateModelValue(count)"
        v-text="count"
      />

      <button
        class="pagination__button pseudo-double-arrow reset"
        type="button"
        :disabled="isDisabled || isLastPage"
        @click="updateModelValue(modelValue + 1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/app/providers/store/index'

const emit = defineEmits(['update:modelValue'])

interface IPagination {
  modelValue: number
  count: number
  isDisabled?: boolean
}

const props = withDefaults(defineProps<IPagination>(), {
  isDisabled: false
})

const appStore = useAppStore()

const isMobile = computed(() => appStore.screenWidth <= 400)

const isFirstPage = computed(() => props.modelValue === 1)
const isLastPage = computed(() => props.modelValue === props.count)

const visibleDots = computed(() => {
  if (isMobile.value) {
    return props.count > 6
  }
  return props.count > 7
})

const pageForVisibleDotsLeft = computed(() => (isMobile.value ? 3 : 4))
const visibleDotsLeft = computed(
  () => visibleDots.value && props.modelValue > pageForVisibleDotsLeft.value
)

const pageForVisibleDotsRight = computed(() => (isMobile.value ? 2 : 3))
const visibleDotsRight = computed(
  () => visibleDots.value && props.modelValue < props.count - pageForVisibleDotsRight.value
)

const pageForStartPages = computed(() => (isMobile.value ? 4 : 5))

const pages = computed(() => {
  if (props.modelValue < pageForStartPages.value) {
    return getStartPages()
  }

  if (props.modelValue > props.count - 3) {
    return getEndPages()
  }

  return getMiddlePages()
})

function updateModelValue(num: number) {
  emit('update:modelValue', num)
}

function getStartPages() {
  return getStartPagesList().filter(between)
}
function getStartPagesList() {
  if (isMobile.value) {
    return [2, 3, 4]
  }
  return [2, 3, 4, 5, 6]
}

function getMiddlePages() {
  if (isMobile.value) {
    return [props.modelValue - 1, props.modelValue, props.modelValue + 1]
  }

  return [
    props.modelValue - 2,
    props.modelValue - 1,
    props.modelValue,
    props.modelValue + 1,
    props.modelValue + 2
  ]
}

function getEndPages() {
  if (isMobile.value) {
    return [
      props.modelValue - 3,
      props.modelValue - 2,
      props.modelValue - 1,
      props.modelValue,
      props.modelValue + 1,
      props.modelValue + 2
    ]
      .filter(between)
      .slice(-3)
  }

  return [
    props.modelValue - 5,
    props.modelValue - 4,
    props.modelValue - 3,
    props.modelValue - 2,
    props.modelValue - 1,
    props.modelValue,
    props.modelValue + 1,
    props.modelValue + 2
  ]
    .filter(between)
    .slice(-5)
}

function between(page: number) {
  return page > 1 && page < props.count
}
</script>

<style lang="scss">
.pagination {
  &__button {
    border: 1.5px solid var(--color__black);
    min-width: 40px;
    min-height: 40px;
    padding: 8px;
    font-weight: 600;
    color: var(--color__white);
    background-color: var(--color__black);

    &--arrow-prev {
      &::before {
        transform: translate(-50%, -50%) rotate(135deg);
      }

      &::after {
        transform: translate(0, -50%) rotate(135deg);
      }
    }

    &:focus-visible,
    &:hover {
      border-color: var(--vt-c-dark-mute);
      color: var(--vt-c-dark-mute);
    }

    &:active {
      border-color: var(--vt-c-red--dark);
      color: var(--vt-c-red--dark);
    }

    &:disabled {
      border-color: var(--vt-c-grey--transparent);
      color: var(--vt-c-grey--transparent);
    }

    &.active {
      border-color: var(--vt-c-red);
      color: var(--vt-c-green-lighter);
    }
  }
}

// @media (max-width: $breakpoint-s) {
//   .pagination {
//     &__pages {
//       gap: var(--min);
//     }

//     &__button {
//       min-width: 30px;
//       min-height: 30px;
//       padding: 4px;
//       font-size: 14px;
//     }
//     span {
//       font-size: 10px;
//     }
//   }
// }
</style>
