import dayjs from "dayjs";
import { atom } from "recoil";
import RECOIL_KEY from "../enum/recoil.enum";
import { Raid, Character } from "../models";

export type Reservation = {
  raid: Raid,

  accountLevelLimit: number,
  levelLimit: number,
  jewelLimit: number,
  numberOfPeople: number,
  character: Character[],
}

const reservationAtomState = atom<Reservation>({
  key: RECOIL_KEY.RESERVATION,
  default: {
    raid: {} as any,
    character: [],
    accountLevelLimit: 0,
    levelLimit: 0,
    jewelLimit: 0,
    numberOfPeople: 0,
  },
})

const reservationRaidTypeAtomState = atom<"학원" | "트라이" | "헤딩" | "반숙" | "숙련" | "클경">({
  key: RECOIL_KEY.RESERVATION_RAID_TYPE,
  default: "숙련",
})

const reservationDateAtomState = atom<string>({
  key: RECOIL_KEY.RESERVATION_DATE,
  default: dayjs().format('YYYY-MM-DDTHH:mm'),
})

export { reservationAtomState, reservationDateAtomState, reservationRaidTypeAtomState };
