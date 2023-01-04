import ControlPointIcon from '@mui/icons-material/ControlPoint';
import dayjs from 'dayjs';
import produce from 'immer';
import { useSetRecoilState } from 'recoil';
import useGetReservation from "../../api/get-reservation.api";
import HOST_INFO from "../../enum/host.enum";
import { Character, Raid } from '../../models';
import modalControllerAtomSate from '../../recoil/modal-controller.state';
import { Reservation } from '../../recoil/reservation.state';
import SelectCharacterModal from '../Modal/SelectCharacterModal';

const ReservationList = () => {
  const {data: reservationList, isError, isLoading} = useGetReservation();
  const setModalControllerState = useSetRecoilState(modalControllerAtomSate);

  if (isLoading) return <div>데이터 불러 오는 중</div>;
  if (isError) return <div>에러 발생</div>;
  if ("message" in reservationList) return <div>알려진 사항 발생</div>;

  console.log(reservationList[0].raid);

  
  const handleClickEmptyIcon = (reservation: Reservation) => {
    const {accountLevelLimit, jewelLimit, levelLimit, raid, id, startTime
      ,character
      ,register,
      numberOfPeople
      ,raidType
    } = reservation;
    const { level } = raid;
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
          character={character}
          register={register}
          numberOfPeople={numberOfPeople}
          raidType={raidType}
        />);
      }),
    );
  }
   
  // const handleClickCharacterIcon = (raid: Raid, character: Character) => {

  // }

  return <div className="bg-white rounded-md mt-8 flex flex-row text-black p-2">{
    reservationList.map((reservationItem) => {
      const {raid, id, accountLevelLimit, jewelLimit, character, numberOfPeople, raidType, startTime} = reservationItem;

      const defaultCharacterArr = character ?? [];
      console.log(defaultCharacterArr.length)

      const emptySlotLength =  numberOfPeople - defaultCharacterArr.length;
      return (
      <div key={id} className="gap-3 flex flex-col">
        <div className="flex gap-1">
          <img
            className={`rounded-full cursor-pointer w-20 h-20`}
            src={`${HOST_INFO.HOST}/${raid.srcName}`}
            alt={raid.name}
            loading="lazy"
          />
          {
            Array(emptySlotLength).fill({name: null}).map((characterItem, index) => {
              return <div key={index}
                className="rounded-full bg-slate-600 w-20 h-20 flex justify-center items-center cursor-pointer"
                onClick={() => handleClickEmptyIcon(reservationItem)}
              >
                <ControlPointIcon 
                  style={{ fontSize: "3rem", color: "white"}} 
                />
              </div>
            })
          }
        </div>
        <div>
          시작시간: <span className='text-red-500'>{dayjs(startTime).format('MM/DD HH:mm')}</span>
        </div>
        <div className='flex gap-1 text-xs'>
          <span className='bg-black text-white p-1 rounded-xl'>
            숙련도: {raidType}
          </span>
          <span className='bg-black text-white p-1 rounded-xl'>
            원정대 레벨 제한: {accountLevelLimit}
          </span>
          <span className='bg-black text-white p-1 rounded-xl'>
          보석 평균 레벨 제한: {jewelLimit}
          </span>
        </div>
      </div>
    )})
}</div>
}

export default ReservationList;