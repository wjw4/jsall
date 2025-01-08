import React from "react";
import { A } from "./component/A";
import { B } from "./component/B";
import {watcher} from "../../model/watcher";

export const Watcher = () => {
  return <div>
    <h1>Watcher</h1>
    <div>
      <button onClick={() => watcher.a++}>a++</button>{' | '}
      <button onClick={() => watcher.b++}>b++</button>
    </div>
    <p></p>
    <A />
    <hr/>
    <B />
  </div>
}