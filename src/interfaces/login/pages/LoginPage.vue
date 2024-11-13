<template>
  <div
    class="h-screen max-w-[360px] mx-auto flex flex-col items-center justify-center duration-500"
  >
    <div class="h-[500px] w-full flex flex-1 flex-col absolute -transform-y-1/2">
      <BaseLogo class="scale-[0.6] absolute -top-[60px] -left-[50px]" />
      <p class="text-lg prompt-light mb-2 mt-6">Sign into your account</p>
      <AuthLogin />
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthLogin from '@/modules/auth/components/AuthLogin.vue'
import BaseLogo from '@/shared/components/base/BaseLogo.vue'
</script>
