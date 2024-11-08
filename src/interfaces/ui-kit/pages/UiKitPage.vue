<template>
  <div class="mx-auto w-[90%] flex flex-col justify-center px-6 py-8 duration-500">
    <div class="flex w-full flex-1 flex-col max-w-screen-xl mx-auto">
      <div class="flex items-center justify-between mb-20">
        <div class="text-2xl">UI KIT</div>
      </div>

      <div class="grid grid-cols-5 gap-4">
        <InputStyles />

        <CheckboxStyles />

        <RadioStyles />

        <ButtonStyles />

        <LoaderStyles />

        <PaginationStyles />

        <DropdownStyles :items="['item1', 'item2', 'item3']" />

        <!-- <ToastStyles /> -->

        <!-- <ModalsStyles /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { scrollTop } from '@/shared/lib/dom'
// import { onBeforeMount } from 'vue'
import InputStyles from '../components/InputStyles.vue'
import CheckboxStyles from '../components/CheckboxStyles.vue'
import RadioStyles from '../components/RadioStyles.vue'
import ButtonStyles from '../components/ButtonStyles.vue'
import LoaderStyles from '../components/LoaderStyles.vue'
import PaginationStyles from '../components/PaginationStyles.vue'
import DropdownStyles from '../components/DropdownStyles.vue'
// import ToastStyles from '@/pages/ui-kit/ui/ToastStyles.vue'
// import ModalsStyles from '@/pages/ui-kit/ui/ModalsStyles.vue'

// onBeforeMount(scrollTop)
</script>
