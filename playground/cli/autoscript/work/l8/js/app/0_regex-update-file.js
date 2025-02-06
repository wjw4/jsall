import fs from 'fs'
import path from 'path'
import '../_error-handler.js'
import { getConfig } from '../_utils.js'

const {
  REGEX_UPDATE_FILE_DIR_LIST,
  REGEX_UPDATE_FROM,
  REGEX_UPDATE_FROM_FLAGS,
  REGEX_UPDATE_TO,
  REGEX_UPDATE_ACTION, // copy, remove, rename
  REGEX_UPDATE_IS_RECURSIVE,
} = getConfig()
const dirList = REGEX_UPDATE_FILE_DIR_LIST.split(',')

for (let i = 0; i < dirList.length; i++) {
  findDir(dirList[i], handleFindFileCallback)
}

function handleFindFileCallback(dirpath, file) {
  const fromReg = new RegExp(REGEX_UPDATE_FROM, REGEX_UPDATE_FROM_FLAGS || undefined)
  if (fromReg.test(file.name)) {
    const originFilepath = path.resolve(dirpath, file.name)
    const newFilename = file.name.replace(fromReg, REGEX_UPDATE_TO)

    if (REGEX_UPDATE_ACTION === 'copy') {
      fs.copyFileSync(
        originFilepath,
        path.resolve(dirpath, newFilename),
      )
    } else if (REGEX_UPDATE_ACTION === 'remove') {
      fs.rmSync(originFilepath)
    } else if (REGEX_UPDATE_ACTION === 'rename') {
      fs.renameSync(
        originFilepath,
        path.resolve(dirpath, newFilename),
      )
    }
  }
}

function findDir(dirpath, fileCallback) {
  const dirlist = fs.readdirSync(dirpath, { withFileTypes: true })
  for (let i = 0; i < dirlist.length; i++) {
    const file = dirlist[i]
    if (file.isFile()) {
      fileCallback(dirpath, file)
    } else if (REGEX_UPDATE_IS_RECURSIVE) {
      findDir(path.resolve(dirpath, file.name), fileCallback)
    }
  }
}
