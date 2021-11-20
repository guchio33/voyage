//import React, { useEffect, useState } from "react";
import PhotoForm from "./photo-form";
import Header from "./component/header";
import Home from "./component/home";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AllPosts} from "./component/All";
import {NewPost} from "./component/NewPost";


const App: React.FC = () => {
  const StyledFab = styled(Fab)({
    position: "absolute",
    textAlign: "left",
    zIndex: 1,
    top: "90%",
    left: "80%",
    right: 0,
    margin: "0 auto",
  });

  return (
    <>
      <BrowserRouter>
        <Header />

        <StyledFab color="secondary" aria-label="add" href="/post">
          {/*投稿ボタン */}

          <AddIcon to="/post" />
        </StyledFab>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PhotoForm />} />
          <Route path="/allpost" element={<AllPosts />} />
          <Route path="/newpost" element={<NewPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
