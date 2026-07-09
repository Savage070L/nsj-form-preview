import { defineConfig } from 'vite';

// base: './' → относительные пути ассетов, чтобы работало под /nsj-form-preview/ на GitHub Pages
export default defineConfig({
  base: './',
  build: { chunkSizeWarningLimit: 2000, assetsInlineLimit: 0 },
});
