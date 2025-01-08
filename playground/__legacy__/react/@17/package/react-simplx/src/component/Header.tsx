import {cardList} from "../model/cardList";
import {Link} from "react-router-dom";
import React from "react";
import {useWatch} from "../util";

export function Header() {
  useWatch([[cardList, 'list']])
  console.log(`Component: <Header /> 刷新`)
  return <header>
    <ul>
      <li><Link to={'/'}>CardList ({cardList.list.length})</Link></li>
      <li><Link to={'/cache-body'}>CacheBody</Link></li>
      <li><Link to={'/watcher'}>Watcher</Link></li>
    </ul>
  </header>
}