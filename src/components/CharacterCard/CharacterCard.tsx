import { useRecoilState } from 'recoil';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  DroppableProps,
} from 'react-beautiful-dnd';
import { Character } from '../../models';
import loginAtomState from '../../recoil/login.state';
import usePatchCharacterList from '../../api/patch-character-list';
import { useEffect, useState } from 'react';
import CharacterImageSet from '../CharacterImageSet/CharacterImageSet';
import UserAccountImageSet from '../UserAccountTodo/UserAccountTodo';

const reorder = (list: Character[], startIndex: number, endIndex: number): Character[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
};

const CharacterCard = () => {
  const [loginInfo, setLoginInfo] = useRecoilState(loginAtomState);
  const { characterList, name, todoList } = loginInfo;

  const charList: Character[] = characterList.filter((item) => item.display);
  // const charList: Character[] = characterList;

  const { mutate: mutateCharacterList } = usePatchCharacterList();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items: Character[] = reorder(
      characterList,
      result.source.index,
      result.destination.index,
    );

    setLoginInfo((preveState) => {
      return {
        ...preveState,
        characterList: items.map((item, index) => ({ ...item, order: index })),
      };
    });
    mutateCharacterList({
      name,
      characterList: items.map((item, index) => ({
        ...item,
        order: index,
      })),
    });
  };

  return (
    <div className="p-2 flex flex-col overflow-auto">
      <UserAccountImageSet />
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="droppable">
          {(provided): JSX.Element => (
            <div className="" {...provided.droppableProps} ref={provided.innerRef}>
              {charList.map((charListItem, index) => {
                return (
                  <Draggable key={charListItem.name} draggableId={charListItem.name} index={index}>
                    {(provided): JSX.Element => (
                      <div
                        key={charListItem.name}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CharacterImageSet
                          key={charListItem.name}
                          characterInfo={charListItem}
                          readOnly={false}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
};

export default CharacterCard;
