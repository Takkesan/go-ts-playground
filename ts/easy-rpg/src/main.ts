import { select, Separator } from "@inquirer/prompts";
import { Agi, Buf, Gar, Dian } from "./magic/magic";

async function main(): Promise<void> {
  while (true) {
    const input: string = await userCommands();
    if (input === "magic") {
      const magicInput: string = await userMagicCommands();
      console.log(`You selected magic: ${magicInput}`);
      continue; // Continue to the next iteration for more commands
    }
    console.log(`You selected: ${input}`);
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
      name: magic.name,
      value: magic.value,
      description: magic.description,
    })),
  });

  return answer;
}

main();
