import {createModel} from "../util";

export interface ICard {
  id: number
  name: string
  type: string
  isFinish: boolean
}

interface ICardList {
  list: ICard[]
}

export const cardList = createModel<ICardList>({
  list: [
    {id: 1, name: '顏色錯誤', type: 'BUG', isFinish: true},
    {id: 2, name: '製作 bug 管理', type: '主任務', isFinish: false},
    {id: 3, name: 'api 串接', type: '主任務', isFinish: false},
  ]
})