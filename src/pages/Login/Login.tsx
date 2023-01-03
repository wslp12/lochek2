import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import loginAtomState from '../../recoil/login.state';
import { ROUTE_PATH } from '../../enum/route.enum';
import useGetCharacterList from '../../api/get-raid.api';
import { Character, UserInfo } from '../../models';
import useGetUser from '../../api/get-user';

const Login = () => {
  const navi = useNavigate();
  const [loginState, setLoginState] = useRecoilState(loginAtomState);

  const [characterName, setCharacterName] = useState('');
  // const [password, setPassword] = useState('');

  useEffect(() => {
    if (loginState !== null) {
      navi(ROUTE_PATH.MAIN);
    }
  }, [loginState]);

  const loginApiSuccess = (data: UserInfo) => {
    setLoginState(data);
    navi(ROUTE_PATH.MAIN);
  };

  const { refetch } = useGetUser(characterName, {
    onSuccess: loginApiSuccess,
  });

  const [showPasswordText, setShowPasswordText] = useState(false);

  const handleClickLoginButton = () => {
    // if (characterName === '' || password === '') {
    if (characterName === '') {
      toast.error('아이디 혹은 비밀번호가 입력되지 않았습니다.');
      return;
    }
    refetch();
  };

  return (
    <div className="flex justify-center items-center w-full h-full ">
      <div className="flex flex-col gap-3 w-60">
        <div>
          <TextField
            className="w-full"
            error={characterName.length === 0}
            label="* 계정 아이디"
            defaultValue=""
            helperText={characterName.length === 0 && `계정 아이디를 입력해 주세요.`}
            onChange={(e) => setCharacterName(e.target.value)}
          />
        </div>
        {/* <div>
          <TextField
            error={password.length === 0}
            label="* 비밀번호"
            defaultValue=""
            type={showPasswordText ? 'text' : 'password'}
            helperText={password.length === 0 && `비밀번호를 입력해 주세요.`}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    edge="end"
                  >
                    {showPasswordText ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div> */}
        <div>
          <Button variant="contained" onClick={handleClickLoginButton}>
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
