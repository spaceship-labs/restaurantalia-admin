const getError = (inputs, value) => {
  const { type, isRequired } = inputs;
  let er = false;
  if (type === 'number') {
    er = (isRequired && value === '') || Number(value) < 0;
  } else if (type === 'multiselect') {
    er = isRequired && value.length === 0;
  } else if (type === 'select') {
    er = isRequired && value.length === 0;
  } else {
    er = isRequired && value === '';
  }
  return er;
};

const inputHandle = (inputs, target) => {
  const { value, name } = target;
  const error = getError(inputs[name], value);
  const newInput = { ...inputs[name], value, error };
  return { ...inputs, [name]: newInput };
};

const isValidForm = (inputs) => {
  const valid = Object.keys(inputs).reduce((v, i) => {
    const isValidItem = !getError(inputs[i], inputs[i].value);
    return v && isValidItem;
  });
  return valid;
};

// eslint-disable-next-line import/prefer-default-export
export { getError, inputHandle, isValidForm };
