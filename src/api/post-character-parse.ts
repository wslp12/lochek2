import { useMutation } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import { Character } from "../models";
import wrapAxios from "./wrap-axios";

type Param = { groupSetName: string, username: string };

const postCharacterParse = (param: Param) => {
  const { groupSetName, username } = param;
  const encodeGroupSetName = encodeURI(groupSetName);
  const encodeUsername = encodeURI(username);

  const url = `${HOST_INFO.API_HOST}${END_POINT.PARSE}${END_POINT.GORUP_SET_NAME}/${encodeGroupSetName}${END_POINT.USERNAME}/${encodeUsername}`;
  const config = {
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return wrapAxios<Character>(config);

}

const usePostCharacterParse = () => {
  return useMutation((groupSetName: Param) => postCharacterParse(groupSetName)
  );
}

export default usePostCharacterParse;
