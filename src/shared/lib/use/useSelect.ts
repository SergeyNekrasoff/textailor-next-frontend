import { ref, computed } from 'vue'

interface UseSelectProps {
  modelValue?: string | number | null
  options?: Array<{ id: number; label: string; data?: unknown }>
  placeholder?: string
  searchable?: boolean
}

export function useSelect(props: UseSelectProps) {
  const isOpen = ref<boolean>(false)
  const searchTerm = ref<string>('')
  const selectedOptionId = ref<string | number | null | undefined>(props.modelValue)

  const filteredOptions = computed(() => {
    if (!props.searchable && !searchTerm.value) {
      return props.options || []
    }

    return (props.options || []).filter(option =>
      option.label.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  })

  const selectedOption = computed(() => {
    return props.options?.find(option => option.id === selectedOptionId.value) || null
  })

  const handleSelect = (option: { id: number; label: string; data?: unknown }) => {
    selectedOptionId.value = option.id
    isOpen.value = false
    searchTerm.value = ''
  }

  const handleSearch = (event: Event) => {
    searchTerm.value = (event.target as HTMLInputElement).value
  }

  return {
    isOpen,
    searchTerm,
    filteredOptions,
    selectedOption,
    selectedOptionId,
    handleSelect,
    handleSearch
  }
}
