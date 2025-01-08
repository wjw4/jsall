import React, {FC} from "react";
import {cardList, ICard} from "../../../model/cardList";
import {useChange} from "../../../util";

const onDeleteCard = (cardIndex: number) => {
  cardList.list = [...cardList.list.slice(0, cardIndex), ...cardList.list.slice(cardIndex + 1)]
}
export const Card: FC<{ card: ICard, index: number }> = ({card, index}) => {
  const {id, name, type, isFinish} = card
  const [_isFinish, setStatus] = useChange(card, 'isFinish')
  console.log(`Component: <Card /> 刷新`)
  return <ul>
    <li>
      <div style={{display: "inline-block", textDecoration: isFinish ? "line-through" : 'none'}}>
        [{type}] {name} -- #{id}
      </div>
      <div style={{display: "inline-block", float: "right"}}>
        <button onClick={() => setStatus(!_isFinish)}>{_isFinish ? '取消' : '完成'}</button>
        <button onClick={() => onDeleteCard(index)}>刪除</button>
      </div>
    </li>
  </ul>
}