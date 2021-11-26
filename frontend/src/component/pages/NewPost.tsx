import { ChangeEvent, useCallback, memo, useState, VFC, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import "../post.css";

export const NewPost: VFC = memo(() => {
  const [prefecture, setPrefecture] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [place, setPlace] = useState("");
  const [tags, setTags] = useState([""]);
  const [preview, setPreview] = useState("");

  const history = useNavigate();

  const selectImage = useCallback((e) => {
    //投稿する画像をセット
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    //プレビュー画像のURLを得る
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  }, []);

  const createFormData = () => {
    const formData = new FormData();
    if (!image) return;
    formData.append("post[photo]", image);
    formData.append("post[place]", place);
    formData.append("post[prefecture]", prefecture);
    formData.append("post[genre]", genre);
    formData.append("post[tag]", tags.join(","));

    return formData;
  };

  const sendFormData = () => {
    const url = "http://localhost:3001/posts";
    const data = createFormData();
    axios
      .post(url, data)
      .then(() => history("/"))
      .catch((e) => {
        console.error(e);
      });
  };

  //タグの数を変える関数
  const addTag = () => {
    let tags2 = [...tags];
    tags2.push("");
    setTags(tags2);
  };
  const deleteTag = () => {
    let tags2 = [...tags];
    tags2.pop();
    setTags(tags2);
  };

  const StyledButton = styled(Button)({
    marginBottom: "5%",
    marginTop: "5%",
  });

  const StyledCard = styled(Card)({
    position: "absolute",

    p: 10,
    bgcolor: "#ffffff",
    borderRadius: 2,

    marginright: "50%",
    marginTop: "5%",
    left: "5%",

    textAlign: "center",
  });

  return (
    <div className="back">
      <div className="container">
        {/*  画像・場所・都道府県*/}
        <StyledCard sx={{ width: 800, height: "100" }}>
          {/*  画像*/}
          <p>File</p>
          <CardMedia component="img" height="400" image={preview} />
          <br />
          <input type="file" onChange={(e) => selectImage(e)} />
          {/*場所と都道府県 */}
          <p>
            場所：
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </p>
          <p>
            都道府県：
            <input
              type="text"
              value={prefecture}
              onChange={(e) => setPrefecture(e.target.value)}
            />
          </p>
          <p>
            タグ
            {tags.map((tag, index) => (
              <p key={index}>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => {
                    let tags2 = [...tags];
                    tags2[index] = e.target.value;
                    setTags(tags2);
                  }}
                />
              </p>
            ))}
          </p>

          <p>
            <button onClick={addTag}>タグ追加</button>
            <button onClick={deleteTag}>タグ削除</button>
          </p>
          <StyledButton
            variant="contained"
            endIcon={<SendIcon />}
            onClick={sendFormData}
          >
            create
          </StyledButton>
        </StyledCard>
      </div>
    </div>
  );
});
