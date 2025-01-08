import {useWatch} from "../../util";
import {cardList} from "../../model/cardList";
import {Card} from "./component/Card";
import React from "react";

export function CardList() {
  useWatch([cardList])
  console.log(`Component: <CardList /> 刷新`)
  return <div>
    <h1>CardList</h1>
    {cardList.list.map((card, i) => <Card card={card} index={i} key={card.id}/>)}
  </div>
}