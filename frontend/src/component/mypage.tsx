import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from '@mui/material/Avatar';
import { ImageList, ImageListItem, ImageListItemBar, Card } from "@mui/material";


import { fetchUsers } from "../lib/api/user";
//インターフェース
import { User } from "../interface/index";

const MyPage: React.FC = () => {
    //userリストの作成 インターフェースUser型
    const [postList, setPostList] = useState<User[] | undefined>([]);
    const [user, setUser] = useState({ user_id: 0, user_name: "名無し", photo: "../test.jpg" });
    const [imageListItem, setImageListItem] = useState("");

    /*
    //APiサーバから送られてデータをもらう&例外処理
    const fetchUserReq = async () => {
        try {
            const { data } = await fetchUsers(); //api/userからデータをもらう
            return data;
        } catch (e) {
            console.log(e);
        }
    };
    */

    useEffect(() => {
        //const data = fetchUserReq();

        //data.then((users) => {
        //    setUserList(users);
        //});

        //仮の投稿データをセット
        setPostList([
            { id: 0, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 1, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 2, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 3, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 4, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 5, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 6, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 7, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 8, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 9, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 10, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 12, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 13, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 14, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 15, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 16, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 17, photo: "", place: 'test', genre: 'test', prefecture: 'test' },
            { id: 18, photo: "", place: 'test', genre: 'test', prefecture: 'test' }
        ])

    }, []);

    return (
        <>
            <Box display="flex"
                height={150}
                bgcolor="lightblue"
                justifyContent="center"
                alignItems="center"
            >
                <Box sx={{ m: "auto", alignItems: 'center' }}>
                    <Avatar alt={user.user_name} src={user.photo} sx={{ width: 112, height: 112 }} />
                    <Card sx={{ textAlign: "center", bgcolor: "#00000000" }}>名前</Card>
                </Box>

            </Box>
            <Box sx={{ flexGrow: 1 }} />

            <Box display="flex"
                bgcolor="#1976d2"
                justifyContent="center"
                alignItems="center"
                sx={{ m: "2rem", borderRadius: 8 }}
            >
                {postList &&
                    <ImageList sx={{ px: 4, py: 2 }} cols={3} >
                        {postList.map((post) => (
                            <Box justifyContent="center" alignItems="center" sx={{ p: 1 }}>
                                <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 4 }}>
                                    <ImageListItem key={post.id}>
                                        <img
                                            src={`${post.photo}?w=248&fit=crop&auto=format`}
                                            srcSet={`${post.photo}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt={post.place}
                                            loading="lazy"
                                        />
                                        <ImageListItemBar
                                            title={post.place}
                                            subtitle={<span>by: {post.prefecture}</span>}
                                            position="below"
                                        />
                                    </ImageListItem>
                                </Box>
                            </Box>
                        ))}
                    </ImageList>
                }
            </Box>


        </>
    );
};
export default MyPage;
