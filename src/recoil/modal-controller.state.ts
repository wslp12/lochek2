import React from 'react';
import { atom } from 'recoil';
import RECOIL_KEY from '../enum/recoil.enum';

const modalControllerAtomSate = atom<React.ReactElement[]>({
  key: RECOIL_KEY.MODAL_CONTROLLER,
  default: [],
});

export default modalControllerAtomSate;
