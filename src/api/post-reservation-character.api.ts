import { useMutation } from "@tanstack/react-query";
import END_POINT from "../enum/end-point-enum";
import HOST_INFO from "../enum/host.enum";
import { Character } from "../models";
import { CharacterWithUser, reservateCharacter, Reservation, ReservationPostParam, SimpleUserModel } from "../recoil/reservation.state";
import wrapAxios from "./wrap-axios";

type Param = {
  character: Partial<CharacterWithUser>[]
  id: Reservation["id"]
}

const postReservateCharacter = (param: Param) => {
  const { id, character } = param;

  const url = `${HOST_INFO.API_HOST}${END_POINT.RESERVATION}${END_POINT.RESERVATION_CHARACTER}/${id}`;
  const config = {
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ reservateCharacter: character })
  };
  return wrapAxios(config);

}

const useReservateCharacter = () => {
  return useMutation((param: Param) => postReservateCharacter(param)
  );
}

export default useReservateCharacter;
