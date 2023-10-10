import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-plugin-pages-sitemap'

export default defineConfig({
  plugins: [
    react(),
    Pages({
      onRoutesGenerated: routes => (generateSitemap({ routes })),
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000 * 1024, // Set the maximum chunk size to 1MB
  },
});
