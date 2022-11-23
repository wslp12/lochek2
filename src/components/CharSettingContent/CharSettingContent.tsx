import Switch from '@mui/material/Switch';
import React from 'react';

const CharacterSettingContent = () => {
  const item = [
    {
      id: '검은색폭동',
      imageSrc:
        'https://img.lostark.co.kr/profile/5/E0DD263DD0A28CC56813AEBB3026DF5E9AE54C2ACEFBD004C319E1ABBCB3D776.PNG',
    },
    {
      id: '초록색폭동',
      imageSrc:
        'https://img.lostark.co.kr/profile/5/E0DD263DD0A28CC56813AEBB3026DF5E9AE54C2ACEFBD004C319E1ABBCB3D776.PNG',
    },
    {
      id: '백색폭동',
      imageSrc:
        'https://img.lostark.co.kr/profile/5/E0DD263DD0A28CC56813AEBB3026DF5E9AE54C2ACEFBD004C319E1ABBCB3D776.PNG',
    },
    {
      id: '회색폭동',
      imageSrc:
        'https://img.lostark.co.kr/profile/5/E0DD263DD0A28CC56813AEBB3026DF5E9AE54C2ACEFBD004C319E1ABBCB3D776.PNG',
    },
    {
      id: '분홍색폭동',
      imageSrc:
        'https://img.lostark.co.kr/profile/5/E0DD263DD0A28CC56813AEBB3026DF5E9AE54C2ACEFBD004C319E1ABBCB3D776.PNG',
    },
    {
      id: '윤지만',
      imageSrc:
        'https://img.lostark.co.kr/profile/5/E0DD263DD0A28CC56813AEBB3026DF5E9AE54C2ACEFBD004C319E1ABBCB3D776.PNG',
    },
  ];

  const todo = [
    { name: '에포나', check: true },
    { name: '가디언', check: true },
    { name: '아브렐슈드', check: true },
    { name: '비아키스', check: true },
    { name: '발탄', check: true },
    { name: '라우리엘', check: true },
  ];
  const itemLength = item.length + 1;

  return (
    <>
      <div
        className={`grid grid-rows-${todo.length} gap-x-3 overflow-hidden `}
        style={{
          gridTemplateColumns: `repeat(${itemLength}, minmax(100px, 1fr))`,
        }}
      >
        <div className='overflow-hidden flex items-center justify-center'>/</div>
        {item.map((item) => (
          <div key={item.id} className='w-full h-full box-border'>
            <div className='bg-black w-full h-full'>
              <img className='w-full h-full' src={item.imageSrc} alt='' />
            </div>
          </div>
        ))}
        {[
          <div
            className='flex justify-start items-center'
            key='character-index'
            style={{ width: '9999px' }}
          >
            <div className='bg-sky-600 w-full h-1/2 flex items-center rounded-l-lg pl-2 z-10 bg-opacity-10'>
              <span>캐릭터</span>
            </div>
          </div>,
          item.map((item) => (
            <div key={item.id}>
              <div className='mt-5 mb-5 w-full h-full flex justify-center '>
                <span className='z-20'>
                  <Switch color='error' />
                </span>
              </div>
            </div>
          )),
        ]}
        {todo.map((todoItem, todoIndex) => {
          let color = 'yellow-300';
          switch (todoItem.name) {
            case '가디언':
              color = 'green-300';
              break;
            case '비아키스':
              color = 'red-300';
              break;
            case '아브렐슈드':
              color = 'white';
              break;
            case '발탄':
              color = 'slate-700';
              break;
            default:
              color = 'indigo-500';
              break;
          }
          return [
            <div
              className='flex justify-start items-center'
              key={todoItem.name}
              style={{ width: '9999px' }}
            >
              <div
                className={`bg-${color} w-full h-1/2 flex items-center rounded-l-lg pl-2 z-10 bg-opacity-10`}
              >
                <span>{todoItem.name}</span>
              </div>
            </div>,
            item.map((character) => {
              const raid = todoIndex === todo.length - 1 ? 'rounded-b-lg' : '';
              return (
                <div key={character.id} className={`${raid}`}>
                  <div className={`mt-5 mb-5 w-full h-full flex justify-center`}>
                    <span className='z-20'>
                      <Switch color='error' />
                    </span>
                  </div>
                </div>
              );
            }),
          ];
        })}
      </div>
    </>
  );
};
export default CharacterSettingContent;
