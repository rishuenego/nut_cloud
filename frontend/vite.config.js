import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    port: 3011,
    proxy: {
      '/api': {
        target: 'http://api.nutbaba.in',
        changeOrigin: true,
      },
    },
  },

  preview: {
    host: '0.0.0.0',
    port: 3011,
    allowedHosts: ['nutbaba.in', 'www.nutbaba.in','api.nutbaba.in'],
  },
})
