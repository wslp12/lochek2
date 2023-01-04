import RefreshIcon from '@mui/icons-material/Refresh';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import { useRecoilState } from 'recoil';
import usePostCharacterParse from '../../api/post-character-parse';
import loginAtomState from '../../recoil/login.state';
import userRefreshAtomState from '../../recoil/user-refresh.state';

dayjs.extend(isTomorrow);

const CharacterRepresh = (props: { buttonClassName: string; iconClassName: string }) => {
  const { buttonClassName, iconClassName } = props;
  const [loginInfo, setLoginInfo] = useRecoilState(loginAtomState);
  const { name } = loginInfo;
  const { mutate, isLoading } = usePostCharacterParse();
  const [refreshTime, setRefreshTime] = useRecoilState(userRefreshAtomState);

  const { characterList } = loginInfo;

  const handleClickChracterParse = () => {
    mutate(
      { groupSetName: characterList[0].groupSetName, username: name },
      {
        onSuccess: () => {
          setRefreshTime(dayjs().format('YYYY-MM-DDTHH:mm:ss'));
          setLoginInfo(null as any);
        },
      },
    );
  };

  /**
   * 0: 하루 안지남
   * 1: 하루 지남
   */
  const diffDay = dayjs().diff(refreshTime, 'day');

  return (
    <button
      className={buttonClassName}
      type="button"
      onClick={handleClickChracterParse}
      disabled={isLoading || (diffDay !== 1 && !isNaN(diffDay))}
    >
      <RefreshIcon className={iconClassName} />
    </button>
  );
};
export default CharacterRepresh;
