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

// class LocalStorageService {
//   static setItem(key: string, value: any) {
//     localStorage.setItem(key, JSON.stringify(value));
//   }

//   static getItem<T>(key: string, defaultValue: T): T {
//     const value = localStorage.getItem(key);
//     if (value === null) {
//       this.setItem(key, defaultValue);
//       return defaultValue;
//     } else {
//       return JSON.parse(value) as T;
//     }
//   }

//   static getItemOrNull<T>(key: string): T | null {
//     const value = localStorage.getItem(key);
//     if (value) {
//       return JSON.parse(value) as T;
//     }
//     return null;
//   }
// }

// export default LocalStorageService;

// using

// import LocalStorageService from "@/modules/core/services/local-storage.ts";
// 
// if (!LocalStorageService.getItemOrNull(`request-${action.id}`)) {
//   setRequestChanged(true);
// } else {
//   setRequestChanged(JSON.stringify(res.right) !== JSON.stringify(LocalStorageService.getItemOrNull(`request-${action.id}`)!))
// }
// LocalStorageService.setItem(`request-${action.id}`, res.right);
