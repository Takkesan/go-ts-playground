import { connection } from "next/server";
import { fetchImage } from "./fetch-image";
import {CatImage  } from "./cat-image";

export default async function Home() {
  
  await connection;

  const image = await fetchImage();

  console.log("Home: 画像を取得しました", image);
  return <div> <CatImage url={image.url} /></div>;
}