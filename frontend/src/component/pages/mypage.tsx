import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import logo from "../logo.png";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Card,
} from "@mui/material";

import { fetchUsers } from "../../lib/api/user";
//インターフェース
import { User } from "../../interface/index";
import testImage3 from "../images/place3.jpg";
import testImage2 from "../../images/place2.jpg";
import testImage1 from "../images/place1.jpg";
import human from "../../images/human.jpg";

const MyPage: React.FC = () => {
  //userリストの作成 インターフェースUser型
  const [postList, setPostList] = useState<User[] | undefined>([]);
  const [user, setUser] = useState({
    user_id: 0,
    user_name: "名無し",
    photo: "../test.jpg",
  });
  const [imageListItem, setImageListItem] = useState("");

  /*
    //APiサーバから送られてデータをもらう&例外処理
    const fetchUserReq = async () => {
        try {
            const { data } = await fetchUsers(); //api/userからデータをもらう
            return data;
        } catch (e) {
            console.log(e);
        }
    };
    */

  useEffect(() => {
    //const data = fetchUserReq();

    //data.then((users) => {
    //    setUserList(users);
    //});

    //仮の投稿データをセット
    setPostList([
      {
        id: 0,
        photo: { url: "../logo.png" },
        place: "名城大学",
        genre: "大学",
        prefecture: "愛知",
      },
      {
        id: 1,
        photo: { url: "" },
        place: "名駅",
        genre: "",
        prefecture: "愛知",
      },
      {
        id: 2,
        photo: { url: "" },
        place: "test",
        genre: "test",
        prefecture: "静岡",
      },
      {
        id: 3,
        photo: { url: "" },
        place: "test",
        genre: "城",
        prefecture: "長野",
      },
      {
        id: 4,
        photo: { url: "" },
        place: "test",
        genre: "test",
        prefecture: "test",
      },
      {
        id: 5,
        photo: { url: "" },
        place: "test",
        genre: "test",
        prefecture: "test",
      },
      {
        id: 6,
        photo: { url: "" },
        place: "test",
        genre: "test",
        prefecture: "test",
      },
      {
        id: 7,
        photo: { url: "" },
        place: "test",
        genre: "test",
        prefecture: "test",
      },
      {
        id: 8,
        photo: { url: "" },
        place: "test",
        genre: "test",
        prefecture: "test",
      },
    ]);
  }, []);

  return (
    <>
      <Box
        display="flex"
        height={300}
        justifyContent="center"
        alignItems="center"
        marginTop="2%"
        sx={{ color: "primary.main" }}
      >
        <Box sx={{ m: "auto", alignItems: "center" }}>
          <Avatar
            alt={user.user_name}
            src={human}
            sx={{ width: 112, height: 112 }}
          />
          <h1>しょうき</h1>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Box
        display="flex"
        bgcolor="#1976d2"
        justifyContent="center"
        alignItems="center"
        sx={{ m: "2rem", borderRadius: 8 }}
      >
        {postList && (
          <ImageList sx={{ px: 4, py: 2 }} cols={3}>
            {postList.map((post) => (
              <Box justifyContent="center" alignItems="center" sx={{ p: 1 }}>
                <Box
                  sx={{ p: 2, bgcolor: "background.paper", borderRadius: 4 }}
                >
                  <ImageListItem key={post.id}>
                    <img
                      src={testImage2}
                      srcSet={`${post.photo}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={post.place}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={post.place}
                      subtitle={<span>by: {post.prefecture}</span>}
                      position="below"
                    />
                  </ImageListItem>
                </Box>
              </Box>
            ))}
          </ImageList>
        )}
      </Box>
    </>
  );
};
export default MyPage;
