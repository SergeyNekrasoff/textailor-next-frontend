<template>
  <EmptyLayout v-if="isEmptyLayout">
    <template v-slot:header>
      <BaseHeader />
    </template>
  </EmptyLayout>

  <DefaultLayout v-else>
    <template v-slot:header>
      <BaseHeader />
    </template>

    <template v-slot:navigation>
      <BaseNavigation />
    </template>
  </DefaultLayout>

  <!-- <ContainerModal /> -->
  <!-- <BaseToast /> -->
</template>

<script setup lang="ts">
import './styles/index.scss'

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { DefaultLayout, EmptyLayout } from '@/shared/layouts'
import BaseHeader from '@/shared/components/base/BaseHeader.vue'
import BaseNavigation from '@/shared/components/base/BaseNavigation.vue'
// import { ContainerModal } from '@/shared/ui/modal'
// import { BaseToast } from '@/shared/ui/toast'

const route = useRoute()
const isEmptyLayout = computed(() => route.meta.layout === 'empty')
</script>
