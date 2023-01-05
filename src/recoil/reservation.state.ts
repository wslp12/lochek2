import dayjs from "dayjs";
import { atom } from "recoil";
import RECOIL_KEY from "../enum/recoil.enum";
import { Raid, Character, UserInfo } from "../models";

export type RaidType = "학원" | "트라이" | "헤딩" | "반숙" | "숙련" | "클경";
export type SimpleUserModel = Pick<UserInfo, "name" | "profileSrc" | "token">;
export type CharacterWithUser = Character & { user: SimpleUserModel };
export type reservateCharacter = { id: number, character: CharacterWithUser };
export type Reservation = {
  id: number,
  raid: Raid,
  accountLevelLimit: number,
  levelLimit: number,
  jewelLimit: number,
  numberOfPeople: number,
  reservateCharacter: reservateCharacter[],
  startTime: string;
  raidType: RaidType;
  register: UserInfo,
}

export type ReservationPostParam = Omit<Reservation, "reservateCharacter" | "id">;

export type ReservationAtomState = Omit<ReservationPostParam, "startTime" | "raidType">

const reservationAtomState = atom<ReservationAtomState>({
  key: RECOIL_KEY.RESERVATION,
  default: {
    raid: {} as any,
    accountLevelLimit: 0,
    levelLimit: 0,
    jewelLimit: 0,
    numberOfPeople: 0,
    register: {} as any,
  },
})

const reservationRaidTypeAtomState = atom<RaidType>({
  key: RECOIL_KEY.RESERVATION_RAID_TYPE,
  default: "숙련",
})

const reservationDateAtomState = atom<string>({
  key: RECOIL_KEY.RESERVATION_DATE,
  default: dayjs().format('YYYY-MM-DDTHH:mm'),
})

export { reservationAtomState, reservationDateAtomState, reservationRaidTypeAtomState };
