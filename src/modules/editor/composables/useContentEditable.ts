import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'

export function useContentEditable(editable: Ref<HTMLElement | null>) {
  const textContent: Ref<string | null> = ref(null)
  const observer: Ref<MutationObserver | null> = ref(null)

  const updateContent = () => {
    if (!editable.value) return

    const text = editable.value.textContent
    textContent.value = text
  }

  onMounted(() => {
    observer.value = new MutationObserver(updateContent)

    if (editable?.value) {
      observer.value.observe(editable.value, {
        childList: true,
        subtree: true,
        characterData: true
      })
    }
  })

  onUnmounted(() => {
    observer.value!.disconnect()
  })

  return {
    textContent
  }
}
