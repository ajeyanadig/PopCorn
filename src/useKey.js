import { useEffect } from "react";
export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) action();
      }
      document.addEventListener("keyup", callback);
      return function () {
        document.removeEventListener("keyup", callback);
      };
    },
    [action, key]
  );
}
