import { atom } from 'recoil';
import RECOIL_KEY from '../enum/recoil.enum';

const isLoginAtomState = atom({
  key: RECOIL_KEY.LOGIN_STATUS,
  default: false,
});

export default isLoginAtomState;
