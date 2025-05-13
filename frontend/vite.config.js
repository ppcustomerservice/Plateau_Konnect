import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    proxy: {
      '/api': {
        target: 'https://plateau-konnect-1-6hf1.onrender.com', // assuming backend runs on port 5000
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
