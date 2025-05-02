import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // 타입 에러로 인해 빌드 멈추지 않게 설정
    target: 'esnext',
    minify: false,
    rollupOptions: {}
  },
  // ↓ Vite 자체 타입 오류 무시하는 옵션은 없음. 대신 tsc 분리하거나 eslint로 제한 가능
})