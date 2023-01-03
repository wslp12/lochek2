import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import { ROUTE_PATH } from '../../enum/route.enum';
import { useNavigate, useNavigation } from 'react-router-dom';
import produce from 'immer';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import modalControllerAtomSate from '../../recoil/modal-controller.state';
import AddUserCharacterModal from '../Modal/AddUserCharacterModal';
import loginAtomState from '../../recoil/login.state';
import useGetOrganization from '../../api/get-organization';
import HOST_INFO from '../../enum/host.enum';
import CharacterRepresh from './CharacterRepresh';

const LnbRouteIconButton = () => {
  const navi = useNavigate();
  const setModalControllerState = useSetRecoilState(modalControllerAtomSate);

  const buttonClassName = 'transition-transform duration-700 transform hover:scale-125';
  const iconClassName = 'mt-4 cursor-pointer hover:text-blue-300 text-white';

  const handleClickButton = (route: ROUTE_PATH) => {
    navi(route);
  };

  const handleClickAddUserCharacter = () => {
    setModalControllerState((preveValue) =>
      produce(preveValue, (draftValue) => {
        draftValue.push(<AddUserCharacterModal isAutoCloseBackgroundClick />);
      }),
    );
  };

  const handleClickLogoutButton = () => {
    globalThis.localStorage.clear();
    globalThis.location.reload();
  };

  const handleClickScheduleButton = () => {
    navi(ROUTE_PATH.SCHEDULE);
  };

  return (
    <>
      <CharacterRepresh
        buttonClassName={buttonClassName}
        iconClassName={`${iconClassName} text-red-700`}
      />
      <button className={buttonClassName} onClick={handleClickLogoutButton}>
        <LogoutIcon className={`${iconClassName} text-red-700`} />
      </button>
      <button className={buttonClassName} onClick={() => handleClickButton(ROUTE_PATH.MAIN)}>
        <DashboardIcon className={iconClassName} />
      </button>

      <button
        className={buttonClassName}
        onClick={() => handleClickButton(ROUTE_PATH.CHAR_SETTING)}
      >
        <SettingsIcon className={iconClassName} />
      </button>
      <button className={buttonClassName} onClick={() => handleClickButton(ROUTE_PATH.RAID_INFO)}>
        <AutoStoriesIcon className={iconClassName} />
      </button>
      <button className={buttonClassName} onClick={handleClickScheduleButton}>
        <DepartureBoardIcon className={iconClassName} />
      </button>
      <hr className="mt-4 w-full text-white" />
      <button className={buttonClassName} type="button" onClick={handleClickAddUserCharacter}>
        <AddCircleIcon className={iconClassName} />
      </button>
    </>
  );
};

const LnbUserIconButton = ({ src, name, alt }: { src: string; alt: string; name: string }) => {
  const navi = useNavigate();

  const handleClickUserCharacterButton = () => {
    navi(`${ROUTE_PATH.USERS}/${name}`);
  };

  return (
    <button onClick={handleClickUserCharacterButton}>
      <img src={src} alt={alt} className="rounded-full w-10 h-10 mt-3" />
    </button>
  );
};

const LnbContent = () => {
  return (
    <div
      className="bg-[#0b1130] rounded-md h-full flex flex-col items-center shadow-black shadow-2xl bg-opacity-5"
      style={{
        boxShadow: '0px 0px 10px 0px rgba(255,255,255,0.2)',
      }}
    >
      <LnbRouteIconButton />
      <UserIconList />
    </div>
  );
};

const UserIconList = () => {
  const loginInfo = useRecoilValue(loginAtomState);
  const { name } = loginInfo;
  const { data, isLoading, isError } = useGetOrganization(name);
  if (isLoading) return <div>레이드 리스트를 불러오는 중입니다.</div>;
  if (isError) return <div>레이드 리스트를 불러오는중 에러가 발생 했습니다.</div>;
  if ('message' in data) return <div>에러발생</div>;

  return (
    <>
      {data.map((dataItem) => {
        return (
          <LnbUserIconButton
            key={dataItem.id}
            src={`${HOST_INFO.HOST}/${dataItem.profileSrc}`}
            alt={dataItem.userName}
            name={dataItem.name}
          />
        );
      })}
    </>
  );
};
export default LnbContent;
