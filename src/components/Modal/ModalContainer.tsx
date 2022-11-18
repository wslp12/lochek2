import React from 'react';
import { useRecoilValue } from 'recoil';
import modalControllerAtomSate from '../../recoil/modal-controller.state';
/**
 * 모달 컨트롤러에 등록되어 있는 모달을 보여줍니다.
 */
function ModalContainer() {
  const modalControllerState = useRecoilValue(modalControllerAtomSate);
  return (
    <>
      {modalControllerState.map((item) => (
        <span key={item.key}>{item}</span>
      ))}
    </>
  );
}

export default ModalContainer;
