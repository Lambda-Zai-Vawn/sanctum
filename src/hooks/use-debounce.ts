
"use client";

import { useState, useEffect } from 'react';

/**
 * A custom hook that debounces a value.
 * It will only update the returned value if the input value has not changed for the specified delay.
 * This is useful for delaying expensive operations like API calls until the user has stopped typing.
 *
 * @template T The type of the value to debounce.
 * @param {T} value The value to debounce.
 * @param {number} delay The debounce delay in milliseconds.
 * @returns {T} The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the specified delay.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if the value changes before the delay has passed.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
