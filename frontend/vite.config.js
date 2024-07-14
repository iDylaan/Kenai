import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pwaConfig from './pwa.config';

import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers';

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const env = dotenv.config({ path: 'C:/Users/danie/OneDrive/Documentos/GitHub/Kenai/env' });
dotenvExpand.expand(env);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pwaConfig,
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
