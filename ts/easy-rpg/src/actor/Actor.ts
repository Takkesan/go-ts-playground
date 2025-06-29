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

  PhysicalAttack(target: Actor): void {
    const damage = Math.max(0, this.attack - target.defense);
    target.hp -= damage;
    console.log(
      `${this.name}は${target.name}に${damage}の物理ダメージを与えた！`
    );
  }
}
