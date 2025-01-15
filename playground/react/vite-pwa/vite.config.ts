import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\.svg$/,
            handler: 'CacheFirst',
            method: 'GET',
            options: {
              cacheName: 'test',
              plugins: [
                {
                  requestWillFetch: async ({ request }) => {
                    const url = new URL(request.url)
                    url.pathname = url.pathname.replace(/^\/\d\//, '/')
                    return new Request(url, request)
                  },
                },
              ],
              cacheableResponse: {
                statuses: [200],
              }
            },
          },
        ]
      }
    }),
  ],
})
