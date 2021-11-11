import React, { useCallback, useState } from 'react'
import axios from 'axios' 

const PhotoForm: React.FC = () => {
    const [photo, setPhoto] = useState<File>();
    const [preview, setPreview] = useState('');
    const [place, setPlace] = useState('');
    const [prefecture, setPrefecture] = useState('');
    const [genre, setGenre] = useState('');
    const [tagName, setTagName] = useState(['']);

    const selectPhoto = useCallback((e) => {
        const selectedPhoto = e.target.files[0]
        setPhoto(selectedPhoto)

        //プレビュー画像のURLを得る
        const render = new FileReader();
        render.onload = (e) => {
            if (e.target != null)
                setPreview(String(e.target.result));
        }
        render.readAsDataURL(e.target.files[0]);
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
        const formData = new FormData()
        if (!photo) return                    //photoがundefinedの場合早期リターン
            formData.append('post[photo]', photo)
            formData.append('post[place]', place)
            formData.append('post[prefecture]', prefecture)
            formData.append('post[genre]', genre)
        return formData
    }
    

    const sendFormData = async () => {
        const url = 'http://localhost:3001/posts'
        const data = await createFormData()   //formdataが作成されるのを待つ
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
        axios.post(url, data, config)
        .then(response => {
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
        //送信の仕方がわからないので、とりあえずコンソールに出力してます
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