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
}

export const EDITOR_MODES = {
  BASE: 'base',
  ADVANCED: 'advanced'
} as const

export const AI_MODELS_ENTITY = [
  {
    id: 1,
    label: 'gpt-4.5-preview'
  },
  {
    id: 2,
    label: 'o3-mini'
  },
  {
    id: 3,
    label: 'gpt-4o-mini'
  },
  {
    id: 4,
    label: 'o1-mini'
  },
  {
    id: 5,
    label: 'o1'
  },
  {
    id: 6,
    label: 'gpt-4o'
  },
  {
    id: 7,
    label: 'gpt-4-turbo'
  },
  {
    id: 8,
    label: 'gpt-4'
  },
  {
    id: 9,
    label: 'gpt-3.5-turbo'
  },
  {
    id: 10,
    label: 'deepseek-r1'
  },
  {
    id: 11,
    label: 'deepseek-r1-fast'
  },
  {
    id: 12,
    label: 'deepseek-chat'
  },
  {
    id: 13,
    label: 'gemini-2.0-flash-lite-001'
  },
  {
    id: 14,
    label: 'gemini-2.0-flash-001'
  },
  {
    id: 15,
    label: 'gemini-flash-1.5-8b'
  },
  {
    id: 16,
    label: 'gemini-pro-1.5'
  },
  {
    id: 17,
    label: 'claude-3.7-sonnet'
  },
  {
    id: 18,
    label: 'claude-3.7-sonnet-think'
  },
  {
    id: 19,
    label: 'claude-3.5-haiku'
  },
  {
    id: 20,
    label: 'claude-3-opus'
  },
  {
    id: 21,
    label: 'llama-3.3-70b-instruct'
  },
  {
    id: 22,
    label: 'llama-3.2-1b-instruct'
  },
  {
    id: 23,
    label: 'llama-3.2-3b-instruct'
  },
  {
    id: 24,
    label: 'llama-3.2-11b-vision-instruct'
  },
  {
    id: 25,
    label: 'llama-3.2-90b-vision-instruct'
  },
  {
    id: 26,
    label: 'sonar'
  },
  {
    id: 27,
    label: 'sonar-reasoning'
  },
  {
    id: 28,
    label: 'grok-2-1212'
  },
  {
    id: 29,
    label: 'grok-2-vision-1212'
  },
  {
    id: 30,
    label: 'grok-beta'
  },
  {
    id: 31,
    label: 'grok-vision-beta'
  }
]

export const AI_MODELS = {
  'gpt-4.5-preview': 'gpt-4.5-preview',
  'o3-mini': 'o3-mini',
  'gpt-4o-mini': 'gpt-4o-mini',
  'o1-mini': 'o1-mini',
  o1: 'o1',
  'gpt-4o': 'gpt-4o',
  'gpt-4-turbo': 'gpt-4-turbo',
  'gpt-4': 'gpt-4',
  'gpt-3.5-turbo': 'gpt-3.5-turbo',
  'deepseek-r1': 'deepseek-r1',
  'deepseek-r1-fast': 'deepseek-r1-fast',
  'deepseek-chat': 'deepseek-chat',
  'gemini-2.0-flash-lite-001': 'gemini-2.0-flash-lite-001',
  'gemini-2.0-flash-001': 'gemini-2.0-flash-001',
  'gemini-flash-1.5-8b': 'gemini-flash-1.5-8b',
  'gemini-pro-1.5': 'gemini-pro-1.5',
  'claude-3.7-sonnet': 'claude-3.7-sonnet',
  'claude-3.7-sonnet-think': 'claude-3.7-sonnet-think',
  'claude-3.5-haiku': 'claude-3.5-haiku',
  'claude-3.5-sonnet': 'claude-3.5-sonnet',
  'claude-3-haiku': 'claude-3-haiku',
  'claude-3-opus': 'claude-3-opus',
  'llama-3.3-70b-instruct': 'llama-3.3-70b-instruct',
  'llama-3.2-1b-instruct': 'llama-3.2-1b-instruct',
  'llama-3.2-3b-instruct': 'llama-3.2-3b-instruct',
  'llama-3.2-11b-vision-instruct': 'llama-3.2-11b-vision-instruct',
  'llama-3.2-90b-vision-instruct': 'llama-3.2-90b-vision-instruct',
  sonar: 'sonar',
  'sonar-reasoning': 'sonar-reasoning',
  'grok-2-1212': 'grok-2-1212',
  'grok-2-vision-1212': 'grok-2-vision-1212',
  'grok-beta': 'grok-beta',
  'grok-vision-beta': 'grok-vision-beta'
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
export type AI_MODEL = (typeof AI_MODELS)[keyof typeof AI_MODELS]
