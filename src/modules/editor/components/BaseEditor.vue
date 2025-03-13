<template>
  <div class="wrapper-editor" ref="wrapper">
    <div
      id="editable"
      ref="editable"
      role="textbox"
      class="app-editor"
      contenteditable="true"
      :disabled="isDisabled"
      :placeholder="isFocusedEditor || isFirstClick ? '' : props.placeholder"
      @input="onInput"
      @blur="onBlur"
      @keydown="onPress"
      @click="saveSelection"
      @focus="restoreSelection"
      @paste="handlePaste"
    />

    <div class="app-editor-features">
      <div v-if="isAdvancedModeEditor" class="flex flex-col items-center justify-start mb-12 gap-1">
        <feature-h2
          :current-modal="isCurrentModal"
          @add-h2-text="handleHeadText"
          @open-modal="setCurrentModal"
        />

        <feature-h3
          :current-modal="isCurrentModal"
          @add-h3-text="handleHeadText"
          @open-modal="setCurrentModal"
        />

        <feature-h4
          :current-modal="isCurrentModal"
          @add-h4-text="handleHeadText"
          @open-modal="setCurrentModal"
        />

        <feature-strong
          :current-modal="isCurrentModal"
          @add-text-strong="handleTextStrongSelection"
          @open-modal="setCurrentModal"
        />

        <feature-quote
          :current-modal="isCurrentModal"
          :status="statusQuoteIsChanged"
          @add-text-quote="handleQuoteSelection"
          @open-modal="setCurrentModal"
        />

        <feature-italic
          :current-modal="isCurrentModal"
          :status="statusQuoteIsChanged"
          @add-italic-text="handleItalicText"
          @open-modal="setCurrentModal"
        />

        <feature-text-through
          :current-modal="isCurrentModal"
          @add-text-through="handleTextThroughSelection"
          @open-modal="setCurrentModal"
        />

        <!-- <feature-list
          :current-modal="isCurrentModal"
          @add-list="handleList"
          @open-modal="setCurrentModal"
        /> -->

        <feature-hr
          :current-modal="isCurrentModal"
          @add-hr="handleHr"
          @open-modal="setCurrentModal"
        />

        <feature-upload-image
          :current-modal="isCurrentModal"
          :maxSize="CONFIG_IMAGE.fileSize"
          :accept="CONFIG_IMAGE.formats"
          @upload="uploadImage"
        />

        <feature-text-link
          :current-modal="isCurrentModal"
          @add-text-link="handleTextLinkSelection"
          @open-modal="setCurrentModal"
        />
      </div>

      <!-- <div class="flex flex-col items-center justify-start">
        <feature-prev @to-prev="undo" />
        <feature-next @to-next="redo" />
      </div> -->
    </div>

    <template v-if="hasButton">
      <button
        type="button"
        role="button"
        class="absolute bottom-2 right-24 w-24 bg-tt flex items-center justify-center rounded-md px-4 py-1 text-white transition hover:bg-grandlight xss:px-2 z-50 cursor-pointer"
        :class="getStringHTMLContent && getStringHTMLContent.length > 0 ? '' : ''"
        :disabled="disableEditor"
      >
        <span class="text-base font-[400] xss:hidden">Save</span>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import type { ConfigEditor } from '../types'
import { CONFIG_IMAGE, EDITOR_MODES } from '../types'
import { useFocus, onClickOutside } from '@vueuse/core'
import { usePastePlainText } from '../composables/usePastePlainText'
import { useWordCount } from '../composables/useWordCount'
import { useContentEditable } from '../composables/useContentEditable'
// import { useTrackingChanges } from '../composables/useTrackingChanges'

const FeatureH2 = defineAsyncComponent(() => import('./features/FeatureH2.vue'))
const FeatureH3 = defineAsyncComponent(() => import('./features/FeatureH3.vue'))
const FeatureH4 = defineAsyncComponent(() => import('./features/FeatureH4.vue'))
const FeatureStrong = defineAsyncComponent(() => import('./features/FeatureStrong.vue'))
const FeatureQuote = defineAsyncComponent(() => import('./features/FeatureQuote.vue'))
const FeatureItalic = defineAsyncComponent(() => import('./features/FeatureItalic.vue'))
const FeatureTextThrough = defineAsyncComponent(() => import('./features/FeatureTextThrough.vue'))
// const FeatureList = defineAsyncComponent(() => import('./features/FeatureList.vue'))
const FeatureHr = defineAsyncComponent(() => import('./features/FeatureHr.vue'))
// const FeaturePrev = defineAsyncComponent(() => import('./features/FeaturePrev.vue'))
// const FeatureNext = defineAsyncComponent(() => import('./features/FeatureNext.vue'))
const FeatureUploadImage = defineAsyncComponent(() => import('./features/FeatureUploadImage.vue'))
const FeatureTextLink = defineAsyncComponent(() => import('./features/FeatureTextLink.vue'))

const { handlePaste } = usePastePlainText()
// const { undo, redo, trackChanges, cleanup } = useTrackingChanges()

const props = withDefaults(defineProps<ConfigEditor>(), {
  mode: EDITOR_MODES.BASE,
  placeholder: 'default',
  submit: false,
  disabled: false,
  deliveryContent: '',
  documentContent: ''
})

const emit = defineEmits(['click', 'send', 'word-count', 'character-count', 'editable-content'])

const wrapper: Ref<HTMLDivElement | null> = ref(null)
const editable: Ref<HTMLElement | null> = ref(null)
const savedRange: Ref<Range | null> = ref(null)
const selection = window.getSelection() as Selection

const isDisabled: Ref<boolean> = ref(props.disabled)
const isFirstClick: Ref<boolean> = ref(false)
const isFocusedEditor: Ref<boolean> = ref(false)
const isCurrentModal: Ref<string> = ref('')
const statusQuoteIsChanged: Ref<boolean> = ref(false)
const checkLastSiblingsBr: Ref<number> = ref(0)
const isLastActiveLi: Ref<boolean> = ref(false)
const disableEditor: Ref<boolean> = ref(false)

const { focused } = useFocus(editable)
const { wordCount, characterCount } = useWordCount(editable)
const { textContent } = useContentEditable(editable)

// const click = () => {
//   if (!props.disabled) {
//     emit('click')
//   }
// }

const isHTMLElement = (node: Node): node is HTMLElement => {
  return node instanceof HTMLElement
}

const isHTMLLIElement = (node: Node): node is HTMLLIElement => {
  return node instanceof HTMLLIElement
}

const isElement = (node: ParentNode): node is Element => {
  return node instanceof Element
}

const onInput = (event: Event): void => {
  statusQuoteIsChanged.value = true

  if (!selection) return

  const htmlTag = (selection.anchorNode?.parentNode as HTMLElement).tagName
  const target = event.target as HTMLElement

  if (!htmlTag) return

  switch (htmlTag) {
    case 'STRONG':
      setCurrentModal('text-strong')
      break
    case 'BLOCKQUOTE':
      setCurrentModal('text-quote')
      break
    case 'A':
      setCurrentModal('text-link')
      event.preventDefault()
      return
    case 'H2':
      setCurrentModal('text-h2')
      break
    case 'H3':
      setCurrentModal('text-h3')
      break
    case 'H4':
      setCurrentModal('text-h4')
      break
    case 'S':
      setCurrentModal('text-through')
      break
    case 'I':
      setCurrentModal('text-italic')
      break
    case 'UL':
    case 'LI':
      setCurrentModal('text-list')
      break
    default:
      setCurrentModal('')
      editable.value = target
  }

  checkLastSiblingsBr.value = 0
}

const onBlur = () => {
  // Send to backend API
  // emit('send', editable.value?.innerHTML)

  saveSelection()
}

const onPress = (event: KeyboardEvent) => {
  if (event.key == 'Enter') {
    event.preventDefault()
    handleLineBreak()
  }
}

const handleLineBreak = () => {
  if (!selection) return

  editable.value!.focus()

  checkLastSiblingsBr.value += 1
  statusQuoteIsChanged.value = true

  const br = document.createElement('br')
  const zeroSpace = document.createTextNode('\u200b')

  const range = selection.getRangeAt(0)
  const nodeContainer = range.commonAncestorContainer.parentElement?.tagName

  if (nodeContainer === 'A') {
    setCurrentModal('')

    range.deleteContents()
    range.setEndAfter(selection.anchorNode!.parentNode!)
    range.deleteContents()
    range.insertNode(br)
    range.collapse(false)
    range.deleteContents()
    selection.removeAllRanges()
    selection.addRange(range)

    return
  }

  if (nodeContainer === 'H2' || nodeContainer === 'H3' || nodeContainer === 'H4') {
    setCurrentModal('')

    range.deleteContents()
    range.setEndAfter(selection.anchorNode!.parentNode!)
    range.deleteContents()
    range.insertNode(zeroSpace)
    range.collapse(false)
    range.deleteContents()
    selection.removeAllRanges()
    selection.addRange(range)

    return
  }

  if (
    checkLastSiblingsBr.value === 2 &&
    (range.commonAncestorContainer as HTMLUListElement).tagName === 'UL' &&
    isLastActiveLi.value
  ) {
    const ul = selection.anchorNode
    const lastChild = ul!.lastChild

    console.log(`call`)

    checkLastSiblingsBr.value = 0

    if (isHTMLElement(lastChild!)) {
      lastChild.remove()
      setCurrentModal('')
    }

    range.deleteContents()
    range.setEndAfter(ul!)
    range.deleteContents()
    range.insertNode(zeroSpace)
    range.collapse(false)
    range.deleteContents()
    selection.removeAllRanges()
    selection.addRange(range)

    return
  }

  if (nodeContainer === 'UL') {
    const li = document.createElement('li')
    const ul = isHTMLElement(range.commonAncestorContainer.parentElement!)
      ? Array.from(range.commonAncestorContainer.parentElement.querySelectorAll('li'))
      : []
    const split = isHTMLLIElement(range.commonAncestorContainer)
      ? ul.indexOf(range.commonAncestorContainer)
      : -1

    if (ul.length - 1 !== split) {
      isLastActiveLi.value = false

      range.deleteContents()
      range.setEndAfter(range.commonAncestorContainer)
      range.deleteContents()
      range.insertNode(li)
      range.collapse(false)
      range.deleteContents()

      selection.removeAllRanges()
      selection.addRange(range)

      return
    } else {
      setCurrentModal('text-list')

      checkLastSiblingsBr.value = 0

      range.commonAncestorContainer.parentElement!.lastChild!.remove()
      range.deleteContents()
      range.setEndAfter(range.commonAncestorContainer.parentElement!.lastChild!)
      range.deleteContents()
      range.insertNode(zeroSpace)
      range.collapse(false)
      range.deleteContents()

      selection.removeAllRanges()
      selection.addRange(range)

      return
    }
  }

  if (nodeContainer === 'LI') {
    const li = document.createElement('li')
    const ul = Array.from(
      range.commonAncestorContainer.parentElement!.parentElement!.querySelectorAll('li')
    )
    const split = isHTMLLIElement(range.commonAncestorContainer!.parentElement!)
      ? ul.indexOf(range.commonAncestorContainer.parentElement)
      : -1

    setCurrentModal('text-list')

    checkLastSiblingsBr.value = 0
    isLastActiveLi.value = false

    if (selection.focusOffset === 0) {
      li.append(range.commonAncestorContainer!.parentElement!.textContent!)
    }

    if (ul.length - 1 === split) {
      checkLastSiblingsBr.value = 0
      isLastActiveLi.value = true
    }

    range.deleteContents()
    range.setEndAfter(range.commonAncestorContainer!.parentElement!)
    range.deleteContents()
    range.insertNode(li)
    range.collapse(true)
    range.deleteContents()

    selection.removeAllRanges()
    selection.addRange(range)

    return
  }

  if (nodeContainer === 'BLOCKQUOTE' && checkLastSiblingsBr.value === 2) {
    const blockquote = (selection.anchorNode as Element).parentNode

    setCurrentModal('')

    checkLastSiblingsBr.value = 0

    range.deleteContents()
    range.setEndAfter(blockquote as HTMLElement)
    range.deleteContents()
    range.insertNode(zeroSpace)
    range.collapse(false)
    range.deleteContents()

    selection.removeAllRanges()
    selection.addRange(range)

    return
  }

  if (
    ((nodeContainer === 'DIV' ||
      nodeContainer === 'STRONG' ||
      nodeContainer === 'I' ||
      nodeContainer === 'S') &&
      (selection.anchorNode as HTMLUListElement).tagName !== 'UL') ||
    (nodeContainer === 'BLOCKQUOTE' && checkLastSiblingsBr.value !== 2)
  ) {
    range.deleteContents()
    range.insertNode(br)
    range.collapse(false)
    range.insertNode(zeroSpace)
    range.selectNodeContents(zeroSpace)
    range.collapse(true)
    range.deleteContents()

    selection.removeAllRanges()
    selection.addRange(range)

    console.log(`1`)

    return
  } else {
    if (
      isHTMLElement(range.commonAncestorContainer) &&
      range.commonAncestorContainer.tagName === 'UL' &&
      !isLastActiveLi.value
    ) {
      const li = document.createElement('li')

      setCurrentModal('')

      range.deleteContents()
      range.insertNode(li)
      range.collapse(false)

      console.log(`2`)

      return
    } else {
      range.deleteContents()
      range.setEndAfter(range.commonAncestorContainer)
      range.deleteContents()
      range.insertNode(zeroSpace)
      range.collapse(true)
      range.deleteContents()

      selection.removeAllRanges()
      selection.addRange(range)

      console.log(`3`)

      return
    }
  }
}

const saveSelection = (): void => {
  if (
    !selection ||
    !selection.anchorNode ||
    !(selection.anchorNode.parentNode && isElement(selection.anchorNode.parentNode))
  )
    return

  if (isFocusedEditor.value) {
    savedRange.value = selection.getRangeAt(0)

    switch (selection.anchorNode.parentNode.tagName) {
      case 'STRONG':
        setCurrentModal('text-strong')
        break
      case 'BLOCKQUOTE':
        setCurrentModal('text-quote')
        break
      case 'A':
        setCurrentModal('text-link')
        break
      case 'H2':
        setCurrentModal('text-h2')
        break
      case 'H3':
        setCurrentModal('text-h3')
        break
      case 'H4':
        setCurrentModal('text-h4')
        break
      case 'S':
        setCurrentModal('text-through')
        break
      case 'I':
        setCurrentModal('text-italic')
        break
      case 'UL':
      case 'LI':
        setCurrentModal('text-list')
        break
      default:
        setCurrentModal('')
    }
  }
}

const restoreSelection = (): void => {
  if (!selection) return

  editable.value?.focus()

  if (savedRange.value !== null) {
    if (selection.rangeCount > 0) {
      selection.removeAllRanges()
    }

    selection.addRange(savedRange.value)
  }
}

const convertStringToHTML = (value: string): DocumentFragment => {
  const fragment = document.createDocumentFragment()
  const temp = document.createElement('div')
  temp.innerHTML = value.trim()

  while (temp.firstChild) {
    fragment.appendChild(temp.firstChild)
  }

  return fragment
}

const insertNodeWithCollapse = (
  element: HTMLElement,
  selection: Selection,
  range: Range,
  addRange: boolean
) => {
  range.deleteContents()
  range.insertNode(element)
  range.collapse(false)
  range.insertNode(element)
  range.selectNodeContents(element)
  range.collapse(true)
  range.deleteContents()
  selection.removeAllRanges()

  if (addRange) {
    selection.addRange(range)
  }

  saveSelection()
}

const insertNodeElement = (element: HTMLElement) => {
  if (!selection) return

  let range = selection.getRangeAt(0)

  if (selection.rangeCount > 0) {
    range.deleteContents()
    range.insertNode(element)
    selection.collapseToEnd()
    selection.removeAllRanges()
  }

  range = window.document.createRange()
  range.selectNode(element)
  selection.addRange(range)
  selection.collapseToEnd()
  saveSelection()
}

const handleHeadText = (tag: string) => {
  const hTag = document.createElement(tag)
  const zeroSpace = document.createTextNode('\u200b')
  const fragment = document.createDocumentFragment()

  if (!selection || !selection.anchorNode || !isHTMLElement(selection.anchorNode.parentNode!))
    return

  const range = selection.getRangeAt(0)
  const parentNode = selection.anchorNode?.parentNode
  const childNode = selection.anchorNode

  editable.value!.focus()

  if (
    (parentNode &&
      isHTMLElement(parentNode) &&
      (parentNode.tagName === 'BLOCKQUOTE' ||
        parentNode.tagName === 'A' ||
        parentNode.tagName === 'STRONG' ||
        parentNode.tagName === 'H2' ||
        parentNode.tagName === 'H3' ||
        parentNode.tagName === 'H4' ||
        parentNode.tagName === 'S' ||
        parentNode.tagName === 'I')) ||
    !isFocusedEditor.value
  ) {
    return
  }

  if (parentNode && isHTMLElement(parentNode) && parentNode.tagName !== tag.toUpperCase()) {
    if (childNode && isHTMLElement(childNode) && childNode.tagName === tag.toUpperCase()) {
      childNode.remove()
    } else {
      const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

      if (content.length > 0) {
        const textContent = convertStringToHTML(content)

        hTag.append(textContent)

        range.deleteContents()
        range.insertNode(hTag)
        range.collapse(false)

        return
      }

      hTag.append(zeroSpace)

      insertNodeWithCollapse(hTag, selection, range, true)
    }
  } else {
    const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

    if (content.length > 0) {
      const textContent = convertStringToHTML(content)

      if (parentNode && isHTMLElement(parentNode)) {
        parentNode.remove()
        range.deleteContents()
        range.insertNode(textContent)
        range.collapse(false)
      }

      return
    }

    if (parentNode && isHTMLElement(parentNode)) {
      parentNode.remove()

      range.deleteContents()
      range.insertNode(parentNode)
      range.collapse(false)

      fragment.append(zeroSpace)

      range.deleteContents()
      range.insertNode(fragment)
      range.collapse(false)
    }
  }
}

const handleTextStrongSelection = () => {
  const strong = document.createElement('strong')
  const zeroSpace = document.createTextNode('\u200b')
  const fragment = document.createDocumentFragment()

  if (!selection || !selection.anchorNode || !isElement(selection.anchorNode.parentNode!)) return

  const range = selection.getRangeAt(0)
  const parentNode = selection.anchorNode.parentNode
  const childNode = selection.anchorNode

  editable.value?.focus()

  if (
    parentNode.tagName === 'BLOCKQUOTE' ||
    parentNode.tagName === 'A' ||
    parentNode.tagName === 'H2' ||
    parentNode.tagName === 'H3' ||
    parentNode.tagName === 'H4' ||
    parentNode.tagName === 'S' ||
    parentNode.tagName === 'I' ||
    !isFocusedEditor.value
  ) {
    return
  }

  if (parentNode.tagName !== 'STRONG') {
    if (childNode && isHTMLElement(childNode) && childNode.tagName === 'STRONG') {
      childNode.remove()
    } else {
      const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

      if (content.length > 0) {
        const textContent = convertStringToHTML(content)

        strong.append(textContent)

        range.deleteContents()
        range.insertNode(strong)
        range.collapse(false)

        return
      }

      strong.append(zeroSpace)

      range.deleteContents()
      range.insertNode(strong)
    }
  } else {
    const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

    if (content.length > 0) {
      const textContent = convertStringToHTML(content)

      parentNode.remove()

      range.deleteContents()
      range.insertNode(textContent)
      range.collapse(false)

      return
    }

    parentNode.remove()

    range.deleteContents()
    range.insertNode(parentNode)
    range.collapse(false)

    fragment.append(zeroSpace)

    range.deleteContents()
    range.insertNode(fragment)
    range.collapse(false)
  }
}

const handleQuoteSelection = (): void => {
  if (!selection || !selection.anchorNode || !isElement(selection.anchorNode.parentNode!)) return

  let range = selection.getRangeAt(0)
  const parentNode = selection.anchorNode.parentNode
  const anchorNode = selection.anchorNode
  const focusNode = selection.focusNode
  const blockquote = document.createElement('blockquote')

  editable.value?.focus()

  setCurrentModal('text-quote')

  if (
    parentNode.tagName === 'A' ||
    parentNode.tagName === 'STRONG' ||
    parentNode.tagName === 'H2' ||
    parentNode.tagName === 'H3' ||
    parentNode.tagName === 'H4' ||
    parentNode.tagName === 'S' ||
    parentNode.tagName === 'I' ||
    !isFocusedEditor.value
  ) {
    return
  }

  if (selection.rangeCount) {
    if (selection.toString().length === 0) {
      if (
        (anchorNode &&
          isHTMLElement(anchorNode.parentNode!) &&
          anchorNode.parentNode.tagName === 'BLOCKQUOTE' &&
          focusNode &&
          isHTMLElement(focusNode.parentNode!) &&
          focusNode.parentNode.tagName === 'BLOCKQUOTE') ||
        (anchorNode &&
          isHTMLElement(anchorNode!) &&
          anchorNode.tagName === 'BLOCKQUOTE' &&
          focusNode &&
          isHTMLElement(focusNode!) &&
          focusNode.tagName === 'BLOCKQUOTE') ||
        (range.commonAncestorContainer &&
          isHTMLElement(range.commonAncestorContainer) &&
          range.commonAncestorContainer.tagName === 'BLOCKQUOTE')
      ) {
        return
      }

      range = selection.getRangeAt(0)
      range.deleteContents()
      range.insertNode(blockquote)
      range.selectNodeContents(blockquote)
      range.collapse(false)
    } else {
      if (
        (anchorNode &&
          isHTMLElement(anchorNode.parentNode!) &&
          anchorNode.parentNode.tagName === 'BLOCKQUOTE' &&
          focusNode &&
          isHTMLElement(focusNode.parentNode!) &&
          focusNode.parentNode.tagName === 'BLOCKQUOTE') ||
        (anchorNode &&
          isHTMLElement(anchorNode.parentNode!) &&
          anchorNode.parentNode.tagName === 'BLOCKQUOTE' &&
          focusNode &&
          isHTMLElement(focusNode.parentNode!) &&
          focusNode.parentNode.tagName === 'BLOCKQUOTE') ||
        (range.commonAncestorContainer &&
          isHTMLElement(range.commonAncestorContainer) &&
          range.commonAncestorContainer.tagName === 'BLOCKQUOTE')
      ) {
        const content = convertStringToHTML(
          (range.commonAncestorContainer as HTMLElement).innerHTML
        )

        parentNode.remove()

        range = selection.getRangeAt(0)
        range.deleteContents()
        range.insertNode(content)
      } else {
        const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

        if (
          (anchorNode &&
            isHTMLElement(anchorNode.parentNode!) &&
            anchorNode.parentNode.tagName === 'BLOCKQUOTE') ||
          (focusNode &&
            isHTMLElement(focusNode.parentNode!) &&
            focusNode.parentNode.tagName === 'BLOCKQUOTE') ||
          (anchorNode &&
            isHTMLElement(anchorNode.parentNode!) &&
            anchorNode.parentNode.tagName === 'BLOCKQUOTE' &&
            focusNode &&
            isHTMLElement(focusNode.parentNode!) &&
            focusNode.parentNode.tagName === 'BLOCKQUOTE') ||
          (range.commonAncestorContainer &&
            isHTMLElement(range.commonAncestorContainer) &&
            range.commonAncestorContainer.tagName === 'BLOCKQUOTE')
        ) {
          return
        }

        blockquote.innerHTML = content

        range = selection.getRangeAt(0)
        range.deleteContents()
        range.insertNode(blockquote)
        range.selectNodeContents(blockquote)
        range.collapse(false)
      }
    }
  }
}

const handleItalicText = (): void => {
  const strong = document.createElement('i')
  const zeroSpace = document.createTextNode('\u200b')
  const fragment = document.createDocumentFragment()

  if (!selection || !selection.anchorNode || !isElement(selection.anchorNode.parentNode!)) return

  const range = selection.getRangeAt(0)
  const parentNode = selection.anchorNode.parentNode
  const childNode = selection.anchorNode

  editable.value?.focus()

  if (
    parentNode.tagName === 'BLOCKQUOTE' ||
    parentNode.tagName === 'A' ||
    parentNode.tagName === 'H2' ||
    parentNode.tagName === 'H3' ||
    parentNode.tagName === 'H4' ||
    parentNode.tagName === 'STRONG' ||
    parentNode.tagName === 'S' ||
    !isFocusedEditor.value
  ) {
    return
  }

  if (parentNode.tagName !== 'I') {
    if (childNode && isHTMLElement(childNode) && childNode.tagName === 'I') {
      childNode.remove()
    } else {
      const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

      if (content.length > 0) {
        const textContent = convertStringToHTML(content)

        strong.append(textContent)

        range.deleteContents()
        range.insertNode(strong)
        range.collapse(false)

        return
      }

      strong.append(zeroSpace)

      range.deleteContents()
      range.insertNode(strong)
    }
  } else {
    const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

    if (content.length > 0) {
      const textContent = convertStringToHTML(content)

      parentNode.remove()

      range.deleteContents()
      range.insertNode(textContent)
      range.collapse(false)

      return
    }

    parentNode.remove()

    range.deleteContents()
    range.insertNode(parentNode)
    range.collapse(false)

    fragment.append(zeroSpace)

    range.deleteContents()
    range.insertNode(fragment)
    range.collapse(false)
  }
}

const handleTextThroughSelection = (): void => {
  const strong = document.createElement('s')
  const zeroSpace = document.createTextNode('\u200b')
  const fragment = document.createDocumentFragment()

  if (!selection || !selection.anchorNode || !isElement(selection.anchorNode.parentNode!)) return

  const range = selection.getRangeAt(0)
  const parentNode = selection.anchorNode.parentNode
  const childNode = selection.anchorNode

  editable.value?.focus()

  if (
    parentNode.tagName === 'BLOCKQUOTE' ||
    parentNode.tagName === 'A' ||
    parentNode.tagName === 'H2' ||
    parentNode.tagName === 'H3' ||
    parentNode.tagName === 'H4' ||
    parentNode.tagName === 'STRONG' ||
    parentNode.tagName === 'I' ||
    !isFocusedEditor.value
  ) {
    return
  }

  if (parentNode.tagName !== 'S') {
    if (childNode && isHTMLElement(childNode) && childNode.tagName === 'S') {
      childNode.remove()
    } else {
      const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

      if (content.length > 0) {
        const textContent = convertStringToHTML(content)

        strong.append(textContent)

        range.deleteContents()
        range.insertNode(strong)
        range.collapse(false)

        return
      }

      strong.append(zeroSpace)

      range.deleteContents()
      range.insertNode(strong)
    }
  } else {
    const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

    if (content.length > 0) {
      const textContent = convertStringToHTML(content)

      parentNode.remove()

      range.deleteContents()
      range.insertNode(textContent)
      range.collapse(false)

      return
    }

    parentNode.remove()

    range.deleteContents()
    range.insertNode(parentNode)
    range.collapse(false)

    fragment.append(zeroSpace)

    range.deleteContents()
    range.insertNode(fragment)
    range.collapse(false)
  }
}

const handleTextLinkSelection = (value: HTMLAnchorElement): void => {
  const a = document.createElement('a')
  a.href = value.href
  a.innerHTML = value.text
  a.target = '_blank'
  a.rel = 'nofollow noindex'

  if (!selection) return

  const parentNode = (selection.anchorNode as Element).parentNode

  editable.value?.focus()

  if (
    (parentNode as HTMLElement).tagName === 'BLOCKQUOTE' ||
    (parentNode as HTMLElement).tagName === 'STRONG' ||
    (parentNode as HTMLElement).tagName === 'H2' ||
    (parentNode as HTMLElement).tagName === 'H3' ||
    (parentNode as HTMLElement).tagName === 'H4' ||
    (parentNode as HTMLElement).tagName === 'I' ||
    !isFocusedEditor.value
  ) {
    return
  }

  selection.removeAllRanges()

  if (savedRange.value !== null) {
    selection.addRange(savedRange.value)
  }

  insertNodeElement(a)
}

// const handleList = (): void => {
//   if (!selection) return

//   const range = selection.getRangeAt(0)
//   const parentNode = selection.anchorNode?.parentNode
//   const htmlContent = (parentNode as HTMLElement).innerHTML
//   const container = range.commonAncestorContainer

//   editable.value?.focus()

//   if (
//     (parentNode as HTMLElement).tagName === 'BLOCKQUOTE' ||
//     (parentNode as HTMLElement).tagName === 'STRONG' ||
//     (parentNode as HTMLElement).tagName === 'A' ||
//     (parentNode as HTMLElement).tagName === 'H2' ||
//     (parentNode as HTMLElement).tagName === 'H3' ||
//     (parentNode as HTMLElement).tagName === 'H3' ||
//     (parentNode as HTMLElement).tagName === 'H3' ||
//     (parentNode as HTMLElement).tagName === 'I' ||
//     (parentNode as HTMLElement).tagName === 'S' ||
//     !isFocusedEditor.value
//   ) {
//     return
//   }

//   if (
//     (selection.toString().length > 0 &&
//       (selection.anchorNode!.parentNode as HTMLDivElement).tagName === 'DIV' &&
//       (selection.focusNode!.parentNode as HTMLLIElement).tagName === 'LI') ||
//     ((selection.anchorNode!.parentNode as HTMLLIElement).tagName === 'LI' &&
//       (selection.focusNode!.parentNode as HTMLDivElement).tagName === 'DIV')
//   ) {
//     return
//   }

//   if ((container as HTMLDivElement).tagName === 'DIV') {
//     const ul = document.createElement('ul')
//     const li = document.createElement('li')
//     const zeroSpace = document.createTextNode('\u200b')
//     li.append(zeroSpace)
//     ul.append(li)

//     const content = selection.toString()
//     const textContent = content
//       .split('\n')
//       .map((e: string) => `<li>${e}</li>`)
//       .join('')

//     if (content.length > 0) {
//       const list = convertStringToHTML(textContent)
//       const ul = document.createElement('ul')

//       ul.append(list)
//       range.deleteContents()
//       range.insertNode(ul)
//       range.collapse(false)

//       return
//     }

//     insertNodeWithCollapse(ul, selection, range, true)

//     return
//   }

//   if (container && isHTMLElement(container) && (container as HTMLUListElement).tagName === 'UL') {
//     const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

//     if (content.length > 0) {
//       const textContent = convertStringToHTML(content)

//       if (parentNode?.parentNode instanceof Element) {
//         parentNode.parentNode.remove()
//       }

//       range.deleteContents()
//       range.insertNode(textContent)
//       range.collapse(false)

//       return
//     } else {
//       const fragment = range.commonAncestorContainer.textContent
//       const textNode = convertStringToHTML(fragment!)

//       while (parentNode?.parentNode) {
//         const parent = parentNode.parentNode

//         if (parent && isElement(parent)) {
//           if (parent.tagName === 'UL') {
//             parent.remove()

//             range.deleteContents()
//             range.insertNode(textNode)
//             range.collapse(true)

//             return
//           }
//         }
//       }
//     }
//   }

//   if (typeof (container as Element).tagName === 'undefined') {
//     const ul = document.createElement('ul')
//     const li = document.createElement('li')
//     const zeroSpace = document.createTextNode('\u200b')
//     li.append(zeroSpace)
//     ul.append(li)

//     // Concat Lists
//     if ((parentNode as Element).tagName === 'LI') {
//       const content = convertStringToHTML(htmlContent)
//       const fragment = document.createDocumentFragment()
//       const listArray: HTMLElement[] = Array.from(
//         (parentNode?.parentNode as Element).querySelectorAll('li')
//       )
//       const splitIndex = parentNode instanceof HTMLElement ? listArray.indexOf(parentNode) : -1

//       const ul1 = document.createElement('ul')
//       const ul2 = document.createElement('ul')

//       for (let i = 0; i < splitIndex; i++) {
//         ul1.appendChild(listArray[i])
//       }

//       for (let i = splitIndex + 1; i < listArray.length; i++) {
//         ul2.appendChild(listArray[i])
//       }

//       if (parentNode?.parentNode instanceof Element) {
//         parentNode.parentNode.remove()
//       }

//       fragment.append(ul1)
//       fragment.append(content)
//       fragment.append(ul2)

//       range.deleteContents()
//       range.insertNode(fragment)
//       range.collapse(false)

//       return
//     } else if (
//       (container.previousSibling as Element)?.tagName === 'UL' ||
//       (container.nextSibling as Element)?.tagName === 'UL'
//     ) {
//       // Attach node li to list
//       const newList = document.createElement('ul')
//       const li = document.createElement('li')

//       li.append(container.textContent!)

//       const firstListArray: HTMLLIElement[] = Array.from(
//         (container.previousSibling as HTMLLIElement).querySelectorAll('li')
//       )
//       const lastListArray: HTMLLIElement[] = Array.from(
//         (container.nextSibling as HTMLLIElement).querySelectorAll('li')
//       )

//       // Both lists is not exists
//       if (firstListArray.length === 0 && lastListArray.length === 0) {
//         newList.append(li)

//         if (container instanceof Element) container.remove()
//         insertNodeWithCollapse(newList, selection, range, true)

//         return
//       }

//       // Both lists is exists
//       if (firstListArray.length > 0 && lastListArray.length > 0) {
//         for (let i = 0; i < firstListArray.length; i++) {
//           newList.appendChild(firstListArray[i].cloneNode(true))
//           newList.append(li)
//         }

//         for (let i = 0; i < lastListArray.length; i++) {
//           newList.appendChild(lastListArray[i].cloneNode(true))
//         }

//         container.previousSibling!.remove()
//         container.nextSibling!.remove()

//         if (container instanceof Element) container.remove()

//         range.deleteContents()
//         range.insertNode(newList)
//         range.collapse(false)

//         return
//       }

//       // First list is exists
//       if (firstListArray.length > 0 && lastListArray.length === 0) {
//         for (let i = 0; i < firstListArray.length; i++) {
//           newList.appendChild(firstListArray[i].cloneNode(true))
//           newList.append(li)
//         }

//         container.previousSibling!.remove()
//         container.nextSibling!.remove()
//         if (container instanceof Element) container.remove()

//         range.deleteContents()
//         range.insertNode(newList)
//         range.collapse(false)

//         return
//       }

//       // Last list is exists
//       if (lastListArray.length > 0 && firstListArray.length === 0) {
//         newList.append(li)
//         for (let i = 0; i < lastListArray.length; i++) {
//           newList.appendChild(lastListArray[i].cloneNode(true))
//         }

//         container.previousSibling!.remove()
//         container.nextSibling!.remove()
//         if (container instanceof Element) container.remove()

//         range.deleteContents()
//         range.insertNode(newList)
//         range.collapse(false)

//         return
//       }
//     } else {
//       // Mark line as li of part list
//       if (container.textContent!.length > 0) {
//         if (
//           (container.previousSibling as HTMLUListElement)?.tagName === 'UL' ||
//           (container.nextSibling as HTMLUListElement)?.tagName === 'UL'
//         ) {
//           const newList = document.createElement('ul')
//           const li = document.createElement('li')
//           li.append(container.textContent!)

//           const firstListArray: HTMLLIElement[] = Array.from(
//             (container.previousSibling as HTMLLIElement).querySelectorAll('li')
//           )
//           const secondListArray: HTMLLIElement[] = Array.from(
//             (container.nextSibling as HTMLLIElement).querySelectorAll('li')
//           )

//           for (let i = 0; i < firstListArray.length; i++) {
//             newList.appendChild(firstListArray[i].cloneNode(true))
//             newList.append(li)
//           }

//           for (let i = 0; i < secondListArray.length; i++) {
//             newList.appendChild(secondListArray[i].cloneNode(true))
//           }

//           container.previousSibling!.remove()
//           container.nextSibling!.remove()
//           if (container instanceof Element) container.remove()

//           range.deleteContents()
//           range.insertNode(newList)
//           range.collapse(false)

//           return
//         } else {
//           const newList = document.createElement('ul')
//           const li = document.createElement('li')

//           li.append(container.textContent!)
//           newList.append(li)

//           if (container instanceof Element) container.remove()
//           insertNodeWithCollapse(newList, selection, range, true)

//           return
//         }
//       } else {
//         insertNodeWithCollapse(ul, selection, range, true)
//         return
//       }
//     }
//   }
// }

const handleHr = (): void => {
  const hr = document.createElement('hr')

  insertNodeElement(hr)
}

const uploadImage = (value: File): void => {
  editable.value?.focus()

  // if (
  //   value &&
  //   (document.getSelection().anchorNode.parentNode.id === 'editable' ||
  //     document.getSelection().anchorNode.id === 'editable')
  // ) {
  //   let { imagePath, wide } = value

  //   let el = document.createElement('img')
  //   el.src = imagePath

  //   if (wide) el.setAttribute('wide', '')

  //   insertNodeElement(el)
  // }
  console.log(`upload image: ${value}`)
}

const setCurrentModal = (modal: string) => {
  isCurrentModal.value = modal
}

const close = () => {
  isFocusedEditor.value = false
  editable.value = null
}

const getStringHTMLContent = computed(() => {
  return editable.value?.textContent
})

const getDeliveredContent = computed(() => props.deliveryContent)
const getDocumentContent = computed(() => props.documentContent)

const isAdvancedModeEditor = computed(() => props.mode === EDITOR_MODES.ADVANCED)
const hasButton = computed(() => props.submit)

watch(focused, focused => {
  if (focused) {
    isFocusedEditor.value = true
    isFirstClick.value = true
    disableEditor.value = true
  }
})
watch(wordCount, value => emit('word-count', value))
watch(characterCount, value => emit('character-count', value))
watch(textContent, value => {
  if (!value) return

  emit('editable-content', editable.value?.innerHTML)
})
watch(getDeliveredContent, value => {
  if (value.length > 0) {
    const textNode = document.createTextNode(value)

    if (!selection) return

    editable.value?.focus()

    const range = selection.getRangeAt(0)

    range.deleteContents()
    range.insertNode(textNode)
    range.collapse(false)

    return
  }
})
watch(getDocumentContent, value => {
  if (value.length && editable.value) {
    const htmlContent = convertStringToHTML(value)

    editable.value?.focus()

    editable.value.appendChild(htmlContent)
  }
})

onClickOutside(wrapper, close)

onMounted(() => {
  if (!editable.value) return
  // trackChanges(editable.value)
})

onUnmounted(() => {
  // cleanup()
  close()
})
</script>

<style lang="scss" setup>
@use 'styles';
</style>
