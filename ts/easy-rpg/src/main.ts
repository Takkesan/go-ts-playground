import { select, Separator } from "@inquirer/prompts";
import { Agi, Buf, Gar, Dian } from "./magic/magic";
import { Actor } from "./actor/Actor";
import { Goblin, Slime, Monster } from "./actor/Monster";
import { Player } from "./actor/Player";

function showBattleStart(monsters: Monster[]): void {
  console.log(`木の後ろに何か影が…`);
  console.log(`敵が出現した！: ${monsters.map((m) => m.name).join(", ")}`);
}

async function main(): Promise<void> {
  const player: Player = new Player("あなた");
  const monsters: Monster[] = [new Goblin(), new Slime()];

  showBattleStart(monsters);

  while (true) {
    const input: string = await userCommands();
    if (input === "magic") {
      const magicInput: string = await userMagicCommands();
      const target = await chosenMonster(monsters.filter((m) => m.isAlive()));
      console.log(`You selected magic: ${magicInput} → ${target.name}`);
      const magic = [new Agi(), new Buf(), new Gar(), new Dian()].find(
        (m) => m.value === magicInput
      );
      if (magic && magic.isAvailable(player)) {
        magic.cast(player, target);
      } else {
        console.log("魔法が使用できないか、MPが足りません！");
      }
    } else if (input === "sword") {
      const target = await chosenMonster(monsters.filter((m) => m.isAlive()));
      console.log(`You selected: sword → ${target.name}`);
      const damage = Math.max(0, player.attack - target.defense);
      target.hp -= damage;
      console.log(
        `${player.name}は${target.name}に${damage}の物理ダメージを与えた！`
      );
    }

    // プレイヤーの行動後、敵が生きていればモンスターのターン
    for (const monster of monsters) {
      if (monster.isAlive()) {
        monster.act(player);
      }
    }

    if (shouldExit(player, monsters)) {
      if (!player.isAlive()) {
        console.log("あなたは倒れた…ゲームオーバー！");
      } else {
        console.log("敵を全て倒した！勝利だ！");
      }
      break;
    }
  }
}

async function userCommands(): Promise<string> {
  const answer = await select({
    message: "行動を選択だ！",
    choices: [
      {
        name: "SWORD (近接武器で攻撃)",
        value: "sword",
        description: "敵1体に物理攻撃を行う。",
      },
      {
        name: "MAGIC (スキルを使う)",
        value: "magic",
        description: "魔法スキルで攻撃または回復。",
      },
    ],
  });

  return answer;
}

async function userMagicCommands(): Promise<string> {
  // Magicサブクラスのインスタンスを配列で用意
  const magics = [new Agi(), new Buf(), new Gar(), new Dian()];
  const answer = await select({
    message: "魔法を唱えろ！",
    choices: magics.map((magic) => ({
      name: `${magic.name}: ${magic.mpCost} MP`,
      value: magic.value,
      description: magic.description,
    })),
  });

  return answer;
}

async function chosenMonster(monsters: Actor[]): Promise<Actor> {
  const answer = await select({
    message: "攻撃する敵を選べ！",
    choices: monsters.map((monster) => ({
      name: monster.name,
      value: monster,
      description: `HP: ${monster.hp}/${monster.maxHp}`,
    })),
  });

  return answer;
}

function shouldExit(player: Player, monsters: Actor | Actor[]): boolean {
  const isPlayerDead = !player.isAlive();
  const areMonstersDead = Array.isArray(monsters)
    ? monsters.every((monster) => !monster.isAlive())
    : !monsters.isAlive();
  return isPlayerDead || areMonstersDead;
}

main();
