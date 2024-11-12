<template>
  <div class="">
    <BaseButton class="bg-blue_darker mb-10 w-full" :solid="false" :social="true" @click="onLogin">
      <template #icon>
        <img :src="getImageUrl('google')" class="w-5 h-5 mr-2" alt="" />
      </template>
      Sign in with Google
    </BaseButton>

    <div></div>

    <form class="my-4">
      <BaseFormInput
        v-model="userForm.username"
        class="mb-4"
        name="username"
        placeholder="Enter your username"
      />

      <BaseFormInput
        v-model="userForm.password"
        class="mb-4"
        :inputType="'password'"
        name="password"
        placeholder="Password"
      />

      <BaseButton class="mb-4" :primary="true" @click="onLogin"> Login </BaseButton>
    </form>
  </div>
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

const getImageUrl = (iconName: unknown) => {
  return new URL(`../../../assets/icons/${iconName}.svg`, import.meta.url).href
}
</script>

<style lang="scss" scoped></style>
