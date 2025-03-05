export const CONFIG_IMAGE = {
  fileSize: 2,
  formats: 'png, jpg, jpeg, webp'
}

export interface ConfigEditor {
  // userId: number
  mode?: string
  placeholder?: string
  typeSubmit?: string
  disabled?: boolean
}

export const EDITOR_SUBMITS = {
  BUTTON: 'button',
  NONE: 'none'
} as const

export const EDITOR_MODES = {
  BASE: 'base',
  ADVANCED: 'advanced'
} as const

export type EDITOR_MODE = (typeof EDITOR_MODES)[keyof typeof EDITOR_MODES]
export type EDITOR_SUBMIT = (typeof EDITOR_SUBMITS)[keyof typeof EDITOR_SUBMITS]
