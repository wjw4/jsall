import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Container, injectable} from "inversify";

@injectable()
class UserListLogic {
  username: string = '張三'
  searchText: string = ''
  userList: string[] = []

  onChangeSearchText(searchText: string) {
    this.searchText = searchText
  }

  getUsers() {
    this.userList = [
      'frank',
      'jeff',
      'jennifer',
      'henry',
      'edward',
    ]
  }
}

const container = new Container()
container.bind(UserListLogic).toSelf()

function Search() {
  const userListLogic = container.get(UserListLogic)
  const searchText = userListLogic.searchText

  return <div className={'flex items-center'}>
    <input placeholder={'請輸入用戶名'} value={searchText}
           onChange={(e) => userListLogic.onChangeSearchText(e.target.value)}/>
  </div>
}

function List() {
  const userListLogic = container.get(UserListLogic)
  const userList = userListLogic.userList
  const searchText = userListLogic.searchText

  useEffect(() => {
    userListLogic.getUsers()
  }, [])

  return <div>
    {userList.filter(e => e.includes(searchText)).map(e => <div key={e}>{e}</div>)}
  </div>
}

export function UserList() {
  const userListLogic = container.get(UserListLogic)
  const username = userListLogic.username

  return <div>
    <Search/>
    <div>以下為 "{username}" 的推薦好友列表</div>
    <List/>
  </div>
}