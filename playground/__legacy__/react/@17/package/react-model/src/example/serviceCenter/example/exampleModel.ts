import {publish} from "@react-model";
import {subType} from "src/example/serviceCenter/subType";
import {storageModel} from "src/example/serviceCenter/storage/storageModel";

const model = {
  input: {
    account: '',
    password: '',
  },
}

const onValueChange: <K extends keyof typeof model.input>(key: K, value: typeof model.input[K]) => void = (key, value) => {
  model.input[key] = value
}

const onSubmit = () => {
  const input = model.input;
  const account = input.account;
  const password = input.password;
  if (account === 'aaa' && password === 'bbb') {
    const name = storageModel.nickname;
    alert('login success! ' + name + ' account: ' + account + ' password: ' + password)
    input.account = ''
    input.password = ''
    publish(subType.RENDER_SEARCH_CONTROL, 'SUBMIT')
  } else {
    alert('login fail!')
  }
}

export const exampleModel = model
export const exampleService = {
  onValueChange,
  onSubmit,
}
