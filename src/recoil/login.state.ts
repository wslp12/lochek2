import { atom } from "recoil";
import RECOIL_KEY from "../enum/recoil.enum";
import { UserInfo } from "../models";
import localStorageEffect from "./local-storage.effect";

const loginAtomState = atom<UserInfo>({
  key: RECOIL_KEY.LOGIN,
  default: null as any,
  effects: [localStorageEffect(RECOIL_KEY.LOGIN)]
})

export default loginAtomState;