import {injectable} from "inversify";
import type {IWeapon} from "../../interface/weapon/weapon.ts";

@injectable()
export class Katana implements IWeapon {
  public hit() {
    return "cut!";
  }
}