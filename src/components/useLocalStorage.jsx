export const useLocalStorage = (key) => {
  const setItem = (value) => {
    windows.useLocalStorage.setItem(key, JSON.stringify(value));
  };

  return { setItem };
};
