import { useParams } from 'react-router-dom';
import useGetTodoList from '../../api/get-todo-list.api';
import { ROUTE_PARAM } from '../../enum/route.enum';
import { Character, Todo } from '../../models';
import usePatchTodo from '../../api/patch-todo';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import done from '../../assets/done.png';
import HOST_INFO from '../../enum/host.enum';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import loginAtomState from '../../recoil/login.state';
import { toast } from 'react-toastify';
import produce from 'immer';
import QUERY_KEY from '../../enum/query.enum';

const TodoImage = (props: { todo: Todo; onClickTodo: () => void }) => {
  const { todo, onClickTodo } = props;
  const { raid, done: todoDone } = todo;
  const { srcName, name } = raid;

  const handleClickTodo = () => {
    onClickTodo();
  };

  return (
    <>
      <div
        className="m-2 w-20 h-20 min-w-t/image min-h-t/image flex flex-col justify-center items-center relative"
        onClick={handleClickTodo}
      >
        {todoDone && <img src={done} alt="done" className={`w-full h-full absolute z-10`} />}
        <img
          className={`rounded-full cursor-pointer w-full h-full`}
          src={`${HOST_INFO.HOST}/${srcName}`}
          alt={name}
          style={{
            opacity: `${todoDone ? '0.35' : '1'}`,
          }}
        />
      </div>
    </>
  );
};

const TodoList = ({ character, readOnly }: { character: Character; readOnly: boolean }) => {
  const { userId } = useParams<ROUTE_PARAM>();

  // MAIN 라우트에서 자신의 정보를 보여주기 위해 사용
  const loginInfo = useRecoilValue(loginAtomState);

  const currentUserId = userId ?? loginInfo.name;

  const { name } = character;
  const { data, isLoading, isError } = useGetTodoList(currentUserId);

  const { mutate } = usePatchTodo();

  const queryClient = useQueryClient();

  if (isLoading) return <div>레이드 리스트를 불러오는 중입니다.</div>;
  if (isError) return <div>레이드 리스트를 불러오는중 에러가 발생 했습니다.</div>;
  if ('message' in data) return <div>에러발생</div>;

  const handleClickTodo = (todo: Todo) => {
    if (readOnly) return;

    const { raid, characterName, done: todoDone, id } = todo;
    const { groupName } = raid;

    mutate(
      {
        id: {
          groupName,
          characterName,
        },
        formData: {
          done: !todoDone,
          doneTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
        },
      },
      {
        onSuccess: async (res) => {
          if (res === undefined) return toast.error('data.message');
          if ('message' in res) {
            return toast.error(res.message);
          }

          queryClient.setQueryData<Todo[]>([QUERY_KEY.TODO_LIST, currentUserId], (preveState) =>
            produce(preveState, (draftState) => {
              if (!draftState) return preveState;

              const findIndex = draftState.findIndex((item) => {
                return item.id === id;
              });

              draftState[findIndex].done = !todoDone;
            }),
          );
        },
        onError: (error, variables, context) => {
          toast.error('윤지용이 돈을 안줘서 서버비용이 없어서 죽어 있습니다.');
        },
      },
    );
  };

  return (
    <>
      {data
        .filter((dataItem) => dataItem.characterName === name)
        .filter((dataItem) => dataItem.display)
        .sort((a, b) => a.raid.order - b.raid.order)
        .map((dataItem) => {
          return (
            <TodoImage
              key={dataItem.id}
              todo={dataItem}
              onClickTodo={() => handleClickTodo(dataItem)}
            />
          );
        })}
    </>
  );
};

export default TodoList;
