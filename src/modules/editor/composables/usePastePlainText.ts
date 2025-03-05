export function usePastePlainText() {
  const handlePaste = (e: ClipboardEvent): void | null => {
    e.preventDefault()

    const content = e.clipboardData?.getData('text/plain') ?? ''

    const selection = window.getSelection()

    if (!selection?.rangeCount) return

    const range = selection.getRangeAt(0)

    range.deleteContents()

    const textNode = document.createTextNode(content)
    range.insertNode(textNode)

    range.selectNodeContents(textNode)
    range.collapse(false)

    selection.removeAllRanges()
    selection.addRange(range)
  }

  return {
    handlePaste
  }
}
