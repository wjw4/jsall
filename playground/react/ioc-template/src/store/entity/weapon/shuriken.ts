import {injectable} from "inversify";
import type {IThrowableWeapon} from "../../interface/weapon/throwable-weapon.ts";

@injectable()
export class Shuriken implements IThrowableWeapon {
    public throw() {
        return "hit!";
    }
}