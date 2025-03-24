<template>
  <div class="layout layout--default" ref="app">
    <slot name="header" />

    <slot name="navigation"></slot>

    <main>
      <router-view />
    </main>
    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/store/AuthStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const { token } = storeToRefs(authStore)

const router = useRouter()

onMounted(() => {
  if (!token.value) {
    router.push({ name: 'LoginPage' })
  }
})
</script>
