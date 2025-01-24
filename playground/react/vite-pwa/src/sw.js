import { registerRoute } from 'workbox-routing'

const METADATA_KEY = '__metadata__'
/** @desc 最大緩存時間 - 七天 */
const MAX_CACHE_TIME = 7 * 24 * 60 * 60 * 1000;
/** @desc 所有緩存的 key */
const cacheInfo = {
  mpLess: {
    name: 'mp-less',
    version: 1,
  },
  mpOften: {
    name: 'mp-often',
    version: 1,
  },
  resourcesCommonLess: {
    name: 'res-common-less',
    version: 1,
  },
  resourcesTmplLess: {
    name: 'res-tmpl-less',
    version: 1,
  },
  resourcesCommonOften: {
    name: 'res-common-often',
    version: 1,
  },
  resourcesTmplOften: {
    name: 'res-tmpl-often',
    version: 1,
  },
  // 非以上全是 other，永久地且有銷毀時間的
  other: {
    name: 'other',
  },
}
/** @desc 會在初始化啟動時全數開啟放入，後面就不需要 await 了，也有 key 調用 */
const openCache = (
  /**
   * @template {Record<string, any>} T
   * @param {T} obj
   * @return {Record<keyof T, Cache>}
   */
  (obj) => {
    return {}
  }
)(cacheInfo)
/** @desc 沒記錄到表示永久 */
const mpVersionInfo = {
  'mp/favicon': cacheInfo.mpLess,
  'mp/audio': cacheInfo.mpLess,
  'mp/gif': cacheInfo.mpLess,
  'mp/pwa-assets': cacheInfo.mpLess,
  'mp/svg': cacheInfo.mpLess,
  'mp/video': cacheInfo.mpLess,
  'mp/png': cacheInfo.mpOften,
  'mp/webp': cacheInfo.mpOften,
}

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

self.addEventListener('install', () => {
  console.log('[Service Worker] Installed');

  // 新的 SW 立即跳過等待狀態並進入激活
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated');

  event.waitUntil(
    (async () => {
      // 新 SW 在激活後接管所有頁面，這樣才可以立即緩存加載到的資源
      await self.clients.claim()

      const cacheNames = Object.keys(cacheInfo)
      const now = Date.now()
      await Promise.all(
        cacheNames.map(async (key) => {
          const cacheName = cacheInfo[key].name
          openCache[cacheName] = await caches.open(cacheName)
          const metadataResponse = await openCache[cacheName].match(METADATA_KEY)
          let hasMetadata = !!metadataResponse

          if (hasMetadata) {
            /** @type {{timestamp
             : number; version: number}} */
            let cacheMetadata

            try {
              cacheMetadata = await metadataResponse.json()
              // other 是永久緩存所以看緩存時間銷毀
              if (cacheName === 'other') {
                if (now - cacheMetadata.timestamp > MAX_CACHE_TIME) {
                  hasMetadata = resetOpenCache(cacheName)
                }
              }
              // 其他看版本號
              else {
                if (cacheMetadata.version !== cacheInfo[key].version) {
                  hasMetadata = resetOpenCache(cacheName)
                }
              }
            } catch (err) {
              console.error(err)
              hasMetadata = false
            }
          }

          if (!hasMetadata) {
            const cacheMetadata = {
              timestamp: Date.now(),
            }

            if (cacheInfo[key].version != null) {
              cacheMetadata.version = cacheInfo[key].version
            }

            await openCache[cacheName].put(
              METADATA_KEY,
              new Response(JSON.stringify(cacheMetadata))
            )
          }
        })
      )
    })()
  );
})

registerRoute(
  /*
    正則說明
    https://xxx.xxx.xxx/assets/chunk/vendor/sub-swiper-legacy-BLr59Rjd.js
    https://xxx.xxx.xxx/mp/fonts/Roboto-Regular.ttf
    https://xxx.xxx.xxx/mp/webp/common_img_logo.webp
    https://xxx.xxx.xxx/fserver/files/images/21/advertisement/a201cdd093d14dffb6fbbe9ef1be4d0e.png
    https://xxx.xxx.xxx/resources/common/images/game/EVOPLAY/EVOPLAY_5787_en_US.webp
    https://xxx.xxx.xxx/resources/common/images/game/EZUGI/EZUGI_1_en_US.webp
    https://xxx.xxx.xxx/assets/uno-7b43cbc5.css
    https://xxx.xxx.xxx/resources/default/images/sales-promotion/page-banner/activity_img_banner_tripledeposit_pt_BR.webp
    https://xxx.xxx.xxx/mp/ra-asfcdsadf.js
    https://xxx.xxx.xxx/mp/favicon.ico

    group1 = origin/{這塊(mp, assets 之類的)}\/
    group2 = 為緊隨 group1/ 後的目錄名
    group3 = group2 / 後的 resources 長路徑，也會匹配到其他的，假設路徑相同，所以要抽出來判斷
    group4 = 檔名

    ra-xxx.js 要改進 mp 下
   */
  ({ url }) => {
    const regex = /^(?:https:\/\/[^.\/]+\.[^.\/]+(?:\.[^.\/]+)?)?\/?(mp|assets|fserver|resources)\/?([A-z0-9]+)?\/?(images\/sales-promotion\/page-banner|images\/game)?.*\/([A-z0-9-_]+)\.[A-z0-9]+$/
    const match = regex.exec(url.pathname)
    if (match) {
      url.matchGroups = match
      return true
    }
    return false
  },
  // 自定義 handler 動態控制是否緩存或讓資源過期
  async ({ event, url }) => {
    // matchGroups 基本上是必定有
    const { matchGroups } = url
    if (!matchGroups) return fetch(event.request)

    let cache = openCache.other, version

    const [, headName, trailHeadDirName, resourcesSpecificPathname, filename] = matchGroups
    let cacheName

    if (headName === 'mp') {
      const versionInfo = mpVersionInfo[`${headName}/${trailHeadDirName}`] || mpVersionInfo[`${headName}/${filename}`]
      if (versionInfo != null) {
        cacheName = versionInfo.name
        version = versionInfo.version
      }
    } else if (headName === 'resources') {
      if (resourcesSpecificPathname) {
        if (trailHeadDirName === 'common') {
          cacheName = cacheInfo.resourcesCommonOften.name
          version = cacheInfo.resourcesCommonOften.version
        } else {
          cacheName = cacheInfo.resourcesTmplOften.name
          version = cacheInfo.resourcesTmplOften.version
        }
      } else {
        if (trailHeadDirName === 'common') {
          cacheName = cacheInfo.resourcesCommonLess.name
          version = cacheInfo.resourcesCommonLess.version
        } else {
          cacheName = cacheInfo.resourcesTmplLess.name
          version = cacheInfo.resourcesTmplLess.version
        }
      }
    }

    if (cacheName && openCache[cacheName]) {
      cache = openCache[cacheName]
    }

    if (version != null) {
      url.searchParams.append('v', version)
    }
    const cacheUrl = url.toString()
    const cachedResponse = await cache.match(cacheUrl);
    if (cachedResponse) return cachedResponse

    const response = await fetch(new Request
    (cacheUrl, event.request))
    if (response.ok) await cache.put(cacheUrl, response.clone())

    return response;
  }
)

async function resetOpenCache (cacheName) {
  await caches.delete(cacheName)
  openCache[cacheName] = await caches.open(cacheName)
  return false
}