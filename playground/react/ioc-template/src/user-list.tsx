import {Dispatch, SetStateAction, useState} from "react";

const userData = [
  'frank',
  'jeff',
  'jennifer',
  'henry',
  'edward',
]

function Search ({searchText, setSearchText}: {searchText:string; setSearchText:Dispatch<SetStateAction<string>>}) {
  return <div className={'flex items-center'}>
    <input placeholder={'請輸入用戶名'} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
  </div>
}

function List ({searchText}:{searchText:string}) {
  return <div>
    {userData.filter(e => e.includes(searchText)).map(e => <div key={e}>{e}</div>)}
  </div>
}

export function UserList () {
  const [searchText, setSearchText] = useState('')

  return <div>
    <Search searchText={searchText} setSearchText={setSearchText} />
    <List searchText={searchText} />
  </div>
}