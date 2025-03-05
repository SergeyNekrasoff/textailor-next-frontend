<template>
  <div class="relative xss:hidden">
    <transition name="slide-fade">
      <span v-if="isHovered" class="feature-tooltip">Image</span>
    </transition>
    <input
      type="file"
      name="fileUpload"
      id="fileUpload"
      @change="handleFileImage($event)"
      class="hidden"
    />
    <button
      id="nodeImage"
      type="button"
      role="button"
      ref="nodeImage"
      class="w-[36px] h-[36px] text-text_dark_2 flex items-center justify-center rounded-lg p-1 transition hover:bg-divider_dark_2"
      @click="chooseFiles"
    >
      <PhotoIcon :size="'size-6'" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
// import { useUploadImage } from '@composable/useUploadImages.js'
import { useElementHover } from '@vueuse/core'
import { PhotoIcon } from '@/shared/components/icons'

const emit = defineEmits(['open-modal', 'upload'])

interface IProps {
  maxSize: number
  accept: string
  currentModal: string
}

const props = withDefaults(defineProps<IProps>(), {
  maxSize: 0,
  accept: 'default',
  currentModal: 'image/*'
})

const maxSize: Ref<number> = ref(props.maxSize)
const accept: Ref<string> = ref(props.accept)
const nodeImage: Ref<HTMLDivElement | null> = ref(null)
const fileImage: Ref<File | null> = ref(null)
const errors: Ref<string[]> = ref([])

const isHovered = useElementHover(nodeImage)

const handleFileImage = async (event: Event) => {
  const fileInput = event.target as HTMLInputElement
  const files: FileList | null = fileInput.files

  clearErrors()

  if (files && files[0]) {
    if (isFileValid(files[0])) {
      try {
        // const image = await useUploadImage(files[0])
        // fileImage.value = image

        sendFileUrl()
      } catch (error) {
        throw Error(`Invalid type file ${error.message}`)
      }
    } else {
      console.log(`Invalid type file`)
    }
  }
}

const isFileSizeValid = (fileSize: number): void => {
  if (fileSize >= maxSize.value) {
    errors.value.push('File size should be less than 5 MB')
  }
}

const isFileTypeValid = (fileExtension: string | undefined): void => {
  if (
    typeof fileExtension !== 'undefined' &&
    !accept.value.split(',').join(',').includes(fileExtension)
  ) {
    errors.value.push('The image must be a file of type: png, jpg, jpeg, webp')
  }
}

const isFileValid = (file: File): boolean => {
  const fileExtension = file.name.split('.').pop()

  isFileSizeValid(Math.round((file.size / 1024 / 1024) * 100) / 100)
  isFileTypeValid(fileExtension)

  if (errors.value.length === 0) {
    return true
  } else {
    return false
  }
}

const clearErrors = (): void => {
  errors.value = []
}

const close = (): void => {
  fileImage.value = null
  clearErrors()
}

const sendFileUrl = (): void => {
  if (fileImage.value) {
    emit('upload', fileImage.value)
    close()
  }
}

const chooseFiles = (): void => {
  document.querySelector('#fileUpload').value = ''
  document.querySelector('#fileUpload').click()
  clearErrors()
}

onMounted(() => {
  document.addEventListener('click', () => {
    if (fileImage.value) {
      close()
    }
  })
})
</script>
