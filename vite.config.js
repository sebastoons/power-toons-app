import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Power Toons - Tu App de Fitness',
        short_name: 'Power Toons',
        description: 'Aplicación de fitness con ejercicios y seguimiento.',
        theme_color: '#007bff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/2.svg',
            sizes: '192x192',
            type: 'image/svg'
          },
          {
            src: '/1.svg',
            sizes: '512x512',
            type: 'image/svg'
          },
          {
            src: '/2.svg',
            sizes: '196x196',
            type: 'image/svg',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,gif}']
      }
    })
  ],
});