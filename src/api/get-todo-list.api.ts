import { useQuery } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import QUERY_KEY from "../enum/query.enum";
import { Todo } from "../models";
import wrapAxios from "./wrap-axios";

const getTodoList = (userName: string) => {
  const url = `${HOST_INFO.API_HOST}${END_POINT.TODO}/${decodeURIComponent((userName))}`;
  const config = {
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return wrapAxios<Todo[]>(config);

}

const useGetTodoList = (userName: string) => {
  return useQuery([QUERY_KEY.TODO_LIST, userName], () => getTodoList(userName));
}

export default useGetTodoList;
