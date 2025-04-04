import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // Ensures SW is always updated
      devOptions: {
        enabled: true, // Allows testing in dev mode
        type: 'module',
      },
      manifest: {
        name: 'PWA Guide',
        short_name: 'PWA Guide',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#000000',
        display: 'standalone', // Important for PWA
        icons: [
          {
            src: '/goodFood.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
