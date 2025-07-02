# 説明

Typescript のプロジェクトは ./ts 配下にまとめられています。
jest-tutorial,like-button,random-cat はサバイバル TypeScript のチュートリアルのプロジェクトです。写経してみました。
playground では重要な文法を実際に書いて確認しました。Hello World.を表示するコードもここに含まれています。
easy-rpg では学んだことを生かすために一から RPG の戦闘システムを作成しました。CUI で ts ファイルを実行すると遊ぶことができます。

Go のプロジェクトは./go 配下にまとめられています。

```
npx ts-node main.ts
```

# Typescript のプロジェクトの始め方

1. フォルダを作る
2. npm install --save-dev ts-node typescript
3. npm init -y
4. npx tsc --init

# React のプロジェクトの起動の仕方

プロジェクトのディレクトリで以下のコマンドを実行する。

```bash
npm install
npm run dev -- --host
```

devcontainer 内に React のプロジェクトがあるので host のオプションが必要です。

# easy-rpg

## 起動の仕方

```
npx ts-node src/main.ts
```

# fastify-tutorial

## 注意点

fastify-tutorial では mongoDB を使用しています。
以下のコマンドで mongoDB を Docker でホストする必要があります。

```
docker run --name my-mongo -d -p 27017:27017 mongo:latest
```

## テスト

http://localhost:3000/animals に GET を行うと動物の一覧が返ってくる。

```
[
    {
        "_id": "686136b16f6f5593c0fddf0e",
        "animal": "cat"
    },
    {
        "_id": "686137246f6f5593c0fddf0f",
        "animal": "bird"
    }
]
```

http://localhost:3000/animals/someanimal ("someanimal"は任意の文字列)に GET を行うと全部一致したものを返す。
例えば http://localhost:3000/animals/cat では以下のレスポンスが返ってくる。

```
{
    "_id": "686136816f6f5593c0fddf0b",
    "animal": "cat"
}
```

登録されていないものを入れると 500 エラーが返ってくる。
例えば dog が登録されていない状態で http://localhost:3000/animals/dog で GET を行うと以下のレスポンスが返ってくる。

```
{
    "statusCode": 500,
    "error": "Internal Server Error",
    "message": "Invalid value"
}
```

http://localhost:3000/animals に対して POST することで動物を DB に登録する。
以下をボディに含ませる。

```
{
  "animal": "cat"
}
```

# welcome-playground

https://go.dev/tour/welcome/1 の内容を写経しました。

# database-playground

## 注意点

このプロジェクトでは MySQL を使用します。以下のコマンドで起動してください。

```bash
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -d mysql:latest
docker exec -it mysql bash
```

このチュートリアルのようにデータベースを設定します。
https://go.dev/doc/tutorial/database-access

# vuln-playground

これは Go の脆弱性を検証する govulncheck というツールのチュートリアルです。
以下のコマンドを使用することで脆弱性の一覧が出てきます。

```bash
go install golang.org/x/vuln/cmd/govulncheck@latest
govulncheck ./...
```
