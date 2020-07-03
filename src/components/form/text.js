import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const TextInputComponent = ({ field, fieldConfig }) => {
  const {
    attr, label, isRequired, error,
  } = fieldConfig;
  const { value, change } = field;
  return (
    <FormControl>
      <InputLabel htmlFor={attr}>{label}</InputLabel>
      <Input
        id={attr}
        error={error}
        required={isRequired}
        name={attr}
        value={value}
        onChange={({ target: { value: val } }) => change(val)}
      />
    </FormControl>
  );
};

TextInputComponent.propTypes = {
  field: PropTypes.object.isRequired,
  fieldConfig: PropTypes.object.isRequired,
};

export default TextInputComponent;
