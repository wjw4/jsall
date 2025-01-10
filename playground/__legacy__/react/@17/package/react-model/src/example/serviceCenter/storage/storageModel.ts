import {memorize} from "@react-model";

const memories = {
  // storageKey default is `rm_${key}` -> rm_nickname
  nickname: memorize('nickname', '', 'example_nickname')
}

const model = {
  nickname: memories.nickname[0]
}

const setStorage = <K extends keyof typeof memories>(key: K, value: typeof model[K]) => {
  model[key] = memories[key][1](value)
}

export const storageModel = model
export const storageService = {
  setStorage
}