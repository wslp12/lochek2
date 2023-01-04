import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import usePostOrganization from '../../api/post-organization.api';
import { IModalProps } from '../../models/Modal';
import loginAtomState from '../../recoil/login.state';
import { Reservation } from '../../recoil/reservation.state';
import modalControllerRoot from './modal-controller-root';

const SelectCharacterModal = (props: IModalProps<Reservation>) => {
  const { closeModal, jewelLimit, raid, levelLimit, startTime } = props;
  console.log(jewelLimit, raid, levelLimit, startTime);
  
  const { mutate } = usePostOrganization();
  const [characterNameInput, setCharacterNameInput] = useState('');
  const loginInfo = useRecoilValue(loginAtomState);
  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleClickAddUserCharacter = () => {
    mutate(
      {
        name: loginInfo.name,
        gName: characterNameInput,
      },
      {
        onSuccess: () => {
          if (closeModal) {
            closeModal();
          }
        },
      },
    );
  };

  const handleChangeCharacterNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterNameInput(e.target.value);
  };

  return (
    <div
      className="w-96 dark:bg-black bg-white rounded-lg p-3 flex flex-col gap-2"
      onClick={handleStopPropagation}
    >
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          캐릭터명
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="캐릭터명을 입력하세요"
          value={characterNameInput}
          onChange={(e) => handleChangeCharacterNameInput(e)}
          required
        />
      </div>

      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center outline-none"
        onClick={handleClickAddUserCharacter}
      >
        추가
      </button>
    </div>
  );
};

export default modalControllerRoot(SelectCharacterModal);
