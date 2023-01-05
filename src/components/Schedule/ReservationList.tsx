import ControlPointIcon from '@mui/icons-material/ControlPoint';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isToday from 'dayjs/plugin/isToday';
import produce from 'immer';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSetRecoilState } from 'recoil';
import useGetReservation from '../../api/get-reservation.api';
import HOST_INFO from '../../enum/host.enum';
import { Character, Raid } from '../../models';
import modalControllerAtomSate from '../../recoil/modal-controller.state';
import { Reservation } from '../../recoil/reservation.state';
import SelectCharacterModal from '../Modal/SelectCharacterModal';
import useDeleteReservation from '../../api/delete-reservation.api';
import { useQueryClient } from '@tanstack/react-query';
import QUERY_KEY from '../../enum/query.enum';

dayjs.extend(isToday);

const ReservationList = () => {
  const { data: reservationList, isError, isLoading } = useGetReservation();
  const setModalControllerState = useSetRecoilState(modalControllerAtomSate);
  const { mutate: deleteReservationMutate } = useDeleteReservation();

  const queryClient = useQueryClient();
  if (isLoading) return <div>데이터 불러 오는 중</div>;
  if (isError) return <div>에러 발생</div>;
  if ('message' in reservationList) return <div>알려진 사항 발생</div>;

  const handleClickEmptyIcon = (reservation: Reservation) => {
    const {
      accountLevelLimit,
      jewelLimit,
      levelLimit,
      raid,
      id,
      startTime,
      reservateCharacter,
      register,
      numberOfPeople,
      raidType,
    } = reservation;
    setModalControllerState((preveValue) =>
      produce(preveValue, (draftValue) => {
        draftValue.push(
          <SelectCharacterModal<Reservation>
            jewelLimit={jewelLimit}
            raid={raid}
            accountLevelLimit={accountLevelLimit}
            levelLimit={levelLimit}
            id={id}
            startTime={startTime}
            reservateCharacter={reservateCharacter}
            register={register}
            numberOfPeople={numberOfPeople}
            raidType={raidType}
          />,
        );
      }),
    );
  };

  const getTimeString = (time: string) => {
    return dayjs(time).isToday() ? dayjs(time).format('HH:MM') : dayjs(time).format('MM-DD/HH:mm');
  };

  const handleClickDeleteButton = (id: number) => {
    const result = confirm('정말 삭제하시겠습니까 ?');
    console.log(result);

    if (result) {
      deleteReservationMutate(id, {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries([QUERY_KEY.RESERVATION_LIST]);
        },
      });
    }
  };

  return (
    <div className="rounded-md mt-8 flex flex-col gap-5 text-black">
      {reservationList.map((reservationItem) => {
        const {
          raid,
          id,
          accountLevelLimit,
          jewelLimit,
          reservateCharacter,
          numberOfPeople,
          raidType,
          startTime,
          register,
          levelLimit,
        } = reservationItem;

        const defaultCharacterArr = reservateCharacter ?? [];

        const emptySlotLength = numberOfPeople - defaultCharacterArr.length;
        return (
          <div key={id} className="gap-3 flex flex-col bg-white bg-opacity-10 rounded-lg p-2">
            <div className="flex gap-1 relative">
              <button
                className="absolute top-0 right-0"
                onClick={() => handleClickDeleteButton(id)}
              >
                <DeleteIcon
                  className="text-red-600"
                  style={{
                    fontSize: '2rem',
                  }}
                />
              </button>
              <img
                className={`rounded-full cursor-pointer w-20 h-20`}
                src={`${HOST_INFO.HOST}/${raid.srcName}`}
                alt={raid.name}
                loading="lazy"
              />
              {reservateCharacter.map((reservateCharacterItem) => {
                const { character } = reservateCharacterItem;
                const { name, profileSrc } = character;
                return (
                  <div
                    key={name}
                    className="rounded-full w-20 h-20 flex justify-center items-center cursor-pointer"
                  >
                    <img src={profileSrc} className="w-full h-full rounded-full" />
                  </div>
                );
              })}
              {Array(emptySlotLength)
                .fill({ name: null })
                .map((characterItem, index) => {
                  return (
                    <div
                      key={index}
                      className="rounded-full bg-slate-600 w-20 h-20 flex justify-center items-center cursor-pointer"
                      onClick={() => handleClickEmptyIcon(reservationItem)}
                    >
                      <ControlPointIcon style={{ fontSize: '3rem', color: 'white' }} />
                    </div>
                  );
                })}
            </div>
            <div className="flex gap-3">
              <div className="bg-black text-white rounded-lg">
                시작시간: <span className="text-red-500">{getTimeString(startTime)}</span>
              </div>
              <div className="bg-black text-white rounded-lg">
                등록자: <span className="text-blue-400">{register.name}</span>
              </div>
            </div>
            <div className="flex gap-1 text-xs">
              <span className="bg-black text-white p-1 rounded-xl">
                숙련도:
                <span className="text-red-400">{raidType}</span>
              </span>
              <span className="bg-black text-white p-1 rounded-xl">
                원정대 레벨 제한:
                <span className={`${accountLevelLimit > 0 && 'text-red-400'}`}>
                  {accountLevelLimit}
                </span>
              </span>
              <span className="bg-black text-white p-1 rounded-xl">
                보석 평균 레벨 제한:
                <span className={`${jewelLimit > 0 && 'text-red-400'}`}>{jewelLimit}</span>
              </span>
              <span className="bg-black text-white p-1 rounded-xl">
                캐릭터 레벨 제한:
                <span className={`${levelLimit > 0 && 'text-red-400'}`}>{levelLimit}</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReservationList;
