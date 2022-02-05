import { useState, useCallback } from 'react';

export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    if(e[0]) {
      console.log(e);
      setValue(e[0].label);
    } else {
      setValue(null);
    }
  }, []);

  return [value, handler, setValue];
}
