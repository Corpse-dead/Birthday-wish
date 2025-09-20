import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Base path configuration for different deployment targets
  const base = process.env.GITHUB_ACTIONS 
    ? '/Birthday-wish/'  // GitHub Pages repository name
    : './'               // Vercel and local development

  return {
    plugins: [react()],
    base: base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      // Ensure compatibility with both platforms
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    server: {
      port: 3000,
      host: true, // Enable access from mobile devices on the same network
      open: true
    }
  }
})
