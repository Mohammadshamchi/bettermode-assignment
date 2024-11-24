import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = resolve(__dirname, '../..')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(rootDir, './src'),
      '@components': resolve(rootDir, './src/components'),
      '@config': resolve(rootDir, './src/config'),
      '@hooks': resolve(rootDir, './src/hooks'),
      '@pages': resolve(rootDir, './src/pages'),
      '@utils': resolve(rootDir, './src/utils'),
      '@types': resolve(rootDir, './src/types'),
      '@graphql': resolve(rootDir, './src/graphql'),
      '@styles': resolve(rootDir, './src/styles'),
      '@lib': resolve(rootDir, './src/lib'),
      '@assets': resolve(rootDir, './src/assets')
    }
  }
})
