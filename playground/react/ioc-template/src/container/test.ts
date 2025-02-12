import { Container, inject, injectable } from 'inversify';

// @injectable()
// class Katana {
//   public readonly damage: number = 10;
// }
//
// @injectable()
// class Ninja {
//   constructor(
//     @inject(Katana)
//     public readonly katana: Katana,
//   ) {}
// }
//
// const container: Container = new Container();
//
// container.bind(Ninja).toSelf();
// container.bind(Katana).toSelf();
//
// const ninja: Ninja = container.get(Ninja);
//
// console.log(ninja.katana.damage);

const TYPES = {
  Television: Symbol.for("Television"),
  ToolBox: Symbol.for("ToolBox"),
}

interface ITelevision {
  turnOn(): void
  turnOff(): void
}

interface IToolBox {
  clean(): void
  findTool(name: string): void
}

@injectable()
class Home {
  constructor(
    @inject(TYPES.Television)
    private readonly _television: ITelevision,

    @inject(TYPES.ToolBox)
    private readonly _toolBox: IToolBox,
  ) {}

  turnOn() {
    this._television.turnOn()
  }

  clean() {
    this._toolBox.clean()
  }
}

class Television implements ITelevision {
    turnOn() {
        console.log('開啟了電視')
    }
    turnOff() {
      console.log('關閉了電視')
    }
}

class ToolBox implements IToolBox {
  clean() {
    console.log('打掃了工具箱')
  }
  findTool(name: string) {
    console.log(`找到了工具: ${name}`)
  }
}

const container: Container = new Container();

container.bind(Home).toSelf()
container.bind<ITelevision>(TYPES.Television).to(Television);
container.bind<IToolBox>(TYPES.ToolBox).to(ToolBox);

container.get(Home).turnOn()
container.get<IToolBox>(TYPES.ToolBox).findTool('螺絲起子')