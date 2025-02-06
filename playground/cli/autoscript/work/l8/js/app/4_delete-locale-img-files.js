import fs from 'fs'
import path from 'path'
import '../_error-handler.js'
import { getConfig } from '../_utils.js'

const { DELETE_IMG_DIRLIST, DELETE_IMG_LOCALE } = getConfig()
const dirList = DELETE_IMG_DIRLIST.split(',')

for (let i = 0; i < dirList.length; i++) {
  findDir(dirList[i], deleteFile)
}

function deleteFile(dirpath, file) {
  const reg = new RegExp(`^(.+)${DELETE_IMG_LOCALE}.(png|webp)$`)
  if (reg.test(file.name)){
    fs.rmSync(path.resolve(dirpath, file.name))
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
