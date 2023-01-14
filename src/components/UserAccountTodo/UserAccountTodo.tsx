import produce from 'immer';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import usePatchCharacterParse from '../../api/patch-character-parse';
import loginAtomState from '../../recoil/login.state';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AccountTodo, Character, Todo, UserInfo } from '../../models';
import TodoList from '../TodoList/TodoList';
import Popover from '@mui/material/Popover';
import { useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import HOST_INFO from '../../enum/host.enum';
import useGetAccountTodoList from '../../api/get-account-todo-list.api';
import done from '../../assets/done.png';
import usePatchAccountTodo from '../../api/patch-account-todo.api';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import QUERY_KEY from '../../enum/query.enum';
import { ROUTE_PARAM } from '../../enum/route.enum';
import { useParams } from 'react-router-dom';

const UserAccountTodo = (props: { loginInfo: UserInfo }) => {
  const { loginInfo } = props;
  const { name, profileSrc } = loginInfo;

  const info = useRef<UserInfo>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    info.current = loginInfo;
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <img
        className={`rounded-full m-2 w-24 h-24 min-w-c/image min-h-c/image`}
        src={`${HOST_INFO.HOST}/${profileSrc}`}
        alt={name}
        onMouseEnter={(e) => handlePopoverOpen(e)}
        onMouseLeave={handlePopoverClose}
      />
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }} variant="body2" component="div">
          <div>{info.current?.name}</div>
        </Typography>
      </Popover>
    </div>
  );
};

const UserAccountTodoImage = (props: {
  accountTodo: AccountTodo;
  onClickAccountRaidTodo: () => void;
}) => {
  const { accountTodo, onClickAccountRaidTodo } = props;
  const { weekAccountRaid, done: todoDone } = accountTodo;
  const { srcName, name } = weekAccountRaid;

  const handleClickTodo = () => {
    onClickAccountRaidTodo();
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

const UserAccountTodoList = (props: { loginInfo: UserInfo; readOnly: boolean }) => {
  const { loginInfo, readOnly } = props;
  const { name } = loginInfo;
  const { userId } = useParams<ROUTE_PARAM>();

  const currentUserId = userId ?? name;

  const { data, isLoading, isError } = useGetAccountTodoList(currentUserId);
  const queryClient = useQueryClient();
  const { mutate } = usePatchAccountTodo();

  if (isLoading) return <div>레이드 리스트를 불러오는 중입니다.</div>;
  if (isError) return <div>레이드 리스트를 불러오는중 에러가 발생 했습니다.</div>;
  if ('message' in data) return <div>에러발생</div>;

  const handleClickAccountTodo = (todo: AccountTodo) => {
    if (readOnly) return;

    const { done: todoDone, id } = todo;

    mutate(
      {
        id: +id,
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

          queryClient.setQueryData<AccountTodo[]>(
            [QUERY_KEY.ACCOUNT_TODO_LIST, currentUserId],
            (preveState) =>
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
      {data.map((dataItem) => {
        return (
          <UserAccountTodoImage
            key={dataItem.id}
            accountTodo={dataItem}
            onClickAccountRaidTodo={() => handleClickAccountTodo(dataItem)}
          />
        );
      })}
    </>
  );
};

const UserAccountImageSet = () => {
  const [loginInfo, setLoginInfo] = useRecoilState(loginAtomState);

  return (
    <div className="mt-5 p-2 box-border rounded-3xl flex bg-opacity-5 shadow-black shadow-md overflow-y-hidden bg-white items-center flex-nowrap overflow-x-auto relative">
      <UserAccountTodo loginInfo={loginInfo} />
      <UserAccountTodoList loginInfo={loginInfo} readOnly={false} />
    </div>
  );
};

export default UserAccountImageSet;
