/**
 * The `useDebounce` custom hook in TypeScript React is used to debounce a value with a specified
 * delay.
 * @param {T} value - The `value` parameter is the input value that you want to debounce. This can be
 * of any type (`T`) as specified in the generic type declaration `<T>`.
 * @param {number} [delay] - The `delay` parameter in the `useDebounce` hook is an optional parameter
 * that specifies the time duration (in milliseconds) for which the value should be debounced before
 * updating the debounced value. If the `delay` parameter is not provided, the default delay of 500
 * milliseconds is used
 * @returns The `useDebounce` custom hook returns the debounced value of the input value `T`.
 */

import * as React from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay ?? 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
