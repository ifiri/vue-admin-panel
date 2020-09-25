/**
 * This effect prevents provided `func` from immediate calls.
 * Provided `func` will be fired only after provided `delay`.
 *
 * @type function
 */
const useDebounce = (func, delay: number = 2000): object => {
  let timeout: number;

  return () => {
    clearTimeout(timeout);

    timeout = setTimeout(function() {
      func();
    }, delay);
  };
};

export default useDebounce;
