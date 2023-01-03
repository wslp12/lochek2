import { useMutation } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import { Character } from "../models";
import wrapAxios from "./wrap-axios";

type Param = {
  name: string,
  characterList: Character[]
}

const patchCharacterList = ({ name, characterList }: Param) => {
  const encodeId = encodeURI(name);
  // const encodeCharacterName = encodeURI(characterName);

  const url = `${HOST_INFO.API_HOST}${END_POINT.CHARACTER_LIST}/${encodeId}`;
  const config = {
    method: 'PATCH',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(characterList)
  };
  return wrapAxios<Character[]>(config);

}

/**
 * 유저이름 리스트는 사용자에 의해 반영 되는 값이 아니기때문에
 * staleTime: 1000 * 60 * 10 (10분) 의 스테일 타임이 걸려있습니다.
 */
const usePatchCharacterList = () => {
  return useMutation(({ name, characterList }: Param) => patchCharacterList({ name, characterList })
  );
}

export default usePatchCharacterList;
