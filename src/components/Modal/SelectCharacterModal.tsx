import { useQueryClient } from '@tanstack/react-query';
import produce from 'immer';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import useGetCharacterList from '../../api/get-character-list.api';
import usePatchReservation from '../../api/patch-reservation.api';
import usePostOrganization from '../../api/post-organization.api';
import useReservateCharacter from '../../api/post-reservation-character.api';
import HOST_INFO from '../../enum/host.enum';
import QUERY_KEY from '../../enum/query.enum';
import { Character } from '../../models';
import { IModalProps } from '../../models/Modal';
import loginAtomState from '../../recoil/login.state';
import { reservateCharacter, Reservation, CharacterWithUser } from '../../recoil/reservation.state';
import modalControllerRoot from './modal-controller-root';

const SelectCharacterModal = (props: IModalProps<Reservation>) => {
  const {
    closeModal,
    jewelLimit,
    raid,
    levelLimit,
    startTime,
    reservateCharacter: propsCharacter,
    id,
  } = props;

  const loginInfo = useRecoilValue(loginAtomState);
  const { name } = loginInfo;
  const { data: characterList, isLoading, isError } = useGetCharacterList(name);
  const { mutate: patchReservateMutate } = usePatchReservation();
  const { mutate: postReservateMutate } = useReservateCharacter();
  const queryClient = useQueryClient();

  if (isLoading) return <div>레이드 리스트를 불러오는 중입니다.</div>;
  if (isError) return <div>레이드 리스트를 불러오는중 에러가 발생 했습니다.</div>;
  if ('message' in characterList) return <div>에러발생</div>;

  const selectableCharacterList = characterList.filter((characterListItem) => {
    return characterListItem.itemLevel >= levelLimit;
  });

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleClickCharacterImg = (character: CharacterWithUser) => {
    const reservateCharacter = propsCharacter.map((propsCharacterItem) => {
      return propsCharacterItem.character;
    });

    const isExistCharacter = reservateCharacter.some((propsCharacterItem) => {
      return propsCharacterItem.user.name === name;
    });

    if (!isExistCharacter) {
      postReservateMutate(
        {
          id,
          character: [character],
        },
        {
          onSuccess(data, variables, context) {
            queryClient.invalidateQueries([QUERY_KEY.RESERVATION_LIST]);
            if (closeModal) {
              closeModal();
            }
          },
        },
      );
    } else {
      const result = propsCharacter.map((propsCharacterItem): reservateCharacter => {
        if (propsCharacterItem.character.user.name === name) {
          return { character, id: propsCharacterItem.id };
        }
        return { character: { ...propsCharacterItem.character }, id: propsCharacterItem.id };
      });
      patchReservateMutate(
        {
          id,
          character: result,
        },
        {
          onSuccess(data, variables, context) {
            queryClient.invalidateQueries([QUERY_KEY.RESERVATION_LIST]);
            if (closeModal) {
              closeModal();
            }
          },
        },
      );
    }
  };

  return (
    <div
      className="dark:bg-black bg-white rounded-lg p-3 flex flex-col gap-2"
      onClick={handleStopPropagation}
    >
      <div className="flex gap-3">
        {selectableCharacterList.map((selectableCharacterListItem) => {
          return (
            <img
              onClick={() => handleClickCharacterImg(selectableCharacterListItem)}
              className="w-24 h-24 cursor-pointer"
              key={selectableCharacterListItem.name}
              src={`${selectableCharacterListItem.profileSrc}`}
              alt={selectableCharacterListItem.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default modalControllerRoot(SelectCharacterModal);
