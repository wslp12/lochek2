import React from 'react';
import HeaderContent from '../HeaderContent/HeaderContent';

const Header = () => {
  return (
    <div
      className='p-2 '
      style={{
        gridArea: 'header',
      }}
    >
      <div
        className='bg-[#0b1130] rounded-md h-full text-white  shadow-black shadow-2xl bg-opacity-5'
        style={{
          border: '1px solid rgba(0,0,0,0.2)',
        }}
      >
        <HeaderContent />
      </div>
    </div>
  );
};

export default Header;
