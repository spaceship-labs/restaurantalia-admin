import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const NumberInputComponent = ({ field, handleChange }) => {
  const { label, attr, value } = field;
  return (
    <FormControl>
      <InputLabel htmlFor={attr}>{label}</InputLabel>
      <Input
        id={attr}
        name={attr}
        type="number"
        value={value}
        onChange={handleChange}
      />
    </FormControl>
  );
};

NumberInputComponent.propTypes = {
  field: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default NumberInputComponent;
