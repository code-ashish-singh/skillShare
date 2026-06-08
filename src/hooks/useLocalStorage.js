import { useState } from 'react';
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const setValue = (value) => { setStoredValue(value); };
  return [storedValue, setValue];
}
