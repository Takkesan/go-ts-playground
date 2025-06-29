// src/magic/magic.ts
export abstract class Magic {
  name: string;
  value: string;
  description: string;
  mpCost: number;

  constructor(
    name: string,
    value: string,
    description: string,
    mpCost: number
  ) {
    this.name = name;
    this.value = value;
    this.description = description;
    this.mpCost = mpCost;
  }
}

export class Agi extends Magic {
  constructor() {
    super("アギ", "agi", "敵1体に火炎属性で小ダメージ。", 3);
  }
}

export class Buf extends Magic {
  constructor() {
    super("ブフ", "buf", "敵1体に氷結属性で小ダメージ。", 3);
  }
}

export class Gar extends Magic {
  constructor() {
    super("ガル", "gar", "敵1体に疾風属性で小ダメージ。", 3);
  }
}

export class Dian extends Magic {
  constructor() {
    super("ディア", "dian", "自分のHPを小回復する。", 4);
  }
}
