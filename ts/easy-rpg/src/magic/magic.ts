import { Actor } from "../actor/Actor";
import { Player } from "../actor/Player";

/**
 * 魔法の基底クラス
 */
export abstract class Magic {
  readonly name: string;
  readonly value: string;
  readonly description: string;
  readonly mpCost: number;
  readonly power: number;

  constructor(
    name: string,
    value: string,
    description: string,
    mpCost: number,
    power: number
  ) {
    this.name = name;
    this.value = value;
    this.description = description;
    this.mpCost = mpCost;
    this.power = power;
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
  abstract cast(player: Player, target: Actor): void;
}

/**
 * アギ：火炎属性攻撃
 */
export class Agi extends Magic {
  constructor() {
    super("アギ", "agi", "敵1体に火炎属性で小ダメージ。", 3, 5);
  }

  cast(player: Player, target: Actor): void {
    if (!this.isAvailable(player)) {
      console.log("MPが足りない!不完全燃焼だ!");
      return;
    }
    player.mp -= this.mpCost;
    const damage = Math.max(0, player.attack - target.defense + this.power);
    target.hp -= damage;
    console.log(
      `${player.name}は${target.name}に${damage}の火炎ダメージを与えた!`
    );
  }
}

/**
 * ブフ：氷結属性攻撃
 */
export class Buf extends Magic {
  constructor() {
    super("ブフ", "buf", "敵1体に氷結属性で小ダメージ。", 3, 4);
  }

  cast(player: Player, target: Actor): void {
    if (!this.isAvailable(player)) {
      console.log("MPが足りない!粉雪が舞うだけだ!");
      return;
    }
    player.mp -= this.mpCost;
    const damage = Math.max(0, player.attack - target.defense + this.power);
    target.hp -= damage;
    console.log(
      `${player.name}は${target.name}に${damage}の氷結ダメージを与えた!`
    );
  }
}

/**
 * ガル：疾風属性攻撃
 */
export class Gar extends Magic {
  constructor() {
    super("ガル", "gar", "敵1体に疾風属性で小ダメージ。", 3, 4);
  }

  cast(player: Player, target: Actor): void {
    if (!this.isAvailable(player)) {
      console.log("MPが足りない!そよかぜ程度しか吹かない!");
      return;
    }
    player.mp -= this.mpCost;
    const damage = Math.max(0, player.attack - target.defense + this.power);
    target.hp -= damage;
    console.log(
      `${player.name}は${target.name}に${damage}の疾風ダメージを与えた!`
    );
  }
}

/**
 * ディア：回復魔法
 */
export class Dian extends Magic {
  constructor() {
    super("ディア", "dian", "自分のHPを小回復する。", 4, 10);
  }

  cast(player: Player, _target: Actor): void {
    if (!this.isAvailable(player)) {
      console.log("MPが足りない!ちょっとジーンとするだけだ!");
      return;
    }
    player.mp -= this.mpCost;
    player.hp = Math.min(player.maxHp, player.hp + this.power);
    console.log(`${player.name}はHPを${this.power}回復した!`);
  }
}
