<template>
  <EmptyLayout v-if="isEmptyLayout">
    <template v-slot:header>
      <BaseHeader />
    </template>
  </EmptyLayout>

  <DefaultLayout v-else-if="!isEmptyLayout && !isHeadlessLayout">
    <template v-slot:header>
      <BaseHeader />
    </template>

    <template v-slot:navigation>
      <BaseNavigation />
    </template>
  </DefaultLayout>

  <HeadlessLayout />

  <BaseContainerModal />
  <!-- <BaseToast /> -->
</template>

<script setup lang="ts">
import './styles/index.scss'

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { DefaultLayout, EmptyLayout, HeadlessLayout } from '@/shared/layouts'
import BaseHeader from '@/shared/components/base/BaseHeader.vue'
import BaseNavigation from '@/shared/components/base/BaseNavigation.vue'
import BaseContainerModal from '@/shared/components/base/BaseContainerModal.vue'
// import { BaseToast } from '@/shared/ui/toast'

const route = useRoute()
const isEmptyLayout = computed(() => route.meta.layout === 'empty')
const isHeadlessLayout = computed(() => route.meta.layout === 'headless')

console.log(`isEmptyLayout: ${JSON.stringify(route.meta.layout)}`)
</script>
