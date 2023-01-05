import { useQuery } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import QUERY_KEY from "../enum/query.enum";
import { Character } from "../models";
import { CharacterWithUser } from "../recoil/reservation.state";
import wrapAxios from "./wrap-axios";

const getCharacterListByUserName = (name: string) => {
  const encodeId = encodeURI(name);
  const url = `${HOST_INFO.API_HOST}${END_POINT.CHARACTER_LIST}${END_POINT.USERNAME}/${encodeId}`;
  const config = {
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return wrapAxios<CharacterWithUser[]>(config);

}

const useGetCharacterList = (name: string) => {
  return useQuery([QUERY_KEY.CHARACTER_LIST, name], () => getCharacterListByUserName(name));
}

export default useGetCharacterList;
