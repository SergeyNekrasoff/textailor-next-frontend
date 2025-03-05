<template>
  <div class="relative xss:hidden z-50">
    <transition name="slide-fade">
      <span v-if="isHovered && !visibleLink" class="feature-tooltip">Add Link</span>
    </transition>
    <button
      id="nodeLink"
      type="button"
      role="button"
      ref="nodeLink"
      class="w-[36px] h-[36px] text-text_dark_2 flex items-center justify-center rounded-lg p-1 transition hover:bg-divider_dark_2"
      :class="getCurrentModal ? 'bg-gray_dark_2' : ''"
      @click="show"
    >
      <LinkIcon :size="'size-6'" :class="getCurrentModal ? 'text-gray_light_3' : ''" />
    </button>

    <!-- Modal -->
    <div
      v-if="visibleLink && getCurrentModal"
      ref="textLinkRef"
      class="absolute w-[320px] xss:-left-2 s:left-0 m:-left-[330px] -top-[20px] flex flex-col items-start justify-start border bg-divider_light_2 border-black_mute rounded-lg p-4 z-[1000]"
    >
      <div class="flex items-start justify-between w-full relative">
        <div class="flex flex-col items-start justify-start">
          <input
            v-model="urlText"
            type="text"
            name="url-text"
            placeholder="Enter name link"
            class="h-10 rounded-md border border-solid border-shade px-2 mb-2 text-accent hover:outline-none focus:outline-none focus-visible:outline-none active:outline-none xss:text-xs s:text-sm m:text-sm"
          />

          <input
            v-model="urlPath"
            type="text"
            name="url-path"
            placeholder="Paste URL path"
            class="h-10 rounded-md border border-solid border-shade px-2 text-accent hover:outline-none focus:outline-none focus-visible:outline-none active:outline-none xss:text-xs s:text-sm m:text-sm"
          />
          <transition name="slide-fade">
            <span v-if="hasError" class="mt-1 text-xs text-red_dark">
              {{ errorMessage }}
            </span>
          </transition>
        </div>

        <BaseButton
          class="border border-divider_dark_1"
          :disabled="!urlPath || !isValidTextLink"
          @click="addTextLink"
        >
          Add
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import BaseButton from '@/shared/components/base/BaseButton.vue'
import { isValidUrlProtocol } from '@/shared/lib/utils/validUrl'
import { useElementHover, onClickOutside } from '@vueuse/core'
import { LinkIcon } from '@/shared/components/icons'

const emits = defineEmits(['open-modal', 'add-text-link'])

interface IProps {
  currentModal: string
}

const props = defineProps<IProps>()
const textLinkRef: Ref<HTMLDivElement | null> = ref(null)

const selection = window.getSelection() as Selection
const visibleLink: Ref<boolean> = ref(false)
const nodeLink: Ref<HTMLDivElement | null> = ref(null)
const isHovered = useElementHover(nodeLink)
const urlPath: Ref<string> = ref('')
const urlText: Ref<string> = ref('')

const errorMessage: Ref<string> = ref('')
const isValidTextLink: Ref<boolean> = ref(false)

const show = () => {
  visibleLink.value = true
  emits('open-modal', 'text-link')

  getSelectionText()
}

const close = () => {
  visibleLink.value = false
  removeUrl()
  removeText()
}

const addTextLink = () => {
  emits('add-text-link', { href: urlPath.value, text: urlText.value })
  close()
}

const removeUrl = () => {
  urlPath.value = ''
}

const removeText = () => {
  urlText.value = ''
}

const getSelectionText = () => {
  if (!selection) return

  const anchorNode = (selection?.anchorNode?.parentNode as HTMLElement).tagName
  const path = (selection.anchorNode as HTMLElement).parentNode?.textContent

  if (window.getSelection()) {
    urlText.value = selection.getRangeAt(0).toString() ?? ''
  }

  if (anchorNode === 'A') {
    urlPath.value = path ?? ''
    urlText.value = (selection.anchorNode?.parentNode as HTMLElement).textContent ?? ''
  }
}

onClickOutside(textLinkRef, () => {
  close()
})

const getCurrentModal = computed(() => {
  return props.currentModal && props.currentModal === 'text-link'
})

const hasError = computed(() => {
  return !urlPath.value || !isValidUrlProtocol(urlPath.value)
})

watch(
  () => urlPath.value,
  value => {
    if (value && !isValidUrlProtocol(value)) {
      errorMessage.value = 'This field should contain link like a https://...'
      isValidTextLink.value = false
    } else {
      errorMessage.value = ''
      isValidTextLink.value = true
    }
  }
)
</script>
