import { useState } from 'react';

const useFormInput = (field) => {
  const [value, setValue] = useState(field.value);
  return {
    ...field,
    value,
    setValue,
  };
};

const useFormSelectInput = (field) => {
  const [value, setVal] = useState(field.value);
  return {
    ...field,
    value,
    setValue: (category) => {
      const findInd = value.findIndex((it) => category.id === it.id);
      const newElements = findInd > -1
        ? value.filter((it) => it.id === category.id)
        : [...value, category];

      setVal(newElements);
    },
  };
};

export default { useFormInput, useFormSelectInput };
