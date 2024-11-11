import { ref, onMounted, onBeforeUnmount } from 'vue'

interface Toast {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'warning'
  element: HTMLElement
}

export function useToast() {
  const toasts = ref<Toast[]>([])

  const addToast = (toast: Toast) => {
    toasts.value.push(toast)
  }

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  const clearToasts = () => {
    toasts.value = []
  }

  const closeToast = (id: string) => {
    removeToast(id)
  }

  const autoCloseToast = (id: string) => {
    setTimeout(() => {
      closeToast(id)
    }, 5000)
  }

  const clickOutsideHandler = () => {
    document.addEventListener('click', () => {
      toasts.value.forEach(toast => {
        if (!document.body.contains(toast.element)) {
          closeToast(toast.id)
        }
      })
    })
  }

  const escKeyListener = () => {
    document.addEventListener('keydown', (event): void => {
      if (event.key === 'Escape' && toasts.value.length > 0) {
        closeToast(toasts.value[0].id)
      }
    })
  }

  onMounted(() => {
    clickOutsideHandler()
    escKeyListener()
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', clickOutsideHandler)
    document.removeEventListener('click', escKeyListener)
  })

  return {
    addToast,
    removeToast,
    clearToasts,
    closeToast,
    autoCloseToast,
    clickOutsideHandler,
    escKeyListener
  }
}
