import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ROUTE_PATH from '../../enum/route.enum';
import { useNavigate } from 'react-router-dom';

const LnbRouteIconButton = () => {
  const navi = useNavigate();
  const buttonClassName = 'transition-transform duration-700 transform hover:scale-125';
  const iconClassName = 'mt-4 cursor-pointer hover:text-[#FB2576] text-white';

  const handleClickButton = (route: ROUTE_PATH) => {
    navi(route);
  };

  return (
    <>
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
      <hr className='mt-4 w-full text-white' />
      <button className={buttonClassName}>
        <AddCircleIcon className={iconClassName} />
      </button>
    </>
  );
};

const LnbUserIconButton = ({ src }: { src: string; alt: string }) => {
  return (
    <button>
      <img src={src} alt='' className='rounded-full w-10 h-10 mt-3' />
    </button>
  );
};

const LnbContent = () => {
  return (
    <div
      className='bg-[#0b1130] rounded-md h-full flex flex-col items-center shadow-black shadow-2xl bg-opacity-5'
      style={{
        boxShadow: '0px 0px 10px 0px rgba(255,255,255,0.2)',
      }}
    >
      <LnbRouteIconButton />
      <LnbUserIconButton src='http://www.lochek.site/yong.PNG' alt='' />
      <LnbUserIconButton src='http://www.lochek.site/eun.PNG' alt='' />
      <LnbUserIconButton src='http://www.lochek.site/whan.PNG' alt='' />
    </div>
  );
};
export default LnbContent;
