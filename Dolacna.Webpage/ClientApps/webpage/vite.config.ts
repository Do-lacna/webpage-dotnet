import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

// https://vitejs.dev/config/

export const BASE_PATH = '/webpage';
export default defineConfig(({ mode }) => ({
  base: `${BASE_PATH}`,
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [react(), mode === 'development' && componentTagger()].filter(
    Boolean,
  ),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, `../../wwwroot${BASE_PATH}`), // Set output directory
    emptyOutDir: true, // Clear the output directory before building
    // minify: mode === 'production', // Disable minification for non-production builds
  },
}));
