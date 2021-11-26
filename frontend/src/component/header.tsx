import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";

import "../index.css";

export default function Headar() {
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
            <HomeIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Typography
            variant="h3"
            component="div"
            sx={{ flexGrow: 1 }}
            align="justify"
          >
            Voyage
          </Typography>

          {/* ヘッダーの真ん中の隙間*/}
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              href="/mypage"
            >
              <AccountCircle sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
