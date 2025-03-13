export const CONFIG_IMAGE = {
  fileSize: 2,
  formats: 'png, jpg, jpeg, webp'
}

export interface ConfigEditor {
  // userId: number
  mode?: string
  placeholder?: string
  submit?: boolean
  disabled?: boolean
  deliveryContent?: string
  documentContent?: string
}

export const EDITOR_MODES = {
  BASE: 'base',
  ADVANCED: 'advanced'
} as const

export const SEARCH_STATUSES = [
  {
    id: 1,
    label: 'Search web'
  },
  {
    id: 2,
    label: `Don't search web`
  }
]

export type EDITOR_MODE = (typeof EDITOR_MODES)[keyof typeof EDITOR_MODES]
