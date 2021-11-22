import { memo, VFC } from "react";
import axios from 'axios'

type Props = {
  postPrefecture: string
  postGenre: string
  postPlace: string
  id: number
  imageUrl: string
  getAllPosts: () => void
}

export const PostCard: VFC<Props> = memo((props) => {


  const { postPrefecture, postPlace ,postGenre , id, imageUrl, getAllPosts } = props
  const editPost = () => {
    alert("edit post")
  }

  const deletePost = (id: number) => {
    const sure = window.confirm("are you sure?")
    if (sure) {
      axios.delete(`http://localhost:3001/posts/${id}`)
      .then(() => {
        getAllPosts()
      })
      .catch(e => console.error(e))
    }
  }

  return (
    <div>
      <img src="./logo192.png" alt="aaa"/>
      <p>{postPrefecture}</p>
      <p>{postPlace}</p>
      <p>{postGenre}</p>
          
          <button onClick={editPost} color="white">Edit</button>
          <button onClick={() => deletePost(id)} color="white">Delete</button>
    </div>

  )

})