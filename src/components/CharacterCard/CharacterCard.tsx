import React from 'react';

const CharacterCard = () => {
  return (
    <div className='h-full p-2 flex flex-col overflow-auto'>
      <CharacterImageSet />
      <CharacterImageSet />
      <CharacterImageSet />
      <CharacterImageSet />
      <CharacterImageSet />
      <CharacterImageSet />
    </div>
  );
};

const CharacterImageSet = () => {
  return (
    <div className='mt-5 p-2 box-border rounded-3xl h-full flex bg-opacity-5 shadow-black shadow-md overflow-y-hidden bg-white items-center'>
      <CharacterImage src='https://img.lostark.co.kr/profile/5/E0DD263DD0A28CC56813AEBB3026DF5E9AE54C2ACEFBD004C319E1ABBCB3D776.PNG' />
      <TodoImage src='http://www.lochek.site/gad.png' />
      <TodoImage src='http://www.lochek.site/chaosd.png' />
      <TodoImage src='http://www.lochek.site/epona.png' />
      <TodoImage src='http://www.lochek.site/val1.jpg' />
      <TodoImage src='http://www.lochek.site/kuku.jpg' />
      <TodoImage src='http://www.lochek.site/argp-new.png' />
      <TodoImage src='http://www.lochek.site/av1.jpg' />
      <TodoImage src='http://www.lochek.site/kayangnew.PNG' />
    </div>
  );
};

const CharacterImage = (props: { src: string }) => {
  const { src } = props;
  const size = 'w-[80px] h-[80px]';
  return (
    <div className={`${size} m-2`}>
      <img className={`${size} rounded-full`} src={src} alt='검은색폭동' loading='lazy' />
    </div>
  );
};

const TodoImage = (props: { src: string }) => {
  const { src } = props;
  const size = 'w-[80px] h-[80px]';
  return (
    <div className={`${size} m-2 cursor-pointer`}>
      <img
        src='http://www.lochek.site/done.png'
        className={`${size} absolute z-10 cursor-pointe`}
      />
      <img
        className={`${size} rounded-full cursor-pointer opacity-50`}
        src={src}
        alt='검은색폭동'
        loading='lazy'
      />
    </div>
  );
};

export default CharacterCard;
