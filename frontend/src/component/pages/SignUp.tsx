import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { AuthContext } from "App";
import AlertMessage from "../layouts/AlertMessage";
import { signUp } from "lib/api/auth";
import { SignUpParams } from "interface/index";

// サインアップ用ページ
const SignUp: React.FC = () => {
  const histroy = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("送っています");
    e.preventDefault();

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    try {
      console.log("送っています２");
      const res = await signUp(params);
      console.log("送っています４");
      console.log(res);

      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        histroy("/");

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
          <div>
            <label>ユーザー名</label>
            <input
              name="username"
              type="username"
              placeholder="username"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
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
          <label>パスワード確認</label>
          <input
            name="passwordConfirmation"
            type="passwordConfirmation"
            placeholder="Password Confirmation"
            onChange={(event) => setPasswordConfirmation(event.target.value)}
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

export default SignUp;
