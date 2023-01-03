import { useMutation } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import { AccountTodo, TodoState } from "../models";
import wrapAxios from "./wrap-axios";


type FormData = { done: boolean; doneTime: string };
type Param = { id: number, formData: FormData }

const patchAccountTodo = ({ id, formData }: Param) => {

  const url = `${HOST_INFO.API_HOST}${END_POINT.ACCOUNT_TODO}/${id}`;
  const config = {
    method: 'PATCH',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(formData)
  };
  return wrapAxios<AccountTodo>(config);

}

const usePatchAccountTodo = () => {
  return useMutation(({
    id,
    formData
  }: Param) => patchAccountTodo({ id, formData })
  );
}

export default usePatchAccountTodo;
