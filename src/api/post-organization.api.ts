import { useMutation } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import wrapAxios from "./wrap-axios";

type Param = { name: string; gName: string }

const postOrganization = (param: Param) => {
  const { name, gName } = param;
  const encodeId = encodeURI(gName);

  const url = `${HOST_INFO.API_HOST}${END_POINT.ORGANIZATION}/${encodeId}`;
  const config = {
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
      name: encodeURIComponent(name),
    },
  };
  return wrapAxios(config);

}

const usePostOrganization = () => {
  return useMutation((param: Param) => postOrganization(param)
  );
}

export default usePostOrganization;
