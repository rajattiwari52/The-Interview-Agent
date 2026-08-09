import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
    proxy: {
      '/resume': {
        target: 'https://abstalk-1.onrender.com',
        changeOrigin: true,
        secure: true,
        ws: false,
      },
      '/interview': {
        target: 'https://abstalk-1.onrender.com',
        changeOrigin: true,
        secure: true,
        ws: false,
      },
    },
  },
});
