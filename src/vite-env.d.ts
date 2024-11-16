/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BETTERMODE_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 
