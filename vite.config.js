import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePages from 'vite-plugin-pages';
import VitePagesSitemap from 'vite-plugin-pages-sitemap'; // Import the sitemap plugin

export default defineConfig({
  plugins: [
    react(),
    VitePages(), // Add VitePages plugin
    VitePagesSitemap(), // Add VitePagesSitemap plugin
  ],
  build: {
    chunkSizeWarningLimit: 1000 * 1024, // Set the maximum chunk size to 1MB
  },
});
