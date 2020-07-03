import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const NumberInputComponent = ({ field, fieldConfig }) => {
  const {
    label, attr, isRequired, error,
  } = fieldConfig;
  const { value, change } = field;
  return (
    <FormControl>
      <InputLabel htmlFor={attr}>{label}</InputLabel>
      <Input
        id={attr}
        error={error}
        name={attr}
        type="number"
        value={value}
        onChange={({ target: { value: val } }) => change(val)}
        required={isRequired}
      />
    </FormControl>
  );
};

NumberInputComponent.propTypes = {
  field: PropTypes.object.isRequired,
  fieldConfig: PropTypes.object.isRequired,
};

export default NumberInputComponent;
