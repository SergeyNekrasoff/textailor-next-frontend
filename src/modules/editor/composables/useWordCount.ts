import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'

export function useWordCount(editable: Ref<HTMLElement | null>) {
  const wordCount: Ref<number> = ref(0)
  const characterCount: Ref<number> = ref(0)
  const textContent: Ref<string> = ref('')
  const observer: Ref<MutationObserver | null> = ref(null)

  const countWords = (text: string): number => {
    const cleanText = text
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    if (!cleanText) return 0

    return cleanText.split(/\s+/).filter(word => word.length > 0).length
  }

  const updateWordCount = () => {
    if (!editable.value) return

    const text = (editable.value as HTMLElement).innerText
    textContent.value = text
    wordCount.value = countWords(text)
    characterCount.value = text.length
  }

  onMounted(() => {
    observer.value = new MutationObserver(() => {
      updateWordCount()
    })

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
    wordCount,
    characterCount
  }
}
