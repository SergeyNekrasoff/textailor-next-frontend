<template>
  <section class="pr-6">
    <h2 class="mb-8">Checkbox</h2>

    <div class="column gap-s max-w-field">
      <BaseFormCheckbox v-model="checkboxBase1" class="mb-4" name="checkbox">
        Label 1 {{ checkboxBase1 }}
      </BaseFormCheckbox>
      <BaseFormCheckbox v-model="checkboxBase2" class="mb-4" name="checkbox">
        Label 2 {{ checkboxBase2 }}
      </BaseFormCheckbox>
      <BaseFormCheckbox v-model="checkboxBase3" class="mb-4" :is-disabled="true" name="checkbox">
        Label 3 {{ checkboxBase3 }}
      </BaseFormCheckbox>
      <BaseFormCheckbox v-model="checkboxBase4" class="mb-4" :is-disabled="true" name="checkbox">
        Label 4 {{ checkboxBase4 }}
      </BaseFormCheckbox>
      <BaseFormCheckbox v-model="checkboxBase5" class="mb-4" name="checkbox">
        Label 5 {{ checkboxBase5 }}
      </BaseFormCheckbox>
      <BaseFormCheckbox
        v-model="checkboxBase6"
        class="mb-4"
        :is-disabled="true"
        :error="error"
        name="checkbox"
      >
        Label 6 {{ checkboxBase6 }}
      </BaseFormCheckbox>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import BaseFormCheckbox from '../../../shared/components/base/BaseFormCheckbox.vue'

const checkboxBase1: Ref<boolean> = ref(false)
const checkboxBase2: Ref<boolean> = ref(false)
const checkboxBase3: Ref<boolean> = ref(true)
const checkboxBase4: Ref<boolean> = ref(true)
const checkboxBase5: Ref<boolean> = ref(false)
const checkboxBase6: Ref<boolean> = ref(false)

const error = computed(() => {
  return 'Some error'
})
</script>
