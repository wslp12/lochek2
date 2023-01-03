import { useQuery } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import QUERY_KEY from "../enum/query.enum";
import { AccountRaid, AccountTodo, Todo } from "../models";
import wrapAxios from "./wrap-axios";

const getAccountRaidList = () => {
  const url = `${HOST_INFO.API_HOST}${END_POINT.ACCOUNT_RAID}`;
  const config = {
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return wrapAxios<AccountRaid[]>(config);

}

const useGetAccountRaidList = () => {
  return useQuery([QUERY_KEY.ACCOUNT_RAID_LIST], () => getAccountRaidList());
}

export default useGetAccountRaidList;
