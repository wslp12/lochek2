import { useMutation, useQuery } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import QUERY_KEY from "../enum/query.enum";
import { Reservation } from "../recoil/reservation.state";
import wrapAxios from "./wrap-axios";

const getReservation = () => {
  const url = `${HOST_INFO.API_HOST}${END_POINT.RESERVATION}`;
  const config = {
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return wrapAxios<Reservation[]>(config);
}

const useGetReservation = () => {
  return useQuery([QUERY_KEY.RESERVATION_LIST], () => getReservation()
  );
}

export default useGetReservation;
