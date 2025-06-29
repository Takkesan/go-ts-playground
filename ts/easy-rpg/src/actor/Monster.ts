import { Actor } from "../actor/Actor";
import { Magic, Buf, Gar } from "../magic/magic";

export type MonsterAction = "attack" | "magic";

export class Monster extends Actor {
  magics: Magic[];

  constructor(
    name: string,
    hp: number,
    mp: number,
    attack: number,
    defense: number,
    magics: Magic[] = []
  ) {
    super(name, hp, mp, attack, defense);
    this.magics = magics;
  }

  decideAction(): MonsterAction {
    // 使える魔法がありMPが足りればmagic、なければattack
    const canUseMagic = this.magics.some((m) => m.isAvailable(this));
    if (canUseMagic && Math.random() < 0.5) {
      return "magic";
    }
    return "attack";
  }

  /**
   * 魔法攻撃を実行（使える魔法からランダム選択）
   */
  doMagic(target: Actor): void {
    const availableMagics = this.magics.filter((m) => m.isAvailable(this));
    if (availableMagics.length === 0) {
      console.log(`${this.name}は魔法を使おうとしたがMPが足りない！`);
      return;
    }
    const magic =
      availableMagics[Math.floor(Math.random() * availableMagics.length)];
    magic.cast(this, target);
  }

  /**
   * プレイヤーを対象に行動を決定し実行する
   */
  act(player: Actor): void {
    const action = this.decideAction();
    if (action === "magic") {
      this.doMagic(player);
    } else {
      this.PhysicalAttack(player);
    }
  }
}

export class Slime extends Monster {
  constructor() {
    super("スライム", 10, 2, 3, 1, [new Buf()]);
  }
}

export class Goblin extends Monster {
  constructor() {
    super("ゴブリン", 18, 4, 5, 2, [new Gar()]);
  }
}
