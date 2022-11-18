import React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import ContrastIcon from '@mui/icons-material/Contrast';

const HeaderContent = () => {
  const buttonClassName =
    'transition-transform duration-700 transform hover:scale-125 hover:text-[#FB2576]';

  return (
    <div className='flex flex-row w-full justify-center items-center h-full'>
      <div className='flex-grow-[1] flex before:ml-4'>앱 아이콘</div>
      <div className='flex-grow-[8]'>뭔가 중간 컨텐츠</div>
      <div className='flex-grow-[1] flex flex-row-reverse before:mr-4'>
        <button type='button' className={buttonClassName}>
          <LanguageIcon className='mr-3 cursor-pointer' />
        </button>
        <button type='button' className={buttonClassName}>
          <ContrastIcon className='mr-3 cursor-pointer' />
        </button>
      </div>
    </div>
  );
};
export default HeaderContent;
