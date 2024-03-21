import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storageItem = JSON.parse(localStorage.getItem(key));
    //if opening for the first time, null is returned, TOO IMPORTANT
    return storageItem ? storageItem : initialState;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
      console.log(value);
      // setQuery("");
    },
    [value, key]
  );
  return [value, setValue];
}
