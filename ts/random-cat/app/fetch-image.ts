"use server";

import { CAT_API_KEY } from "./env"; // 追加

type Image = {
    url: string;
};

export async function fetchImage() : Promise<Image> {
    const res = await fetch("https://api.thecatapi.com/v1/images/search", {
        headers: {
            "x-api-key": CAT_API_KEY, // 環境変数からデモ用のAPIキーを取得
        },
    });
    const images = await res.json();
    console.log("fetchImage", images);
    return images[0]; 
}