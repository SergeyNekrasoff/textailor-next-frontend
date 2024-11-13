<template>
  <div class="">
    <BaseButton class="mb-10 w-full" :solid="true" :social="true" @click="onLogin">
      <template #icon>
        <img :src="getImageUrl('google')" class="w-5 h-5 mr-2" alt="" />
      </template>
      Sign in with Google
    </BaseButton>

    <div class="flex flex-col items-center justify-center mb-4">
      <div class="custom-line"></div>
      <p class="text-xs font-[400] text-gray_dark_1 px-4 bg-black">Or sign in with your email</p>
    </div>

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

      <BaseButton class="mb-4 w-full bg-blue_darker" :solid="false" :center="true" @click="onLogin">
        Continue with Email
      </BaseButton>
    </form>

    <div class="flex flex-col items-center justify-center mt-4">
      <p class="text-xs font-[400] text-gray_dark_1 px-4">
        Don't have an account?
        <router-link to="/sign-up" class="text-blue_lighter">Sign up</router-link>
        to register.
      </p>
    </div>
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

<style lang="scss" scoped>
.custom-line {
  @apply relative w-full;

  &:before {
    content: '';
    font-size: 0;
    width: 100%;
    height: 0.5px;
    position: absolute;
    top: 8px;
    left: 0;
    right: 0;
    background-color: var(--vt-c-gray-dark-3);
    display: block;
    z-index: 0;
  }
}
</style>
