import React from "react";
import {watcher} from "../../../model/watcher";
import {useWatch} from "../../../util";

let count = 0
export const B = () => {
  useWatch([[watcher, 'b']])
  count++
  return <div>
    <div style={{fontSize: 13}}>只有 watcher 的 b 的值發生變化才觸發</div>
    {`　useWatch([[watcher, 'b']]) -- watcher.b 的值：${watcher.b}，渲染次數：${count}`}
  </div>
}