<template>
  <div>
    <BaseButton class="mb-10 w-full" :solid="true" :social="true" @click="onRegisterWithGoogle">
      <template #icon>
        <img :src="getImageUrl('google')" class="w-5 h-5 mr-2" alt="" />
      </template>
      Sign Up with Google
    </BaseButton>

    <div class="flex flex-col items-center justify-center mb-4">
      <div class="custom-line"></div>
      <p class="text-xs font-[400] text-gray_dark_1 px-4 bg-black_flash">
        Or sign up with your email
      </p>
    </div>

    <form class="my-4">
      <div class="mb-4">
        <BaseFormInput v-model="userForm.email" name="email" placeholder="Enter your email" />
        <span v-if="error && !isChanged" class="mt-1 text-xs text-red_dark">
          {{ error }}
        </span>
      </div>

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

      <BaseButton
        class="mb-4 w-full bg-text_light_code"
        :solid="false"
        :center="true"
        @click="register(userForm)"
      >
        Register with Email
      </BaseButton>
    </form>

    <div class="flex flex-col items-center justify-center mt-4">
      <p class="text-xs font-[400] text-gray_dark_1 px-4">
        Already have an account?
        <router-link to="/login" class="text-blue_lighter">Login</router-link>
      </p>
    </div>

    <div class="text-xs font-[400] text-gray_dark_1 mt-12 flex justify-center">
      By signing up, you agree to receive emails from us.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import BaseFormInput from '@/shared/components/base/BaseFormInput.vue'
import BaseButton from '@/shared/components/base/BaseButton.vue'
import { useAuthStore } from '../store/AuthStore'
import { storeToRefs } from 'pinia'
import type { UserRegister } from '../types'

const apiAuthStore = useAuthStore()
const { register } = useAuthStore()
const { error } = storeToRefs(apiAuthStore)

const userForm: Ref<UserRegister> = ref({ username: '', password: '', email: '' })
const isChanged: Ref<boolean> = ref(false)

const onRegisterWithGoogle = () => console.log(`Register with Google`)

const email: Ref<string> = computed(() => userForm.value.email)

watch(email, (oldValue, newValue) => {
  if (newValue) {
    isChanged.value = true
  }
})

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
