

const CACHE_TIME = 1800; // 30 分钟缓存
const RENDER_CACHE = new Map();

async function get(browser, url) {
  if (RENDER_CACHE.has(url)) {
    return {html: RENDER_CACHE.get(url), ttRenderMs: 0};
  }
  const start = Date.now()

  try {
    const page = await browser.newPage()
    const stylesheetContents = {}

    // 1. Stash the responses of local stylesheets.
    page.on('response', async resp => {
      const responseUrl = resp.url()
      const sameOrigin = new URL(responseUrl).origin === new URL(url).origin
      const isStylesheet = resp.request().resourceType() === 'stylesheet'
      if (sameOrigin && isStylesheet) {
        stylesheetContents[responseUrl] = await resp.text()
      }
    });

    // 2. Load page as normal, waiting for network requests to be idle.
    // networkidle0 waits for the network to be idle (no requests for 500ms).
    await page.goto(url, {waitUntil: 'networkidle0'})
    await page.waitForSelector('#root'); // ensure #app exists in the DOM.

    // 3. Inline the CSS.
    // Replace stylesheets in the page with their equivalent <style>.
    await page.$$eval('link[rel="stylesheet"]', (links, content) => {
      links.forEach(link => {
        const cssText = content[link.href]
        if (cssText) {
          const style = document.createElement('style')
          style.textContent = cssText
          link.replaceWith(style)
        }
      })
    }, stylesheetContents)

    // 4. Get updated serialized HTML of page.
    const html = await page.content() // serialized HTML of page DOM.
    await browser.close()

    const ttRenderMs = Date.now() - start;
    console.info(`Puppeteer rendered page: ${url} in: ${ttRenderMs}ms`);
    RENDER_CACHE.set(url, html); // cache rendered page.

    return {html, ttRenderMs}
  } catch (err) {
    console.error(err)
    throw new Error('render fail')
  }
}

const ssr = {
  get
};
module.exports = ssr
