import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { AuthContext } from "App";
import { signIn } from "lib/api/auth";
import { SignInParams } from "interface/index";
import AlertMessage from "../layouts/AlertMessage";
// サインイン用ページ
const SignIn: React.FC = () => {
  const history = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignInParams = {
      email: email,
      password: password,
    };

    try {
      const res = await signIn(params);
      console.log(res);

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        history("/");

        console.log("Signed in successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };
  return (
    <>
      <h1>ユーザ登録</h1>
      <form>
        <div>
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            placeholder="email"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>登録</button>
        </div>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid emai or password"
      />
    </>
  );
};

export default SignIn;
