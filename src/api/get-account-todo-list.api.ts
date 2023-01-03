import { useQuery } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import QUERY_KEY from "../enum/query.enum";
import { AccountTodo, Todo } from "../models";
import wrapAxios from "./wrap-axios";

const getAccountTodoList = (userName: string) => {
  const url = `${HOST_INFO.API_HOST}${END_POINT.ACCOUNT_TODO}/${encodeURIComponent((userName))}`;
  const config = {
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return wrapAxios<AccountTodo[]>(config);

}

const useGetAccountTodoList = (userName: string) => {
  return useQuery([QUERY_KEY.ACCOUNT_TODO_LIST, userName], () => getAccountTodoList(userName));
}

export default useGetAccountTodoList;
