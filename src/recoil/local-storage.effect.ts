import RECOIL_KEY from "../enum/recoil.enum";


const localStorageEffect =
  (key: RECOIL_KEY) =>
    ({ setSelf, onSet }: any) => {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue: any, _: any, isReset: any) => {
        isReset
          ? localStorage.removeItem(key)
          : localStorage.setItem(key, JSON.stringify(newValue));
      });
    };

export default localStorageEffect