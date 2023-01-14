import produce from 'immer';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import usePatchCharacterParse from '../../api/patch-character-parse';
import loginAtomState from '../../recoil/login.state';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Character, Todo } from '../../models';
import TodoList from '../TodoList/TodoList';
import Popover from '@mui/material/Popover';
import { useRef, useState } from 'react';
import Typography from '@mui/material/Typography';

const CharacterImage = (props: { characterInfo: Character }) => {
  const { characterInfo } = props;
  const { profileSrc, name } = characterInfo;

  const info = useRef<Character>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    info.current = characterInfo;
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <img
        className={`rounded-full m-2 w-24 h-24 min-w-c/image min-h-c/image`}
        src={profileSrc}
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
          <div>{(info?.current as any)?.name}</div>
          <div>{(info?.current as any)?.itemLevel}</div>
          <div>{(info?.current as any)?.level}</div>
          <div>{(info?.current as any)?.job}</div>
        </Typography>
      </Popover>
    </>
  );
};

const CharacterImageSet = ({
  characterInfo,
  readOnly = false,
}: {
  characterInfo: Character;
  readOnly: boolean;
}) => {
  const { name, profileSrc } = characterInfo;
  const [loginInfo, setLoginInfo] = useRecoilState(loginAtomState);
  // const { todoList } = loginInfo;

  const { mutate } = usePatchCharacterParse();

  const handleClickRefreshButton = () => {
    mutate(name, {
      onSuccess: (data) => {
        if (data === undefined) return toast.error('data.message');
        if ('message' in data) {
          return toast.error(data.message);
        }

        setLoginInfo((preveState) =>
          produce(preveState, (draftState) => {
            const currentItemIndex = draftState.characterList.findIndex((characterListItem) => {
              return characterListItem.name === data.name;
            });
            draftState.characterList[currentItemIndex] = data;
          }),
        );
        toast.success(`${data.name} 정보 갱신하였습니다`);
      },
    });
  };

  return (
    <div className="mt-5 p-2 box-border rounded-3xl flex bg-opacity-5 shadow-black shadow-md overflow-y-hidden bg-white items-center flex-nowrap overflow-x-auto relative">
      <CharacterImage characterInfo={characterInfo} />
      <TodoList character={characterInfo} readOnly={readOnly} />
      {readOnly === false && (
        <button
          type="button"
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            width: '35px',
            height: '35px',
            zIndex: '30',
            backgroundColor: 'black',
            borderRadius: '25px',
          }}
          onClick={handleClickRefreshButton}
        >
          <RefreshIcon />
        </button>
      )}
    </div>
  );
};

export default CharacterImageSet;
