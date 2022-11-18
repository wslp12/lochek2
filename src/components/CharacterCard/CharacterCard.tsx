import React from 'react';

const CharacterCard = () => {
  return (
    <div className='h-full'>
      <div className='p-6 flex flex-col overflow-auto h-full'>
        <CharacterImageSet />
        <CharacterImageSet />
        <CharacterImageSet />
        <CharacterImageSet />
        <CharacterImageSet />
        <CharacterImageSet />
      </div>
    </div>
  );
};

const CharacterImageSet = () => {
  // bg-[#202751]
  return (
    <div
      className='mt-5 p-2 box-border rounded-3xl h-full flex bg-opacity-5 shadow-black shadow-md overflow-y-hidden bg-white'
      // style={{
      //   overflowX: 'scroll',
      //   background:
      //     'linear-gradient(to right, rgb(168 85 227), rgb(158 85, 235),rgb(148 75, 230), rgb(138 65 235)',
      // }}
    >
      <CharacterImage src='https://img.lostark.co.kr/profile/5/E0DD263DD0A28CC56813AEBB3026DF5E9AE54C2ACEFBD004C319E1ABBCB3D776.PNG' />
      <CharacterImage src='http://www.lochek.site/gad.png' />
      <CharacterImage src='http://www.lochek.site/chaosd.png' />
      <CharacterImage src='http://www.lochek.site/epona.png' />
      <CharacterImage src='http://www.lochek.site/val1.jpg' />
      <CharacterImage src='http://www.lochek.site/kuku.jpg' />
      <CharacterImage src='http://www.lochek.site/argp-new.png' />
      <CharacterImage src='http://www.lochek.site/av1.jpg' />
      <CharacterImage src='http://www.lochek.site/kayangnew.PNG' />
    </div>
  );
};

const CharacterImage = (props: { src: string }) => {
  const { src } = props;
  return (
    <img
      width={300}
      className='rounded-full w-20 h-20 mr-2 cursor-pointer'
      src={src}
      alt='검은색폭동'
      loading='lazy'
    />
  );
};

export default CharacterCard;
