import { useMutation } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import { Character } from "../models";
import { CharacterWithUser, reservateCharacter, Reservation, ReservationPostParam, SimpleUserModel } from "../recoil/reservation.state";
import wrapAxios from "./wrap-axios";

type Param = number;

const deleteReservation = (param: Param) => {


  const url = `${HOST_INFO.API_HOST}${END_POINT.RESERVATION}/${param}`;
  const config = {
    method: 'DELETE',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return wrapAxios(config);

}

const useDeleteReservation = () => {
  return useMutation((param: Param) => deleteReservation(param)
  );
}

export default useDeleteReservation;
