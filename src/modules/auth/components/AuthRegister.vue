<template>
  <div class="">
    <BaseButton class="mb-10 w-full" :solid="true" :social="true" @click="onRegisterWithGoogle">
      <template #icon>
        <img :src="getImageUrl('google')" class="w-5 h-5 mr-2" alt="" />
      </template>
      Sign Up with Google
    </BaseButton>

    <div class="flex flex-col items-center justify-center mb-4">
      <div class="custom-line"></div>
      <p class="text-xs font-[400] text-gray_dark_1 px-4 bg-black">Or sign up with your email</p>
    </div>

    <form class="my-4">
      <BaseFormInput
        v-model="userForm.email"
        class="mb-4"
        name="email"
        placeholder="Enter your email"
      />

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
        class="mb-4 w-full bg-blue_darker"
        :solid="false"
        :center="true"
        @click="onRegister"
      >
        Sign up with Email
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
import { ref } from 'vue'
import BaseFormInput from '@/shared/components/base/BaseFormInput.vue'
import BaseButton from '@/shared/components/base/BaseButton.vue'
// import { AuthService } from '../services/AuthService'
// import { useRouter } from 'vue-router'

// const router = useRouter()

const userForm = ref({ username: '', password: '', email: '' })
// const authService = new AuthService()

// const onRegister = async () => {
//   try {
//     const response = await authService.register(
//       userForm.value.username,
//       userForm.value.password,
//       userForm.value.email
//     )

//     console.log(`response: ${response}`)

//     // router.push({ path: '/' })
//   } catch (error) {
//     console.error('Register failed:', error)
//   }
// }

const onRegisterWithGoogle = () => console.log(`Register with Google`)

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
