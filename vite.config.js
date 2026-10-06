import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Production Hardened Vite Configuration
export default defineConfig({
  plugins: [react()],
  build: {
    // Turn off source maps to prevent leaking source code structure in production
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    }
  },
  esbuild: {
    // Drop debugger statements in production builds
    drop: process.env.NODE_ENV === 'production' ? ['debugger'] : []
  }
});
