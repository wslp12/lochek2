import { useMutation } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import { Character } from "../models";
import wrapAxios from "./wrap-axios";

type Param = string;

const patchCharacterParse = (name: Param) => {
  const encodeId = encodeURI(name);

  const url = `${HOST_INFO.API_HOST}${END_POINT.PARSE}/${encodeId}`;
  const config = {
    method: 'PATCH',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return wrapAxios<Character>(config);

}

const usePatchCharacterParse = () => {
  return useMutation((name: Param) => patchCharacterParse(name)
  );
}

export default usePatchCharacterParse;
