import { AxiosPromise } from "axios";

import client from "./client";

//post作成
export const createPost = (data: FormData): AxiosPromise => {
    return client.post("/posts", data);
}