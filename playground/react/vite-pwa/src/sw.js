import { registerRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

const HTTPS_ORIGIN_REG = '^https:\\/\\/[^.\\/]+\\.[^.\\/]+(\\.[^.\\/]+)?\\/'

// 永久 START
const UNO_CSS_REG = new RegExp(`${HTTPS_ORIGIN_REG}assets\\/uno-[A-z0-9-_]+\\.css$`)
const BUNDLE_JS_CSS_REG = new RegExp(`${HTTPS_ORIGIN_REG}assets\\/(chunk\\/)?(vendor\\/|locale\\/)?.+-legacy-[A-z0-9-_]+\\.(js|css)$`)
const VIEW_ACCESS_JS_REG = new RegExp(`${HTTPS_ORIGIN_REG}ra-[A-z0-9-_]+\\.js$`)
const MP_FAVICON_REG = new RegExp(`${HTTPS_ORIGIN_REG}mp\\/favicon.ico$`)
const FSERVER_REG = new RegExp(`${HTTPS_ORIGIN_REG}fserver\\/files\\/images\\/[0-9]+\\/.+\\.[A-z0-9]+$`)
// 永久 END

// 偶爾 START
const RESOURCES_REG = new RegExp(`${HTTPS_ORIGIN_REG}resources\\/(common|TEMPLATE_NAME)\\/(festival|images|video|audio)\\/.+\\.[A-z0-9]+$`)
// 偶爾 END

// 頻繁 START
// 頻繁 END

/*
  主要資源目錄前綴分為
  /mp/
  /assets/
  /resources/
  /fserver/

  永久(需要有有效期)
  [forever] uno css 緩存
  [forever] 編譯的運行 js, css 緩存
  [forever] 訪問限制 js 緩存
  [forever] fserver
  [forever] mp cant

  偶爾
  [local-less] mp favicon.ico 緩存
  [local-less] mp less
  [] resources/audio

  頻繁
  mp often
  resources/images/sales-promotion/page-banner
  resources/images/game
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

// Step 2: 註冊路由和緩存邏輯
registerRoute(
  /*
    正則說明
    group1 = origin/{這塊(mp, assets 之類的)}\/
    group2 = group1 為 resources/{模板名}
    group3 = group1 / 後的 resources 長路徑，也會匹配到其他的，假設路徑相同，所以要抽出來判斷
    group4 = 檔名
    group5 = 副檔名

    ra-xxx.js 先不緩，要緩的話要改造進 mp 會比較好
   */
  ({ url }) => {
    const regex = /^(?:https:\/\/[^.\/]+\.[^.\/]+(?:\.[^.\/]+)?)?\/?(mp|assets|fserver|resources\/([A-z0-9]+))(\/images\/sales-promotion\/page-banner|\/images\/game)?.*\/([A-z0-9-_]+)\.([A-z0-9]+)$/
    const match = regex.exec(url.pathname)
    if (match) {
      url.matchGroups = match
      return true
    }
    return false
  },
  // 自定義 handler 動態控制是否緩存或讓資源過期
  async ({ event, url }) => {
    const { matchGroups } = url
    let cache

    if (matchGroups) {
      const [, headName, resourcesTmplName, resourcesSpecificPathname, filename, extension] = matchGroups
      cache = await caches.open(headName)
    }

    if (!cache) {
      cache = await caches.open('anonymous')
    }

    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
      const cacheDate = new Date(cachedResponse.headers.get('date'));
      const now = new Date();
      /** @desc 緩存到期時間 7 天後 */
      const maxAge = 7 * 24 * 60 * 60 * 1000;

      if (now - cacheDate > maxAge) {
        const [, response] = await Promise.all([
          cache.delete(event.request),
          fetch(event.request),
        ])
        if (response.ok) {
          await cache.put(event.request, response.clone());
        }
        return response;
      }

      return cachedResponse;
    }

    const response = await fetch(event.request);
    if (response.ok) {
      // 動態指定條件，例如只緩存特定文件名的資源
      const shouldCache = true;
      if (shouldCache) {
        await cache.put(event.request, response.clone());
      }
    }

    return response;
  }
)

// registerRoute(
//   // 路由匹配：匹配所有 .svg 文件的請求
//   ({ url }) => url.pathname.endsWith('.svg'),
//   // 緩存策略：CacheFirst（優先從緩存讀取）
//   new CacheFirst({
//     cacheName: 'svg-cache-v3', // 使用帶版本號的緩存名稱
//     plugins: [
//       {
//         requestWillFetch: async ({ request }) => {
//           if (fetchVersionPromise instanceof Promise) {
//             console.log(fetchVersionPromise, 222)
//             await fetchVersionPromise
//             if (fetchVersionPromise !== true) {
//               console.log(fetchVersionPromise, 333)
//               fetchVersionPromise = true
//             }
//             console.log(fetchVersionPromise, 444)
//           } else if (fetchVersionPromise === false) {
//             console.log(111)
//             fetchVersionPromise = new Promise((resolve, reject) => {
//               setTimeout(() => {
//                 console.log(2000)
//                 resolve()
//               }, 2000)
//             })
//           }
//           const url = new URL(request.url)
//           const [, version] = url.pathname.match(/^\/(\d)\//) || []
//
//           if (version) {
//             url.pathname = url.pathname.substring(version.length + 2)
//             url.search = `?v=${version}`
//             return new Request(url, request)
//           }
//
//           return request
//         }
//       },
//       new CacheableResponsePlugin({
//         statuses: [0, 200], // 僅緩存回應狀態碼 0 和 200 的請求
//       }),
//       new ExpirationPlugin({
//         maxEntries: 50, // 緩存最多 50 個資源
//         maxAgeSeconds: 7 * 24 * 60 * 60, // 緩存的資源有效期為 7 天
//       }),
//     ],
//   })
// )