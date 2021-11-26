import React, { memo, VFC } from "react";
import axios from "axios";
import { Card, ImageListItem, ImageListItemBar } from "@mui/material";
import testImage3 from "../images/place3.jpg";
import testImage2 from "../images/place2.jpg";
import testImage1 from "../images/place1.jpg";
import human from "../images/human.jpg";
import { Post } from "./pages/All";
import { spacing } from "@mui/system";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import CardMedia from "@mui/material/CardMedia";

type Props = {
  postPrefecture: string;
  postGenre: string;
  postPlace: string;
  id: number;
  imageUrl: string;
  getAllPosts: () => void;

  setShowModal: (b: boolean) => void;
  setModalInfo: (p: Post) => void;
};

export const PostCard: VFC<Props> = memo((props) => {
  const { postPrefecture, postPlace, postGenre, id, imageUrl, getAllPosts } =
    props;
  const editPost = () => {
    alert("edit post");
  };

  const deletePost = (id: number) => {
    const sure = window.confirm("are you sure?");
    if (sure) {
      axios
        .delete(`http://localhost:3001/posts/${id}`)
        .then(() => {
          getAllPosts();
        })
        .catch((e) => console.error(e));
    }
  };
  const test = [
    { img: testImage1, place: "馬籠宿", prefecture: "岐阜" },
    { img: testImage2, place: "下灘駅", prefecture: "愛媛" },
    { img: testImage3, place: "メタセコイヤ", prefecture: "滋賀" },
  ];

  return (
    <div
      onClick={() =>
        props.setModalInfo({
          id: id,
          photo: { url: imageUrl },
          place: postPlace,
          genre: postGenre,
          prefecture: postPrefecture,
        })
      }
    >
      <div onClick={() => props.setShowModal(true)}>
        <Card
          sx={{
            p: 5,
            bgcolor: "#ffffff",
            borderRadius: 2,
            maxWidth: 345,
            maxHeight: 400,
            boxShadow: 3,
            m: 2,
          }}
        >
          <ImageListItem key={props.id}>
            <CardMedia component="img" height="194" image={testImage1} />
            <CardHeader
              avatar={
                <Avatar alt="Remy Sharp" src={human}>
                  S
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="しょうき"
            />
            <ImageListItemBar
              title={props.postPlace}
              subtitle={<span>from: {props.postPrefecture}</span>}
              position="below"
            />
          </ImageListItem>
        </Card>
      </div>
    </div>
  );
});
