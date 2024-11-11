<template>
  <div>
    <!-- <teleport to="body">
      <div v-if="isOpen" class="toast">
        <div
          v-for="({ message, type }, index) in messageList"
          :key="index"
          class="toast__message"
          :class="[`toast__message_type-${type}`]"
        >
          <component
            :is="iconName(type)"
            class="h-5 w-5 mr-2 text-text_dark_2"
            @click="close(message)"
          />
          <div class="toast__text">{{ message }}</div>
          <XCircleIcon
            class="h-5 w-5 text-text_dark_2 hover:text-white_soft cursor-pointer"
            @click="close(message)"
          />
        </div>
      </div>
    </teleport> -->
    <button @click="showToast('Success', 'Operation successful!', 'success')">
      Show Success Toast
    </button>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/shared/lib/use/useToast'
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  NoSymbolIcon
} from '@/shared/components/icons'

// const { isOpen, messageList, close } = useToast()

const iconName = (type: string | undefined) => {
  switch (type) {
    case 'success':
      return CheckCircleIcon
    case 'error':
      return NoSymbolIcon
    case 'info':
      return InformationCircleIcon
    default:
      return ''
  }
}

const toastId = ref('')

const { toasts, addToast, closeToast, autoCloseToast } = useToast()

const showToast = (title: string, message: string, type: 'success' | 'error' | 'warning') => {
  const toastElement = document.createElement('div')
  toastElement.textContent = `${title}: ${message}`
  toastElement.classList.add(`toast`)
  toastElement.classList.add(`toast-${type}`)

  addToast({
    id: toastId.value,
    title,
    message,
    type,
    element: toastElement
  })

  toastId.value += 1

  document.body.appendChild(toastElement)

  setTimeout(() => {
    autoCloseToast(toastId.value.toString())
  }, 5000)
}
</script>

<style lang="scss">
.toast {
  @apply flex flex-col fixed bottom-1 right-2 z-50;

  &__message {
    @apply flex items-center justify-between text-sm gap-1 w-[420px] h-12 p-4 mb-2 text-white_soft rounded-md;
    animation: slide-up 0.4s ease;

    &_type-success {
      @apply bg-green_dark shadow-md;
    }

    &_type-error {
      @apply bg-red_dark shadow-md;
    }

    &_type-info {
      @apply bg-blue_dark shadow-md;
    }
  }

  &__text {
    margin-right: auto;
  }
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(0.5rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
