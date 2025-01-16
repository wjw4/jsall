import { registerRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

const MP_LESS_VERSION = 1
const MP_OFTEN_VERSION = 1
const cacheVersionNames = {}

// base

// mp favicon.ico 緩存

// resources

// fserver

/*
  永久(需要有有效期)
  uno css 緩存
  編譯的運行 js, css 緩存
  訪問限制 js 緩存
  fserver
  mp cant
  resources/common/audio

  偶爾
  mp favicon.ico 緩存
  mp less

  頻繁
  mp often
*/

/** @desc 先用手填哈，反正基本不會動，靜態也不會影響打包流程 */
const MP_DIRS = {
  // 不會異動
  cant: ['js', 'fonts'],
  // 較少異動
  less: ['audio', 'gif', 'pwa-assets', 'svg', 'video'],
  // 頻繁異動
  often: ['png', 'webp'],
}

self.addEventListener('install', () => {
  // 新的 SW 立即跳過等待狀態並進入激活
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // 新 SW 在激活後接管所有頁面，這樣才可以立即緩存加載到的資源
      await self.clients.claim()

      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames.map((cacheName) => {

        })
      )
    })()
  );
})

// Step 1: 清理舊版緩存（与前面描述的 `activate` 逻辑一致）
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated');
  const currentCacheVersion = 'svg-cache-v2'; // 当前版本的缓存名称
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys(); // 获取所有缓存名称
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== currentCacheVersion && cacheName.startsWith('svg-cache-v')) {
            console.log(`Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName); // 删除旧缓存
          }
        })
      );
    })()
  );
});

/** @desc false=未加載, true=加載過(不管失敗), Promise=加載中 */
let fetchVersionPromise = false

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
          if (fetchVersionPromise instanceof Promise) {
            console.log(fetchVersionPromise, 222)
            await fetchVersionPromise
            if (fetchVersionPromise !== true) {
              console.log(fetchVersionPromise, 333)
              fetchVersionPromise = true
            }
            console.log(fetchVersionPromise, 444)
          } else if (fetchVersionPromise === false) {
            console.log(111)
            fetchVersionPromise = new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log(2000)
                resolve()
              }, 2000)
            })
          }
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