import { useState } from 'react';

const useFormInput = (field) => {
  const [value, setValue] = useState(field.value);
  return {
    ...field,
    value,
    setValue,
  };
};

export default { useFormInput };
