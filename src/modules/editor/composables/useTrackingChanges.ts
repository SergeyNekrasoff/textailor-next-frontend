import { ref } from 'vue'

export function useTrackingChanges() {
  const history = ref<Array<{ text: string; selection: Selection }>>([])
  const currentIndex = ref(-1)

  const saveState = (text: string, selection: Selection) => {
    console.log(`text: ${text}, selection: ${window.getSelection()}`)
    history.value = history.value.slice(0, currentIndex.value + 1)
    history.value.push({ text, selection })
    currentIndex.value = history.value.length - 1
  }

  const undo = () => {
    if (currentIndex.value > 0) {
      console.log(`undo`)
      currentIndex.value--
      const state = history.value[currentIndex.value]
      restoreState(state)
      return true
    }
    return false
  }

  const redo = () => {
    if (currentIndex.value < history.value.length - 1) {
      console.log(`redo`)
      currentIndex.value++
      const state = history.value[currentIndex.value]
      restoreState(state)
      return true
    }
    return false
  }

  const restoreState = (state: { text: string; selection: Selection }) => {
    const editable = document.querySelector('[contenteditable="true"]')

    if (!editable) return

    editable.innerHTML = state.text

    const selection = window.getSelection()

    if (!selection) return

    const textNodes = Array.from(editable.childNodes).filter(
      node => node.nodeType === Node.TEXT_NODE
    )

    let position = 0

    for (const node of textNodes) {
      if (position + (node.textContent?.length ?? 0) >= state.selection.anchorOffset) {
        const range = document.createRange()
        range.setStart(node, state.selection.anchorOffset - position)
        range.setEnd(node, state.selection.focusOffset - position)
        selection.removeAllRanges()
        selection.addRange(range)
        break
      }
      position += node.textContent?.length ?? 0
    }
  }

  const trackChanges = (element: HTMLElement) => {
    const mutationObserver = new MutationObserver(mutations => {
      console.log(`mutations: ${mutations[0].type}`)
      const selection = window.getSelection()
      if (!selection) return

      const text = element.innerHTML

      saveState(text, {
        anchorOffset: selection.anchorOffset,
        focusOffset: selection.focusOffset,
        anchorNode: null,
        focusNode: null,
        isCollapsed: false,
        rangeCount: 0,
        type: '',
        addRange: function (range: Range): void {
          throw new Error('Function not implemented.')
        },
        collapse: function (node: Node | null, offset?: number): void {
          throw new Error('Function not implemented.')
        },
        collapseToEnd: function (): void {
          throw new Error('Function not implemented.')
        },
        collapseToStart: function (): void {
          throw new Error('Function not implemented.')
        },
        containsNode: function (node: Node, allowPartialContainment?: boolean): boolean {
          throw new Error('Function not implemented.')
        },
        deleteFromDocument: function (): void {
          throw new Error('Function not implemented.')
        },
        empty: function (): void {
          throw new Error('Function not implemented.')
        },
        extend: function (node: Node, offset?: number): void {
          throw new Error('Function not implemented.')
        },
        getRangeAt: function (index: number): Range {
          throw new Error('Function not implemented.')
        },
        modify: function (alter?: string, direction?: string, granularity?: string): void {
          throw new Error('Function not implemented.')
        },
        removeAllRanges: function (): void {
          throw new Error('Function not implemented.')
        },
        removeRange: function (range: Range): void {
          throw new Error('Function not implemented.')
        },
        selectAllChildren: function (node: Node): void {
          throw new Error('Function not implemented.')
        },
        setBaseAndExtent: function (
          anchorNode: Node,
          anchorOffset: number,
          focusNode: Node,
          focusOffset: number
        ): void {
          throw new Error('Function not implemented.')
        },
        setPosition: function (node: Node | null, offset?: number): void {
          throw new Error('Function not implemented.')
        }
      })
    })

    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
      characterData: true
    })

    return () => mutationObserver.disconnect()
  }

  const cleanup = () => {
    history.value = []
    currentIndex.value = -1
  }

  return {
    undo,
    redo,
    trackChanges,
    cleanup
  }
}
