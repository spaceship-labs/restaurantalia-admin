import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, InputLabel, Select, Input, MenuItem, FormHelperText,
} from '@material-ui/core/';

const SelectSingleInputComponent = ({ field, fieldConfig }) => {
  const {
    value, items = [], change,
  } = field;
  const {
    label, attr, multiple, isRequired, error,
  } = fieldConfig;
  return (
    <FormControl error={error}>
      <InputLabel id={attr}>{label}</InputLabel>
      <Select
        labelId={attr}
        id={attr}
        required={isRequired}
        name={attr}
        multiple={multiple}
        value={value}
        onChange={({ target: { value: val } }) => {
          change(val);
        }}
        input={<Input id={attr} />}
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.nombre}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText id="component-error-text">Campo requerido</FormHelperText>}
    </FormControl>
  );
};

SelectSingleInputComponent.propTypes = {
  field: PropTypes.object.isRequired,
  fieldConfig: PropTypes.object.isRequired,
};

export default SelectSingleInputComponent;
