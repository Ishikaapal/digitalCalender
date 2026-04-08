import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tainwindcss from '@tailwindcss/vite';
import Path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , tainwindcss()],

  resolve:{
    alias:{
      "@": Path.resolve(__dirname, "./src")
    }
  },

  base: '/digitalCalender',
})
