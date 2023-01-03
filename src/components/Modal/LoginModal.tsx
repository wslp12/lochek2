import { ILoginModal } from '../../models/Modal';
import modalController from './modal-controller-root';

/**
 * 로그인 모달입니다.
 */
const LoginModal: ILoginModal = () => {
  return (
    <div className="w-96 dark:bg-black bg-white rounded-lg p-3 flex flex-col gap-2">
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
          required
        />
      </div>
      <div>
        <label
          htmlFor="token_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          토큰
        </label>
        <input
          type="password"
          id="token_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="토큰을 입력하세요"
          required
        />
      </div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center outline-none"
      >
        로그인
      </button>
    </div>
  );
};

export default modalController(LoginModal);
