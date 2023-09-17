import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import json from '@rollup/plugin-json';
import commonjs from 'vite-plugin-commonjs'; // Import the commonjs plugin

export default defineConfig({
  plugins: [react(), json(), commonjs()], // Add commonjs to your list of plugins
});
