import { registerRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

// self.skipWaiting(): 新的 SW 立即跳過等待狀態並進入激活
self.addEventListener('install', (event) => {
  console.log('[SW] Install event');
  self.skipWaiting(); // 跳過等待，立刻準備激活新 SW
})

// self.clients.claim(): 新 SW 在激活後接管所有頁面
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  event.waitUntil(
    (async () => {
      // 控制目前已打開的客戶端頁面
      await self.clients.claim();
      console.log('[SW] Clients claimed successfully!');
    })()
  );
})

// Step 1: 清理舊版緩存（与前面描述的 `activate` 逻辑一致）
// self.addEventListener('activate', (event) => {
//   console.log('[Service Worker] Activated');
//   const currentCacheVersion = 'svg-cache-v2'; // 当前版本的缓存名称
//   event.waitUntil(
//     (async () => {
//       const cacheNames = await caches.keys(); // 获取所有缓存名称
//       await Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== currentCacheVersion && cacheName.startsWith('svg-cache-v')) {
//             console.log(`Deleting old cache: ${cacheName}`);
//             return caches.delete(cacheName); // 删除旧缓存
//           }
//         })
//       );
//     })()
//   );
// });

// Step 2: 註冊路由和緩存邏輯 (對應 `runtimeCaching`)
registerRoute(
  // 路由匹配：匹配所有 .svg 文件的請求
  ({ url }) => url.pathname.endsWith('.svg'),
  // 緩存策略：CacheFirst（優先從緩存讀取）
  new CacheFirst({
    cacheName: 'svg-cache-v3', // 使用帶版本號的緩存名稱
    plugins: [
      {
        requestWillFetch: async ({ request }) => {
          const url = new URL(request.url)
          const [, version] = url.pathname.match(/^\/(\d)\//) || []

          if (version) {
            url.pathname = url.pathname.substring(version.length + 2)
            url.search = `?v=${version}`
            return new Request(url, request)
          }

          return request
        }
      },
      new CacheableResponsePlugin({
        statuses: [0, 200], // 僅緩存回應狀態碼 0 和 200 的請求
      }),
      new ExpirationPlugin({
        maxEntries: 50, // 緩存最多 50 個資源
        maxAgeSeconds: 7 * 24 * 60 * 60, // 緩存的資源有效期為 7 天
      }),
    ],
  })
)