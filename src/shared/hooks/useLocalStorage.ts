import { useState } from "react";

export type UseLocalStorageReturnType<T> = [T, (arg: T) => void];

export const useLocalStorage = <T>(
  keyName: string,
  defaultValue?: T | null
): UseLocalStorageReturnType<T> => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value) as T;
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue as T;
      }
    } catch (err) {
      return defaultValue as T;
    }
  });

  const setValue = (newValue: T) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.error(err);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
