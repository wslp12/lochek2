import { useMutation } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import { Reservation, ReservationPostParam } from "../recoil/reservation.state";
import wrapAxios from "./wrap-axios";

type Param = ReservationPostParam;

const postReservation = (param: Param) => {

  const url = `${HOST_INFO.API_HOST}${END_POINT.RESERVATION}`;
  const config = {
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(param)
  };
  return wrapAxios(config);

}

const usePostReservation = () => {
  return useMutation((param: Param) => postReservation(param)
  );
}

export default usePostReservation;
