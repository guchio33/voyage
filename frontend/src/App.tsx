//import React, { useEffect, useState } from "react";
import Header from "./component/header";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AllPosts } from "./component/pages/All";
import { NewPost } from "./component/pages/NewPost";
import { Search } from "./component/Search";
import Map from "./component/pages/Map";
import Mypage from "./component/pages/mypage";

const App: React.FC = () => {
  const StyledFab = styled(Fab)({
    position: "fixed",
    textAlign: "left",
    zIndex: 1,
    top: "90%",
    left: "80%",
    right: 0,
    margin: "0 auto",
  });

  return (
    <div className="background">
      <BrowserRouter>
        <Header />

        <StyledFab color="secondary" aria-label="add" href="/newpost">
          {/*投稿ボタン */}

          <AddIcon to="post" />
        </StyledFab>

        <Routes>
          <Route path="/" element={<AllPosts />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/search" element={<Search />} />
          <Route path="/map" element={<Map />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
