import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import QUERY_KEY from "../enum/query.enum";
import { Character, UserInfo } from "../models";



const getUser = (id: string) => {
  const encodeId = encodeURI(id);

  const url = HOST_INFO.API_HOST + END_POINT.USER + `/${encodeId}`;
  const config = {
    method: 'GET',
    url,
  };
  return axios(config).then(({ data }) => data)

}

/**
 * 유저이름 리스트는 사용자에 의해 반영 되는 값이 아니기때문에
 * staleTime: 1000 * 60 * 10 (10분) 의 스테일 타임이 걸려있습니다.
 */
const useGetUser = (id: string, options?: { onSuccess: (data: UserInfo) => void }) => {
  const loginApiError = (error: AxiosError) => {
    if (!error.response) {
      toast.error('예기치 못한 에러가 발생했습니다.');
      return;
    }
    const { status } = error.response;
    if (status === 400) {
      toast.error('존재 하지 않는 회원 입니다.');
    } else if (status === 401) {
      toast.error('사용자 정보가 일치하지 않습니다.');
    }
  };

  return useQuery([QUERY_KEY.LOGIN], () => getUser(id), {
    enabled: false,
    onError: loginApiError,
    onSuccess: (data) => options?.onSuccess(data)
  });
}

export default useGetUser;
