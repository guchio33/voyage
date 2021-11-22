//APIサーバーからユーザ情報をもらう
import { AxiosPromise } from "axios";
import client from "lib/api/client";
import { User, UserApiJson } from "../../interface/index";

export const fetchUsers = (): AxiosPromise<UserApiJson> => client.get(`/posts`);
