import {createModel} from "../util";

export const cacheBody = createModel({
  name: 'hello world!'
}, {
  prefix: 'rm-cache-body',
  key: ['name']
})