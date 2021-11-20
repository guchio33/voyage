import { ChangeEvent, memo, useState, VFC, } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const NewPost: VFC = memo(() => {

  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [image, setImage] = useState<File | null>(null)

  const history = useNavigate()

  const handlePostTitle = (e: ChangeEvent<HTMLInputElement>) => setNewPostTitle(e.target.value)
  const handlePostContent = (e: ChangeEvent<HTMLInputElement>) => setNewPostContent(e.target.value)
  const selectImage = (e: any) => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
  }

  const createFormData = () => {
    const formData = new FormData()
    if (!image) return
    formData.append('post[photo]', image)
    return formData
  }

  const sendFormData = () => {
    const url = 'http://localhost:3001/posts'
    const data = createFormData()
    axios.post(url, data)
    .then(() => history('/'))
    .catch(e => {
      console.error(e)
    })
  }

  return (
    <>
      <div>NEW POST</div>
      <div>
        <div>
          <div>
            <div>Title</div>
          </div>
          <div>
            <div>Content</div>
          </div>
          <div>
            <div>File</div>
            <input type="file" onChange={(e) => selectImage(e)} />
            <button onClick={sendFormData}  color="white" >Create</button>
          </div>
        </div>
      </div>div
    </>
  )
})