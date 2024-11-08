<template>
  <div class="radio" :class="classes">
    <div v-if="label" class="radio__label label mb-xxs">
      {{ label }}
    </div>

    <div class="radio__list column gap-xxs">
      <RadioItem
        v-for="item of options"
        :key="item.id"
        :item="item"
        :name="name"
        :is-checked="item.value === (modelValue && modelValue.value)"
        :is-error="Boolean(error)"
        :is-disabled="isDisabled"
        @change="onChange"
      />
    </div>
    <small v-if="error" class="radio__error red">{{ error }}</small>
  </div>
</template>

<script setup lang="ts">
import RadioItem from './BaseRadioItem.vue'
import { computed } from 'vue'

interface IRadioItem {
  id: number
  value: number | string
  label?: string
}

const emit = defineEmits(['update:modelValue', 'change'])

interface IRadio {
  modelValue?: IRadioItem
  options: IRadioItem[]
  label?: string
  name?: string
  isDisabled?: boolean
  error?: string
}

const props = defineProps<IRadio>()

const classes = computed(() => ({
  'disabled  events-none': props.isDisabled,
  error: props.error
}))

function onChange(item: IRadio) {
  emit('update:modelValue', item)
}
</script>

<style lang="scss">
.radio {
  @apply relative;

  &__list {
    @apply flex flex-col items-start justify-center;
  }

  &__error {
    @apply absolute -bottom-[20px];
  }

  &.error {
    .radio__label {
      @apply text-tt;
    }
  }

  &.disabled {
    .radio__label {
      @apply text-gray;
    }
  }
}
</style>
