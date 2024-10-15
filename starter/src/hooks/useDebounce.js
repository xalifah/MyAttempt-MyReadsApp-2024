import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up function to clear the timeout if value or delay changes
    // This prevents the debounce from updating with an outdated value
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Effect runs when value or delay changes

  // Return the debounced value
  return debouncedValue;
}
