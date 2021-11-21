import client from "lib/api/client";
import Cookies from "js-cookie";
import { SignUpParams, SignInParams } from "../../interface/index";

// サインアップ（新規アカウント作成） railsに送る
export const signUp = (params: SignUpParams) => {
  console.log(params);
  console.log("送っています３");
  return client.post("auth", params);
};

// サインイン（ログイン）
export const signIn = (params: SignInParams) => {
  return client.post("auth/sign_in", params);
};

// サインアウト（ログアウト）
export const signOut = () => {
  return client.delete("auth/sign_out", {
    headers: {},
  });
};

// 認証済みのユーザーを取得 App.tsxで利用
export const getCurrentUser = () => {
  if (
    !Cookies.get("_access_token") ||
    !Cookies.get("_client") ||
    !Cookies.get("_uid")
  )
    return client.get("/auth/sessions", {
      headers: {},
    });
};
