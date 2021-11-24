import React, { memo, VFC } from "react";
import axios from 'axios'
import { Box, ImageListItem, ImageListItemBar } from '@mui/material'
import testImage from './logo192.png'
import { Post } from './All'

type Props = {
  postPrefecture: string
  postGenre: string
  postPlace: string
  postTags: string
  id: number
  imageUrl: string
  getAllPosts: () => void

  setShowModal: (b: boolean) => void
  setModalInfo: (p: Post) => void
}

export const PostCard: VFC<Props> = memo((props) => {


  const { postPrefecture, postPlace, postGenre, postTags, id, imageUrl, getAllPosts } = props
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
    <div onClick={() => props.setModalInfo({ id: id, photo: { url: imageUrl }, place: postPlace, genre: postGenre, prefecture: postPrefecture, tags: postTags})} >
      <div onClick={() => props.setShowModal(true)}>
        <Box justifyContent="center" alignItems="center" sx={{ p: 1 }}>
          <Box sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 4 }}>
            <ImageListItem key={props.id}>
              <img
                src={testImage/*`${props.imageUrl}?w=248&fit=crop&auto=format`*/}
                srcSet={testImage/*`${props.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`*/}
                alt={props.postGenre}
                loading="lazy"
              />
              <ImageListItemBar
                title={props.postPlace}
                subtitle={<span>from: {props.postPrefecture}</span>}
                position="below"
              />
            </ImageListItem>
          </Box>
        </Box>
        {/*
      <div>
        <img src="./logo192.png" alt="aaa" />
        <p>{postPrefecture}</p>
        <p>{postPlace}</p>
        <p>{postGenre}</p>

        <button onClick={editPost} color="white">Edit</button>
        <button onClick={() => deletePost(id)} color="white">Delete</button>
      </div>
      */}
      </div >
    </div>

  )

})