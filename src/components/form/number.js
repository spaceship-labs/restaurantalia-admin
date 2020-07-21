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
  // console.log(label, error);
  return (
    <FormControl error={error}>
      <InputLabel htmlFor={attr}>{label}</InputLabel>
      <Input
        id={attr}
        name={attr}
        type="number"
        value={value}
        onChange={({ target: { value: val } }) => {
          const e = (
            (isRequired && val === '')
            // eslint-disable-next-line no-restricted-globals
            || (parseFloat(val) < 0 && isFinite(val))
          );
          // console.log('number', e, val, typeof val);
          const newConfig = { ...fieldConfig, error: e };
          change(val, newConfig);
        }}
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
