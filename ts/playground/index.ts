console.log("Hello World.");

// Typescript は型を使える
function add(a: number, b: number): number {
  return a + b;
}

console.log("Sum of 2 and 3 is:", add(2, 3));
console.log("Sum of 5 and 7 is:", add(5, 7));

// 非同期処理
// Promise
// Promise.resolve(返り値) => 履行
// Promise.reject(エラー) => 却下

function request1(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Request 1 completed");
      resolve(1);
    }, 1000);
  });
}

// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request2(result1: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Request 2 completed with result:", result1);
      resolve(result1 + 1);
    }, 1000);
  });
}

// 受け取った値を別のAPIにリクエストを投げて値を取得する処理
function request3(result2: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Request 3 completed with result:", result2);
      resolve(result2 + 2);
    }, 1000);
  });
}

request1()
  .then((result1) => {
    return request2(result1);
  })
  .then((result2) => {
    return request3(result2);
  })
  .then((result3) => {
    console.log("Final result:", result3);
  });

//非同期処理の拒否
const promise1: Promise<number> = Promise.reject(
  new Error("Something went wrong!")
);
const promise2: Promise<string> = promise1.catch((e) => e.message);
promise1
  .then((result) => {
    console.log("This will not run:", result);
  })
  .catch((error) => {
    console.error("Caught an error:", error);
  });

// すべての非同期処理の結果を待ち受ける
function request1_1(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Request 1 completed");
      resolve(1);
    }, 4000);
  });
}

function request2_1(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 2000);
  });
}

function request3_1(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(3);
    }, 1000);
  });
}

Promise.all([request1_1(), request2_1(), request3_1()])
  .then((results) => {
    console.log("All requests completed with results:", results);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });

// async/await の立ち位置
// Promiseのコードをもっと簡単に書けるようにしよう
// asyncキーワードをつけると、たとえその関数内でPromiseが返されていなくても、戻り値の型をPromiseで包んで返す

async function requestAsync() {
  return 1;
}

async function requestRejectAsync() {
  throw new Error("error");
}

requestAsync()
  .then((result) => {
    console.log("Async request completed with result:", result);
  })
  .catch((error) => {
    console.error("Caught an error in async request:", error);
  });

requestRejectAsync()
  .then((result) => {
    console.log("This will not run:", result);
  })
  .catch((error) => {
    console.error("Caught an error in async reject:", error);
  });

async function main() {
  const result1 = await request1();
  console.log("Result from request1 in main:", result1);
}

main();

// オブジェクト指向
class Person {
  public name: string | undefined;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
class Greeter {
  greet(name: string): string {
    return `Hello, ${name}!`;
  }
}

const person: Person = {
  name: "Alice",
  age: 30,
};

console.log("Person:", person);

// TS では アクセス装飾詞を省略すると public になる
class Animal {
  public name: string;

  public constructor(name: string) {
    this.name = name;
  }

  protected move(distanceInMeters: number): void {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Gorilla extends Animal {
  move(distanceInMeters: number): void {
    super.move(distanceInMeters * 10);
  }

  public climb(distanceInMeters: number): void {
    console.log(`${this.name} is climbing.`);
    this.move(distanceInMeters);
  }
}

const human = new Animal("Human");
// moveはprotectedなので、外部からは呼び出せない

const gorilla = new Gorilla("Gorilla");
gorilla.move(5);
gorilla.climb(2);

class ClassA {}
class ClassB {}

const a = new ClassA();
console.log("Instance of ClassA:", a instanceof ClassA); // true
console.log("Instance of ClassA:", a instanceof ClassB); // false

class Parent {}
class Child extends Parent {}

const child = new Child();
console.log("Instance of Child:", child instanceof Child); // true
console.log("Instance of Parent:", child instanceof Parent); // true

// 抽象クラス
abstract class Food {
  constructor(protected name: string, protected calorie: number) {}
  showDebug(): void {
    console.log(`name = ${this.name} `);
    console.log(`calorie = ${this.calorie}kcal `);
  }
  abstract keepRefrigerated(): boolean;
}

class Apple extends Food {
  constructor() {
    super("Apple", 52);
  }
  keepRefrigerated(): boolean {
    return true;
  }
}

class Banana extends Food {
  constructor() {
    super("Banana", 89);
  }
  keepRefrigerated(): boolean {
    return false;
  }
}

const apple = new Apple();
apple.showDebug();
console.log("Keep refrigerated:", apple.keepRefrigerated());

const banana = new Banana();
banana.showDebug();
console.log("Keep refrigerated:", banana.keepRefrigerated());

// インターフェース
interface Human {
  think(): void;
}

interface Programmer {
  programmingLanguage: string;
  writeCode(): void;
}

class DatabaseDevelopper implements Human {
  think(): void {
    console.log("I am thinking about database design.");
  }
}

class WebDevelopper implements Human, Programmer {
  programmingLanguage = "TypeScript";
  think(): void {
    console.log("I am thinking about web design.");
  }
  writeCode(): void {
    console.log(`I am writing code in ${this.programmingLanguage}.`);
  }
}

interface Foo {
  a: number;
}
interface Foo {
  b: number;
}

// 上記のコードはこれと同じ
interface Foo {
  a: number;
  b: number;
}
