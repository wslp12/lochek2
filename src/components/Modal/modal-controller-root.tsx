import { useSetRecoilState } from 'recoil';
import { produce } from 'immer';
import modalControllerAtomSate from '../../recoil/modal-controller.state';
import { IModalProps } from '../../models/Modal';

/**
 * HOC
 * 모든 모달에 대한 상위 컨트롤러 입니다.
 */
function modalControllerRoot(ModalComponent: any) {
  return function modalController<T>(modalProps: IModalProps<T>) {
    const { isAutoCloseBackgroundClick = true } = modalProps;
    const setModalControllerState = useSetRecoilState(modalControllerAtomSate);

    //#region events
    const handleOnClickModalBackground = () => {
      if (!isAutoCloseBackgroundClick) return;
      setModalControllerState((preveValue) =>
        produce(preveValue, (draftValue) => {
          return draftValue.splice(1, 1);
        }),
      );
    };
    //#endregion

    return (
      <div
        onClick={handleOnClickModalBackground}
        className="w-full h-full flex fixed top-0 left-0 justify-center items-center bg-opacity-50 bg-slate-200 z-30"
      >
        <ModalComponent closeModal={handleOnClickModalBackground} {...modalProps} />
      </div>
    );
  };
}
export default modalControllerRoot;
