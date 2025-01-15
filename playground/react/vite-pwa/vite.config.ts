import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // VitePWA({
    //   devOptions: {
    //     enabled: true,
    //   },
    //   registerType: 'autoUpdate',
    //   workbox: {
    //     runtimeCaching: [
    //       {
    //         urlPattern: /\.svg$/,
    //         handler: 'CacheFirst',
    //         method: 'GET',
    //         options: {
    //           cacheName: 'test',
    //           plugins: [
    //             {
    //               requestWillFetch: async ({ request }) => {
    //                 const url = new URL(request.url)
    //                 const [, version] = url.pathname.match(/^\/(\d)\//) || []
    //
    //                 if (version) {
    //                   url.pathname = url.pathname.substring(version.length + 2)
    //                   url.search = `?v=${version}`
    //                   return new Request(url, request)
    //                 }
    //
    //                 return request
    //               },
    //             },
    //           ],
    //           cacheableResponse: {
    //             statuses: [200],
    //           }
    //         },
    //       },
    //     ]
    //   }
    // }),
    VitePWA({
      devOptions: {
        enabled: true,
        type: 'module',
      },
      srcDir: 'src',
      filename: 'sw.js',
      strategies: 'injectManifest',
      injectRegister: 'auto',
      registerType: 'autoUpdate',
    }),
  ],
})
