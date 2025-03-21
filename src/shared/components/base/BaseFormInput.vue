<template>
  <div class="base-input" :class="classes">
    <label v-if="label" class="base-input__label" :for="name">
      {{ label }}
    </label>

    <div class="base-input__wrap">
      <div v-if="$slots.prefix" class="base-input__prefix">
        <slot name="prefix"></slot>
      </div>

      <input
        ref="input"
        :value="modelValue"
        class="base-input__field"
        :class="{ 'base-input__field--no-border': !border }"
        :type="inputType"
        :name="name"
        :placeholder="placeholder"
        :disabled="isDisabled"
        autocomplete="false"
        @input="onInput"
        @blur="onBlur"
        @change="onChange"
        maxlength="255"
        minlength="3"
      />

      <div v-if="$slots.postfix" class="base-input__postfix">
        <slot name="postfix"></slot>
      </div>
    </div>

    <small v-if="error" class="base-input__error">
      {{ error }}
    </small>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRefValue } from '@/shared/lib/use/base/useRefValue'

const emit = defineEmits(['update:modelValue', 'blur', 'change'])

interface BaseInput {
  modelValue?: string | number
  label?: string
  name?: string
  isDisabled?: boolean
  placeholder?: string
  inputType?: 'text' | 'password' | 'number' | 'email'
  border?: boolean
  error?: string
}

const props = withDefaults(defineProps<BaseInput>(), {
  modelValue: '',
  inputType: 'text',
  placeholder: '',
  border: true
})

const classes = computed(() => ({
  'disabled events-none': props.isDisabled,
  error: props.error
}))

const { value: inputValue, setValue } = useRefValue(props.modelValue)

const onInput = (event: Event) => {
  const value = getValue(event)
  setValue(value)

  emit('update:modelValue', value)
}

const onBlur = () => {
  emit('blur', inputValue.value)
}

const onChange = () => {
  emit('change', inputValue.value)
}

const getValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  return target.value.trim()
}
</script>

<style lang="scss">
@mixin inputFocus() {
  @apply border-solid border-divider_light_2;
}

@mixin inputHover() {
  @apply border-solid border-divider_dark_1;
}

.base-input {
  @apply relative flex flex-col items-start justify-center w-full text-text_dark_1;

  &__wrap {
    @apply flex items-center justify-between w-full bg-gray_dark_4 rounded-md transition duration-100 ease-in-out;
  }

  &__label {
    @apply relative text-xs max-w-max pb-2;

    &.required::after {
      content: '*';
      @apply absolute top-0 -right-[10px] text-sm;
    }
  }

  &__prefix {
    @apply pl-2;
  }

  &__field {
    @apply w-full text-text_dark_1 font-light py-2 px-3 rounded-md border border-solid border-divider_dark_2 overflow-hidden;

    &--no-border,
    &--no-border:hover,
    &--no-border:focus,
    &--focus-visible,
    &:disabled {
      @apply border-none !important;
    }

    &::placeholder {
      @apply text-text_light_4 text-sm font-light;
    }

    &:focus-visible,
    &:focus {
      @include inputFocus;
    }

    &:hover {
      @include inputHover;
    }

    &:disabled {
      @apply text-white_mute bg-black_mute border-black_mute;
    }
  }

  &.error {
    .base-input__field {
      @apply border-tt;
    }

    .base-input__label {
      @apply text-gray;
    }

    .base-input__field {
      &::placeholder {
        @apply text-gray;
      }
    }

    .base-input__error {
      @apply absolute top-full text-tt;
    }
  }

  &.disabled {
    .base-input__wrap {
      @apply border-divider_dark_2;
    }

    .base-input__label {
      @apply text-gray_dark_2;
    }

    .base-input__field {
      &::placeholder {
        @apply text-gray_dark_2;
      }
    }
  }
}

.base-input__field,
.base-input__field:-webkit-autofill:hover,
.base-input__field:-webkit-autofill:focus {
  border-color: var(--vt-c-divider-dark-2);
  -webkit-box-shadow: 0 0 0px 1000px var(--vt-c-gray-dark-4) inset;
  transition: background-color 3000s ease-in-out 0s;

  &.focus {
    .base-input__field {
      @include inputFocus;
    }
  }
  &.hover {
    .base-input__field {
      @include inputHover;
    }
  }
}
</style>
