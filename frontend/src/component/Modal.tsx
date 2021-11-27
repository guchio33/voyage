import React, { VFC, memo } from "react";
import "./Modal.css";
import { Post } from "./pages/All";
import testImage from "../images/place1.jpg";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

type Props = {
  show: boolean;
  setShowModal: (b: boolean) => void;
  info: Post | undefined;
};

const Modal: VFC<Props> = memo((props) => {
  const closeModal = () => {
    props.setShowModal(false);
  };

  if (props.show && props.info) {
    return (
      <div id="overlay" onClick={closeModal}>
        <div id="content" onClick={(e) => e.stopPropagation()}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={closeModal}
          >
            <CloseIcon />
          </IconButton>
          <br />
          <img
            src={
              testImage /*`${props.info.photo.url}?w=248&fit=crop&auto=format`*/
            }
            srcSet={
              testImage /*`${props.info.photo.url}?w=248&fit=crop&auto=format&dpr=2 2x`*/
            }
            alt={props.info.genre}
            loading="lazy"
            className="photo"
          />

          <div className="box">
            <h1 className="place">{props.info.place}</h1>
            <p className="prefecture">{props.info.prefecture}</p>
            <p className="genre"> {props.info.genre}</p>
          </div>

          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/map"
          >
            ルートの検索
          </Button>
        </div>
      </div>
    );
  } else {
    return null;
  }
});
export default Modal;
