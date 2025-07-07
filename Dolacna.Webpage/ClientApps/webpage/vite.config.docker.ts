import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// Docker-specific config without lovable-tagger
export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, `../../wwwroot`),
    emptyOutDir: true,
    // Enable minification for production builds
    minify: mode === 'production' ? 'esbuild' : false,
    // Reduce chunk size warnings for Docker builds
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
  // Optimization for Alpine Linux
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
}));
