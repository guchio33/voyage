import { AxiosResponse } from "axios";
import { useState } from "react";
import client from "../lib/api/client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { styled } from "@mui/material/styles";

export const Search: React.FC = () => {
  //保持する変数
  const [prefecture, setPrefecture] = useState("");
  const [genre, setGenre] = useState("");
  const [place, setPlace] = useState("");
  const [tag, setTag] = useState("");

  const [response, setResponse] = useState<AxiosResponse>();

  const StyledPaper = styled(Paper)({
    p: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    textAlign: "center",
    marginLeft: "30%",
    marginTop: "3%",
  });

  //GET通信処理
  const searchTag = () => {
    client
      .get("/serch_tags", {
        params: {
          tag: tag,
        },
      })
      .then((res) => {
        setResponse(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/*
            <p>都道府県検索:<input type="text" value={prefecture} onChange={(e) => setPrefecture(e.target.value)} /></p>
            <p>ジャンル検索:<input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} /></p>
            <p>場所検索:<input type="text" value={place} onChange={(e) => setPlace(e.target.value)} /></p>
            */}

      {/*<p>
        タグ検索:
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </p>
      <button onClick={searchTag}>タグ検索</button>
      */}
      <StyledPaper>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </StyledPaper>
    </div>
  );
};

export default Search;
