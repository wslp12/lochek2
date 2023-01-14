import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import useGetOrganization from '../../api/get-organization';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import loginAtomState from '../../recoil/login.state';
import useGetRaid from '../../api/get-raid.api';
import useGetAccountRaidList from '../../api/get-account-raid-list.api';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import produce from 'immer';
import dayjs, { Dayjs } from 'dayjs';
import {
  Reservation,
  reservationAtomState,
  reservationDateAtomState,
  reservationRaidTypeAtomState,
} from '../../recoil/reservation.state';
import usePostReservation from '../../api/post-reservation.api';
import ReservationList from './ReservationList';
import { useQueryClient } from '@tanstack/react-query';
import QUERY_KEY from '../../enum/query.enum';
import { toast } from 'react-toastify';

/**
 * 레이드 셀렉트
 */
const RaidSelect = () => {
  const {
    data: charRaidData,
    isLoading: charRaidIsLoading,
    isError: charRaidIsError,
  } = useGetRaid();
  const {
    data: accountRaidData,
    isLoading: accountRaidIsloading,
    isError: accountRaidIsError,
  } = useGetAccountRaidList();

  const setReservation = useSetRecoilState(reservationAtomState);

  if (charRaidIsLoading || accountRaidIsloading)
    return <div>레이드 리스트를 불러오는 중입니다.</div>;
  if (charRaidIsError || accountRaidIsError)
    return <div>레이드 리스트를 불러오는중 에러가 발생 했습니다.(예외o)</div>;
  if ('message' in charRaidData || 'message' in accountRaidData)
    return <div>api 에러발생(예외x)</div>;

  // const raidSelectInfoList = accountRaidData
  //   .map((item) => {
  //     return {
  //       label: item.name,
  //       ...item,
  //     };
  //   })
  //   .concat(
  //     charRaidData.map((charRaidDataItem) => {
  //       return {
  //         label: charRaidDataItem.name,
  //         ...charRaidDataItem,
  //       };
  //     }),
  //   );
  const raidSelectInfoList = charRaidData.map((charRaidDataItem) => {
    return {
      label: charRaidDataItem.name,
      ...charRaidDataItem,
    };
  });

  const handleSelectRaid = (newInput: string) => {
    if (newInput === '') return;
    const selectRaid = raidSelectInfoList.find(
      (raidSelectInfoListItem) => raidSelectInfoListItem.name === newInput,
    );
    if (!selectRaid) return;

    setReservation((preveState) =>
      produce(preveState, (draftState) => {
        draftState.raid = selectRaid;
      }),
    );
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={raidSelectInfoList}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="레이드 선택" />}
        onInputChange={(event, newInputValue) => {
          handleSelectRaid(newInputValue);
        }}
      />
    </div>
  );
};

const ReservationDateInput = () => {
  const [reservationDate, setReservationDate] = useRecoilState(reservationDateAtomState);

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue === null) return;
    setReservationDate(newValue.format('YYYY-MM-DDTHH:mm'));
  };

  return (
    <DateTimePicker
      label="출발 예정 시각"
      value={reservationDate}
      onChange={handleChange}
      renderInput={(params: any) => <TextField {...params} />}
    />
  );
};

const AddCharacterSlotButton = (props: { onClickAddButton: () => void }) => {
  const { onClickAddButton } = props;
  return (
    <div className="rounded-full bg-slate-600 w-12 h-12 flex justify-center items-center">
      <ControlPointIcon onClick={onClickAddButton} />
    </div>
  );
};

const AccountLevelLimitInput = () => {
  const setReservation = useSetRecoilState(reservationAtomState);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    if (targetValue === '') return;
    setReservation((preveState) =>
      produce(preveState, (draftState) => {
        draftState.accountLevelLimit = +targetValue;
      }),
    );
  };

  return (
    <TextField
      id="standard-basic"
      label="원정대 레벨 제한"
      variant="standard"
      type={'number'}
      onChange={handleChangeInput}
    />
  );
};

const LevelLimitInput = () => {
  const setReservation = useSetRecoilState(reservationAtomState);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    if (targetValue === '') return;
    setReservation((preveState) =>
      produce(preveState, (draftState) => {
        draftState.levelLimit = +targetValue;
      }),
    );
  };

  return (
    <TextField
      id="standard-basic"
      label="캐릭터 아이템 레벨 제한"
      variant="standard"
      type={'number'}
      onChange={handleChangeInput}
    />
  );
};

const JewelLimitInput = () => {
  const setReservation = useSetRecoilState(reservationAtomState);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    if (targetValue === '') return;
    setReservation((preveState) =>
      produce(preveState, (draftState) => {
        draftState.jewelLimit = +targetValue;
      }),
    );
  };

  return (
    <TextField
      id="standard-basic"
      label="캐릭터 보석 평균 레벨 제한"
      variant="standard"
      type={'number'}
      onChange={handleChangeInput}
    />
  );
};

const CharacterIcon = () => {
  return (
    <div className="w-12 h-12 rounded-full flex justify-center items-center bg-black">
      <img src="" alt="" />
    </div>
  );
};

const CharacterSelect = () => {
  const [characterSlot, setCharacterSlot] = useState<number[]>([]);
  const setReservation = useSetRecoilState(reservationAtomState);

  const handleClickCharacterAddSlotButton = () => {
    if (characterSlot.length >= 8) return;
    const rand = Math.random();
    setCharacterSlot((preveState) =>
      produce(preveState, (draftState) => {
        draftState.push(rand);
      }),
    );
    setReservation((preveState) =>
      produce(preveState, (draftState) => {
        draftState.numberOfPeople = characterSlot.length + 1;
      }),
    );
  };

  return (
    <div className="border border-black rounded-md p-3 gap-4 flex flex-col">
      <div className="text-black">파티에 들어갈 인원을 선택 해 주세요 (최대 8명)</div>
      <div className="flex gap-3">
        {characterSlot.map((characterSlotItem) => {
          return <CharacterIcon key={characterSlotItem} />;
        })}
        <AddCharacterSlotButton onClickAddButton={handleClickCharacterAddSlotButton} />
      </div>
    </div>
  );
};

const ReservationSaveButton = () => {
  const [reservation, setReservation] = useRecoilState(reservationAtomState);
  const queryClient = useQueryClient();
  const { accountLevelLimit, jewelLimit, levelLimit, numberOfPeople, raid, done } = reservation;
  const reservationDate = useRecoilValue(reservationDateAtomState);
  const reservationRaidType = useRecoilValue(reservationRaidTypeAtomState);
  const loginInfo = useRecoilValue(loginAtomState);

  const { mutate } = usePostReservation();

  const handleClickReservationPostButton = () => {
    console.log(raid);
    if (!raid.groupName) {
      toast.error('레이드를 선택 해주세요');
      return;
    }

    mutate(
      {
        accountLevelLimit,
        jewelLimit,
        levelLimit,
        numberOfPeople,
        raid,
        raidType: reservationRaidType,
        startTime: reservationDate,
        register: loginInfo,
        done,
      },
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries([QUERY_KEY.RESERVATION_LIST]);
        },
      },
    );
  };

  return (
    <div className="flex last:mt-auto">
      <Button variant="contained" className="w-full" onClick={handleClickReservationPostButton}>
        제출
      </Button>
    </div>
  );
};

const ReservationRaidType = () => {
  const [reservationRaidType, setReservationRaidType] = useRecoilState(
    reservationRaidTypeAtomState,
  );

  const typeList: typeof reservationRaidType[] = ['반숙', '숙련', '클경', '트라이', '학원', '헤딩'];

  const handleSelectRaid = (newInput: string) => {
    if (newInput === '') return;
    const selectRaid = typeList.find(
      (raidSelectInfoListItem) => raidSelectInfoListItem === newInput,
    );
    if (!selectRaid) return;

    setReservationRaidType(selectRaid);
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={typeList}
        sx={{ width: 300 }}
        value={reservationRaidType}
        renderInput={(params) => <TextField {...params} label="레이드 성향 선택" />}
        onInputChange={(event, newInputValue) => {
          handleSelectRaid(newInputValue);
        }}
      />
    </div>
  );
};

const Schedule = () => {
  return (
    <div className="p-6 h-full flex flex-col gap-5">
      <ReservationList />
      <div className="bg-white flex flex-col p-6 gap-9 rounded-xl h-full">
        <RaidSelect />
        <ReservationRaidType />
        <AccountLevelLimitInput />
        <LevelLimitInput />
        <JewelLimitInput />
        <CharacterSelect />
        <ReservationDateInput />
        <ReservationSaveButton />
      </div>
    </div>
  );
};

export default Schedule;
