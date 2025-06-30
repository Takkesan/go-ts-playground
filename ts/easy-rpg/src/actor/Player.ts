import { Actor } from "../actor/Actor";

export class Player extends Actor {
  constructor(name: string) {
    super(name, 30, 10, 5, 2);
  }
}
