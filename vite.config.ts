import react from '@vitejs/plugin-react'
import path from 'path';
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages':  path.resolve(__dirname, './src/pages'),
      '@hooks':  path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@containers':  path.resolve(__dirname, './src/containers'),
      
    },
  },
})
