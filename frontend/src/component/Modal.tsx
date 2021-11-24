import React, { useEffect, useState, VFC, memo } from "react";
import { Box, ImageList, ImageListItem, ImageListItemBar, Card } from "@mui/material";
import "./Modal.css";
import { Post } from './All'
import testImage from './logo192.png'

type Props = {
    show: boolean
    setShowModal: (b: boolean) => void
    info: Post | undefined
}


const Modal: VFC<Props> = memo((props) => {
    const closeModal = () => {
        props.setShowModal(false)
    }

    if (props.show && props.info) {
        return (
            <div id="overlay" onClick={closeModal}>
                <div id="content" onClick={(e) => e.stopPropagation()}>
                    <img
                        src={testImage/*`${props.info.photo.url}?w=248&fit=crop&auto=format`*/}
                        srcSet={testImage/*`${props.info.photo.url}?w=248&fit=crop&auto=format&dpr=2 2x`*/}
                        alt={props.info.genre}
                        loading="lazy"
                    />
                    <div>
                        <h1>{props.info.place}</h1>
                        <p>{props.info.prefecture}</p>
                        <p>{props.info.genre}</p>
                        <p>{props.info.tags}</p>
                    </div>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div >
        )
    } else {
        return null;
    }

});
export default Modal;
