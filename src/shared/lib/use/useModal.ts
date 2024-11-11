import { ref, computed, shallowRef } from 'vue'
import type { Component, ComputedRef } from 'vue'

const defaultModal = {
  value: true,
  id: Symbol('dynamicModal'),
  component: '',
  bind: {},
  slots: {},
  on: {}
}

export interface Modal {
  id?: symbol
  component: string | Component
  slots?: {
    [key: string]: // slot name
    | {
          component: string | Component
          bind?: Record<string, unknown>
          // on?: { [key: string]: Function | Function[] }; // register events to slot component
        }
      | string
  }

  bind?: Record<string, unknown>
  on?: Record<string, unknown> // TODO: add function type
  value?: unknown
}

export const targetTeleport = 'body'

export interface modalAPI {
  modals: ComputedRef
  show(modal: Modal): void
  hide(key: symbol): void
}

const state = ref<Modal[]>([])

export const useModal = (): modalAPI => {
  const modals = computed(() => state.value)

  const show = (modal: Modal) => {
    state.value.push({ ...defaultModal, ...modal, component: shallowRef(modal.component) })
  }

  const hide = (key: symbol) => {
    state.value = state.value.filter(x => x.id !== key)
  }

  return { show, hide, modals }
}
