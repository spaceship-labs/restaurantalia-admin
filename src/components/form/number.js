import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const NumberInputComponent = ({ field }) => {
  const {
    label, attr, value, isRequired, error, setValue,
  } = field;
  return (
    <FormControl>
      <InputLabel htmlFor={attr}>{label}</InputLabel>
      <Input
        id={attr}
        error={error}
        name={attr}
        type="number"
        value={value}
        onChange={({ target: { value: val } }) => setValue(val)}
        required={isRequired}
      />
    </FormControl>
  );
};

NumberInputComponent.propTypes = {
  field: PropTypes.object.isRequired,
};

export default NumberInputComponent;
