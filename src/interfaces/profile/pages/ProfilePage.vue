<template>
  <div
    class="mx-auto mt-4 w-[90%] max-w-[1280px] flex flex-col justify-center px-6 py-8 duration-500"
  >
    <div class="flex w-full flex-1 flex-col max-w-screen-xl mx-auto">
      <div class="my-16 mx-auto w-[516px] flex flex-col items-center justify-start p-2">
        <div class="flex items-center justify-between w-full mb-8">
          <span class="text-lg">Account Settings</span>
          <BaseButton class="" solid> Save Changes </BaseButton>
        </div>
        <div class="flex flex-col w-full mb-4">
          <BaseFormInput
            v-model="firstName"
            label="First Name"
            class="mb-4"
            name="input"
            placeholder="Enter your first name"
          />

          <BaseFormInput
            v-model="lastName"
            label="Last Name"
            class="mb-4"
            name="input"
            placeholder="Enter your last name"
          />
        </div>
        <hr class="w-full border-t border-text_dark_4 mb-4" />
        <div class="flex items-center justify-between w-full mt-4 mb-8">
          <span class="text-lg">Email Settings</span>
          <BaseButton class="" solid> Update Email </BaseButton>
        </div>
        <div class="flex flex-col w-full mb-4">
          <BaseFormInput
            v-model="email"
            label="Email"
            class="mb-4"
            name="input"
            placeholder="Email"
          />
        </div>
        <hr class="w-full border-t border-text_dark_4 mb-4" />
        <div class="flex items-center justify-between w-full mt-4 mb-8">
          <span class="text-lg">Default AI Model</span>
          <BaseButton class="" solid> Update Email </BaseButton>
        </div>
        <div class="flex flex-col w-full mb-4">
          <BaseSelect
            v-model="selectedAiModel"
            :options="AI_MODELS_ENTITY"
            searchable
            :size="'xl'"
            :position="'bottom'"
            :placeholder="AI_MODELS_ENTITY[2].label"
            @update:modelValue="handleModelSelect"
          />
        </div>
        <hr class="w-full border-t border-text_dark_4 mt-4 mb-4" />
        <div class="flex items-center justify-center py-4 text-sm">
          <span>
            Email
            <a
              href="email:help@textailor.io"
              alt="Help Email"
              class="font-[700] text-text_light_code"
            >
              help@textailor.io
            </a>
            if you have any questions.
          </span>
        </div>
        <hr class="w-full border-t border-text_dark_4 mt-4 mb-4" />
        <div class="flex items-center justify-between w-full mt-4 mb-4">
          <span class="text-lg">Delete Account</span>
        </div>
        <div class="flex items-center justify-between w-full mt-4 mb-4">
          <div class="w-[62%] text-sm text-gray_dark_1">
            Deleting your account is permanent and cannot be undone.
          </div>
          <BaseButton class="text-tt bg-transparent border border-solid border-tt" social>
            Delete Account
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import BaseButton from '@/shared/components/base/BaseButton.vue'
import BaseFormInput from '@/shared/components/base/BaseFormInput.vue'
import BaseSelect from '@/shared/components/base/BaseSelect.vue'
import { AI_MODELS_ENTITY } from '@/shared/config/ai'

const firstName: Ref<string> = ref('Sergey')
const lastName: Ref<string> = ref('')
const email: Ref<string> = ref('judixel89@gmail.com')

const selectedAiModel: Ref<number | null> = ref(AI_MODELS_ENTITY[2].id)

const handleModelSelect = (value: string | number) => {
  console.log(`value: ${value}`)
}
</script>
