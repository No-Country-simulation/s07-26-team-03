import { useEffect, useRef } from 'react';

export function useOutsideClick<T extends HTMLElement>(
  handle: () => void,
  useCapture = true
) {
  const ref = useRef<T>(null);

  useEffect(
    function () {
      function handleClick(e: Event) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          handle();
        }
      }

      document.addEventListener('click', handleClick, useCapture);

      return function () {
        document.removeEventListener('click', handleClick, useCapture);
      };
    },

    [handle, useCapture]

  );
  return ref;
}