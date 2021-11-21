//APIサーバーからユーザ情報をもらう
import { AxiosPromise } from "axios";
import client from "lib/api/client";
import { Post } from "../../interface/index";

export const fetchUsers = (): AxiosPromise<Post[]> => client.get(`/posts`);
