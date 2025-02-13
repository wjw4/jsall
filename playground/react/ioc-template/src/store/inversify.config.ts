import {Container} from "inversify";
import {IWarrior} from "./interface/character/warrior.ts";
import {IWeapon} from "./interface/weapon/weapon.ts";
import {IThrowableWeapon} from "./interface/weapon/throwable-weapon.ts";
import {TYPES} from "./type.ts";
import {Ninja} from "./entity/character/ninja.ts";
import {Katana} from "./entity/weapon/katana.ts";
import {Shuriken} from "./entity/weapon/shuriken.ts";

export const container = new Container()

container.bind<IWarrior>(TYPES.Warrior).to(Ninja)
container.bind<IWeapon>(TYPES.Weapon).to(Katana)
container.bind<IThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken)

