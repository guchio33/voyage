import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { signOut } from "lib/api/auth";
import { AuthContext } from "../../App";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";

export default function Headar() {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const histroy = useNavigate();

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        histroy("/signin");

        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
          <button color="inherit" onClick={handleSignOut}>
            Sign out
          </button>
        );
      } else {
        return (
          <>
            <Button href="/signin" color="inherit">
              Sign in
            </Button>
            <Button href="/signup" color="inherit">
              Sign Up
            </Button>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* ホームアイコン*/}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            href="/"
          >
            <MenuIcon />
            <HomeIcon />
          </IconButton>
          <AuthButtons />

          {/* ヘッダーの真ん中の隙間*/}
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              href="/map"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
