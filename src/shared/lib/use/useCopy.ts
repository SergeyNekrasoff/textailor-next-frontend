interface ClipboardOptions {
  message?: {
    success: string
    error?: string
  }
}

export function useCopy(options: ClipboardOptions = {}) {
  const defaultOptions = {
    message: {
      success: 'Copied!',
      error: 'Failed to copy to clipboard'
    }
  }

  const mergedOptions = { ...defaultOptions.message, ...options.message }

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (error) {
      console.error('Clipboard error:', error)
      return false
    }
  }

  return {
    copyToClipboard,
    options: mergedOptions
  }
}
