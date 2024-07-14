import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers';

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

import { VitePWA } from 'vite-plugin-pwa'

const env = dotenv.config({ path: 'C:/Users/danie/OneDrive/Documentos/GitHub/Kenai/env' });
dotenvExpand.expand(env);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'KenAI',
        short_name: 'KenAI',
        description: '¡KenAI el chat generativo para practicar inglés!',
        theme_color: '#fca311',
        background_color: '#121212',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '.',
        scope: '.',
        icons: [
          {
            src: '/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icons/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: '/icons/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png'
          },
          {
            src: '/icons/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: '/icons/favicon.ico',
            sizes: '48x48',
            type: 'image/x-icon'
          },
          {
            src: '/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: '/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: '/screenshots/screenshot1.png',
            sizes: '640x1136',
            type: 'image/png',
          },
          {
            src: '/screenshots/screenshot2.png',
            sizes: '750x1334',
            type: 'image/png',
          },
        ],
        shortcuts: [
          {
            name: 'Shortcut 1',
            short_name: 'Shortcut1',
            description: 'Shortcut 1 Description',
            url: '/shortcut1',
            icons: [{ src: '/icons/shortcut-icon-192x192.png', sizes: '192x192', type: 'image/png' }],
          },
          {
            name: 'Shortcut 2',
            short_name: 'Shortcut2',
            description: 'Shortcut 2 Description',
            url: '/shortcut2',
            icons: [{ src: '/icons/shortcut-icon-192x192.png', sizes: '192x192', type: 'image/png' }],
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: false,
        // runtimeCaching: [
        //   {
        //     urlPattern: ({ request }) => request.destination === 'document',
        //     handler: 'NetworkFirst',
        //     options: {
        //       cacheName: 'html-cache',
        //     },
        //   },
        //   {
        //     urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
        //     handler: 'StaleWhileRevalidate',
        //     options: {
        //       cacheName: 'asset-cache',
        //     },
        //   },
        //   {
        //     urlPattern: ({ request }) => request.destination === 'image',
        //     handler: 'CacheFirst',
        //     options: {
        //       cacheName: 'image-cache',
        //       expiration: {
        //         maxEntries: 50,
        //         maxAgeSeconds: 30 * 24 * 60 * 60,
        //       },
        //     },
        //   },
        // ],
      },
    }),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 8080
  },
  build: {
    outDir: '../app/dist',
    emptyOutDir: true,
  }
})
