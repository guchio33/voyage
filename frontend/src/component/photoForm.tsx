import React, { useCallback, useState } from 'react'
import { createPost } from "../lib/api/posts"

export interface Post {
    id: string
    content: string
    image: {
        url: string
    }
}

const PhotoForm: React.FC = () => {
    const [photo, setPhoto] = useState<File>();
    const [preview, setPreview] = useState('');
    const [place, setPlace] = useState('');
    const [prefecture, setPrefecture] = useState('');
    const [genre, setGenre] = useState('');
    const [tagName, setTagName] = useState(['']);

    const selectPhoto = useCallback((e) => {
        //投稿する画像をセット
        const selectedPhoto = e.target.files[0]
        setPhoto(selectedPhoto)

        //プレビュー画像のURLを得る
        const file = e.target.files[0];
        setPreview(window.URL.createObjectURL(file));

    }, [])

    const addTag = () => {
        let tags2 = [...tagName]
        tags2.push('')
        setTagName(tags2)
    }
    const deleteTag = () => {
        let tags2 = [...tagName]
        tags2.pop()
        setTagName(tags2)
    }


    const createFormData = () => {
        if (!photo) return                    //photoがundefinedの場合早期リターン

        const tagStr = tagName.join(',');//タグ配列を','区切りの文字列化
        const formData = new FormData()
        formData.append('post[photo]', photo)
        formData.append('post[place]', place)
        formData.append('post[prefecture]', prefecture)
        formData.append('post[genre]', genre)
        return formData
    }


    const sendFormData = async () => {
        const data = await createFormData()   //formdataが作成されるのを待つ
        if (!data) return//作成出来なかったら止める

        await createPost(data)
            .then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })

        //コンソールで動作確認用
        console.log(place, prefecture, genre, tagName, photo);
    }



    return (
        <div>
            <h1>写真を投稿</h1>

            <p>場所：<input type="text" value={place} onChange={(e) => setPlace(e.target.value)} /></p>

            <p>都道府県：<input type="text" value={prefecture} onChange={(e) => setPrefecture(e.target.value)} /></p>

            <p>ジャンル：<input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} /></p>


            <p>タグ：</p>
            {tagName.map((tag, index) =>
                <p key={index}><input type="text" value={tag} onChange={(e) => {
                    let tags2 = [...tagName]
                    tags2[index] = e.target.value;
                    setTagName(tags2)
                }} />
                </p>
            )}

            <p><button onClick={addTag}>タグ追加</button><button onClick={deleteTag}>タグ削除</button></p>

            <p>写真：</p>
            <input type="file" onChange={(e) => selectPhoto(e)} />
            <br />
            <img src={preview} alt='プレビュー画像' />
            <br />
            <button onClick={sendFormData}>送信</button>
        </div>
    )
}

export default PhotoForm