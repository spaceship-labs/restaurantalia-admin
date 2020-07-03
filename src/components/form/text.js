import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const TextInputComponent = ({ field, handleChange }) => {
  const {
    label, attr, value, isRequired, error,
  } = field;
  return (
    <FormControl>
      <InputLabel htmlFor={attr}>{label}</InputLabel>
      <Input
        id={attr}
        error={error}
        required={isRequired}
        name={attr}
        value={value}
        onChange={handleChange}
      />
    </FormControl>
  );
};

TextInputComponent.propTypes = {
  field: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TextInputComponent;
