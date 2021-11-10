import React, { useCallback, useState } from 'react'

const PhotoForm: React.FC = () => {
    const [photo, setPhoto] = useState<File>();
    const [preview, setPreview] = useState('');
    const [place, setPlace] = useState('');
    const [genre, setGenre] = useState('');
    const [tags, setTags] = useState(['']);

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
        let tags2 = [...tags]
        tags2.push('')
        setTags(tags2)
    }
    const deleteTag = () => {
        let tags2 = [...tags]
        tags2.pop()
        setTags(tags2)
    }

    /*
        const createFormData = () => {          //add
            const formData = new FormData()
            if (!label) return                    //labelがundefinedの場合早期リターン
            formData.append('book[title]', title) // ポイント1！
            formData.append('book[label]', label) // ポイント1！
            return formData
        }
    */

    const sendFormData = () => {
        //送信の仕方がわからないので、とりあえずコンソールに出力してます
        console.log(place, genre, tags, photo);
    }



    return (
        <div>
            <h1>写真を投稿</h1>

            <p>場所：<input type="text" value={place} onChange={(e) => setPlace(e.target.value)} /></p>

            <p>ジャンル：<input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} /></p>


            <p>タグ：</p>
            {tags.map((tag, index) =>
                <p key={index}><input type="text" value={tag} onChange={(e) => {
                    let tags2 = [...tags]
                    tags2[index] = e.target.value;
                    setTags(tags2)
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