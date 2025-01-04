import fs from 'node:fs'
import path from 'node:path'
import { getConfig } from './_utils.js'

const { COPY_IMG_DIRLIST, COPY_IMG_LOCALE_FROM, COPY_IMG_LOCALE_TO } = getConfig()
const copyDirlist = COPY_IMG_DIRLIST.split(',')

for (let i = 0; i < copyDirlist.length; i++) {
    findDir(copyDirlist[i], copyFile)
}

function copyFile(dirpath, file) {
    const reg = new RegExp(`^(.+)${COPY_IMG_LOCALE_FROM}.(png|webp)$`)
    if (reg.test(file.name)){
        fs.copyFileSync(path.resolve(dirpath, file.name), path.resolve(dirpath, file.name.replace(reg, `$1${COPY_IMG_LOCALE_TO}.$2`)))
    }
}

function findDir(dirpath, fileCallback) {
    const dirlist = fs.readdirSync(dirpath, { withFileTypes: true })
    for (let i = 0; i < dirlist.length; i++) {
      const file = dirlist[i]
      if (file.isFile()) {
          fileCallback(dirpath, file)
      } else {
          findDir(path.resolve(dirpath, file.name), fileCallback)
      }
    }
}
