import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



export default defineConfig({
  plugins: [react()],
  base:'/init/',
  server:{
    port:3000 ,
  }
})
