import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/s23FECar',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom'
  },
})
