import { AxiosResponse } from "axios";
import { useState } from "react";
import client from "../lib/api/client"

export const Search: React.FC = () => {
    //保持する変数
    const [prefecture, setPrefecture] = useState('');
    const [genre, setGenre] = useState('');
    const [place, setPlace] = useState('');
    const [tag, setTag] = useState('');

    const [response, setResponse] = useState<AxiosResponse>();

    //GET通信処理
    const searchTag = () => {
        client.get('/searches', {
            params: {
                tag_keyword: tag
            }
        })
            .then((res) => {
                setResponse(res);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            {/*
            <p>都道府県検索:<input type="text" value={prefecture} onChange={(e) => setPrefecture(e.target.value)} /></p>
            <p>ジャンル検索:<input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} /></p>
            <p>場所検索:<input type="text" value={place} onChange={(e) => setPlace(e.target.value)} /></p>
            */}

            <p>タグ検索:<input type="text" value={tag} onChange={(e) => setTag(e.target.value)} /></p>
            <button onClick={searchTag}>タグ検索</button>
        </div>
    )
}