import { useParams } from 'react-router-dom';
import useGetCharacterList from '../../api/get-character-list.api';
import { ROUTE_PARAM } from '../../enum/route.enum';
import CharacterImageSet from '../CharacterImageSet/CharacterImageSet';

const GroupItem = () => {
  const { userId } = useParams<ROUTE_PARAM>();
  if (!userId) return <div>정상적인 경로로 접근 해 주세요</div>;

  const { data, isLoading, isError } = useGetCharacterList(userId);

  if (isLoading) return <div>레이드 리스트를 불러오는 중입니다.</div>;
  if (isError) return <div>레이드 리스트를 불러오는중 에러가 발생 했습니다.</div>;
  if ('message' in data) return <div>에러발생</div>;

  return (
    <div className="h-full p-2 flex flex-col overflow-auto">
      {data.map((dataItem) => {
        return <CharacterImageSet key={dataItem.name} characterInfo={dataItem} readOnly />;
      })}
    </div>
  );
};

export default GroupItem;
