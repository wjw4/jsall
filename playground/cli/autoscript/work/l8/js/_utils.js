import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

export const DIR_NAME = fileURLToPath(new URL('.', import.meta.url))

export function getConfig () {
  const configPath = path.resolve(DIR_NAME, '../_config.txt')
  const configTxt = fs.readFileSync(configPath, 'utf-8')
  return configTxt.split(/[\r\n]/).reduce((p, e) => {
    const trimEl = e.trim()
    if (!trimEl || /^[\s#]+/.test(trimEl)) return p
    const [key, val] = trimEl.split('=')
    p[key] = val?.trim() || null
    return p
  }, {})
}
