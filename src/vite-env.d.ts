/// <reference types="vite/client" />

// Типізація власних змінних середовища Vite (префікс VITE_).
interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_APP_NAME?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
