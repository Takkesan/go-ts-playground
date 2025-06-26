"use client"; //useStateはクライアントサイドの機能なので、コンポーネントの先頭に"use client"というディレクティブを追加する

import { useState } from "react";
import { fetchImage } from "./fetch-image";
import styles from "./page.module.css";

type CatImageProps = {
    url: string;
};

export function CatImage({ url }: CatImageProps) {
    const [imageUrl, setImageUrl] = useState<string>(url);
    
    const refleshImage = async () => {
        setImageUrl("");
        const image = await fetchImage();
        setImageUrl(image.url);
    }

    return (
        <div className={styles.catImage}>
            <button onClick={refleshImage} className={styles.button}>ほかのぬっこを見る</button>
            {imageUrl && <img src={imageUrl} className={styles.img}/>}
        </div>
    );
}