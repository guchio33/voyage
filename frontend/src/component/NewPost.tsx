import { ChangeEvent, memo, useState, VFC, } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const NewPost: VFC = memo(() => {

  const [prefecture, setPrefecture] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState<File | null>(null)
  const [place, setPlace] = useState('');
  const [tags, setTags] = useState(['']);

  const history = useNavigate()


  const selectImage = (e: any) => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
  }

  const createFormData = () => {
    const formData = new FormData()
    if (!image) return
    formData.append('post[photo]', image)
    formData.append('post[place]', place)
    formData.append('post[prefecture]', prefecture)
    formData.append('post[genre]', genre)
    formData.append('post[tags]', tags.join(','))

    return formData
  }

  const sendFormData = () => {
    const url = 'http://localhost:3001/posts'
    const data = createFormData()
    axios.post(url, data)
      .then(() => history('/allpost'))
      .catch(e => {
        console.error(e)
      })
  }

  //タグの数を変える関数
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

  return (
    <>
      <div>NEW POST</div>
      <p>場所：<input type="text" value={place} onChange={(e) => setPlace(e.target.value)} /></p>

      <p>都道府県：<input type="text" value={prefecture} onChange={(e) => setPrefecture(e.target.value)} /></p>

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

      <div>File</div>
      <input type="file" onChange={(e) => selectImage(e)} />
      <button onClick={sendFormData} color="white" >Create</button>
    </>
  )
})