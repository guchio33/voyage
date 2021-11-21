//import React, { useEffect, useState } from "react";
import PhotoForm from "./component/pages/photo-form";
import Header from "./component/layouts/header";
import Map from "./component/pages/map";
import Home from "./component/pages/home";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React, { useState, useEffect, createContext } from "react";
import SignUp from "./component/pages/SignUp";
import SignIn from "./component/pages/SignIn";
import { getCurrentUser } from "lib/api/auth";
import { User } from "./interface/index";

// グローバルで扱う変数・
export const AuthContext = createContext(
  {} as {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isSignedIn: boolean; //loginの状態
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined; //loginしている人
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  }
);

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true); //初期値
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  // 認証済みのユーザーかチェック
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      //ユーザーの情報を取得
      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);

        console.log(res?.data.data);
      } else {
        console.log("No current user");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  // ユーザーが認証済みかどうかでルーティングを決定
  //// 未認証だった場合は「/signin」ページに促す
  //const Private = ({ children }: { children: React.ReactElement }) => {
  //  if (!loading) {
  //    if (isSignedIn) {
  //      return children;
  //    } else {
  //      return <Navigate to="/signin" />;
  //    }
  //  } else {
  //    return <></>;
  //  }
  //};
  //
  //投稿ボタン
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

        {/*投稿ボタン */}
        <StyledFab color="secondary" aria-label="add" href="/post">
          <AddIcon to="/post" />
        </StyledFab>

        <AuthContext.Provider
          value={{
            loading,
            setLoading,
            isSignedIn,
            setIsSignedIn,
            currentUser,
            setCurrentUser,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<PhotoForm />} />
            <Route path="/map" element={<Map />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            {/*<Private>
              <Route path="/" element={<Home />} />
            </Private>*/}
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
