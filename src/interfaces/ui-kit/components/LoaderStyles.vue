<template>
  <section class="pr-6">
    <h2 class="mb-8">Loaders</h2>

    <div class="column gap-s max-w-field">
      <BarsLoader />

      <div class="row gap-s">
        <SpinnerLoader size="sm" />
        <SpinnerLoader size="md" />
        <SpinnerLoader size="lg" />
        <SpinnerLoader />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BarsLoader from '../../../shared/components/base/BarsLoader.vue'
import SpinnerLoader from '../../../shared/components/base/SpinnerLoader.vue'
</script>
