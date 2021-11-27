import { memo, useCallback, useEffect, useState, VFC } from "react";
import axios from "axios";
import { PostCard } from "../PostCard";
import { ImageList } from "@mui/material";
import Modal from "../Modal";
import Search from "../Search";

export type Post = {
  id: number;
  photo: {
    url: string;
  };
  place: string;
  genre: string;
  prefecture: string;
};

export const AllPosts: VFC = memo(() => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<Post | undefined>();
  const [image, setImage] = useState();

  const getAllPosts = useCallback(() => {
    axios
      .get("http://localhost:3001/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    getAllPosts();

    //投稿が空ならテスト用データを入れる
    if (!posts) {
      setPosts([
        {
          id: 0,
          photo: { url: "sample.png" },
          place: "テスト1",
          genre: "ジャンル1",
          prefecture: "愛知県",
        },
        {
          id: 1,
          photo: { url: "sample.png" },
          place: "テスト2",
          genre: "ジャンル2",
          prefecture: "三重県",
        },
      ]);
    }
  }, []);

  return (
    <>
      <Search />
      {posts && (
        <ImageList sx={{ px: 4, py: 2 }} cols={3}>
          {posts.map((post, index) => (
            <PostCard
              id={post.id}
              imageUrl={post.photo.url}
              getAllPosts={getAllPosts}
              postPrefecture={post.prefecture}
              postPlace={post.place}
              postGenre={post.genre}
              key={index}
              setShowModal={setShowModal}
              setModalInfo={setModalInfo}
            />
          ))}
        </ImageList>
      )}

      <Modal show={showModal} setShowModal={setShowModal} info={modalInfo} />
    </>
  );
});
