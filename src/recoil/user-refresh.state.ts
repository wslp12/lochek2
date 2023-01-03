import dayjs from "dayjs";
import 'dayjs/locale/ko';
import { atom } from "recoil";
import RECOIL_KEY from "../enum/recoil.enum";
import localStorageEffect from "./local-storage.effect";

const userRefreshAtomState = atom<string>({
  key: RECOIL_KEY.USER_REFRESH,
  default: "",
  effects: [localStorageEffect(RECOIL_KEY.USER_REFRESH)]
})

export default userRefreshAtomState;