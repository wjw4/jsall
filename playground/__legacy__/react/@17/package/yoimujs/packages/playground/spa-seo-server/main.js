/// spa的seo方案 - 服务端动态渲染
/// https://luoxx.top/archives/spa%E7%9A%84seo%E6%96%B9%E6%A1%88-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%8A%A8%E6%80%81%E6%B8%B2%E6%9F%93
/// SPA 的 SEO 方案对比、最终实践
/// https://markdowner.net/article/73058307795021824
/// 零成本实现SPA(单页网页应用)seo优化
/// https://zhuanlan.zhihu.com/p/71187342
const express = require('express')
const request = require('request')
const ssr = require('./ssr.js')
const puppeteer = require('puppeteer')

const app = express()

const host = 'https://link-me.com.tw'


;(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  ;['/assets/*', '/*.(png|jpe?g|svg|gif|tiff|bmp|ico)'].forEach(path => {
    app.get(path, async (req, res) => {
      console.log(path, req.url)
      request(`${host}${req.url}`).pipe(res)
    })
  })

  app.get('*', async (req, res) => {
    const {html, ttRenderMs} = await ssr.get(browser, `${host}/#${req.originalUrl}`);
    res.set('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`)
    return res.status(200).send(html); // Serve prerendered page as response.
  })

  app.listen(8327, () => console.log(`
Server started(http://localhost:8327). 
Press Ctrl + C to quit
`))
})()

