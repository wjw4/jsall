import fs from 'node:fs'
import path from 'node:path'
import { getConfig } from './_utils.js'

const { RECUR_CHANGE_FILE_DIRLIST, RECUR_CHANGE_FILE_LOCALE_FROM, RECUR_CHANGE_FILE_LOCALE_TO } = getConfig()
const dirList = RECUR_CHANGE_FILE_DIRLIST.split(',')

for (let i = 0; i < dirList.length; i++) {
  findDir(dirList[i], rename)
}

function rename(dirpath, file) {
  if (new RegExp(RECUR_CHANGE_FILE_LOCALE_FROM).test(file.name)) {
    fs.renameSync(
      path.resolve(dirpath, file.name),
      path.resolve(dirpath, file.name.replace(new RegExp(RECUR_CHANGE_FILE_LOCALE_FROM, 'g'), RECUR_CHANGE_FILE_LOCALE_TO)),
    )
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
