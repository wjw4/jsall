import {inject, injectable} from "inversify";
import type {IWarrior} from "../../interface/character/warrior.ts";
import type {IWeapon} from "../../interface/weapon/weapon.ts";
import type {IThrowableWeapon} from "../../interface/weapon/throwable-weapon.ts";
import {TYPES} from "../../type";

@injectable()
export class Ninja implements IWarrior {
  constructor(
    @inject(TYPES.Weapon)
    private readonly katana: IWeapon,
    @inject(TYPES.ThrowableWeapon)
    private readonly shuriken: IThrowableWeapon,
  ) {
  }

  fight() {
    return this.katana.hit()
  }

  sneak() {
    return this.shuriken.throw()
  }
}