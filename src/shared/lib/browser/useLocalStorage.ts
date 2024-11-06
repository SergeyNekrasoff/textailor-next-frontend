import { APP_NAME } from '@/app/shared/config'

interface IUseLocalStorage<T> {
  value: T
  setValue: (value: T) => void
}

export function useLocalStorage<T>(key: string, initialValue: T): IUseLocalStorage<T> {
  const keyLS = `${APP_NAME}:${key}`

  const valueLS = window.localStorage.getItem(keyLS)
  const value: T = valueLS ? JSON.parse(valueLS) : initialValue

  function setValue(value: T): void {
    window.localStorage.setItem(keyLS, JSON.stringify(value))
  }

  return { value, setValue }
}

// import { useLocalStorage } from '@/shared/lib/browser'

// store.ts
//   const { value: tokenValue, setValue: setLSToken } = useLocalStorage(TOKEN_KEY, '')
