import { Actor } from "../actor/Actor";

export class Slime extends Actor {
  constructor() {
    super("スライム", 10, 2, 3, 1);
  }
}

export class Goblin extends Actor {
  constructor() {
    super("ゴブリン", 18, 4, 5, 2);
  }
}
