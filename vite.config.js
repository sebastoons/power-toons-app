import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt', // Pregunta al usuario, no auto-actualiza
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'StrongToons - Tu Enciclopedia Fitness',
        short_name: 'StrongToons',
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
        globPatterns: ['**/*.{js,css,html,ico,png,svg,gif}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/raw\.githubusercontent\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'github-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60 // 24 horas
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: false // DESACTIVA PWA EN DESARROLLO
      }
    })
  ],
  css: {
    devSourcemap: true,
  }
});