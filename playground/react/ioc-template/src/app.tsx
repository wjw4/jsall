import {container} from "./store/inversify.config.ts";
import {IWarrior} from "./store/interface/character/warrior.ts";
import {TYPES} from "./store/type.ts";
import {UserList} from "./user-list.tsx";

const ninja = container.get<IWarrior>(TYPES.Warrior)
console.log(ninja.fight(), ninja.sneak())

function App () {
  return <div>
    <div className={'text-3xl font-bold underline'}>App</div>
    <UserList />
  </div>
}

export default App