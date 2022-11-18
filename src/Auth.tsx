import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { produce } from 'immer';
import LoginModal from './components/Modal/LoginModal';
import modalControllerAtomSate from './recoil/modal-controller.state';
import isLoginAtomState from './recoil/login-status.state';

function Auth(props: { children: React.ReactNode }) {
  const { children } = props;

  const setModalControllerState = useSetRecoilState(modalControllerAtomSate);
  const isLoginState = useRecoilValue(isLoginAtomState);

  //#region useEffects
  useEffect(() => {
    // if (isLoginState === false) {
    //   setModalControllerState((preveValue) =>
    //     produce(preveValue, (draftValue) => {
    //       draftValue.push(<LoginModal isAutoCloseBackgroundClick />);
    //     }),
    //   );
    // }

    return () => {
      setModalControllerState((preveValue) => produce(preveValue, () => []));
    };
  }, []);
  //#endregion

  return <>{children}</>;
}

export default Auth;
