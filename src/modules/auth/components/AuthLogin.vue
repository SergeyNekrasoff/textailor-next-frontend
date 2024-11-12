<template>
  <form>
    <BaseFormInput
      v-model="userForm.username"
      label="Username"
      class="mb-8"
      name="username"
      placeholder="Username"
    />

    <BaseFormInput
      v-model="userForm.password"
      label="Password"
      class="mb-8"
      name="password"
      placeholder="Password"
    />

    <BaseButton class="mb-4" :primary="true" @click="onLogin"> Login </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseFormInput from '@/shared/components/base/BaseFormInput.vue'
import BaseButton from '@/shared/components/base/BaseButton.vue'
import { AuthService } from '../services/AuthService'
import { useAuthStore } from '../store/AuthStore'

const userForm = ref({ username: '', password: '' })
const authService = new AuthService()

const onLogin = async () => {
  try {
    const { data } = await authService.login(userForm.value.username, userForm.value.password)
    const authStore = useAuthStore()

    authStore.setToken(data.access_token)
    // authStore.setUser(response.user)
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>
