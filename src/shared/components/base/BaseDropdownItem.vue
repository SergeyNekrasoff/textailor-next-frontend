<template>
  <div v-bind="attrs" class="dropdown-elem" :class="{ 'dropdown-elem_divider': divider }">
    <slot name="icon"></slot>
    <span v-if="$slots.default" class="dropdown-elem__text">
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'

interface IBaseDropdownItem {
  divider?: boolean
}

const attrs = useAttrs()

withDefaults(defineProps<IBaseDropdownItem>(), {
  divider: false
})
</script>

<style lang="scss" scoped>
.dropdown-elem {
  @apply flex items-center gap-3 min-w-max h-10 px-2 py-0 rounded-md cursor-pointer text-xs;

  &,
  &:hover {
    @apply no-underline;
  }

  &:hover,
  &:link:hover,
  &:link:focus {
    @apply bg-black_soft;
  }

  &_divider {
    @apply my-2 mx-0 h-[1px] overflow-hidden p-0 bg-divider_dark_2 cursor-default;

    &:hover,
    &:link:hover,
    &:link:focus {
      @apply cursor-default bg-transparent;
    }
  }
}
</style>
