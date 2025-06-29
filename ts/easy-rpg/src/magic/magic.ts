import { Actor } from "../actor/Actor";

export type MagicTarget = "enemy" | "self";

/**
 * 魔法の基底クラス
 */
export abstract class Magic {
  readonly name: string;
  readonly value: string;
  readonly description: string;
  readonly mpCost: number;
  readonly power: number;
  readonly target: MagicTarget;

  constructor(
    name: string,
    value: string,
    description: string,
    mpCost: number,
    power: number,
    target: MagicTarget
  ) {
    this.name = name;
    this.value = value;
    this.description = description;
    this.mpCost = mpCost;
    this.power = power;
    this.target = target;
  }

  /**
   * 魔法が使用可能か判定
   */
  isAvailable(actor: Actor): boolean {
    return actor.mp >= this.mpCost;
  }

  /**
   * 魔法の効果を発動
   */
  abstract cast(user: Actor, target: Actor): void;

  /**
   * 攻撃魔法の共通処理
   */
  protected static dealMagicDamage(
    user: Actor,
    target: Actor,
    mpCost: number,
    power: number
  ): void {
    if (user.mp < mpCost) {
      console.log("MPが足りない!");
      return;
    }
    user.mp -= mpCost;
    const damage = Math.max(0, user.attack - target.defense + power);
    target.hp = Math.max(0, target.hp - damage);
    console.log(`${user.name}は${target.name}に${damage}ダメージを与えた!`);
  }
}

/**
 * アギ：火炎属性攻撃
 */
export class Agi extends Magic {
  constructor() {
    super("アギ", "agi", "敵1体に火炎属性で小ダメージ。", 3, 5, "enemy");
  }
  cast(user: Actor, target: Actor): void {
    Magic.dealMagicDamage(user, target, this.mpCost, this.power);
  }
}

/**
 * ブフ：氷結属性攻撃
 */
export class Buf extends Magic {
  constructor() {
    super("ブフ", "buf", "敵1体に氷結属性で小ダメージ。", 3, 4, "enemy");
  }
  cast(user: Actor, target: Actor): void {
    Magic.dealMagicDamage(user, target, this.mpCost, this.power);
  }
}

/**
 * ガル：疾風属性攻撃
 */
export class Gar extends Magic {
  constructor() {
    super("ガル", "gar", "敵1体に疾風属性で小ダメージ。", 3, 4, "enemy");
  }
  cast(user: Actor, target: Actor): void {
    Magic.dealMagicDamage(user, target, this.mpCost, this.power);
  }
}

/**
 * ディア：回復魔法
 */
export class Dian extends Magic {
  constructor() {
    super("ディア", "dian", "自分のHPを小回復", 4, 10, "self");
  }
  cast(user: Actor, _target: Actor): void {
    if (!this.isAvailable(user)) {
      console.log("MPが足りない!ちょっとジーンとするだけだ!");
      return;
    }
    user.mp -= this.mpCost;
    user.hp = Math.min(user.maxHp, user.hp + this.power);
    console.log(`${user.name}はHPを${this.power}回復した!`);
  }
}
