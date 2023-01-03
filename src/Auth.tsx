import { memo, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ROUTE_PATH } from './enum/route.enum';
import loginAtomState from './recoil/login.state';

const Auth = (props: { children: React.ReactNode }) => {
  const { children } = props;

  const navi = useNavigate();
  const loginState = useRecoilValue(loginAtomState);

  useEffect(() => {
    if (loginState === null) {
      globalThis.localStorage.clear();
      navi(ROUTE_PATH.LOGIN);
    }
  }, [loginState]);

  if (loginState === null) return <Navigate to={ROUTE_PATH.LOGIN} />;

  return <>{children}</>;
};

export default memo(Auth);
