import React from 'react';
import LnbContent from '../LnbContent/LnbContent';

const Lnb = () => {
  return (
    <div
      className='p-2'
      style={{
        gridArea: 'lnb',
      }}
    >
      <LnbContent />
    </div>
  );
};

export default Lnb;
