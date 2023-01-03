import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { toast } from "react-toastify";
import HOST_INFO from "../enum/host.enum";
import RECOIL_KEY from "../enum/recoil.enum";
import { ROUTE_PATH } from "../enum/route.enum";
import ApiError from "../models/api-state/error-format";

const wrapAxios: <T>(config: AxiosRequestConfig) => Promise<T | ApiError> = (config) => {
  const loginStorage = globalThis.localStorage.getItem(RECOIL_KEY.LOGIN);

  if (loginStorage === null) {
    globalThis.localStorage.clear();
    globalThis.location.href = HOST_INFO.HOST + ROUTE_PATH.LOGIN;
  }



  return axios({
    ...config,
    headers: config.headers,
  }).then(({ data }) => data).catch((reason: AxiosError<ApiError>) => {
    const { response, message } = reason;
    const rerrorMsg = "예기지 못한 에러";

    if (response === undefined) {
      toast.error(`${rerrorMsg}: ${message}`);
      throw Error(message);
    }
    const { status, data } = response;

    /**
     * 로그인을 제외한 401에러는 로그인 유지가 불가능한 상태
     * 로그아웃 처리 합니다.
     */
    if (status === 401) {
      toast.error(data.message, {
        onClose(props) {
          globalThis.localStorage.clear();
          globalThis.location.href = HOST_INFO.HOST + ROUTE_PATH.LOGIN
        },
        pauseOnHover: false,
        pauseOnFocusLoss: false
      });

    }
    return {
      message: data.message,
      status: status
    };
  })
}

export default wrapAxios;
