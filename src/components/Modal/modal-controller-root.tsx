import React from 'react';
import { useSetRecoilState } from 'recoil';
import { produce } from 'immer';
import { IModal, IModalProps } from '../../models/Modal';
import modalControllerAtomSate from '../../recoil/modal-controller.state';

/**
 * HOC
 * 모든 모달에 대한 상위 컨트롤러 입니다.
 */
const modalControllerRoot = (ModalComponent: IModal) =>
  function modalController(modalProps: IModalProps) {
    const setModalControllerState = useSetRecoilState(modalControllerAtomSate);

    //#region events
    const handleOnClickModalBackground = () => {
      if (!modalProps.isAutoCloseBackgroundClick) return;
      setModalControllerState((preveValue) =>
        produce(preveValue, (draftValue) => {
          draftValue.splice(1, 1);
        }),
      );
    };
    //#endregion

    return (
      <div
        onClick={handleOnClickModalBackground}
        className='w-full h-full flex fixed top-0 left-0 justify-center items-center bg-opacity-50 bg-slate-200'
      >
        <ModalComponent isAutoCloseBackgroundClick />
      </div>
    );
  };

export default modalControllerRoot;