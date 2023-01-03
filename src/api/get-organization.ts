import { useQuery } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import QUERY_KEY from "../enum/query.enum";
import { OrganizationList } from "../models";
import wrapAxios from "./wrap-axios";

const getOrganization = (userId: string) => {
  const encodeId = encodeURI(userId);
  const url = `${HOST_INFO.API_HOST}${END_POINT.ORGANIZATION}/${encodeId}`;
  const config = {
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return wrapAxios<OrganizationList[]>(config);

}

const useGetOrganization = (userId: string) => {
  return useQuery([QUERY_KEY.ORGANIZATION_LIST], () => getOrganization(userId));
}

export default useGetOrganization;
