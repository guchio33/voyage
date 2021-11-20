import React, { useEffect, useState } from "react";
import { fetchUsers } from "../lib/api/user";
//インターフェース
import { User } from "../interface/index";

const Home: React.FC = () => {
  //userリストの作成 インターフェースUser型
  const [userList, setUserList] = useState<User[] | undefined>(undefined);

  //APiサーバから送られてデータをもらう&例外処理
  const fetchUserReq = async () => {
    try {
      const { data } = await fetchUsers(); //api/userからデータをもらう
      console.log(data)
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const data = fetchUserReq();
    data.then((users) => {
      setUserList(users?.posts);
    });
  }, []);

  return (
    <>
      <h1>userList</h1>
      {userList &&
        userList.map((user) => {
          console.log(user);
          return (
            <p key={user.id}>
              <img src={user.photo.url}/>
              {`${user.photo} ${user.place}${user.genre}${user.prefecture}`}
            </p>
          );
        })}
    </>
  );
};
export default Home;
