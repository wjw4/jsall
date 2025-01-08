import React, {useEffect, useRef} from "react";
import {cacheBody} from "../model/cacheBody";
import {useChange} from "../util";

export const CacheBody = () => {
  const [name, setName] = useChange(cacheBody, 'name')
  const input = useRef<HTMLInputElement>(null)
  const onChange = () => {
    const current = input.current!;
    const value = current.value;
    setName(value)
  }
  useEffect(() => {
    const current = input.current!;
    current.focus()
    current.setSelectionRange(0, name.length)
  }, [])
  console.log(`Component: <CacheBody /> 刷新`)
  return <div>
    <h1>CacheBody</h1>
    <input ref={input} type="text" onKeyDown={ev => ev.key === 'Enter' && onChange()} defaultValue={name} placeholder={'更改 cacheBody.name 試試'}/>
    <button onClick={onChange}>改名 (Enter)</button>
    <hr/>
    <div>{name} (刷新頁面試試)</div>
  </div>
}
