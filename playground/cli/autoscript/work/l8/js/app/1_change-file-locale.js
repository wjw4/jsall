import fs from 'fs'
import path from 'path'
import '../_error-handler.js'
import { getConfig } from '../_utils.js'

const { CHANGE_FILE_DIR, CHANGE_FILE_LOCALE_FROM, CHANGE_FILE_LOCALE_TO } = getConfig()

const dirList = fs.readdirSync(CHANGE_FILE_DIR, { withFileTypes: true })

for (let i = 0; i < dirList.length; i++) {
  const file = dirList[i]
  if (file.isFile()) {
    if (new RegExp(CHANGE_FILE_LOCALE_FROM).test(file.name)) {
      fs.renameSync(
        path.resolve(CHANGE_FILE_DIR, file.name),
        path.resolve(CHANGE_FILE_DIR, file.name.replace(new RegExp(CHANGE_FILE_LOCALE_FROM, 'g'), CHANGE_FILE_LOCALE_TO)),
      )
    }
  }
}
