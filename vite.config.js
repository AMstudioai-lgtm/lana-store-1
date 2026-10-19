import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' : nécessaire pour GitHub Pages (sous-chemin /lana-store-1/)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})
