<template>
  <section class="pr-6">
    <h2 class="mb-8">Inputs</h2>

    <div class="column gap-s max-w-field">
      <BaseFormInput
        label="Firstname"
        class="mb-8"
        name="input"
        :error="'Something went wrong'"
        placeholder="Something text.."
      />

      <BaseFormInput
        label="Lastname"
        class="disabled mb-8"
        name="input"
        :is-disabled="true"
        placeholder="Something text.."
      />

      <BaseFormInput label="Password" class="mb-8" name="input" placeholder="Something text.." />

      <BaseFormInput label="City" class="mb-8" name="input" placeholder="Something text.." />

      <BaseFormInput
        label="Price"
        class="mb-8"
        name="input"
        placeholder="Something text.."
        :is-disabled="true"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseFormInput from '../../../shared/components/base/BaseFormInput.vue'
</script>
