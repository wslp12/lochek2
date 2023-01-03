import { useMutation } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import { TodoState } from "../models";
import wrapAxios from "./wrap-axios";


type FormData = { display: boolean };
type Param = { id: number, formData: FormData }

const patchTodoDisplay = ({ id, formData }: Param) => {


  const url = `${HOST_INFO.API_HOST}${END_POINT.TODO}/${id}`;
  const config = {
    method: 'PATCH',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(formData)
  };
  return wrapAxios<TodoState[]>(config);

}

const usePatchTodoDisplay = () => {
  return useMutation(({
    id,
    formData
  }: Param) => patchTodoDisplay({ id, formData })
  );
}

export default usePatchTodoDisplay;
