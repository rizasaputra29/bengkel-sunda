import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // If using React
import path from 'path'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  }
})