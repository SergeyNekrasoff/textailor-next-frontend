<template>
  <section>
    <h2 class="mb-s">Pagination</h2>

    <BasePagination :model-value="page" :count="count" @update:model-value="setPage" />
  </section>
</template>

<script setup lang="ts">
import BasePagination from '../../../shared/components/base/BasePagination.vue'
import { ref } from 'vue'

const page = ref(1)
const count = ref(10)

function setPage(value: number) {
  page.value = value
}
</script>

<style lang="scss"></style>
