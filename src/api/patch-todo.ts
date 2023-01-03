import { useMutation } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import { TodoState } from "../models";
import wrapAxios from "./wrap-axios";

type Id = { groupName: string; characterName: string };
type FormData = { done: boolean; doneTime: string };
type Param = { id: Id, formData: FormData }

const patchTodo = ({ id, formData }: Param) => {
  const { groupName, characterName } = id;
  const encodeId = encodeURI(groupName);
  // const encodeCharacterName = encodeURI(characterName);

  const url = `${HOST_INFO.API_HOST}${END_POINT.TODO}${END_POINT.GROUPNAME}/${encodeId}${END_POINT.CHARACTER_NAME}/${characterName}`;
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

/**
 * 유저이름 리스트는 사용자에 의해 반영 되는 값이 아니기때문에
 * staleTime: 1000 * 60 * 10 (10분) 의 스테일 타임이 걸려있습니다.
 */
const usePatchTodo = () => {
  return useMutation(({
    id,
    formData
  }: Param) => patchTodo({ id, formData })
  );
}

export default usePatchTodo;
