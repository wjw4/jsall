import {container} from "./store/inversify.config.ts";
import {IWarrior} from "./store/interface/character/warrior.ts";
import {TYPES} from "./store/type.ts";

const ninja = container.get<IWarrior>(TYPES.Warrior)
console.log(ninja.fight(), ninja.sneak())

function App () {
  return <div className={'text-3xl font-bold underline'}>App</div>
}

export default App