<template>
  <button
    v-bind="attrs"
    type="button"
    class="button-base"
    :class="[
      { 'button-base__disabled': disabled },
      { 'button-base__primary': primary },
      { 'button-base__solid': solid }
    ]"
    :disabled="disabled"
    @click.stop.prevent="click"
  >
    <slot name="icon"></slot>

    <span v-if="$slots.default" class="button__text">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'

interface IButton {
  primary?: boolean
  solid?: boolean
  disabled?: boolean
}

const emit = defineEmits(['click'])

const attrs = useAttrs()

const props = withDefaults(defineProps<IButton>(), {
  disabled: false
})

const click = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<style lang="scss">
.button-base {
  @apply text-sm flex items-center justify-start rounded-md py-2 px-4 border-solid;

  &:hover {
    @apply bg-black_soft;
  }

  &__primary {
    @apply bg-black_mute;

    &:hover {
      @apply bg-black_soft;
    }
  }

  &__solid {
    @apply border border-gray_dark_2;

    &:hover {
      @apply bg-black_mute;
    }
  }

  &__disabled {
    @apply cursor-not-allowed bg-divider_light_2 text-divider_dark_1;

    &:hover,
    &:active,
    &:focus {
      @apply cursor-not-allowed bg-divider_light_2;
    }
  }
}
</style>
