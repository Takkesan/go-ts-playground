export abstract class Actor {
  readonly name: string;
  hp: number;
  readonly maxHp: number;
  mp: number;
  readonly maxMp: number;
  readonly attack: number;
  readonly defense: number;

  constructor(
    name: string,
    hp: number,
    mp: number,
    attack: number,
    defense: number
  ) {
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.mp = mp;
    this.maxMp = mp;
    this.attack = attack;
    this.defense = defense;
  }

  isAlive(): boolean {
    return this.hp > 0;
  }
}
