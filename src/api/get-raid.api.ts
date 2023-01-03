import { useQuery } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import QUERY_KEY from "../enum/query.enum";
import { Raid } from "../models";
import wrapAxios from "./wrap-axios";

const getRaid = () => {
  const url = `${HOST_INFO.API_HOST}${END_POINT.RAID}`;
  const config = {
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return wrapAxios<Raid[]>(config);

}

const useGetRaid = () => {
  return useQuery([QUERY_KEY.RAID_LIST], () => getRaid());
}

export default useGetRaid;
