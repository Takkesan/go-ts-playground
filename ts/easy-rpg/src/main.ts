import { select } from "@inquirer/prompts";
import { Agi, Buf, Gar, Dian, Magic } from "./magic/magic";
import { Goblin, Slime, Monster } from "./actor/Monster";
import { Player } from "./actor/Player";

function showBattleStart(monsters: Monster[]): void {
  console.log(`木の後ろに何か影が…`);
  console.log(`敵が出現した！: ${monsters.map((m) => m.name).join(", ")}`);
}

function showStatus(player: Player, monsters: Monster[]): void {
  console.log(
    `\n【${player.name}】HP:${player.hp}/${player.maxHp} MP:${player.mp}`
  );
  monsters.forEach((m) => {
    console.log(`【${m.name}】HP:${m.hp}/${m.maxHp} MP:${m.mp}`);
  });
}

function getMagicList(): Magic[] {
  return [new Agi(), new Buf(), new Gar(), new Dian()];
}

async function main(): Promise<void> {
  const player = new Player("あなた");
  const monsters: Monster[] = [new Goblin(), new Slime()];

  showBattleStart(monsters);

  while (true) {
    // 戦闘の状態を表示
    showStatus(player, monsters);
    if (shouldExit(player, monsters)) {
      if (!player.isAlive()) {
        console.log("あなたは倒れた…ゲームオーバー！");
      } else {
        console.log("敵を全て倒した！勝利だ！");
      }
      break;
    }

    // プレイヤーのターン
    const input = await userCommands();
    if (input === "magic") {
      const magicInput = await userMagicCommands();
      const magic = getMagicList().find((m) => m.value === magicInput);
      if (!magic) {
        console.log("魔法が見つかりません！");
        continue;
      }
      if (magic.target === "self") {
        // 回復魔法など自分対象
        if (magic.isAvailable(player)) {
          magic.cast(player, player);
        } else {
          console.log("魔法が使用できないか、MPが足りません！");
        }
      } else {
        // 敵対象
        const target = await chosenMonster(monsters.filter((m) => m.isAlive()));
        if (magic.isAvailable(player)) {
          magic.cast(player, target);
        } else {
          console.log("魔法が使用できないか、MPが足りません！");
        }
      }
    } else if (input === "sword") {
      const target = await chosenMonster(monsters.filter((m) => m.isAlive()));
      player.PhysicalAttack(target);
    }

    // モンスターのターン
    for (const monster of monsters) {
      if (monster.isAlive()) {
        monster.act(player);
      }
    }
  }
}

async function userCommands(): Promise<string> {
  return await select({
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
}

async function userMagicCommands(): Promise<string> {
  const magics = getMagicList();
  return await select({
    message: "魔法を唱えろ！",
    choices: magics.map((magic) => ({
      name: `${magic.name}: ${magic.mpCost} MP`,
      value: magic.value,
      description: magic.description,
    })),
  });
}

async function chosenMonster(monsters: Monster[]): Promise<Monster> {
  return await select({
    message: "攻撃する敵を選べ！",
    choices: monsters.map((monster) => ({
      name: monster.name,
      value: monster,
      description: `HP: ${monster.hp}/${monster.maxHp}`,
    })),
  });
}

function shouldExit(player: Player, monsters: Monster[]): boolean {
  return !player.isAlive() || monsters.every((monster) => !monster.isAlive());
}

main();
