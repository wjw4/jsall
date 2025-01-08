import React from "react";
import {watcher} from "../../../model/watcher";
import {useWatch} from "../../../util";

let count = 0
export const A = () => {
  useWatch([watcher])
  count++
  return <div>
    <div style={{fontSize: 13}}>只要 watcher 的任意值發生變化就觸發</div>
    {`　useWatch([watcher]) -- watcher.a 的值：${watcher.a}，渲染次數：${count}`}
  </div>
}