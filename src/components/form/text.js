import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, Input, InputLabel, FormHelperText,
} from '@material-ui/core/';

const TextInputComponent = ({ field, fieldConfig }) => {
  const {
    attr, label, isRequired, multiline, error,
  } = fieldConfig;
  const {
    value, change,
  } = field;
  // console.log(label, value, error);
  const onChange = ({ target: { value: val } }) => {
    const e = (isRequired && val === '');
    // console.log('E', label, e);
    const newConfig = { ...fieldConfig, error: e };
    change(val, newConfig);
  };
  return (
    <FormControl error={error}>
      <InputLabel htmlFor={attr}>{label}</InputLabel>
      <Input
        id={attr}
        required={isRequired}
        name={attr}
        multiline={multiline}
        value={value}
        onChange={onChange}
      />
      {error && <FormHelperText id="component-error-text">Campo requerido</FormHelperText>}
    </FormControl>
  );
};

TextInputComponent.propTypes = {
  field: PropTypes.object.isRequired,
  fieldConfig: PropTypes.object.isRequired,
};

export default TextInputComponent;
