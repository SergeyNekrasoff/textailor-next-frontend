<template>
  <div>
    <h2>{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const title = computed((): string => '404 - page not found')
</script>
