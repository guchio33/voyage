import React, { useEffect, useState, useContext } from "react";
import { fetchUsers } from "../../lib/api/user";
import { AuthContext } from "App";

//インターフェース
import { Post } from "../../interface/index";

const Home: React.FC = () => {
  //userリストの作成 インターフェースUser型
  const [userList, setUserList] = useState<Post[] | undefined>(undefined);

  const { isSignedIn, currentUser } = useContext(AuthContext);

  //APiサーバから送られてデータをもらう&例外処理
  const fetchUserReq = async () => {
    try {
      const { data } = await fetchUsers(); //api/userからデータをもらう
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const data = fetchUserReq();
    data.then((users) => {
      setUserList(users);
    });
  }, []);

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          <h1>Signed in successfully!</h1>
          <h2>Email: {currentUser?.email}</h2>
          <h2>Name: {currentUser?.name}</h2>
        </>
      ) : (
        <h1>Not signed in</h1>
      )}
      <h1>userList</h1>
      {userList &&
        userList.map((user) => {
          console.log(user);
          return (
            <p key={user.id}>
              {`${user.photo} ${user.place}${user.genre}${user.prefecture}`}
            </p>
          );
        })}
    </>
  );
};
export default Home;
