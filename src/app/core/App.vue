<template>
  <EmptyLayout v-if="isEmptyLayout">
    <!-- <template v-slot:header>
      <Header />
    </template> -->
  </EmptyLayout>

  <DefaultLayout v-else>
    <!-- <template v-slot:header>
      <Header />
    </template>

    <template v-slot:navigation>
      <Navigation />
    </template> -->
  </DefaultLayout>

  <ContainerModal />
  <BaseToast />
</template>

<script setup lang="ts">
import './styles/index.scss'

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { DefaultLayout, EmptyLayout } from '@/shared/ui/layouts'
// import { Header } from '@/widgets/header'
// import { Navigation } from '@/widgets/navigation'
// import { Footer } from '@/widgets/footer'
// import { ContainerModal } from '@/shared/ui/modal'
// import { BaseToast } from '@/shared/ui/toast'

const route = useRoute()
const isEmptyLayout = computed(() => route.meta.layout === 'empty')
</script>
