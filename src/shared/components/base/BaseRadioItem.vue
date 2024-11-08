<template>
  <label class="radio-item" :class="classes">
    <input
      class="radio-item__input"
      type="radio"
      :name="name"
      :value="item.value"
      :checked="isChecked"
      :disabled="isDisabled"
      @change="onChange"
    />

    <span class="radio-item__icon-wrap">
      <template v-if="!isChecked">
        <svg
          class="radio-item__icon-bg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="currentColor">
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
            />
          </g>
        </svg>
      </template>
      <template v-else>
        <svg
          class="radio-item__icon-checked"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="currentColor">
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
            />
          </g>
        </svg>
      </template>
    </span>

    <span class="radio-item__label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits(['change'])

interface IRadioItem {
  id: number
  value: number | string
  label?: string
}

interface IRadio {
  item: IRadioItem
  name?: string
  isDisabled?: boolean
  isError?: boolean
  isChecked: boolean
}

const props = defineProps<IRadio>()

const classes = computed(() => ({
  'disabled events-none': props.isDisabled,
  error: props.isError
}))

const label = computed(() => props.item.label || props.item.value)

const onChange = () => {
  emit('change', props.item)
}
</script>

<style lang="scss">
.radio-item {
  @apply relative flex items-center justify-start cursor-pointer h-9 z-50;
  width: max-content;

  &:hover {
    @apply text-gray_light_1;
  }

  &__input {
    @apply absolute w-[0.01px] h-[0.01px];

    &:checked + .radio-item__icon-wrap {
      @apply text-gray_dark_5;

      &::before {
        opacity: 1;
        visibility: visible;
      }
    }

    &:focus-visible + .radio-item__icon-wrap {
      @apply text-gray_light_1;
    }

    &:hover + .radio-item__icon-wrap {
      background-color: var(--color__dark-blue--light);
    }

    &:active + .radio-item__icon-wrap {
      animation: ease infinite keyframes-scale09 0.5s;
    }
  }

  &__icon-wrap {
    @apply relative w-6 h-6 block;
  }

  &__icon-bg {
    @apply text-white_mute;
  }

  &__icon-checked {
    @apply text-white_mute transition-all duration-75 ease-in-out;
  }

  &__label {
    @apply text-white_mute ml-2;
  }

  &.error {
    .radio-item__label {
      @apply text-gray;
    }

    .radio-item__icon-bg {
      @apply text-gray;
    }

    .radio-item__icon-checked {
      @apply text-gray;
    }

    .radio-item__error {
      @apply absolute top-full mt-1 text-tt;
    }
  }

  &.disabled {
    .radio-item__label {
      @apply text-gray_dark_1;
    }

    .radio-item__icon-bg {
      @apply text-gray_dark_1;
    }

    .radio-item__icon-checked {
      @apply text-gray_dark_1;
    }
  }
}

@keyframes keyframes-scale09 {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>
