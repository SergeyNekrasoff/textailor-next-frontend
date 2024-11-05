import 'vite/client'

declare global {
  interface ImportMeta {
    env: {
      // Define your environment variables here
      VITE_BASE_URL: string
      VITE_APP_VERSION: string
      // Add more environment variables as needed
    }
  }
}
