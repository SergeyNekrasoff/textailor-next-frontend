<template>
  <label class="base-checkbox" :class="classes">
    <input
      v-model="model"
      type="checkbox"
      class="base-checkbox__input"
      :name="name"
      :disabled="isDisabled"
      :value="value"
    />

    <span class="base-checkbox__icon-wrap">
      <template v-if="modelValue">
        <svg
          class="base-checkbox__icon-bg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g fill="currentColor" fill-rule="nonzero">
              <path
                d="M18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 L18.25,3 Z M18.25,4.5 L5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 Z M10,14.4393398 L16.4696699,7.96966991 C16.7625631,7.6767767 17.2374369,7.6767767 17.5303301,7.96966991 C17.7965966,8.23593648 17.8208027,8.65260016 17.6029482,8.94621165 L17.5303301,9.03033009 L10.5303301,16.0303301 C10.2640635,16.2965966 9.84739984,16.3208027 9.55378835,16.1029482 L9.46966991,16.0303301 L6.46966991,13.0303301 C6.1767767,12.7374369 6.1767767,12.2625631 6.46966991,11.9696699 C6.73593648,11.7034034 7.15260016,11.6791973 7.44621165,11.8970518 L7.53033009,11.9696699 L10,14.4393398 L16.4696699,7.96966991 L10,14.4393398 Z"
              ></path>
            </g>
          </g>
        </svg>
      </template>
      <template v-else>
        <svg
          class="base-checkbox__icon-checked"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g fill="currentColor" fill-rule="nonzero">
              <path
                d="M6,3 L18,3 C19.6568542,3 21,4.34314575 21,6 L21,18 C21,19.6568542 19.6568542,21 18,21 L6,21 C4.34314575,21 3,19.6568542 3,18 L3,6 C3,4.34314575 4.34314575,3 6,3 Z M6,5 C5.44771525,5 5,5.44771525 5,6 L5,18 C5,18.5522847 5.44771525,19 6,19 L18,19 C18.5522847,19 19,18.5522847 19,18 L19,6 C19,5.44771525 18.5522847,5 18,5 L6,5 Z"
              ></path>
            </g>
          </g>
        </svg>
      </template>
    </span>

    <span v-if="$slots.default" class="base-checkbox__label">
      <slot></slot>
    </span>

    <small v-if="error" class="base-checkbox__error">{{ error }}</small>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

interface IBaseCheckbox {
  value?: string | number
  modelValue: boolean | string[] | number[] | undefined
  name?: string
  isDisabled?: boolean
  error?: string
}

const props = withDefaults(defineProps<IBaseCheckbox>(), {
  value: undefined
})

const model = computed({
  get(): IBaseCheckbox['modelValue'] {
    return props.modelValue
  },

  set(value: IBaseCheckbox['modelValue']) {
    emit('update:modelValue', value)
  }
})

const classes = computed(() => ({
  'disabled events-none': props.isDisabled,
  error: props.error
}))
</script>

<style lang="scss">
@mixin checkboxHover() {
  .base-checkbox__icon-bg {
    @apply text-gray_light_1;
  }
}

@mixin checkboxFocus {
  .base-checkbox__icon-bg {
    @apply text-gray_light_1;
  }
}

@mixin checkboxChecked {
  .base-checkbox__icon-checked {
    @apply text-gray_dark_5;
  }
}

.base-checkbox {
  @apply relative flex items-center justify-start cursor-pointer h-9 z-50;

  &__label {
    @apply text-white_mute ml-2;
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

  &:hover {
    @include checkboxHover;
  }

  &__input {
    @apply absolute w-[0.01px] h-[0.01px];

    &:checked + .base-checkbox__icon-wrap {
      @include checkboxChecked;
    }

    &:focus-visible + .base-checkbox__icon-wrap {
      @include checkboxFocus;
    }
  }

  &.error {
    .base-checkbox__label {
      @apply text-gray;
    }

    .base-checkbox__icon-bg {
      @apply text-gray;
    }

    .base-checkbox__icon-checked {
      @apply text-gray;
    }

    .base-checkbox__error {
      @apply absolute top-full mt-1 text-tt;
    }
  }

  &.disabled {
    .base-checkbox__label {
      @apply text-gray_dark_1;
    }

    .base-checkbox__icon-bg {
      @apply text-gray_dark_1;
    }

    .base-checkbox__icon-checked {
      @apply text-gray_dark_1;
    }
  }
}

.base-checkbox {
  &.focus {
    @include checkboxFocus;
  }

  &.hover {
    @include checkboxHover;
  }

  &.checked {
    @include checkboxChecked;
  }
}
</style>
