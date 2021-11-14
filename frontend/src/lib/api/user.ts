//APIサーバーからユーザ情報をもらう
import { AxiosPromise } from "axios";
import client from "lib/api/client";
import { User } from "../../interface/index";

export const fetchUsers = (): AxiosPromise<User[]> => client.get(`/posts`);
