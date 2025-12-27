import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  // ✅ Your backend port
        changeOrigin: true,
        secure: false,
        // ✅ Add these for cookie forwarding
        credentials: 'include',
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            proxyReq.setHeader('Cookie', req.headers.cookie || '');
          });
        }
      }
    }
  }
})
