import Switch from '@mui/material/Switch';
import produce from 'immer';
import React from 'react';
import { useRecoilState } from 'recoil';
import useGetRaid from '../../api/get-raid.api';
import usePatchCharacterDisplay from '../../api/patch-character-display';
import usePatchTodoDisplay from '../../api/patch-todo-display';
import { Character, Todo } from '../../models';
import loginAtomState from '../../recoil/login.state';

const CharacterSettingContent = () => {
  const [loginInfo, setLoginInfo] = useRecoilState(loginAtomState);
  const { mutate } = usePatchCharacterDisplay();
  const { mutate: todoMutate } = usePatchTodoDisplay();

  const { data: raidList, isLoading, isError } = useGetRaid();
  if (isLoading) return <div>레이드 리스트를 불러오는 중입니다.</div>;
  if (isError) return <div>레이드 리스트를 불러오는중 에러가 발생 했습니다.</div>;
  if ('message' in raidList) return <div>에러발생</div>;

  const { characterList, todoList } = loginInfo;

  // 그리드에서 캐릭터 길이 +1 을 한다.
  const itemLength = characterList.length + 1;

  const handleClickCharacterShow = (character: Character) => {
    const changedDisplay = !character.display;
    mutate(
      { name: character.name, display: !character.display },
      {
        onSuccess: (res) => {
          setLoginInfo((preveState) =>
            produce(preveState, (draftState) => {
              const currentCharacterListIndex = draftState.characterList.findIndex(
                (characterListItem) => {
                  return characterListItem.name === character.name;
                },
              );
              draftState.characterList[currentCharacterListIndex].display = changedDisplay;
            }),
          );
        },
      },
    );
  };

  const handleClickTodoShow = (todo: Todo) => {
    const changedDisplay = !todo.display;
    todoMutate(
      {
        id: +todo.id,
        formData: {
          display: !todo.display,
        },
      },
      {
        onSuccess(data) {
          setLoginInfo((preveState) =>
            produce(preveState, (draftState) => {
              const currentTodoListIndex = draftState.todoList.findIndex((todoListItem) => {
                return todoListItem.id === todo.id;
              });
              draftState.todoList[currentTodoListIndex].display = changedDisplay;
            }),
          );
        },
      },
    );
  };

  return (
    <>
      <div
        className={`grid grid-rows-${raidList.length} gap-x-3 overflow-hidden `}
        style={{
          gridTemplateColumns: `repeat(${itemLength}, minmax(100px, 1fr))`,
        }}
      >
        <div className="overflow-hidden flex items-center justify-center">/</div>
        {characterList.map((characterListItem) => (
          <div key={characterListItem.name} className="w-full h-full box-border">
            <div className="bg-black w-full h-full">
              <img className="w-full h-full" src={characterListItem.profileSrc} alt="" />
            </div>
          </div>
        ))}
        {[
          <div
            className="flex justify-start items-center"
            key="character-index"
            style={{ width: '9999px' }}
          >
            <div className="bg-sky-600 w-full h-1/2 flex items-center rounded-l-lg pl-2 z-10 bg-opacity-10">
              <span>캐릭터</span>
            </div>
          </div>,
          characterList.map((characterListItem) => (
            <div key={characterListItem.name}>
              <div className="mt-5 mb-5 w-full h-full flex justify-center ">
                <span className="z-20">
                  <Switch
                    color="error"
                    checked={characterListItem.display}
                    onClick={() => handleClickCharacterShow(characterListItem)}
                  />
                </span>
              </div>
            </div>
          )),
        ]}
        {raidList.map((raidListItem, raidListIndex) => {
          let color = 'yellow-300';
          switch (raidListItem.name) {
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
              className="flex justify-start items-center"
              key={raidListItem.name}
              style={{ width: '9999px' }}
            >
              <div
                className={`bg-${color} w-full h-1/2 flex items-center rounded-l-lg pl-2 z-10 bg-opacity-10`}
              >
                <span>{raidListItem.name}</span>
              </div>
            </div>,
            characterList.map((characterListItem) => {
              const currentTodo = todoList.find((todoListItem) => {
                return (
                  todoListItem.raid.name === raidListItem.name &&
                  characterListItem.name === todoListItem.characterName
                );
              });
              if (currentTodo === undefined) return <div>예외사항 발생</div>;
              // characterListItem.name ===
              const raid = raidListIndex === raidList.length - 1 ? 'rounded-b-lg' : '';
              return (
                <div key={characterListItem.name} className={`${raid}`}>
                  <div className={`mt-5 mb-5 w-full h-full flex justify-center`}>
                    <span className="z-20">
                      <Switch
                        color="error"
                        checked={currentTodo.display}
                        onClick={() => handleClickTodoShow(currentTodo)}
                      />
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
