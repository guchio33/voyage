//API リクエストを送る Axios クライアント

import axios, { AxiosInstance, AxiosResponse } from "axios";
import camelCaseKeys from "camelcase-keys";

//Axios クライアントの作成
let client: AxiosInstance;
export default client = axios.create({
  baseURL: `http://localhost:3001`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

//キャメルケースに変換
client.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  const data = camelCaseKeys(response.data);
  return { ...response.data, data };
});
