import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Base para GitHub Pages: el sitio vive en xkoderx.github.io/mlbb-fan-page/
  base: '/mlbb-fan-page/',
  plugins: [react()],
})
