import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@use "@/assets/base.sass"`
      }
    }
  },
  server: {
    host: '0.0.0.0',  // 외부 접근 허용
    port: 5173        // 포트를 5173으로 고정
  },
  preview: {
    port: 5173        // 'npm run preview'의 포트도 5173으로 설정
  }
})
