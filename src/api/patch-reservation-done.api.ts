import { useMutation } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import { Character } from "../models";
import { CharacterWithUser, reservateCharacter, Reservation, ReservationPostParam, SimpleUserModel } from "../recoil/reservation.state";
import wrapAxios from "./wrap-axios";

type Param = {
  done: boolean
  id: Reservation["id"]
}

const patchReservationDone = (param: Param) => {
  const { id, done } = param;

  const url = `${HOST_INFO.API_HOST}${END_POINT.RESERVATION}/done/${id}`;
  const config = {
    method: 'PATCH',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    data: { done }
  };
  return wrapAxios(config);

}

const usePatchReservationDone = () => {
  return useMutation((param: Param) => patchReservationDone(param)
  );
}

export default usePatchReservationDone;
