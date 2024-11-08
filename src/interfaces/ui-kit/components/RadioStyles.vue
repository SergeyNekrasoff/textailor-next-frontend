<template>
  <section class="pr-6">
    <h2 class="mb-8">Radio</h2>

    <BaseRadioInput v-model="value" name="radio" :options="options" />

    <div class="mt-4">result: {{ value?.value ?? 'empty' }}</div>
  </section>
</template>

<script setup lang="ts">
import BaseRadioInput from '../../../shared/components/base/BaseRadioInput.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'

const options = [
  {
    id: 1,
    value: 'Test 1'
  },
  {
    id: 2,
    value: 'Test 2'
  },
  {
    id: 3,
    value: 'Test 3'
  },
  {
    id: 4,
    value: 'Test 4'
  },
  {
    id: 5,
    value: 'Test 5'
  }
]

const value: Ref<object | null> = ref(null)
</script>
